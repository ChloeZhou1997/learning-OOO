import XMLDataTransformer from '../../components/interactive/XMLDataTransformer';

export default {
id: 'chapter-11',
navTitle: '11. Objects & Portable Data',
title: 'Chapter 11: Objects and Portable Data: XML',
learningObjectives: [
  'Understand serialization and its purposes',
  'Work with XML for object representation',
  'Use JSON as a lightweight alternative',
  'Handle complex object graphs and relationships'
],
content: `
<p>Objects live in memory, but data needs to travel and persist. This chapter explores how to serialize objects into portable formats like XML and JSON, enabling data exchange between systems and persistent storage.</p>

<h2>1. Why Serialize Objects?</h2>
<ul>
<li><strong>Persistence:</strong> Save object state to disk</li>
<li><strong>Communication:</strong> Send objects over networks</li>
<li><strong>Interoperability:</strong> Share data between different systems</li>
<li><strong>Configuration:</strong> Store settings in human-readable format</li>
</ul>

<h2>2. XML: The Verbose but Powerful Option</h2>
<p>XML provides rich structure and metadata:</p>
<pre><code>&lt;book&gt;
&lt;title&gt;Design Patterns&lt;/title&gt;
&lt;author&gt;Gang of Four&lt;/author&gt;
&lt;isbn&gt;0-201-63361-2&lt;/isbn&gt;
&lt;chapters&gt;
&lt;chapter number="1"&gt;Introduction&lt;/chapter&gt;
&lt;chapter number="2"&gt;Case Study&lt;/chapter&gt;
&lt;/chapters&gt;
&lt;/book&gt;</code></pre>

<h3>XML Advantages:</h3>
<ul>
<li>Self-documenting with tags</li>
<li>Supports attributes and namespaces</li>
<li>Schema validation</li>
<li>Wide tool support</li>
</ul>

<h2>3. JSON: The Lightweight Alternative</h2>
<p>JSON is simpler and more compact:</p>
<pre><code>{
"title": "Design Patterns",
"author": "Gang of Four",
"isbn": "0-201-63361-2",
"chapters": [
{"number": 1, "title": "Introduction"},
{"number": 2, "title": "Case Study"}
]
}</code></pre>

<h3>JSON Advantages:</h3>
<ul>
<li>Lightweight and readable</li>
<li>Native JavaScript support</li>
<li>Faster parsing</li>
<li>Widely adopted in REST APIs</li>
</ul>

<h2>4. Handling Complex Objects</h2>
<p>Challenges when serializing complex object graphs:</p>
<ul>
<li><strong>Circular References:</strong> Objects that reference each other</li>
<li><strong>Transient Data:</strong> Fields that shouldn't be serialized</li>
<li><strong>Type Information:</strong> Preserving the exact class type</li>
<li><strong>Versioning:</strong> Handling changes to class structure</li>
</ul>

<h2>5. Best Practices</h2>
<ul>
<li>Keep serialized formats simple</li>
<li>Version your data formats</li>
<li>Validate incoming data</li>
<li>Handle missing or extra fields gracefully</li>
<li>Consider security implications</li>
</ul>
`,
interactive: {
title: 'The Data Transformer',
description: 'A two-panel view. On the left is a simple object instance. Clicking "Serialize to XML" populates the right panel with the corresponding XML document, with lines highlighting the mapping from object properties to XML elements.',
component: XMLDataTransformer
},
quiz: {
title: 'Chapter 11 Quiz',
questions: [
{ type: 'mcq', question: 'Which format is generally more compact and faster to parse?', options: ['XML', 'JSON', 'HTML', 'CSV'], answerIndex: 1 },
{ type: 'mcq', question: 'What is a key advantage of XML over JSON?', options: ['Smaller file size', 'Faster parsing', 'Schema validation support', 'Native JavaScript support'], answerIndex: 2 },
{ type: 'mcq', question: 'What challenge occurs when objects reference each other in a cycle?', options: ['Type mismatch', 'Circular reference', 'Version conflict', 'Namespace collision'], answerIndex: 1 },
{ type: 'fill-in', question: 'The process of converting an object into a format suitable for storage or transmission is called ________.', answer: 'serialization' },
{ type: 'fill-in', question: 'Fields that should not be included in serialization are often marked as ________.', answer: 'transient' },
{ type: 'fill-in', question: 'Converting serialized data back into objects is called ________.', answer: 'deserialization' },
{ type: 'coding-challenge', question: 'Create a Book class and show how to serialize it to both XML and JSON format. Include title, author, ISBN, and price fields.', modelAnswer: 'public class Book {\n    private String title;\n    private String author;\n    private String isbn;\n    private double price;\n    \n    // Constructor and getters/setters omitted for brevity\n    \n    public String toXML() {\n        return String.format(\n            "<book>\\n" +\n            "    <title>%s</title>\\n" +\n            "    <author>%s</author>\\n" +\n            "    <isbn>%s</isbn>\\n" +\n            "    <price>%.2f</price>\\n" +\n            "</book>",\n            title, author, isbn, price\n        );\n    }\n    \n    public String toJSON() {\n        return String.format(\n            "{\\n" +\n            "    \\"title\\": \\"%s\\",\\n" +\n            "    \\"author\\": \\"%s\\",\\n" +\n            "    \\"isbn\\": \\"%s\\",\\n" +\n            "    \\"price\\": %.2f\\n" +\n            "}",\n            title, author, isbn, price\n        );\n    }\n}\n\n// Example usage:\nBook book = new Book("Clean Code", "Robert Martin", "978-0132350884", 39.99);\n\n// XML output:\n<book>\n    <title>Clean Code</title>\n    <author>Robert Martin</author>\n    <isbn>978-0132350884</isbn>\n    <price>39.99</price>\n</book>\n\n// JSON output:\n{\n    "title": "Clean Code",\n    "author": "Robert Martin",\n    "isbn": "978-0132350884",\n    "price": 39.99\n}' }
]
}
};
