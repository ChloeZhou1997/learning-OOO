import React, { useState } from 'react';
import './PatternPlayground.css';

const PatternPlayground = () => {
  const [selectedPattern, setSelectedPattern] = useState('singleton');
  const [codeOutput, setCodeOutput] = useState([]);
  const [showImplementation, setShowImplementation] = useState(false);

  const patterns = {
    singleton: {
      name: 'Singleton Pattern',
      description: 'Ensures a class has only one instance and provides global access to it.',
      useCase: 'Database connections, Configuration managers, Logging services',
      implementation: `class DatabaseConnection {
  static instance = null;
  
  constructor() {
    if (DatabaseConnection.instance) {
      return DatabaseConnection.instance;
    }
    this.connection = 'Connected to Database';
    DatabaseConnection.instance = this;
  }
  
  query(sql) {
    return \`Executing: \${sql}\`;
  }
}`,
      demo: () => {
        const output = [];
        output.push('// Creating first instance');
        const db1 = { id: 'db-001', connection: 'Connected to Database' };
        output.push(`const db1 = new DatabaseConnection();`);
        output.push(`db1.id = "${db1.id}"`);
        
        output.push('\n// Trying to create second instance');
        output.push(`const db2 = new DatabaseConnection();`);
        output.push(`db2.id = "${db1.id}" // Same instance!`);
        
        output.push('\n// Both variables point to same instance:');
        output.push(`db1 === db2: true`);
        
        return output;
      }
    },
    factory: {
      name: 'Factory Pattern',
      description: 'Creates objects without specifying their exact classes.',
      useCase: 'UI element creation, Cross-platform development, Plugin systems',
      implementation: `class AnimalFactory {
  static createAnimal(type) {
    switch(type) {
      case 'dog':
        return new Dog();
      case 'cat':
        return new Cat();
      case 'bird':
        return new Bird();
      default:
        throw new Error('Unknown animal type');
    }
  }
}

class Dog {
  speak() { return 'Woof!'; }
}

class Cat {
  speak() { return 'Meow!'; }
}

class Bird {
  speak() { return 'Tweet!'; }
}`,
      demo: () => {
        const output = [];
        output.push('// Using Factory to create objects');
        output.push(`const dog = AnimalFactory.createAnimal('dog');`);
        output.push(`dog.speak() // "Woof!"`);
        
        output.push(`\nconst cat = AnimalFactory.createAnimal('cat');`);
        output.push(`cat.speak() // "Meow!"`);
        
        output.push(`\nconst bird = AnimalFactory.createAnimal('bird');`);
        output.push(`bird.speak() // "Tweet!"`);
        
        output.push('\n// Factory handles object creation complexity');
        
        return output;
      }
    },
    observer: {
      name: 'Observer Pattern',
      description: 'Defines a one-to-many dependency between objects.',
      useCase: 'Event handling, Model-View architectures, Notifications',
      implementation: `class Subject {
  constructor() {
    this.observers = [];
  }
  
  attach(observer) {
    this.observers.push(observer);
  }
  
  notify(data) {
    this.observers.forEach(observer => {
      observer.update(data);
    });
  }
}

class Observer {
  constructor(name) {
    this.name = name;
  }
  
  update(data) {
    console.log(\`\${this.name} received: \${data}\`);
  }
}`,
      demo: () => {
        const output = [];
        output.push('// Creating subject and observers');
        output.push(`const newsAgency = new Subject();`);
        output.push(`const newspaper1 = new Observer('Daily Times');`);
        output.push(`const newspaper2 = new Observer('Tech Weekly');`);
        
        output.push('\n// Subscribing observers');
        output.push(`newsAgency.attach(newspaper1);`);
        output.push(`newsAgency.attach(newspaper2);`);
        
        output.push('\n// Broadcasting update');
        output.push(`newsAgency.notify('Breaking News!');`);
        output.push(`// Daily Times received: Breaking News!`);
        output.push(`// Tech Weekly received: Breaking News!`);
        
        return output;
      }
    },
    strategy: {
      name: 'Strategy Pattern',
      description: 'Defines a family of algorithms and makes them interchangeable.',
      useCase: 'Payment processing, Sorting algorithms, Data validation',
      implementation: `class PaymentProcessor {
  constructor(strategy) {
    this.strategy = strategy;
  }
  
  processPayment(amount) {
    return this.strategy.pay(amount);
  }
  
  setStrategy(strategy) {
    this.strategy = strategy;
  }
}

class CreditCardStrategy {
  pay(amount) {
    return \`Paid $\${amount} using Credit Card\`;
  }
}

class PayPalStrategy {
  pay(amount) {
    return \`Paid $\${amount} using PayPal\`;
  }
}

class CryptoStrategy {
  pay(amount) {
    return \`Paid $\${amount} using Cryptocurrency\`;
  }
}`,
      demo: () => {
        const output = [];
        output.push('// Using different payment strategies');
        output.push(`const processor = new PaymentProcessor(new CreditCardStrategy());`);
        output.push(`processor.processPayment(100);`);
        output.push(`// "Paid $100 using Credit Card"`);
        
        output.push('\n// Switching strategy at runtime');
        output.push(`processor.setStrategy(new PayPalStrategy());`);
        output.push(`processor.processPayment(50);`);
        output.push(`// "Paid $50 using PayPal"`);
        
        output.push('\n// Adding new strategy');
        output.push(`processor.setStrategy(new CryptoStrategy());`);
        output.push(`processor.processPayment(200);`);
        output.push(`// "Paid $200 using Cryptocurrency"`);
        
        return output;
      }
    },
    decorator: {
      name: 'Decorator Pattern',
      description: 'Adds new functionality to objects without altering their structure.',
      useCase: 'Adding features to UI components, Extending functionality, Middleware',
      implementation: `class Coffee {
  cost() {
    return 5;
  }
  
  description() {
    return 'Simple coffee';
  }
}

class CoffeeDecorator {
  constructor(coffee) {
    this.coffee = coffee;
  }
  
  cost() {
    return this.coffee.cost();
  }
  
  description() {
    return this.coffee.description();
  }
}

class MilkDecorator extends CoffeeDecorator {
  cost() {
    return this.coffee.cost() + 2;
  }
  
  description() {
    return this.coffee.description() + ', with milk';
  }
}

class SugarDecorator extends CoffeeDecorator {
  cost() {
    return this.coffee.cost() + 1;
  }
  
  description() {
    return this.coffee.description() + ', with sugar';
  }
}`,
      demo: () => {
        const output = [];
        output.push('// Starting with simple coffee');
        output.push(`let coffee = new Coffee();`);
        output.push(`coffee.description() // "Simple coffee"`);
        output.push(`coffee.cost() // $5`);
        
        output.push('\n// Adding milk');
        output.push(`coffee = new MilkDecorator(coffee);`);
        output.push(`coffee.description() // "Simple coffee, with milk"`);
        output.push(`coffee.cost() // $7`);
        
        output.push('\n// Adding sugar');
        output.push(`coffee = new SugarDecorator(coffee);`);
        output.push(`coffee.description() // "Simple coffee, with milk, with sugar"`);
        output.push(`coffee.cost() // $8`);
        
        return output;
      }
    }
  };

  const runDemo = () => {
    const pattern = patterns[selectedPattern];
    const output = pattern.demo();
    setCodeOutput(output);
  };

  return (
    <div className="pattern-playground">
      <h3 className="playground-title">Design Pattern Playground</h3>
      
      <div className="pattern-selector">
        <label>Select a Pattern:</label>
        <select 
          value={selectedPattern} 
          onChange={(e) => {
            setSelectedPattern(e.target.value);
            setCodeOutput([]);
            setShowImplementation(false);
          }}
        >
          {Object.entries(patterns).map(([key, pattern]) => (
            <option key={key} value={key}>{pattern.name}</option>
          ))}
        </select>
      </div>

      <div className="pattern-info">
        <h4>{patterns[selectedPattern].name}</h4>
        <p className="pattern-description">{patterns[selectedPattern].description}</p>
        <p className="pattern-use-case">
          <strong>Common Use Cases:</strong> {patterns[selectedPattern].useCase}
        </p>
      </div>

      <div className="pattern-actions">
        <button className="demo-button" onClick={runDemo}>
          Run Demo
        </button>
        <button 
          className="implementation-button" 
          onClick={() => setShowImplementation(!showImplementation)}
        >
          {showImplementation ? 'Hide' : 'Show'} Implementation
        </button>
      </div>

      {showImplementation && (
        <div className="implementation-code">
          <h5>Implementation:</h5>
          <pre>
            <code>{patterns[selectedPattern].implementation}</code>
          </pre>
        </div>
      )}

      {codeOutput.length > 0 && (
        <div className="demo-output">
          <h5>Demo Output:</h5>
          <div className="output-console">
            {codeOutput.map((line, index) => (
              <div key={index} className={line.startsWith('//') ? 'comment-line' : 'code-line'}>
                {line}
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="pattern-benefits">
        <h5>Key Benefits:</h5>
        <ul>
          {selectedPattern === 'singleton' && (
            <>
              <li>Controlled access to single instance</li>
              <li>Reduced memory footprint</li>
              <li>Global access point</li>
            </>
          )}
          {selectedPattern === 'factory' && (
            <>
              <li>Loose coupling between classes</li>
              <li>Code reusability</li>
              <li>Easy to extend with new types</li>
            </>
          )}
          {selectedPattern === 'observer' && (
            <>
              <li>Loose coupling between subjects and observers</li>
              <li>Dynamic subscription management</li>
              <li>Broadcast communication</li>
            </>
          )}
          {selectedPattern === 'strategy' && (
            <>
              <li>Algorithms can be changed at runtime</li>
              <li>Eliminates conditional statements</li>
              <li>Easy to add new strategies</li>
            </>
          )}
          {selectedPattern === 'decorator' && (
            <>
              <li>Add functionality without modifying original class</li>
              <li>Flexible alternative to subclassing</li>
              <li>Can combine multiple decorators</li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
};

export default PatternPlayground;