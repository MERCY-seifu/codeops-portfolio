from abc import ABC, abstractmethod


# 1 & 5. Vehicle base class — made abstract with an abstract wheels() method

class Vehicle(ABC):
    def __init__(self, make, model):
        self.make = make
        self.model = model

    def describe(self):
        print(f"{self.make} {self.model}")

    @abstractmethod
    def wheels(self):
        """Each subclass must say how many wheels it has."""
        pass


# 1. Car subclass

class Car(Vehicle):
    def wheels(self):
        return 4


# 1, 2 & 3. Truck subclass — uses super(), adds capacity, overrides describe()

class Truck(Vehicle):
    def __init__(self, make, model, capacity):
        super().__init__(make, model)   # sets make and model via the parent
        self.capacity = capacity        # e.g. tons it can carry

    def describe(self):
        print(f"{self.make} {self.model} — capacity: {self.capacity} tons")

    def wheels(self):
        return 6


print("--- 1. Vehicle hierarchy ---")
car1 = Car("Toyota", "Corolla")
truck1 = Truck("Isuzu", "NPR", 5)
car1.describe()
truck1.describe()
print()

print("--- 2. super() in Truck ---")
truck2 = Truck("Sino", "Howo", 10)
print(f"{truck2.make} {truck2.model} can carry {truck2.capacity} tons")
print()

print("--- 3. Override: Truck.describe() mentions capacity ---")
truck1.describe()   # already shows capacity, unlike a plain Car
print()

print("--- 4. Polymorphism: one loop, many vehicle types ---")
vehicles = [
    Car("Toyota", "Corolla"),
    Car("Hyundai", "Elantra"),
    Truck("Isuzu", "NPR", 5),
    Truck("Sino", "Howo", 10),
]
for v in vehicles:
    v.describe()   # Car uses the base describe(), Truck uses its own
print()

print("--- 5. Abstract method: wheels() per subclass ---")
for v in vehicles:
    print(f"{v.make} {v.model} has {v.wheels()} wheels")

# Vehicle itself cannot be instantiated because it's abstract:
try:
    Vehicle("Generic", "Base")
except TypeError as e:
    print(f"\nBlocked: {e}")