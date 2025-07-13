# Chapter 9: Building Objects

The previous two chapters cover the topics of inheritance and composition. In Chapter 7, “Mastering Inheritance and Composition,” we learned that inheritance and composi- tion represent the primary ways to build objects. In Chapter 8, “Frameworks and Reuse: Designing with Interfaces and Abstract Classes,” we learned that there are varying degrees of inheritance and how inheritance, interfaces, abstract classes, and composition all fit to- gether.

This chapter covers the issue of how objects are related to each other in an overall de- sign. You might say that this topic was already introduced, and you would be correct. Both inheritance and composition represent ways that objects interact. However, inheritance and composition have one significant difference in the way objects are built. When inher- itance is used, the end result is, at least conceptually, a single class that incorporates all of the behaviors and attributes of the inheritance hierarchy. When composition is used, one or more classes are used to build another class.

Although it is true that inheritance is a relationship between two classes, what is really happening is that a parent is created that incorporates the attributes and methods of a child class. Let's revisit the example of the Person and Employee classes (see Figure 9.1).

Although there are indeed two classes here, the relationship is not simply interaction— it is inheritance. Basically, an employee is a person. An Employee object does not send a message to a Person object. An Employee object does need the services of a Person ob- ject. This is because an Employee object is a Person object.

However, composition is a different situation. Composition represents interactions be- tween distinct objects. So, although Chapter 8 primarily covers the different flavors of in- heritance, this chapter delves into the various flavors of composition and how objects interact with each other.

## Composition Relationships

We have already seen that composition represents a part of a whole. Although the inheri- tance relationship is stated in terms of is-a, composition is stated in terms of has-a. We know intuitively that a car “has-a” steering wheel (see Figure 9.2).

**Is-a and Has-a**
Please forgive my grammar: For consistency, I will stick with “has a engine,” even though "has an engine" might be grammatically correct. I do this because I want to simply state the rules as "is-a" and "has-a."

The reason to use composition is that it builds systems by combining less complex parts. This is a common way for people to approach problems. Studies show that even the best of us can keep, at most, seven chunks of data in our short-term memory at one time. Thus we like to use abstract concepts. Instead of saying that we have a large unit with a steering wheel, four tires, an engine, and so on, we say that we have a car. This makes it easier for us to communicate and keep things clear in our heads.

Composition also helps in other ways, such as making parts interchangeable. If all steer- ing wheels are the same, it does not matter which specific steering wheel is installed in a specific car. In software development, interchangeable parts mean reuse. In Chapters 7 and 8 of their book, Object-Oriented Design in Java, Stephen Gilbert and Bill McCarty present many examples of associations and composition in much more detail. I highly recommend referencing this material for a more in-depth look into these subjects. Here we address some of the more fundamental points of these concepts and explore some variations of their examples.

## Building in Phases

Another major advantage in using composition is that systems and subsystems can be built independently, and perhaps more importantly, tested and maintained independently.

There is no question that today's software systems are quite complex. To build quality software, you must follow one overriding rule to be successful: Keep things as simple as possible. For large software systems to work properly and be easily maintained, they must be broken up into smaller, more manageable parts. How do you accomplish this? In a 1962 article titled “The Architecture of Complexity,” Nobel Prize winner Herbert Simon noted the following thoughts regarding stable systems:
- "Stable complex systems usually take the form of a hierarchy, where each system is built from simpler subsystems, and each subsystem is built from simpler subsystems still.”—You might already be familiar with this principle be- cause it forms the basis for functional decomposition, the method behind proce- dural software development. In object-oriented design, you apply the same principles to composition—building complex objects from simpler pieces.
- “Stable, complex systems are nearly decomposable.”—This means you can identify the parts that make up the system and can tell the difference between inter- actions between the parts and inside the parts. Stable systems have fewer links be- tween their parts than they have inside their parts. Thus, a modular stereo system, with simple links between the speakers, turntable, and amplifier, is inherently more stable than an integrated system, which isn't easily decomposable.
- “Stable complex systems are almost always composed of only a few dif- ferent kinds of subsystems, arranged in different combinations.”—Those subsystems, in turn, are generally composed of only a few different kinds of parts.
- "Stable systems that work have almost always evolved from simple sys- tems that worked.”—Rather than build a new system from scratch─reinventing the wheel—the new system builds on the proven designs that went before it.

In our stereo example (see Figure 9.3), suppose the stereo system was totally integrated and was not built from components (that is, that the stereo system was one big black-box system). In this case, what would happen if the CD player broke and became unusable? You would have to take in the entire system for repair. Not only would this be more complicated and expensive, but you would not have the use of any of the other compo- nents.

This concept becomes very important to languages such as Java and those included in the .NET architecture. Because objects are dynamically loaded, decoupling the design is quite important. For example, if you distribute a Java application and one of the class files needs to be re-created (for bug fixes or maintenance), you would only be required to redistrib- ute that particular class file. If all code was in a single file, the entire application would need to be redistributed.

Suppose the system is broken up into components rather than a single unit. In this case, if the CD player broke, you could disconnect the CD player and simply take it in for re- pair. (Note that all the components are connected by patch cords.) This would obviously be less complicated and less expensive, and it would take less time than having to deal with a single, integrated unit. As an added benefit, you could still use the rest of the sys- tem.You could even buy another CD player because it is a component. The repairperson could then plug your broken CD player into his repair systems to test and fix it. All in all, the component approach works quite well. Composition is one of the primary strategies that you, as a software designer, have in your arsenal to fight software complexity.

One major advantage of using components is that you can use components that were built by other developers, or even third-party vendors. However, using a software compo- nent from another source requires a certain amount of trust. Third-party components must come from a reliable source, and you must feel comfortable that the software is prop- erly tested, not to mention that it must perform the advertised functions properly. There are still many who would rather build their own than trust components built by others.

## Types of Composition

Generally, there are two types of composition: association and aggregation. In both cases, these relationships represent collaborations between the objects. The stereo example we just used to explain one of the primary advantages of composition actually represents an association.

**Is Composition a Form of Association?**
Composition is another area in 00 technologies where there is a question of which came first, the chicken or the egg. Some texts say that composition is a form of association, and some say that an association is a form of composition. In any event, in this book, we con- sider inheritance and composition the two primary ways to build classes. Thus, in this book, an association is a form of composition.

All forms of composition include a has-a relationship. However, there are subtle differ- ences between associations and aggregations based on how you visualize the parts of the whole. In an aggregation, you normally see only the whole, and in associations, you nor- mally see the parts that make up the whole.

### Aggregations

Perhaps the most intuitive form of composition is aggregation. Aggregation means that a complex object is composed of other objects. A TV set is a clean, neat package that you use for entertainment. When you look at your TV, you see a single TV. Most of the time, you do not stop and think about the fact that the TV contains some transistors, a picture tube, a tuner, and so on. Sure, you see a switch to turn the set on and off, and you cer- tainly see the picture tube. However, this is not the way people normally think ofTVs.

When you go into an appliance store, the salesperson does not say, “Let me show you this aggregation of transistors, a picture tube, a tuner, and so on.”The salesperson says, “Let me show you this TV”

Similarly, when you go to buy a car, you do not pick and choose all the individual components of the car.You do not decide which spark plugs to buy or what door handles to buy. You go to buy a car. Of course, you do choose some options, but for the most part, you choose the car as a whole, a complex object made up of many other complex and simple objects (see Figure 9.4).

### Associations

Although aggregations represent relationships where you normally only see the whole, as– sociations present both the whole and the parts. As stated in the stereo example, the vari- ous components are presented separately and connect to the whole by use of patch cords (the cords that connect the various components). Each one of the stereo components has a user interface that is manipulated independently. We can look back at the example in Chapter 2, “How to Think in Terms of Objects,” at the example of designing for minimal interfaces.

Using a computer system as an example (see Figure 9.5), the whole is the computer system. The components are the monitor, keyboard, mouse, and main box. Each is a sepa- rate object, but together they represent the whole of the computer system. The main computer is using the keyboard, the mouse, and the monitor to delegate some of the work. In other words, the computer box needs the service of a mouse, but does not have the capability to provide this service by itself. Thus, the computer box requests the service from a separate mouse via the specific port and cable connecting the mouse to the box.

**Aggregation Versus Association**
An aggregation is a complex object composed of other objects. An association is used when one object wants another object to perform a service for it.

### Using Associations and Aggregations Together

One thing you might have noticed in all the examples is that the dividing lines between what is an association and what is an aggregation are blurred. Suffice it to say that many of your most interesting design decisions will come down to whether to use associations or aggregations.

For example, the computer system example used to describe association also contains some aggregation. Although the interaction between the computer box, the monitor, the keyboard, and the mouse is association, the computer box itself represents aggregation. You see only the computer box, but it is actually a complex system made up of other objects, including chips, motherboards, video cards, and so on.

Consider that an Employee object might be composed of an Address object and a Spouse object.You might consider the Address object as an aggregation (basically a part of the Employee object), and the spouse object as an association. To illustrate, suppose both the employee and the spouse are employees. If the employee is fired, the spouse is still in the system, but the association is broken.

Similarly, in the stereo example, the relationship between the receiver, the speakers, and the CD player is association; however, each of these components are complex objects that are made up of other objects.

In the car example, although the engine, sparkplugs, and doors represent composition, the stereo also represents an association relationship.

**No One Right Answer**
As usual, there isn't a single absolutely correct answer when it comes to making a design decision. Design is not an exact science. Although we can make general rules to live by, these rules are not hard and fast.

### Avoiding Dependencies

When using composition, it is desirable to avoid making objects highly dependent on one another. One way to make objects very dependent on each other is to mix domains. In the best of all worlds, an object in one domain should not be mixed with an object in an- other domain, except under certain circumstances.We can return again to the stereo ex- ample to explain this concept.

By keeping the receiver and the CD player in separate domains, the stereo system is easier to maintain. For example, if the CD component breaks, you can send the CD player off to be repaired individually. In this case, the CD player and the MP3 player have sepa- rate domains. This provides flexibility such as buying the CD player and the MP3 player from separate manufacturers. So, if you decide you want to swap out the CD player with a brand from another manufacturer, you can.

Sometimes there is a certain convenience in mixing domains. A good example of this pertains to the existence ofTV/VCR combinations. Granted, it is convenient to have both in the same module. However, if the TV breaks, the VCR is unusable—at least as part of the unit it was purchased in.

You need to determine what is more important in specific situations: whether you want convenience or stability.There is no right answer. It all depends on the application and the environment. In the case of the TV/VCR combination, we decided that the convenience of the integrated unit far outweighed the risk of lower unit stability (see Figure 9.6).

**Mixing Domains**
The convenience of mixing domains is a design decision. If the power of having a TV/VCR combination outweighs the risk and potential downtime of the individual components, the mixing of domains may well be the preferred design choice.

## Cardinality

Gilbert and McCarty describe cardinality as the number of objects that participate in an association and whether the participation is optional or mandatory. To determine cardinal- ity, ask the following questions:
- Which objects collaborate with which other objects?
- How many objects participate in each collaboration?
- Is the collaboration optional or mandatory?

For example, let's consider the following example.We are creating an Employee class that inherits from Person, and has relationships with the following classes:
- Division
- JobDescription
- Spouse
- Child

What do these classes do? Are they optional? How many does an Employee need?
- Division
  - This object contains the information relating to the division that the em- ployee works for.
  - Each employee must work for a division, so the relationship is mandatory.
  - The employee works for one, and only one, division.
- JobDescription
  - This object contains a job description, most likely containing information such as salary grade and salary range.
  - Each employee must have a job description, so the relationship is mandatory.
  - The employee can hold various jobs during the tenure at a company. Thus, an employee can have many job descriptions. These descriptions can be kept as a history if an employee changes jobs, or it is possible that an employee might hold two different jobs at one time. For example, a supervisor might take on an employee's responsibilities if the employee quits and a replacement has not yet been hired.
- Spouse
  - In this simplistic example, the Spouse class contains only the anniversary date.
  - An employee can be married or not married. Thus, a spouse is optional.
  - An employee can have only one spouse.
- Child
  - In this simple example, the Child class contains only the string FavoriteToy.
  - An employee can have children or not have children.
  - An employee can have no children or an infinite number of children (wow!). You could make a design decision as to the upper limit of the number of chil- dren that the system can handle.

To sum up, Table 9.1 represents the cardinality of the associations of the classes we just considered.

**Cardinality Notation**
The notation of 0...1 means that an employee can have either zero or one spouse. The nota- tion of 0...n means that an employee can have any number of children from zero to an unlim- ited number. The n basically represents infinity.

Figure 9.7 shows the class diagram for this system. Note that in this class diagram, the car- dinality is indicated along the association lines. Refer to Table 9.1 to see whether the asso- ciation is mandatory.

### Multiple Object Associations

How do we represent an association that might contain multiple objects (like 0 to many children) in code? Here is the code for the Employee class:
```
import java.util.Date;
public class Employee extends Person{
private String CompanyID;
private String Title;
private Date StartDate;
private Spouse spouse;
private Child[] child;
private Division division;
private JobDescription[] jobDescriptions;
public String getCompanyID() { return CompanyID;}
public String getTitle() { return Title;}
public Date getStartDate() { return StartDate;}
public void setCompanyID(String CompanyID) {}
public void setTitle(String Title) {}
public void setStartDate(int StartDate) {}
}
```
Note that the classes that have a one-to-many relationship are represented by arrays in the code:
`private Child() child;`
`private JobDescription( ) jobDescriptions;`

### Optional Associations

One of the most important issues when dealing with associations is to make sure that your application is designed to check for optional associations. This means that your code must check to see whether the association is null.

Suppose in the previous example, your code assumes that every employee has a spouse. However, if one employee is not married, the code will have a problem (see Figure 9.8). If your code does indeed expect a spouse to exist, it may well fail and leave the system in an unstable state. The bottom line is that the code must check for a null condition, and must handle this as a valid condition.

## Tying It All Together: An Example

Let's work on a simple example that will tie the concepts of inheritance, interfaces, com- position, associations, and aggregations together into a single, short system diagram.

Consider the example used in Chapter 8, with one addition:We will add an owner class that will take the dog out for walks.

Recall that the Dog class inherits directly from the Mammal class. The solid arrow repre- sents this relationship between the Dog class and the Mammal class in Figure 9.9.The Nameable class is an interface that Dog implements, which is represented by the dashed ar- row from the Dog class to the Nameable interface.

In this chapter, we are mostly concerned with associations and aggregations. The relation- ship between the Dog class and the Head class is considered aggregation because the head is actually part of the dog.The cardinality on the line connecting the two class diagrams specifies that a dog can have only a single head.

The relationship between the Dog class and the owner class is association.The owner is clearly not part of the dog, or vice versa, so we can safely eliminate aggregation. However, the dog does require a service from the owner—the act of taking him on a walk.The car- dinality on the line connecting the Dog and owner classes specifies that a dog can have one or more owners (for example, a wife and husband can both be considered owners, with shared responsibility for walking the dog).

These relationships—inheritance, interfaces, composition, associations, and aggrega- tions—represent the bulk of the design work you will encounter when designing OO systems.

## Conclusion

In this chapter, we have explored some of the finer points of composition and its two pri- mary types: aggregation and association.Whereas inheritance represents a new kind of al- ready-existing object, composition represents the interactions between various objects.

The last three chapters have covered the basics of inheritance and composition. Using these concepts and your skills in the software development process, you are on your way to designing solid classes and object models.

This book has covered a lot of material. The intent is to provide a high-level overview to the concepts involved in the OO thought process. I hope this book has whet your ap- petite for this subject and you will seek out other books that go into far more detail.

Many of the individual topics covered in this book—such as UML and use cases—have complete books devoted to them. Good hunting!
