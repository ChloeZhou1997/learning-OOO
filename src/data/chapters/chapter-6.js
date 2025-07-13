import DigitalCRCSession from '../../components/interactive/DigitalCRCSession';

export default {
id: 'chapter-6',
navTitle: '6. Designing with Objects',
title: 'Chapter 6: Designing with Objects',
learningObjectives: [
  'Gather and analyze system requirements effectively',
  'Use CRC cards to discover classes and their relationships',
  'Create prototypes to validate your design',
  'Build object models that reflect real-world domains'
],
content: `
<p>Moving from individual class design to system design requires a different set of skills. This chapter teaches you how to transform requirements into a working object model through systematic analysis and design techniques.</p>

<h2>1. Requirements Gathering</h2>
<p>Before writing any code, you must understand what the system needs to do:</p>
<ul>
<li><strong>Functional Requirements:</strong> What the system must do</li>
<li><strong>Non-functional Requirements:</strong> How well it must do it (performance, security, usability)</li>
<li><strong>Constraints:</strong> Limitations on the solution (budget, technology, time)</li>
</ul>

<h2>2. CRC Cards: A Simple but Powerful Tool</h2>
<p><strong>Class-Responsibility-Collaboration (CRC)</strong> cards help you discover the objects in your system:</p>
<ul>
<li><strong>Class:</strong> The name of the object</li>
<li><strong>Responsibilities:</strong> What the object knows and does</li>
<li><strong>Collaborations:</strong> Other objects it works with</li>
</ul>
<p>Physical index cards work best—they're tangible, easy to rearrange, and encourage group participation.</p>

<h2>3. From Requirements to Objects</h2>
<p>A systematic approach to object discovery:</p>
<ol>
<li><strong>Identify the nouns:</strong> These become candidate classes</li>
<li><strong>Identify the verbs:</strong> These become methods</li>
<li><strong>Group related concepts:</strong> Look for natural associations</li>
<li><strong>Assign responsibilities:</strong> Each class should have a clear purpose</li>
</ol>

<h2>4. Prototyping</h2>
<p>Prototypes help validate your design before full implementation:</p>
<ul>
<li><strong>UI Mockups:</strong> Show how users will interact with the system</li>
<li><strong>Proof of Concept:</strong> Test technical feasibility</li>
<li><strong>Evolutionary Prototypes:</strong> Start simple and refine iteratively</li>
</ul>

<h2>5. Case Study: Designing a Blackjack Game</h2>
<p>Let's apply these techniques to design a blackjack game:</p>
<ol>
<li><strong>Requirements:</strong> Players vs dealer, standard rules, betting system</li>
<li><strong>Identified Objects:</strong> Game, Player, Dealer, Deck, Card, Hand</li>
<li><strong>Key Collaborations:</strong> Game manages Players and Dealer, Dealer manages Deck, Players have Hands</li>
</ol>
`,
interactive: {
title: 'Digital CRC Session',
description: 'An interactive tool where you are given a requirement and must fill out digital CRC cards by typing in responsibilities and indicating collaborations.',
component: DigitalCRCSession
},
quiz: {
title: 'Chapter 6 Quiz',
questions: [
{ type: 'mcq', question: 'What does CRC stand for in the context of object-oriented design?', options: ['Code-Review-Checklist', 'Class-Responsibility-Collaboration', 'Create-Read-Compile', 'Component-Relationship-Contract'], answerIndex: 1 },
{ type: 'mcq', question: 'When analyzing requirements, nouns typically become:', options: ['Methods', 'Classes', 'Interfaces', 'Packages'], answerIndex: 1 },
{ type: 'mcq', question: 'Which type of requirements describes what the system must do?', options: ['Non-functional requirements', 'Functional requirements', 'Performance requirements', 'Security requirements'], answerIndex: 1 },
{ type: 'mcq', question: 'What is the primary benefit of using physical CRC cards?', options: ['They compile faster', 'They are tangible and encourage collaboration', 'They generate code automatically', 'They are required by UML'], answerIndex: 1 },
{ type: 'mcq', question: 'In a library system, "Book" would most likely be identified as a:', options: ['Method', 'Attribute', 'Class', 'Interface'], answerIndex: 2 },
{ type: 'fill-in', question: 'Requirements that specify how well a system must perform (like speed or security) are called ________ requirements.', answer: 'non-functional' },
{ type: 'fill-in', question: 'The process of creating a simplified version of a system to test ideas is called ________.', answer: 'prototyping' },
{ type: 'fill-in', question: 'In requirements analysis, verbs typically become ________ in the object model.', answer: 'methods' },
{ type: 'coding-challenge', question: 'Design a simple Library Management System using CRC cards. Identify at least 3 classes with their responsibilities and collaborations.', modelAnswer: 'CRC Card Design:\\n\\n1. Book\\n   - Responsibilities: Store title, author, ISBN, availability status\\n   - Collaborations: Library, Member\\n\\n2. Member\\n   - Responsibilities: Store member info, borrow books, return books\\n   - Collaborations: Book, Library\\n\\n3. Library\\n   - Responsibilities: Manage book inventory, register members, track loans\\n   - Collaborations: Book, Member, Loan\\n\\n4. Loan\\n   - Responsibilities: Track borrowed book, borrower, due date\\n   - Collaborations: Book, Member' }
]
}
};
