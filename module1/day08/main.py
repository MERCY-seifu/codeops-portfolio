class Account:
    def __init__(self, number, name, balance, transactions=None):
        self.number = number
        self.name = name
        self.balance = balance
        # list of transaction amounts (floats) for this account
        self.transactions = transactions if transactions is not None else []

    def __repr__(self):
        return f"Account(#{self.number}, {self.name}, balance={self.balance})"


class AccountRegistry:
    def __init__(self):
        self.accounts = []  # list of Account objects

    def add_account(self, account):
        self.accounts.append(account)

    def top_by_balance(self, n):
        return sorted(
            self.accounts,
            key=lambda acc: acc.balance,
            reverse=True
        )[:n]

    def _sorted_by_number(self):
        return sorted(self.accounts, key=lambda acc: acc.number)

    def binary_search(self, sorted_accounts, number):
        low, high = 0, len(sorted_accounts) - 1

        while low <= high:
            mid = (low + high) // 2
            mid_account = sorted_accounts[mid]

            if mid_account.number == number:
                return mid_account
            elif mid_account.number < number:
                low = mid + 1
            else:
                high = mid - 1

        return None  # not found

    def find_by_number(self, number):
        sorted_accounts = self._sorted_by_number()
        return self.binary_search(sorted_accounts, number)

    def total_transactions(self, account_number):
        account = self.find_by_number(account_number)
        if account is None:
            raise ValueError(f"No account found with number {account_number}")
        return self._sum_transactions(account.transactions)

    def _sum_transactions(self, transactions):
        # Base case: empty list sums to 0
        if not transactions:
            return 0
        # Recursive case: first item + sum of the rest
        return transactions[0] + self._sum_transactions(transactions[1:])


def build_sample_registry():
    registry = AccountRegistry()

    registry.add_account(Account(1042, "Abebe Kebede", 5200.00, [100, -50, 200]))
    registry.add_account(Account(1005, "Sara Tesfaye", 15750.50, [500, 500, -1000, 250]))
    registry.add_account(Account(1088, "Mesfin Alemu", 875.25, [-25, -25, 50]))
    registry.add_account(Account(1021, "Hana Girma", 9400.00, [1000, -200]))
    registry.add_account(Account(1067, "Dawit Bekele", 3120.75, []))

    return registry


if __name__ == "__main__":
    registry = build_sample_registry()

    print("=== Top 3 accounts by balance ===")
    for acc in registry.top_by_balance(3):
        print(acc)

    print("\n=== find_by_number(1021) ===")
    print(registry.find_by_number(1021))

    print("\n=== find_by_number(9999) (should be None) ===")
    print(registry.find_by_number(9999))

    print("\n=== total_transactions(1005) ===")
    print(registry.total_transactions(1005))  # 500+500-1000+250 = 250

    print("\n=== total_transactions(1067) (no transactions) ===")
    print(registry.total_transactions(1067))  # 0