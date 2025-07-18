import { CheckSquare, Target, FileText } from 'lucide-react'

export const cheatsheetData = {
  principles: {
    title: "Design Principles",
    icon: Target,
    items: [
      {
        category: "Four Pillars of OO (Core Foundation)",
        chapter: "Chapter 1",
        items: [
          "Encapsulation: Bundle data and methods; hide internal state",
          "Inheritance: 'Is-a' relationships; code reuse through hierarchies",
          "Polymorphism: Different objects respond to same message differently",
          "Composition: 'Has-a' relationships; build complex from simple objects"
        ]
      },
      {
        category: "Object-Oriented Thinking Principles",
        chapter: "Chapter 2",
        items: [
          "View programs as systems of interacting objects, not linear scripts",
          "Focus on nouns (entities) first, then verbs (actions)",
          "Apply abstraction to identify essential characteristics",
          "Separate interface from implementation",
          "Design from user's perspective, not implementation viewpoint"
        ]
      },
      {
        category: "Advanced Design Guidelines",
        chapter: "Chapter 3",
        items: [
          "Always provide at least one constructor",
          "Constructors initialize objects to valid, consistent states",
          "Use inheritance when genuine 'is-a' relationship exists",
          "Use composition when 'has-a' relationship exists",
          "Favor composition over inheritance for flexibility"
        ]
      },
      {
        category: "Class Design Principles",
        chapter: "Chapter 5",
        items: [
          "Single Responsibility Principle: One class, one reason to change",
          "High Cohesion: Methods and attributes work closely together",
          "Low Coupling: Minimize dependencies between classes",
          "Interface Design: Minimal but complete public interfaces"
        ]
      },
      {
        category: "Relationship Decision Framework",
        chapter: "Chapter 7",
        items: [
          "The 'is-a' Test: If logical, use inheritance",
          "The 'has-a' Test: If logical, use composition",
          "Why favor composition: Flexibility, testability, loose coupling",
          "Avoid deep hierarchies (more than 3-4 levels)"
        ]
      },
      {
        category: "Interface & Framework Principles",
        chapter: "Chapter 8",
        items: [
          "Interfaces: Pure contracts with no implementation",
          "Abstract Classes: Shared infrastructure with partial implementation",
          "Open/Closed Principle: Open for extension, closed for modification",
          "Design minimal contracts users need to implement"
        ]
      },
      {
        category: "Distributed Design Principles",
        chapter: "Chapter 13",
        items: [
          "Coarse-Grained Interfaces: Reduce network calls",
          "Stateless Services: Improve scalability",
          "Idempotent Operations: Handle retries safely",
          "Async Communication: Don't block on network calls"
        ]
      }
    ]
  },
  checklists: {
    title: "Checklists",
    icon: CheckSquare,
    items: [
      {
        category: "Class Component Checklist",
        chapter: "Chapter 4",
        items: [
          "✓ Name: Descriptive and purposeful",
          "✓ Documentation: Comprehensive comments explaining purpose and usage",
          "✓ Attributes: Properly encapsulated with appropriate access modifiers",
          "✓ Methods: Well-defined public interface with private implementation",
          "✓ Constructor: Proper initialization patterns",
          "✓ Access Control: Use minimal necessary access levels"
        ]
      },
      {
        category: "Design Smell Checklist (Avoid These)",
        chapter: "Chapter 5",
        items: [
          "❌ God Class: Class doing too much",
          "❌ Feature Envy: Class using another's data more than its own",
          "❌ Inappropriate Intimacy: Classes knowing too much about each other's internals",
          "❌ Message Chains: Long sequences of method calls"
        ]
      },
      {
        category: "Requirements Analysis Checklist",
        chapter: "Chapter 6",
        items: [
          "✓ Functional requirements: What system must do",
          "✓ Non-functional requirements: How well it must do it",
          "✓ Constraints: Limitations on solution",
          "✓ Identify nouns (candidate classes)",
          "✓ Identify verbs (methods)",
          "✓ Group related concepts",
          "✓ Assign clear responsibilities"
        ]
      },
      {
        category: "UML Diagram Guidelines",
        chapter: "Chapter 10",
        items: [
          "✓ Class Structure: Name, attributes, methods in three compartments",
          "✓ Visibility Notation: + public, - private, # protected, ~ package",
          "✓ Start simple, add detail as needed",
          "✓ Focus on key classes and relationships",
          "✓ Use consistent notation",
          "✓ Keep diagrams at appropriate abstraction levels"
        ]
      },
      {
        category: "Persistence Strategy Decision Matrix",
        chapter: "Chapter 12",
        items: [
          "✓ Data Volume: How much data?",
          "✓ Query Needs: Simple retrieval or complex queries?",
          "✓ Performance: Read vs. write frequency",
          "✓ Consistency: ACID requirements?",
          "✓ Scalability: Single machine or distributed?"
        ]
      },
      {
        category: "Mastery Checklist",
        chapter: "Chapter 15",
        items: [
          "✓ Conceptual Fluency: Articulate OO principles clearly",
          "✓ Paradigm Shift: Think in objects, not procedures",
          "✓ Design Acumen: Identify classes, responsibilities, collaborations",
          "✓ Maintainability Focus: Manage coupling, create clear interfaces"
        ]
      }
    ]
  },
  methodologies: {
    title: "Methodologies",
    icon: FileText,
    items: [
      {
        category: "CRC Card Process",
        chapter: "Chapter 6",
        items: [
          "Class: Name of the object",
          "Responsibilities: What object knows and does",
          "Collaborations: Other objects it works with",
          "Use index cards for tangible manipulation",
          "Start with high-level classes, refine iteratively"
        ]
      },
      {
        category: "Object Discovery Steps",
        chapter: "Chapter 6",
        items: [
          "1. Identify nouns (candidate classes)",
          "2. Identify verbs (methods)",
          "3. Group related concepts",
          "4. Assign clear responsibilities",
          "5. Define object interactions",
          "6. Validate through scenarios"
        ]
      },
      {
        category: "Cardinality Analysis Framework",
        chapter: "Chapter 9",
        items: [
          "1: Exactly one",
          "0..1: Zero or one (optional)",
          "0..n: Zero or more (optional, multiple)",
          "1..n: One or more (mandatory, multiple)",
          "Aggregation: Whole-part where you see only the whole",
          "Association: Both whole and parts are visible"
        ]
      },
      {
        category: "Serialization Strategy Framework",
        chapter: "Chapter 11",
        items: [
          "XML: Rich structure, self-documenting, schema validation",
          "JSON: Lightweight, faster parsing, wide adoption",
          "Handle: Circular references, transient data, versioning",
          "Keep serialized formats simple",
          "Version your data formats",
          "Validate incoming data"
        ]
      },
      {
        category: "Architecture Pattern Selection",
        chapter: "Chapter 13",
        items: [
          "Two-Tier: Client (UI + some logic) + Server (DB + core logic)",
          "Three-Tier: Presentation + Business + Data tiers",
          "N-Tier: Multiple specialized layers",
          "DTO Pattern: Simple objects for data transfer between tiers",
          "No business logic in DTOs"
        ]
      },
      {
        category: "Essential Design Patterns",
        chapter: "Chapter 14",
        items: [
          "Creational: Singleton (PyTorch process groups), Factory (TensorFlow ops)",
          "Structural: Adapter (PyTorch DataLoader), Decorator (Keras layers)",
          "Behavioral: Observer (TensorBoard), Strategy (LangChain retrieval)",
          "Pattern Elements: Name, Problem, Solution, Consequences",
          "Focus on production framework examples"
        ]
      }
    ]
  }
}