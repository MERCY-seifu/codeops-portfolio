from abc import ABC, abstractmethod


# Singleton — BankConfig
# One shared source of truth for interest rate and overdraft limit.


class BankConfig:
    _instance = None

    def __new__(cls):
        if cls._instance is None:
            cls._instance = super().__new__(cls)
            cls._instance.interest_rate = 0.05
            cls._instance.overdraft_limit = 1000
        return cls._instance


# DIP — Notifier abstraction. Observers below implement this, and Account
# only ever talks to the abstraction, never to a concrete notifier class.


class Notifier(ABC):
    @abstractmethod
    def update(self, event: str):
        ...


# Observer — concrete notifiers. Account knows nothing about these classes;
# it only calls .update() on whatever has subscribed.


class SMSAlert(Notifier):
    def update(self, event: str):
        print(f"[TeleBirr SMS] {event}")


class AuditLog(Notifier):
    def update(self, event: str):
        print(f"[Audit Log] {event}")


# ISP — small, focused interface. Only accounts that actually earn interest
# implement this; CurrentAccount does not have to.


class InterestBearing(ABC):
    @abstractmethod
    def calculate_interest(self) -> float:
        ...


# SRP — Account holds balance/transaction logic only.
# Persistence (AccountRepository) and notification (observers) live outside
# this class entirely, as described in Part 1 of the reading sheet.


class Account:
    def __init__(self, owner, number, balance=0):
        self.owner = owner
        self.number = number
        self.balance = balance
        self._observers = []
        self._config = BankConfig()  # shared rates/limits, injected via Singleton

    # --- Observer plumbing 
    def subscribe(self, observer: Notifier):
        self._observers.append(observer)

    def _notify(self, event: str):
        for observer in self._observers:
            observer.update(event)

    # --- Core balance logic 
    def deposit(self, amount):
        if amount <= 0:
            raise ValueError("Deposit amount must be positive")
        self.balance += amount
        self._notify(f"{self.owner} deposited {amount} ETB "
                      f"(balance: {self.balance})")

    def withdraw(self, amount):
        if amount <= 0:
            raise ValueError("Withdrawal amount must be positive")
        if amount > self.balance:
            raise ValueError("Insufficient funds")
        self.balance -= amount
        self._notify(f"{self.owner} withdrew {amount} ETB "
                      f"(balance: {self.balance})")

    def __repr__(self):
        return (f"{self.__class__.__name__}(owner={self.owner!r}, "
                f"number={self.number!r}, balance={self.balance})")


# LSP — both subclasses can be used anywhere Account is expected: they only
# extend behaviour (overdraft, interest), they never break withdraw/deposit.


class SavingsAccount(Account, InterestBearing):
    

    def calculate_interest(self) -> float:
        return self.balance * self._config.interest_rate

    def apply_interest(self):
        interest = self.calculate_interest()
        self.balance += interest
        self._notify(f"{self.owner} earned {interest:.2f} ETB interest "
                      f"(balance: {self.balance:.2f})")


class CurrentAccount(Account):

    def withdraw(self, amount):
        if amount <= 0:
            raise ValueError("Withdrawal amount must be positive")
        if self.balance - amount < -self._config.overdraft_limit:
            raise ValueError("Overdraft limit exceeded")
        self.balance -= amount
        self._notify(f"{self.owner} withdrew {amount} ETB "
                      f"(balance: {self.balance})")


# Factory — creates accounts by name, so calling code never imports or
# names SavingsAccount / CurrentAccount directly. New account types (e.g.
# BusinessAccount) plug in here without touching existing code (OCP).

class AccountFactory:
    @staticmethod
    def create(kind, owner, number, balance=0):
        if kind == "savings":
            return SavingsAccount(owner, number, balance)
        if kind == "current":
            return CurrentAccount(owner, number, balance)
        raise ValueError(f"Unknown account type: {kind}")


# Demo

def main():
    print("--- BankConfig Singleton check ---")
    print(f"BankConfig() is BankConfig() -> {BankConfig() is BankConfig()}")

    print("\n--- Opening accounts via AccountFactory ---")
    savings = AccountFactory.create("savings", "Almaz", "CBE-1001", 1500)
    current = AccountFactory.create("current", "Bekele", "CBE-2002", 500)

    for acc in (savings, current):
        acc.subscribe(SMSAlert())
        acc.subscribe(AuditLog())

    print("\n--- Transactions (observers fire automatically) ---")
    savings.deposit(300)
    savings.withdraw(200)
    savings.apply_interest()

    current.withdraw(800)  # dips into overdraft, within the 1000 limit

    print("\n--- Final state ---")
    print(savings)
    print(current)

    print("\n--- Trying to break the overdraft limit ---")
    try:
        current.withdraw(1000)
    except ValueError as e:
        print(f"Rejected: {e}")


if __name__ == "__main__":
    main()