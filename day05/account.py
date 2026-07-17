class Account:
    def __init__(self, owner, account_number, balance=0):
        self.owner = owner
        self.account_number = account_number
        self.__balance = balance  # private -- no direct edits from outside

    @property
    def balance(self):
        
        return self.__balance

    def deposit(self, amount):
        if amount <= 0:
            raise ValueError("Deposit amount must be positive")
        self.__balance += amount

    def withdraw(self, amount):
        if amount <= 0:
            raise ValueError("Withdrawal amount must be positive")
        if amount > self.__balance:
            raise ValueError("Insufficient balance -- withdrawal exceeds funds")
        self.__balance -= amount

    def _adjust_balance(self, delta):
        
        self.__balance += delta

    def statement(self):
        print(f"Owner: {self.owner}")
        print(f"Account Number: {self.account_number}")
        print(f"Balance: {self.__balance} ETB")


class SavingsAccount(Account):
    
    def __init__(self, owner, account_number, balance=0, rate=0.05):
        super().__init__(owner, account_number, balance)
        self.rate = rate

    def add_interest(self):
        self.deposit(self.balance * self.rate)

    def statement(self):
        print("Account Type: Savings")
        super().statement()
        print(f"Interest Rate: {self.rate * 100:.1f}%")


class CurrentAccount(Account):

    def __init__(self, owner, account_number, balance=0, overdraft=1000):
        super().__init__(owner, account_number, balance)
        self.overdraft = overdraft

    def withdraw(self, amount):
        if amount <= 0:
            raise ValueError("Withdrawal amount must be positive")
        if amount > self.balance + self.overdraft:
            raise ValueError("Withdrawal exceeds overdraft limit")
        self._adjust_balance(-amount)

    def statement(self):
        print("Account Type: Current")
        super().statement()
        print(f"Overdraft Limit: {self.overdraft} ETB")


if __name__ == "__main__":
    print("--- Building the account family ---")
    savings = SavingsAccount("Almaz Tesfaye", "SA-2001", 1000, rate=0.05)
    current = CurrentAccount("Dawit Bekele", "CA-3001", 100, overdraft=500)
    plain = Account("Sara Kebede", "AC-1003", 300)

    print("\n--- SavingsAccount reuses deposit() via add_interest() ---")
    savings.add_interest()
    savings.statement()

    print("\n--- CurrentAccount withdraw() allows going into overdraft ---")
    current.withdraw(400)          # 100 - 400 = -300, within -500 limit
    current.statement()

    print("\n--- Overdraft limit still blocks excessive withdrawals ---")
    try:
        current.withdraw(400)      # -300 - 400 = -700, exceeds -500 limit
    except ValueError as e:
        print(f"Blocked: {e}")

    print("\n--- Reusing plain Account still works unchanged ---")
    plain.deposit(200)
    plain.statement()

    print("\n--- Polymorphic loop: one loop, three account types ---")
    accounts = [savings, current, plain]
    for acc in accounts:
        acc.statement()
        print()