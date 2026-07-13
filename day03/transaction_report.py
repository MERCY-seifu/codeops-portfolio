TRANSACTIONS_FILE = "transactions.txt"
REPORT_FILE = "report.txt"


def read_transactions(filepath):
    """Read transactions.txt line by line and build a dict of
    customer -> total spend. Returns None if the file is missing."""
    totals = {}
    try:
        with open(filepath, "r") as f:
            for line in f:
                line = line.strip()
                if not line:
                    continue  # skip blank lines
                name, amount = line.split(",")
                amount = float(amount)
                totals[name] = totals.get(name, 0) + amount
    except FileNotFoundError:
        print(f"Error: '{filepath}' was not found. Please check the file path.")
        return None

    return totals


def build_summary_lines(totals):
    """Sort customers by total spend, highest first, and format output lines."""
    sorted_totals = sorted(totals.items(), key=lambda item: item[1], reverse=True)
    lines = []
    for name, total in sorted_totals:
        lines.append(f"{name}: {total:.2f}")
    return lines


def write_report(lines, filepath):
    """Write the summary lines to report.txt."""
    with open(filepath, "w") as f:
        f.write("TeleBirr Transaction Summary\n")
        f.write("=============================\n")
        for line in lines:
            f.write(line + "\n")


def main():
    totals = read_transactions(TRANSACTIONS_FILE)

    if totals is None:
        # Missing file was handled gracefully above; nothing more to do.
        return

    if not totals:
        print("No transactions found in the file.")
        return

    summary_lines = build_summary_lines(totals)

    print("Customer Totals (highest first):")
    for line in summary_lines:
        print(f"  {line}")

    write_report(summary_lines, REPORT_FILE)
    print(f"\nSummary written to {REPORT_FILE}")


if __name__ == "__main__":
    main()