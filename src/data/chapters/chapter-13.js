import NetworkCall from '../../components/interactive/NetworkCall';

export default {
id: 'chapter-13',
navTitle: '13. Client/Server Apps',
title: 'Chapter 13: Developing Client/Server Applications',
learningObjectives: [
  'Design effective client/server architectures',
  'Implement proper separation of concerns',
  'Use Data Transfer Objects (DTOs) effectively',
  'Handle distributed object challenges'
],
content: `
<p>Client/server architecture is the foundation of modern distributed applications. This chapter explores how object-oriented principles apply when objects are split between client and server tiers, communicating across network boundaries.</p>

<h2>1. Client/Server Architecture Patterns</h2>

<h3>Two-Tier Architecture</h3>
<ul>
<li><strong>Client:</strong> UI and some business logic</li>
<li><strong>Server:</strong> Database and core business logic</li>
</ul>

<h3>Three-Tier Architecture</h3>
<ul>
<li><strong>Presentation Tier:</strong> User interface</li>
<li><strong>Business Tier:</strong> Business logic and rules</li>
<li><strong>Data Tier:</strong> Database and data access</li>
</ul>

<h3>N-Tier Architecture</h3>
<ul>
<li>Multiple specialized layers</li>
<li>Microservices approach</li>
<li>Greater flexibility but more complexity</li>
</ul>

<h2>2. Separation of Concerns</h2>
<p>Each tier has distinct responsibilities:</p>

<h3>Client-Side Objects</h3>
<ul>
<li>User interface components</li>
<li>Input validation</li>
<li>Local state management</li>
<li>Server communication</li>
</ul>

<h3>Server-Side Objects</h3>
<ul>
<li>Business logic enforcement</li>
<li>Data persistence</li>
<li>Security and authorization</li>
<li>Transaction management</li>
</ul>

<h2>3. Data Transfer Objects (DTOs)</h2>
<p>DTOs are simple objects that carry data between tiers:</p>
<pre><code>// Domain object (server-side)
public class User {
private Long id;
private String username;
private String passwordHash;
private Set<Role> roles;
// Business methods...
}

// DTO for client communication
public class UserDTO {
private Long id;
private String username;
private List<String> roleNames;
// Only getters/setters, no business logic
}</code></pre>

<h2>4. Remote Procedure Calls (RPC)</h2>
<p>Making objects work across networks:</p>
<ul>
<li><strong>Stub:</strong> Client-side proxy</li>
<li><strong>Skeleton:</strong> Server-side receiver</li>
<li><strong>Marshaling:</strong> Serializing parameters</li>
<li><strong>Protocol:</strong> Communication rules</li>
</ul>

<h2>5. Design Principles for Distributed Objects</h2>
<ul>
<li><strong>Coarse-Grained Interfaces:</strong> Reduce network calls</li>
<li><strong>Stateless Services:</strong> Improve scalability</li>
<li><strong>Idempotent Operations:</strong> Handle retries safely</li>
<li><strong>Async Communication:</strong> Don't block on network calls</li>
</ul>

<h2>6. Common Pitfalls</h2>
<ul>
<li><strong>Chatty Interfaces:</strong> Too many small requests</li>
<li><strong>Tight Coupling:</strong> Client knows too much about server</li>
<li><strong>Ignoring Latency:</strong> Network is not free</li>
<li><strong>Inadequate Error Handling:</strong> Networks fail</li>
</ul>
`,
interactive: {
title: 'The Network Call',
description: 'An animated diagram showing a browser (client) with a form object. When the user clicks "Submit", the form object is serialized to JSON and sent across a network graphic to a server icon. The server icon processes it and sends back a response object, which updates the browser view.',
component: NetworkCall
},
quiz: {
title: 'Chapter 13 Quiz',
questions: [
{ type: 'mcq', question: 'What is the primary purpose of a DTO?', options: ['Execute business logic', 'Transfer data between tiers', 'Store data in database', 'Validate user input'], answerIndex: 1 },
{ type: 'mcq', question: 'In three-tier architecture, where does business logic primarily belong?', options: ['Presentation tier', 'Business tier', 'Data tier', 'All tiers equally'], answerIndex: 1 },
{ type: 'mcq', question: 'What does "coarse-grained interface" mean?', options: ['Many small methods', 'Few methods that do more work', 'Interfaces with many parameters', 'Interfaces that change frequently'], answerIndex: 1 },
{ type: 'mcq', question: 'Why should server-side services typically be stateless?', options: ['To use less memory', 'To improve scalability', 'To reduce code complexity', 'To enhance security'], answerIndex: 1 },
{ type: 'fill-in', question: 'The client-side proxy object in RPC is called a ________.', answer: 'stub' },
{ type: 'fill-in', question: 'Converting objects to a format suitable for network transmission is called ________.', answer: 'marshaling' },
{ type: 'fill-in', question: 'An operation that can be safely repeated without changing the result is called ________.', answer: 'idempotent' },
{ type: 'coding-challenge', question: 'Create a ProductDTO class and a mapper to convert between a Product domain object and its DTO. The domain object has sensitive cost information that should not be sent to clients.', modelAnswer: '// Domain object\npublic class Product {\n    private Long id;\n    private String name;\n    private String description;\n    private BigDecimal costPrice; // Sensitive\n    private BigDecimal sellPrice;\n    private Integer stockLevel;\n    private Supplier supplier; // Complex object\n    \n    // Getters, setters, business methods...\n}\n\n// DTO for client communication\npublic class ProductDTO {\n    private Long id;\n    private String name;\n    private String description;\n    private BigDecimal price; // Only selling price\n    private Boolean inStock; // Simplified stock info\n    private String supplierName; // Flattened relationship\n    \n    // Only getters and setters\n    public Long getId() { return id; }\n    public void setId(Long id) { this.id = id; }\n    // ... other getters/setters\n}\n\n// Mapper class\npublic class ProductMapper {\n    public static ProductDTO toDTO(Product product) {\n        ProductDTO dto = new ProductDTO();\n        dto.setId(product.getId());\n        dto.setName(product.getName());\n        dto.setDescription(product.getDescription());\n        dto.setPrice(product.getSellPrice());\n        dto.setInStock(product.getStockLevel() > 0);\n        if (product.getSupplier() != null) {\n            dto.setSupplierName(product.getSupplier().getName());\n        }\n        return dto;\n    }\n    \n    public static Product fromDTO(ProductDTO dto) {\n        Product product = new Product();\n        product.setId(dto.getId());\n        product.setName(dto.getName());\n        product.setDescription(dto.getDescription());\n        product.setSellPrice(dto.getPrice());\n        // Note: Cannot set costPrice, stockLevel, or supplier from DTO\n        return product;\n    }\n    \n    public static List<ProductDTO> toDTOList(List<Product> products) {\n        return products.stream()\n            .map(ProductMapper::toDTO)\n            .collect(Collectors.toList());\n    }\n}' }
]
}
};
