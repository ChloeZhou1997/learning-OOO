import UMLBlueprintDrafter from '../../components/interactive/UMLBlueprintDrafter';

export default {
id: 'chapter-10',
navTitle: '10. UML Object Models',
title: 'Chapter 10: Creating Object Models with UML',
learningObjectives: [
  'Create and interpret UML class diagrams',
  'Show relationships: association, aggregation, composition, inheritance',
  'Use proper UML notation for visibility and multiplicity',
  'Document your designs before coding'
],
content: `
<p>The Unified Modeling Language (UML) is the standard visual language for documenting object-oriented designs. This chapter teaches you to read and create the most important UML diagrams for OO development.</p>

<h2>1. UML Class Diagram Basics</h2>
<p>A class is represented as a box with three compartments:</p>
<ul>
<li><strong>Top:</strong> Class name (in bold)</li>
<li><strong>Middle:</strong> Attributes (fields)</li>
<li><strong>Bottom:</strong> Methods (operations)</li>
</ul>

<h2>2. Visibility Notation</h2>
<ul>
<li><strong>+ Public:</strong> Accessible from anywhere</li>
<li><strong>- Private:</strong> Accessible only within the class</li>
<li><strong># Protected:</strong> Accessible by subclasses</li>
<li><strong>~ Package:</strong> Accessible within the package</li>
</ul>

<h2>3. Relationships</h2>

<h3>Association</h3>
<p>A general relationship between classes. Shown as a line:</p>
<pre>Student ————— Course</pre>

<h3>Aggregation (Weak "has-a")</h3>
<p>A whole-part relationship where parts can exist independently. Shown with an empty diamond:</p>
<pre>Department ◇————— Professor</pre>

<h3>Composition (Strong "has-a")</h3>
<p>A whole-part relationship where parts cannot exist without the whole. Shown with a filled diamond:</p>
<pre>House ◆————— Room</pre>

<h3>Inheritance</h3>
<p>Shows is-a relationships. Shown with an empty triangle arrow:</p>
<pre>Dog ——▷ Animal</pre>

<h3>Implementation</h3>
<p>Shows interface implementation. Shown with a dashed line and empty triangle:</p>
<pre>ArrayList - - -▷ List</pre>

<h2>4. Multiplicity</h2>
<p>Shows how many instances can be associated:</p>
<ul>
<li><strong>1:</strong> Exactly one</li>
<li><strong>0..1:</strong> Zero or one</li>
<li><strong>*:</strong> Zero or more</li>
<li><strong>1..*:</strong> One or more</li>
<li><strong>2..5:</strong> Between 2 and 5</li>
</ul>

<h2>5. Best Practices</h2>
<ul>
<li>Start simple, add detail as needed</li>
<li>Focus on key classes and relationships</li>
<li>Use consistent notation</li>
<li>Keep diagrams at appropriate abstraction levels</li>
</ul>
`,
interactive: {
title: 'UML Blueprint Drafter',
description: 'A simplified drag-and-drop tool. You are given a list of entities and relationships (e.g., "A Customer can have multiple Orders") and must drag class boxes onto a canvas and connect them with the correct UML notation for association.',
component: UMLBlueprintDrafter
},
quiz: {
title: 'Chapter 10 Quiz',
questions: [
{ type: 'mcq', question: 'In UML class diagrams, what does a "-" symbol before an attribute indicate?', options: ['Public visibility', 'Private visibility', 'Protected visibility', 'Static member'], answerIndex: 1 },
{ type: 'mcq', question: 'Which UML relationship uses a filled diamond?', options: ['Association', 'Aggregation', 'Composition', 'Inheritance'], answerIndex: 2 },
{ type: 'mcq', question: 'In UML, inheritance is shown with:', options: ['A filled diamond', 'An empty diamond', 'An empty triangle arrow', 'A dashed line'], answerIndex: 2 },
{ type: 'mcq', question: 'What does the multiplicity "0..*" mean?', options: ['Exactly zero', 'One or more', 'Zero or more', 'Zero or one'], answerIndex: 2 },
{ type: 'mcq', question: 'Which relationship represents a "whole-part" relationship where parts can exist independently?', options: ['Inheritance', 'Composition', 'Aggregation', 'Implementation'], answerIndex: 2 },
{ type: 'fill-in', question: 'In UML notation, the symbol + indicates ________ visibility.', answer: 'public' },
{ type: 'fill-in', question: 'A dashed line with an empty triangle in UML indicates interface ________.', answer: 'implementation' },
{ type: 'coding-challenge', question: 'Convert this UML class diagram description to Java code:\n\nClass: BankAccount\n- accountNumber: String\n- balance: double\n- owner: Customer\n+ deposit(amount: double): void\n+ withdraw(amount: double): boolean\n+ getBalance(): double\n\nThe Customer class has a 1 to many relationship with BankAccount.', modelAnswer: 'public class BankAccount {\n    private String accountNumber;\n    private double balance;\n    private Customer owner;\n    \n    public BankAccount(String accountNumber, Customer owner) {\n        this.accountNumber = accountNumber;\n        this.owner = owner;\n        this.balance = 0.0;\n    }\n    \n    public void deposit(double amount) {\n        if (amount > 0) {\n            balance += amount;\n        }\n    }\n    \n    public boolean withdraw(double amount) {\n        if (amount > 0 && amount <= balance) {\n            balance -= amount;\n            return true;\n        }\n        return false;\n    }\n    \n    public double getBalance() {\n        return balance;\n    }\n}\n\npublic class Customer {\n    private String name;\n    private List<BankAccount> accounts;\n    \n    public Customer(String name) {\n        this.name = name;\n        this.accounts = new ArrayList<>();\n    }\n    \n    public void addAccount(BankAccount account) {\n        accounts.add(account);\n    }\n}' }
]
}
};
