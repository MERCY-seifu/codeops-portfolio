#variable and type
student_name = "Almaz Bekele" # str
age = 24 # int
balance = 1500.50 # float (ETB)
is_enrolled = True # bool
verified = None # no value yet
print(type(student_name)) # <class 'str'>
print(type(age)) # <class 'int'>
print(type(balance)) # <class 'float'>
print(type(is_enrolled)) # <class 'bool'>
print(type(verified)) # <class 'NoneType'>

#Type conversion
age_text = input("Your age: ") # e.g. "24" (a string!)
age = int(age_text) # 24 (now an int)
next_year = age + 1 # works only after int()
print("Next year you will be:", next_year)

#comparison
balance = 1500 # ETB
is_member = True
balance == 1500 # True
balance > 1000 and is_member # True
not is_member # False
print(balance == 1500) # True
print(balance > 1000 and is_member) # True
print(not is_member) # False

# Control Flow
balance = 1500 # ETB
if balance >= 1000:
 print("Premium customer")
elif balance >= 500:
 print("Standard customer")
else:
 print("Basic customer")