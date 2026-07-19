# Exercise 1 

class Report:
    """Owns only the report's content."""

    def __init__(self, title, body):
        self.title = title
        self.body = body

    def build(self):
        return f"=== {self.title} ===\n{self.body}"


class ReportSaver:
    """Owns only persistence."""

    def save(self, report: Report, path: str):
        content = report.build()
        # In real life this would write to disk; we just simulate it.
        print(f"[ReportSaver] Saved '{report.title}' to {path} "
              f"({len(content)} chars)")


class ReportMailer:
    """Owns only notification/delivery."""

    def email(self, report: Report, address: str):
        print(f"[ReportMailer] Emailed '{report.title}' to {address}")


def exercise_1():
    print("\n--- Exercise 1: SRP ---")
    report = Report("Q3 Summary", "Revenue grew 12% quarter over quarter.")
    ReportSaver().save(report, "reports/q3_summary.txt")
    ReportMailer().email(report, "manager@ibtcollege.ca")


# Exercise 2

class Shape:
    def area(self):
        raise NotImplementedError


class Circle(Shape):
    def __init__(self, radius):
        self.radius = radius

    def area(self):
        return 3.14159 * self.radius ** 2


class Square(Shape):
    def __init__(self, side):
        self.side = side

    def area(self):
        return self.side ** 2


class Triangle(Shape):
    def __init__(self, base, height):
        self.base = base
        self.height = height

    def area(self):
        return 0.5 * self.base * self.height


def exercise_2():
    print("\n--- Exercise 2: OCP ---")
    shapes = [Circle(4), Square(3), Triangle(6, 5)]
    for shape in shapes:
        print(f"{shape.__class__.__name__}: area = {shape.area():.2f}")



# Exercise 3


class AppSettings:
    _instance = None

    def __new__(cls):
        if cls._instance is None:
            cls._instance = super().__new__(cls)
            cls._instance.currency = "ETB"
        return cls._instance


def exercise_3():
    print("\n--- Exercise 3: Singleton ---")
    a = AppSettings()
    b = AppSettings()
    print(f"a.currency = {a.currency}, b.currency = {b.currency}")
    print(f"a is b -> {a is b}")  # should be True


# Exercise 4 


class ShapeFactory:
    @staticmethod
    def create(kind, *args):
        if kind == "circle":
            return Circle(*args)
        if kind == "square":
            return Square(*args)
        if kind == "triangle":
            return Triangle(*args)
        raise ValueError(f"Unknown shape type: {kind}")


def exercise_4():
    print("\n--- Exercise 4: Factory ---")
    shape = ShapeFactory.create("circle", 2.5)
    print(f"Created {shape.__class__.__name__}, area = {shape.area():.2f}")


# Exercise 5 


class NewsAgency:
    def __init__(self):
        self._subscribers = []

    def subscribe(self, subscriber):
        self._subscribers.append(subscriber)

    def publish(self, headline):
        for sub in self._subscribers:
            sub.update(headline)


class EmailSubscriber:
    def update(self, headline):
        print(f"[Email] Breaking news: {headline}")


class AppNotificationSubscriber:
    def update(self, headline):
        print(f"[Push Notification] {headline}")


def exercise_5():
    print("\n--- Exercise 5: Observer ---")
    agency = NewsAgency()
    agency.subscribe(EmailSubscriber())
    agency.subscribe(AppNotificationSubscriber())
    agency.publish("IBT College launches new CodeOps cohort")


if __name__ == "__main__":
    exercise_1()
    exercise_2()
    exercise_3()
    exercise_4()
    exercise_5()