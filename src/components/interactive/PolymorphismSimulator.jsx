import React, { useState } from 'react';
import './PolymorphismSimulator.css';

const PolymorphismSimulator = () => {
  const [selectedObject, setSelectedObject] = useState(null);
  const [executionLog, setExecutionLog] = useState([]);
  const [showCode, setShowCode] = useState(false);

  const animals = [
    {
      type: 'Dog',
      name: 'Buddy',
      icon: '🐕',
      baseClass: 'Animal',
      sound: 'Woof! Woof!',
      movement: 'Running on four legs',
      special: 'Wagging tail happily',
      code: `class Dog extends Animal {
  makeSound() {
    return "Woof! Woof!";
  }
  
  move() {
    return "Running on four legs";
  }
  
  special() {
    return "Wagging tail happily";
  }
}`
    },
    {
      type: 'Cat',
      name: 'Whiskers',
      icon: '🐈',
      baseClass: 'Animal',
      sound: 'Meow! Meow!',
      movement: 'Gracefully walking',
      special: 'Purring contentedly',
      code: `class Cat extends Animal {
  makeSound() {
    return "Meow! Meow!";
  }
  
  move() {
    return "Gracefully walking";
  }
  
  special() {
    return "Purring contentedly";
  }
}`
    },
    {
      type: 'Bird',
      name: 'Tweety',
      icon: '🐦',
      baseClass: 'Animal',
      sound: 'Tweet! Tweet!',
      movement: 'Flying through the air',
      special: 'Flapping wings',
      code: `class Bird extends Animal {
  makeSound() {
    return "Tweet! Tweet!";
  }
  
  move() {
    return "Flying through the air";
  }
  
  special() {
    return "Flapping wings";
  }
}`
    },
    {
      type: 'Duck',
      name: 'Donald',
      icon: '🦆',
      baseClass: 'Animal',
      sound: 'Quack! Quack!',
      movement: 'Swimming in water',
      special: 'Diving for food',
      code: `class Duck extends Animal {
  makeSound() {
    return "Quack! Quack!";
  }
  
  move() {
    return "Swimming in water";
  }
  
  special() {
    return "Diving for food";
  }
}`
    }
  ];

  const shapes = [
    {
      type: 'Circle',
      name: 'Circle',
      icon: '⭕',
      baseClass: 'Shape',
      area: 'π × radius²',
      perimeter: '2 × π × radius',
      draw: 'Drawing a perfect circle',
      code: `class Circle extends Shape {
  calculateArea() {
    return Math.PI * this.radius * this.radius;
  }
  
  calculatePerimeter() {
    return 2 * Math.PI * this.radius;
  }
  
  draw() {
    return "Drawing a perfect circle";
  }
}`
    },
    {
      type: 'Square',
      name: 'Square',
      icon: '⬜',
      baseClass: 'Shape',
      area: 'side × side',
      perimeter: '4 × side',
      draw: 'Drawing a square with equal sides',
      code: `class Square extends Shape {
  calculateArea() {
    return this.side * this.side;
  }
  
  calculatePerimeter() {
    return 4 * this.side;
  }
  
  draw() {
    return "Drawing a square with equal sides";
  }
}`
    },
    {
      type: 'Triangle',
      name: 'Triangle',
      icon: '🔺',
      baseClass: 'Shape',
      area: '(base × height) / 2',
      perimeter: 'side1 + side2 + side3',
      draw: 'Drawing a triangular shape',
      code: `class Triangle extends Shape {
  calculateArea() {
    return (this.base * this.height) / 2;
  }
  
  calculatePerimeter() {
    return this.side1 + this.side2 + this.side3;
  }
  
  draw() {
    return "Drawing a triangular shape";
  }
}`
    }
  ];

  const executePolymorphicCall = (method, collection) => {
    const log = [];
    log.push(`// Polymorphic method call: ${method}()`);
    log.push(`for (let item of ${collection === animals ? 'animals' : 'shapes'}) {`);
    log.push(`  item.${method}();`);
    log.push(`}`);
    log.push('');
    log.push('// Output:');
    
    collection.forEach(item => {
      let result = '';
      switch(method) {
        case 'makeSound':
          result = item.sound;
          break;
        case 'move':
          result = item.movement;
          break;
        case 'special':
          result = item.special;
          break;
        case 'draw':
          result = item.draw;
          break;
        case 'calculateArea':
          result = `Area formula: ${item.area}`;
          break;
        case 'calculatePerimeter':
          result = `Perimeter formula: ${item.perimeter}`;
          break;
        default:
          result = 'Unknown method';
      }
      log.push(`${item.type} → ${result}`);
    });
    
    setExecutionLog(log);
  };

  const handleObjectClick = (obj) => {
    setSelectedObject(obj);
    const log = [];
    log.push(`// Creating instance of ${obj.type}`);
    log.push(`const ${obj.name.toLowerCase()} = new ${obj.type}();`);
    log.push('');
    log.push('// Calling polymorphic methods:');
    
    if (obj.sound) {
      log.push(`${obj.name.toLowerCase()}.makeSound(); // "${obj.sound}"`);
      log.push(`${obj.name.toLowerCase()}.move(); // "${obj.movement}"`);
      log.push(`${obj.name.toLowerCase()}.special(); // "${obj.special}"`);
    } else {
      log.push(`${obj.name.toLowerCase()}.draw(); // "${obj.draw}"`);
      log.push(`${obj.name.toLowerCase()}.calculateArea(); // ${obj.area}`);
      log.push(`${obj.name.toLowerCase()}.calculatePerimeter(); // ${obj.perimeter}`);
    }
    
    setExecutionLog(log);
  };

  return (
    <div className="polymorphism-simulator">
      <h3 className="simulator-title">Polymorphism Simulator</h3>
      
      <div className="simulator-intro">
        <p>
          Polymorphism allows objects of different types to be treated as instances of the same base type.
          Click on any object below to see how the same method call produces different behaviors!
        </p>
      </div>
      
      <div className="examples-container">
        <div className="example-section">
          <h4>Animal Example</h4>
          <div className="base-class-info">
            Base Class: <code>Animal</code>
          </div>
          <div className="objects-grid">
            {animals.map(animal => (
              <div 
                key={animal.type}
                className={`object-card ${selectedObject?.name === animal.name ? 'selected' : ''}`}
                onClick={() => handleObjectClick(animal)}
              >
                <div className="object-icon">{animal.icon}</div>
                <div className="object-type">{animal.type}</div>
                <div className="object-name">{animal.name}</div>
              </div>
            ))}
          </div>
          <div className="polymorphic-actions">
            <button onClick={() => executePolymorphicCall('makeSound', animals)}>
              Call makeSound() on all
            </button>
            <button onClick={() => executePolymorphicCall('move', animals)}>
              Call move() on all
            </button>
            <button onClick={() => executePolymorphicCall('special', animals)}>
              Call special() on all
            </button>
          </div>
        </div>
        
        <div className="example-section">
          <h4>Shape Example</h4>
          <div className="base-class-info">
            Base Class: <code>Shape</code>
          </div>
          <div className="objects-grid">
            {shapes.map(shape => (
              <div 
                key={shape.type}
                className={`object-card ${selectedObject?.name === shape.name ? 'selected' : ''}`}
                onClick={() => handleObjectClick(shape)}
              >
                <div className="object-icon">{shape.icon}</div>
                <div className="object-type">{shape.type}</div>
              </div>
            ))}
          </div>
          <div className="polymorphic-actions">
            <button onClick={() => executePolymorphicCall('draw', shapes)}>
              Call draw() on all
            </button>
            <button onClick={() => executePolymorphicCall('calculateArea', shapes)}>
              Call calculateArea() on all
            </button>
          </div>
        </div>
      </div>
      
      <div className="execution-section">
        <div className="execution-header">
          <h4>Execution Log</h4>
          {selectedObject && (
            <button 
              className="show-code-btn"
              onClick={() => setShowCode(!showCode)}
            >
              {showCode ? 'Hide' : 'Show'} Implementation
            </button>
          )}
        </div>
        
        {showCode && selectedObject && (
          <div className="code-implementation">
            <pre>
              <code>{selectedObject.code}</code>
            </pre>
          </div>
        )}
        
        <div className="execution-log">
          {executionLog.length > 0 ? (
            executionLog.map((line, index) => (
              <div 
                key={index} 
                className={line.startsWith('//') ? 'comment-line' : 'code-line'}
              >
                {line}
              </div>
            ))
          ) : (
            <div className="empty-log">
              Click on an object or use the polymorphic method buttons to see the execution
            </div>
          )}
        </div>
      </div>
      
      <div className="polymorphism-concepts">
        <h4>Key Concepts Demonstrated:</h4>
        <div className="concepts-grid">
          <div className="concept-card">
            <h5>Method Overriding</h5>
            <p>Each subclass provides its own implementation of the base class methods</p>
          </div>
          <div className="concept-card">
            <h5>Dynamic Binding</h5>
            <p>The actual method called is determined at runtime based on the object's type</p>
          </div>
          <div className="concept-card">
            <h5>Interface Consistency</h5>
            <p>All objects share the same method names but behave differently</p>
          </div>
          <div className="concept-card">
            <h5>Code Flexibility</h5>
            <p>New types can be added without changing existing code that uses the base type</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PolymorphismSimulator;