from collections import deque

class Account:
    def __init__(self, number, name, balance):
        self.number = number
        self.name = name
        self.balance = balance

    def __repr__(self):
        return f"Account(#{self.number}, {self.name}, balance={self.balance})"


class Branch:
    def __init__(self, name):
        self.name = name
        self.children = []  
        self.accounts = []  

    def add_child(self, child):
        self.children.append(child)

    def add_account(self, account):
        self.accounts.append(account)

    def total_balance(self):
        total = sum(a.balance for a in self.accounts)
        for child in self.children:      
            total += child.total_balance()
        return total

    def __repr__(self):
        return f"Branch({self.name})"


def build_bank():
    head_office = Branch("Head Office")

    addis_region = Branch("Addis Ababa Region")
    oromia_region = Branch("Oromia Region")
    head_office.add_child(addis_region)
    head_office.add_child(oromia_region)

    bole = Branch("Bole Branch")
    piassa = Branch("Piassa Branch")
    merkato = Branch("Merkato Branch")
    addis_region.add_child(bole)
    addis_region.add_child(piassa)
    addis_region.add_child(merkato)

    adama = Branch("Adama Branch")
    jimma = Branch("Jimma Branch")
    oromia_region.add_child(adama)
    oromia_region.add_child(jimma)

    bole.add_account(Account(1042, "Abebe Kebede", 5200.00))
    bole.add_account(Account(1005, "Sara Tesfaye", 15750.50))
    piassa.add_account(Account(1088, "Mesfin Alemu", 875.25))
    merkato.add_account(Account(1021, "Hana Girma", 9400.00))
    adama.add_account(Account(1067, "Dawit Bekele", 3120.75))
    jimma.add_account(Account(1099, "Kalkidan Yusuf", 1500.00))

    
    head_office.add_account(Account(9000, "HQ Reserve", 200_000.00))

    return head_office

def build_transfers():
    return {
        1042: [1005, 1021],
        1005: [1088],
        1088: [1042],
        1021: [1067],
        1067: [1099],
        1099: [],
        9000: [1042],
    }


def bfs(transfers, start):
    visited = {start}
    queue = deque([start])

    while queue:
        current = queue.popleft()
        for recipient in transfers.get(current, []):
            if recipient not in visited:
                visited.add(recipient)
                queue.append(recipient)

    visited.discard(start)  
    return visited


if __name__ == "__main__":
    bank = build_bank()

    print("=== total_balance() on the head office (whole tree) ===")
    print(bank.total_balance())

    print("\n=== total_balance() per region ===")
    for region in bank.children:
        print(f"{region.name}: {region.total_balance()}")

    transfers = build_transfers()

    print("\n=== Accounts reachable from #1042 (BFS) ===")
    print(sorted(bfs(transfers, 1042)))

    print("\n=== Accounts reachable from #1099 (should be empty) ===")
    print(sorted(bfs(transfers, 1099)))