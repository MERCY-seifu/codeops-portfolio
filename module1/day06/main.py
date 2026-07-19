from abc import ABC, abstractmethod

class Observer(ABC):
    @abstractmethod
    def update(self, event: str):
        ...


class AlertService:

    def __init__(self):
        self._observers = []

    def subscribe(self, observer: Observer):
        self._observers.append(observer)

    def notify(self, event: str):
        for observer in self._observers:
            observer.update(event)


class SMSAlert(Observer):
   

    def update(self, event: str):
        print(f"[TeleBirr SMS] {event}")



class Account:
    def __init__(self, owner, number, balance=0):
        self.owner = owner
        self.number = number
        self.balance = balance
        self.alert_service = AlertService()

    def subscribe(self, observer: Observer):
        self.alert_service.subscribe(observer)

    def deposit(self, amount):
        if amount <= 0:
            raise ValueError("Deposit amount must be positive")
        self.balance += amount
        self.alert_service.notify(
            f"{self.owner} deposited {amount} ETB (balance: {self.balance})"
        )

    def withdraw(self, amount):
        if amount <= 0:
            raise ValueError("Withdrawal amount must be positive")
        if amount > self.balance:
            raise ValueError("Insufficient funds")
        self.balance -= amount
        self.alert_service.notify(
            f"{self.owner} withdrew {amount} ETB (balance: {self.balance})"
        )

    def __repr__(self):
        return (f"{self.__class__.__name__}(owner={self.owner!r}, "
                f"number={self.number!r}, balance={self.balance})")


class SavingsAccount(Account):
    def __init__(self, owner, number, balance=0, interest_rate=0.05):
        super().__init__(owner, number, balance)
        self.interest_rate = interest_rate

    def apply_interest(self):
        interest = self.balance * self.interest_rate
        self.balance += interest
        self.alert_service.notify(
            f"{self.owner} earned {interest:.2f} ETB interest "
            f"(balance: {self.balance:.2f})"
        )


class CurrentAccount(Account):
    def __init__(self, owner, number, balance=0, overdraft_limit=1000):
        super().__init__(owner, number, balance)
        self.overdraft_limit = overdraft_limit

    def withdraw(self, amount):
        if amount <= 0:
            raise ValueError("Withdrawal amount must be positive")
        if self.balance - amount < -self.overdraft_limit:
            raise ValueError("Overdraft limit exceeded")
        self.balance -= amount
        self.alert_service.notify(
            f"{self.owner} withdrew {amount} ETB (balance: {self.balance})"
        )


class AccountFactory:
    @staticmethod
    def create(kind, owner, number, balance=0):
        if kind == "savings":
            return SavingsAccount(owner, number, balance)
        if kind == "current":
            return CurrentAccount(owner, number, balance)
        raise ValueError(f"Unknown account type: {kind}")


def main():
    print("--- Opening accounts via AccountFactory ---")
    savings = AccountFactory.create("savings", "Almaz", "CBE-1001", 1500)
    current = AccountFactory.create("current", "Bekele", "CBE-2002", 500)

    savings.subscribe(SMSAlert())
    current.subscribe(SMSAlert())

    print("\n--- Transactions (SMSAlert fires automatically) ---")
    savings.deposit(300)
    savings.withdraw(200)
    savings.apply_interest()
    current.withdraw(800)

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