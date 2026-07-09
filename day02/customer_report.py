customers = [
    ("Almaz", 1500),
    ("Dawit", 700),
    ("Tigist", 200),
    ("Hanna", 1200),
    ("Samuel", 450),
]


def tier(balance):
    """Return the customer's tier based on their TeleBirr balance."""
    if balance >= 1000:
        return "Premium"
    elif balance >= 500:
        return "Standard"
    return "Basic"


# Keep a running count of each tier as we go
tier_counts = {"Premium": 0, "Standard": 0, "Basic": 0}

print("TeleBirr Customer Report")
print("-" * 30)

for name, balance in customers:
    customer_tier = tier(balance)
    print(f"{name}: {customer_tier} ({balance} ETB)")
    tier_counts[customer_tier] += 1

print("-" * 30)
print("Summary:")
for tier_name, count in tier_counts.items():
    print(f"  {tier_name}: {count} customer(s)")