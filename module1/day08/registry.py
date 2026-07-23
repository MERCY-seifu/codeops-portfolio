class Account:
    def __init__(self, number, name, balance, transactions=None):
        self.number = number
        self.name = name
        self.balance = balance
        self.transactions = transactions if transactions is not None else []

    def __repr__(self):
        return f"Account(#{self.number}, {self.name}, balance={self.balance})"


def binary_search(items, target):
   
    low, high = 0, len(items) - 1

    while low <= high:
        mid = (low + high) // 2
        if items[mid] == target:
            return mid
        elif items[mid] < target:
            low = mid + 1
        else:
            high = mid - 1

    return -1


class AccountRegistry:
    def __init__(self):
        self.by_number = {}

    def add_account(self, account):
        self.by_number[account.number] = account

    def top_by_balance(self, n=5):
        accts = sorted(
            self.by_number.values(),
            key=lambda a: a.balance,
            reverse=True
        )
        return accts[:n]

    def find_by_number(self, number):
        nums = sorted(self.by_number)         
        i = binary_search(nums, number)
        return self.by_number[nums[i]] if i >= 0 else None

    def total_transactions(self, number):
        account = self.find_by_number(number)
        if account is None:
            return None
        return self._sum_transactions(account.transactions)

    def _sum_transactions(self, transactions):
        if not transactions:            # base case: nothing left to add
            return 0
        return transactions[0] + self._sum_transactions(transactions[1:])

if __name__ == "__main__":
    registry = AccountRegistry()
    registry.add_account(Account(1042, "Abebe Kebede", 5200.00, [100, -50, 200]))
    registry.add_account(Account(1005, "Sara Tesfaye", 15750.50, [500, 500, -1000, 250]))
    registry.add_account(Account(1088, "Mesfin Alemu", 875.25, [-25, -25, 50]))
    registry.add_account(Account(1021, "Hana Girma", 9400.00, [1000, -200]))
    registry.add_account(Account(1067, "Dawit Bekele", 3120.75, []))

    print("=== top_by_balance(3) ===")
    for acc in registry.top_by_balance(3):
        print(acc)

    print("\n=== find_by_number(1021) ===")
    print(registry.find_by_number(1021))

    print("\n=== find_by_number(9999) (should be None) ===")
    print(registry.find_by_number(9999))

    print("\n=== total_transactions(1005) ===")
    print(registry.total_transactions(1005))   # 250

    print("\n=== total_transactions(1067) (no transactions) ===")
    print(registry.total_transactions(1067))   # 0