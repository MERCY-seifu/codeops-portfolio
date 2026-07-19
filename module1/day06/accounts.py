class Account:
    def __init__(self, owner, number, balance=0):
        self.owner = owner
        self.number = number
        self.balance = balance

    def deposit(self, amount):
        if amount <= 0:
            raise ValueError("Deposit amount must be positive")
        self.balance += amount
        print(f"[SMS] {self.owner} deposited {amount} ETB "
              f"(balance: {self.balance})")

    def withdraw(self, amount):
        if amount <= 0:
            raise ValueError("Withdrawal amount must be positive")
        if amount > self.balance:
            raise ValueError("Insufficient funds")
        self.balance -= amount
        print(f"[SMS] {self.owner} withdrew {amount} ETB "
              f"(balance: {self.balance})")


class SavingsAccount(Account):
    def __init__(self, owner, number, balance=0, interest_rate=0.05):
        super().__init__(owner, number, balance)
        self.interest_rate = interest_rate

    def apply_interest(self):
        interest = self.balance * self.interest_rate
        self.balance += interest
        print(f"[SMS] {self.owner} earned {interest:.2f} ETB interest "
              f"(balance: {self.balance:.2f})")


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
        print(f"[SMS] {self.owner} withdrew {amount} ETB "
              f"(balance: {self.balance})")


if __name__ == "__main__":
    # opening accounts by naming the class directly — no factory yet
    savings = SavingsAccount("Almaz", "CBE-1001", 1500)
    current = CurrentAccount("Bekele", "CBE-2002", 500)

    savings.deposit(300)
    savings.withdraw(200)
    savings.apply_interest()
    current.withdraw(800)