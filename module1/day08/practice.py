# 1. Recursive sum + recursive countdown

def total(nums):
    """Recursively sum a list of numbers."""
    if not nums:            # base case: empty list
        return 0
    return nums[0] + total(nums[1:])   # recursive case


def count_down(n):
    """Recursively print n down to 1."""
    if n < 1:                # base case: nothing left to print
        return
    print(n)
    count_down(n - 1)         # recursive case

# 2. Binary search

def binary_search(items, target):
    """Return the index of target in a sorted list, or -1 if absent."""
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


# 3. Merge sort

def merge(left, right):
    """Merge two already-sorted lists into one sorted list."""
    result = []
    i = j = 0

    while i < len(left) and j < len(right):
        if left[i] <= right[j]:
            result.append(left[i])
            i += 1
        else:
            result.append(right[j])
            j += 1

    result.extend(left[i:])
    result.extend(right[j:])
    return result


def merge_sort(items):
    """Recursively sort a list using merge sort."""
    if len(items) <= 1:       # base case: already sorted
        return items

    mid = len(items) // 2
    left = merge_sort(items[:mid])
    right = merge_sort(items[mid:])
    return merge(left, right)

# 4. Sort with a key

def sort_by_balance_desc(name_balance_pairs):
    """Sort a list of (name, balance) tuples by balance, highest first."""
    return sorted(name_balance_pairs, key=lambda pair: pair[1], reverse=True)


# 5. Two pointers

def has_pair(nums, target):
    """Return True if two values in a sorted list sum to target."""
    left, right = 0, len(nums) - 1

    while left < right:
        current_sum = nums[left] + nums[right]
        if current_sum == target:
            return True
        elif current_sum < target:
            left += 1
        else:
            right -= 1

    return False

if __name__ == "__main__":
    print("=== 1. Recursive sum ===")
    print(total([10, 20, 30, 40]))       # 100
    print(total([]))                     # 0

    print("\n=== 1. Recursive countdown ===")
    count_down(5)                        # 5 4 3 2 1

    print("\n=== 2. Binary search ===")
    balances = [500, 875, 1200, 3120, 5200, 9400, 15750]
    print(binary_search(balances, 5200))  # index 4
    print(binary_search(balances, 999))   # -1

    print("\n=== 3. Merge sort ===")
    import random
    sample = random.sample(range(1, 1000), 15)
    mine = merge_sort(sample)
    builtin = sorted(sample)
    print("merge_sort matches sorted():", mine == builtin)
    print(mine)

    print("\n=== 4. Sort with a key ===")
    accounts = [("Abebe", 5200), ("Sara", 15750), ("Mesfin", 875), ("Hana", 9400)]
    print(sort_by_balance_desc(accounts))

    print("\n=== 5. Two pointers ===")
    sorted_nums = [1, 3, 5, 7, 9, 12, 20]
    print(has_pair(sorted_nums, 16))      # True (7 + 9)
    print(has_pair(sorted_nums, 50))      # False