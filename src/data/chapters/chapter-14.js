import PatternPlayground from '../../components/interactive/PatternPlayground';

export default {
id: 'chapter-14',
navTitle: '14. Design Patterns',
title: 'Chapter 14: Common Design Patterns',
learningObjectives: [
  'Understand the concept and value of design patterns',
  'Master essential creational, structural, and behavioral patterns',
  'Know when and how to apply patterns',
  'Recognize patterns in existing code'
],
content: `
<p>Design patterns are proven solutions to recurring problems. They represent the collective wisdom of the software development community, distilled into reusable templates. This chapter introduces the most important patterns every object-oriented developer should know.</p>

<h2>1. What Are Design Patterns?</h2>
<p>Design patterns are:</p>
<ul>
<li><strong>Reusable Solutions:</strong> Tested approaches to common problems</li>
<li><strong>Communication Tools:</strong> Shared vocabulary for developers</li>
<li><strong>Best Practices:</strong> Distilled experience of experts</li>
<li><strong>Not Code:</strong> Templates to be adapted, not copied</li>
</ul>

<h2>2. Creational Patterns</h2>

<h3>Singleton Pattern</h3>
<p>Ensures only one instance of a class exists:</p>
<pre><code>public class DatabaseConnection {
private static DatabaseConnection instance;

private DatabaseConnection() {} // Private constructor

public static synchronized DatabaseConnection getInstance() {
if (instance == null) {
instance = new DatabaseConnection();
}
return instance;
}
}</code></pre>

<h3>Factory Method Pattern</h3>
<p>Creates objects without specifying exact classes:</p>
<pre><code>public abstract class AnimalFactory {
abstract Animal createAnimal();
}
public class DogFactory extends AnimalFactory {
Animal createAnimal() {
return new Dog();
}
}</code></pre>

<h3>Builder Pattern</h3>
<p>Constructs complex objects step by step (covered in Chapter 9).</p>

<h2>3. Structural Patterns</h2>

<h3>Adapter Pattern</h3>
<p>Makes incompatible interfaces work together:</p>
<pre><code>// Legacy printer
class OldPrinter {
void printOldFormat(String text) { }
}
// Modern interface
interface Printer {
void print(String text);
}
// Adapter
class PrinterAdapter implements Printer {
private OldPrinter oldPrinter;

public void print(String text) {
oldPrinter.printOldFormat(text);
}
}</code></pre>

<h3>Decorator Pattern</h3>
<p>Adds new functionality without altering structure:</p>
<pre><code>interface Coffee {
double getCost();
}
class SimpleCoffee implements Coffee {
public double getCost() { return 2.0; }
}
class MilkDecorator implements Coffee {
private Coffee coffee;

public double getCost() {
return coffee.getCost() + 0.5;
}
}</code></pre>

<h2>4. Behavioral Patterns</h2>

<h3>Observer Pattern</h3>
<p>Notifies multiple objects about state changes:</p>
<pre><code>interface Observer {
void update(String message);
}
class Subject {
private List<Observer> observers = new ArrayList<>();

public void attach(Observer observer) {
observers.add(observer);
}

public void notifyObservers(String message) {
for (Observer observer : observers) {
observer.update(message);
}
}
}</code></pre>

<h3>Strategy Pattern</h3>
<p>Encapsulates algorithms and makes them interchangeable:</p>
<pre><code>interface PaymentStrategy {
void pay(double amount);
}
class CreditCardPayment implements PaymentStrategy {
public void pay(double amount) { /* ... */ }
}
class PayPalPayment implements PaymentStrategy {
public void pay(double amount) { /* ... */ }
}</code></pre>

<h2>5. When to Use Patterns</h2>
<ul>
<li><strong>DO:</strong> Use when you recognize the problem they solve</li>
<li><strong>DO:</strong> Adapt patterns to your specific needs</li>
<li><strong>DON'T:</strong> Force patterns where they don't fit</li>
<li><strong>DON'T:</strong> Over-engineer simple problems</li>
</ul>
`,
interactive: {
title: 'Pattern Playground',
description: 'Explore common design patterns with interactive examples. See how each pattern works and when to use them.',
component: PatternPlayground
},
quiz: {
title: 'Chapter 14 Quiz',
questions: [
{ type: 'mcq', question: 'What type of pattern is Singleton?', options: ['Creational', 'Structural', 'Behavioral', 'Architectural'], answerIndex: 0 },
{ type: 'mcq', question: 'Which pattern is best for adding functionality to objects dynamically?', options: ['Singleton', 'Factory', 'Decorator', 'Observer'], answerIndex: 2 },
{ type: 'mcq', question: 'The Observer pattern is useful for implementing:', options: ['Object creation', 'Event handling systems', 'Database connections', 'Data validation'], answerIndex: 1 },
{ type: 'mcq', question: 'Which pattern makes incompatible interfaces work together?', options: ['Bridge', 'Adapter', 'Proxy', 'Facade'], answerIndex: 1 },
{ type: 'fill-in', question: 'The ________ pattern encapsulates algorithms and makes them interchangeable.', answer: 'Strategy' },
{ type: 'fill-in', question: 'The ________ pattern ensures only one instance of a class exists.', answer: 'Singleton' },
{ type: 'coding-challenge', question: 'Implement a Factory Method pattern for creating different types of notifications (Email, SMS, Push). Each notification type should have a send() method.', modelAnswer: '// Product interface\\ninterface Notification {\\n    void send(String message, String recipient);\\n}\\n\\n// Concrete products\\nclass EmailNotification implements Notification {\\n    public void send(String message, String recipient) {\\n        System.out.println("Sending email to " + recipient + ": " + message);\\n        // Email sending logic\\n    }\\n}\\n\\nclass SMSNotification implements Notification {\\n    public void send(String message, String recipient) {\\n        System.out.println("Sending SMS to " + recipient + ": " + message);\\n        // SMS sending logic\\n    }\\n}\\n\\nclass PushNotification implements Notification {\\n    public void send(String message, String recipient) {\\n        System.out.println("Sending push to " + recipient + ": " + message);\\n        // Push notification logic\\n    }\\n}\\n\\n// Creator abstract class\\nabstract class NotificationFactory {\\n    // Factory method\\n    abstract Notification createNotification();\\n    \\n    // Business logic that uses the factory method\\n    public void notify(String message, String recipient) {\\n        Notification notification = createNotification();\\n        notification.send(message, recipient);\\n    }\\n}\\n\\n// Concrete creators\\nclass EmailNotificationFactory extends NotificationFactory {\\n    Notification createNotification() {\\n        return new EmailNotification();\\n    }\\n}\\n\\nclass SMSNotificationFactory extends NotificationFactory {\\n    Notification createNotification() {\\n        return new SMSNotification();\\n    }\\n}\\n\\nclass PushNotificationFactory extends NotificationFactory {\\n    Notification createNotification() {\\n        return new PushNotification();\\n    }\\n}\\n\\n// Usage\\npublic class NotificationService {\\n    public static void main(String[] args) {\\n        NotificationFactory factory;\\n        \\n        // Choose factory based on configuration\\n        String type = "email"; // Could come from config\\n        \\n        switch (type) {\\n            case "email":\\n                factory = new EmailNotificationFactory();\\n                break;\\n            case "sms":\\n                factory = new SMSNotificationFactory();\\n                break;\\n            case "push":\\n                factory = new PushNotificationFactory();\\n                break;\\n            default:\\n                throw new IllegalArgumentException("Unknown type: " + type);\\n        }\\n        \\n        factory.notify("Hello World!", "user@example.com");\\n    }\\n}' }
]
}
};
