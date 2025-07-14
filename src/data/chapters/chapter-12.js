import DataTransformer from '../../components/interactive/DataTransformer';

export default {
id: 'chapter-12',
navTitle: '12. Persistence',
title: 'Chapter 12: Persistent Objects',
learningObjectives: [
  'Understand different persistence strategies',
  'Master object serialization techniques',
  'Work with relational databases and ORMs',
  'Handle the Object-Relational Impedance Mismatch'
],
content: `
<p>Objects exist in memory only while your program runs. Persistence allows object state to survive beyond program execution. This chapter explores various strategies for making objects persistent, from simple file storage to sophisticated database systems.</p>

<h2>1. Persistence Strategies</h2>

<h3>File-Based Serialization</h3>
<ul>
<li><strong>Binary Serialization:</strong> Fast but not human-readable</li>
<li><strong>Text Serialization:</strong> JSON/XML, readable but larger</li>
<li><strong>Custom Formats:</strong> Application-specific solutions</li>
</ul>

<h3>Database Persistence</h3>
<ul>
<li><strong>Relational Databases:</strong> Tables, rows, SQL</li>
<li><strong>NoSQL Databases:</strong> Document, key-value, graph</li>
<li><strong>Object Databases:</strong> Store objects directly</li>
</ul>

<h2>2. The Object-Relational Impedance Mismatch</h2>
<p>Objects and relational databases think differently:</p>
<table>
<tr>
<th>Objects</th>
<th>Relational Databases</th>
</tr>
<tr>
<td>Encapsulation</td>
<td>Open data in tables</td>
</tr>
<tr>
<td>Inheritance hierarchies</td>
<td>Flat table structure</td>
</tr>
<tr>
<td>Complex relationships</td>
<td>Foreign keys</td>
</tr>
<tr>
<td>Methods and behavior</td>
<td>Data only</td>
</tr>
</table>

<h2>3. Object-Relational Mapping (ORM)</h2>
<p>ORMs bridge the gap between objects and databases:</p>
<pre><code>// Object definition
@Entity
public class GameObject {
@Id
private Long id;
private String name;
@OneToMany
private List<Component> components;
}

// ORM handles the SQL
GameObject gameObject = repository.findById(123);
gameObject.getComponents(); // Lazy loading</code></pre>

<h2>4. Serialization Considerations</h2>
<ul>
<li><strong>Version Compatibility:</strong> Handle class changes</li>
<li><strong>Security:</strong> Don't serialize sensitive data</li>
<li><strong>Performance:</strong> Large object graphs can be slow</li>
<li><strong>Circular References:</strong> Avoid infinite loops</li>
</ul>

<h2>5. Choosing a Persistence Strategy</h2>
<p>Consider these factors:</p>
<ul>
<li><strong>Data Volume:</strong> How much data?</li>
<li><strong>Query Needs:</strong> Simple retrieval or complex queries?</li>
<li><strong>Performance:</strong> Read vs. write frequency</li>
<li><strong>Consistency:</strong> ACID requirements?</li>
<li><strong>Scalability:</strong> Single machine or distributed?</li>
</ul>
`,
interactive: {
title: 'The Data Transformer',
description: 'A two-panel interactive view. On the left is a simple instantiated object (e.g., a `User` object with `id` and `name`). On the right is a blank panel. The user clicks a "Serialize to JSON" button, and the right panel populates with the corresponding JSON, with lines highlighting the mapping from object property to JSON key-value pair.',
component: DataTransformer
},
quiz: {
title: 'Chapter 12 Quiz',
questions: [
{ type: 'mcq', question: 'What is the main challenge when storing objects in relational databases?', options: ['Databases are too slow', 'The Object-Relational Impedance Mismatch', 'Objects are too large', 'SQL is too complex'], answerIndex: 1 },
{ type: 'mcq', question: 'What does ORM stand for?', options: ['Object-Relational Mapping', 'Object Resource Management', 'Optimized Relational Model', 'Object Reference Monitor'], answerIndex: 0 },
{ type: 'mcq', question: 'Which is NOT a typical concern when serializing objects?', options: ['Version compatibility', 'Circular references', 'Compilation speed', 'Security'], answerIndex: 2 },
{ type: 'mcq', question: 'How do relational databases typically represent inheritance?', options: ['Native inheritance support', 'Single table with type field', 'They cannot represent inheritance', 'Automatic class generation'], answerIndex: 1 },
{ type: 'fill-in', question: 'The mismatch between object-oriented and relational models is called the Object-Relational ________ Mismatch.', answer: 'Impedance' },
{ type: 'fill-in', question: 'A database that stores objects directly without requiring mapping to tables is called an ________ database.', answer: 'object' },
{ type: 'fill-in', question: 'When an ORM loads related objects only when they are accessed, this is called ________ loading.', answer: 'lazy' },
{ type: 'coding-challenge', question: 'Design a simple persistence strategy for a Task class that needs to save tasks to a file. Show both save and load methods.', modelAnswer: 'import java.io.*;\nimport java.util.*;\nimport com.google.gson.Gson;\n\npublic class Task implements Serializable {\n    private String id;\n    private String title;\n    private boolean completed;\n    private Date dueDate;\n    \n    // Constructor and getters/setters omitted\n    \n    // Strategy 1: Binary Serialization\n    public void saveBinary(String filename) throws IOException {\n        try (ObjectOutputStream out = new ObjectOutputStream(\n                new FileOutputStream(filename))) {\n            out.writeObject(this);\n        }\n    }\n    \n    public static Task loadBinary(String filename) \n            throws IOException, ClassNotFoundException {\n        try (ObjectInputStream in = new ObjectInputStream(\n                new FileInputStream(filename))) {\n            return (Task) in.readObject();\n        }\n    }\n    \n    // Strategy 2: JSON Serialization\n    public void saveJSON(String filename) throws IOException {\n        Gson gson = new Gson();\n        try (FileWriter writer = new FileWriter(filename)) {\n            gson.toJson(this, writer);\n        }\n    }\n    \n    public static Task loadJSON(String filename) throws IOException {\n        Gson gson = new Gson();\n        try (FileReader reader = new FileReader(filename)) {\n            return gson.fromJson(reader, Task.class);\n        }\n    }\n    \n    // Strategy 3: Simple CSV for multiple tasks\n    public static void saveTaskList(List<Task> tasks, String filename) \n            throws IOException {\n        try (PrintWriter writer = new PrintWriter(filename)) {\n            writer.println("id,title,completed,dueDate");\n            for (Task task : tasks) {\n                writer.printf("%s,%s,%b,%s\\n",\n                    task.id, task.title, task.completed, task.dueDate);\n            }\n        }\n    }\n}' }
]
}
};
