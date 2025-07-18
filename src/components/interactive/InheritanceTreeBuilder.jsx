import React, { useState, useEffect, useRef } from 'react';
import './InheritanceTreeBuilder.css';

/**
 * InheritanceTreeBuilder Interactive Component
 * 
 * Visualizes inheritance hierarchies from popular frameworks to demonstrate
 * how real-world software uses inheritance for code organization and reuse.
 * 
 * @component
 * @example
 * return (
 *   <InheritanceTreeBuilder />
 * )
 * 
 * Educational concepts covered:
 * - Class inheritance and hierarchy
 * - Abstract classes and interfaces
 * - Method and property inheritance
 * - Framework design patterns
 * - Real-world examples from PyTorch, React, Spring, and TensorFlow
 */
const InheritanceTreeBuilder = () => {
  const [selectedExample, setSelectedExample] = useState('pytorch');
  const [showProperties, setShowProperties] = useState(true);
  const [highlightedNode, setHighlightedNode] = useState(null);
  const [scale, setScale] = useState(1);
  const treeContainerRef = useRef(null);
  const treeContentRef = useRef(null);

  const examples = {
    pytorch: {
      name: 'PyTorch nn.Module Hierarchy',
      framework: '🔥 PyTorch',
      root: {
        name: 'nn.Module',
        properties: ['training: bool', '_parameters: OrderedDict', '_buffers: OrderedDict', '_modules: OrderedDict'],
        methods: ['forward()', 'parameters()', 'train()', 'eval()', 'to(device)', 'state_dict()'],
        abstract: true,
        children: [
          {
            name: 'nn.Linear',
            properties: ['in_features: int', 'out_features: int', 'weight: Parameter', 'bias: Parameter'],
            methods: ['forward(input)', 'reset_parameters()'],
            children: []
          },
          {
            name: 'nn.Conv2d',
            properties: ['in_channels: int', 'out_channels: int', 'kernel_size: Tuple', 'stride: Tuple', 'padding: Tuple'],
            methods: ['forward(input)', '_conv_forward()', 'reset_parameters()'],
            children: []
          },
          {
            name: 'nn.Container',
            properties: [],
            methods: [],
            abstract: true,
            children: [
              {
                name: 'nn.Sequential',
                properties: ['_modules: OrderedDict[str, Module]'],
                methods: ['forward(input)', 'append(module)', '__getitem__(idx)'],
                children: []
              },
              {
                name: 'nn.ModuleList',
                properties: ['_modules: List[Module]'],
                methods: ['append(module)', 'extend(modules)', '__getitem__(idx)', '__len__()'],
                children: []
              },
              {
                name: 'nn.ModuleDict',
                properties: ['_modules: Dict[str, Module]'],
                methods: ['__getitem__(key)', '__setitem__(key, module)', 'keys()', 'values()'],
                children: []
              }
            ]
          },
          {
            name: 'nn.RNNBase',
            properties: ['input_size: int', 'hidden_size: int', 'num_layers: int', 'bias: bool', 'batch_first: bool'],
            methods: ['forward(input, h_0)', 'flatten_parameters()'],
            abstract: true,
            children: [
              {
                name: 'nn.LSTM',
                properties: ['proj_size: int'],
                methods: ['forward(input, hx)', 'permute_hidden()'],
                children: []
              },
              {
                name: 'nn.GRU',
                properties: [],
                methods: ['forward(input, hx)'],
                children: []
              }
            ]
          }
        ]
      }
    },
    react: {
      name: 'React Component Hierarchy',
      framework: '⚛️ React',
      root: {
        name: 'React.Component',
        properties: ['props: object', 'state: object', 'context: any', 'refs: object'],
        methods: ['render()', 'setState()', 'forceUpdate()', 'componentDidMount()', 'componentDidUpdate()', 'componentWillUnmount()'],
        children: [
          {
            name: 'React.PureComponent',
            properties: [],
            methods: ['shouldComponentUpdate()'],
            children: []
          },
          {
            name: 'CustomComponent',
            properties: ['customState: any'],
            methods: ['customMethod()'],
            userDefined: true,
            children: [
              {
                name: 'App',
                properties: ['user: User', 'theme: Theme'],
                methods: ['handleLogin()', 'handleLogout()', 'toggleTheme()'],
                userDefined: true,
                children: []
              },
              {
                name: 'Form',
                properties: ['values: object', 'errors: object', 'touched: object'],
                methods: ['handleSubmit()', 'handleChange()', 'validate()'],
                userDefined: true,
                children: []
              }
            ]
          },
          {
            name: 'React.memo()',
            properties: [],
            methods: [],
            note: 'Function component wrapper',
            children: []
          }
        ]
      }
    },
    spring: {
      name: 'Spring Framework Hierarchy',
      framework: '🌱 Spring',
      root: {
        name: 'BeanFactory',
        properties: [],
        methods: ['getBean()', 'containsBean()', 'isSingleton()', 'getType()'],
        interface: true,
        children: [
          {
            name: 'ApplicationContext',
            properties: [],
            methods: ['getId()', 'getApplicationName()', 'getEnvironment()', 'publishEvent()'],
            interface: true,
            children: [
              {
                name: 'ConfigurableApplicationContext',
                properties: [],
                methods: ['setId()', 'setEnvironment()', 'addBeanFactoryPostProcessor()', 'refresh()', 'close()'],
                interface: true,
                children: [
                  {
                    name: 'AbstractApplicationContext',
                    properties: ['id: String', 'displayName: String', 'startupDate: long', 'active: AtomicBoolean'],
                    methods: ['refresh()', 'prepareBeanFactory()', 'postProcessBeanFactory()', 'finishBeanFactoryInitialization()'],
                    abstract: true,
                    children: [
                      {
                        name: 'AnnotationConfigApplicationContext',
                        properties: ['scanner: ClassPathBeanDefinitionScanner', 'reader: AnnotatedBeanDefinitionReader'],
                        methods: ['register()', 'scan()', 'refresh()'],
                        children: []
                      },
                      {
                        name: 'WebApplicationContext',
                        properties: ['servletContext: ServletContext'],
                        methods: ['getServletContext()'],
                        interface: true,
                        children: []
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      }
    },
    tensorflow: {
      name: 'TensorFlow/Keras Layer Hierarchy',
      framework: '🧠 TensorFlow',
      root: {
        name: 'tf.Module',
        properties: ['_name: str', 'trainable: bool'],
        methods: ['__call__()', 'with_name_scope()'],
        children: [
          {
            name: 'tf.keras.layers.Layer',
            properties: ['dtype: DType', 'trainable_weights: List', 'non_trainable_weights: List', 'losses: List'],
            methods: ['build()', 'call()', 'compute_output_shape()', 'add_weight()', 'add_loss()'],
            abstract: true,
            children: [
              {
                name: 'Dense',
                properties: ['units: int', 'activation: str', 'use_bias: bool', 'kernel: Variable', 'bias: Variable'],
                methods: ['build(input_shape)', 'call(inputs)', 'compute_output_shape(input_shape)'],
                children: []
              },
              {
                name: 'Conv2D',
                properties: ['filters: int', 'kernel_size: Tuple', 'strides: Tuple', 'padding: str', 'activation: str'],
                methods: ['build(input_shape)', 'call(inputs)', 'compute_output_shape(input_shape)'],
                children: []
              },
              {
                name: 'RNN',
                properties: ['units: int', 'return_sequences: bool', 'return_state: bool', 'stateful: bool'],
                methods: ['call(inputs, mask, training, initial_state)', 'reset_states()'],
                children: [
                  {
                    name: 'LSTM',
                    properties: ['units: int', 'recurrent_activation: str', 'use_bias: bool', 'unit_forget_bias: bool'],
                    methods: ['build(input_shape)', 'call(inputs, mask, training, initial_state)'],
                    children: []
                  },
                  {
                    name: 'GRU',
                    properties: ['units: int', 'reset_after: bool', 'recurrent_activation: str'],
                    methods: ['build(input_shape)', 'call(inputs, mask, training, initial_state)'],
                    children: []
                  }
                ]
              },
              {
                name: 'Wrapper',
                properties: ['layer: Layer'],
                methods: ['build(input_shape)', 'call(inputs, **kwargs)'],
                abstract: true,
                children: [
                  {
                    name: 'TimeDistributed',
                    properties: [],
                    methods: ['compute_output_shape(input_shape)'],
                    children: []
                  },
                  {
                    name: 'Bidirectional',
                    properties: ['merge_mode: str', 'backward_layer: Layer'],
                    methods: ['call(inputs, training, mask, initial_state)', 'reset_states()'],
                    children: []
                  }
                ]
              }
            ]
          }
        ]
      }
    }
  };

  /**
   * Recursively renders a node and its children in the inheritance tree
   * @param {Object} node - The current node to render
   * @param {number} level - Current depth in the tree (for indentation)
   * @param {string[]} parentProperties - Properties inherited from parent classes
   * @param {string[]} parentMethods - Methods inherited from parent classes
   * @returns {JSX.Element} The rendered node component
   */
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
          className={`tree-node ${isHighlighted ? 'highlighted' : ''} ${node.abstract ? 'abstract' : ''} ${node.interface ? 'interface' : ''} ${node.userDefined ? 'user-defined' : ''}`}
          onMouseEnter={() => setHighlightedNode(node.name)}
          onMouseLeave={() => setHighlightedNode(null)}
        >
          <h4 className="node-name">
            {node.abstract && <span className="node-type">«abstract»</span>}
            {node.interface && <span className="node-type">«interface»</span>}
            {node.name}
            {node.note && <span className="node-note">{node.note}</span>}
          </h4>
          
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

  /**
   * Auto-scales the inheritance tree to fit within its container
   * Calculates appropriate scale factor based on content and container dimensions
   */
  useEffect(() => {
    const calculateScale = () => {
      if (!treeContainerRef.current || !treeContentRef.current) return;

      const container = treeContainerRef.current;
      const content = treeContentRef.current;
      

      // Reset scale to measure actual size
      setScale(1);
      
      // Wait for DOM update
      setTimeout(() => {
        // Get dimensions
        const containerWidth = container.clientWidth - 80; // Padding
        const containerHeight = container.clientHeight - 80; // Padding
        const contentWidth = content.scrollWidth;
        const contentHeight = content.scrollHeight;

        // Calculate scale factors
        const scaleX = containerWidth / contentWidth;
        const scaleY = containerHeight / contentHeight;

        // Use the smaller scale to ensure everything fits
        // But don't scale below 0.5 or above 1.2
        const newScale = Math.max(0.5, Math.min(scaleX, scaleY, 1.2));

        // Temporarily use fixed scale to debug
        setScale(0.85);
      }, 50);
    };

    // Calculate scale on mount and when example changes
    const timer = setTimeout(calculateScale, 200);

    // Recalculate on window resize
    window.addEventListener('resize', calculateScale);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', calculateScale);
    };
  }, [selectedExample, showProperties]);

  return (
    <div className="inheritance-tree-builder">
      <h3 className="builder-title">Framework Inheritance Hierarchies</h3>
      
      <div className="controls">
        <div className="example-selector">
          <label>Select Framework:</label>
          <select 
            value={selectedExample} 
            onChange={(e) => setSelectedExample(e.target.value)}
          >
            {Object.entries(examples).map(([key, example]) => (
              <option key={key} value={key}>{example.framework} - {example.name}</option>
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
          Explore how major frameworks use inheritance to build powerful abstractions. 
          Each child class inherits functionality from its parent, enabling code reuse and polymorphism.
        </p>
        <div className="legend">
          <span className="legend-item">
            <span className="legend-color own"></span> Own properties/methods
          </span>
          <span className="legend-item">
            <span className="legend-color inherited"></span> Inherited properties/methods
          </span>
          <span className="legend-item">
            <span className="legend-color abstract"></span> Abstract class
          </span>
          <span className="legend-item">
            <span className="legend-color interface"></span> Interface
          </span>
        </div>
      </div>
      
      <div className="tree-container" ref={treeContainerRef}>
        <div 
          className="tree-content-wrapper"
          ref={treeContentRef}
          style={{
            transform: `scale(${scale})`,
            transformOrigin: 'center center',
          }}
        >
          {renderNode(currentExample.root)}
        </div>
      </div>
      
      <div className="inheritance-principles">
        <h4>Framework Design Principles:</h4>
        <ul>
          <li>
            <strong>PyTorch nn.Module:</strong> Everything is a Module - layers, models, loss functions. 
            This unified interface enables automatic differentiation and device management.
          </li>
          <li>
            <strong>React Component:</strong> Components can be classes or functions, but class components 
            inherit lifecycle methods and state management from React.Component.
          </li>
          <li>
            <strong>Spring ApplicationContext:</strong> Complex inheritance hierarchy provides different 
            contexts for web apps, standalone apps, and tests while sharing core functionality.
          </li>
          <li>
            <strong>TensorFlow/Keras Layer:</strong> All neural network layers inherit from Layer base class, 
            providing consistent interface for building, calling, and training.
          </li>
          <li>
            <strong>Code Reuse:</strong> Framework authors define common functionality once in base classes, 
            allowing users to inherit and extend without reimplementing core features.
          </li>
        </ul>
      </div>
    </div>
  );
};

export default InheritanceTreeBuilder;