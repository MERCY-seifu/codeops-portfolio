STOCK_FILE = "stock.txt"
LOW_STOCK_THRESHOLD = 10

stock = {}

try:
    with open(STOCK_FILE) as f:
        for line in f:
            line = line.strip()
            if not line:
                continue
            item, qty = line.split(",")
            stock[item] = int(qty)
except FileNotFoundError:
    print("No stock file yet — starting empty")


def adjust(item, amount):
    stock[item] = stock.get(item, 0) + amount

def save_stock():
    with open(STOCK_FILE, "w") as f:
        for item, qty in stock.items():
            f.write(f"{item},{qty}\n")

def low_stock_items():
    return [item for item, qty in stock.items() if qty < LOW_STOCK_THRESHOLD]


def print_report():
    print("\nCurrent stock:")
    for item, qty in stock.items():
        print(f"  {item}: {qty}")

    low = low_stock_items()
    print("\nLow stock (below", LOW_STOCK_THRESHOLD, "):")
    if low:
        for item in low:
            print(f"  ⚠ {item} — {stock[item]} left")
    else:
        print("  None — everything is well stocked.")

if __name__ == "__main__":
    print_report()

    # Example adjustments: a delivery arrives, and a sale goes out
    adjust("Amoxicillin", 20)   # restock
    adjust("Bandages", -15)     # sold some
    adjust("Ibuprofen", 25)     # brand-new item added via .get()

    print("\nAfter adjustments:")
    print_report()

    save_stock()
    print(f"\nSaved updated stock to {STOCK_FILE}")