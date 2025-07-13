import RelationshipTest from '../../components/interactive/RelationshipTest';

export default {
id: 'chapter-7',
navTitle: '7. Inheritance & Composition',
title: 'Chapter 7: Mastering Inheritance and Composition',
learningObjectives: [
  'Clearly distinguish between is-a and has-a relationships',
  'Understand when to use inheritance vs. composition',
  'Apply the "favor composition over inheritance" principle',
  'Recognize and avoid common inheritance pitfalls'
],
content: `
<p>Choosing between inheritance and composition is one of the most important decisions in object-oriented design. This chapter provides clear guidelines for making the right choice and explores the implications of each approach.</p>

<h2>1. The is-a Test</h2>
<p>Inheritance represents an is-a relationship. Before using inheritance, apply this simple test:</p>
<ul>
<li>A Dog <strong>is an</strong> Animal ✓ (use inheritance)</li>
<li>A Car <strong>is an</strong> Engine ✗ (don't use inheritance)</li>
</ul>
<p>If the statement doesn't make logical sense, inheritance is the wrong choice.</p>

<h2>2. The has-a Relationship</h2>
<p>Composition represents a has-a relationship:</p>
<ul>
<li>A Car <strong>has an</strong> Engine ✓ (use composition)</li>
<li>A House <strong>has a</strong> Room ✓ (use composition)</li>
</ul>

<h2>3. Why Favor Composition?</h2>
<p>The principle "favor composition over inheritance" exists for good reasons:</p>
<ul>
<li><strong>Flexibility:</strong> Relationships can change at runtime</li>
<li><strong>Testability:</strong> Easier to mock and test components</li>
<li><strong>Loose Coupling:</strong> Changes to one class don't ripple through a hierarchy</li>
<li><strong>Multiple Behaviors:</strong> An object can have many components</li>
</ul>

<h2>4. When Inheritance Makes Sense</h2>
<p>Despite the warnings, inheritance is appropriate when:</p>
<ul>
<li>There's a genuine is-a relationship</li>
<li>You want to leverage polymorphism</li>
<li>The relationship is stable and unlikely to change</li>
<li>You're creating a family of related types</li>
</ul>

<h2>5. Common Inheritance Mistakes</h2>
<ul>
<li><strong>Implementation Inheritance:</strong> Inheriting just to reuse code</li>
<li><strong>Deep Hierarchies:</strong> More than 3-4 levels becomes unmaintainable</li>
<li><strong>Violating LSP:</strong> Subclasses that can't substitute for their parent</li>
<li><strong>The Circle-Ellipse Problem:</strong> When real-world relationships don't map well to code</li>
</ul>

<h2>6. Composition Patterns</h2>
<p>Common ways to use composition effectively:</p>
<ul>
<li><strong>Strategy Pattern:</strong> Swap algorithms at runtime</li>
<li><strong>Decorator Pattern:</strong> Add responsibilities dynamically</li>
<li><strong>Delegation:</strong> Forward method calls to composed objects</li>
</ul>
`,
interactive: {
title: 'The Relationship Litmus Test',
description: 'A guided quiz. You are presented with a scenario (e.g., "A Car and an Engine"). The tool asks questions like "Can you say a Car *is an* Engine?" to guide you to the correct relationship.',
component: RelationshipTest
},
quiz: {
title: 'Chapter 7 Quiz',
questions: [
{ type: 'mcq', question: 'Which relationship is best modeled with inheritance?', options: ['A Car has an Engine', 'A Student is a Person', 'A House has Rooms', 'A Computer has a Monitor'], answerIndex: 1 },
{ type: 'mcq', question: 'What is the main advantage of composition over inheritance?', options: ['It runs faster', 'Relationships can be changed at runtime', 'It uses less memory', 'It requires less code'], answerIndex: 1 },
{ type: 'mcq', question: 'The Liskov Substitution Principle (LSP) states that:', options: ['Classes should be open for extension', 'Subclasses must be substitutable for their base classes', 'Interfaces should be small', 'Classes should have single responsibilities'], answerIndex: 1 },
{ type: 'fill-in', question: 'The principle "favor ________ over inheritance" promotes more flexible designs.', answer: 'composition' },
{ type: 'fill-in', question: 'A relationship where one object contains another is called a ________-a relationship.', answer: 'has' },
{ type: 'coding-challenge', question: 'Refactor this inheritance-based design to use composition instead:\\n\\nclass Employee {\\n    name: string;\\n    salary: number;\\n}\\n\\nclass Manager extends Employee {\\n    teamSize: number;\\n    giveRaise() { }\\n}\\n\\nclass Developer extends Employee {\\n    programmingLanguages: string[];\\n    writeCode() { }\\n}', modelAnswer: 'class Employee {\\n    name: string;\\n    salary: number;\\n}\\n\\nclass ManagerRole {\\n    teamSize: number;\\n    giveRaise(employee: Employee) { }\\n}\\n\\nclass DeveloperRole {\\n    programmingLanguages: string[];\\n    writeCode() { }\\n}\\n\\nclass Person {\\n    employee: Employee;\\n    roles: Array<ManagerRole | DeveloperRole>;\\n    \\n    constructor(name: string, salary: number) {\\n        this.employee = new Employee(name, salary);\\n        this.roles = [];\\n    }\\n    \\n    addRole(role: ManagerRole | DeveloperRole) {\\n        this.roles.push(role);\\n    }\\n}' }
]
}
};
