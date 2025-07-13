import PluginSocket from '../../components/interactive/PluginSocket';

export default {
id: 'chapter-8',
navTitle: '8. Interfaces & Abstract Classes',
title: 'Chapter 8: Designing with Interfaces and Abstract Classes',
learningObjectives: [
  'Understand the role of interfaces in defining contracts',
  'Know when to use interfaces vs. abstract classes',
  'Design systems that are open for extension',
  'Apply the Dependency Inversion Principle'
],
content: `
<p>Interfaces and abstract classes are the contracts of the object-oriented world. They define what classes must do without specifying how. This chapter explores how to use these powerful tools to create flexible, extensible systems.</p>

<h2>1. Interfaces: Pure Contracts</h2>
<p>An interface defines what methods a class must implement without providing any implementation:</p>
<ul>
<li><strong>No State:</strong> Interfaces can't contain instance variables</li>
<li><strong>All Abstract:</strong> Every method is implicitly abstract</li>
<li><strong>Multiple Implementation:</strong> A class can implement many interfaces</li>
<li><strong>Public Contract:</strong> All members are public</li>
</ul>

<h2>2. Abstract Classes: Partial Implementations</h2>
<p>Abstract classes can provide both abstract methods and concrete implementations:</p>
<ul>
<li><strong>Shared State:</strong> Can contain instance variables</li>
<li><strong>Mixed Methods:</strong> Both abstract and concrete methods</li>
<li><strong>Single Inheritance:</strong> A class can extend only one abstract class</li>
<li><strong>Protected Members:</strong> Can have various access levels</li>
</ul>

<h2>3. Interface vs. Abstract Class</h2>
<p>Choose based on your needs:</p>
<ul>
<li><strong>Use Interfaces When:</strong>
<ul>
<li>Defining a contract for unrelated classes</li>
<li>You need multiple inheritance of type</li>
<li>You want maximum flexibility</li>
</ul>
</li>
<li><strong>Use Abstract Classes When:</strong>
<ul>
<li>Sharing code among related classes</li>
<li>You need to maintain state</li>
<li>You want to provide default implementations</li>
</ul>
</li>
</ul>

<h2>4. Designing for Extension</h2>
<p>The Open/Closed Principle: Classes should be open for extension but closed for modification:</p>
<pre><code>interface PaymentProcessor {
void processPayment(double amount);
}

class CreditCardProcessor implements PaymentProcessor {
void processPayment(double amount) { /* ... */ }
}

class PayPalProcessor implements PaymentProcessor {
void processPayment(double amount) { /* ... */ }
}

// Easy to add new payment methods without changing existing code</code></pre>

<h2>5. The Power of Programming to Interfaces</h2>
<p>Always declare variables and parameters as interface types when possible:</p>
<pre><code>// Good: Programming to an interface
List<String> names = new ArrayList<>();

// Less flexible: Programming to a concrete class
ArrayList<String> names = new ArrayList<>();</code></pre>
`,
interactive: {
title: 'The Plugin Socket',
description: 'A visual of a system with a "data source" socket expecting an `IDataProvider` interface. You can drag and drop different modules (`DatabaseProvider`, `ApiProvider`), all of which fit the socket, to see the system work.',
component: PluginSocket
},
quiz: {
title: 'Chapter 8 Quiz',
questions: [
{ type: 'mcq', question: 'What is the key difference between an interface and an abstract class in most OO languages?', options: ['Interfaces are faster', 'A class can implement multiple interfaces but extend only one abstract class', 'Abstract classes cannot have methods', 'Interfaces can have instance variables'], answerIndex: 1 },
{ type: 'mcq', question: 'When should you use an interface instead of an abstract class?', options: ['When you need to share code', 'When you need to maintain state', 'When defining a contract for unrelated classes', 'When you need private methods'], answerIndex: 2 },
{ type: 'mcq', question: 'The Open/Closed Principle states that classes should be:', options: ['Open for modification, closed for extension', 'Open for extension, closed for modification', 'Open for both extension and modification', 'Closed for both extension and modification'], answerIndex: 1 },
{ type: 'mcq', question: 'Which statement about interfaces is typically true?', options: ['They can contain instance variables', 'All methods are implicitly public and abstract', 'A class can only implement one interface', 'They can have private methods'], answerIndex: 1 },
{ type: 'fill-in', question: 'The practice of declaring variables as interface types rather than concrete classes is called programming to ________.', answer: 'interfaces' },
{ type: 'fill-in', question: 'A class that has at least one abstract method must be declared as ________.', answer: 'abstract' },
{ type: 'fill-in', question: 'The ability for a class to implement multiple interfaces provides a form of multiple ________.', answer: 'inheritance' },
{ type: 'coding-challenge', question: 'Design a simple plugin system for a text editor. Create an interface for plugins and two example implementations (SpellChecker and WordCounter).', modelAnswer: 'interface TextEditorPlugin {\n    String getName();\n    void execute(String text);\n    boolean isEnabled();\n}\n\nclass SpellChecker implements TextEditorPlugin {\n    private boolean enabled = true;\n    \n    public String getName() {\n        return "Spell Checker";\n    }\n    \n    public void execute(String text) {\n        // Check spelling and highlight errors\n        System.out.println("Checking spelling...");\n    }\n    \n    public boolean isEnabled() {\n        return enabled;\n    }\n}\n\nclass WordCounter implements TextEditorPlugin {\n    private boolean enabled = true;\n    \n    public String getName() {\n        return "Word Counter";\n    }\n    \n    public void execute(String text) {\n        int wordCount = text.split("\\s+").length;\n        System.out.println("Word count: " + wordCount);\n    }\n    \n    public boolean isEnabled() {\n        return enabled;\n    }\n}\n\nclass TextEditor {\n    private List<TextEditorPlugin> plugins = new ArrayList<>();\n    \n    public void addPlugin(TextEditorPlugin plugin) {\n        plugins.add(plugin);\n    }\n    \n    public void runPlugins(String text) {\n        for (TextEditorPlugin plugin : plugins) {\n            if (plugin.isEnabled()) {\n                plugin.execute(text);\n            }\n        }\n    }\n}' }
]
}
};
