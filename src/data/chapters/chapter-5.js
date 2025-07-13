import SystemWeb from '../../components/interactive/SystemWeb';

export default {
id: 'chapter-5',
navTitle: '5. Class Design Guidelines',
title: 'Chapter 5: Class Design Guidelines',
learningObjectives: [
  'Apply responsibility-driven design to create focused classes',
  'Understand and measure cohesion and coupling',
  'Design minimal but complete public interfaces',
  'Recognize and avoid common design pitfalls'
],
content: `
<p>Writing code that works is just the beginning. The true art of software development lies in creating classes that are elegant, maintainable, and extensible. This chapter presents the principles that distinguish good design from bad.</p>

<h2>1. The Single Responsibility Principle</h2>
<p>A class should have one, and only one, reason to change. This principle is the foundation of good object-oriented design.</p>
<ul>
<li><strong>Focused Purpose:</strong> Each class should represent a single concept</li>
<li><strong>Clear Identity:</strong> You should be able to describe a class's purpose in one sentence</li>
<li><strong>Manageable Size:</strong> Classes with single responsibilities tend to be smaller and easier to understand</li>
</ul>

<h2>2. Cohesion: How Well a Class Holds Together</h2>
<p><strong>Cohesion</strong> measures how closely the methods and attributes of a class work together. High cohesion is desirable.</p>
<ul>
<li><strong>Functional Cohesion:</strong> All elements work together to achieve a single task</li>
<li><strong>Informational Cohesion:</strong> All elements operate on the same data structure</li>
<li><strong>Warning Signs of Low Cohesion:</strong> Methods that don't use class attributes, unrelated functionality bundled together</li>
</ul>

<h2>3. Coupling: Managing Dependencies</h2>
<p><strong>Coupling</strong> measures how much one class depends on another. Low coupling is the goal.</p>
<ul>
<li><strong>Interface Coupling:</strong> Classes interact only through well-defined interfaces</li>
<li><strong>Data Coupling:</strong> Classes share data through parameters, not global variables</li>
<li><strong>Control Coupling:</strong> Avoid one class controlling the flow of another</li>
</ul>

<h2>4. Designing the Public Interface</h2>
<p>The public interface is the contract between a class and its users. Design it carefully:</p>
<ul>
<li><strong>Minimal but Complete:</strong> Include everything users need, nothing they don't</li>
<li><strong>Consistent Naming:</strong> Use clear, predictable method names</li>
<li><strong>Stable Contract:</strong> Changes to the interface break client code</li>
<li><strong>Hide Implementation:</strong> The interface should reveal intent, not mechanism</li>
</ul>

<h2>5. Common Design Smells</h2>
<p>Learn to recognize these warning signs:</p>
<ul>
<li><strong>God Class:</strong> A class that does too much</li>
<li><strong>Feature Envy:</strong> A class that uses another class's data more than its own</li>
<li><strong>Inappropriate Intimacy:</strong> Classes that know too much about each other's internals</li>
<li><strong>Message Chains:</strong> Long sequences of method calls between objects</li>
</ul>
`,
interactive: {
title: 'The System Web',
description: 'A diagram of interconnected classes. Highly coupled classes have thick, rigid "cables" connecting them, making them hard to move independently. Loosely coupled classes have thin, elastic "threads".',
component: SystemWeb
},
quiz: {
title: 'Chapter 5 Quiz',
questions: [
{ type: 'mcq', question: 'Which principle states that a class should have only one reason to change?', options: ['Open/Closed Principle', 'Single Responsibility Principle', 'Liskov Substitution Principle', 'Interface Segregation Principle'], answerIndex: 1 },
{ type: 'mcq', question: 'High cohesion in a class means:', options: ['The class depends on many other classes', 'The class has many public methods', 'The methods and attributes work closely together', 'The class inherits from multiple parents'], answerIndex: 2 },
{ type: 'mcq', question: 'Which type of coupling is most desirable?', options: ['Control coupling', 'Common coupling', 'Content coupling', 'Interface coupling'], answerIndex: 3 },
{ type: 'fill-in', question: 'A class that does too much and violates the Single Responsibility Principle is often called a ________ class.', answer: 'God' },
{ type: 'fill-in', question: 'When a class uses another class\'s data more than its own, this design smell is called ________ envy.', answer: 'feature' },
{ type: 'coding-challenge', question: 'Review this class design and identify at least two design flaws based on the principles in this chapter:\n\nclass UserManager {\n    private users = [];\n    private emailService;\n    \n    addUser(name, email) { }\n    deleteUser(id) { }\n    sendEmail(userId, message) { }\n    validateEmail(email) { }\n    generateReport() { }\n    backupDatabase() { }\n}', modelAnswer: 'Design flaws:\n1. Violates Single Responsibility Principle - the class handles user management, email operations, reporting, and database backup\n2. Low cohesion - methods like sendEmail, generateReport, and backupDatabase are not closely related to core user management\n3. Should be refactored into separate classes: UserManager (add/delete users), EmailService (send/validate emails), ReportGenerator, and DatabaseManager' }
]
}
};
