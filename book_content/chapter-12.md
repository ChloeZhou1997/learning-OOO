# Chapter 12: Persistent Objects: Serialization and Relational Databases

No matter what type of business application you create, a database most likely will be part of the equation. In fact, one of my favorite lines when it comes to software develop- ment is “it's all about the data.” In short, no matter what hardware, operating system, ap- plication software, and so on is used when developing a software application, the need for the data is usually the reason for creating the system in the first place.

## Persistent Objects Basics

Recall that when an object is instantiated by an application, it lives only as long as the ap- plication itself. Thus, if you instantiate an Employee object that contains attributes such as name, ss#, and so on, that Employee object will cease to exist when the application termi- nates. Figure 12.1 illustrates the traditional object life cycle that is pretty straightforward. When an application creates an object, an object lives within the confines of that applica- tion. When the application ends, the object goes out of scope. For the object to live on, it must be written to some sort of persistent storage.

When the Employee object is instantiated and initialized, it has a specific state. Re- member that the state of an object is defined by the value of it attributes. If we want to save the state of the Employee object, we must take some sort of action to save the state of this object. The concept of saving the state of an object so that it can be used later is called persistence. Thus, we used the term persistent object to define an object that can be re- stored and used independent of a single application. Figure 12.2 illustrates the traditional object life cycle with persistence. In this figure, the object is created in application 1, which then writes the object out to a storage device, perhaps a database. Because the ob- ject is in persistent storage, other applications can access it. In this figure, application 2 can now instantiate an object and load the contents of the persistent object.

There are many ways to save the state of an object. Some of these are as follows:
- Save to a flat file
- Save to a relational database
- Save to an object database

The easiest way to demonstrate how to save an object is to create code that will write the object to a flat file, as most people do not have access to an object database or an indus- trial strength relational database on their home computer.

## Saving the Object to a Flat File

In this section, we will use a flat file to illustrate object persistence. I define a flat file as a simple file managed by the operating system. This is a very simple concept, so don't get too caught up in this description.

**Flat Files**
Many people do not like to use the term flat file. The word flat implies that the object is liter- ally flattened, and in a way it is.

One of the issues you might have considered is the fact that an object cannot be saved to a file like a simple variable—and this is true. In fact, this problem of saving the state of an object has spawned a major segment of the software product industry, which we discuss at length later in this chapter. Normally, when you save a number of variables to a file, you know the order and type of each variable, and then you simply write them out to the file. It could be a comma delimited file or any other protocol that you may decide to imple- ment.

The problem with an object is that it is not simply a collection of primitive variables. An object can be thought of as an indivisible unit that is composed of a number of parts. Thus, the object must be decomposed into a unit that can be written to a flat file. After the object is decomposed and written to a flat file, there is one major issue left to con- sider-reconstituting the object, basically putting it back together.

Another major problem with storing objects relates to the fact that an object can con- tain other objects. Consider that a car object might contain objects like Engines and Wheels. When you save the object to a flat file, you must consider saving the entire object, Car, Engines, and the like.

Java has a built-in mechanism for object persistence. Like other C-based languages, Java largely uses the concept of a stream to deal with I/O.To save an object to a file, Java writes it to the file via a Stream. To write to a Stream, objects must implement either the Serializable or Externalizable interface.

The obvious downside to this approach is that the solution is proprietary—you must be using Java to get this to work. In fact, Java must be on both sides of the “pipe.” Another more portable approach to this problem is to create an XML document as the intermedi- ate file and decompose and reconstitute an object using open XML technologies.

We cover both approaches in this chapter. First, Java will be used to demonstrate the Java serialization technology, and then we will use an XML strategy to implement an .NET example in both Visual Basic and C#.

### Serializing a File

As an example, consider the following code for a class called Person:
```
package Serialization;
import java.util.*;
import java.io.*;
class Person implements Serializable{
private String name;
public Person(){
}
public Person(String n){
System.out.println("Inside Person's Constructor");
name = n;
}
String getName() {
return name;
}
}
```
This class is a simple one that contains only a single attribute representing the name of the person.

The one line of note here is the line that identifies the class as Serializable. If you actually inspect the Java documentation, you will realize that the Serializable interface really does not contain much—in fact, it is meant solely to identify that the object will be serialized.
`class Person implements Serializable{`

This class also contains a method called getName that returns the name of the object. Beside the serializable interface, there is really nothing new about this class that we have not seen before. Here is where the interesting stuff starts. We now want to write an application that will write this object to a flat file. The application is called SavePerson and is as follows:
```
package Serialization;
import java.util.*;
import java.io.*;
public class SavePerson implements Serializable{
public SavePerson(){
Person person = new Person("Jack Jones");
try{
FileOutputStream fos = new FileOutputStream("Name.txt");
ObjectOutputStream oos = new ObjectOutputStream(fos);
System.out.print(“Person's Name Written: “);
System.out.println(person.getName());
oos.writeObject(person);
oos.flush();
oos.close();
} catch (Exception e) {
e.printStackTrace();
}
}
}
```
Although some of this code delves into some more sophisticated Java code, we can get a general idea of what is happening when an object gets serialized and written to a file.

**Java Code**
Although we have not explicitly covered some of the code in this example, such as file I/O, you can study the code in much greater detail with a few of the books referenced at the end of this chapter.

By now you should realize that this is an actual application. How can you tell this? The fact that the code has a main method in it is a sure tip that this is an actual application. This application basically does three things:
- Instantiates a Person object
- Serializes the object
- Writes the object to the file Name.txt

The actual act of serializing and writing the object is accomplished in the following code:
`oos.writeObject(person);`

This is obviously a lot simpler than writing each individual attribute out one at a time. It is very convenient to simply write the object directly to the file.

### Implementation and Interface Revisited

It is interesting to note that the underlying implementation of the serialization of a file is not quite as simple as the interface used. Remember that one of the most important themes of this book is the concept of separating the implementation from the interface. By providing an intuitive and easy-to-use interface that hides the underlying implementa- tion, life for the user is much easier.

Serializing a file is yet another great example of the difference between the interface and the implementation. The programmer's interface is to simply write the object to the file. You don't care about all of the technical issues required to actually accomplish this feat. All you care about is
- That you can write the object as an indivisible unit
- That you can restore the object exactly as you stored it

It's just like using a car. The interface to turn on the car is your key in the ignition, which starts it. Most people do not know or care about the technical issues regarding how things work all they care about is that the car starts.

The program SavePerson writes the object to the file Name.txt. The following code restores the object.
```
package Serialization;
import java.io.*;
import java.util.*;
public class RestorePerson{
public RestorePerson(){
try{
FileInputStream fis = new FileInputStream("Name.txt");
ObjectInputStream ois = new ObjectInputStream(fis);
Person person = (Person )ois.readObject();
System.out.print("Person's Name Restored: “);
System.out.println(person.getName());
ois.close();
} catch (Exception e){
e.printStackTrace();
}
}
}
```
The main line of interest here is the code that retrieves the object from the file Name.txt.
`Person person = (Person )ois.readObject();`

It is important to note that the object is reconstructed from the flat file, and a new in- stance of a Person object is instantiated and initialized. This Person object is an exact replica of the Person object that we stored in the SavePerson application. Figure 12.3 shows the output of both the savePerson and the RestorePerson applications.

Note that in Figure 12.3 the name “Jack Jones,” part of the Person object, is stored in the file Name.txt when the file is executed, and then the object is restored when RestorePerson is executed.When the object is restored, we can access the Person attribute.

### What About the Methods?

One question that may cross your mind when we talk about object persistence is this: “When the object is saved, it is easy to visualize how the attributes are saved, but what about the methods?"

One of the definitions of an object is that it contains attributes and behaviors or, in other words, data and methods. What happens to the methods when the object is stored?

In the case of the Java serialization example, the methods are not explicitly stored. Re- member that we indicated that Java had to be at both ends of the “pipe.” In actuality, the class definitions that you are using have to be on both ends of the “pipe” as well.

Thus, in the Person object example, both the SavePerson application and the RestorePerson application must have access to the Person class. While it is possible to ac- cess the Person class dynamically, the application that uses the class must have access to it. Thus, the methods themselves are not necessarily kept in the data store.

That said, as far as the programmer is concerned, the attributes and behaviors are still encapsulated as part of the object.There is no conceptual distinction—despite the fact that the physical implementation may not match the conceptual model.

## Using XML in the Serialization Process

While using a proprietary serialization technique may be efficient and compact, it is not portable. XML is the standard for defining data, so we can create an XML model of our serialization example that can, at least theoretically, be used across various platforms and languages. In this section, the XML model that we create will be accessible by code writ- ten in both C# and VB .NET. In fact, there is nothing to stop you from accessing the generated XML file from a Java program or any other language for that matter.

The primary difference between the XML model and the Java serialization model is that fact that with the XML model, we obviously generate an XML document. This doc- ument represents the attributes and properties of the Person class. This approach adds a bit of complexity to the Person class; however, the syntax provides a more encapsulated con- struction of the class.

Let's first look at the C# code. The primary difference of the Person class is the way that the attributes are defined. While much of the code is similar to the non-XML model (like the constructors, behaviors, etc), the data is defined with XML in mind.

For example, you would embed the definitions of the XML roots, attributes, and ele- ments directly in the code. The definitions would appear as follows:
`[XmlRoot("person")]`
`public class Person`
`[XmlAttribute("name")]`
`public String Name`
`[XmlElement("age")]`
`public int Age`

The interesting addition to this strategy is the fact that the attributes themselves have specific properties. While this may add more lines of code, and thus some complexity, the benefit is that the encapsulation of the class is much tighter. For example, throughout this book we often proclaim the benefits of private attributes and how access to these attrib- utes should be through defined getters and setters.While this is obviously a strong and im- portant concept, the fact remains that the definition (and thus signature) of the getters and setters are left to the discretion of the programmer. In short, getters and setters may be de- fined with whatever method names the programmer conjures up. In this XML model, the getters and setters are actually properties of the attribute and are thus bound to that attribute in a standard manner.

For example, when creating an XML attribute called name, the definition looks like this:
```
[XmlAttribute("name")]
public String Name
{
get
{
return this.strName;
}
set
{
if (value == null) return;
this.strName = value;
}
}
```
Inspecting this code, we can see that there is a lot more code that a simple attribute declaration:
`public String Name;`

However, although we have still defined the attribute as a type of String, the major addition here is that the Name attribute is now defined as an XML attribute, and the corre- sponding getter and setter are properties of the Name attribute itself.

The data validation and verification is still performed in the same way; however, it is much more intuitive (at least once you figure it out).

The syntax to set the Name attribute now becomes a simple assignment statement like the line of code here:
`this.Name = name;`

When this line is executed, the set property of the attribute is invoked. It is essentially an operator overload (for those of us who programmed a lot in C and C++).When the assignment operator (equals sign) is seen in the context of the Name attribute (on the left- hand side), the getter is called. It is almost like an in-line compiler directive.

The concept of using the XML version of the person class is very similar to the Java serialization model. Here is some sample code.
```
public void Serialize()
{
Person[] myPeople = new Person[3];
myPeople[0] = new Person("John Q. Public", 32, 95);
myPeople[1] = new Person("Jacob M. Smith", 35, 67);
myPeople[2] = new Person("Joe L. Jones", 65, 77);
XmlSerializer mySerializer = new XmlSerializer(typeof(Person[]));
TextWriter myWriter = new StreamWriter(“person.xml");
mySerializer.Serialize(myWriter, myPeople);
myWriter.Close();
}
```
The primary difference here is that, instead of being serialized to a proprietary Java for- mat, the file produced is in XML.
```
<?xml version="1.0" encoding="utf-8"?>
<ArrayOfPerson xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
xmlns:xsd="http://www.w3.org/2001/XMLSchema">
<Person name="John Q. Public">
<age>32</age>
</Person>
<Person name="Jacob M. Smith">
<age>35</age>
</Person>
<Person name="Joe L. Jones">
<age>65</age>
</Person>
</ArrayOfPerson>
```
To restore the object, we use the following code:
```
public void DeSerialize()
{
Person[] myRestoredPeople;
XmlSerializer mySerializer = new XmlSerializer(typeof(Person[]));
TextReader myReader = new StreamReader("person.xml");
myRestoredPeople = (Person[])mySerializer.Deserialize(myReader);
Console.WriteLine("My People restored:");
foreach (Person listPerson in myRestoredPeople)
{
Console.WriteLine(listPerson.Name + " is " +
listPerson.Age + " years old.");
}
Console.WriteLine("Press any key to continue...");
Console.ReadKey();
}
```
Note that we iterate through a data structure using a foreach loop. The complete code for this C# example and the correspondingVB .NET code is listed at the end of this chapter.

As we have noted, one of the major advantages of this approach is that the XML file is accessible by any and all languages and platforms that implement the XML interface, in- cluding Java. Although we implemented the Java example in a proprietary way, this was done for example purposes. There is nothing stopping a programmer from using the XML approach in Java as well.

## Writing to a Relational Database

The relational database is perhaps one of the most important tools ever devised in the in- formation technology field. Although some people might not buy into this statement completely, and there certainly are many other important candidates, the relational data- base has had a huge impact on the IT industry. In fact, the relational database remains a powerhouse despite the fact that other technologies may well be technologically better.

The reason for this is that relational databases are the database of choice for most busi- nesses today. From Oracle to SQLServer in the large applications, to Microsoft Access in small to medium applications, relational databases are everywhere.

Although relational databases are a wonderful technology, they provide a bit of a prob- lem when it comes to interfacing with objects. Just as with the issue of writing to a flat file, taking an object that may be composed of other objects and writing it to relational databases, which are not designed in an object-oriented manner, can be problematic.

Relational databases are built on the concept of tables. Figure 12.4 shows a typical Mi- crosoft Access table relationship. This relational model is so widespread that many people intuitively think of all data models in this way. However, the object-oriented model is not table-driven. Figure 12.4 shows the familiar Northwind relational database model that ships with Microsoft Access.

Because objects do not map conveniently to tables, object-oriented database systems were developed in the 1990s. An interesting bit of history is that although these databases represented the object-oriented model well, and might even have performed better, there was one major problem: legacy data.

**Legacy Data**
Legacy data may be decades of data that are stored in various storage devices. In this chap- ter, we consider legacy data to be the historical data stored in relational databases. Many people don't like the term “legacy” because they think it implies obsolete. In fact, important legacy data is not obsolete but an important part of the system.

Because most companies use relational databases, most of today's business data is stored in relational databases.This means that there is a huge investment made in these relational databases. And there is one more issue involved when it comes to these systems—they work. Even though object databases might perform better when writing objects to a data- base, the cost of converting all the relational data to object data is unacceptable. In short, to use an object database, a company would have to convert all of its data from a relational database to an object database.This has many drawbacks.

First, anyone who has performed the conversion of data from one database to another knows that this is a very painful process. Second, even if the data converts successfully, there is no way to know how the change of database tools will affect the application code. Third, when problems occur (and they almost always do), it's difficult to determine whether the problem is with the database or the application code. It can be a nightmare. Most company decision makers were not willing to take these chances. Thus, object data- bases were relegated to totally new systems written with object-oriented code.

However, we still have the following problem:We want to write object-oriented appli- cations, but we need to access the legacy data in the relational databases. This is where ob- ject-to-relational mapping comes in.

## Accessing a Relational Database

All databases applications have the following structure:
- Database client
- Database server
- Database

The database client is the user application that provides the interface to the system. Often it is a GUI application that allows users to query and update the database.

**SQL**
SQL stands for Structured Query Language. It is a standard way for database clients to com- municate with varied vendor database systems that implement this standard.

The database client will communicate with the database server via SQL statements. Figure 12.5 displays a general solution to the database client/server model.

As an example, let's use Java to communicate to a Microsoft Access database, which is a re- lational database. Java uses JDBC to communicate with database servers.

**JDBC**
Officially, Sun does not maintain JDBC as an acronym. In the industry it is known as Java Database Connectivity.

Part of the problem with database drivers is that they tend to be vendor-specific.This is a common problem with any type of driver. As you probably know, when you purchase a new printer, the printer comes with a driver that's specific to that printer, and you might even have to download specific updates for that driver. Software products have similar is- sues. Each vendor has a specific protocol for communicating with its product. This solu- tion might work well if you continue to use a specific vendor. However, if you want to maintain the option of changing vendors, you might be in trouble.

Microsoft has produced a standard called Open Database Connectivity (ODBC). Ac- cording to Jamie Jaworski in Java 2 Platform Unleashed, “ODBC drivers abstract away ven- dor-specific protocols, providing a common application-programming interface to database clients. By writing your database clients to the ODBC API, you enable your pro- grams to access more database servers.”Take a look at Figure 12.6.This figure illustrates how ODBC fits into the picture.

Again we see the words abstract and interface in a definition of a software API. By using ODBC, we can write applications to a specific standard, and we do not need to know the implementation. Theoretically, we can write code to the ODBC standard and not care whether the database implementation is a Microsoft Access database or an Oracle database-theoretically at least.

As we see in Figure 12.5, the client uses the driver to send SQL statements to the data- base servers. Java uses JDBC to communicate with the database servers. JDBC can work in various ways. First, some JDBC drivers can connect directly to the database servers. Others actually use ODBC as a connection to the database servers, as in Figure 12.7. Depending on how you decide to write your applications, you might need to download various driv- ers and servers.These specifics are well beyond the scope of this book because here we are concerned mainly with the general concepts. For more detailed information on how to actually set up an actual database and how to connect to it with your applications, please refer to more advanced books such as Java 2 Platform Unleashed—it is not a trivial en- deavor.

The JDBC API provides the interface between the application program and the database. These interfaces are found in the Java package called java.sql. The API includes the fol- lowing:
- DriverManager
- Connection
- Statement
- ResultSet

Let's explore these topics one at a time in the following sections.

### Loading the Driver

Running a database application is not quite as straightforward as running the serialization example in the earlier sections of this chapter because a client/server connection must ac- tually be created. Connecting to a local file, as was done in the serialization example, is a fairly basic task. However, remember that when using a separate database application such as Microsoft Access, a connection must be made to the database itself.

This connection requires that the database driver be loaded first. To load the driver, we need to use the Driver Manager. In Java, the DriverManager class loads the driver into the Java app, and then JDBC is used to make the connection between the app and the database.

To load the Sun driver, you code the following line:
`Class.forName("sun.jdbc.odbc.JdbcOdbcDriver");`

**Drivers for Other Databases**
You can use drivers for database systems other than Access as well. You would then have to replace the string loaded by the forName() command.

Normally the Class.forName construct is used for this purpose.You could explicitly as- sign a reference to the driver like this:
`java.sql.Driver d = Class.forName(“sun.jdbc.odbc.JdbcOdbcDriver");`

However, the Driver class is automatically registered within the application, so this is not necessary.

### Making the Connection

After the driver has been loaded, the connection to the database can now be loaded using the getConnection method.
`Connection con = DriverManager.getConnection(url, “id”, “pwd");`

The url string format depends on which driver you are using. For example, because we are using the JDBC-ODBC bridge, we can use a url like "jdbc:odbc:myDriver”.
`Connection con = DriverManager.getConnection("jdbc:odbc:myDriver", "id", "pwd");`

You can also connect to the datasource over the Internet with the following form:
`jdbc:<sub-protocol>:<sub-name>`

The actual code might look like this:
`jdbc:odbc//companyserver.com:500/supplierdata`

**Driver Documentation**
Remember that you need to consult the documentation for the driver you are using. The syn- tax may vary depending on the specific driver.

With the driver loaded and a connection made to the database, you are now ready to exe- cute some SQL commands.

### The SQL Statements

If you have used Microsoft Access or any other relational database, you have certainly exe- cuted SQL statements.This section provides the basic Java syntax for building and submit- ting a SQL query to a relational database. It is interesting to note that from now on, everything that we do is not database-specific. Now that the driver has been loaded and the connection made, the rest is basic SQL, which is standard across database platforms.

The first thing to do is create a statement object, which at this point does not yet con- tain a SQL statement.You can use the createStatement method to execute simple SQL statements that do not contain any parameters. In this case, we are simply creating a state- ment object, which will obtain its SQL information a bit later.
`Statement statement = connection .createStatement();`

There are actually two types of SQL statements that we can execute:
- Queries
- Updates

We use primary statements such as the executeQuery method to execute basically any type of SQL query that we are interested in. The executeUpdate method is used to exe- cute something like an update or insert operation or anything that would actually change the database. The executeQuery method only inspects the database and never physically alters it. In short, queries would include operations like SELECT statements and updates would include operations such as INSERT, UPDATE, DELETE, and so on.

However, before we can actually execute the query, we must build the query. Rather than hard-code it into the executeQuery method, let's build a string that we can pass to the executeQuery method. This way, we can make the code much more configurable.

Here is the code to build a query string.
`String sqlQuery= "SELECT PRODUCT FFROM SUPPLIERTABLE WHERE PRODUCT = 'Bolts'";`

What we want to do here is query the SUPPLIERTABLE for any record that contains a PRODUCT of 'Bolts'.

**SQL Strings**
Note that SQL uses the single quote to delineate strings. Make sure you remember this be- cause many programming languages use double quotes to delineate strings. This can get confusing and produce incorrect code.

Now that we have the SQL string built, we can execute the executeQuery method as fol- lows:
`ResultSet rs = statement.executeQuery(sqlQuery);`

You might be wondering what the ResultSet is. Well, remember that the SQL query performs a search of the SUPPLIERTABLE for any record that contains a PRODUCT of 'Bolts'. This implies that there might be more than one supplier that supplies bolts. Thus, we have the potential to need storage for more than one supplier. Many object-ori- ented languages include the concept of a collection. Collections not only include traditional data structures such as arrays; they also include data structures such as an ArrayList, hash tables, and so on.

**Arrays and Collections**
Collections are a very useful addition to the Java and .NET toolkits. One of the disadvan- tages of an array is that you must define its length when the array is declared.
ArrayLists, on the other hand, are basically arrays that can grow and thus make your pro- gramming life much easier.

When a SQL query is executed, the results are held in a ResultSet object, as indicated in the previous line of code. When the executeQuery method is invoked, all records in the SUPPLIERTABLE that contain the string 'Bolts' in the Product field will be returned in the ResultSet. One of the advantages of this is that we can iterate through the ResultSet. For example, suppose we want to iterate through the ResultSet to simply print all the suppliers that supply bolts that were culled from the database.
`if (rs.next()){`
`System.out.println("rs.getString("SUPPLIERID"));`
`}`

In this case, when the Resultset is returned, the pointer to the collection is at position 0 (remember that Java and .NET start counting at zero). Each time rs.next() is exe- cuted, the pointer to the collection is incremented by one, basically pointing to the next row. If there are no more rows available, rs . next() returns a value of false. In this way, you can process the ResultSet in a very logical and efficient manner.

If you know the specific row ahead of time, you can actually use the following code:
`if (rs.next()){`
`System.out.println("rs.getString(5));`
`}`

This might be very convenient, but it is obviously not that configurable.

Although the statement and the connection will close by default when the application terminates, proper programming conventions dictate that you should close them yourself. This will ensure the integrity of the database. Closing the database is just as important as closing a file. The code for this is quite simple:
`statement.close();`
`connection.close();`

The complete code for this example is as follows:
```
public void findVendor (String vendorId) throws SQLException{
String returnString = null;
String dbUserid = "userid"; // Your Database user id
String dbPassword = "password"; // Your Database password
Class.forName("sun.jdbc.odbc.JdbcOdbcDriver");
Connection connection =
DriverManager.getConnection("jdbc:odbc:myDriver", dbUserid, dbPassword);
Statement statement = connection .createStatement();
String sqlQuery=
"select PRODUCT from SUPPLIERTABLE where PRODUCT = 'Bolts'";
ResultSet rs = statement.executeQuery(sqlQuery);
if (rs.next())
{
System.out.println(“rs.getString("SUPPLIERID”));
}
statement.close();
connection.close();
}
```
**Executing the Code**
Remember that you will have to customize this code for whichever driver you are using and the name of your database. Thus, some editing is required before this code will run.

## Conclusion

In this chapter, we covered the concept of object persistence. Previously, we had focused mainly on the fundamental object-oriented concepts and treated the object as an entity that persists only in the life cycle of the application that creates it. We considered the issue of objects that need to persist beyond the life cycle of one or more applications.

For example, an application might need to restore an object that was created by an- other application or might create an object for later use by itself or other applications. One way to persist an object is to serialize it to a conventional file. Another is to use a re- lational database.
