from collections import deque

class Branch:
    def __init__(self, branch_id, name, balance=0):
        self.branch_id = branch_id
        self.name = name
        self.balance = balance
        self.children = []

    def add_child(self, child):
        self.children.append(child)

    def total_balance(self):
        total = self.balance                 
        for child in self.children:          
            total += child.total_balance()  
        return total

    def __repr__(self):
        return f"Branch({self.branch_id}, {self.name}, balance={self.balance})"


def build_bank_tree():
    head_office = Branch("HO", "Head Office", balance=500_000)

    addis_region = Branch("R-ADD", "Addis Ababa Region", balance=50_000)
    oromia_region = Branch("R-ORO", "Oromia Region", balance=30_000)

    head_office.add_child(addis_region)
    head_office.add_child(oromia_region)

    cbe1 = Branch("CBE-1", "Bole Branch", balance=120_000)
    cbe2 = Branch("CBE-2", "Piassa Branch", balance=95_000)
    cbe3 = Branch("CBE-3", "Merkato Branch", balance=60_000)
    addis_region.add_child(cbe1)
    addis_region.add_child(cbe2)
    addis_region.add_child(cbe3)

    cbe4 = Branch("CBE-4", "Adama Branch", balance=40_000)
    cbe5 = Branch("CBE-5", "Jimma Branch", balance=25_000)
    oromia_region.add_child(cbe4)
    oromia_region.add_child(cbe5)
    return head_office

def build_transfers_graph():
    return {
        "CBE-1": ["CBE-2", "CBE-4"],
        "CBE-2": ["CBE-3"],
        "CBE-3": ["CBE-1"],
        "CBE-4": ["CBE-5"],
        "CBE-5": [],
    }


def bfs(graph, start):
    visited = {start}
    queue = deque([start])

    while queue:
        current = queue.popleft()
        for neighbor in graph.get(current, []):
            if neighbor not in visited:
                visited.add(neighbor)
                queue.append(neighbor)

    visited.discard(start)  
    return visited

if __name__ == "__main__":
    bank = build_bank_tree()

    print("=== Bank's total balance (all branches) ===")
    print(bank.total_balance())

    print("\n=== Region totals ===")
    for region in bank.children:
        print(f"{region.name}: {region.total_balance()}")

    graph = build_transfers_graph()

    print("\n=== Branches CBE-1 can reach (via transfers, BFS) ===")
    reachable = bfs(graph, "CBE-1")
    print(sorted(reachable))