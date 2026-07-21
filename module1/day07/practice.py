import time
import random
from collections import deque


# Exercise 1:Name the Big-O

def ex1_list_index(data, i):
    # O(1) -- Python lists are backed by contiguous arrays, so indexing
    # jumps straight to the memory slot; no scanning is involved.
    return data[i]


def ex1_single_loop(data):
    # O(n) -- the loop visits every element exactly once, so work grows
    # linearly with the size of the input.
    total = 0
    for x in data:
        total += x
    return total


def ex1_nested_loop(data):
    # O(n^2) -- for every element in the outer loop we scan the whole list
    # again in the inner loop, so work grows with n * n.
    pairs = []
    for a in data:
        for b in data:
            pairs.append((a, b))
    return pairs


def ex1_dict_lookup(d, key):
    # O(1) average case -- a dict is a hash table; hashing the key gets us
    # (almost always) straight to the right bucket without scanning.
    return d.get(key)


def ex1_binary_search(sorted_data, target):
    # O(log n) -- each comparison throws away half of the remaining search
    # space, so the number of steps grows with log base 2 of n.
    lo, hi = 0, len(sorted_data) - 1
    while lo <= hi:
        mid = (lo + hi) // 2
        if sorted_data[mid] == target:
            return mid
        elif sorted_data[mid] < target:
            lo = mid + 1
        else:
            hi = mid - 1
    return -1


print("=== Exercise 1: Name the Big-O ===")
sample = [5, 2, 9, 1, 7]
sorted_sample = sorted(sample)
print("list index ->", ex1_list_index(sample, 2), "(O(1))")
print("single loop sum ->", ex1_single_loop(sample), "(O(n))")
print("nested loop pair count ->", len(ex1_nested_loop(sample)), "(O(n^2))")
print("dict lookup ->", ex1_dict_lookup({"a": 1, "b": 2}, "b"), "(O(1) average)")
print("binary search index ->", ex1_binary_search(sorted_sample, 7), "(O(log n))")
print()


# Exercise 2: List vs. dict lookup

print("=== Exercise 2: List vs. dict lookup ===")

N = 100_000
account_numbers = [f"ACC{i:07d}" for i in range(N)]

# A list: finding an item means scanning from the front -> O(n)
account_list = list(account_numbers)

# A dict: keyed by account number for O(1) average lookup
account_dict = {num: True for num in account_numbers}

target = account_numbers[N - 10]  

start = time.perf_counter()
found_in_list = target in account_list
list_time = time.perf_counter() - start

start = time.perf_counter()
found_in_dict = target in account_dict
dict_time = time.perf_counter() - start

print(f"List search:  found={found_in_list}  time={list_time:.6f}s  (O(n))")
print(f"Dict search:  found={found_in_dict}  time={dict_time:.6f}s  (O(1) average)")
print(f"Dict was ~{list_time / dict_time:.0f}x faster on this run")
print()

# Exercise 3: Build a stack

class Stack:
    """A simple LIFO stack backed by a Python list."""

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


print("=== Exercise 3: Build a stack ===")
names = ["Alice", "Ben", "Chidi", "Dana", "Eyob"]

name_stack = Stack()
for name in names:
    name_stack.push(name)

reversed_names = []
while not name_stack.is_empty():
    reversed_names.append(name_stack.pop())

print("original:", names)
print("reversed:", reversed_names)
print()


# Exercise 4: Build a queue

print("=== Exercise 4: Build a queue ===")

service_line = deque()
customers = ["Frehiwot", "Getachew", "Hana", "Isaac", "Jemal"]

for customer in customers:
    service_line.append(customer)  # enqueue at the back
    print(f"{customer} joined the line")

print("Now serving, in order:")
while service_line:
    served = service_line.popleft()  # serve from the front, FIFO
    print(f"  serving {served}")
print()


# Exercise 5: Singly linked list

class Node:
    def __init__(self, value, next_node=None):
        self.value = value
        self.next = next_node


class LinkedList:
    def __init__(self):
        self.head = None

    def push_front(self, value):
        # O(1) -- we only ever touch the current head, no traversal needed.
        self.head = Node(value, self.head)

    def print_all(self):
        # O(n) -- walks the chain one node at a time from head to tail.
        current = self.head
        values = []
        while current is not None:
            values.append(current.value)
            current = current.next
        print(" -> ".join(str(v) for v in values) if values else "(empty)")


print("=== Exercise 5: Singly linked list ===")
ll = LinkedList()
for value in [1, 2, 3, 4, 5]:
    ll.push_front(value)
ll.print_all()  # each push_front prepends, so output is reverse insertion order