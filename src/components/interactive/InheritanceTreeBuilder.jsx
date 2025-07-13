import React, { useState } from 'react';
import './InheritanceTreeBuilder.css';

const InheritanceTreeBuilder = () => {
  const [selectedExample, setSelectedExample] = useState('animals');
  const [showProperties, setShowProperties] = useState(true);
  const [highlightedNode, setHighlightedNode] = useState(null);

  const examples = {
    animals: {
      name: 'Animal Kingdom',
      root: {
        name: 'Animal',
        properties: ['name', 'age', 'weight'],
        methods: ['eat()', 'sleep()', 'move()'],
        children: [
          {
            name: 'Mammal',
            properties: ['furColor', 'warmBlooded'],
            methods: ['nurse()', 'giveBirth()'],
            children: [
              {
                name: 'Dog',
                properties: ['breed', 'tailLength'],
                methods: ['bark()', 'wagTail()', 'fetch()'],
                children: []
              },
              {
                name: 'Cat',
                properties: ['whiskerLength', 'clawSharpness'],
                methods: ['meow()', 'purr()', 'scratch()'],
                children: []
              }
            ]
          },
          {
            name: 'Bird',
            properties: ['wingSpan', 'beakType'],
            methods: ['fly()', 'layEggs()', 'chirp()'],
            children: [
              {
                name: 'Eagle',
                properties: ['huntingRange', 'visionAcuity'],
                methods: ['soar()', 'hunt()', 'screech()'],
                children: []
              },
              {
                name: 'Penguin',
                properties: ['swimSpeed', 'coldResistance'],
                methods: ['swim()', 'huddle()', 'waddle()'],
                children: []
              }
            ]
          }
        ]
      }
    },
    vehicles: {
      name: 'Vehicle Hierarchy',
      root: {
        name: 'Vehicle',
        properties: ['speed', 'capacity', 'fuelType'],
        methods: ['start()', 'stop()', 'refuel()'],
        children: [
          {
            name: 'LandVehicle',
            properties: ['wheelCount', 'transmission'],
            methods: ['drive()', 'brake()', 'turn()'],
            children: [
              {
                name: 'Car',
                properties: ['doorCount', 'trunkSize'],
                methods: ['honk()', 'park()', 'reverse()'],
                children: []
              },
              {
                name: 'Motorcycle',
                properties: ['handlebarType', 'engineCC'],
                methods: ['wheelie()', 'lean()', 'kickstart()'],
                children: []
              }
            ]
          },
          {
            name: 'WaterVehicle',
            properties: ['draft', 'hullType'],
            methods: ['sail()', 'anchor()', 'navigate()'],
            children: [
              {
                name: 'Boat',
                properties: ['sailCount', 'cabinSize'],
                methods: ['tack()', 'moor()', 'bilge()'],
                children: []
              },
              {
                name: 'Submarine',
                properties: ['maxDepth', 'periscopeLength'],
                methods: ['dive()', 'surface()', 'ping()'],
                children: []
              }
            ]
          }
        ]
      }
    },
    ui: {
      name: 'UI Components',
      root: {
        name: 'UIComponent',
        properties: ['width', 'height', 'visible'],
        methods: ['render()', 'hide()', 'show()'],
        children: [
          {
            name: 'Container',
            properties: ['padding', 'layout'],
            methods: ['addChild()', 'removeChild()', 'arrange()'],
            children: [
              {
                name: 'Panel',
                properties: ['borderStyle', 'backgroundColor'],
                methods: ['collapse()', 'expand()', 'dock()'],
                children: []
              },
              {
                name: 'Window',
                properties: ['title', 'resizable'],
                methods: ['minimize()', 'maximize()', 'close()'],
                children: []
              }
            ]
          },
          {
            name: 'Control',
            properties: ['enabled', 'tabIndex'],
            methods: ['focus()', 'blur()', 'validate()'],
            children: [
              {
                name: 'Button',
                properties: ['text', 'icon'],
                methods: ['click()', 'press()', 'release()'],
                children: []
              },
              {
                name: 'TextBox',
                properties: ['value', 'placeholder'],
                methods: ['type()', 'clear()', 'select()'],
                children: []
              }
            ]
          }
        ]
      }
    }
  };

  const renderNode = (node, level = 0, parentProperties = [], parentMethods = []) => {
    const allProperties = [...parentProperties, ...node.properties];
    const allMethods = [...parentMethods, ...node.methods];
    const isHighlighted = highlightedNode === node.name;

    return (
      <div key={node.name} className="tree-node-container">
        <div className="tree-line-container">
          {level > 0 && <div className="tree-line-vertical" />}
          {level > 0 && <div className="tree-line-horizontal" />}
        </div>
        
        <div 
          className={`tree-node ${isHighlighted ? 'highlighted' : ''}`}
          onMouseEnter={() => setHighlightedNode(node.name)}
          onMouseLeave={() => setHighlightedNode(null)}
        >
          <h4 className="node-name">{node.name}</h4>
          
          {showProperties && (
            <div className="node-details">
              <div className="properties-section">
                <h5>Properties:</h5>
                <ul>
                  {allProperties.map((prop, index) => (
                    <li 
                      key={index} 
                      className={index < parentProperties.length ? 'inherited' : 'own'}
                    >
                      {prop}
                      {index < parentProperties.length && <span className="inherited-badge">inherited</span>}
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="methods-section">
                <h5>Methods:</h5>
                <ul>
                  {allMethods.map((method, index) => (
                    <li 
                      key={index} 
                      className={index < parentMethods.length ? 'inherited' : 'own'}
                    >
                      {method}
                      {index < parentMethods.length && <span className="inherited-badge">inherited</span>}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
        
        {node.children.length > 0 && (
          <div className="tree-children">
            {node.children.map(child => 
              renderNode(child, level + 1, allProperties, allMethods)
            )}
          </div>
        )}
      </div>
    );
  };

  const currentExample = examples[selectedExample];

  return (
    <div className="inheritance-tree-builder">
      <h3 className="builder-title">Inheritance Tree Builder</h3>
      
      <div className="controls">
        <div className="example-selector">
          <label>Select Example:</label>
          <select 
            value={selectedExample} 
            onChange={(e) => setSelectedExample(e.target.value)}
          >
            {Object.entries(examples).map(([key, example]) => (
              <option key={key} value={key}>{example.name}</option>
            ))}
          </select>
        </div>
        
        <div className="toggle-properties">
          <label>
            <input 
              type="checkbox" 
              checked={showProperties} 
              onChange={(e) => setShowProperties(e.target.checked)}
            />
            Show Properties & Methods
          </label>
        </div>
      </div>
      
      <div className="tree-explanation">
        <p>
          This interactive tree shows how inheritance works in object-oriented programming. 
          Child classes inherit all properties and methods from their parent classes.
        </p>
        <div className="legend">
          <span className="legend-item">
            <span className="legend-color own"></span> Own properties/methods
          </span>
          <span className="legend-item">
            <span className="legend-color inherited"></span> Inherited properties/methods
          </span>
        </div>
      </div>
      
      <div className="tree-container">
        {renderNode(currentExample.root)}
      </div>
      
      <div className="inheritance-principles">
        <h4>Key Inheritance Principles:</h4>
        <ul>
          <li>
            <strong>IS-A Relationship:</strong> Each child class IS-A type of its parent 
            (e.g., Dog IS-A Mammal, Mammal IS-A Animal)
          </li>
          <li>
            <strong>Property Inheritance:</strong> Child classes automatically have all 
            properties of their parents
          </li>
          <li>
            <strong>Method Inheritance:</strong> Child classes can use all methods defined 
            in parent classes
          </li>
          <li>
            <strong>Specialization:</strong> Child classes add their own specific properties 
            and methods
          </li>
          <li>
            <strong>Code Reuse:</strong> Common functionality is defined once in the parent 
            and reused by all children
          </li>
        </ul>
      </div>
    </div>
  );
};

export default InheritanceTreeBuilder;