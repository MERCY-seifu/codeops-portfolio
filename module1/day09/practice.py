import heapq
from collections import deque

# 1. Build a BST: Node class + insert(root, value), check with in-order

class Node:
    def __init__(self, value):
        self.value = value
        self.left = None
        self.right = None


def insert(root, value):
    if root is None:
        return Node(value)

    if value < root.value:
        root.left = insert(root.left, value)
    else:
        root.right = insert(root.right, value)

    return root


def in_order(root, result=None):
    if result is None:
        result = []
    if root is not None:
        in_order(root.left, result)
        result.append(root.value)
        in_order(root.right, result)
    return result

# 2. Tree depth: recursive height(node)

def height(node):
    if node is None:           
        return 0
    return 1 + max(height(node.left), height(node.right))


# 3. Graph BFS

def bfs(graph, start):
    visited = {start}
    queue = deque([start])

    while queue:
        current = queue.popleft()
        for neighbor in graph.get(current, []):
            if neighbor not in visited:
                visited.add(neighbor)
                queue.append(neighbor)

    return visited


# 4. Graph DFS (recursive)

def dfs(graph, start, visited=None, order=None):
    if visited is None:
        visited = set()
        order = []

    visited.add(start)
    order.append(start)

    for neighbor in graph.get(start, []):
        if neighbor not in visited:
            dfs(graph, neighbor, visited, order)

    return order


# 5. Priority queue with heapq

def run_priority_queue_demo():
    pq = []
    tasks = [
        (3, "send report"),
        (1, "handle outage"),
        (5, "clean inbox"),
        (2, "review PR"),
        (4, "update docs"),
    ]

    for priority, task in tasks:
        heapq.heappush(pq, (priority, task))

    order = []
    while pq:
        order.append(heapq.heappop(pq))

    return order


if __name__ == "__main__":
    print("=== 1. BST insert + in-order traversal ===")
    balances = [9400, 5200, 15750, 875, 3120, 15200, 1000]
    root = None
    for b in balances:
        root = insert(root, b)
    print("Inserted:", balances)
    print("In-order (should be sorted):", in_order(root))

    print("\n=== 2. Tree height ===")
    print("Height of BST above:", height(root))
    print("Height of empty tree:", height(None))

    print("\n=== 3. Graph BFS ===")
    graph = {
        "A": ["B", "C"],
        "B": ["D"],
        "C": ["D"],
        "D": ["E"],
        "E": [],
    }
    print("BFS from A:", sorted(bfs(graph, "A")))

    print("\n=== 4. Graph DFS ===")
    dfs_order = dfs(graph, "A")
    print("DFS visit order from A:", dfs_order)
    print("Compare with BFS: DFS follows one branch deep before backtracking,")
    print("while BFS spreads out level by level.")

    print("\n=== 5. Priority queue with heapq ===")
    for priority, task in run_priority_queue_demo():
        print(f"{priority}: {task}")