# 1. Book class
class Book:
    def __init__(self, title, author, pages):
        self.title = title
        self.author = author
        self.pages = pages

    def describe(self):
        print(f"'{self.title}' by {self.author} — {self.pages} pages")


print("--- 1. Book class ---")
book1 = Book("Things Fall Apart", "Chinua Achebe", 209)
book2 = Book("Cutting for Stone", "Abraham Verghese", 541)
book1.describe()
book2.describe()
print()


# 2. Product class (quantity still public here)

class ProductV1:
    def __init__(self, name, price, quantity):
        self.name = name
        self.price = price          # ETB
        self.quantity = quantity

    def restock(self, n):
        self.quantity += n

    def sell(self, n):
        self.quantity -= n


print("--- 2. Product class (public quantity) ---")
p1 = ProductV1("Notebook", 45, 100)
p1.restock(20)
p1.sell(30)
print(f"{p1.name}: {p1.quantity} left in stock")
print()



# 3 & 4. Make it private + validate (final Product class)

class Product:
    def __init__(self, name, price, quantity=0):
        self.name = name
        self.price = price          # ETB
        self.__quantity = quantity

    @property
    def quantity(self):
        return self.__quantity

    def restock(self, n):
        if n <= 0:
            raise ValueError("Restock amount must be positive")
        self.__quantity += n

    def sell(self, n):
        if n <= 0:
            raise ValueError("Sell amount must be positive")
        if n > self.__quantity:
            raise ValueError("Not enough stock to sell that many")
        self.__quantity -= n


print("--- 3 & 4. Product class (private + validated) ---")
pen = Product("Pen", 12, 50)
pen.restock(10)
pen.sell(15)
print(f"{pen.name}: {pen.quantity} left in stock (price {pen.price} ETB)")

try:
    pen.sell(1000)   # would overdraw stock
except ValueError as e:
    print(f"Blocked oversell: {e}")


pen.__quantity = 9999
print(f"pen.__quantity (fake, harmless) = {pen.__quantity}")
print(f"pen.quantity   (real, via property) = {pen.quantity}")
print()



# 5. Prove independence between instances

print("--- 5. Independence between Product objects ---")
prod_a = Product("Eraser", 8, 100)
prod_b = Product("Ruler", 15, 60)
prod_c = Product("Sharpener", 10, 40)

prod_a.sell(40)   # only touch prod_a

print(f"{prod_a.name}: {prod_a.quantity}  (changed)")
print(f"{prod_b.name}: {prod_b.quantity}  (untouched)")
print(f"{prod_c.name}: {prod_c.quantity}  (untouched)")