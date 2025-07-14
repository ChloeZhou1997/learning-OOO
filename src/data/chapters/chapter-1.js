import ObjectShield from '../../components/interactive/ObjectShield';
import InheritanceTreeBuilder from '../../components/interactive/InheritanceTreeBuilder';
import PolymorphismSimulator from '../../components/interactive/PolymorphismSimulator';

export default {
id: 'chapter-1',
navTitle: '1. Intro to OO Concepts',
title: 'Chapter 1: Introduction to Object-Oriented Concepts',
learningObjectives: [
'Understand the fundamental difference between procedural and object-oriented programming paradigms',
'Define what objects and classes are, and explain their relationship to each other',
'Identify and explain the four pillars of object-orientation: encapsulation, inheritance, polymorphism, and composition',
'Distinguish between attributes (data) and behaviors (methods) in object-oriented design',
'Understand the concepts of data hiding and interfaces in encapsulation',
'Differentiate between "is-a" relationships (inheritance) and "has-a" relationships (composition)',
'Explain how polymorphism enables different objects to respond to the same message differently'
],
content: `
<p>Although many people find this bit of information surprising, object-oriented (OO) software development has been around since the early 1960s. Objects are now used throughout the software development industry. It is no secret that the software industry can be slow-moving at times. It is also true that, when systems are working fine, there has to be a compelling reason to replace them. This has somewhat slowed the propagation of OO systems.</p>

<p>Today, one of the most interesting areas of software development is the marriage of legacy and Internet based systems. In many cases, a web-based front-end ultimately connects to data that resides on a Mainframe. Developers who can combine the skills of mainframe and web development are in demand.</p>

<div class="info-box">
<h4>Object Wrappers</h4>
<p>Object wrappers are object-oriented code that includes other code inside. For example, you can take a structured module and wrap it inside an object to make it look like an object. You can also use object wrappers to wrap functionality such as security features, non-portable hardware features, and so on.</p>
</div>

<h2>Procedural Versus OO Programming</h2>

<p>Before we delve deeper into the advantages of OO development, let's consider a more fundamental question: What exactly is an object? This is both a complex and a simple question. It is complex because learning any method of software development is not trivial. It is simple because people already think in terms of objects.</p>

<p>For example, when you look at a person, you see the person as an object. And an object is defined by two terms: <strong>attributes</strong> and <strong>behaviors</strong>. A person has attributes, such as eye color, age, height, and so on. A person also has behaviors, such as walking, talking, breathing, and so on. In its basic definition, an object is an entity that contains both data and behavior. The word <em>both</em> is the key difference between OO programming and other programming methodologies.</p>

<div class="info-box">
<h4>Difference Between OO and Procedural</h4>
<p>In OO design, the attributes and behaviors are contained within a single object, whereas in procedural, or structured design, the attributes and behaviors are normally separated.</p>
</div>

<p>In procedural programming, code is placed into totally distinct functions or procedures. Ideally, these procedures then become "black boxes," where inputs go in and outputs come out. Data is placed into separate structures and is manipulated by these functions or procedures.</p>

<p>As illustrated in structured programming, the data is often separated from the procedures, and sometimes the data is global, so it is easy to modify data that is outside the scope of your code. This means that access to data is uncontrolled and unpredictable (that is, multiple functions may have access to the global data). Second, because you have no control over who has access to the data, testing and debugging are much more difficult. Objects address these problems by combining data and behavior into a nice, complete package.</p>

<div class="info-box">
<h4>Proper Design</h4>
<p>We can state that when properly designed, there is no such thing as global data in an OO model. This fact provides a high amount of data integrity in OO systems.</p>
</div>

<h2>What Exactly Is an Object?</h2>

<p>Objects are the building blocks of an OO program. A program that uses OO technology is basically a collection of objects. To illustrate, let's consider a graphics system that contains objects representing various shapes. Each of these objects is made up of the data and behavior described in the following sections.</p>

<h3>Object Data</h3>

<p>The data stored within an object represents the state of the object. In OO programming terminology, this data is called <strong>attributes</strong>. In our example, shape attributes could be position (x, y coordinates), color, size, rotation angle, and so on. The attributes contain the information that differentiates between the various objects, in this case the different shapes on screen.</p>

<h3>Object Behaviors</h3>

<p>The behavior of an object is what the object can do. In procedural languages the behavior is defined by procedures, functions, and subroutines. In OO programming terminology these behaviors are contained in <strong>methods</strong>, and you invoke a method by sending a message to it. In our shape example, consider that one of the behaviors required of a shape object is to set and return the values of the various attributes. Thus, each attribute would have corresponding methods, such as <code>setColor()</code> and <code>getColor()</code>. Other behaviors might include <code>draw()</code>, <code>move()</code>, <code>rotate()</code>, and <code>scale()</code>. In this case, when another object needs this information, it can send a message to a shape object and ask it to draw itself or report its position.</p>

<div class="info-box">
<h4>Getters and Setters</h4>
<p>The concept of getters and setters supports the concept of data hiding. Because other objects should not directly manipulate data within another object, the getters and setters provide controlled access to an object's data. Getters and setters are sometimes called accessor methods and mutator methods, respectively.</p>
</div>

<h2>What Exactly Is a Class?</h2>

<p>In short, a class is a blueprint for an object. When you instantiate an object, you use a class as the basis for how the object is built. In fact, trying to explain classes and objects is really a chicken-and-egg dilemma. It is difficult to describe a class without using the term object and visa versa.</p>

<p>For example, a specific individual bike is an object. However, someone had to have created the blueprints (that is, the class) to build the bike. In OO software, unlike the chicken-and-egg dilemma, we do know what comes first—the class. An object cannot be instantiated without a class.</p>

<p>To explain classes and methods, it's helpful to use an example from the relational database world. In a database table, the definition of the table itself (fields, description, and data types used) would be a class (metadata), and the objects would be the rows of the table (data).</p>

<h3>Classes Are Object Templates</h3>

<p>Classes can be thought of as the templates, or cookie cutters, for objects. A class is used to create an object.</p>

<p>A class can be thought of as a sort of higher-level data type. For example, just as you create an integer or a float:</p>
<pre><code>int x;
float y;</code></pre>

<p>you can also create an object by using a predefined class:</p>
<pre><code>myClass myObject;</code></pre>

<p>In this example, the names themselves make it obvious that <code>myClass</code> is the class and <code>myObject</code> is the object.</p>

<p>For example, here is a simple definition of a Person class:</p>
<pre><code>public class Person{
    //Attributes
    private String name;
    private String address;
    
    //Methods
    public String getName(){
        return name;
    }
    public void setName(String n){
        name = n;
    }
    public String getAddress(){
        return address;
    }
    public void setAddress(String adr){
        address = adr;
    }
}</code></pre>

<div class="info-box">
<h4>From Simple to Complex</h4>
<p>While this Person class is a toy example for learning, the same principles scale to production frameworks. PyTorch's <code>nn.Module</code> manages neural network parameters, TensorFlow's <code>Layer</code> handles tensor operations, and LangChain's <code>Chain</code> orchestrates AI workflows - all using these same OO foundations. Throughout this book, we'll explore how these simple concepts enable building sophisticated frameworks used by millions.</p>
</div>

<h3>Attributes</h3>

<p>As you already saw, the data of a class is represented by attributes. Each class must define the attributes that will store the state of each object instantiated from that class. In the Person class example in the previous section, the Person class defines attributes for <code>name</code> and <code>address</code>.</p>

<div class="info-box">
<h4>Access Designations</h4>
<p>When a data type or method is defined as public, other objects can directly access it. When a data type or method is defined as private, only that specific object can access it. Another access modifier, protected, allows access by related objects, which you'll learn about in Chapter 3.</p>
</div>

<h3>Methods</h3>

<p>Methods implement the required behavior of a class. Every object instantiated from this class has the methods as defined by the class. Methods may implement behaviors that are called from other objects (messages) or provide the fundamental, internal behavior of the class. Internal behaviors are private methods that are not accessible by other objects. In the Person class, the behaviors are <code>getName()</code>, <code>setName()</code>, <code>getAddress()</code>, and <code>setAddress()</code>. These methods allow other objects to inspect and change the values of the object's attributes. This is common technique in OO systems. In all cases, access to attributes within an object should be controlled by the object itself—no other object should directly change an attribute of another.</p>

<h3>Messages</h3>

<p>Messages are the communication mechanism between objects. For example, when Object A invokes a method of Object B, Object A is sending a message to Object B. Object B's response is defined by its return value. Only the public methods, not the private methods, of an object can be invoked by another object. The following code illustrates this concept:</p>

<pre><code>public class DrawingCanvas{
    Shape shape = new Circle();
    shape.setColor("red");
    shape.setPosition(100, 200);
    ... code
    String color = shape.getColor();
    shape.draw();
}</code></pre>

<p>In this example (assuming that a DrawingCanvas object is instantiated), the DrawingCanvas object is sending messages to a Shape object, setting its properties and instructing it to draw itself via the <code>draw</code> method.</p>

<h2>The Four Pillars of Object-Orientation</h2>

<p>Now let's examine the four foundational concepts upon which all object-oriented design and programming are built:</p>

<ol>
<li><strong><span class="tooltip" data-tooltip="Bundling data (attributes) and the methods that operate on that data into a single unit, or object.">Encapsulation</span>:</strong> This is the mechanism of hiding the internal state of an object and requiring all interaction to be performed through an object's methods. Think of it as a protective shield that prevents data from being randomly accessed or modified.</li>
<li><strong><span class="tooltip" data-tooltip="The mechanism by which one class can inherit the properties and methods of another class. This fosters code reuse.">Inheritance</span>:</strong> This allows a new class (subclass) to be based on an existing class (superclass), inheriting its attributes and behaviors. This represents an <em>is-a</em> relationship (e.g., a <code>Car</code> is a <code>Vehicle</code>).</li>
<li><strong><span class="tooltip" data-tooltip="From Greek, meaning 'many forms'. It's the ability for different objects to respond to the same message or method call in their own unique way.">Polymorphism</span>:</strong> This allows you to treat objects of different classes that share a common superclass or interface as if they were objects of the common type. A single command can have different effects depending on the object it's sent to.</li>
<li><strong><span class="tooltip" data-tooltip="The process of building a class not by inheriting from another, but by being 'composed' of other objects.">Composition</span>:</strong> This involves creating complex objects by combining simpler ones. This represents a <em>has-a</em> relationship (e.g., a <code>Car</code> has an <code>Engine</code>).</li>
</ol>

<h2>Encapsulation and Data Hiding</h2>

<p>One of the primary advantages of using objects is that the object need not reveal all its attributes and behaviors. In good OO design (at least what is generally accepted as good), an object should only reveal the interfaces that other objects must have to interact with it. Details not pertinent to the use of the object should be hidden from all other objects.</p>

<p>Encapsulation is defined by the fact that objects contain both the attributes and behaviors. Data hiding is a major part of encapsulation.</p>

<p>For example, an object that calculates the square of a number must provide an interface to obtain the result. However, the internal attributes and algorithms used to calculate the square need not be made available to the requesting object.</p>

<h3>Interfaces</h3>

<p>We have seen that the interface defines the fundamental means of communication between objects. Each class design specifies the interfaces for the proper instantiation and operation of objects. Any behavior that the object provides must be invoked by a message sent using one of the provided interfaces. The interface should completely describe how users of the class interact with the class. In most OO languages, the methods that are part of the interface are designated as public.</p>

<div class="info-box">
<h4>Private Data</h4>
<p>For data hiding to work, all attributes should be declared as private. Thus, attributes are never part of the interface. Only the public methods are part of the class interface. Declaring an attribute as public breaks the concept of data hiding.</p>
</div>

<h3>Implementations</h3>

<p>Only the public attributes and methods are considered the interface. The user should not see any part of the implementation—interacting with an object solely through class interfaces. In the previous example, for instance the Shape class, only the attributes were hidden. In many cases, there will be methods that also should be hidden and thus not part of the interface. For example, internal calculation methods for determining bounding boxes or collision detection might be private.</p>

<h3>A Real-World Example of the Interface/Implementation Paradigm</h3>

<p>The interface/implementation paradigm can be illustrated using real-world objects. The toaster requires electricity. To get this electricity, the cord from the toaster must be plugged into the electrical outlet, which is the interface. All the toaster needs to do to obtain the required electricity is to use a cord that complies with the electrical outlet specifications; this is the interface between the toaster and the power company (actually the power industry). The fact that the actual implementation is a coal-powered electric plant is not the concern of the toaster. In fact, for all the toaster cares, the implementation could be a nuclear power plant or a local power generator. With this model, any appliance can get electricity, as long as it conforms to the interface specification.</p>

<h3>A Model of the Interface/Implementation Paradigm</h3>

<p>Let's explore the Square class further. Assume that you are writing a class that calculates the squares of integers. You must provide a separate interface and implementation. That is, you must provide a way for the user to invoke and obtain the square value. You must also provide the implementation that calculates the square; however, the user should not know anything about the specific implementation.</p>

<p>This class diagram corresponds to the following code:</p>
<pre><code>public class IntSquare {
    // private attribute
    private int squareValue;
    
    // public interface
    public int getSquare(int value) {
        squareValue = calculateSquare(value);
        return squareValue;
    }
    
    // private implementation
    private int calculateSquare(int value) {
        return value * value;
    }
}</code></pre>

<p>Note that the only part of the class that the user has access to is the public method <code>getSquare</code>, which is the interface. The implementation of the square algorithm is in the method <code>calculateSquare</code>, which is private. Also notice that the attribute <code>squareValue</code> is private because users do not need to know that this attribute exists. Therefore, we have hidden the part of the implementation: The object only reveals the interfaces the user needs to interact with it, and details that are not pertinent to the use of the object are hidden from other objects.</p>

<p>If the implementation were to change—say, you wanted to use the language's built-in square function—you would not need to change the interface. The user would get the same functionality, but the implementation would have changed. This is very important when you're writing code that deals with data; for example, you can move data from a file to a database without forcing the user to change any application code.</p>

<h2>Inheritance</h2>

<p>One of the most powerful features of OO programming is, perhaps, code reuse. Structured design provides code reuse to a certain extent—you can write a procedure and then use it as many times as you want. However, OO design goes an important step further, allowing you to define relationships between classes that facilitate not only code reuse, but also better overall design, by organizing classes and factoring in commonalities of various classes. Inheritance is a primary means of providing this functionality.</p>

<p>Inheritance allows a class to inherit the attributes and methods of another class. This allows creation of brand new classes by abstracting out common attributes and behaviors.</p>

<p>One of the major design issues in OO programming is to factor out commonality of the various classes. For example, say you have a <code>Dog</code> class and a <code>Cat</code> class, and each will have an attribute for eye color. In a procedural model, the code for Dog and Cat would each contain this attribute. In an OO design, the color attribute could be moved up to a class called <code>Mammal</code>—along with any other common attributes and methods. In this case, both <code>Dog</code> and <code>Cat</code> inherit from the <code>Mammal</code> class.</p>

<p>The <code>Dog</code> and <code>Cat</code> classes both inherit from <code>Mammal</code>. This means that a <code>Dog</code> class actually has the following attributes:</p>
<ul>
<li><code>eyeColor</code> // inherited from Mammal</li>
<li><code>barkFrequency</code> // defined only for Dogs</li>
</ul>

<p>In the same vein, <code>Dog</code> object has the following methods:</p>
<ul>
<li><code>getEyeColor</code> // inherited from Mammal</li>
<li><code>bark</code> // defined only for Dogs</li>
</ul>

<p>When the <code>Dog</code> or the <code>Cat</code> object is instantiated, it contains everything in its own class, as well as everything from the parent class. Thus, <code>Dog</code> has all the properties of its class definition, as well as the properties inherited from the <code>Mammal</code> class.</p>

<h3>Superclasses and Subclasses</h3>

<p>The superclass, or parent class, contains all the attributes and behaviors that are common to classes that inherit from it. For example, in the case of the <code>Mammal</code> class, all mammals have similar attributes such as <code>eyeColor</code> and <code>hairColor</code>, as well as behaviors such as <code>generateInternalHeat</code> and <code>growHair</code>. All mammals have these attributes and behaviors, so it is not necessary to duplicate them down the inheritance tree for each type of mammal. Duplication requires a lot more work, and perhaps more worrisome, it can introduce errors and inconsistencies. Thus, the <code>Dog</code> and <code>Cat</code> classes inherit all those common attributes and behaviors from the <code>Mammal</code> class. The <code>Mammal</code> class is considered the superclass of the <code>Dog</code> and the <code>Cat</code> subclasses, or child classes.</p>

<p>Inheritance provides a rich set of design advantages. When you're designing a <code>Cat</code> class, the <code>Mammal</code> class provides much of the functionality needed. By inheriting from the <code>Mammal</code> object, <code>Cat</code> already has all the attributes and behaviors that make it a true mammal. To make it more specifically a cat type of mammal, the <code>Cat</code> class must include any attributes or behaviors that pertain solely to a cat.</p>

<h3>Abstraction</h3>

<p>An inheritance tree can grow quite large. When the <code>Mammal</code> and <code>Cat</code> classes are complete, other mammals, such as dogs (or lions, tigers, and bears), can be added quite easily. The <code>Cat</code> class can also be a superclass to other classes. For example, it might be necessary to abstract the <code>Cat</code> class further, to provide classes for Persian cats, Siamese cats, and so on. Just as with <code>Cat</code>, the <code>Dog</code> class can be the parent for <code>GermanShepherd</code> and <code>Poodle</code>. The power of inheritance lies in its abstraction and organization techniques.</p>

<p>In most recent OO languages (such as Java and .NET), a class can only have a single parent class; however, a class can have many child classes. Some languages, such as C++, can have multiple parents. The former case is called single-inheritance, and the latter is called multiple-inheritance.</p>

<h3>Is-a Relationships</h3>

<p>Consider a Shape example where <code>Circle</code>, <code>Square</code>, and <code>Star</code> all inherit directly from <code>Shape</code>. This relationship is often referred to as an is-a relationship because a circle is a shape, and square is a shape. When a subclass inherits from a superclass, it can do anything that the superclass can do. Thus, <code>Circle</code>, <code>Square</code>, and <code>Star</code> are all extensions of <code>Shape</code>.</p>

<h2>Polymorphism</h2>

<p>Polymorphism is a Greek word that literally means many shapes. Although polymorphism is tightly coupled to inheritance, it is often cited separately as one of the most powerful advantages to object-oriented technologies. When a message is sent to an object, the object must have a method defined to respond to that message. In an inheritance hierarchy, all subclasses inherit the interfaces from their superclass. However, because each subclass is a separate entity, each might require a separate response to the same message.</p>

<p>For example, consider the <code>Shape</code> class and the behavior called <code>Draw</code>. When you tell somebody to draw a shape, the first question asked is, "What shape?" No one can draw a shape, as it is an abstract concept (in fact, the <code>Draw()</code> method in the <code>Shape</code> code following contains no implementation). You must specify a concrete shape. To do this, you provide the actual implementation in <code>Circle</code>. Even though <code>Shape</code> has a <code>Draw</code> method, <code>Circle</code> overrides this method and provides its own <code>Draw()</code> method. Overriding basically means replacing an implementation of a parent with one from a child.</p>

<p>For example, suppose you have an array of three shapes—<code>Circle</code>, <code>Square</code>, and <code>Star</code>. Even though you treat them all as <code>Shape</code> objects, and send a <code>Draw</code> message to each <code>Shape</code> object, the end result is different for each because <code>Circle</code>, <code>Square</code>, and <code>Star</code> provide the actual implementations. In short, each class is able to respond differently to the same <code>Draw</code> method and draw itself. This is what is meant by polymorphism.</p>

<p>Consider the following <code>Shape</code> class:</p>
<pre><code>public abstract class Shape{
    private double area;
    public abstract double getArea();
}</code></pre>

<p>The <code>Shape</code> class has an attribute called <code>area</code> that holds the value for the area of the shape. The method <code>getArea()</code> includes an identifier called <code>abstract</code>. When a method is defined as abstract, a subclass must provide the implementation for this method; in this case, <code>Shape</code> is requiring subclasses to provide a <code>getArea()</code> implementation. Now let's create a class called <code>Circle</code> that inherits from <code>Shape</code> (the <code>extends</code> keyword specifies that <code>Circle</code> inherits from <code>Shape</code>):</p>

<pre><code>public class Circle extends Shape{
    double radius;
    
    public Circle(double r) {
        radius = r;
    }
    
    public double getArea() {
        area = 3.14 * (radius * radius);
        return (area);
    }
}</code></pre>

<p>We introduce a new concept here called a constructor. The <code>Circle</code> class has a method with the same name, <code>Circle</code>. When a method name is the same as the class and no return type is provided, the method is a special method, called a constructor. Consider a constructor as the entry point for the class, where the object is built; the constructor is a good place to perform initializations and start-up tasks.</p>

<p>The <code>Circle</code> constructor accepts a single parameter, representing the radius, and assigns it to the radius attribute of the <code>Circle</code> class.</p>

<p>The <code>Circle</code> class also provides the implementation for the <code>getArea</code> method, originally defined as abstract in the <code>Shape</code> class.</p>

<p>We can create a similar class, called <code>Rectangle</code>:</p>
<pre><code>public class Rectangle extends Shape{
    double length;
    double width;
    
    public Rectangle(double l, double w){
        length = l;
        width = w;
    }
    
    public double getArea() {
        area = length * width;
        return (area);
    }
}</code></pre>

<p>Now we can create any number of rectangles, circles, and so on and invoke their <code>getArea()</code> method. This is because we know that all rectangles and circles inherit from <code>Shape</code>, and all shape classes have a <code>getArea()</code> method. If a subclass inherits an abstract method from a superclass, it must provide a concrete implementation of that method, or else it will be an abstract class itself.</p>

<p>Thus, we can instantiate the <code>Shape</code> classes in this way:</p>
<pre><code>Circle circle = new Circle(5);
Rectangle rectangle = new Rectangle(4,5);</code></pre>

<p>Then, using a construct such as a stack, we can add these shape classes to the stack:</p>
<pre><code>stack.push(circle);
stack.push(rectangle);</code></pre>

<div class="info-box">
<h4>What Is a Stack?</h4>
<p>A stack is a data structure that is a last-in, first-out system. It is like a coin changer, where you insert coins at the top of the cylinder and, when you need a coin, you simply take one off the top, which is the last one you inserted. Pushing an item onto the stack means that you are adding an item to the top (like inserting another coin into the changer). Popping an item off the stack means that you are taking the last item off the stack (like taking the coin off the top).</p>
</div>

<p>Now comes the fun part. We can empty the stack, and we do not have to worry about what kind of <code>Shape</code> classes are in it (we just know they are shapes):</p>
<pre><code>while (!stack.empty()) {
    Shape shape = (Shape) stack.pop();
    System.out.println("Area = " + shape.getArea());
}</code></pre>

<p>In reality, we are sending the same message to all the shapes:</p>
<pre><code>shape.getArea()</code></pre>

<p>However, the actual behavior that takes place depends on the type of shape. For example, <code>Circle</code> will calculate the area for a circle, and <code>Rectangle</code> will calculate the area of a rectangle. In effect (and here is the key concept), we are sending a message to the <code>Shape</code> classes and experiencing different behavior depending on what subclass of <code>Shape</code> is being used.</p>

<p>This approach is meant to provide standardization across classes, as well as applications. Consider an office suite that includes a word processing and a spreadsheet application. Let's assume that both have a method called <code>Print</code>. This <code>Print</code> method can be part of the office class as a requirement—any class that inherits from it to implement a <code>Print</code> method. The interesting thing here is that although both the word processor and spreadsheet do different things when the <code>Print</code> method is invoked, one prints a processing document and the other a spreadsheet document.</p>

<h2>Composition</h2>

<p>It is natural to think of objects as containing other objects. A television set contains a tuner and video display. A computer contains video cards, keyboards, and drives. Although the computer can be considered an object unto itself, the drive is also considered a valid object. In fact, you could open up the computer and remove the drive and hold it in your hand. Both the computer and the drive are considered objects. It is just that the computer contains other objects—such as drives.</p>

<p>In this way, objects are often built, or composed, from other objects: This is composition.</p>

<h3>Abstraction</h3>

<p>Just as with inheritance, composition provides a mechanism for building objects. In fact, I would argue that there are only two ways to build classes from other classes: inheritance and composition. As we have seen, inheritance allows one class to inherit from another class. We can thus abstract out attributes and behaviors for common classes. For example, dogs and cats are both mammals because a dog is-a mammal and a cat is-a mammal. With composition, we can also build classes by embedding classes in other classes.</p>

<p>Consider the relationship between a car and an engine. The benefits of separating the engine from the car are evident. By building the engine separately, we can use the engine in various cars—not to mention other advantages. But we can't say that an engine is-a car. This just doesn't sound right when it rolls off the tongue (and because we are modeling real-world systems, this is the effect we want). Rather, we use the term has-a to describe composition relationships. A car has-a(n) engine.</p>

<h3>Has-a Relationships</h3>

<p>Although an inheritance relationship is considered an is-a relationship for reasons already discussed, a composition relationship is termed a has-a relationship. Using the example in the previous section, a television has-a tuner and has-a video display. A television is obviously not a tuner, so there is no inheritance relationship. In the same vein, a computer has-a video card, has-a keyboard, and has-a disk drive. The topics of inheritance, composition, and how they relate to each other is covered in great detail in Chapter 7, "Mastering Inheritance and Composition."</p>

<h2>Conclusion</h2>

<p>There is a lot to cover when discussing OO technologies. However, you should leave this chapter with a good understanding of the following topics:</p>
<ul>
<li><strong>Encapsulation</strong>—Encapsulating the data and behavior into a single object is of primary importance in OO development. A single object contains both its data and behaviors and can hide what it wants from other objects.</li>
<li><strong>Inheritance</strong>—A class can inherit from another class and take advantage of the attributes and methods defined by the superclass.</li>
<li><strong>Polymorphism</strong>—Polymorphism means that similar objects can respond to the same message in different ways. For example, you might have a system with many shapes. However, a circle, a square, and a star are each drawn differently. Using polymorphism, you can send each of these shapes the same message (for example, Draw), and each shape is responsible for drawing itself.</li>
<li><strong>Composition</strong>—Composition means that an object is built from other objects.</li>
</ul>

<p>This chapter covers the fundamental OO concepts of which by now you should have a good grasp.</p>
`,
interactive: {
title: 'The Object Shield (Encapsulation)',
description: 'A visual demonstration of how a public interface protects private data from outside interference.',
component: ObjectShield
},
additionalInteractives: [
{
afterSection: 'Inheritance',
title: 'Inheritance Tree Builder',
description: 'Explore how inheritance creates hierarchies of related classes and how properties and methods are passed down.',
component: InheritanceTreeBuilder
},
{
afterSection: 'Polymorphism',
title: 'Polymorphism Simulator',
description: 'See polymorphism in action as different objects respond to the same method calls in their own unique ways.',
component: PolymorphismSimulator
}
],
quiz: {
title: 'Chapter 1 Quiz',
questions: [
{ type: 'mcq', question: 'Which OO concept involves bundling data and methods together?', options: ['Inheritance', 'Encapsulation', 'Polymorphism', 'Abstraction'], answerIndex: 1 },
{ type: 'mcq', question: 'An "is-a" relationship is best represented by:', options: ['Composition', 'Aggregation', 'Inheritance', 'Association'], answerIndex: 2 },
{ type: 'mcq', question: 'A Car "has an" Engine. This is an example of:', options: ['Inheritance', 'Encapsulation', 'Polymorphism', 'Composition'], answerIndex: 3 },
{ type: 'fill-in', question: 'The ability for different objects to respond to the same message in their own unique way is called ________.', answer: 'polymorphism' },
{ type: 'fill-in', question: '________ is the mechanism of hiding the internal state of an object and requiring all interaction through methods.', answer: 'Encapsulation' }
]
}
};