# 1. Temperature label

print("=== 1. Temperature label ===")

temp = float(input("Enter a temperature in °C: "))

if temp < 15:
    print("cold")
elif temp <= 28:
    print("warm")
else:
    print("hot")


# 2. Receipt loop

print("\n=== 2. Receipt loop ===")

for n in range(1, 11):
    print(f"Receipt #{n}")


# 3. Even numbers

print("\n=== 3. Even numbers ===")

for n in range(1, 21):
    if n % 2 == 0:
        print(n)


# 4. Discount function

print("\n=== 4. Discount function ===")

def apply_discount(price, percent=10):
    return price - (price * percent / 100)

# Test with default (10%)
print(apply_discount(100))       # 90.0

# Test with a custom percent
print(apply_discount(100, 25))   # 75.0


# 5. Countdown

print("\n=== 5. Countdown ===")

count = 5
while count >= 1:
    print(count)
    count -= 1

print("Liftoff!")