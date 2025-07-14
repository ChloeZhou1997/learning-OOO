import PatternPlayground from '../../components/interactive/PatternPlayground';

export default {
id: 'chapter-14',
navTitle: '14. Design Patterns',
title: 'Chapter 14: Common Design Patterns',
learningObjectives: [
  'Understand the concept and value of design patterns',
  'Master essential creational, structural, and behavioral patterns',
  'Know when and how to apply patterns',
  'Recognize patterns in existing code'
],
content: `
<p>Design patterns are proven solutions to recurring problems. This chapter explores how modern frameworks like PyTorch, TensorFlow, and LangGraph implement these patterns at scale, showing you how the same principles that govern simple examples power systems used by millions.</p>

<h2>1. Design Patterns in Production Frameworks</h2>
<p>The patterns you'll learn here are actively used in:</p>
<ul>
<li><strong>PyTorch Distributed:</strong> Singleton for process groups, Strategy for communication backends</li>
<li><strong>TensorFlow:</strong> Factory for operations, Decorator for layer wrappers</li>
<li><strong>LangGraph:</strong> State machines, Command pattern for workflow control</li>
<li><strong>LangChain:</strong> Chain of Responsibility, Template Method for agents</li>
</ul>

<h2>2. Creational Patterns in ML Frameworks</h2>

<h3>Singleton Pattern: PyTorch Process Groups</h3>
<p>PyTorch's distributed training uses Singleton for managing global communication state:</p>
<pre><code>import torch.distributed as dist

class ProcessGroup:
    """Singleton managing distributed communication across GPUs/nodes."""
    _instance = None
    _initialized = False
    
    def __new__(cls):
        if cls._instance is None:
            cls._instance = super().__new__(cls)
        return cls._instance
    
    def init_process_group(self, backend='nccl', rank=None, world_size=None):
        if not self._initialized:
            dist.init_process_group(
                backend=backend,
                rank=rank,
                world_size=world_size
            )
            self._initialized = True
            self.rank = dist.get_rank()
            self.world_size = dist.get_world_size()
    
    def all_reduce(self, tensor):
        """Synchronize gradients across all processes."""
        if self._initialized:
            dist.all_reduce(tensor, op=dist.ReduceOp.SUM)
            tensor.div_(self.world_size)

# Global singleton instance
process_group = ProcessGroup()

# Used in distributed training
def train_distributed(model):
    process_group.init_process_group()
    for batch in dataloader:
        loss = model(batch)
        loss.backward()
        # Synchronize gradients across all GPUs
        for param in model.parameters():
            process_group.all_reduce(param.grad)</code></pre>

<h3>Factory Pattern: TensorFlow Operations</h3>
<p>TensorFlow uses factories extensively for creating ops with different implementations:</p>
<pre><code>class OpFactory:
    """Factory for creating TensorFlow operations."""
    
    @staticmethod
    def create_conv_op(input_tensor, filters, kernel_size, device=None):
        """Factory method that returns device-specific implementations."""
        if device == "TPU":
            return TPUConv2D(filters, kernel_size)
        elif device == "GPU" and tf.test.is_gpu_available():
            return CudnnConv2D(filters, kernel_size)
        else:
            return CPUConv2D(filters, kernel_size)

class Conv2DFactory:
    """More sophisticated factory with registration."""
    _implementations = {}
    
    @classmethod
    def register(cls, device_type, implementation_class):
        cls._implementations[device_type] = implementation_class
    
    @classmethod
    def create(cls, device_type, **kwargs):
        impl_class = cls._implementations.get(device_type)
        if not impl_class:
            raise ValueError(f"No implementation for {device_type}")
        return impl_class(**kwargs)

# Registration happens at module load
Conv2DFactory.register("GPU", CudnnConv2D)
Conv2DFactory.register("TPU", TPUConv2D)
Conv2DFactory.register("CPU", CPUConv2D)</code></pre>

<h3>Builder Pattern: LangGraph Workflow Construction</h3>
<p>LangGraph uses builder pattern for constructing complex state machines:</p>
<pre><code>from langgraph.graph import StateGraph, END

class WorkflowBuilder:
    """Builder for complex LangGraph workflows."""
    
    def __init__(self):
        self.graph = StateGraph()
        self.nodes = {}
        self.edges = []
        self.conditional_edges = []
    
    def add_node(self, name, func):
        """Add a processing node."""
        self.nodes[name] = func
        self.graph.add_node(name, func)
        return self
    
    def add_edge(self, from_node, to_node):
        """Add a direct transition."""
        self.edges.append((from_node, to_node))
        self.graph.add_edge(from_node, to_node)
        return self
    
    def add_conditional_edge(self, from_node, condition_func, edge_map):
        """Add conditional routing."""
        self.conditional_edges.append((from_node, condition_func, edge_map))
        self.graph.add_conditional_edges(from_node, condition_func, edge_map)
        return self
    
    def set_entry_point(self, node):
        """Set the starting node."""
        self.graph.set_entry_point(node)
        return self
    
    def compile(self):
        """Build the final workflow."""
        return self.graph.compile()

# Usage - building a complex AI agent workflow
workflow = (WorkflowBuilder()
    .set_entry_point("analyze")
    .add_node("analyze", analyze_query)
    .add_node("search", search_documents)
    .add_node("summarize", summarize_results)
    .add_node("generate", generate_response)
    .add_conditional_edge("analyze", 
        route_based_on_query_type,
        {
            "search_needed": "search",
            "direct_answer": "generate"
        })
    .add_edge("search", "summarize")
    .add_edge("summarize", "generate")
    .add_edge("generate", END)
    .compile()
)</code></pre>

<h2>3. Structural Patterns in Deep Learning</h2>

<h3>Adapter Pattern: PyTorch DataLoader for Different Formats</h3>
<p>PyTorch uses adapters to handle various data sources uniformly:</p>
<pre><code>from torch.utils.data import Dataset, DataLoader

class DatasetAdapter(Dataset):
    """Base adapter for different data sources."""
    
    def __init__(self, data_source):
        self.data_source = data_source
    
    def __len__(self):
        raise NotImplementedError
    
    def __getitem__(self, idx):
        raise NotImplementedError

class HuggingFaceAdapter(DatasetAdapter):
    """Adapts HuggingFace datasets to PyTorch."""
    
    def __len__(self):
        return len(self.data_source)
    
    def __getitem__(self, idx):
        item = self.data_source[idx]
        # Convert HF format to PyTorch tensors
        return {
            'input_ids': torch.tensor(item['input_ids']),
            'labels': torch.tensor(item['labels'])
        }

class TFRecordAdapter(DatasetAdapter):
    """Adapts TensorFlow TFRecord files to PyTorch."""
    
    def __init__(self, tfrecord_path):
        import tensorflow as tf
        self.dataset = tf.data.TFRecordDataset(tfrecord_path)
        self.examples = list(self.dataset)
    
    def __len__(self):
        return len(self.examples)
    
    def __getitem__(self, idx):
        # Parse TFRecord and convert to PyTorch
        example = tf.train.Example()
        example.ParseFromString(self.examples[idx].numpy())
        # Convert to PyTorch format
        return self._parse_example(example)</code></pre>

<h3>Decorator Pattern: Keras Layer Wrappers</h3>
<p>Keras extensively uses decorators to add functionality to layers:</p>
<pre><code>class LayerWrapper(tf.keras.layers.Layer):
    """Base decorator for wrapping layers with additional functionality."""
    
    def __init__(self, layer, **kwargs):
        super().__init__(**kwargs)
        self.layer = layer
    
    def build(self, input_shape):
        self.layer.build(input_shape)
        super().build(input_shape)

class DropoutWrapper(LayerWrapper):
    """Adds dropout to any layer."""
    
    def __init__(self, layer, rate=0.5):
        super().__init__(layer)
        self.rate = rate
        self.dropout = tf.keras.layers.Dropout(rate)
    
    def call(self, inputs, training=None):
        x = self.layer(inputs)
        return self.dropout(x, training=training)

class NormalizationWrapper(LayerWrapper):
    """Adds batch normalization to any layer."""
    
    def __init__(self, layer):
        super().__init__(layer)
        self.batch_norm = tf.keras.layers.BatchNormalization()
    
    def call(self, inputs, training=None):
        x = self.layer(inputs)
        return self.batch_norm(x, training=training)

# Composing decorators
base_layer = tf.keras.layers.Dense(128, activation='relu')
wrapped = DropoutWrapper(
    NormalizationWrapper(base_layer),
    rate=0.3
)</code></pre>

<h2>4. Behavioral Patterns in AI Systems</h2>

<h3>Observer Pattern: TensorBoard Integration</h3>
<p>Training monitoring uses observer pattern extensively:</p>
<pre><code>class TrainingObserver:
    """Base class for training observers."""
    
    def on_epoch_start(self, epoch): pass
    def on_epoch_end(self, epoch, logs): pass
    def on_batch_start(self, batch): pass
    def on_batch_end(self, batch, logs): pass

class TensorBoardObserver(TrainingObserver):
    """Logs metrics to TensorBoard."""
    
    def __init__(self, log_dir):
        self.writer = tf.summary.create_file_writer(log_dir)
    
    def on_epoch_end(self, epoch, logs):
        with self.writer.as_default():
            for metric, value in logs.items():
                tf.summary.scalar(metric, value, step=epoch)

class ModelCheckpointObserver(TrainingObserver):
    """Saves model checkpoints."""
    
    def __init__(self, filepath, save_best_only=True):
        self.filepath = filepath
        self.save_best_only = save_best_only
        self.best_loss = float('inf')
    
    def on_epoch_end(self, epoch, logs):
        current_loss = logs.get('val_loss', logs.get('loss'))
        if not self.save_best_only or current_loss < self.best_loss:
            self.best_loss = current_loss
            torch.save(model.state_dict(), self.filepath)

class TrainingSubject:
    """Manages training observers."""
    
    def __init__(self):
        self.observers = []
    
    def attach(self, observer):
        self.observers.append(observer)
    
    def notify_epoch_end(self, epoch, logs):
        for observer in self.observers:
            observer.on_epoch_end(epoch, logs)</code></pre>

<h3>Strategy Pattern: LangChain Retrieval Strategies</h3>
<p>LangChain uses strategy pattern for different retrieval approaches:</p>
<pre><code>from abc import ABC, abstractmethod

class RetrievalStrategy(ABC):
    """Abstract strategy for document retrieval."""
    
    @abstractmethod
    def retrieve(self, query: str, k: int = 5):
        pass

class DenseRetrievalStrategy(RetrievalStrategy):
    """Dense vector similarity search."""
    
    def __init__(self, embeddings, vectorstore):
        self.embeddings = embeddings
        self.vectorstore = vectorstore
    
    def retrieve(self, query: str, k: int = 5):
        query_embedding = self.embeddings.embed_query(query)
        return self.vectorstore.similarity_search_by_vector(
            query_embedding, k=k
        )

class HybridRetrievalStrategy(RetrievalStrategy):
    """Combines dense and sparse retrieval."""
    
    def __init__(self, dense_retriever, sparse_retriever, alpha=0.5):
        self.dense_retriever = dense_retriever
        self.sparse_retriever = sparse_retriever
        self.alpha = alpha
    
    def retrieve(self, query: str, k: int = 5):
        dense_results = self.dense_retriever.retrieve(query, k*2)
        sparse_results = self.sparse_retriever.retrieve(query, k*2)
        # Merge and rerank results
        return self._merge_results(dense_results, sparse_results, k)

class MultiQueryRetrievalStrategy(RetrievalStrategy):
    """Generates multiple queries for better recall."""
    
    def __init__(self, llm, base_retriever):
        self.llm = llm
        self.base_retriever = base_retriever
    
    def retrieve(self, query: str, k: int = 5):
        # Generate alternative queries
        prompt = f"Generate 3 alternative versions of: {query}"
        alternatives = self.llm.generate(prompt).split('\n')
        
        # Retrieve for all queries
        all_docs = []
        for q in [query] + alternatives:
            all_docs.extend(self.base_retriever.retrieve(q, k))
        
        # Deduplicate and return top k
        return self._deduplicate(all_docs)[:k]

# Context class using strategies
class RAGPipeline:
    def __init__(self, retrieval_strategy: RetrievalStrategy):
        self.retrieval_strategy = retrieval_strategy
    
    def answer_question(self, question: str):
        # Strategy pattern in action
        relevant_docs = self.retrieval_strategy.retrieve(question)
        context = "\n".join([doc.content for doc in relevant_docs])
        return self.llm.generate(f"Context: {context}\nQuestion: {question}")</code></pre>

<h2>5. Real-World Pattern Applications</h2>
<ul>
<li><strong>PyTorch Lightning:</strong> Template Method pattern for training loops</li>
<li><strong>Hugging Face Transformers:</strong> Factory pattern for model creation</li>
<li><strong>Ray:</strong> Actor pattern for distributed computing</li>
<li><strong>MLflow:</strong> Registry pattern for model management</li>
</ul>

<blockquote><strong>Framework Wisdom:</strong> The best frameworks don't invent new patterns - they apply proven patterns to new domains. When building your own systems, start with established patterns and adapt them to your specific needs.</blockquote>
`,
interactive: {
title: 'Pattern Playground',
description: 'Discover the design patterns that power modern ML frameworks! See how PyTorch uses Singleton for distributed training, how TensorFlow\'s Factory creates device-specific ops, how LangChain\'s Strategy pattern enables different retrieval methods, and how LangGraph\'s Builder constructs complex workflows. These patterns are the building blocks of every successful framework - master them to build your own!',
component: PatternPlayground
},
quiz: {
title: 'Chapter 14 Quiz',
questions: [
{ type: 'mcq', question: 'Which pattern does PyTorch use for managing distributed training process groups?', options: ['Factory', 'Singleton', 'Observer', 'Strategy'], answerIndex: 1 },
{ type: 'mcq', question: 'What pattern does LangGraph\'s workflow construction API demonstrate?', options: ['Adapter', 'Decorator', 'Builder', 'Singleton'], answerIndex: 2 },
{ type: 'mcq', question: 'Keras layer wrappers like DropoutWrapper and NormalizationWrapper implement which pattern?', options: ['Strategy', 'Decorator', 'Factory', 'Observer'], answerIndex: 1 },
{ type: 'mcq', question: 'LangChain\'s different retrieval strategies (Dense, Hybrid, MultiQuery) demonstrate which pattern?', options: ['Factory', 'Observer', 'Strategy', 'Adapter'], answerIndex: 2 },
{ type: 'fill-in', question: 'TensorBoard\'s integration with training loops uses the ________ pattern to monitor training progress.', answer: 'Observer' },
{ type: 'fill-in', question: 'PyTorch\'s DatasetAdapter classes that handle different data formats implement the ________ pattern.', answer: 'Adapter' },
{ type: 'fill-in', question: 'TensorFlow\'s device-specific operation creation (GPU, TPU, CPU) uses the ________ pattern.', answer: 'Factory' },
{ type: 'coding-challenge', question: 'Implement a simplified version of LangChain\'s Strategy pattern for different embedding models. Create an abstract EmbeddingStrategy and two concrete implementations (OpenAIEmbeddings and LocalEmbeddings) that can be swapped at runtime.', modelAnswer: 'from abc import ABC, abstractmethod\\nimport numpy as np\\n\\nclass EmbeddingStrategy(ABC):\\n    """Abstract strategy for text embeddings."""\\n    \\n    @abstractmethod\\n    def embed_text(self, text: str) -> np.ndarray:\\n        """Convert text to embedding vector."""\\n        pass\\n    \\n    @abstractmethod\\n    def embed_batch(self, texts: list[str]) -> np.ndarray:\\n        """Convert multiple texts to embeddings."""\\n        pass\\n\\nclass OpenAIEmbeddings(EmbeddingStrategy):\\n    """Strategy for OpenAI embeddings."""\\n    \\n    def __init__(self, api_key: str, model="text-embedding-ada-002"):\\n        self.api_key = api_key\\n        self.model = model\\n        # In real implementation, initialize OpenAI client\\n    \\n    def embed_text(self, text: str) -> np.ndarray:\\n        # Simulate API call\\n        print(f"Calling OpenAI API for: {text[:50]}...")\\n        # Return mock embedding\\n        return np.random.randn(1536)  # Ada-002 dimension\\n    \\n    def embed_batch(self, texts: list[str]) -> np.ndarray:\\n        # Batch API call for efficiency\\n        print(f"Batch embedding {len(texts)} texts via OpenAI")\\n        return np.random.randn(len(texts), 1536)\\n\\nclass LocalEmbeddings(EmbeddingStrategy):\\n    """Strategy for local embeddings using sentence-transformers."""\\n    \\n    def __init__(self, model_name="all-MiniLM-L6-v2"):\\n        self.model_name = model_name\\n        # In real implementation, load local model\\n        print(f"Loading local model: {model_name}")\\n    \\n    def embed_text(self, text: str) -> np.ndarray:\\n        # Simulate local embedding\\n        print(f"Computing local embedding for: {text[:50]}...")\\n        # Return mock embedding\\n        return np.random.randn(384)  # MiniLM dimension\\n    \\n    def embed_batch(self, texts: list[str]) -> np.ndarray:\\n        print(f"Batch embedding {len(texts)} texts locally")\\n        return np.random.randn(len(texts), 384)\\n\\nclass VectorStore:\\n    """Context class that uses embedding strategies."""\\n    \\n    def __init__(self, embedding_strategy: EmbeddingStrategy):\\n        self.embedding_strategy = embedding_strategy\\n        self.vectors = []\\n        self.documents = []\\n    \\n    def add_document(self, document: str):\\n        """Add document using current embedding strategy."""\\n        embedding = self.embedding_strategy.embed_text(document)\\n        self.vectors.append(embedding)\\n        self.documents.append(document)\\n    \\n    def search(self, query: str, k: int = 5):\\n        """Search using current embedding strategy."""\\n        query_embedding = self.embedding_strategy.embed_text(query)\\n        # Compute similarities (simplified)\\n        similarities = [np.dot(query_embedding, vec) for vec in self.vectors]\\n        # Return top k documents\\n        top_indices = np.argsort(similarities)[-k:]\\n        return [self.documents[i] for i in top_indices]\\n    \\n    def change_strategy(self, new_strategy: EmbeddingStrategy):\\n        """Switch embedding strategy at runtime."""\\n        print("Re-embedding all documents with new strategy...")\\n        self.embedding_strategy = new_strategy\\n        # Re-embed existing documents\\n        self.vectors = []\\n        for doc in self.documents:\\n            embedding = self.embedding_strategy.embed_text(doc)\\n            self.vectors.append(embedding)\\n\\n# Usage example\\nif __name__ == "__main__":\\n    # Start with OpenAI embeddings\\n    vectorstore = VectorStore(OpenAIEmbeddings("fake-api-key"))\\n    \\n    # Add documents\\n    vectorstore.add_document("Python is a programming language")\\n    vectorstore.add_document("Machine learning with PyTorch")\\n    \\n    # Search\\n    results = vectorstore.search("coding in Python")\\n    \\n    # Switch to local embeddings at runtime\\n    vectorstore.change_strategy(LocalEmbeddings())\\n    \\n    # Continue using with new strategy\\n    vectorstore.add_document("LangChain for LLM applications")\\n    results = vectorstore.search("language models")' }
]
}
};
