import ObjectAssemblyLine from '../../components/interactive/ObjectAssemblyLine';

export default {
id: 'chapter-9',
navTitle: '9. Building Objects',
title: 'Chapter 9: Building Objects',
learningObjectives: [
  'Understand the different types of object relationships',
  'Master aggregation and association patterns',
  'Apply cardinality in object design',
  'Build complex systems from simpler components'
],
content: `
<p>While inheritance creates new types of objects, composition builds complex objects from simpler ones. This chapter explores how objects collaborate, focusing on the nuances of aggregation and association relationships.</p>

<h2>1. Composition Relationships</h2>
<p>Composition represents a "has-a" relationship between objects. Unlike inheritance ("is-a"), composition builds systems by combining distinct objects that maintain their own identities.</p>
<p>For example:</p>
<ul>
<li>A car <strong>has an</strong> engine (composition)</li>
<li>A car <strong>is a</strong> vehicle (inheritance)</li>
</ul>

<h2>2. Types of Composition</h2>
<p>There are two main types of composition, each with different characteristics:</p>

<h3>Aggregation</h3>
<p>Aggregation represents a "whole-part" relationship where you typically see only the whole:</p>
<ul>
<li>A TV contains transistors, circuits, and a screen</li>
<li>You interact with the TV as a single unit</li>
<li>The parts are encapsulated within the whole</li>
</ul>
<pre><code>public class Car {
    private Engine engine;
    private Transmission transmission;
    private List<Wheel> wheels;
    
    public Car() {
        engine = new Engine();
        transmission = new Transmission();
        wheels = new ArrayList<>();
        for (int i = 0; i < 4; i++) {
            wheels.add(new Wheel());
        }
    }
}</code></pre>

<h3>Association</h3>
<p>Association represents relationships where both the whole and parts are visible:</p>
<ul>
<li>A computer system with separate monitor, keyboard, and CPU</li>
<li>Each component has its own interface</li>
<li>Components can be connected and disconnected</li>
</ul>
<pre><code>public class ComputerSystem {
    private Monitor monitor;
    private Keyboard keyboard;
    private Mouse mouse;
    
    public void connectMonitor(Monitor m) {
        this.monitor = m;
    }
    
    public void connectKeyboard(Keyboard k) {
        this.keyboard = k;
    }
}</code></pre>

<h2>3. Building in Phases</h2>
<p>Composition allows systems to be built, tested, and maintained independently. As Herbert Simon noted, stable complex systems:</p>
<ul>
<li>Are hierarchical (built from simpler subsystems)</li>
<li>Are nearly decomposable (clear boundaries between parts)</li>
<li>Use few different kinds of subsystems in various combinations</li>
<li>Evolve from simple systems that worked</li>
</ul>

<h2>4. Cardinality in Relationships</h2>
<p>Cardinality defines how many objects participate in a relationship:</p>
<ul>
<li><strong>One-to-One:</strong> A window has one title bar</li>
<li><strong>One-to-Many:</strong> A container has many components</li>
<li><strong>Many-to-Many:</strong> Plugins have many hooks, hooks have many plugins</li>
</ul>
<p>Cardinality also specifies whether relationships are optional or mandatory:</p>
<ul>
<li><strong>0..1:</strong> Optional, at most one (shape may have 0 or 1 border)</li>
<li><strong>1..1:</strong> Mandatory, exactly one (button must have 1 label)</li>
<li><strong>0..n:</strong> Optional, unlimited (container may have 0 to many components)</li>
<li><strong>1..n:</strong> Mandatory, at least one (composite must have at least 1 child)</li>
</ul>

<h2>5. Implementing Multiple Associations</h2>
<p>When an object can have multiple associations of the same type, use collections:</p>
<pre><code>public class Container extends Component {
    private Border border;           // 0..1 relationship
    private List<Component> children;    // 0..n relationship
    private Layout layout;       // 1..1 relationship
    private List<EventListener> listeners; // 1..n relationship
    
    public void addComponent(Component child) {
        if (children == null) {
            children = new ArrayList<>();
        }
        children.add(child);
    }
    
    public boolean hasBorder() {
        return border != null;
    }
}</code></pre>

<h2>6. Avoiding Dependencies</h2>
<p>Keep objects loosely coupled by:</p>
<ul>
<li>Avoiding mixing domains unnecessarily</li>
<li>Using interfaces to reduce coupling</li>
<li>Making objects responsible for themselves</li>
<li>Keeping interactions simple and well-defined</li>
</ul>

<h2>7. Example: Bringing It All Together</h2>
<p>Consider a system with a Dog that has an Owner:</p>
<ul>
<li>Dog <strong>inherits from</strong> Mammal (is-a)</li>
<li>Dog <strong>implements</strong> Nameable (interface)</li>
<li>Dog <strong>has a</strong> Head (aggregation - 1..1)</li>
<li>Dog <strong>has an</strong> Owner (association - 1..n)</li>
</ul>
<p>This demonstrates how inheritance, interfaces, aggregation, and association work together in a single design.</p>
`,
interactive: {
title: 'Composition Explorer',
description: 'An interactive diagram where you can toggle between aggregation and association views of a system, showing how the same objects relate differently.',
component: ObjectAssemblyLine
},
quiz: {
title: 'Chapter 9 Quiz',
questions: [
{ type: 'mcq', question: 'What type of relationship does composition represent?', options: ['is-a', 'has-a', 'uses-a', 'extends-a'], answerIndex: 1 },
{ type: 'mcq', question: 'In aggregation, you typically:', options: ['See all the individual parts', 'See only the whole', 'Cannot access the parts', 'Must initialize parts separately'], answerIndex: 1 },
{ type: 'mcq', question: 'What does cardinality 0..n mean in a relationship?', options: ['Exactly zero or n objects', 'Between 0 and n objects', 'At least n objects', 'Exactly n objects'], answerIndex: 1 },
{ type: 'mcq', question: 'Which is an example of association rather than aggregation?', options: ['Car has an engine', 'TV has circuits', 'Computer has a monitor', 'House has rooms'], answerIndex: 2 },
{ type: 'fill-in', question: 'The type of composition where you see both the whole and the parts is called ________.', answer: 'association' },
{ type: 'fill-in', question: 'The notation 1..1 indicates a ________ relationship with exactly one object.', answer: 'mandatory' },
{ type: 'fill-in', question: 'When a Shape can have zero or one Border, the cardinality is written as ________.', answer: '0..1' },
{ type: 'coding-challenge', question: 'Design a Window class that has the following relationships:\n- Mandatory: one Layout (1..1)\n- Optional: one MenuBar (0..1)\n- Multiple: zero or more Components (0..n)\n- Multiple: one or more EventListeners (1..n)', modelAnswer: 'public class Window extends Container {\n    private Layout layout;                    // 1..1 - mandatory\n    private MenuBar menuBar;                  // 0..1 - optional\n    private List<Component> components;       // 0..n - optional, multiple\n    private List<EventListener> listeners;    // 1..n - mandatory, multiple\n    \n    public Window(Layout layout, EventListener initialListener) {\n        // Mandatory relationships must be set\n        if (layout == null || initialListener == null) {\n            throw new IllegalArgumentException("Layout and initial listener are required");\n        }\n        this.layout = layout;\n        this.listeners = new ArrayList<>();\n        this.listeners.add(initialListener);\n        this.components = new ArrayList<>();\n    }\n    \n    public void setMenuBar(MenuBar menuBar) {\n        this.menuBar = menuBar;\n    }\n    \n    public void addComponent(Component component) {\n        components.add(component);\n        layout.layoutComponent(component);\n    }\n    \n    public void addEventListener(EventListener listener) {\n        listeners.add(listener);\n    }\n    \n    public boolean hasMenuBar() {\n        return menuBar != null;\n    }\n    \n    public int getComponentCount() {\n        return components.size();\n    }\n}' }
]
}
};
