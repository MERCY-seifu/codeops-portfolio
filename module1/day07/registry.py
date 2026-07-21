from bank import Account, SavingsAccount, CurrentAccount, SMSAlert, AuditLog


class Stack:
    """Minimal LIFO stack used for each account's transaction history."""

    def __init__(self):
        self._items = []

    def push(self, item):
        self._items.append(item)

    def pop(self):
        if self.is_empty():
            raise IndexError("pop from an empty stack")
        return self._items.pop()

    def peek(self):
        if self.is_empty():
            raise IndexError("peek at an empty stack")
        return self._items[-1]

    def is_empty(self):
        return len(self._items) == 0

    def __len__(self):
        return len(self._items)


class Transaction:
    """A single deposit/withdraw record, kept so undo can reverse it."""

    def __init__(self, kind, amount):
        self.kind = kind      # "deposit" or "withdraw"
        self.amount = amount

    def __repr__(self):
        return f"Transaction({self.kind!r}, {self.amount})"


class AccountRegistry:
    def __init__(self):
        self.by_number = {}   # number -> Account                 (O(1) find)
        self.order = []       # account numbers, insertion order
        self.histories = {}   # number -> Stack of Transaction


    def add(self, acc):
        # O(1): one dict insert + one list append, regardless of how many
        # accounts are already registered.
        self.by_number[acc.number] = acc
        self.order.append(acc.number)
        self.histories[acc.number] = Stack()

    def find(self, number):
        # O(1) average: a single hash lookup, not a scan.
        return self.by_number.get(number)

    def list_all(self):
        # O(n): builds a list of the n registered accounts in the order
        # they were added. Listing everything is necessarily O(n) -- you
        # can't return n items in less than n steps.
        return [self.by_number[num] for num in self.order]

    # -- transactions (each pushes a history record) ------------------
    def deposit(self, number, amount):
        acc = self._require(number)
        acc.deposit(amount)
        self.histories[number].push(Transaction("deposit", amount))
        return acc.balance

    def withdraw(self, number, amount):
        acc = self._require(number)
        acc.withdraw(amount)
        self.histories[number].push(Transaction("withdraw", amount))
        return acc.balance

    def undo_last(self, number):
        """Pop the most recent transaction for an account and reverse it."""
        acc = self._require(number)
        history = self.histories[number]
        if history.is_empty():
            raise IndexError(f"No transactions to undo for account {number}.")

        txn = history.pop()
        if txn.kind == "deposit":
            acc.withdraw(txn.amount)   # undo a deposit by withdrawing it back
        elif txn.kind == "withdraw":
            acc.deposit(txn.amount)    # undo a withdrawal by depositing it back
        else:
            raise ValueError(f"Unknown transaction kind: {txn.kind}")
        return txn

    # -- helpers --------------------------------------------------------
    def _require(self, number):
        acc = self.find(number)
        if acc is None:
            raise KeyError(f"No account with number {number!r}.")
        return acc


if __name__ == "__main__":
    registry = AccountRegistry()

    # Account(owner, number, balance) -- matches your real accounts.py
    registry.add(Account("Alice", "ACC0000001"))
    registry.add(Account("Ben", "ACC0000002"))
    registry.add(Account("Chidi", "ACC0000003"))

    print("All accounts (insertion order):")
    for acc in registry.list_all():
        print(" ", acc.owner, acc.number, acc.balance)

    found = registry.find("ACC0000002")
    print("\nfind('ACC0000002') ->", found.owner, found.number, found.balance)

    registry.deposit("ACC0000001", 500)
    registry.deposit("ACC0000001", 100)
    registry.withdraw("ACC0000001", 50)
    print("\nAlice's balance after deposit 500, deposit 100, withdraw 50:",
          registry.find("ACC0000001").balance)

    undone = registry.undo_last("ACC0000001")
    print(f"Undid last transaction ({undone}) ->",
          "balance now", registry.find("ACC0000001").balance)


    print("\n--- registry works with subclasses too ---")
    almaz = SavingsAccount("Almaz", "CBE-1001", 1500)
    bekele = CurrentAccount("Bekele", "CBE-2002", 500)
    almaz.subscribe(SMSAlert())
    almaz.subscribe(AuditLog())
    registry.add(almaz)
    registry.add(bekele)

    registry.deposit("CBE-1001", 300)     # notifies Almaz's observers
    registry.withdraw("CBE-1001", 200)    # notifies Almaz's observers
    registry.withdraw("CBE-2002", 800)    # Bekele has no observers; dips into overdraft

    print("Bekele's balance after overdraft withdrawal:",
          registry.find("CBE-2002").balance)