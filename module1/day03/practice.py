# 1. Unique cities

cities = ["Addis Ababa", "Bahir Dar", "Addis Ababa", "Hawassa", "Bahir Dar", "Adama"]

unique_cities = set(cities)
print("Unique cities:", unique_cities)
print("Count:", len(unique_cities))

print("-" * 40)


# 2. Price report

prices_etb = {
    "Teff (kg)": 85,
    "Onion (kg)": 45,
    "Cooking Oil (L)": 320,
    "Berbere (kg)": 250,
    "Eggs (dozen)": 150,
}

for item, price in prices_etb.items():
    print(f"{item}: {price} ETB")

print("-" * 40)


# 3. Tax comprehension

prices = [100, 250, 400, 80]

prices_with_tax = [price * 1.15 for price in prices]
print("Prices with 15% tax:", prices_with_tax)

print("-" * 40)


# 4. Cheap items

cheap_items = [price for price in prices if price < 200]
print("Items under 200:", cheap_items)

print("-" * 40)


# 5. Write & read

customer_names = ["Selam", "Yonas", "Marta"]

with open("names.txt", "w") as f:
    for name in customer_names:
        f.write(name + "\n")

with open("names.txt") as f:
    for line in f:
        print(line.strip())

print("-" * 40)

# 6. Safe division

try:
    number = float(input("Enter a number to divide 1000 by: "))
    result = 1000 / number
    print("Result:", result)
except ValueError:
    print("That's not a valid number.")
except ZeroDivisionError:
    print("Can't divide by zero.")