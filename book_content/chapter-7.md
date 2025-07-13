# Chapter 7: Mastering Inheritance and Composition

Inheritance and composition play major roles in the design of object-oriented (OO) systems. In fact, many of the most difficult and interesting design decisions come down to deciding between inheritance and composition.

Both inheritance and composition are mechanisms for reuse. Inheritance, as its name implies, involves inheriting attributes and behaviors from other classes. In this case, there is a true parent/child relationship. The child (or subclass) inherits directly from the parent (or superclass).

Composition, also as its name implies, involved building objects by using other objects. In this chapter we will explore the obvious and subtle differences between inheritance and composition. Primarily, we will consider the appropriate times to use one or the other.

## Reusing Objects

Perhaps the primary reason that inheritance and composition exist is object reuse. In short, you can build classes (which become objects) by utilizing other classes via inheri- tance and composition, which in effect, are the only ways to reuse previously built classes.

Inheritance represents the is–a relationship that was introduced in Chapter 1,“Intro- duction to Object-Oriented Concepts.” For example, a dog is a mammal.

Composition involves using other classes to build more complex classes—a sort of as- sembly. There is no parent/child relationship in this case. Basically, complex objects are composed of other objects. Composition represents a has-a relationship. For example, a car has an engine. Both the engine and the car are separate, potentially standalone ob- jects. However, the car is a complex object that contains (has an) engine object. In fact, a child object might itself be composed of other objects; for example, the engine might in- clude cylinders. In this case an engine has a cylinder, actually several.

When OO technologies first entered the mainstream, inheritance was all the rage. The fact that you could design a class once and then inherit functionality from it was consid- ered the foremost advantage to using OO technologies. Reuse was the name of the game, and inheritance was the ultimate expression of reuse.

However, over time the luster of inheritance has dulled a bit. In fact, in some discus- sions, the use of inheritance itself is questioned. In their book Java Design, Peter Coad and Mark Mayfield have a complete chapter titled “Design with Composition Rather Than Inheritance.” Many early object-based platforms did not even support true inheritance. As Visual Basic evolved in to Visual Basic .NET, early object-based implementations did not include strict inheritance capabilities. Platforms such as the MS COM model were based on interface inheritance. Interface inheritance is covered in great detail in Chapter 8, “Frameworks and Reuse: Designing with Interfaces and Abstract Classes.”

The good news is that the discussions about whether to use inheritance or composi- tion are a natural progression toward some seasoned middle ground. As in all philosophi- cal debates, there are fanatical arguments on both sides. Fortunately, as is normally the case, these heated discussions have led to a more sensible understanding of how to utilize the technologies.

We will see later in this chapter why some people believe that inheritance should be avoided, and composition should be the design method of choice. The argument is fairly complex and subtle. In actuality, both inheritance and composition are valid class design techniques, and they each have their proper place in the OO developer's toolkit.

The fact that inheritance is often misused and overused is more a result of a lack of understanding of what inheritance is all about than a fundamental flaw in using inheri- tance as a design strategy.

The bottom line is that inheritance and composition are both important techniques in building OO systems. Designers and developers simply need to take the time to under- stand the strengths and weaknesses of both and to use each in the proper contexts.

## Inheritance

Inheritance was defined in Chapter 1 as a system in which child classes inherit attributes and behaviors from a parent class. However, there is more to inheritance, and in this chap- ter we explore inheritance in greater detail.

Chapter 1 states that you can determine an inheritance relationship by following a simple rule: If you can say that Class B is a Class A, then this relationship is a good candi- date for inheritance.

**Is-a**
One of the primary rules of OO design is that public inheritance is represented by an is-a relationship.

Let's revisit the mammal example used in Chapter 1. Let's consider a Dog class. A dog has several behaviors that make it distinctly a dog, as opposed to a cat. For this example, let's specify two: A dog barks, and a dog pants. So we can create a Dog class that has these two behaviors, along with two attributes (see Figure 7.1).

Now let's say that you want to create a GoldenRetriever class.You could create a brand new class that contains the same behaviors that the Dog class has. However, we could make the following, and quite reasonable, conclusion: A Golden Retriever is-a dog. Because of this relationship, we can inherit the attributes and behaviors from Dog and use it in our new GoldenRetriever class (see Figure 7.2).

The GoldenRetriever class now contains its own behaviors as well as all the more gen- eral behaviors of a dog. This provides us with some significant benefits. First, when we wrote the GoldenRetriever class, we did not have to reinvent part of the wheel by rewriting the bark and pant methods. Not only does this save some coding time, but it saves testing and maintenance time as well.The bark and pant methods are written only once and, assuming that they were properly tested when the Dog class was written, they do not need to be heavily tested again (but it does need to be retested).

Now let's take full advantage of our inheritance structure and create a second class un- der the Dog class: a class called LhasaApso. Whereas retrievers are bred for retrieving, Lhasa Apsos are bred for use as guard dogs. These dogs are not attack dogs, they have acute senses, and when they sense something unusual, they start barking. So we can create our LhasaApso class and inherit from the Dog class just as we did with the GoldenRetriever class (see Figure 7.3).

**Testing New Code**
In our example with the GoldenRetriever class, the bark and pant methods should be written, tested, and debugged when the Dog class is written. Theoretically, this code is now robust and ready to reuse in other situations. However, the fact that you do not need to rewrite the code does not mean it should not be tested. However unlikely, there might be some specific characteristic of a retriever that somehow breaks the code. The bottom line is that you should always test new code. Each new inheritance relationship creates a new con- text for using inherited methods. A complete testing strategy should take into account each of these contexts.

Another primary advantage of inheritance is that the code for bark() and pant() is in a single place. Let's say there is a need to change the code in the bark() method. When you change it in the Dog class, you do not need to change it in the LhasaApso class and the GoldenRetriever class.

Do you see a problem here? At this level the inheritance model appears to work very well. However, can you be certain that all dogs have the behavior contained in the Dog class?

In his book Effective C++, Scott Meyers gives a great example of a dilemma with de- sign using inheritance. Consider a class for a bird. One of the most recognizable character- istics of a bird is, of course, that it can fly. So we create a class called Bird with a fly method. You should immediately understand the problem. What do we do with a pen- guin, or an ostrich? They are birds, yet they can't fly. You could override the behavior lo- cally, but the method would still be called fly. And it would not make sense to have a method called fly for a bird that does not fly but only waddles.

For example, if a penguin has a fly method, the penguin might understandably decide to test it out. However, if the fly method was in fact overridden and the behavior to fly did not actually exist, the penguin would be in for a major surprise when the fly method is invoked. Imagine the penguin's chagrin when the call to the fly method results in waddling instead of flight.

In our dog example, we have designed into the class that all dogs can bark. However, there are dogs that do not bark. The Basenji breed is a barkless dog. These dogs do not bark, but they do yodel. So should we reevaluate our design? What would this design look like? Figure 7.4 is an example that shows a more correct way to model the hierarchy of the Dog class.

### Generalization and Specialization

Consider the object model of the Dog class hierarchy. We started with a single class, called Dog, and we factored out some of the commonality between various breeds of dogs. This concept, sometimes called generalization-specialization, is yet another important considera- tion when using inheritance. The idea is that as you make your way down the inheritance tree, things get more specific. The most general case is at the top of the tree. In our Dog in- heritance tree, the class Dog is at the top and is the most general category. The various breeds the GoldenRetriever, LhasaApso, and Basenji classes—are the most specific. The idea of inheritance is to go from the general to the specific by factoring out commonality.

In the Dog inheritance model, we started factoring out common behavior by under- standing that although a retriever has some different behavior from that of a LhasaApso, the breeds do share some common behaviors—for example, they both pant and bark. Then we realized that all dogs do not bark—some yodel. Thus, we had to factor out the barking behavior into a separate BarkingDog class. The yodeling behavior went into a YodelingDog class. However, we still realized that both barking dogs and barkless dogs still shared some common behavior—all dogs pant. Thus, we kept the Dog class and had the BarkingDog and the YodelingDog classes inherit from Dog. Now Basenji can inherit from YodelingDog, and Lhasaapso and GoldenRetriever can inherit from BarkingDog.

We could have decided not to create two distinct classes for BarkingDog and YodelingDog. In this case we could implement all barking and yodeling as part of each in- dividual breed's class—since each dog would sound differently. This is just one example of some of the design decisions that have to be made. Perhaps the best solution is to imple- ment the barking and yodeling as interfaces, which we discuss in Chapter 8, “Frameworks and Reuse: Designing with Interfaces and Abstract Classes.”

**Design Decisions**
In theory, factoring out as much commonality as possible is great. However, as in all de- sign issues, sometimes it really is too much of a good thing. Although factoring out as much commonality as possible might represent real life as closely as possible, it might not represent your model as closely as possible. The more you factor out, the more complex your system gets. So you have a conundrum: Do you want to live with a more accurate model or a system with less complexity? You have to make this choice based on your situ- ation, for there are no hard guidelines to make the decision.

**What Computers Are Not Good At**
Obviously a computer model can only approximate real-world situations. Computers are good at number crunching but are not as good at more abstract operations.

For example, breaking up the Dog class into BarkingDog and the YodelingDog models real life better than assuming that all dogs bark, but it does add a bit of complexity.

**Model Complexity**
At this level of our example, adding two more classes does not make things so complex that it makes the model untenable. However, in larger systems, when these kinds of decisions are made over and over, the complexity quickly adds up. In larger systems, keeping things as simple as possible is usually the best practice.

There will be instances in your design when the advantage of a more accurate model does not warrant the additional complexity. Let's assume that you are a dog breeder and that you contract out for a system that tracks all your dogs. The system model that includes barking dogs and yodeling dogs works fine. However, suppose that you simply do not breed any yodeling dogs—never have and never will. Perhaps you do not need to include the complexity of differentiating between yodeling dogs and barking dogs. This will make your system less complex, and it will provide the functionality that you need.

Deciding whether to design for less complexity or more functionality is really a bal- ancing act. The primary goal is always to build a system that is flexible without adding so much complexity that the system collapses under its own weight.

Current and future costs are also a major factor in these decisions. Although it might seem appropriate to make a system more complete and flexible, this added functionality might barely add any benefit—the return on investment just might not be there. For ex- ample, would you extend the design of your Dog system to include other canines, such as hyenas and foxes (see Figure 7.5)?

**Making Design Decisions with the Future in Mind**
You might at this point say, “Never say never.” Although you might not breed yodeling dogs now, sometime in the future you might want to do so. If you do not design for the possibility of yodeling dogs now, it will be much more expensive to change the system later to include them. This is yet another of the many design decisions that you have to make. You could possibly override the bark() method to make it yodel; however, this is not intuitive, as some people will expect a method called bark() to actually bark.

## Composition

It is natural to think of objects as containing other objects. A television set contains a tuner and video display. A computer contains video cards, keyboards, and drives.The com- puter can be considered an object unto itself, and a flash drive is also considered a valid object. You could open up the computer and remove the hard drive and hold it in your hand. In fact, you could take the hard drive to another computer and install it. The fact that it is a standalone object is reinforced because it works in multiple computers.

The classic example of object composition is the automobile. Many books, training classes, and articles seem to use the automobile as the epitome of object composition. Be- sides the original interchangeable manufacture of the rifle, most people think of the auto- mobile assembly line created by Henry Ford as the quintessential example of interchangeable parts. Thus, it seems natural that the automobile has become a primary reference point for designing OO software systems.

Most people would think it natural for a car to contain an engine. Obviously, a car contains many objects besides an engine, including wheels, a steering wheel, and a stereo. Whenever a particular object is composed of other objects, and those objects are included as object fields, the new object is known as a compound, an aggregate, or a composite object (see Figure 7.6).

**Aggregation, Association, and Composition**
From my perspective, there are really only two ways to reuse classes—with inheritance or composition. In Chapter 9, “Building Objects,” we discuss composition in more detail— specifically, aggregation and association. In this book, I consider aggregation and associa- tion to be types of composition, although there are varied opinions on this.

### Representing Composition with UML

To model the fact that the car object contains a steering wheel object, UML uses the no- tation shown in Figure 7.7.

**Aggregation, Association, and UML**
In this book, aggregations are represented in UML by lines with a diamond, such as an en- gine as part of a car. Associations are represented by just the line (no diamond), such as a standalone keyboard servicing a separate computer box.

Note that the line connecting the car class to the Steeringwheel class has a diamond shape on the car side of the line. This signifies that a Car contains (has-a) SteeringWheel.

Let's expand this example. Let's say that none of the objects used in this design use in- heritance in any way. All the object relationships are strictly composition, and there are multiple levels of composition. Of course, this is a simplistic example, and there are many, many more object and object relationships in designing a car. However, this design is sim- ply meant to be a simple illustration of what composition is all about.

Let's say that a car is composed of an engine, a stereo system, and a door.

**How Many Doors and Stereos?**
Note that a car normally has more than one door. Some have two, and some have four. You might even consider a hatchback a fifth door. In the same vein, it is not necessarily true that all cars have a stereo system. A car could have no stereo system, or it could have one. I have even seen a car with two separate stereo systems. These situations are discussed in detail in Chapter 9. For the sake of this example, just pretend that a car has only a single door (perhaps a special racing car) and a single stereo system.

The fact that a car is made up of an engine, a stereo system, and a door is easy to under- stand because most people think of cars in this way. However, it is important to keep in mind when designing software systems, just like automobiles, that objects are made up of other objects. In fact, the number of nodes and branches that can be included in this tree structure of classes is virtually unlimited.

Figure 7.8 shows the object model for the car, with the engine, stereo system, and door included.

Note that all three objects that make up a car are themselves composed of other ob- jects. The engine contains pistons and spark plugs. The stereo contains a radio and a CD player. The door contains a handle. Also note that there is yet another level. The radio con- tains a tuner. We could have also added the fact that a handle contains a lock; the CD player contains a fast forward button, and so on. Additionally, we could have gone one level beyond the tuner and created an object for a dial. The level and complexity of the object model is, obviously, up to the designer.

**Model Complexity**
As with the inheritance problem of the barking and yodeling dogs, using too much composi- tion can also lead to more complexity. There is a fine line between creating an object model that contains enough granularity to be sufficiently expressive and a model that is so granular that it is difficult to understand and maintain.

## Why Encapsulation Is Fundamental to 00

Encapsulation is really the fundamental concept of OO.Whenever the interface/imple- mentation paradigm is covered, we are really talking about encapsulation.The basic ques- tion is what in a class should be exposed and what should not be exposed. This encapsulation pertains equally to data and behavior. When talking about a class, the pri- mary design decision revolves around encapsulating both the data and the behavior into a well-written class.

Stephen Gilbert and Bill McCarty define encapsulation as “the process of packaging your program, dividing each of its classes into two distinct parts: the interface and the im- plementation.” This is the message that has been presented over and over again in this book.

But what does encapsulation have to do with inheritance, and how does it apply with regard to this chapter? This has to do with an OO paradox. Encapsulation is so fundamen- tal to OO that it is one of OO design's cardinal rules. Inheritance is also considered one of the three primary OO concepts. However, in one way, inheritance actually breaks encap- sulation! How can this be? Is it possible that two of the three primary concepts of OO are incompatible with each other? Well, let's explore this possibility.

### How Inheritance Weakens Encapsulation

As already stated, encapsulation is the process of packaging classes into the public interface and the private implementation. In essence, a class hides everything that is not necessary for other classes to know about.

Peter Coad and Mark Mayfield make a case that when using inheritance; encapsulation is inherently weakened within a class hierarchy. They talk about a specific risk: Inheritance connotes strong encapsulation with other classes but weak encapsulation between a super- class and its subclasses.

The problem is that if you inherit an implementation from a superclass and then change that implementation, the change from the superclass ripples through the class hierar- chy. This rippling effect potentially affects all the subclasses. At first, this might not seem like a major problem; however, as we have seen, a rippling effect such as this can cause unanticipated problems. For example, testing can become a nightmare. In Chapter 6, “De- signing with Objects,” we talked about how encapsulation makes testing systems easier. In theory, if you create a class called Cabbie (see Figure 7.9) with the appropriate public in- terfaces, any change to the implementation of Cabbie should be transparent to all other classes. However, in any design a change to a superclass is certainly not transparent to a subclass. Do you see the conundrum?

**Keep Testing**
Even with encapsulation, you would still want to retest the classes that use Cabbie to verify that no problem has been introduced by the change.

If you then create a subclass of Cabbie called PartTimeCabbie, and PartTimeCabbie in- herits the implementation from Cabbie, changing the implementation of Cabbie directly affects the PartTimeCabbie class.

For example, consider the UML diagram in Figure 7.10. PartTimeCabbie is a subclass of Cabbie. Thus, PartTimeCabbie inherits the public implementation of Cabbie, includ- ing the method giveDirections (). If the method giveDirections is changed in Cabbie, it will have a direct impact on PartTimeCabbie and any other classes that might later be subclasses of Cabbie. In this subtle way, changes to the implementation of Cabbie are not necessarily encapsulated within the Cabbie class.

To reduce the risk posed by this dilemma, it is important that you stick to the strict is-a condition when using inheritance. If the subclass were truly a specialization of the super- class, changes to the parent would likely affect the child in ways that are natural and ex- pected. To illustrate, if a Circle class inherits implementation from a shape class, and a change to the implementation of shape breaks Circle, then Circle was not truly a Shape to begin with.

How can inheritance be used improperly? Consider a situation in which you want to create a window for the purposes of a graphical user interface (GUI). One impulse might be to create a window by making it a subclass of a rectangle class:

`public class Rectangle {`
`}`

`public class Window extends Rectangle {`
`}`

In reality a GUI window is much, much more than a rectangle. It is not really a spe- cialized version of a rectangle, as is a square. A true window might contain a rectangle (in fact many rectangles); however, it is really not a true rectangle. In this approach, a window class should not inherit from Rectangle, but it should contain Rectangle classes.

`public class Window {`
`Rectangle menubar;`
`Rectangle statusbar;`
`Rectangle mainview;`
`}`

## A Detailed Example of Polymorphism

Many people consider polymorphism a cornerstone of OO design. Designing a class for the purpose of creating totally independent objects is what OO is all about. In a well-de- signed system, an object should be able to answer all the important questions about it. As a rule, an object should be responsible for itself. This independence is one of the primary mechanisms of code reuse.

As stated in Chapter 1, polymorphism literally means many shapes.When a message is sent to an object, the object must have a method defined to respond to that message. In an inheritance hierarchy, all subclasses inherit the interfaces from their superclass. However, because each subclass is a separate entity, each might require a separate response to the same message.

To review the example in Chapter 1, consider a class called shape.This class has a be- havior called Draw. However, when you tell somebody to draw a shape, the first question they ask is likely to be, “What shape?” Simply telling a person to draw a shape is too ab- stract (in fact, the Draw method in Shape contains no implementation).You must specify which shape you mean. To do this, you provide the actual implementation in circle and other subclasses. Even though Shape has a Draw method, Circle overrides this method and provides its own Draw method. Overriding basically means replacing an implementa- tion of a parent with your own.

### Object Responsibility

Let's revisit the Shape example from Chapter 1 (see Figure 7.11).

Polymorphism is one of the most elegant uses of inheritance. Remember that a Shape cannot be instantiated. It is an abstract class because it has an abstract method, getArea(). Chapter 8 explains abstract classes in great detail.

However, Rectangle and circle can be instantiated because they are concrete classes. While Rectangle and circle are both shapes, they obviously have some differences. As shapes, their area can be calculated.Yet the formula to calculate the area is different for each. Thus, the area formulas cannot be placed in the Shape class.

This is where polymorphism comes in. The premise of polymorphism is that you can send messages to various objects, and they will respond according to their object's type. For example, if you send the message getArea to a Circle class, you will invoke a com- pletely different calculation than if you send the same getArea message to a Rectangle class. This is because both circle and Rectangle are responsible for themselves. If you ask Circle to return its area, it knows how to do this. If you want a circle to draw itself, it can do this as well. A shape object could not do this even if it could be instantiated because it does not have enough information about itself. Notice that in the UML diagram (Figure 7.11), the getArea method in the shape class is italicized.This designates that the method is abstract.

As a very simple example, imagine that there are four classes: the abstract class Shape, and concrete classes Circle, Rectangle, and star. Here is the code:
```
public abstract class Shape {
public abstract void draw();
}
public class Circle extends Shape {
public void draw() {
System.out.println("I am drawing a Circle");
}
}
public class Rectangle extends Shape {
public void draw() {
System.out.println("I am drawing a Rectangle");
}
}
public class Star extends Shape {
public void draw() {
System.out.println("I am drawing a Star");
}
}
```
Notice that there is only one method for each class: draw. Here is the important point regarding polymorphism and an object being responsible for itself:The concrete classes themselves have responsibility for the drawing function. The Shape class does not provide the code for drawing; the circle, Rectangle, and star classes do this for themselves.

Here is some code to prove it:
```
public class TestShape {
public static void main(String args[]) {
Circle circle = new Circle();
Rectangle rectangle = new Rectangle();
Star star = new Star();
circle.draw();
rectangle.draw();
star.draw();
}
}
```
**Compiling This Code**
If you want to compile this Java code, make sure that you set classpath to the current di- rectory:
`javac -classpath. Shape.java`
`javac -classpath . Circle.java`
`javac -classpath . Rectangle.java`
`javac -classpath . Star.java`
`javac -classpath . TestShape.java`

Actually, when you compile a Java class (in this case TestShape) and it requires another class (let's say Circle), the javac compiler will attempt to compile all the required classes. Thus, the following line will actually compile all the files in this example.
`javac -classpath . TestShape.java`

The test application TestShape creates three classes: Circle, Rectangle, and star. To ac- tually draw these classes, Testshape simply asks the individual classes to draw themselves:
`circle.draw();`
`rectangle.draw();`
`star.draw();`

When you execute TestShape, you get the following results:
`C:\>java TestShape`
`I am drawing a Circle`
`I am drawing a Rectangle`
`I am drawing a Star`

This is polymorphism at work. What would happen if you wanted to create a new shape, say Triangle? Simply write the class, compile it, test it, and use it. The base class Shape does not have to change—nor does any other code:
```
public class Triangle extends Shape {
public void draw() {
System.out.println("I am drawing a Triangle");
}
}
```
A message can now be sent to Triangle. And even though shape does not know how to draw a triangle, the Triangle class does:
```
public class TestShape {
public static void main(String args[]) {
Circle circle = new Circle();
Rectangle rectangle = new Rectangle();
Star star = new Star();
Triangle triangle = new Triangle ();
circle.draw();
rectangle.draw();
star.draw();
triangle.draw();
}
}
```
`C:\>java TestShape`
`I am drawing a Circle`
`I am drawing a Rectangle`
`I am drawing a Star`
`I am drawing a Triangle`

To see the real power of polymorphism, you can actually pass the shape to a method that has absolutely no idea what shape is coming.
```
public class TestShape {
public static void main(String args[]) {
Circle circle = new Circle();
Rectangle rectangle = new Rectangle();
Star star = new Star();
drawMe(circle);
drawMe(rectangle);
drawMe(star);
}
static void drawMe (Shape s) {
s.draw();
}
}
```
In this case, the Shape object can be passed to the method drawme, and the drawMe method can handle any valid Shape—even one you add later.You can run this version of TestShape just like the previous one.

## Conclusion

This chapter gives a basic overview of what inheritance and composition are and how they are different. Many well-respected OO designers have stated that composition should be used whenever possible, and inheritance should be used only when necessary.

However, this is a bit simplistic. I believe that the idea that composition should be used whenever possible hides the real issue, which might simply be that composition is more appropriate in more cases than inheritance—not that it should be used whenever possi- ble.The fact that composition might be more appropriate in most cases does not mean that inheritance is evil. Use both composition and inheritance, but only in their proper contexts.

In earlier chapters, the concepts of abstract classes and Java interfaces arose several times. In Chapter 8, we will explore the concept of development contracts and how ab- stract classes and Java interfaces are used to satisfy these contracts.
