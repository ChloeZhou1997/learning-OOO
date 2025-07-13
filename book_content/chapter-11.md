# Chapter 11: Objects and Portable Data: XML

Object-oriented technologies have made major inroads in recent years. Objects have become a major technology in the application development industry. Objects have also made major headway in the definition and movement of data as well. Much excitement has been generated over the past several years regarding the portability of code. Much of Java's success was due to the fact that it was highly portable across multiple platforms. The bytecodes produced by Java could be executed on various platforms, as long as the system had a Java virtual machine loaded.The .NET framework provides another, very impor- tant, type of portability—portability across various languages. The assemblies produced by C# .NET can be used within Visual Basic .NET applications, or any other .NET lan- guage for that matter. Perhaps in the future there will be a programming language that will be fully and economically portable across both languages and platforms.

Although portable languages are powerful tools, they are really only half of the appli- cation development equation. The programs that are written using these languages must process data, and this data must be turned into information. It is this information that drives businesses. Information is the other half of the portability equation.

XML is a standard mechanism for defining and transporting data between potentially disparate systems. By using object-oriented languages such as Java,VB, and C# in con- junction with an object-oriented data definition language such as XML, moving data be- tween various destinations is much more efficient and secure. XML provides a mechanism for independent applications to share data.

## Portable Data

Historically, a major business problem has been the diversity of data storage formats. For example, assume that Alpha Company uses an Oracle database system to operate its sales system. Assume further that Beta Company uses a SQL Server database system to operate its purchasing system. Now consider the problem that occurs when Alpha Company and Beta Company want to do business over the Internet. Although there are obviously sev- eral issues that must be addressed when building a system, the one problem we address here is the fact that the two databases are not directly compatible. Our goal is to create an electronic purchase order for Beta Company using SQL Server, which will interact di- rectly with Alpha Company's sales system, which uses Oracle.

Furthermore, many companies must move the information within their organization, as well as to other companies. Much electronic commerce is transacted over both the In- ternet and local intranets. The types of business systems that require electronic commerce are obviously quite varied.

XML provides standards to move data in a variety of ways. Often we can think of data as moving vertically and horizontally. The term vertical means that data is meant to move through multiple industry groups. Industry groups such as those in accounting and fi- nance (FpML, Financial products Markup Language) have developed their own markup languages that provide standard data definitions. These vertical applications provide the specific business models and terminology to move information across multiple industries. These standards are often called a vocabulary. Thus, industry groups are using XML to form a vocabulary.

The other approach to XML standards is that of horizontal applications. Horizontal ap- plications are specific to a particular industry, such as retail or transportation. In all elec- tronic commerce applications, the sharing of data is paramount. Figure 11.1 represents how data can move vertically and horizontally through various industries.

One interesting example of an industry XML application is that of the RecipeML (Recipe Markup Language). RecipeML is an XML vocabulary that defines standards for industries involved with food, such as hotels, restaurants, publishers, and so on. Using RecipeML allows these industries to move data back and forth in a standard and portable manner. Some of the industries with XML-based standards include legal, hospitality, ac- counting, retail, travel, finance, and education.

Here is where we consider the concept of portable data. Although the low-level data (at the machine level) is certainly not portable, we want to create a higher-level portabil- ity at the information level. Whereas Java,VB, and C# provide certain levels of portability at the programming language level, XML provides this information portability that we are looking for.

## The Extensible Markup Language (XML)

XML stands for Extensible Markup Language.You probably are already familiar with an- other markup language called HTML (Hypertext Markup Language). Both XML and HTML are descendants of SGML, the Standard Generalized Markup Language. Surpris- ingly, SGML appeared as early as the 1970s and was standardized in the 1980s.

The primary function of HTML is to present data in a browser. It was actually devel- oped to organize data using hyperlinks, and the browser is a perfect vehicle for this pur- pose. However, HTML is meant to format and present data, not to define and verify it. HTML is a subset of SGML but did not include the data verification constructs provided by the SGML specification.The reason for this is that SGML is very complex and sophis- ticated, and implementing SGML completely can be quite expensive. At least early on, HTML did not concern itself with the data verification issues, among other things.

XML, on the other hand, does concern itself with data verification issues. XML was defined in 1997 as a subset of SGML. XML is much more strict with its format than HTML and was designed to represent data. XML is not proprietary and the World Wide Web Consortium (W3C) is the organization that proposes recommendations and that promotes the distribution of its standards.

In subsequent chapters, we will see how XML is used within various object-oriented technologies such as distributed computing, object persistence, and so on.

One of the philosophical problems with Java is that it is proprietary (owned by Sun Microsystems).The .NET framework is also proprietary (owned by Microsoft). The beauty of XML is that it is an open technology. In fact, it is one of the few technologies that have been embraced by most of the IT industry leaders: Sun, Microsoft, IBM, and so on. Thus, XML is not about to go away anytime soon.

## XML Versus HTML

Soon after XML emerged, there was speculation that XML would replace HTML. Many believed that because they were both descendants of SGML, XML was an upgrade. In re- ality, HTML and XML are designed for different purposes. HTML presents data, and XML describes the data. Both HTML and XML are important tools in the development of Web-based systems.

XML actually looks a lot like HTML.This is not surprising, because they come from the same source. However, XML provides two primary advantages that HTML does not validity and well-formed documents.

HTML tags are all predefined.Tags such as <HTML>,<HEAD>,<BODY>, and so on are all defined in the HTML specification.You cannot add your own tags. Because HTML is in- tended for formatting purposes, this is not really a problem. XML, however, is meant to define data. To define data, you need to create your own tag names. This is where a docu- ment called the Document Type Definition (DTD) comes into play. The DTD is where you define the tags that describe your data. When you create an XML document, you can only use tags that are predefined. All XML documents are checked for validity. The XML processor reads the DTD and determines whether the document is valid. If the document is not valid, a syntax error is produced.

**Valid Documents**
You are not required to use a DTD. However, using a DTD provides a great benefit to validat- ing XML documents. XML only checks to see whether there is a well-formed document. You need to explicitly include a DTD to check for document validity. You define the parameters in the DTD.

For example, if you are creating a purchase order system, you might want to create a tag called <PurchaseOrder> in the DTD. If you then misspell the tag like this: <PurchasOrder>, this problem will be detected, and the document will be flagged as invalid.

A validated document makes XML documents much more robust—a necessity when dealing with data. For example, HTML has many tags that are part of a pair, such as <FONT> and </FONT>. If you were to forget to close the pair with the </FONT> tag, the browser will still load the document, but the results could be unpredictable. HTML will make a best guess and continue. XML, when used with a DTD, will not attempt a best guess. If the document is not constructed properly, an error will be generated and the document will not be valid.

Enforcing the validity of a document and ensuring that a document is well-formed provides industries with an important mechanism to share information.

## XML and Object-Oriented Languages

XML works hand-in-hand with object-oriented languages to provide what I have termed “portable information.” Often, an application written in a language such as Java,VB, or C# is developed to interact with XML. For example, let's revisit the example earlier in the chapter. Alpha Company, a department store, uses an Oracle database, and Beta Company, a vacuum machine manufacturer, uses a SQL Server database. Alpha Company wants to purchase some vacuum cleaners from Beta Company for its inventory. All transactions will be handled electronically over the Internet.

To make a long story short, the problem is that the data is stored in two totally differ- ent databases. Even if the databases were the same, the formats of the records in the data- base would most likely be designed differently. Thus, the goal is to share data between Alpha Co. and Beta Co., which means sharing the data between their databases. And this does not mean a direct physical connection between the databases; the issue here is how to transact business—for example, one company sending a purchase order and the receiv- ing company processing it.

**Proprietary Solutions**
We could of course create a proprietary application for connectivity between the Alpha and Beta Companies. Although this would work for this one application, it is preferable to have a more general solution (as is the object-oriented way). For example, Alpha Company might be in the market position to require that all suppliers conform to its purchase order specifica- tion. This is where XML shines. Alpha Company can create an XML specification to which all its suppliers can connect.

To accomplish the goal of connecting the systems of the two companies, Alpha Com- pany can come up with an XML specification describing what information is required to complete a transaction and store the information in its database. Here is where the object- oriented languages come in. A language such as Java,VB, or C# can be used to extract the data from Alpha Company's SQL Server database and create an XML document based on the agreed-upon standards.

This XML document can then be sent over the Internet to Beta Company, which uses the agreed-upon XML standard to extract the information in the XML document and enters it into its Oracle database. Figure 11.2 represents the flow of data from one database to another. In this figure, data is extracted from a SQL database by an applications\parser and then sent over a network to another application\parser.This parser then converts the data into an Oracle format.

**Parsers**
A parser is a program that reads a document and extracts specific information. For example, a compiler contains a parser. The parser reads each line of a program and uses specific grammar rules to determine how to produce code. A parser would verify that a print state- ment was written with the appropriate syntax.

## Sharing Data Between Two Companies

At this point, it is helpful to implement, to a certain extent, our example of the collabo- ration between the Alpha and Beta Companies. The scope of this discussion is to create the XML document that will contain a simple transaction between the two companies. For this example, we will create a simple document that contains the information con- tained in Table 11.1. This table defines the data that will be transferred from one com- pany to the other.

## Validating the Document with the Document Type Definition (DTD)

In this example, we will be sending an XML document from Beta Company to Alpha Com- pany. The XML document will represent a transaction that contains the name of the com- pany, the address of the company, and certain product information. Note that the information is nested. This is to say that the overall document, which can be described as an object, is that of a supplier And nested within the supplier identification are the company name, the com- pany address, and the product information. Note that there is also information nested within the address and the product identifications. Before going any further, let's define a DTD that will drive all the transactions for this example.The DTD is presented in Listing 11.1.

**Listing 11.1 The Data Definition Document for Validation**
`<!- DTD for supplier document ->`
`<!ELEMENT supplier ( name, address)>`
`<!ELEMENT name ( companyname)>`
`<!ELEMENT Companyname ( #PCDATA)>`
`<!ELEMENT address ( street+, city, state, zip)>`
`<!ELEMENT Street ( #PCDATA)>`
`<!ELEMENT city ( #PCDATA)>`
`<!ELEMENT state ( #PCDATA)>`
`<!ELEMENT zip ( #PCDATA)>`

The DTD defines how the XML document is constructed. It is composed of tags that look very similar to HTML tags. The first line is an XML comment.
`<!- DTD for supplier document ->`

XML comments provide the same function as any other programming language's comments—to document the code. As with any code, XML uses comments to make the document easier to read and understand. Do not put too many comments in it, or the document will be more difficult to read. This document contains only one comment.

The remaining lines actually define the structure of the XML document. Let's look at the first line:
`<!ELEMENT supplier ( name, address, product)>`

This tag defines an element called supplier. As specified in the DTD above, a supplier contains a name, an address, and a product. Thus, when an XML parser actu- ally parses an XML document, the document must be a supplier, which contains a name, an address, and a product.

Taking things to the next level, we see that the element name is made up of yet an- other element called <companyname>.
`<!ELEMENT name ( companyname)>`

The <companyname> element is then defined to be a data element designated by #PCDATA.
`<!ELEMENT Companyname ( #PCDATA)>`

This tag terminates the hierarchy of the element tree.This DTD is named supplier.dtd.You can use any text editor to create the DTD.There are also many inte- grated tools and environments that can be used to create this document as well. Figure 11.3 uses Notepad to show how a DTD for this application might look.

**Document Validity**
An XML document that specifies a DTD is either valid or invalid based on the DTD. If a docu- ment does not specify a DTD, the XML document is not judged either valid or invalid. An XML document can specify a DTD internally or externally. Because external DTDs provide a very powerful mechanism, we will use an external DTD here.

**PCDATA**
PCDATA stands for Parsed Character Data and is simply standard character information parsed from the text file. Any numbers, such as integers, will need to be converted by the parser.

## Integrating the DTD into the XML Document

Now that we have created the DTD, it is time to create an actual XML document. Re- member that the XML document must conform to the supplier DTD we have just written.

In Table 11.2, we have identified some of the actual information that will be contained in the XML document. Again, note that the data is only contained in the end elements, not the aggregate elements, such as address and name.

To enter this information into an XML document, we can use a text editor, just as we used for the DTD. However, as we will see later, there are tools that have been created specifically for this purpose. Figure 11.4 shows the XML document written using Notepad. This document is called beta.xml.

Note that the second line ties this document to the supplier DTD that we defined earlier.
`<!DOCTYPE supplier SYSTEM "supplier.dtd">`

Looking at Figure 11.4, we can see that the tag structure mimics the specification. It is important to realize that the tags are nested and that only the end tags contain any data. Some of the tags are basically high-level tags. In some ways it is similar to the concept of abstract classes.You can think of the <address> tag as being “abstract” because we don't really define it. However, the <street> tag can be considered “concrete” given that we actually assign a value to it. In other words, the <street> tag does contain information, whereas the address tag does not:
`<address>`
`<street>12000 Ontario St</street>`

There is a better way to inspect the XML document. As stated previously, there are many tools that have been written to assist in the development of XML documents. One of these early tools is called XML Notepad, and it has a similar look and feel to Notepad, provided in the Microsoft operating systems.

**XML Notepad**
Microsoft does not provide XML Notepad at this time. You can still find XML Notepad by do- ing a simple Internet search for "XML Notepad." You can download Microsoft's XML Validator at http://www.microsoft.com/downloads/details.aspx?FamilyID=d23c1d2c-1571-4d61- bda8-adf9f6849df9&displaylang=en.

XML Notepad can help us understand the structure of an XML document. After you in- stall XML Notepad, you can open the beta.xml file. Figure 11.5 shows what happens when you open the beta.xml file with XML Notepad. When the document opens, ex- pand all of the plus signs to look at all the elements.

XML Notepad lists each level of the document, starting with the supplier tag. Note that as we have said before, only the end elements contain any information.

The obvious advantage to developing the DTD is that it can be used for more than one document —in this case, for more than one supplier. Let's say we have a company that makes skates called Gamma Company, which wants to supply Alpha Company. What Gamma Company needs to do is create an XML document that conforms to the supplier DTD. Opening up this document with XML Notepad presents the picture seen in Figure 11.6.

Note that beta.xml and gamma.xml conform to the supplier DTD.The question is, what happens when the XML document does not conform to the DTD? It is at this point where we see the power of the DTD. Let's purposely create an error in the gamma.xml file by taking out all the information pertaining to the name.
`<name>`
`<companyname>The Gamma Company</companyname>`
`</name>`

Basically, we are creating an invalid document—invalid per the supplier DTD. The in- valid document is found in Figure 11.7. Be aware that Notepad will not indicate that the document is invalid because Notepad does not check for validity. You need to use an XML validator to check for validity.

We now have an invalid document based on the supplier DTD. How do we verify that it is invalid? We can open the invalid gamma.xml document with XML Notepad. Notice the result, as indicated in Figure 11.8. Here XML Notepad provides a dialog box indicat- ing that an invalid document was detected.

Because the supplier DTD was expecting a document to conform to its definition, an error was generated. In fact, the error message is quite specific as to what the problem is. The DTD was expecting the name information. Thus, to create a proper XML document for this system, all the appropriate information must be supplied and supplied in the proper format.The <address> tag must be provided for the document to be valid.

One of the primary points to recognize here is that this error checking would not have happened in HTML. In fact, you can open up the XML file with a browser, as seen in Figure 11.9.

Now let's see what happens when we open up the invalid gamma.xml document with a browser. Figure 11.10 shows the gamma.xml file when it's opened in Internet Explorer.

Note that even though the document is invalid, the browser opens it and even displays it. This is because the browser is not checking to make sure the document conforms to the DTD, whereas XML Notepad does perform this check. In theory, this is one of the major advantages that XML provides when working with data. Although HTML is used to display the data, XML is used to format the data. This is a very important distinction.

You might ask, what benefit does a tool like XML Notepad provide in the overall sup- plier example, and what is it used for? To answer the first part of the question, XML Notepad, or some editor like it, allows us to verify that the document is valid early on in the process. To answer the second part of the question, XML Notepad or a similar editor can be used to actually construct the document.

## Using Cascading Style Sheets

From a technical perspective, the concept of portable data often focuses on the movement of data between two points. However, getting the data from point A to point B provides no real value unless the data is presented in an appropriate way. Thus, we must consider how the data transported in an XML system is presented to a user.

Remember that although XML is primarily used to define data, HTML is basically a presentation mechanism. However, XML and HTML can be used in tandem to present data via a browser.

Although XML is not generally used for presentation purposes, there are ways to for- mat XML. One of these is to use cascading style sheets (CSS). CSS are used heavily in the HTML world to format content. To a certain degree, CSS can be used to format XML. Recall that the supplier XML document contains definitions for <companyname>, <street>, <city>, <state>, and <zip>. Suppose that we want to format each of these definitions, as seen in Table 11.3, to provide a specification that formats the elements of the XML document.

We can represent this in a CSS with the following style sheet.
`companyname{font-family:Arial, sans-serif;`
`font-size:24;`
`color:blue;`
`display:block;}`
`street {font-family:"Times New Roman", serif;`
`font-size:12;`
`color:red;`
`display:block;}`
`city {font-family:"Courier New", serif;`
`font-size:18;`
`color:black;`
`display:block;}`
`state {font-family:"Tahoma"; serif;`
`font-size:16;`
`color:gray;`
`display:block;}`
`zip {font-family:"Arial Black", sans-serif;`
`font-size:6;`
`color:green;`
`display:block;}`

This style sheet is implemented by adding a line of code in our XML document:
`<?xml-stylesheet href="supplier.css" type="text/css" ?>`

For example, in the case of the ZIP Code, the simple text displayed earlier is now for- matted with a font of Arial Black, the color green, and a font size of 6. The attribute display:block in this case will bring each attribute to a new line.

This code is inserted in the following manner:
`<?xml version="1.0" standalone="no"?>`
`<?xml-stylesheet href="supplier.css" type="text/css" ?>`
`<!DOCTYPE supplier SYSTEM "supplier.dtd">`
`<!- The XML data ->`
`<supplier>`
`<name>`
`<companyname>The Beta Company</companyname>`
`</name>`
`<address>`
`<street>12000 Ontario St</street>`
`<city>Cleveland</city>`
`<state>OH</state>`
`<zip>24388</zip>`
`</address>`
`</supplier>`

With the CSS in the XML document, we can now open the document with a browser. Figure 11.11 illustrates how this looks.

Take a look at Figure 11.10 again to see how this document was presented without the CSS.

## Conclusion

In this chapter, we discussed many aspects of XML and why it is a very important tech- nology within the IT community. It is rare when many major players in the IT market buy into the same standard, but this has happened in the case of XML.

From the object-oriented perspective, you should come away from this chapter with the understanding that object-oriented development goes far beyond OO languages and encompasses the data as well. Because data is the fundamental part of information sys- tems, it is important to design object-oriented systems that focus on the data. In today's business environment, moving data from one point to another is of paramount impor- tance.

There are many levels of investigation you can visit when it comes to XML.This book is about concepts, and by the end of this chapter, you should have a good general idea of what XML is used for, as well as some of the tools that are used. Another level that was mentioned briefly in this chapter was that of the style-sheets. By using cascading style sheets and other technologies, you can better format your XML documents.
