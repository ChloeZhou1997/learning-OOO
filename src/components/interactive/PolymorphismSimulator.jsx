import React, { useState } from 'react';
import './PolymorphismSimulator.css';

const PolymorphismSimulator = () => {
  const [selectedObject, setSelectedObject] = useState(null);
  const [executionLog, setExecutionLog] = useState([]);
  const [showCode, setShowCode] = useState(false);
  const [selectedExample, setSelectedExample] = useState('pytorch');

  const frameworkExamples = {
    pytorch: {
      name: 'PyTorch nn.Module',
      icon: '🔥',
      baseClass: 'nn.Module',
      baseMethod: 'forward()',
      description: 'All neural network layers inherit from nn.Module and implement forward()',
      objects: [
        {
          type: 'nn.Linear',
          name: 'Linear',
          icon: '📊',
          forward: 'y = xW^T + b',
          parameters: 'weight, bias',
          computation: 'Matrix multiplication + bias',
          code: `class Linear(nn.Module):
    def __init__(self, in_features, out_features):
        super().__init__()
        self.weight = nn.Parameter(torch.randn(out_features, in_features))
        self.bias = nn.Parameter(torch.zeros(out_features))
    
    def forward(self, x):
        # Polymorphic forward method
        return F.linear(x, self.weight, self.bias)
        # Output: y = xW^T + b`
        },
        {
          type: 'nn.Conv2d',
          name: 'Conv2d',
          icon: '🔲',
          forward: 'y = conv2d(x, weight) + bias',
          parameters: 'weight[out_ch, in_ch, k, k], bias',
          computation: '2D convolution operation',
          code: `class Conv2d(nn.Module):
    def __init__(self, in_channels, out_channels, kernel_size):
        super().__init__()
        self.weight = nn.Parameter(torch.randn(out_channels, in_channels, kernel_size, kernel_size))
        self.bias = nn.Parameter(torch.zeros(out_channels))
    
    def forward(self, x):
        # Polymorphic forward method
        return F.conv2d(x, self.weight, self.bias, self.stride, self.padding)
        # Output: Feature maps after convolution`
        },
        {
          type: 'nn.LSTM',
          name: 'LSTM',
          icon: '🔄',
          forward: 'output, (h_n, c_n) = lstm(x, (h_0, c_0))',
          parameters: 'weight_ih, weight_hh, bias_ih, bias_hh',
          computation: 'Recurrent computation with gates',
          code: `class LSTM(nn.Module):
    def __init__(self, input_size, hidden_size):
        super().__init__()
        self.input_size = input_size
        self.hidden_size = hidden_size
        # Multiple weight matrices for gates
        self.weight_ih = nn.Parameter(torch.randn(4 * hidden_size, input_size))
        self.weight_hh = nn.Parameter(torch.randn(4 * hidden_size, hidden_size))
    
    def forward(self, x, hx=None):
        # Polymorphic forward method
        # Complex LSTM computation with forget, input, cell, output gates
        return output, (h_n, c_n)`
        },
        {
          type: 'nn.BatchNorm2d',
          name: 'BatchNorm2d',
          icon: '📈',
          forward: 'y = (x - mean) / sqrt(var + eps) * γ + β',
          parameters: 'weight (γ), bias (β), running_mean, running_var',
          computation: 'Normalize across batch dimension',
          code: `class BatchNorm2d(nn.Module):
    def __init__(self, num_features):
        super().__init__()
        self.weight = nn.Parameter(torch.ones(num_features))  # gamma
        self.bias = nn.Parameter(torch.zeros(num_features))   # beta
        self.register_buffer('running_mean', torch.zeros(num_features))
        self.register_buffer('running_var', torch.ones(num_features))
    
    def forward(self, x):
        # Polymorphic forward method
        if self.training:
            mean = x.mean([0, 2, 3], keepdim=True)
            var = x.var([0, 2, 3], keepdim=True)
            # Update running statistics
        else:
            mean = self.running_mean
            var = self.running_var
        return (x - mean) / torch.sqrt(var + self.eps) * self.weight + self.bias`
        }
      ]
    },
    langchain: {
      name: 'LangChain Runnable',
      icon: '🦜',
      baseClass: 'Runnable',
      baseMethod: 'invoke()',
      description: 'All LangChain components implement the Runnable protocol',
      objects: [
        {
          type: 'ChatOpenAI',
          name: 'LLM',
          icon: '🤖',
          forward: 'response = llm.invoke(messages)',
          parameters: 'model, temperature, api_key',
          computation: 'API call to OpenAI',
          code: `class ChatOpenAI(BaseChatModel, Runnable):
    def invoke(self, input, config=None):
        # Polymorphic invoke method
        messages = self._convert_input(input)
        response = openai.ChatCompletion.create(
            model=self.model_name,
            messages=messages,
            temperature=self.temperature
        )
        return AIMessage(content=response.choices[0].message.content)`
        },
        {
          type: 'PromptTemplate',
          name: 'Prompt',
          icon: '📝',
          forward: 'prompt = template.invoke(variables)',
          parameters: 'template, input_variables',
          computation: 'String formatting',
          code: `class PromptTemplate(BasePromptTemplate, Runnable):
    template: str
    input_variables: List[str]
    
    def invoke(self, input, config=None):
        # Polymorphic invoke method
        return self.format(**input)
    
    def format(self, **kwargs):
        # Replace {variable} with actual values
        return self.template.format(**kwargs)`
        },
        {
          type: 'RunnableSequence',
          name: 'Chain',
          icon: '⛓️',
          forward: 'output = chain.invoke(input)',
          parameters: 'steps: List[Runnable]',
          computation: 'Sequential execution',
          code: `class RunnableSequence(Runnable):
    def __init__(self, *steps):
        self.steps = steps
    
    def invoke(self, input, config=None):
        # Polymorphic invoke method
        # Chain multiple Runnables together
        result = input
        for step in self.steps:
            result = step.invoke(result, config)
        return result
        # Example: prompt | llm | parser`
        },
        {
          type: 'OutputParser',
          name: 'Parser',
          icon: '🔤',
          forward: 'parsed = parser.invoke(text)',
          parameters: 'format_instructions',
          computation: 'Parse text to structured data',
          code: `class JsonOutputParser(BaseOutputParser, Runnable):
    def invoke(self, input, config=None):
        # Polymorphic invoke method
        text = input.content if hasattr(input, 'content') else input
        try:
            # Parse JSON from LLM output
            return json.loads(text)
        except json.JSONDecodeError:
            # Extract JSON from markdown code blocks
            match = re.search(r'\`\`\`json\\n(.*?)\\n\`\`\`', text, re.DOTALL)
            if match:
                return json.loads(match.group(1))`
        }
      ]
    },
    tensorflow: {
      name: 'TensorFlow/Keras Layer',
      icon: '🧠',
      baseClass: 'tf.keras.Layer',
      baseMethod: 'call()',
      description: 'All Keras layers inherit from Layer and implement call()',
      objects: [
        {
          type: 'Dense',
          name: 'Dense',
          icon: '🔗',
          forward: 'y = activation(dot(x, kernel) + bias)',
          parameters: 'kernel, bias',
          computation: 'Fully connected layer',
          code: `class Dense(Layer):
    def __init__(self, units, activation=None):
        super().__init__()
        self.units = units
        self.activation = activations.get(activation)
    
    def build(self, input_shape):
        self.kernel = self.add_weight(
            "kernel",
            shape=[input_shape[-1], self.units]
        )
        self.bias = self.add_weight("bias", shape=[self.units])
    
    def call(self, inputs):
        # Polymorphic call method
        outputs = tf.matmul(inputs, self.kernel) + self.bias
        if self.activation:
            outputs = self.activation(outputs)
        return outputs`
        },
        {
          type: 'Conv2D',
          name: 'Conv2D',
          icon: '🖼️',
          forward: 'y = activation(conv2d(x, kernel) + bias)',
          parameters: 'kernel[h,w,in,out], bias',
          computation: '2D convolution',
          code: `class Conv2D(Layer):
    def __init__(self, filters, kernel_size, activation=None):
        super().__init__()
        self.filters = filters
        self.kernel_size = kernel_size
        self.activation = activations.get(activation)
    
    def call(self, inputs):
        # Polymorphic call method
        outputs = tf.nn.conv2d(
            inputs, 
            self.kernel,
            strides=self.strides,
            padding=self.padding.upper()
        )
        outputs = tf.nn.bias_add(outputs, self.bias)
        if self.activation:
            outputs = self.activation(outputs)
        return outputs`
        },
        {
          type: 'MultiHeadAttention',
          name: 'Attention',
          icon: '👁️',
          forward: 'attention_output = MHA(Q, K, V)',
          parameters: 'Wq, Wk, Wv, Wo',
          computation: 'Scaled dot-product attention',
          code: `class MultiHeadAttention(Layer):
    def __init__(self, num_heads, key_dim):
        super().__init__()
        self.num_heads = num_heads
        self.key_dim = key_dim
    
    def call(self, query, value, key=None, attention_mask=None):
        # Polymorphic call method
        # Split into multiple heads
        Q = self._split_heads(self.wq(query))
        K = self._split_heads(self.wk(key or value))
        V = self._split_heads(self.wv(value))
        
        # Scaled dot-product attention
        scores = tf.matmul(Q, K, transpose_b=True)
        scores = scores / tf.sqrt(float(self.key_dim))
        
        if attention_mask is not None:
            scores += attention_mask * -1e9
            
        weights = tf.nn.softmax(scores)
        attention = tf.matmul(weights, V)
        
        # Combine heads
        return self.wo(self._combine_heads(attention))`
        },
        {
          type: 'Dropout',
          name: 'Dropout',
          icon: '💧',
          forward: 'y = x * mask (training) or x (inference)',
          parameters: 'rate',
          computation: 'Random deactivation',
          code: `class Dropout(Layer):
    def __init__(self, rate):
        super().__init__()
        self.rate = rate
    
    def call(self, inputs, training=None):
        # Polymorphic call method
        if training:
            # Create random mask
            keep_prob = 1 - self.rate
            mask = tf.random.uniform(tf.shape(inputs)) < keep_prob
            # Scale to maintain expected value
            return inputs * tf.cast(mask, inputs.dtype) / keep_prob
        else:
            # No dropout during inference
            return inputs`
        }
      ]
    },
    react: {
      name: 'React Component',
      icon: '⚛️',
      baseClass: 'React.Component',
      baseMethod: 'render()',
      description: 'All React components implement render() to produce UI',
      objects: [
        {
          type: 'Button',
          name: 'Button',
          icon: '🔘',
          forward: 'JSX = <button>{children}</button>',
          parameters: 'onClick, disabled, variant',
          computation: 'Render button element',
          code: `class Button extends React.Component {
    render() {
        // Polymorphic render method
        const { onClick, disabled, variant, children } = this.props;
        return (
            <button 
                className={\`btn btn-\${variant}\`}
                onClick={onClick}
                disabled={disabled}
            >
                {children}
            </button>
        );
    }
}`
        },
        {
          type: 'Form',
          name: 'Form',
          icon: '📋',
          forward: 'JSX = <form>{fields}</form>',
          parameters: 'onSubmit, validation, initialValues',
          computation: 'Render form with validation',
          code: `class Form extends React.Component {
    state = {
        values: this.props.initialValues || {},
        errors: {}
    };
    
    render() {
        // Polymorphic render method
        const { children, onSubmit } = this.props;
        return (
            <form onSubmit={this.handleSubmit}>
                {React.Children.map(children, child =>
                    React.cloneElement(child, {
                        value: this.state.values[child.props.name],
                        error: this.state.errors[child.props.name],
                        onChange: this.handleChange
                    })
                )}
                <button type="submit">Submit</button>
            </form>
        );
    }
}`
        },
        {
          type: 'Modal',
          name: 'Modal',
          icon: '🪟',
          forward: 'JSX = createPortal(<div>{content}</div>)',
          parameters: 'isOpen, onClose, title',
          computation: 'Render modal overlay',
          code: `class Modal extends React.Component {
    render() {
        // Polymorphic render method
        if (!this.props.isOpen) return null;
        
        return ReactDOM.createPortal(
            <div className="modal-overlay" onClick={this.props.onClose}>
                <div className="modal-content" onClick={e => e.stopPropagation()}>
                    <div className="modal-header">
                        <h2>{this.props.title}</h2>
                        <button onClick={this.props.onClose}>×</button>
                    </div>
                    <div className="modal-body">
                        {this.props.children}
                    </div>
                </div>
            </div>,
            document.getElementById('modal-root')
        );
    }
}`
        },
        {
          type: 'VirtualList',
          name: 'VirtualList',
          icon: '📜',
          forward: 'JSX = <div>{visibleItems}</div>',
          parameters: 'items, itemHeight, height',
          computation: 'Render only visible items',
          code: `class VirtualList extends React.Component {
    state = { scrollTop: 0 };
    
    render() {
        // Polymorphic render method
        const { items, itemHeight, height, renderItem } = this.props;
        const startIndex = Math.floor(this.state.scrollTop / itemHeight);
        const endIndex = Math.ceil((this.state.scrollTop + height) / itemHeight);
        
        const visibleItems = items.slice(startIndex, endIndex);
        const totalHeight = items.length * itemHeight;
        
        return (
            <div className="virtual-list" onScroll={this.handleScroll} style={{ height }}>
                <div style={{ height: totalHeight, position: 'relative' }}>
                    {visibleItems.map((item, index) => (
                        <div
                            key={startIndex + index}
                            style={{
                                position: 'absolute',
                                top: (startIndex + index) * itemHeight,
                                height: itemHeight
                            }}
                        >
                            {renderItem(item, startIndex + index)}
                        </div>
                    ))}
                </div>
            </div>
        );
    }
}`
        }
      ]
    }
  };

  const executePolymorphicCall = (framework) => {
    const example = frameworkExamples[framework];
    const log = [];
    log.push(`# Polymorphic execution in ${example.name}`);
    log.push(`// All classes inherit from ${example.baseClass} and implement ${example.baseMethod}\n`);
    
    if (framework === 'pytorch') {
      log.push('# Building a neural network with polymorphic layers');
      log.push('model = nn.Sequential(');
      log.push('    nn.Linear(784, 256),      # Different forward() implementation');
      log.push('    nn.BatchNorm2d(256),      # Different forward() implementation');
      log.push('    nn.ReLU(),');
      log.push('    nn.Conv2d(256, 128, 3),   # Different forward() implementation');
      log.push('    nn.LSTM(128, 64)          # Different forward() implementation');
      log.push(')\n');
      log.push('# Polymorphic forward pass:');
      log.push('output = model(input)  # Each layer\'s forward() is called in sequence\n');
      log.push('// Output:');
      example.objects.forEach(obj => {
        log.push(`${obj.type}.forward() → ${obj.forward}`);
      });
    } else if (framework === 'langchain') {
      log.push('# Building a chain with polymorphic Runnable components');
      log.push('chain = prompt | llm | parser  # All implement invoke()\n');
      log.push('# Polymorphic execution:');
      log.push('result = chain.invoke({"topic": "AI"})\n');
      log.push('// Execution flow:');
      example.objects.forEach((obj, i) => {
        log.push(`${i+1}. ${obj.type}.invoke() → ${obj.forward}`);
      });
    } else if (framework === 'tensorflow') {
      log.push('# Building a Keras model with polymorphic layers');
      log.push('model = tf.keras.Sequential([');
      log.push('    Dense(128, activation="relu"),     # Implements call()');
      log.push('    Dropout(0.2),                      # Implements call()');
      log.push('    Conv2D(64, 3, activation="relu"),  # Implements call()');
      log.push('    MultiHeadAttention(8, 64),         # Implements call()');
      log.push('])\n');
      log.push('# Polymorphic forward pass:');
      log.push('output = model(input, training=True)  # Each layer\'s call() method\n');
      log.push('// Layer outputs:');
      example.objects.forEach(obj => {
        log.push(`${obj.type}.call() → ${obj.forward}`);
      });
    } else if (framework === 'react') {
      log.push('# React component tree with polymorphic render()');
      log.push('const App = () => (');
      log.push('  <div>');
      log.push('    <Button variant="primary" />    // render() → button');
      log.push('    <Form onSubmit={handleSubmit} /> // render() → form');
      log.push('    <Modal isOpen={showModal} />     // render() → portal');
      log.push('    <VirtualList items={data} />     // render() → optimized list');
      log.push('  </div>');
      log.push(')\n');
      log.push('// Each component\'s render() produces different UI:');
      example.objects.forEach(obj => {
        log.push(`${obj.type}.render() → ${obj.forward}`);
      });
    }
    
    setExecutionLog(log);
  };

  const handleObjectClick = (obj) => {
    setSelectedObject(obj);
    const framework = frameworkExamples[selectedExample];
    const log = [];
    
    log.push(`// ${obj.type} implementation`);
    log.push(`// Inherits from: ${framework.baseClass}`);
    log.push(`// Polymorphic method: ${framework.baseMethod}\n`);
    
    log.push(`# Example usage:`);
    if (selectedExample === 'pytorch') {
      log.push(`layer = ${obj.type}(${obj.type === 'nn.Linear' ? '784, 256' : obj.type === 'nn.Conv2d' ? '3, 64, 3' : '...'})`);
      log.push(`output = layer(input)  # Calls ${obj.type}.forward()\n`);
    } else if (selectedExample === 'langchain') {
      log.push(`component = ${obj.type}(...)`);
      log.push(`result = component.invoke(input)  # Calls ${obj.type}.invoke()\n`);
    } else if (selectedExample === 'tensorflow') {
      log.push(`layer = ${obj.type}(...)`);
      log.push(`output = layer(input)  # Calls ${obj.type}.call()\n`);
    } else if (selectedExample === 'react') {
      log.push(`<${obj.type} {...props} />  # Calls ${obj.type}.render()\n`);
    }
    
    log.push(`// Computation: ${obj.computation}`);
    log.push(`// Parameters: ${obj.parameters}`);
    log.push(`// Output: ${obj.forward}`);
    
    setExecutionLog(log);
  };

  return (
    <div className="polymorphism-simulator">
      <h3 className="simulator-title">Framework Polymorphism in Action</h3>
      
      <div className="simulator-intro">
        <p>
          See how real ML/AI frameworks use polymorphism to create flexible, extensible architectures.
          All components inherit from a base class and override key methods.
        </p>
      </div>

      <div className="framework-selector">
        {Object.entries(frameworkExamples).map(([key, framework]) => (
          <button
            key={key}
            className={`framework-btn ${selectedExample === key ? 'active' : ''}`}
            onClick={() => {
              setSelectedExample(key);
              setSelectedObject(null);
              setExecutionLog([]);
            }}
          >
            <span className="framework-icon">{framework.icon}</span>
            <span className="framework-name">{framework.name}</span>
          </button>
        ))}
      </div>
      
      <div className="examples-container">
        <div className="example-section">
          <div className="framework-info">
            <h4>{frameworkExamples[selectedExample].icon} {frameworkExamples[selectedExample].name}</h4>
            <p className="framework-description">{frameworkExamples[selectedExample].description}</p>
            <div className="base-class-info">
              Base Class: <code>{frameworkExamples[selectedExample].baseClass}</code> | 
              Polymorphic Method: <code>{frameworkExamples[selectedExample].baseMethod}</code>
            </div>
          </div>
          
          <div className="objects-grid">
            {frameworkExamples[selectedExample].objects.map(obj => (
              <div 
                key={obj.type}
                className={`object-card ${selectedObject?.name === obj.name ? 'selected' : ''}`}
                onClick={() => handleObjectClick(obj)}
              >
                <div className="object-icon">{obj.icon}</div>
                <div className="object-type">{obj.type}</div>
                <div className="object-computation">{obj.computation}</div>
              </div>
            ))}
          </div>
          
          <div className="polymorphic-actions">
            <button 
              className="execute-btn"
              onClick={() => executePolymorphicCall(selectedExample)}
            >
              🚀 Execute Polymorphic {frameworkExamples[selectedExample].baseMethod} Chain
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
                className={
                  line.startsWith('#') ? 'section-line' :
                  line.startsWith('//') ? 'comment-line' : 
                  line.includes('.') && line.includes('()') ? 'method-line' :
                  'code-line'
                }
              >
                {line}
              </div>
            ))
          ) : (
            <div className="empty-log">
              Click on a component or execute the polymorphic chain to see how {frameworkExamples[selectedExample].baseMethod} works across different implementations
            </div>
          )}
        </div>
      </div>
      
      <div className="polymorphism-concepts">
        <h4>Real-World Polymorphism Benefits:</h4>
        <div className="concepts-grid">
          <div className="concept-card">
            <h5>🔥 PyTorch</h5>
            <p>All layers implement <code>forward()</code>, enabling automatic differentiation and modular neural networks</p>
          </div>
          <div className="concept-card">
            <h5>🦜 LangChain</h5>
            <p>Everything is a <code>Runnable</code> with <code>invoke()</code>, allowing seamless chaining of LLMs, prompts, and tools</p>
          </div>
          <div className="concept-card">
            <h5>🧠 TensorFlow</h5>
            <p>Layers implement <code>call()</code> and <code>build()</code>, providing consistent interface for all neural network components</p>
          </div>
          <div className="concept-card">
            <h5>⚛️ React</h5>
            <p>Components implement <code>render()</code> to produce UI, enabling declarative and composable interfaces</p>
          </div>
        </div>
      </div>

      <div className="framework-patterns">
        <h4>Common Polymorphic Patterns:</h4>
        <ul>
          <li><strong>Template Method:</strong> Base class defines algorithm structure, subclasses implement specific steps</li>
          <li><strong>Strategy Pattern:</strong> Different algorithms behind common interface (e.g., optimizers, layers)</li>
          <li><strong>Chain of Responsibility:</strong> LangChain's Runnable pipeline, middleware patterns</li>
          <li><strong>Composite Pattern:</strong> nn.Sequential, React component trees - treat individual and compositions uniformly</li>
        </ul>
      </div>
    </div>
  );
};

export default PolymorphismSimulator;