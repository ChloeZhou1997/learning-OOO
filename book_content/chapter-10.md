# Chapter 10: Creating Object Models with UML

I believe very strongly that learning the fundamental OO concepts should come before learning any specific modeling tools. Thus, the placement of this chapter was somewhat problematic. In many ways, this chapter could go first, because the Unified Modeling Language (UML) diagrams are present throughout this book, including in Chapter 1,“In- troduction to Object-Oriented Concepts.” Finally, it was decided to place this chapter at the end of the “conceptual” chapters, which I consider Chapters 1–9.The remaining chapters cover application issues as well as concepts.

This chapter is a brief overview of the UML notation used in this book. It is not a comprehensive tutorial on UML because that would require an entire book unto itself, and there are many such books. For several good sources, see the references at the end of this chapter. Because this book deals with fundamentals, the UML that is used only scratches the surface of what UML actually offers.

In this book, the UML notation we are concerned with concerns modeling object- oriented systems or, as I like to call it, object-modeling.This notation includes system mod- eling using class diagrams. Many components of UML are not used in this book. For example, because this book is concerned with object-models, UML constructs such as State Chart Diagrams and Activity Diagrams are not covered.

Each of those topics could warrant a complete chapter or more. Again, the purpose of this chapter is to provide a quick overview of object models and, specifically, class dia- grams so that if you are unfamiliar with class diagrams, you can pick up the basics quickly. With this introduction, the examples in the book will be more meaningful.

## What Is UML?

UML, as its name implies, is a modeling language.The UML User Guide defines UML as "a graphical language for visualizing, specifying, constructing and documenting the arti- facts of a software-intensive system.” UML gives you a standard way to write the system's blueprints. In a nutshell, UML offers a way to graphically represent and manipulate an ob- ject-oriented (OO) software system. It is not only the representation of the design of a system, but a tool to assist in this design.

UML is actually a synthesis of different modeling languages developed independently by Grady Booch, James Rumbaugh, and Ivar Jacobson, affectionately called the Three Amigos. The software company Rational brought the three modeling languages together under one roof—thus the name Unified Modeling Language. As stated above, object modeling is simply one part of UML.

However, it is important not to link UML and OO development too closely. In his ar- ticle “What the UML Is—and Isn't,” Craig Larman states:

*Yet unfortunately, in the context of software engineering and the UML diagramming language, acquiring the skills to read and write UML notation seems to sometimes be equated with skill in object-oriented analysis and design. Of course, this is not so, and the latter is much more important than the former. Therefore, I recommend seeking education and educational materi- als in which intellectual skill in object-oriented analysis and design is paramount rather than UML notation or the use of a case tool.*

Although UML is very important, it is much more important to learn the OO skills first. Learning UML before learning OO concepts is similar to learning how to read an elec- trical diagram without first knowing anything about electricity.

## The Structure of a Class Diagram

A class diagram is constructed of three different parts: the class name, the attributes, and the methods (constructors are considered methods). The class diagram is essentially a rectangle that separates these three parts with horizontal lines. This book often uses a cabbie metaphor as an illustration. Figure 10.1 shows the UML class diagram represent- ing this class.

This UML diagram corresponds exactly to the following Java code:
```
/*
This class defines a cabbie and assigns a cab
*/
public class Cabbie {
// Place the name of the company here
private static String companyName = "Blue Cab Company";
// Name of the cabbie
private String name;
// Car assigned to cabbie
// Default constructor for the cabbie
public Cabbie() {
name = null;
myCab = null;
}
// Initializing the constructor for the cabbie
public Cabbie(String iName, String serialNumber) {
Name = iName;
myCab = new Cab(serialNumber);
}
// Set the name of the cabbie
public void setName(String iName) {
name = iName;
}
// Get the name of the cabbie
public String getName() {
return name;
}
// Give the cabbie directions
public void giveDirections(){
}
// Cabbie turns right
private void turnRight(){
}
// Cabbie turns left
private void turnLeft() {
}
// Get the name of the company
public static String getCompanyName() {
return companyName;
}
}
```
Take a moment to look at the code and compare it to the UML class diagram. Notice how the class name, attributes, and methods in the code relate to the designation in the class diagram. Really, that is all there is to the class diagram as far as the structure goes. However, there is a lot more information to be gleaned from the diagram. This informa- tion is discussed in the following sections.

## Attributes and Methods

Besides presenting the structure of the class, the class diagram also presents information about the attributes and methods.

### Attributes

Normally, attributes are not thought of as having signatures; methods get all the credit. However, an attribute has a type, and this type is represented in the class diagram. Con- sider the two attributes that are in the Cabbie example:
`-companyName: String`
`-name: String`

Both of these attributes are defined as strings. This is represented by the name of the attribute followed by the type (in these cases, String). There could have been attributes that were defined as int and float as well, as in this example:
`-companyNumber:float`
`-companyAge:int`

By looking at the class diagram, you can tell the data type of the parameter.You can also tell that the attributes are declared as private because of the minus sign (-) that pre- cedes them. A plus sign (+) would denote that they were public, which should evoke a gag reflex. Based on all discussion in the previous chapters, we know that all attributes should be declared as private. Every now and then someone makes a case for the use of public attributes, but the approach taken in this book is to always make attributes private.

### Methods

The same logic used with attributes works for methods. Rather than express the type, the diagram shows the return type of the method.

If you look at the following snippet from the Cabbie example, you can see that the name of the method is presented, along with the return type and the access modifier (for example, public, private):
`+Cabbie:`
`+giveDirections:void`
`+getCompanyName:String`

As you can see here, in all three cases the access modifier is public (designated by the plus sign). If a method were private, there would be a minus sign. Each method name is followed by a colon that separates the method name from the return type.

It is possible to include a parameter list, in the following manner:
`+getCompanyName(parameter-list):String`

Commas separate the parameters in the parameter list.
`+getCompanyName(parameterl, parameter2, parameter3): String`

I like keeping the object models as simple as possible. Thus, I normally include only the class name, attributes, and methods in the class diagrams. This allows us to concentrate on the big-picture of the design and does not place focus on details. Including too much information (like parameters) in the class diagrams makes the object-model difficult to read. This is one of those issues that depends on your specific tastes.

## Access Designations

As mentioned previously, the plus signs (+) and minus signs (-) to the left of the attributes and methods signify whether the attributes and methods are public or private. The attrib- ute or method is considered private if there is a minus sign. This means that no other class can access the attribute or method; only methods in the class can inspect or change it.

If the attribute or method has a plus sign to the left, the attribute or method is public, and any class can inspect or modify it. For example, consider the following:
`-companyNumber:float`
`+companyAge:int`

In this example, companyNumber is private, and only methods of its class can do any- thing with it. However, companyAge is public, and thus it is fair game for any class to ac- cess and modify it.

If no access designation is present in the code, the system considers the access to be the default, and no plus or minus is used:
`companyNumber:float`
`companyAge:int`

In Java, the default type of access is protected. Protected access means that only classes in the package can access the attribute or method. A Java package is a collection of related classes that are intentionally grouped together by the developer (see http:// msdn2.microsoft.com/en-us/library/ms173121.aspx).

In .NET the access modifiers, per Microsoft's MSDN, are as follows:
- public-The type or member can be accessed by any other code in the same as- sembly or another assembly that references it.
- private—The type or member can only be accessed by code in the same class or struct.
- protected—The type or member can only be accessed by code in the same class or struct, or in a derived class.
- internal—The type or member can be accessed by any code in the same assem- bly, but not from another assembly.

## Inheritance

To understand how inheritance is represented, consider the Dog example presented in Chapter 7, “Mastering Inheritance and Composition.” In this example, the class GoldenRetriever inherits from the class Dog as shown in Figure 10.2. This relationship is represented in UML by a line with an arrowhead pointing in the direction of the parent or superclass.

The notation is straightforward, and when the line with the arrowhead is encountered, an inheritance relationship is indicated.

**Indicating Interface Inheritance**
A dashed line with an arrowhead indicates an interface, which is discussed in the next section.

Because Java is used for the examples in this book, we do not have to worry about multi- ple inheritance.

However, several subclasses can inherit from the same superclass. Again, we can use the Dog example from Chapter 7 (see Figure 10.3).

This example illustrates two concepts when modeling an inheritance tree. First, a super- class can have more than one subclass. Second, the inheritance tree can extend for more than one level. The example in Figure 10.3 shows three levels. We could add further levels by adding specific types of retrievers, or even by adding a higher level by creating a Canine class (see Figure 10.4).

**Multiple Inheritance**
If you are designing in languages such as Eiffel and C++, multiple inheritance is incorpo- rated into the language and is in play as part of the overall design.

## Interfaces

Because interfaces are a special type of inheritance, the notations are similar and can cause some confusion. Earlier we said that a line with an arrowhead represents inheritance. An interface is also represented by a line with an arrowhead—but the arrowhead is connected to a dashed line. This notation indicates the relationship between inheritance and inter- faces, but also differentiates them. Take a look at Figure 10.5, which is an abbreviated ver- sion of an example in Chapter 8, “Frameworks and Reuse: Designing with Interfaces and Abstract Classes.”The Dog class inherits from the class Mammal and implements the inter- face Nameable.

## Composition

Composition indicates that a has-a relationship is being used. When inheritance is not the proper design choice (because the is-a relationship is not appropriate), composition is nor- mally used.

Chapter 9, "Building Objects,” discusses two different types of composition: aggregations and associations. Composition is used when classes are built with other classes. This can happen with aggregation when a class is actually a component of another class (as a tire is to a car). Or it can happen with association when a class needs the services of another class (for example, when a client needs the services of a server).

### Aggregations

An aggregation is represented by a line with a diamond at the head. In the car example of Chapter 9, to represent that a steering wheel is part of a car, you use the notation shown in Figure 10.6.

As with the inheritance tree, there is no limit (theoretically) to the number of levels of ag- gregation you can represent. In the example seen in Figure 10.7, there are four levels. No- tice that the various levels can represent various aggregations. For example, although a stereo is part of the car, the radio is part of the stereo, and the tuner is part of the radio.

### Associations

Although aggregations represent parts of a whole, meaning that one class is logically built with parts of another, associations are simply services provided between classes.

As mentioned earlier, a client/server relationship fits this model. Although it is obvious that a client is not part of a server, and likewise a server is not part of a client, they both depend on each other. In most cases, you can say that a server provides the client a service.

In UML notation, a plain line represents this service, with no shape on either end (see Figure 10.8).

Note that because there is no shape on either end of the line, there is no indication about which way the service flows. The figure shows only that there is an association be- tween the two classes.

To illustrate, consider the example of the computer system from Chapter 9. In this case, there are multiple components, such as a computer, monitor, scanner, keyboard, and mouse. Each is a totally separate component that interacts, to some degree, with the com- puter itself (see Figure 10.9).

The important thing to note here is that the monitor is technically part of the com- puter. If you were to create a class for a computer system, you could model it by using aggregation. However, the computer represents some form of aggregation, as it is made up of a motherboard, RAM, and so on (see Figure 10.10).

## Cardinality

The last issue to visit in this chapter is cardinality. Basically, cardinality pertains to the range of objects that correspond to the class. Using the earlier computer example, we can say that a computer is made up of one, and only one, motherboard. This cardinality is rep- resented as 1.There is no way that a computer can be without a motherboard and, in PCs today, no computer has more than one. On the other hand, a computer must have at least one RAM chip, but it may have as many chips as the machine can hold. Thus, we can rep- resent the cardinality as 1...n, where n represents an unlimited value—at least in the gen- eral sense.

**Limited Cardinality Values**
If we know that there are slots for six RAM chips, the upper limit number is not unlimited. Thus, the n would be replaced by a 6, and the cardinality would be 1...6.

Consider the example shown in Figure 9.7 from Chapter 9. In this example, we have sev– eral different representations of cardinality. First, the Employee class has an association with the spouse class. Based on conventional rules, an employee can have either no spouses or one spouse (at least in our culture, an employee cannot have more than one spouse). Thus, the cardinality of this association is represented as 0...1.

The association between the Employee class and the Child class is somewhat different in that an employee has no theoretical limits to the number of children that the employee can have. Although it is true that an employee might have no children, if the employee does have children, there is no upper limit to the number of children that the employee might have. Thus, the cardinality of this association is represented as 0...n, and n means that there is no upper limit to the number of children that the system can handle.

The relationship between the Employee class and the Division class states that each employee can be associated with one, and only one, division. A simple 1 represents this as- sociation. The placement of the cardinality indicator is tricky, but it's a very important part of the object model.

**More Design Issues**
In certain situations, it is possible for an employee to be associated with more than one divi- sion. For example, a college might allow an individual to hold concurrent positions in the mathematics department as well as the computer science department. This is another de- sign issue you must consider.

The last cardinality association we will discuss is the association between the Employee class and the JobDescription class. In this system, it is possible for an employee to have an unlimited number of job descriptions. However, unlike the Child class, where there can be zero children, in this system there must be at least one job description per em- ployee. Thus, the cardinality of this association is represented as 1...n.The association in- volves at least one job description per employee, but possibly more (in this case, an unlimited number).

**Keeping History**
You must also consider that an employee can have job descriptions for past jobs, as well as for current jobs. In this case, there needs to be a way to differentiate current job descrip- tions from past ones. This could be implemented using inheritance by creating a collection of job objects with an attribute indicating which job is currently active.

## Conclusion

This chapter gives a very brief overview of the UML notation used in this book. As stated in the introduction, UML is a very complex and important topic, and the complete cov- erage of UML requires a book (or several) unto itself.

UML is used to illustrate OO examples throughout this book.You do not need UML to design OO systems, but UML is a tool that can be used to assist in the development of OO systems.

Learning UML in detail is one of the steps that you should take after you are comfort- able with the underlying OO concepts. However, as happens so many times, the chicken- and-the-egg conundrum presents itself. In an effort to illustrate some of the examples in the book, it is very useful to use UML.

It's good to introduce a little of a modeling language (such as UML) and a little of a programming language (such as Java) while explaining OO concepts. Of course, we could have used C++ instead of Java, and another modeling system rather than UML. It is im- portant to keep in mind that whatever examples you use, you should stay focused on the OO concepts themselves.
