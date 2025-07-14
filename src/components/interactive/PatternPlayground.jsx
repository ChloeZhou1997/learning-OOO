import React, { useState } from 'react';
import './PatternPlayground.css';

const PatternPlayground = () => {
  const [selectedPattern, setSelectedPattern] = useState('singleton');
  const [codeOutput, setCodeOutput] = useState([]);
  const [showImplementation, setShowImplementation] = useState(false);
  const [showFrameworkInsights, setShowFrameworkInsights] = useState(false);

  const patterns = {
    singleton: {
      name: 'Singleton Pattern',
      description: 'Ensures a class has only one instance and provides global access to it.',
      useCase: 'Process groups in distributed training, Global device managers, Shared model registries',
      frameworkExample: {
        pytorch: 'torch.distributed process group singleton',
        tensorflow: 'tf.distribute.Strategy global instance',
        langchain: 'Global callback manager instance',
        langgraph: 'Shared graph state manager'
      },
      implementation: `// PyTorch Distributed Training Singleton
class ProcessGroup {
  static instance = null;
  
  constructor() {
    if (ProcessGroup.instance) {
      return ProcessGroup.instance;
    }
    
    // Initialize distributed backend
    this.backend = 'nccl';  // For GPU communication
    this.rank = null;
    this.worldSize = null;
    this.initialized = false;
    
    ProcessGroup.instance = this;
  }
  
  initializeGroup(rank, worldSize) {
    if (!this.initialized) {
      this.rank = rank;
      this.worldSize = worldSize;
      this.initialized = true;
      console.log(\`Process \${rank} of \${worldSize} initialized\`);
    }
    return this;
  }
  
  allReduce(tensor) {
    // Synchronize gradients across all processes
    return \`AllReduce on tensor across \${this.worldSize} GPUs\`;
  }
}`,
      demo: () => {
        const output = [];
        output.push('// PyTorch Distributed Training Setup');
        output.push('// Process 0 (Master node) creates process group');
        output.push(`const pg1 = new ProcessGroup();`);
        output.push(`pg1.initializeGroup(0, 4); // Rank 0 of 4 GPUs`);
        output.push(`// "Process 0 of 4 initialized"`);
        
        output.push('\n// Process 1 tries to create new instance');
        output.push(`const pg2 = new ProcessGroup();`);
        output.push(`pg2 === pg1: true // Same instance!`);
        output.push(`pg2.rank // 0 - Still the same process group`);
        
        output.push('\n// All processes share the same group for communication');
        output.push(`pg1.allReduce(gradientTensor);`);
        output.push(`// "AllReduce on tensor across 4 GPUs"`);
        
        return output;
      }
    },
    factory: {
      name: 'Factory Pattern',
      description: 'Creates objects without specifying their exact classes.',
      useCase: 'Creating optimizers, Building neural network layers, Model architecture construction',
      frameworkExample: {
        pytorch: 'torch.optim optimizer factory',
        tensorflow: 'tf.keras.optimizers.get() factory',
        langchain: 'load_chain() factory method',
        langgraph: 'create_graph() with different executors'
      },
      implementation: `// TensorFlow-style Optimizer Factory
class OptimizerFactory {
  static createOptimizer(config) {
    const { type, learningRate, ...params } = config;
    
    switch(type.toLowerCase()) {
      case 'sgd':
        return new SGDOptimizer(learningRate, params);
      case 'adam':
        return new AdamOptimizer(learningRate, params);
      case 'rmsprop':
        return new RMSpropOptimizer(learningRate, params);
      default:
        throw new Error(\`Unknown optimizer: \${type}\`);
    }
  }
}

class SGDOptimizer {
  constructor(lr, { momentum = 0.0, nesterov = false }) {
    this.lr = lr;
    this.momentum = momentum;
    this.nesterov = nesterov;
  }
  
  apply(gradients) {
    return \`Applying SGD with lr=\${this.lr}, momentum=\${this.momentum}\`;
  }
}

class AdamOptimizer {
  constructor(lr, { beta1 = 0.9, beta2 = 0.999, epsilon = 1e-8 }) {
    this.lr = lr;
    this.beta1 = beta1;
    this.beta2 = beta2;
    this.epsilon = epsilon;
  }
  
  apply(gradients) {
    return \`Applying Adam with lr=\${this.lr}, betas=(\${this.beta1}, \${this.beta2})\`;
  }
}`,
      demo: () => {
        const output = [];
        output.push('// Creating optimizers with factory pattern');
        output.push(`const sgd = OptimizerFactory.createOptimizer({`);
        output.push(`  type: 'sgd',`);
        output.push(`  learningRate: 0.01,`);
        output.push(`  momentum: 0.9`);
        output.push(`});`);
        output.push(`sgd.apply(gradients);`);
        output.push(`// "Applying SGD with lr=0.01, momentum=0.9"`);
        
        output.push(`\n// Switching to Adam optimizer`);
        output.push(`const adam = OptimizerFactory.createOptimizer({`);
        output.push(`  type: 'adam',`);
        output.push(`  learningRate: 0.001,`);
        output.push(`  beta1: 0.9,`);
        output.push(`  beta2: 0.999`);
        output.push(`});`);
        output.push(`adam.apply(gradients);`);
        output.push(`// "Applying Adam with lr=0.001, betas=(0.9, 0.999)"`);
        
        output.push('\n// Factory enables easy optimizer switching without changing training code');
        
        return output;
      }
    },
    observer: {
      name: 'Observer Pattern',
      description: 'Defines a one-to-many dependency between objects.',
      useCase: 'Training callbacks, Progress monitoring, Model checkpointing, Metrics logging',
      frameworkExample: {
        pytorch: 'Training hooks for gradient monitoring',
        tensorflow: 'Keras callbacks (ModelCheckpoint, TensorBoard)',
        langchain: 'Streaming callbacks for token generation',
        langgraph: 'Graph execution state observers'
      },
      implementation: `// Training Loop with Observer Pattern (like Keras callbacks)
class TrainingLoop {
  constructor() {
    this.callbacks = [];
  }
  
  addCallback(callback) {
    this.callbacks.push(callback);
  }
  
  notifyEpochEnd(epoch, metrics) {
    this.callbacks.forEach(callback => {
      callback.onEpochEnd(epoch, metrics);
    });
  }
  
  train(epochs) {
    for (let epoch = 1; epoch <= epochs; epoch++) {
      // Simulate training
      const loss = Math.max(0.1, 1.0 - epoch * 0.15 + Math.random() * 0.1);
      const accuracy = Math.min(0.99, 0.5 + epoch * 0.08);
      
      const metrics = { loss, accuracy };
      this.notifyEpochEnd(epoch, metrics);
    }
  }
}

// TensorBoard Logger Callback
class TensorBoardCallback {
  onEpochEnd(epoch, metrics) {
    return \`[TensorBoard] Epoch \${epoch}: loss=\${metrics.loss.toFixed(3)}, acc=\${metrics.accuracy.toFixed(3)}\`;
  }
}

// Model Checkpoint Callback
class ModelCheckpointCallback {
  constructor() {
    this.bestLoss = Infinity;
  }
  
  onEpochEnd(epoch, metrics) {
    if (metrics.loss < this.bestLoss) {
      this.bestLoss = metrics.loss;
      return \`[Checkpoint] Saving model at epoch \${epoch} (best loss: \${this.bestLoss.toFixed(3)})\`;
    }
    return null;
  }
}`,
      demo: () => {
        const output = [];
        output.push('// Setting up training with callbacks');
        output.push(`const trainer = new TrainingLoop();`);
        output.push(`const tensorboard = new TensorBoardCallback();`);
        output.push(`const checkpoint = new ModelCheckpointCallback();`);
        
        output.push('\n// Attaching callbacks (observers)');
        output.push(`trainer.addCallback(tensorboard);`);
        output.push(`trainer.addCallback(checkpoint);`);
        
        output.push('\n// Running training - callbacks automatically triggered');
        output.push(`trainer.train(5); // Train for 5 epochs`);
        output.push(``);
        
        // Simulate training output
        const epochs = [
          { epoch: 1, loss: 0.950, acc: 0.580 },
          { epoch: 2, loss: 0.812, acc: 0.660 },
          { epoch: 3, loss: 0.687, acc: 0.740 },
          { epoch: 4, loss: 0.524, acc: 0.820 },
          { epoch: 5, loss: 0.413, acc: 0.900 }
        ];
        
        epochs.forEach(({ epoch, loss, acc }) => {
          output.push(`// [TensorBoard] Epoch ${epoch}: loss=${loss.toFixed(3)}, acc=${acc.toFixed(3)}`);
          if (epoch === 1 || epoch === 4 || epoch === 5) {
            output.push(`// [Checkpoint] Saving model at epoch ${epoch} (best loss: ${loss.toFixed(3)})`);
          }
        });
        
        return output;
      }
    },
    strategy: {
      name: 'Strategy Pattern',
      description: 'Defines a family of algorithms and makes them interchangeable.',
      useCase: 'Retrieval strategies, Memory management, Model inference strategies',
      frameworkExample: {
        pytorch: 'DataLoader sampling strategies',
        tensorflow: 'Distribution strategies for multi-GPU',
        langchain: 'Retrieval strategies (Dense, Sparse, Hybrid)',
        langgraph: 'Graph execution strategies'
      },
      implementation: `// LangChain-style Retrieval Strategy Pattern
class RAGPipeline {
  constructor(retrievalStrategy) {
    this.retrievalStrategy = retrievalStrategy;
  }
  
  async retrieve(query, k = 5) {
    return await this.retrievalStrategy.search(query, k);
  }
  
  setStrategy(strategy) {
    this.retrievalStrategy = strategy;
    return this;
  }
}

// Dense Vector Search Strategy
class DenseRetrievalStrategy {
  constructor(embedModel) {
    this.embedModel = embedModel;
    this.vectorStore = [];
  }
  
  async search(query, k) {
    const queryEmbedding = this.embedModel.encode(query);
    return \`Dense search: Found \${k} documents using cosine similarity\`;
  }
}

// BM25 Sparse Search Strategy  
class SparseRetrievalStrategy {
  constructor() {
    this.index = {}; // Term frequency index
  }
  
  async search(query, k) {
    // BM25 scoring
    return \`Sparse search: Found \${k} documents using BM25 scoring\`;
  }
}

// Hybrid Search Strategy
class HybridRetrievalStrategy {
  constructor(denseStrategy, sparseStrategy, alpha = 0.5) {
    this.dense = denseStrategy;
    this.sparse = sparseStrategy;
    this.alpha = alpha; // Weight for combining scores
  }
  
  async search(query, k) {
    // Combine dense and sparse results
    return \`Hybrid search: Combined dense (\${this.alpha}) + sparse (\${1-this.alpha}) results\`;
  }
}`,
      demo: () => {
        const output = [];
        output.push('// LangChain RAG with different retrieval strategies');
        output.push(`const embedModel = new EmbeddingModel('all-MiniLM-L6-v2');`);
        output.push(`const denseStrategy = new DenseRetrievalStrategy(embedModel);`);
        output.push(`const rag = new RAGPipeline(denseStrategy);`);
        
        output.push('\n// Using dense vector search');
        output.push(`await rag.retrieve("What is transformer architecture?");`);
        output.push(`// "Dense search: Found 5 documents using cosine similarity"`);
        
        output.push('\n// Switching to sparse search for keyword matching');
        output.push(`const sparseStrategy = new SparseRetrievalStrategy();`);
        output.push(`rag.setStrategy(sparseStrategy);`);
        output.push(`await rag.retrieve("transformer self-attention mechanism");`);
        output.push(`// "Sparse search: Found 5 documents using BM25 scoring"`);
        
        output.push('\n// Using hybrid strategy for best results');
        output.push(`const hybridStrategy = new HybridRetrievalStrategy(`);
        output.push(`  denseStrategy, sparseStrategy, 0.7`);
        output.push(`);`);
        output.push(`rag.setStrategy(hybridStrategy);`);
        output.push(`await rag.retrieve("How do transformers work?");`);
        output.push(`// "Hybrid search: Combined dense (0.7) + sparse (0.3) results"`);
        
        return output;
      }
    },
    decorator: {
      name: 'Decorator Pattern',
      description: 'Adds new functionality to objects without altering their structure.',
      useCase: 'Model wrappers, Performance monitoring, Caching layers, Retry logic',
      frameworkExample: {
        pytorch: '@torch.jit.script decorator for JIT compilation',
        tensorflow: '@tf.function for graph optimization',
        langchain: 'Retry and caching decorators for chains',
        langgraph: 'Node decorators for logging and validation'
      },
      implementation: `// PyTorch-style Model Decorators
class BaseModel {
  forward(x) {
    return \`Base model output for input: \${x}\`;
  }
  
  getDescription() {
    return 'BaseModel';
  }
}

// Abstract Decorator
class ModelDecorator {
  constructor(model) {
    this.model = model;
  }
  
  forward(x) {
    return this.model.forward(x);
  }
  
  getDescription() {
    return this.model.getDescription();
  }
}

// Gradient Checkpointing Decorator
class GradientCheckpointDecorator extends ModelDecorator {
  forward(x) {
    console.log('[Checkpoint] Saving activations for memory efficiency');
    const result = this.model.forward(x);
    return result;
  }
  
  getDescription() {
    return \`\${this.model.getDescription()} + GradientCheckpointing\`;
  }
}

// Mixed Precision Decorator
class MixedPrecisionDecorator extends ModelDecorator {
  forward(x) {
    console.log('[AMP] Converting to FP16 for faster computation');
    const result = this.model.forward(x);
    console.log('[AMP] Converting back to FP32');
    return result;
  }
  
  getDescription() {
    return \`\${this.model.getDescription()} + MixedPrecision\`;
  }
}

// Profiling Decorator
class ProfilingDecorator extends ModelDecorator {
  forward(x) {
    const start = Date.now();
    const result = this.model.forward(x);
    const duration = Date.now() - start;
    console.log(\`[Profile] Forward pass took \${duration}ms\`);
    return result;
  }
  
  getDescription() {
    return \`\${this.model.getDescription()} + Profiling\`;
  }
}`,
      demo: () => {
        const output = [];
        output.push('// Starting with a base neural network model');
        output.push(`let model = new BaseModel();`);
        output.push(`model.getDescription();`);
        output.push(`// "BaseModel"`);
        
        output.push('\n// Adding gradient checkpointing for large models');
        output.push(`model = new GradientCheckpointDecorator(model);`);
        output.push(`model.getDescription();`);
        output.push(`// "BaseModel + GradientCheckpointing"`);
        
        output.push('\n// Adding mixed precision for faster training');
        output.push(`model = new MixedPrecisionDecorator(model);`);
        output.push(`model.getDescription();`);
        output.push(`// "BaseModel + GradientCheckpointing + MixedPrecision"`);
        
        output.push('\n// Adding profiling to monitor performance');
        output.push(`model = new ProfilingDecorator(model);`);
        output.push(`model.getDescription();`);
        output.push(`// "BaseModel + GradientCheckpointing + MixedPrecision + Profiling"`);
        
        output.push('\n// Running forward pass with all decorators');
        output.push(`model.forward("input_tensor");`);
        output.push(`// [Profile] Starting timer`);
        output.push(`// [AMP] Converting to FP16 for faster computation`);
        output.push(`// [Checkpoint] Saving activations for memory efficiency`);
        output.push(`// Base model output for input: input_tensor`);
        output.push(`// [AMP] Converting back to FP32`);
        output.push(`// [Profile] Forward pass took 25ms`);
        
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
        <button 
          className="framework-insights-button" 
          onClick={() => setShowFrameworkInsights(!showFrameworkInsights)}
        >
          {showFrameworkInsights ? 'Hide' : 'Show'} Framework Insights
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

      {showFrameworkInsights && (
        <div className="framework-insights">
          <h5>🚀 How This Pattern Powers Modern Frameworks:</h5>
          <div className="framework-examples">
            <div className="framework-example">
              <strong>PyTorch:</strong> {patterns[selectedPattern].frameworkExample.pytorch}
            </div>
            <div className="framework-example">
              <strong>TensorFlow:</strong> {patterns[selectedPattern].frameworkExample.tensorflow}
            </div>
            <div className="framework-example">
              <strong>LangChain:</strong> {patterns[selectedPattern].frameworkExample.langchain}
            </div>
            <div className="framework-example">
              <strong>LangGraph:</strong> {patterns[selectedPattern].frameworkExample.langgraph}
            </div>
          </div>
          <div className="design-challenge">
            <h6>🏆 Design Challenge:</h6>
            <p>
              How would you use the {patterns[selectedPattern].name} to build a flexible ML framework component? 
              Consider aspects like:
            </p>
            <ul>
              <li>API design for ease of use</li>
              <li>Performance implications</li>
              <li>Extensibility for custom implementations</li>
              <li>Backward compatibility</li>
            </ul>
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
      
      <div className="framework-building-prompt">
        <h5>🚀 Building Your Own Framework:</h5>
        <p>
          Now that you've explored these patterns, imagine building your own framework! 
          Consider how you'd combine multiple patterns:
        </p>
        <ul>
          <li><strong>ML Framework:</strong> Factory for layers + Strategy for optimizers + Observer for training callbacks</li>
          <li><strong>LLM Framework:</strong> Decorator for prompt engineering + Strategy for different models + Singleton for token management</li>
          <li><strong>Graph Framework:</strong> Factory for nodes + Observer for execution + Strategy for traversal algorithms</li>
        </ul>
        <p className="final-thought">
          💡 <strong>Remember:</strong> Great frameworks like PyTorch, TensorFlow, LangChain, and LangGraph 
          all started with these fundamental patterns. What framework will you build?
        </p>
      </div>
    </div>
  );
};

export default PatternPlayground;