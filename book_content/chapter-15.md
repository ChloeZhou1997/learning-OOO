# Chapter 15: Design Patterns

One of the really interesting things about software development is that when you create a software system, you are actually modeling a real-world system. We have seen this con- cept throughout this book. For example, when we discussed using inheritance to abstract out the behaviors and attributes of mammals, the model was based on the true real-life model, not a contrived model that we created for our own purposes.

Thus, when we create a mammal class, we can use it to build countless other classes, such as dogs and cats and so on because all mammals share certain behaviors and attrib- utes.This works when we study dogs, cats, squirrels, and other mammals because we can see patterns. These patterns allow us to inspect an animal and make the determination that it is indeed a mammal, or perhaps a reptile, which would have other patterns of be- haviors and attributes.

Throughout history, humans have used patterns in many aspects of life, including engi- neering. These patterns go hand-in-hand with the holy grail of software development: software reuse. In this chapter, we consider design patterns, a relatively new area of soft- ware development.

Design patterns are perhaps one of the most influential developments that have come out of the object-oriented movement in the past several years. Patterns lend themselves per- fectly to the concept of reusable software development. And because object-oriented devel- opment is all about reuse, patterns and object-oriented development go hand-in-hand.

The basic concept of design patterns revolves around the principle of best practices. By best practices, we mean that when good and efficient solutions are created, these solutions are documented in a way that others can benefit from previous successes—as well as learn from the failures.

One of the most important books on object-oriented software development is Design Patterns: Elements of Reusable Object-Oriented Software by Erich Gamma, Richard Helm, Ralph Johnson, and John Vlissides.This book was an important milestone for the software industry and has become so entrenched in the computer science lexicon that the book's authors have become known simply as the Gang of Four. In writings on object-oriented topics, you will often see the Gang of Four referred to simply as the GoF.

## Why Design Patterns?

The concept of design patterns did not necessarily start with the need for reusable soft- ware. In fact, the seminal work on design patterns is about constructing buildings and cities. As Christopher Alexander noted in A Pattern Language: Towns, Buildings, Construction, “Each pattern describes a problem which occurs over and over again in our environment, and then describes the core of the solution to that problem, in such a way that you can use the solution a million times over, without ever doing it the same way twice.”

### The Four Elements of a Pattern

The GoF describe a pattern as having four essential elements:
- The pattern name is a handle we can use to describe a design problem, its solu- tions, and consequences in a word or two. Naming a pattern immediately in- creases our design vocabulary. It lets us design at a higher level of abstraction. Having a vocabulary for patterns lets us talk about them with our colleagues, in our documentation, and even to ourselves. It makes it easier to think about designs and to communicate them and their tradeoff to others. Finding good names has been one of the hardest parts of developing our catalog.
- The problem describes when to apply the pattern. It explains the problem and its content. It might describe specific design problems, such as how to represent al- gorithms as objects. It might describe class or object structures that are sympto- matic of an inflexible design. Sometimes the problem will include a list of condi- tions that must be met before it makes sense to apply the pattern.
- The solution describes the elements that make up the design, their relationships, responsibilities, and collaborations. The solution doesn't describe a particular con- crete design or implementation because a pattern is like a template that can be applied in many different situations. Instead, the pattern provides an abstract de- scription of a design problem, and how a general arrangement of elements (classes and objects in our case) solves it.
- The consequences are the results and tradeoffs of applying the pattern. Although consequences are often unvoiced, when we describe design decisions, they are critical for evaluating design alternatives and for understanding the costs and ben- efits of the applying pattern. The consequences for software often concern space and time tradeoffs. They might address language and implementation issues as well. Because reuse is often a factor in object-oriented design, the consequences of a pattern include its impact on a system's flexibility, extensibility, or portability. Listing the consequences explicitly helps you understand and evaluate them.

## Smalltalk's Model/View/Controller

As an historical perspective, we need to consider the Model/View/Controller (MVC) in- troduced in Smalltalk (and used in other object-oriented languages). MVC is often used to illustrate the origins of design patterns. The Model/View/Controller paradigm was used to create user interfaces in Smalltalk. Smalltalk was perhaps the first popular object- oriented language.

**Smalltalk**
Smalltalk is the result of several great ideas that emerged from Xerox PARC. These ideas in- cluded the mouse and using a windowing environment, among others. Smalltalk is a wonder- ful language that provided the foundation for all the object-oriented languages that followed. One of the complaints about C++ is that it's not really object-oriented, whereas Smalltalk is. Although C++ had a larger following in the early days of 00, Smalltalk has always had a very dedicated core group of supporters. Java is a mostly OO language that embraced the C++ developer base.

Design Patterns defines the MVC components in the following manner:
*The Model is the application object, the View is the screen presentation, and the Controller defines the way the user interface reacts to user input.*

The problem with previous paradigms is that the Model,View, and Controller used to be lumped together in a single entity. For example, a single object would have included all three of the components. With the MVC paradigm, these three components have separate and distinct interfaces. So if you want to change the user interface of an application, you only have to change the View. Figure 15.1 illustrates what the MVC design looks like.

Remember that much of what we have been learning about object-oriented development has to do with interfaces versus implementation. As much as possible, we want to separate the interface from the implementation. We also want to separate interface from interface as much as possible. For example, we do not want to combine multiple interfaces that do not have anything to do with one another (or the solution to the problem at hand). The MVC was one of the early pioneers in this separation of interfaces. The MVC explicitly defines the interfaces between specific components pertaining to a very common and basic pro- gramming problem—the creation of user interfaces and their connection to the business logic and data behind them.

If you follow the MVC concept and separate the user interface, business logic, and data, your system will be much more flexible and robust. For example, assume that the user interface is on a client machine, the business logic is on an application server, and the data is located on a data server. Developing your application in this way would allow you to change the way the GUI looks without having an impact on the business logic or the data. Likewise, if your business logic changes and you calculate a specific field differently, you can change the business logic without having to change the GUI. And finally, if you want to swap databases and store your data differently, you can change the way the data is stored on the data server without affecting either the GUI or the business logic. This as- sumes, of course, that the interfaces between the three do not change.

**MVC Example**
As a further example of a list box, consider a GUI that includes a list of phone numbers. The listbox is the view, the phonelist is the model, and the controller is the logic thatbinds the listbox to the phone list.

**MVC Drawbacks**
Although the MVC is a great design, it can be somewhat complex, in that there must be a lot of attention paid to the upfront design. This is a problem with object-oriented design in gen- eral-there is a fine line between a good design and a cumbersome design. The question re- mains: How much complexity should you build into the system with regard to a complete design?

## Types of Design Patterns

Design Patterns features 23 patterns grouped into the three categories listed below. Most of the examples are written in C++, with some written in Smalltalk. The time of the book's publication is indicative of the use of C++ and Smalltalk.The publication date of 1995 was right at the cusp of the Internet revolution and the corresponding popularity of the Java programming language. After the benefit of design patterns became apparent, many other books rushed in to fill the newly created market. Many of these later books were written in Java.

In any event, the actual language used is irrelevant. Design Patterns is inherently a design book, and the patterns can be implemented in any number of languages. The authors of the book divided the patterns into three categories:
- Creational patterns create objects for you, rather than having you instantiate objects directly. This gives your program more flexibility in deciding which objects need to be created for a given case.
- Structural patterns help you compose groups of objects into larger structures, such as complex user interfaces, or accounting data.
- Behavioral patterns help you define the communication between objects in your sys- tem and how the flow is controlled in a complex program.

In the following sections, we will discuss one example from each of these categories to provide a flavor of what design patterns actually are. For a comprehensive list and descrip- tion of individual design patterns, please refer to the books listed at the end of this chapter.

### Creational Patterns

The creational patterns consist of the following categories:
- Abstract factory
- Builder
- Factory method
- Prototype
- Singleton

As stated earlier, the scope of this chapter is to describe what a design pattern is—not to describe each and every pattern in the GoF book.Thus, we will cover a single pattern in each category. With this in mind, let's consider an example of a creational pattern, and look at the singleton pattern.

#### The Singleton Design Pattern

The singleton pattern, represented in Figure 15.2, is a creational pattern used to regulate the creation of objects from a class to a single object. For example, if you have a website that has a counter object to keep track of the hits on your site, you certainly do not want a new counter to be instantiated each time your web page is actually hit.You want a counter object instantiated when the first hit is made, but after that, you want to use the existing object to simply increment the count.

Although there might be other ways to regulate the creation of objects, the best way is to let the class itself take care of this issue.

**Taking Care of Business**
Remember, one of the most important OO rules is that an object should take care of itself. This means that issues regarding the life cycle of a class should be handled in the class, not delegated to language constructs like static, and so on.

Figure 15.3 shows the UML model for the singleton taken directly from Design Patterns. Note the property uniqueinstance, which is a static singleton object, and the method Instance().The other properties and methods are there to indicate that other properties and methods will be required to support the business logic of the class.

Any other class that needs to access an instance of a Singleton must interface through the Instance() method. The creation of an object should be controlled through the con- structor, just like any other OO design. We can require the client to interface through the Instance() method, and then have the Instance() method call the constructor.

The following Java code illustrates what the code looks like for the general singleton.
```
public class ClassicSingleton {
private static ClassicSingleton instance = null;
protected ClassicSingleton() {
// Exists only to defeat instantiation.
}
public static ClassicSingleton getInstance() {
if(instance == null) {
instance = new ClassicSingleton();
}
return instance;
}
}
```
We can create a more specific example for the web page counter example that we used previously.
```
package Counter;
public class Counter
{
private int counter;
private static Counter instance = null;
protected Counter()
{
}
public static Counter getInstance() {
if(instance == null) {
instance = new Counter ();
System.out.println("New instance created\n");
}
return instance;
}
public void incrementCounter()
{
counter++;
}
public int getCounter()
{
return(counter);
}
}
```
The main point to note about the code is the regulation of the object creation. Only a single counter object can be created. The code for this is as follows:
```
public static Counter getInstance() {
if(instance == null) {
instance = new Counter ();
System.out.println("New instance created\n");
}
return instance;
}
```
Note that if the instance is nu11, it means that an object has yet to be instantiated. In this event, a new counter object is created. If the instance is not nul1, it indicates that a Counter object has been instantiated, and no new object is to be created. In this case, the reference to the only object available is returned to the application.

**More Than One Reference**
There may well be more than one reference to the singleton. If you create references in the application and each reference is referring to the singleton, you will have to manage the mul- tiple references.

Although this code is certainly interesting, it is also valuable to see how the singleton is instantiated and managed by the application. Take a look at the following code:
```
public class Singleton
{
public static void main(String[] args)
{
Counter counter1 = Counter.getInstance();
System.out.println("Counter : " + counter1.getCounter() );
Counter counter2 = Counter.getInstance();
System.out.println("Counter : " + counter2.getCounter() );
}
}
```
**Two References to a Single Counter**
Be aware that in this example, there are two separate references pointing to the counter.

This code actually uses the counter singleton. Take a look at how the objects are cre- ated:
`Counter counter1 = Counter.getInstance();`

The constructor is not used here. The instantiation of the object is controlled by the getInstance() method. Figure 15.4 shows what happens when this code is executed. Note that the message New instance created is only output a single time. When counter2 is created, it receives a copy of the original object—the same as counter1.

Let's prove that the references for counter1 and counter2 are the same.We can update the application code as follows:
```
package Counter;
public class Singleton
{
public static void main(String[] args)
{
Counter counter1 = Counter.getInstance();
counterl.incrementCounter();
counterl.incrementCounter();
System.out.println("Counter : " + counter1.getCounter() );
Counter counter2 = Counter.getInstance();
counter2.incrementCounter();
System.out.println("Counter : " + counter2.getCounter() );
}
}
```
Figure 15.5 shows the output from the singleton application. Note that in this case, we are incrementing counter1 twice, so the counter will be 2.When we create the counter2 reference, it references the same object as counter1, so when we increment the counter, it's now 3 (2+1).

### Structural Patterns

Structural patterns are used to create larger structures from groups of objects. The follow- ing seven design patterns are members of the structural category.
- Adapter
- Bridge
- Composite
- Decorator
- Façade
- Flyweight
- Proxy

As an example from the structural category, let's take a look at the adapter pattern. The adapter pattern is also one of the most important design patterns. This pattern is a good example of how the implementation and interface are separated.

#### The Adapter Design Pattern

The adapter pattern is a way for you to create a different interface for a class that already exists. The adapter pattern basically provides a class wrapper. In other words, you create a new class that incorporates (wraps) the functionality of an existing class with a new and— ideally-better interface. A simple example of a wrapper is the Java class Integer.The Integer class actually wraps a single Integer value inside it. You might wonder why you would bother to do this. Remember that in an object-oriented system, everything is an object. In Java, primitives, such as ints, floats, and so on are not actually objects. When you need to perform functions on these primitives, such as conversions, you need to treat them as objects. Thus, you create a wrapper object and “wrap” the primitive inside it.

Thus, you can take a primitive like the following:
`int myInt = 10;`

and then wrap it in an Integer object:
`Integer my IntWrapper = new Integer (myInt);`

Now you can do a conversion, so we can treat it as a string:
`String myString = myIntWrapper.toString();`

This wrapper allows us to treat the original integer as an object, thus providing all the advantages of an object.

As for the adapter pattern itself, consider the example of a mail tool interface. Let's as- sume you have purchased some code that provides all the functionality you need to im- plement a mail client.This tool provides everything you want in a mail client, except you would like to change the interface slightly. In fact, all you want to do is change the API to retrieve your mail.

The following class provides a very simple example of a mail client for this example.
```
package MailTool;
public class MailTool {
public MailTool () {
}
public int retrieveMail() {
System.out.println ("You've Got Mail");
return 0;
}
}
```
When you invoke the retrieveMail() method, your mail is presented with the very original greeting "You've Got Mail.” Now let's suppose you want to change the interface in all your company's clients from retrieveMail() to getMail().You can create an in- terface to enforce this:
```
package MailTool;
interface MailInterface {
int getMail();
}
```
You can now create your own mail tool that wraps the original tool and provide your own interface:
```
package MailTool;
class MyMailTool implements MailInterface {
private MailTool yourMailTool;
public MyMailTool () {
yourMailTool= new MailTool();
setYourMailTool (yourMailTool);
}
public int getMail() {
return getYourMailTool().retrieveMail();
}
public MailTool getYourMailTool() {
return yourMailTool ;
}
public void setYourMailTool(MailTool newYourMailTool) {
yourMailTool = newYourMailTool;
}
}
```
Inside this class, you create an instance of the original mail tool that you want to retro- fit. This class implements MailInterface, which will force you to implement a getMail() method. Inside this method, you literally invoke the retrieveMail() method of the original mail tool.

To use your new class, you simply instantiate your new mail tool and invoke the getMail() method.
```
package MailTool;
public class Adapter
{
public static void main(String[] args)
{
MyMailTool myMailTool = new MyMailTool();
myMailTool.getMail();
}
}
```
When you do invoke the getMail() method, you are using this new interface to actu- ally invoke the retrieveMail() method from the original tool. This, of course, is a very simple example; however, by creating this wrapper, you can actually enhance the interface and add your own functionality to the original class.

The concept of an adapter is quite simple, but you can create new and powerful inter- faces using this pattern.

### Behavioral Patterns

The behavioral patterns consist of the following categories:
- Chain of response
- Command
- Interpreter
- Iterator
- Mediator
- Memento
- Observer
- State
- Strategy
- Template method
- Visitor

As an example from the behavioral category, let's take a look at the iterator pattern. This is one of the most commonly used patterns and is implemented by several program- ming languages.

#### The Iterator Design Pattern

Iterators provide a standard mechanism for traversing a collection, such as a vector. Func- tionality must be provided so that each item of the collection can be accessed one at a time. The iterator pattern provides information hiding, keeping the internal structure of the collection secure. The iterator pattern also stipulates that more than one iterator can be created without interfering with each other. Java actually provides its own implemen- tation of an iterator. The following code creates a vector and then inserts a number of strings into it.
```
package Iterator;
import java.util.*;
public class Iterator {
public static void main(String args[]) {
// Instantiate an ArrayList.
ArrayList<String> names = new ArrayList();
// Add values to the ArrayList
names.add(new String("Joe"));
names.add(new String("Mary”));
names.add(new String("Bob"));
names.add(new String("Sue”));
//Now Iterate through the names
System.out.println("Names:");
iterate (names );
}
private static void iterate (ArrayList<String> arl) {
for (String listItem : arl) {
System.out.println(listItem.toString());
}
}
}
```
Then we create an enumeration so that we can iterate through it. The method iterate() is provided to perform the actual iteration functionality. In this method, we use the Java enumeration method hasMoreElements(), which traverses the vector and lists all of the names.

## Antipatterns

Although a design pattern evolves from experiences in a positive manner, antipatterns can be thought of as collections of experiences that have gone awry. It is well documented that most software projects are ultimately deemed unsuccessful. In fact, as indicated in the article “Creating Chaos” by Johnny Johnson, fully one-third of all projects are cancelled outright. It would seem obvious that many of these failures are caused by poor design decisions.

The term antipattern derives from the fact that design patterns are created to proac- tively solve a specific type of problem. An antipattern, on the other hand, is a reaction to a problem and is gleaned from bad experiences. In short, whereas design patterns are based on solid design practices, antipatterns can be thought of as practices to avoid.

In the November 1995 C++ Report, Andrew Koenig described two facets of antipatterns:
- Those that describe a bad solution to a problem, which result in a bad situation
- Those that describe how to get out of a bad situation and how to proceed from there to a good solution

Many people believe that antipatterns are actually more useful than design patterns. This is because antipatterns are designed to solve problems that have already occurred. This boils down to the concept of root-cause analysis. A study can be conducted with actual data that might indicate why the original design, perhaps an actual design pattern, did not succeed. It might be said that antipatterns emerge from the failure of previous solutions. Thus, antipatterns have the benefit of hindsight.

For example, in his article “Reuse Patterns and Antipatterns,” Scott Ambler identifies a pattern called a robust artifact, and defines it as follows:
*An item that is well-documented, built to meet general needs instead of project-specific needs, thoroughly tested, and has several examples to show how to work with it. Items with these qual- ities are much more likely to be reused than items without them. A Robust Artifact is an item that is easy to understand and work with.*

However, there are certainly many situations when a solution is declared reusable and then no one ever reuses it.Thus, to illustrate an antipattern, he writes:
*Someone other than the original developer must review a Reuseless Artifact to determine whether or not anyone might be interested in it. If so, the artifact must be reworked to become a Robust Artifact.*

Thus, antipatterns lead to the revision of existing designs, and the continuous refactoring of those designs until a workable solution is found.

## Conclusion

In this chapter, we explored the concept of design patterns. Patterns are part of everyday life, and this is just the way you should be thinking about object-oriented designs. As with many things pertaining to information technology, the roots for solutions are founded in real-life situations.

Although this chapter covered design patterns only briefly, you should explore this topic in greater detail by picking up one of the books referenced at the end of this chapter.