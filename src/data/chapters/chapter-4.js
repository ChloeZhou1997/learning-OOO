import CodeGatekeeper from '../../components/interactive/CodeGatekeeper';

export default {
id: 'chapter-4',
navTitle: '4. Anatomy of a Class',
title: 'Chapter 4: The Anatomy of a Class',
learningObjectives: [
  'The core components of a class: attributes, methods, and constructors',
  'How access modifiers enforce encapsulation',
  'The difference between instance and static members',
  'Best practices for designing class interfaces'
],
content: `
<p>In object-oriented programming, a class is the fundamental building block. Understanding its structure is crucial to designing robust software. This chapter dissects the essential components that make up a well-designed class.</p>

<h2>1. The Name of the Class</h2>
<p>The name of the class is important for several reasons. The obvious reason is to identify the class itself. Beyond simple identification, the name must be descriptive. The choice of a name is important because it provides information about what the class does and how it interacts within larger systems.</p>
<p>The name is also important when considering language constraints. For example, in Java, the public class name must be the same as the file name. If the names do not match, the application won't work.</p>
<pre><code>public class Cabbie {
    // class implementation
}</code></pre>

<h2>2. Comments</h2>
<p>Regardless of the syntax of the comments used, they are vital to understanding the function of a class. In Java, C# .NET, and C++, there are two kinds of comments.</p>
<p>The first comment is the old C-style comment, which uses /* (slash-asterisk) to open the comment and */ (asterisk-slash) to close the comment. This type of comment can span more than one line:</p>
<pre><code>/*
 This class defines a cabbie and assigns a cab
*/</code></pre>
<p>The second type of comment is the // (slash-slash), which renders everything after it, to the end of the line, a comment:</p>
<pre><code>// Name of the cabbie</code></pre>

<h2>3. Class Components</h2>

<h3>Attributes (Fields)</h3>
<p>Attributes represent the state of an object. They are the data that each instance of the class will hold. For example, a <code>BankAccount</code> class might have:</p>
<ul>
<li><code>accountNumber</code> - unique identifier</li>
<li><code>balance</code> - current amount</li>
<li><code>owner</code> - account holder's name</li>
</ul>

<h3>Methods</h3>
<p>Methods define the behavior of a class. They are the actions that objects can perform. Methods typically:</p>
<ul>
<li><strong>Query methods:</strong> Return information about the object's state (getters)</li>
<li><strong>Modifier methods:</strong> Change the object's state (setters)</li>
<li><strong>Action methods:</strong> Perform operations using the object's data</li>
</ul>

<h3>Constructors</h3>
<p>A constructor is a special method that initializes a new instance of the class. It ensures the object starts in a valid state.</p>

<h2>4. Accessors</h2>
<p>In most examples, attributes are defined as private so that other objects cannot access them directly. However, objects need to interact and share appropriate information. This is done through accessor methods, sometimes called getters and setters.</p>
<p>A class should be very protective of its attributes. There are several reasons for this; the most important reasons really boil down to data integrity and efficient debugging.</p>
<pre><code>// Set the Name of the Cabbie
public void setName(String iName) {
    name = iName;
}

// Get the Name of the Cabbie
public String getName() {
    return name;
}</code></pre>
<p>The important point here is that other objects can't simply retrieve the information on their own; they must ask the object for the information. This concept is important at many levels. For example, you might have a setAge() method that checks to see whether the age entered was valid. If the age is less than 0, the setAge() method can refuse to set this incorrect value.</p>
<blockquote><strong>Data Integrity:</strong> This is also an issue of security. You may have sensitive data, like passwords or payroll information that you want to control access to. Thus, accessing data via getters and setters provides the ability to use mechanisms like password checks and other validation techniques.</blockquote>

<h2>5. Access Modifiers: The Guards of Encapsulation</h2>
<p>Access modifiers control visibility and are fundamental to encapsulation:</p>
<ul>
<li><strong><code>private</code>:</strong> Accessible only within the class itself</li>
<li><strong><code>protected</code>:</strong> Accessible within the class and its subclasses</li>
<li><strong><code>public</code>:</strong> Accessible from anywhere</li>
<li><strong>Package-private (default):</strong> Accessible within the same package</li>
</ul>

<h2>3. Instance vs. Static Members</h2>
<p>Understanding the distinction between instance and static members is crucial:</p>
<ul>
<li><strong>Instance members:</strong> Belong to each object. Every instance has its own copy.</li>
<li><strong>Static members:</strong> Belong to the class itself. Shared among all instances.</li>
</ul>

<pre><code class="language-java">public class Student {
// Static member - shared by all students
private static int totalStudents = 0;

// Instance members - unique to each student
private String name;
private int studentId;

public Student(String name) {
this.name = name;
this.studentId = ++totalStudents;
}

// Instance method
public String getName() {
return this.name;
}

// Static method
public static int getTotalStudents() {
return totalStudents;
}
}</code></pre>

<h2>6. Public Interface Methods</h2>
<p>Both the constructors and the accessor methods are declared as public and are part of the public interface. However, much of the real work is provided in other methods. The public interface methods tend to be very abstract, and the implementation tends to be more concrete.</p>
<p>For example, a Cabbie class might provide a method called giveDestination that is the public interface for the user to describe where they want to go:</p>
<pre><code>public void giveDestination() {
    // Implementation details hidden
}</code></pre>
<p>What is inside of this method is not important to the user. The main point here is that this is a public method, and it is part of the public interface to the class.</p>

<h2>7. Private Implementation Methods</h2>
<p>Not all methods in a class are part of the public interface. Some methods may be hidden from other classes. These methods are declared as private:</p>
<pre><code>private void turnRight() {
    // Implementation details
}

private void turnLeft() {
    // Implementation details
}</code></pre>
<p>These private methods are simply meant to be part of the implementation and not the public interface. These methods are called internally from the class itself. For example, they could be called from within the public method giveDestination:</p>
<pre><code>public void giveDestination() {
    // some code
    turnRight();
    turnLeft();
    // some more code
}</code></pre>
<p>The point here is that private methods are strictly part of the implementation and are not accessible by other classes.</p>

<h2>8. Best Practices</h2>
<ul>
<li><strong>Keep attributes private:</strong> Always use private attributes with public getter/setter methods when needed</li>
<li><strong>Minimize the public interface:</strong> Only expose what's necessary</li>
<li><strong>Use meaningful names:</strong> Method and attribute names should clearly indicate their purpose</li>
<li><strong>Initialize properly:</strong> Ensure all attributes are initialized, either in declarations or constructors</li>
</ul>
`,
interactive: {
title: 'The Code Gatekeeper',
description: 'A mini-simulator where you try to access private members of a class and see immediate access errors, reinforcing the concept of access modifiers.',
component: CodeGatekeeper
},
quiz: {
title: 'Chapter 4 Quiz',
questions: [
{ type: 'mcq', question: 'Which access modifier provides the most restrictive access, allowing visibility only within the declaring class?', options: ['public', 'protected', 'private', 'package-private'], answerIndex: 2 },
{ type: 'mcq', question: 'If you need to count the total number of objects created from a class, which type of member should you use?', options: ['Instance variable', 'Static variable', 'Local variable', 'Protected variable'], answerIndex: 1 },
{ type: 'mcq', question: 'Which of the following is NOT typically a component of a class?', options: ['Attributes', 'Methods', 'Constructors', 'Compilation instructions'], answerIndex: 3 },
{ type: 'fill-in', question: 'Methods that return information about an object\'s state without modifying it are commonly called ________ methods.', answer: 'getter' },
{ type: 'fill-in', question: 'The special method that is automatically called when creating a new instance of a class is called a ________.', answer: 'constructor' },
{ type: 'coding-challenge', question: 'Create a Book class with private attributes for title, author, and ISBN. Include a constructor, appropriate getter methods, and a static variable to track the total number of books created.', modelAnswer: 'public class Book {\\n    private static int totalBooks = 0;\\n    \\n    private String title;\\n    private String author;\\n    private String isbn;\\n    \\n    public Book(String title, String author, String isbn) {\\n        this.title = title;\\n        this.author = author;\\n        this.isbn = isbn;\\n        totalBooks++;\\n    }\\n    \\n    public String getTitle() {\\n        return title;\\n    }\\n    \\n    public String getAuthor() {\\n        return author;\\n    }\\n    \\n    public String getIsbn() {\\n        return isbn;\\n    }\\n    \\n    public static int getTotalBooks() {\\n        return totalBooks;\\n    }\\n}' }
]
}
};
