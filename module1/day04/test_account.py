from account import Account


def main():
    print("--- Creating two accounts ---")
    acc1 = Account("Almaz Tesfaye", "AB-1001", 500)
    acc2 = Account("Dawit Bekele", "AB-1002", 200)

    print("\n--- Running transactions ---")
    acc1.deposit(1500)
    acc1.withdraw(300)
    acc2.deposit(50)

    print("\n--- Statements ---")
    acc1.statement()
    print()
    acc2.statement()

    print("\n--- Reading balance via property (no direct edits) ---")
    print(f"acc1.balance = {acc1.balance}")
    try:
        acc1.balance = 999999
    except AttributeError as e:
        print(f"OK — blocked direct edit: {e}")

    print("\n--- Rejecting a negative deposit ---")
    try:
        acc1.deposit(-100)
    except ValueError as e:
        print(f"OK — blocked: {e}")

    print("\n--- Rejecting an overdraft ---")
    try:
        acc2.withdraw(10_000)
    except ValueError as e:
        print(f"OK — blocked: {e}")

    print("\n--- Confirming accounts are independent ---")
    print(f"acc1 balance: {acc1.balance} ETB")
    print(f"acc2 balance: {acc2.balance} ETB")


if __name__ == "__main__":
    main()