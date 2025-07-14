import PluginSocket from '../../components/interactive/PluginSocket';

export default {
id: 'chapter-8',
navTitle: '8. Interfaces & Abstract Classes',
title: 'Chapter 8: Designing with Interfaces and Abstract Classes',
learningObjectives: [
  'Understand the role of interfaces in defining contracts',
  'Know when to use interfaces vs. abstract classes',
  'Design systems that are open for extension',
  'Apply the Dependency Inversion Principle'
],
content: `
<p>Interfaces and abstract classes are the contracts of the object-oriented world. They define what classes must do without specifying how. This chapter explores how these concepts power modern frameworks like TensorFlow/Keras and LangChain, enabling them to be both powerful and extensible.</p>

<h2>1. Abstract Base Classes in Production: Keras Layer Architecture</h2>
<p>Keras demonstrates masterful use of abstract base classes. The <code>Layer</code> class provides a rich foundation that all neural network layers inherit from:</p>

<pre><code>from tensorflow.keras.layers import Layer
import tensorflow as tf

class Layer:
    """Base layer class in Keras - an abstract class with partial implementation."""
    
    def __init__(self, trainable=True, name=None, **kwargs):
        self.trainable = trainable
        self.name = name
        self._trainable_weights = []
        self._non_trainable_weights = []
        self.built = False
    
    def build(self, input_shape):
        """Creates the layer's weights. Must be implemented by subclasses."""
        raise NotImplementedError("Subclasses must implement build()")
    
    def call(self, inputs):
        """Defines the computation. Must be implemented by subclasses."""
        raise NotImplementedError("Subclasses must implement call()")
    
    def __call__(self, inputs):
        """Handles the complete forward pass with automatic building."""
        if not self.built:
            self.build(inputs.shape)
            self.built = True
        return self.call(inputs)
    
    def add_weight(self, name, shape, initializer='glorot_uniform'):
        """Helper method provided by the framework."""
        weight = tf.Variable(initializer(shape), name=name)
        if self.trainable:
            self._trainable_weights.append(weight)
        else:
            self._non_trainable_weights.append(weight)
        return weight</code></pre>

<p>This design brilliantly separates the framework's responsibilities (weight management, automatic building) from the user's responsibilities (defining the computation).</p>

<h2>2. Interface Patterns in LangChain: The Runnable Protocol</h2>
<p>LangChain uses Python's Protocol (similar to interfaces) to define contracts for all components:</p>

<pre><code>from typing import Protocol, Any, Dict
from abc import abstractmethod

class Runnable(Protocol):
    """The universal interface for LangChain components."""
    
    @abstractmethod
    def invoke(self, input: Any) -> Any:
        """Transform a single input into an output."""
        ...
    
    @abstractmethod
    async def ainvoke(self, input: Any) -> Any:
        """Async version of invoke."""
        ...
    
    @abstractmethod
    def batch(self, inputs: List[Any]) -> List[Any]:
        """Process multiple inputs."""
        ...
    
    @abstractmethod
    def stream(self, input: Any) -> Iterator[Any]:
        """Stream output chunks for a single input."""
        ...

# Any class implementing these methods can be used in LangChain pipelines
class LLMChain(Runnable):
    def invoke(self, input: Any) -> Any:
        # Implementation details
        pass
    
class Retriever(Runnable):
    def invoke(self, input: Any) -> Any:
        # Different implementation, same interface
        pass</code></pre>

<h2>3. Framework Extension Patterns: TensorFlow's Optimizer Hierarchy</h2>
<p>TensorFlow's optimizer design shows how abstract classes enable framework extension:</p>

<pre><code>class Optimizer:
    """Abstract optimizer base class - provides algorithm framework."""
    
    def __init__(self, learning_rate=0.001, name="Optimizer"):
        self.learning_rate = learning_rate
        self.iterations = tf.Variable(0, trainable=False)
    
    def minimize(self, loss, var_list):
        """Public API method - uses Template Method pattern."""
        gradients = tf.gradients(loss, var_list)
        grads_and_vars = zip(gradients, var_list)
        return self.apply_gradients(grads_and_vars)
    
    def apply_gradients(self, grads_and_vars):
        """Framework handles the iteration counting."""
        self.iterations.assign_add(1)
        for grad, var in grads_and_vars:
            self._resource_apply_dense(grad, var)
    
    @abstractmethod
    def _resource_apply_dense(self, grad, var):
        """Subclasses implement the actual optimization algorithm."""
        raise NotImplementedError()

class SGD(Optimizer):
    """Concrete implementation - only needs to define the algorithm."""
    def _resource_apply_dense(self, grad, var):
        var.assign_sub(self.learning_rate * grad)

class Adam(Optimizer):
    """Another algorithm, same framework."""
    def __init__(self, learning_rate=0.001, beta_1=0.9, beta_2=0.999):
        super().__init__(learning_rate)
        self.beta_1 = beta_1
        self.beta_2 = beta_2
        # Adam needs additional state
        self.m = {}  # First moment estimates
        self.v = {}  # Second moment estimates
    
    def _resource_apply_dense(self, grad, var):
        # Complex Adam algorithm implementation
        # Framework handles everything else</code></pre>

<h2>4. Multiple Interface Implementation: LangChain's Chain Components</h2>
<p>Modern frameworks often combine multiple interfaces/protocols for rich functionality:</p>

<pre><code>from typing import Protocol

class Serializable(Protocol):
    """Interface for components that can be saved/loaded."""
    def to_json(self) -> dict:
        ...
    
    @classmethod
    def from_json(cls, data: dict) -> 'Serializable':
        ...

class Cacheable(Protocol):
    """Interface for components that support caching."""
    def get_cache_key(self, inputs: Any) -> str:
        ...

class CallbackHandler(Protocol):
    """Interface for handling events during execution."""
    def on_chain_start(self, inputs: Dict) -> None:
        ...
    
    def on_chain_end(self, outputs: Dict) -> None:
        ...

# A sophisticated chain implements multiple protocols
class RetrievalQAChain(Runnable, Serializable, Cacheable):
    """A chain that implements multiple interfaces for full functionality."""
    
    def invoke(self, input: Any) -> Any:
        # Core Runnable implementation
        pass
    
    def to_json(self) -> dict:
        # Serialization logic
        return {"type": "retrieval_qa", "config": self.config}
    
    def get_cache_key(self, inputs: Any) -> str:
        # Caching logic
        return hashlib.md5(str(inputs).encode()).hexdigest()</code></pre>

<h2>5. The Open/Closed Principle in Framework Design</h2>
<p>Both TensorFlow and LangChain demonstrate the Open/Closed Principle beautifully:</p>

<pre><code># TensorFlow is "closed" for modification - you don't change the Layer class
# But "open" for extension - you create new layer types
class MultiHeadAttention(Layer):
    """User-defined layer that fits into the framework."""
    def build(self, input_shape):
        self.w_q = self.add_weight("query", shape=(...))
        self.w_k = self.add_weight("key", shape=(...))
        self.w_v = self.add_weight("value", shape=(...))
    
    def call(self, inputs):
        # Attention mechanism implementation
        pass

# LangChain is similarly extensible
class CustomRetriever(Runnable):
    """User-defined component that works with all LangChain tools."""
    def invoke(self, query: str) -> List[Document]:
        # Custom retrieval logic
        pass

# These extensions work seamlessly with the framework:
model = tf.keras.Sequential([
    MultiHeadAttention(num_heads=8),  # Custom layer
    tf.keras.layers.Dense(512),        # Built-in layer
])

chain = (
    CustomRetriever()      # Custom component
    | LLMChain(...)       # Built-in component
    | OutputParser()      # Another built-in
)</code></pre>

<h2>6. Design Lessons from Production Frameworks</h2>
<ul>
<li><strong>Abstract classes provide shared infrastructure:</strong> Keras layers get automatic shape inference, weight management, and device placement</li>
<li><strong>Interfaces enable composition:</strong> LangChain's Runnable protocol allows arbitrary chaining with the | operator</li>
<li><strong>Multiple interfaces add capabilities:</strong> Components can be Runnable + Serializable + Cacheable</li>
<li><strong>Framework growth without breaking changes:</strong> New layer types and chain components can be added without modifying core code</li>
</ul>

<blockquote><strong>Think Like a Framework Architect:</strong> When designing systems, ask yourself: What's the minimal contract users need to implement? What infrastructure can I provide in base classes? How can my design accommodate future extensions I haven't thought of yet?</blockquote>
`,
interactive: {
title: 'The Plugin Socket',
description: 'Experience the power of interface-based design - the foundation of extensible frameworks! Drag different providers to see how PyTorch\'s optimizer interface enables SGD/Adam/AdamW, how TensorFlow\'s layer interface supports Conv2D/LSTM/Attention, and how LangChain\'s Runnable interface allows chains/agents/tools to compose seamlessly. This plugin pattern is how frameworks achieve both power and flexibility!',
component: PluginSocket
},
quiz: {
title: 'Chapter 8 Quiz',
questions: [
{ type: 'mcq', question: 'In Keras, which two methods must every custom Layer implement?', options: ['__init__ and forward', 'build and call', 'compile and fit', 'train and evaluate'], answerIndex: 1 },
{ type: 'mcq', question: 'What design pattern does TensorFlow\'s Optimizer class use when minimize() calls _resource_apply_dense()?', options: ['Factory Pattern', 'Observer Pattern', 'Template Method Pattern', 'Singleton Pattern'], answerIndex: 2 },
{ type: 'mcq', question: 'Why does LangChain use the Runnable protocol for all its components?', options: ['For type checking only', 'To enable composability with the | operator', 'To improve performance', 'To reduce memory usage'], answerIndex: 1 },
{ type: 'mcq', question: 'What is the main advantage of Keras providing add_weight() in the base Layer class?', options: ['Faster execution', 'Automatic gradient tracking and device placement', 'Smaller model size', 'Better accuracy'], answerIndex: 1 },
{ type: 'fill-in', question: 'In Python, instead of interfaces, we use ________ to define contracts that classes should follow.', answer: 'Protocol' },
{ type: 'fill-in', question: 'The Keras Layer method ________ is responsible for creating the layer\'s weights based on input shape.', answer: 'build' },
{ type: 'fill-in', question: 'LangChain components that implement Runnable, Serializable, and Cacheable demonstrate the concept of multiple ________ implementation.', answer: 'interface' },
{ type: 'coding-challenge', question: 'Create a custom Keras layer that implements a simple gating mechanism (output = input * sigmoid(w*input + b)). Implement both build() and call() methods properly.', modelAnswer: 'import tensorflow as tf\nfrom tensorflow.keras.layers import Layer\n\nclass GatingLayer(Layer):\n    """Custom layer implementing a gating mechanism."""\n    \n    def __init__(self, units=32, **kwargs):\n        super().__init__(**kwargs)\n        self.units = units\n    \n    def build(self, input_shape):\n        """Create the layer weights based on input shape."""\n        # Get the last dimension of input\n        input_dim = input_shape[-1]\n        \n        # Create weight matrix for gating\n        self.w = self.add_weight(\n            name="gate_weights",\n            shape=(input_dim, self.units),\n            initializer="glorot_uniform",\n            trainable=True\n        )\n        \n        # Create bias vector\n        self.b = self.add_weight(\n            name="gate_bias",\n            shape=(self.units,),\n            initializer="zeros",\n            trainable=True\n        )\n        \n        # Mark the layer as built\n        super().build(input_shape)\n    \n    def call(self, inputs):\n        """Implement the gating computation."""\n        # Compute gate values: sigmoid(w*input + b)\n        gate = tf.nn.sigmoid(tf.matmul(inputs, self.w) + self.b)\n        \n        # Apply gating: multiply input by gate values\n        # First, we need to match dimensions\n        if inputs.shape[-1] != self.units:\n            # Project input to match gate dimensions\n            inputs_projected = tf.layers.dense(inputs, self.units)\n            output = inputs_projected * gate\n        else:\n            output = inputs * gate\n        \n        return output\n    \n    def get_config(self):\n        """Enable layer serialization."""\n        config = super().get_config()\n        config.update({"units": self.units})\n        return config' }
]
}
};
