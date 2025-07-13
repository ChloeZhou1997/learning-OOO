# Chapter 13: Objects and the Internet

Perhaps the major reason that objects have become so popular in the IT industry has to do with the Internet. Although object-oriented languages have been around basically as long as structured languages, it was only when the Internet emerged that objects gained wide acceptance.

Actually, the object-oriented language Smalltalk became popular during the 1980s and 1990s. And the object-based language C++ gained widespread acceptance in the 1990s. Smalltalk gained widespread support from object-oriented purists, and C++ became the first object language to become a force in the marketplace. Java, which was targeted specifically for networks, is an object-oriented language which has proved commercially successful. Now, with the introduction of .NET, object-oriented languages have become part of the mainstream.This chapter covers some of the object technologies that are used on the Internet.

## Evolution of Distributed Computing

In a basic sense, we can trace the beginning of what can be called “distributed comput- ing" back to the advent of email. For the purposes of this book, we focus on the process of sending objects between applications that reside on distributed physical platforms. Dis- tributed computing includes many technologies, including the following, which are cov- ered at varied degrees within this chapter:

* HTML
* EDI
* RPC
* CORBA
* DCOM
* XML
* SOAP
* Web Services

## Object-Based Scripting Languages

The primary focus of this book has been on programming languages, specifically Java and the .NET languages. However, these object-oriented languages are not the only domains for programming with objects. We have already mentioned that C++ is not a true object- oriented programming language but is actually an object-based programming language. Remember that C++ is considered to be object-based. Object-oriented concepts are not enforced. You can write a non-object-oriented C program using a C++ compiler. There is also a class of languages called scripting languages. JavaScript, VBScript and ASP all fall into this category.

**Overall Model**
Many technologies are used to create web pages. Programming languages, scripting lan- guages, and markup languages all have a place in the model. Although this book focuses primarily on object-oriented programming languages, it is important to understand that pro- gramming languages are just part of the puzzle.

At this point, let's pause briefly to cover a few of the Internet-related topics that form the basis for our discussion on the Web. First, it is important to review the concepts of a client-server model. Figure 13.1 shows a typical client-server model.

It is important to understand that there really are two sides to the client-server story. As the name implies, the two parts of the model are the client side, which in many cases is the browser, and the server side, which is the physical web server. A simple e-commerce example serves as a good study for this discussion.

Suppose you are creating a simple web page that will request the following information from the user:
- Date
- First name
- Last name
- Age

When invoked, the HTML is rendered in the browser, which is considered the client, as shown in Figure 13.2.

This is obviously a very simple HTML document; however, it illustrates the concept of form validation quite well. One of the major issues we must address when developing a client-server system is whether we will do client validation, server validation, or both.

For example, suppose we want to verify that the date entered by the user is valid. We also want the age to be within a valid range—we certainly don't want someone to enter an age of -5. The question is whether to validate on the client side or the server side. Let's explore why this is an important discussion and how it relates to objects.

First, let's address the issue of the Age field. In most business systems, the customer in- formation would be stored in a database that resides with the server. For security reasons, the client is not permitted to access the database directly.

**Client Security**
Because anyone can bring up a web browser, it would be very foolish to let the client (browser) access the database directly. Thus, when the client needs to inspect or update the database, it must request the operation from the server. This is a basic security issue.

The reason why this example is so interesting is because it's a perfect example of the inter- face/implementation paradigm stressed throughout this book. In this case, the client is re- questing a service from the server. The software system provides an interface through which the client can literally send messages and request specific services from the server.

In the example relating to the Age field in the HTML document in Figure 13.2, sup- pose a user named Mary wants to update her age in the database. After bringing up the web page, the user enters the appropriate information on the form (including her age in the Age field) and then clicks on the Register button. In the simplest scenario, the infor- mation in the form is sent to the server, which then processes the information and updates the database.

How is the information entered in the Date field verified? If no validation is done, the software on the server accesses the Age field in Mary's record and makes the update. If the age that Mary enters is incorrect, the inappropriate age is entered in the database.

If the validation is done on the server, the software on the server checks to make sure that the Age value falls into appropriate ranges. It is also possible that the database itself does some checking to ensure that the age is within proper limits.

However, there is one major limitation to server-side validation—the information must be sent to the server.This might seem counter-intuitive, but you can ask this simple ques- tion:Why validate something on the server that can be validated on the client?

There are several points that address this question:
- Sending things to the server takes more time.
- Sending things to the server increases network traffic.
- Sending things to the server takes up server resources.
- Sending things to the server increases the potential for error.

For these reasons, as well as other possible issues, our goal is to do as much of the valida- tion on the client as possible. This is where the scripting languages come into play.

## A JavaScript Validation Example

JavaScript, as are most scripting languages, is considered to be object-based. Just like C++, you can write JavaScript applications that do not comply with object-oriented criteria. However, JavaScript does provide object-oriented capabilities. This is what makes scripting languages, like JavaScript and ASP .NET, very important in the object-oriented market. You can use objects in a JavaScript application to enhance the capabilities of your web page. In some ways, you can think of these scripting languages as bridges between tradi- tional programming paradigms and object-oriented models. I feel it is important to un- derstand you can incorporate objects into your web applications, even if you aren't using pure object-oriented technologies.

To understand the power of the scripting languages, we must first understand the limi- tations of HTML. HTML is a markup language that provides functionality, not inherent programming capabilities. For example, there is no way in HTML to program an IF state- ment or a loop. Thus, in the early days of HTML, there was little if any way to validate data on the client side. Scripting changed all of this.

With the functionality provided by JavaScript and other scripting languages, a web page developer could actually perform programming logic within the web page. The ca- pability to perform programming logic allows for client-side validation. Let's look at an example of a very simple validation application using HTML and JavaScript. The code for this simple web page is presented as follows:
```
<html>
<head>
<title>Validation Program</title>
<script type = "text/javascript">
function validateNumber(tForm) {
if (tForm.result.value != 5 ) {
this.alert ("not 5!");
} else {
this.alert ("Correct. Good Job!");
}
}
</script>
</head>
<body>
<hr>
<p>
<h1>Validate</h1>
<form name="form">
<input type="text" name="result" value="0" SIZE="2">
<input type="button" value="Validate" name="calcButton"
onClick="validateNumber(this.form)">
</form>
<hr>
</body>
</html>
```
One of the first things to notice is that the JavaScript is embedded inside the HTML code. This is different from how a programming language is used. Whereas languages like Java and C# exist as independent application entities, JavaScript code can only exist within the confines of a browser.

**Java Versus JavaScript**
Although Java and JavaScript are both based on C syntax, they are not really related.

When presented in the client browser, the web page is very straightforward, as shown in Figure 13.3.

In this application, a user can enter a number in the textbox and then click the Validate button. The application will then check to see whether the value is 5. If the entered value is not 5, an alert box will appear to indicate that there was a validation error, as seen in Figure 13.4. If the user enters 5, an alert box indicates that the value was as expected.

The mechanism for performing this validation is based on two separate parts of the JavaScript script:
- The function definitions
- The HTML tags

As with regular programming languages, we can define functions in JavaScript. In this example, we have a single function in the application called validateNumber().
```
<script type = "text/javascript">
function validateNumber(tForm) {
if (tForm.result.value != 5 ) {
this.alert ("not 5!");
} else {
this.alert ("Correct. Good Job!");
}
}
</script>
```
**JavaScript Syntax**
Because we are more concerned with the concepts in this book, please refer to a JavaScript book for the specifics of the JavaScript syntax.

The function is actually called when the Validate button is clicked.This action is captured in the HTML form definition.
`<input type="button" value="Validate" name="calcButton"`
`onClick="validateNumber(this.form)">`

When the Validate button is clicked, an object that represents the actual form is sent via the parameter list to the validateNumber() function.

## Objects in a Web Page

There are many ways that you can utilize objects within an HTML file for use in a web page. Objects can be implemented via a scripting language, as in the JavaScript valida- tion example in the previous section. External objects can also be included within an HTML file.

There are many examples of these external objects. Some of these objects play various media like music and movies. Others can execute objects created by third-party software such as PowerPoint or Flash.

In this section we take a look at how objects are embedded within a web page.

### JavaScript Objects

Object programming is inherent to the process of the JavaScript example illustrated in the previous section.We can see this by looking at the code within the validateNumber() function. Although there are many names, like component, widgets, controls, and so on to describe the parts of a user interface, they all relate to the functionality of an object.

There are several objects used to create this web page. You can consider the following as objects:
- The text box
- The button
- The form

Each of these has properties and methods. For example, you can change a property of the button, like the color, as well as change the label on the button. The form can be thought of as an object made up of other objects. As you can see in the following line of code, the notation used mimics the notation used in object-oriented languages (using the period to separate the object from the properties and methods). In the line of code, you can see that the value property of the text box object (result) is part of the form object (tForm).
`if (tForm.result.value != 5 )`

Additionally, the alert box itself is an object. We can check this by using a this pointer in the code.
`this.alert ("Correct. Good Job!");`

**The this Pointer**
Remember the this pointer refers to the current object, which in this case is the form.

JavaScript supports a specific object hierarchy. Figure 13.5 provides a partial list of this hi- erarchy.

As with other scripting languages, JavaScript provides a number of built-in objects. As an example, we can take a look at the built-in Date class. An instance of this class is an ob- ject that contains methods such as getHours() and getMinutes().You can also create your own customized classes. The following code demonstrates the use of the Date object.
```
<html>
<head>
<title>Date Object Example</title>
</head>
<body>
<script language="JavaScript" type = "text/javascript">
days = new Array ( "Sunday", "Monday", "Tuesday",
"Wednesday", "Thursday", "Friday",
"Saturday", "Sunday");
today=new Date
document.write("Today is " + days [today.getDay()]);
</script>
</body>
</head>
</html>
```
Note that in this example, we actually create an Array object that holds the string val- ues representing the days of the week.We also create an object called today that holds the information pertaining to the current date. This web page will display the current day of the week based on the date in your computer's memory.

### Web Page Controls

There are many types of objects that can be embedded directly into an HTML docu- ment. Web page controls consist of a wide array of pre-built objects. To utilize these ob- jects, an <object> tag is provided. As an example, we will use a Slider control to include in a simple web page. The following HTML code shows how to use this Slider control.
```
<html>
<head>
<title>Slider</title>
</head>
<body>
<object classid="clsid:F08DF954-8592-11D1-B16A-00C0F0283628" id="Slider1"
width="100" height="50">
<param name="BorderStyle" value="1" />
<param name="MousePointer" value="0" />
<param name="Enabled" value="1" />
<param name="Min" value="0" />
<param name="Max" value="10" />
</object>
</body>
</html>
```
When this file is opened in a browser, the results are seen in Figure 13.6.

Note that this is a true object. It has attributes: height, width, and so on and behaviors: the slider. Some of the attributes are set via the parameters passed from within the <object> tag.

### Sound Players

The <object> tag can also be used to embed and launch various sound players from within the browser. In most cases, the player launched depends on the actual default player loaded by the browser.

For example, the following HTML code loads and plays the sound file specified within the <object> tag. In this case, the audio file must be in the appropriate directory— although the file can be accessed over the Internet.
```
<html>
<head>
<title>SoundPlayer</title>
</head>
<body>
<object
classid="clsid:22D6F312-B0F6-11D0-94AB-0080C74C7E95">
<param name="FileName" value="fanfare.wav" />
</object>
</body>
</html>
```

### Movie Players

Movie players can be included as well, just as a sound player. The following code will play a movie file (.wmv) from within the <object> tag. As with any sound file, the movie file must be in the appropriate directory or Internet location.
```
<html>
<head>
<title>Slider</title>
</head>
<body>
<object
classid="clsid:22D6F312-B0F6-11D0-94AB-0080C74C7E95">
<param name="FileName" value="AspectRatio4x3.wmv" />
</object>
</body>
</html>
```

### Flash

As our last example (although) there are many more, a Flash object can be embedded in a web document by using the <object> tag as shown in the following HTML code.
```
<html>
<head>
<title>Slider</title>
</head>
<body>
<object width="400" height="40"
classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"
codebase="http://download.macromedia.com
/pub/shockwave/cabs/flash/swflash.cab#4,0,0,0">
<param name="SRC" value="intro.swf">
<embed src="bookmark.swf" width="400" height="40"></embed>
</object>
</body>
</html>
```

## Distributed Objects and the Enterprise

In the past several years, the term enterprise computing has become a major part of the infor- mation technology lexicon. Today, much of the major development in the area of IT tech- nology is that of enterprise computing. But what does enterprise computing actually mean?

Perhaps the most basic definition of enterprise computing is that it's essentially distrib- uted computing. Distributed computing is just what the name implies, a distributed group of computers working together over a network. In this context, a network can be a propri- etary network or the Internet.

The power of distributed computing is that computers can share the work. In a truly distributed environment, you do not even need to know what computer is actually servic- ing your request—in fact, it might be better that you don't know. For example, when you shop online you connect to a company's web site. All you know is that you are connecting using a URL. However, the company will connect you to whatever physical machine is available.

Why is this desirable? Suppose that a company has a single machine to service all the requests. Then consider what would happen if the machine crashes. Now let's suppose that the company can distribute the online activities over a dozen machines. If one of the ma- chines goes down, the impact will not be as devastating.

Also, consider the situation when you download files from a web site.You probably have encountered the situation in which the download site provides you with links to a number of sites, and then asks you to choose the site closest to you.This is a means of dis- tributing the load over the network. Computer networks can balance the load themselves. Figure 13.7 provides a diagram of how a distributed system might look.

This book is focused on objects and object-oriented concepts. So in many ways, the enti- ties we are interested in are called distributed objects. The fact that objects are totally self- contained makes them perfect for distributed applications. The thrust of this chapter is this: If your application (client) requires the service of some object, that object can reside anywhere on the network. Let's explore some of the technologies that exist for distributed objects.

### The Common Object Request Broker Architecture (CORBA)

One of the primary tenets of this book is that objects are totally self-contained units. With this in mind, it doesn't take much imagination to consider sending objects over a network. In fact, we have used objects traveling over a network in many of the examples through- out this book. A Java applet is a good example of an object being downloaded from a server to a client (browser).

The entire premise of the enterprise is built on the concept of distributed objects. There are many advantages to using distributed objects; perhaps the most interesting is the fact that a system can theoretically invoke objects anywhere on the network. This is a powerful capability, and is the backbone for much of today's Internet-based business. An- other major advantage is that various pieces of a system can be distributed across multiple machines across a network.

The idea of accessing and invoking objects across a network is a powerful technique. However, there is one obvious fly in the ointment—the reoccurring problem of portabil- ity. Although we can, of course, create a proprietary distributed network, the fact that it is proprietary leads to obvious limitations. The other problem is that of programming lan- guage. Suppose a system written in Java would like to invoke an object written in C++. In the best of all worlds, we would like to create a non-proprietary, language-independent framework for objects in a distributed environment. This is where CORBA comes in.

**OMG**
An organization you should become very familiar with is the Object Management Group (OMG). OMG is the keeper of the keys for many standard technologies, including CORBA and UML, among others. Find out more at http://www.omg.org.

The main premise of CORBA (Common Object Request Broker Architecture) is this: Using a standard protocol, CORBA allows programs from different vendors to communi- cate with each other. This interoperability covers hardware and software. Thus, vendors can write applications on various hardware platforms and operating systems using a wide vari- ety of programming languages, operating over different vendor networks.

CORBA, and similar technologies like DCOM, can be considered the middleware for a variety of computer software applications.Whereas CORBA represents only one type of middleware (later we will see some other implementations, like Java's RMI), the concepts behind middleware are consistent, regardless of the approach taken. Basically, middleware provides services that allow application processes to interact with each other over a net- work.These systems are often referred to as multi-tiered systems. For example, a 3-tiered sys- tem is presented in Figure 13.8. In this case, the presentation layer is separated from the data layer by the allocation layer in the middle.These processes can be running on one or more machines.This is where the term distributed comes into play. The processes (or as far as this book is concerned, the objects) are distributed across a network.This network can be proprietary, or it might be the Internet.

This is where objects fit into the picture. The OMG states: “CORBA applications are composed of objects.” So, as you can tell, objects are a major part of the world of distrib- uted computing.The OMG goes on to say that these objects “are individual units of run- ning software that combine functionality and data, and that frequently (but not always) represent something in the real world.”

One of the most obvious examples of such a system is that of a shopping cart. We can relate this shopping cart example to our earlier discussions on the instantiation of objects. When you visit an e-commerce site to purchase merchandise, you are assigned your own individual shopping cart. Thus, each customer has her own shopping cart. In this case, each customer will have an object, which includes all the attributes and behaviors of a shopping cart object.

Although each customer object has the same attributes and behaviors, each customer will obviously have different attribute assignments, such as name, address, and so on. This shop- ping cart object can then be sent anywhere across the network.There will also be other objects in the system that represent merchandise, warehouses, and so on.

**Wrappers**
As we explained earlier in the book, one common use of objects is that of a wrapper. Today there are a lot of applications written on legacy systems. In many cases, changing these legacy applications is either impractical or not cost-effective. One elegant way to connect legacy applications to newer distributed systems is to create an object wrapper that inter- faces with the legacy system.

One of the benefits of using CORBA to implement a system such as our shopping cart application is that the objects can be accessed by services written in different languages. To accomplish this task, CORBA defines an interface to which all languages must conform. The CORBA concept of an interface fits in well with the discussion we had about creat- ing contracts in Chapter 8,“Frameworks and Reuse: Designing with Interfaces and Ab- stract Classes.”The CORBA interface is called the Interface Definition Language (IDL). For CORBA to work, both sides of the wire, the client and server, must adhere to the con- tract as stated in the IDL.

Yet another term we covered earlier in the book is used in this discussion—marshaling. Remember that marshaling is the act of taking an object, decomposing it into a format that can be sent over a network, and then reconstituting it at the other end.Thus, by hav- ing both the client and the server conform to the IDL, an object can be marshaled across a network regardless of the programming language used.

All the objects that move around in a CORBA system are routed by an application called an Object Request Broker (ORB).You might have already noticed that the acronym ORB is actually part of the acronym CORBA. The ORB is what makes every- thing go in a CORBA application. The ORB takes care of routing requests from clients to objects, as well as getting the response back to the appropriate destination.

**Languages Supported**
At this point in time, CORBA supports the following languages: C, C++, Java, COBOL, Smalltalk, Ada, Lisp, Python, and IDLscript.

Again, we can see how CORBA and distributed computing works hand-in-hand with the concepts we have studied throughout this book. The OMG states that
*This separation of interface from implementation, enabled by OMG IDL, is the essence of CORBA.*

Furthermore,
*Clients access objects only through their advertised interface, invoking only those operations that the object exposes through its IDL interface, with only those parameters (input and output) that are included in the invocation.*

To get a flavor of what the IDL looks like, consider the e-business example we used in Chapter 8. In this case, let's revisit the UML diagram of Figure 8.7 and create a subset of the shop class. If we decide to create an interface of Inventory, we could create some- thing like the following:
```
interface Inventory {
string[] getInventory ();
string[] buyInventory (in string product);
}
```
In this case, we have an interface that defines how to list and purchase inventory. This in- terface is then compiled into two entities:
- Stubs that act as the connection between the client and the ORB
- A skeleton that acts as the connection between the ORB and the object

These IDL stubs and skeletons form the contract that all interacting parties must follow. Figure 13.9 shows an illustration of how the various CORBA parts interact.

The really interesting thing about all this is that when a client wants the service of some object, it does not need to know anything about the object it is requesting, including where it resides. The client simply invokes the object (and the service) it wants. To the client, it appears that this invocation is local, as though it's invoking an object that's on the local system. This invocation is passed through the ORB. If the ORB determines that the desired object is actually a remote object, the ORB routes the request. If everything works properly, the client will not know where the actual object servicing it resides. Figure 13.10 shows how the ORB routing works over a network.

**Internet Inter-ORB Protocol**
Just as HTTP is the protocol for web page transactions, IIOP (Internet Inter-ORB Protocol) is a protocol for distributed objects that can be written in a variety of programming languages. IIOP is a fundamental piece of standards like CORBA and Java RMI.

### Web Services Definition

Web services have evolved quickly over the past several years. In fact, when the first edi- tion of this book was published, much of the current technology was in its infancy. At this point in time, we will use the W3C general definition of a web service as a “client and a server that communicate using XML messages using the SOAP (Simple Object Access Protocol) standard.”

SOAP is a communication protocol used for sending messages over the Internet. SOAP is theoretically platform and language independent and is based on XML. SOAP communicates between applications using the HTTP protocol, since it is common for user client applications to utilize browsers. SOAP extends the functionality of HTTP as to provide more functional web services.

Since early on in the evolution of distributed computing, remote procedure calls (RPC) have been a part of the equation. The primary motivation for SOAP is to perform remote procedure calls over HTTP using XML.With all of these brief descriptions out of the way, we can describe SOAP in a nutshell: SOAP is XML-based and is a protocol for dis- tributed applications.

The major drawback with technologies such as CORBA and DCOM is that they are basically proprietary and have their own binary formats. SOAP is text-based, being writ- ten in XML, and is considered much simpler to use when compared to CORBA and DCOM. This is similar to the advantages outlined in the section, “Using XML in the Se- rialization Process,” of Chapter 12.

In effect, to work as seamlessly as possible, CORBA and DCOM systems must com- municate with similar systems. This is a significant limitation in the current technological environment: since you don't really know what is on the other side of the wire. And due to this fact, perhaps the biggest advantage that SOAP has going for it is that it has most of the major software companies on board with its standard.

As described over and over in this book, one of the major advantages of object tech- nology is that of wrappers. SOAP can be thought of as a wrapper that, while not an exact replacement for technologies like DCOM, Enterprise JavaBeans or CORBA, it does "wrap" them for more efficient use over the Internet. This “wrapping” ability allows com- panies to standardize their own network communications, even though there may be dis- parate technologies within the company itself.

Whatever the description of SOAP, it is important to note that, as basic HTML, SOAP is a stateless, one-way messaging system. Because of this and other features, SOAP is not a total replacement for technologies like DCOM, Enterprise JavaBeans, CORBA or RMI—it is a complimentary technology.

In keeping with the theme of this book, the following SOAP example focuses on ob- ject concepts and not any specific SOAP technology, coding or otherwise.

**SOAP**
The example presented in this chapter shows the flow of objects through a distributed sys- tem. A complete sample application is included in the accompanying media but is way too large to fit in the pages of this book.

For this example, let's create a Warehouse application. This application utilizes a browser as the client, which then uses a set of web services to transact business with a Warehouse sys- tem that resides somewhere on the network.

We use the following model for our SOAP example. Figure 13.11 provides a visual di- agram of the system.

The file mwsoap.xml is the XML description of the structure of the various transactions handled by the web services.This description of Invoice. xsd is shown in the following listing.

```
<?xml version="1.0" encoding="utf-8"?>
<xs:schema targetNamespace="http://ootp.org/invoice.xsd"
elementFormDefault="qualified"
xmlns="http://ootp.org/invoice.xsd" xmlns:mstns="http://ootp.org/invoice.xsd"
xmlns:xs="http://www.w3.org/2001/XMLSchema">
<xs:element name="Invoice">
<xs:complexType>
<xs:sequence>
<xs:element name="Address" minOccurs="1">
<xs:complexType>
<xs:sequence />
<xs:attribute name="Street" type="xs:string" />
<xs:attribute name="City" type="xs:string" />
<xs:attribute name="State" type="xs:string" />
<xs:attribute name="Zip" type="xs:int" />
<xs:attribute name="Country" type="xs:string" />
</xs:complexType>
</xs:element>
<xs:element name="Package">
<xs:complexType>
<xs:sequence />
<xs:attribute name="Description" type="xs:string" />
<xs:attribute name="Weight" type="xs:short" />
<xs:attribute name="Priority" type="xs:boolean" />
<xs:attribute name="Insured" type="xs: boolean" />
</xs:complexType>
</xs:element>
</xs:sequence>
<xs:attribute name="name" type="xs:string" />
</xs:complexType>
</xs:element>
</xs:schema>
```
The Invoice.xsd file describes how an invoice is structured and how applications must conform to its definitions. This file is, in effect, a schema in the same way that a schema is used in a database system. Note that, per this Invoice.xsd file, an invoice is comprised of an Address and Package. Further, the Address and Package are built of attributes like Description, Weight, etc. Finally, these attributes are declared as specific data types like, string, short, etc. Figure 13.12 shows graphically what this relationship looks like.

In this example, while the Invoice.xsd file describes how the data is structured, the mwsoap.xml file represents what the data is. An application, written in a language like C# .NET,VB .NET, ASP.NET or Java, uses the Invoice.xsd file to construct valid XML files that are then sent to other applications over the network. These applications would use the same Invoice.xsd file to deconstruct the mwsoap.xml file for use its use. In many ways, you can think of the Invoice.xsd file as a sort of contract, in a similar way to the concept of a contract in the chapter 8, Frameworks and Reuse: Designing with Interfaces and Abstract classes.

The following is the mwsoap.xml file that contains specific data embedded in its SOAP/XML format.
```
<?xml version="1.0" encoding="utf-8"?>
<soap:envelope xmlns:soap="http://www.w3.org/2001/06/soap-envelope">
<soap: Header>
<mySOAPHeader: transaction xmlns:mySOAPHeader="soap-transaction"
soap:mustUnderstand="true">
<headerId>8675309</headerId>
</mySOAPHeader: transaction>
</soap:Header>
<soap:Body>
<mySOAPBody xmlns="http://ootp.org/Invoice.xsd">
<invoice name="Jenny Smith">
<address street="475 Oak Lane"
city="Somewheresville”
state="Nebraska"
zip="23654"
country="USA"/>
<package description="22 inch Plasma Monitor"
weight="22"
priority="false"
insured="true" />
</invoice>
</mySOAPBody>
</soap:Body>
</soap:envelope>
```

### Web Services Code

The only piece of the model left to cover is the code applications themselves. The three classes that correspond to the Invoice, Address and Package are presented in the follow- ing in C# .NET. Equivalent code is presented in Visual Basic .NET at the end of this chapter.

It is important to note that the applications can be of any language. This is the beauty of the SOAP/XML approach. Each application must be able to parse the XML file-and that it basically the only requirement as seen in Figure 13.13. How an application uses the data extracted is totally up to the application.

As a result of this approach, the specific language, or platform for that matter, is irrelevant. Theoretically, any language can perform a parsing operation, and that is basically what is needed in this SOAP/XML approach.

Of course, as developers it is helpful to take a look at the code directly. In the follow- ing sections, the C# .NET code is presented to help illustrate how the system described in Figure 13.12 is implemented. The correspondingVB .NET code is supplied in the chapter's code appendix.

#### Invoice.cs

The following code is the C# .NET implementation of the Invoice class that is repre- sented in Figure 13.12:
```
using System;
using System.Data;
using System.Configuration;
using System.Xml;
using System.Xml.Serialization;
namespace WebServices
{
[XmlRoot("invoice”)]
public class Invoice
{
public Invoice (String name, Address address, ShippingPackage package)
{
this.Name = name;
this.Address = address;
this. Package = package;
}
private String strName;
[XmlAttribute("name")]
public String Name
{
get { return strName; }
set { strName = value; }
}
private Address objAddress;
[XmlElement("address")]
public Address Address
{
get { return objAddress; }
set { objAddress = value; }
}
private ShippingPackage objPackage;
[XmlElement("package")]
public ShippingPackage Package
{
get { return objPackage; }
set { objPackage = value; }
}
}
}
```

#### Invoice.vb

The following code is the VB .NET implementation of the Invoice class that is repre- sented in Figure 13.12:
```
Imports Microsoft.VisualBasic
Imports System
Imports System.Data
Imports System.Configuration
Imports System.Xml
Imports System.Xml.Serialization
<XmlRoot("invoice")>
Public Class Invoice
Public Sub New(ByVal name As String,
ByVal itemAddress As Address, ByVal itemPackage As Package)
Me.Name = name
Me.Address = itemAddress
Me.Package = itemPackage
End Sub
Private strName As String
<XmlAttribute("name")>
Public Property Name() As String
Get
Return strName
End Get
Set(ByVal value As String)
strName = value
End Set
End Property
<XmlElement("address")>
Private objAddress As Address
Public Property Address() As Address
Get
Return objAddress
End Get
Set(ByVal value As Address)
objAddress = value
End Set
End Property
Private objPackage As Package
<XmlElement("package")>
Public Property Package() As Package
Get
Return objPackage
End Get
Set(ByVal value As Package)
objPackage = value
End Set
End Property
End Class
```

## Conclusion

In this chapter, we have covered some of the technology available for using objects in conjunction with web applications. It is important to differentiate between objects em- bedded in a web page (such as JavaScript) and objects use in a distributed system.

Distributed objects have evolved quickly over the past several years.There are now many options in the distributed object market; however, the combination of SOAP and XML has made the design of distributed systems much more standard.
