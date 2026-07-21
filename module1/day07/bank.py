from abc import ABC, abstractmethod


class BankConfig:
    _instance = None

    def __new__(cls):
        if cls._instance is None:
            cls._instance = super().__new__(cls)
            cls._instance.interest_rate = 0.05
            cls._instance.overdraft_limit = 1000
        return cls._instance


class Notifier(ABC):
    @abstractmethod
    def update(self, event: str):
        ...


class SMSAlert(Notifier):
    def update(self, event: str):
        print(f"[TeleBirr SMS] {event}")


class AuditLog(Notifier):
    def update(self, event: str):
        print(f"[Audit Log] {event}")


class InterestBearing(ABC):
    @abstractmethod
    def calculate_interest(self) -> float:
        ...


class Account:
    def __init__(self, owner, number, balance=0):
        self.owner = owner
        self.number = number
        self.balance = balance
        self._observers = []
        self._config = BankConfig()

    def subscribe(self, observer: Notifier):
        self._observers.append(observer)

    def _notify(self, event: str):
        for observer in self._observers:
            observer.update(event)

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


class AccountFactory:
    @staticmethod
    def create(kind, owner, number, balance=0):
        if kind == "savings":
            return SavingsAccount(owner, number, balance)
        if kind == "current":
            return CurrentAccount(owner, number, balance)
        raise ValueError(f"Unknown account type: {kind}")
