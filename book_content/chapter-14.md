# Chapter 14: Objects and Client/Server Applications

Chapter 13, "Objects and the Internet,” covered the concept of distributed objects. In that chapter, the Internet was the primary highway that the objects navigated. In this chap- ter we narrow the scope a bit and explore the topic of sending objects across a client/server network.

Although objects in a distributed network do not necessarily follow a specific path, an object on a client/server journey is more of a point-to-point journey—at least in a con- ceptual sense.

Because many of the concepts described in Chapter 13 apply to this chapter as well, this chapter focuses primarily on the higher-level concepts of the client/server model.

## Client/Server Approaches

As we have seen in several of the previous chapters, XML has had a major impact on the development technologies used today. For example, a distributed object model can either be build on proprietary system or use a non-proprietary approach based on technologies like SOAP/XML.

The same can be said of a client/server model. An application can be built solely on a proprietary system or on a design using an XML. In this chapter, both models are cov- ered. We use Java to describe a proprietary approach that will only execute in a Java envi- ronment, even though Java can be used in a non-proprietary solution as well.

Then, C# .NET will be used to illustrate the XML based approach with the VB .NET code presented at the end of the chapter.

## Proprietary Approach

In this example, Java is used to illustrate how a direct point-to-point connection is made over a network. To accomplish this, I use an example that I have been using for many years, sending an object from a client to a server, possibly changing the object by the server and then sending it back to the client.

This basic flow is illustrated in Figure 14.1.

In this design, the client creates an object and then sends it to the server.The server cre- ates a reference to the object to access it.The server then may update the object's attrib- utes and then send it back to the client.

### Serialized Object Code

We start by creating a simple TextMessage class that contains attributes called name and message. The class also contains a constructor as well as getters and setters.The complete TextMessage class is presented in the following code.
```
import java.io.*;
import java.util.*;
public class TextMessage implements Serializable {
public String name;
public String message;
// TextMessage 's Constructor.
TextMessage(String n) {
message = " ";
name= n;
}
// Objects 'getter' function.
public String getName() {
return name;
}
// Objects 'getter' function.
public String getTextMessage() {
return message;
}
// Objects 'setter' function.
public void setTextMessage(String inTextMessage) {
message = inTextMessage;
}
}
```
This is a pretty simple class. The constructor initializes the name attribute via a parame- ter and sets the message to blanks. The primary item to notice is that the class is serialized in a proprietary Java binary format.

### Client Code

The client code uses the TextMessage class to create an object and start it on a journey to the server and back. The client must perform the following tasks:
- Get the user information
- Create an object
- Set the attributes
- Create a socket connection
- Create the output streams
- Write the object
- Close the streams

The code for this client is presented in the following listing. The comments provide most of the code commentary.
```
import java.io.*;
import java.net.*;
/*
* The Client for TextMessage
*/
public class Client {
public static void main(String[] arg) {
try {
String message = " ";
String name = " ";
System.out.print("Please enter name: ");
name = getString();
// Create a TextMessage object
TextMessage myTextMessage = new TextMessage(name);
System.out.print("message: ");
message = getString();
// Use the 'setter' to set the TextMessage
myTextMessage.setTextMessage(message);
// Create a socket connection
Socket socketToServer = new Socket("127.0.0.1″, 11111);
// Create the ObjectOutputStream
ObjectOutputStream myOutputStream =
new
ObjectOutputStream(socketToServer.getOutputStream());
// Write the myTextMessage object to the OutputStream
myOutputStream.writeObject(myTextMessage);
// Close the streams
myOutputStream.close();
} catch (Exception e) { System.out.println(e);}
}
public static String getString() throws Exception {
// open keyboard for input (call it 'stdin')
BufferedReader stdin =
new BufferedReader(new InputStreamReader(System.in), 1);
String s1 = stdin.readLine();
return (s1);
}
}
```
The most important points to make about this client code revolve around the network connections. In this example, the following line of code defines where the client will connect to the server:
`Socket socketToServer = new Socket("127.0.0.1″, 11111);`

When the socket is created, the two parameters passed represent the IP address and the virtual socket the client attempts to connect to.

The IP address 127.0.0.1 is a loop-back, meaning that the client will attempt to con- nect to a server that is local. In short, the client and server are running on the same ma- chine. The only obvious condition is that server must be launched first.

Using this loop-back IP address is very useful when testing applications. Instead of re- quiring a connection to a network, the underlying logic of an application can be tested locally which makes the initial testing much simpler. Later, more general testing can be performed with a real IP address.

Besides the IP address, the virtual port must be specified in the parameter list. In this case an arbitrary value of 11111 is chosen. The only condition with this value is that the server that the client attempts to connect to must be listening at this port.

Once the client does establish valid communication with the server, and the object is sent and retrieved, the client application simply terminates—placing a loop in the code to make the client perform again.

The only other issue of note in this code is the method at the end of the class that performs the task of retrieving a line from the keyboard. This is the user input, akin to typing in a text message on your cell phone.

### Server Code

On the other side of the wire, the server code performs the following tasks:
- Create an object reference
- Listen to the virtual port 11111
- Wait for a client to connect
- Create the Input/Output streams
- Read the TextMessage object
- Print the message

The code for the server is listed here:
```
import java.io.*;
import java.net.*;
/*
* The Server for TextMessage.
/*
public class Server {
public static void main(String[] arg) {
// create a reference for an object to come from the client.
TextMessage myTextMessage = null;
try {
// Start the Server listening to port 11111
ServerSocket myServerSocket = new ServerSocket(11111);
System.out.println("Ready\n");
// Wait here until a Client attempts to connect
Socket incoming = myServerSocket.accept();
// Create an ObjectInputStream
ObjectInputStream myInputStream
=
new ObjectInputStream(incoming.getInputStream());
// Read the object from the socket that has the client
myTextMessage = (TextMessage) myInputStream.readObject();
//
System.out.println(myTextMessage.getName() + ": "
+ myTextMessage.getTextMessage()+ “\n”);
// Close the streams
myInputStream.close();
} catch(Exception e) {
System.out.println(e);
}
}
}
```
Just as with the client, there is no loop in the code. It is fairly simple to use a loop so that the server can handle multiple clients—but this functionality is not central to the topic here.

It is also possible for the server to update the project and send it back to the client. For example, the client could also create an input stream and read the object back from the server—just as the server can create an output stream and send the object back to the client.

### Running the Proprietary Client/Server Example

To simplify matters the client/server example is run using basic DOS shells so we don't have to use a GUI or run it from an Integrated Development Environment (IDE). In the next section, we will create modules that will run from within a GUI and an IDE.

The first step in the process is to launch the server. Then, from a second DOS shell, the client is launched. The server simply prints out a message indicating that it is ready—and it waits. The client requests a name and a message that the user must type in.

Once this is accomplished, the server displays the message that the client has sent. Figure 14.2 shows the server session, and Figure 14.3 shows the client session. Again, both the server and the client can contain loops that will allow more than one pass. This exam- ple was kept as simple as possible to illustrate the technology.

The client requests that name of the user as well as the message that the user wants to send. In a real-world text messaging system, like a cell phone, the server would use the address entered by the user (basically the telephone number) to forward the message to a second user, not simply print it out.

## Nonproprietary Approach

The previous example was handled in a proprietary manner. To create a nonproprietary approach we can utilize XML technology just like we did with data persistence and dis- tributed object.

Using the XML approach allows us to send the objects back-and-forth between appli- cations written in various languages and, theoretically, between various platforms. The model can be updated to reflect this, as shown in Figure 14.4.

Although many of the underlying concepts are the same, the fundamental way that the object is decomposed and reconstituted shifts from a proprietary, binary format to a non- proprietary text-based XML format.

To provide some variety, we use an example based on a checkingAccount class.

### Object Definition Code

We can immediately see, by inspecting the code that the XML definition of the object is embedded directly in the class itself (please see Chapter 11,“Objects and Portable Data: XML,” for a description of this approach). The C# .NET code for the CheckingAccount class is listed in the following.The corresponding Visual Basic .NET code is listed at the end of this chapter.
```
using System;
using System.Collections;
using System.IO;
using System.Xml;
using System.Xml.Serialization;
namespace Server
{
[XmlRoot("account")]
public class CheckingAccount
{
private String strName;
private int intAccountNumber;
/// <summary>
/// Accessor methods for strName
/// </summary>
[XmlElement("name")]
public String Name
{
get { return strName; }
set { strName = value; }
}
/// <summary>
/// Accessor Methods for intAccountNumber
/// </summary>
[XmlElement("account_num")]
public int AccountNumber
{
get { return intAccountNumber; }
set { intAccountNumber = value; }
}
/// <summary>
/// Default constructor
/// </summary>
public CheckingAccount()
{
this.Name = "John Doe";
this.AccountNumber = 54321;
Console.WriteLine("Creating Checking Account!");
}
}
}
```
Again, the really interesting issue with this class definition is that, while the class con- tains the requisite attributes and methods, the attributes also contain properties that corre- spond to the XML definitions of the attributes.

In short, in both these C# .NET andVB .NET examples, the class is created around the XML definitions. This approach can be accomplished with Java as well. In fact, by us- ing the XML approach, we can basically use whatever language or platform we want in- terchangeably. That is the beauty of the non-proprietary approach.

Also note that for these C# .NET andVB .NET examples, we create a namespace for our projects.

### Client Code

For this example, the client performs the following tasks:
- Create the checkingAccount object
- Create the socket
- Serialize the object to XML
- Create the stream
- Serialize the object to the stream
- Close the resources
- Close the streams

In most case, the comments can provide the explanation of the program flow.The C# .NET client code is presented here:
```
using System;
using System.Collections;
using System.IO;
using System.Xml;
using System.Xml.Serialization;
using System.Net.Sockets;
using System.Net;
using System.Text;
namespace Client
{
class Client
{
public static void Connect()
{
CheckingAccount myAccount = new CheckingAccount();
try
{
//Create our TCP Socket
TcpClient client = new TcpClient(“127.0.0.1″, 11111);
//Prepare to serialize our CheckingAccount object to XML
XmlSerializer myXmlFactory =
new XmlSerializer(typeof (CheckingAccount));
//Create our TCP Stream
NetworkStream stream = client.GetStream();
// Serialize our object to the TCP Stream
myXmlFactory.Serialize(stream, myAccount);
// Close all of our resources
stream.Close();
client.Close();
}
catch (Exception ex)
{
Console.WriteLine("Exception: {0}", ex);
}
Console.WriteLine("Press any key to continue...");
Console.ReadKey();
}
}
}
```

### Server Code

In this case, we do use a loop (in fact a couple of loops) to implement this version of the server. Again, we can let the code comments provide the flow; however, the server basi- cally provides the following functions:
- Create the checkingAccount object references
- Connect to the socket and listen
- Setup the input stream
- Create the stream
- Read the bytes off the stream
- Serialize the object to the stream
- Close everything down

The C# .NET code for the server is listed here:
```
using System;
using System.Collections.Generic;
using System.Text;
using System.Net.Sockets;
using System.Net;
using System.Xml;
using System.Xml.Serialization;
using System.IO;
using System.Runtime.Serialization;
namespace Server
{
class Server
{
public Server()
{
TcpListener server = null;
TcpClient client = null;
try
{
//Create our Socket Listener and start it
server = new TcpListener(IPAddress.Parse("127.0.0.1″), 11111);
server.Start();
//Setup our input buffer
Byte[] bytes = new Byte[256];
//Loop indefinitely
while (true)
{
//Begin accepting incoming transmissions in block mode
client = server.AcceptTcpClient();
Console.WriteLine("Connected!");
//Open our stream
NetworkStream stream = client.GetStream();
//Read all the data from the stream
int i;
while ((i = stream.Read(bytes, 0, bytes.Length)) != 0)
{
//Prepare a format that the Serializer can read
MemoryStream ms = new MemoryStream(bytes);
//Prepare the Serializer
XmlSerializer myXmlFactory =
new XmlSerializer(typeof(CheckingAccount));
//Create our CheckingAccount from the stream
CheckingAccount myRestoredAccount =
(CheckingAccount)myXmlFactory.Deserialize(ms);
//Now demonstrate that the object is indeed created
Console.WriteLine("Name: {0}, Account Number: {1}.",
myRestoredAccount.Name, myRestoredAccount.
AccountNumber);
//Throw an exception to exit the loop
throw new Exception("ignore");
}
}
}
catch (Exception ex)
{
if (!ex.Message.Equals("ignore"))
{ Console.WriteLine("Exception: {0}", ex); }
}
finally
{
//Close our resources
client.Close();
server.Stop();
}
Console.WriteLine("Press any key to continue...");
Console.ReadKey();
}
}
}
```

### Running the Nonproprietary Client/Server Example

To execute this example, you can create a project with Visual Studio and launch the C#.NET code with a simple application like this:
```
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
namespace Server
{
class Program
{
static void Main(string[] args)
{
Server server = new Server();
}
}
}
```

## Conclusion

In this chapter, we covered the concept of a client-server connection. We took two dis- tinct approaches. First, we used Java to create a proprietary, binary system to move the ob- ject along the network connection. In the second approach, we used a non-proprietary approach using .NET (both C# and VB). Java could also be used in this non-proprietary, XML-based scenario.

The importance of this chapter, as well as Chapter 11 and Chapter 13, is that XML is used to move the objects across various networks, whether a point-to-point network or a distributed network.
