import React, { useState } from 'react'
import './PluginSocket.css'

const PluginSocket = () => {
  const [activeProvider, setActiveProvider] = useState(null)
  const [dataRequested, setDataRequested] = useState(false)
  const [animating, setAnimating] = useState(false)

  const providers = [
    {
      id: 'openai',
      name: 'OpenAIChain',
      icon: '🤖',
      color: '#007bff',
      implementation: `class OpenAIChain implements Runnable {
  async invoke(input: any): Promise<any> {
    // Call OpenAI API
    const response = await openai.createChatCompletion({
      model: "gpt-4",
      messages: [{role: "user", content: input.text}]
    })
    return { text: response.choices[0].message.content }
  }
  
  async stream(input: any): AsyncGenerator<any> {
    // Stream responses for real-time output
    const stream = await openai.createChatCompletionStream({...})
    for await (const chunk of stream) {
      yield { token: chunk.choices[0].delta.content }
    }
  }
}`
    },
    {
      id: 'anthropic',
      name: 'AnthropicChain',
      icon: '🧠',
      color: '#28a745',
      implementation: `class AnthropicChain implements Runnable {
  async invoke(input: any): Promise<any> {
    // Call Claude API
    const response = await anthropic.completions.create({
      model: "claude-3-opus",
      prompt: input.text,
      max_tokens: 1000
    })
    return { text: response.completion }
  }
  
  async batch(inputs: any[]): Promise<any[]> {
    // Efficient batch processing
    return Promise.all(inputs.map(input => this.invoke(input)))
  }
}`
    },
    {
      id: 'huggingface',
      name: 'HuggingFaceChain',
      icon: '🤗',
      color: '#ffc107',
      implementation: `class HuggingFaceChain implements Runnable {
  constructor(private model: string) {
    this.pipeline = pipeline('text-generation', model)
  }
  
  async invoke(input: any): Promise<any> {
    // Use local Transformers model
    const result = await this.pipeline(input.text, {
      max_length: 200,
      temperature: 0.7
    })
    return { text: result[0].generated_text }
  }
  
  getConfig(): RunnableConfig {
    return { model: this.model, type: "huggingface" }
  }
}`
    },
    {
      id: 'custom',
      name: 'CustomLLMChain',
      icon: '⚡',
      color: '#dc3545',
      implementation: `class CustomLLMChain implements Runnable {
  async invoke(input: any): Promise<any> {
    // Your custom LLM logic here
    // Could wrap proprietary models, fine-tuned models, etc.
    const processed = await this.preprocess(input)
    const result = await this.customModel.generate(processed)
    return this.postprocess(result)
  }
  
  // Implements retry logic for robustness
  async invokeWithRetry(input: any, retries = 3): Promise<any> {
    for (let i = 0; i < retries; i++) {
      try {
        return await this.invoke(input)
      } catch (e) {
        if (i === retries - 1) throw e
        await new Promise(r => setTimeout(r, 2 ** i * 1000))
      }
    }
  }
}`
    }
  ]

  const interfaceDefinition = `// LangChain's Runnable Protocol
interface Runnable {
  invoke(input: any): Promise<any>
  stream?(input: any): AsyncGenerator<any>
  batch?(inputs: any[]): Promise<any[]>
  getConfig?(): RunnableConfig
}`

  const systemCode = `// LangChain's Chain Composition
class SequentialChain {
  private chains: Runnable[]
  
  constructor(...chains: Runnable[]) {
    this.chains = chains
  }
  
  async invoke(input: any) {
    // Works with ANY chain that implements Runnable
    let result = input
    for (const chain of this.chains) {
      result = await chain.invoke(result)
    }
    return result
  }
  
  // Supports the pipe operator: chain1 | chain2 | chain3
  pipe(other: Runnable): SequentialChain {
    return new SequentialChain(...this.chains, other)
  }
}`

  const handleProviderDrop = (providerId) => {
    setAnimating(true)
    setActiveProvider(providerId)
    setTimeout(() => {
      setAnimating(false)
    }, 600)
  }

  const handleDataRequest = () => {
    if (activeProvider) {
      setDataRequested(true)
      setTimeout(() => {
        setDataRequested(false)
      }, 2000)
    }
  }

  const getProviderData = () => {
    const provider = providers.find(p => p.id === activeProvider)
    if (!provider) return null

    const sampleData = {
      openai: { 
        text: "Based on my analysis, the key insight is that modular design enables flexibility...",
        model: "gpt-4",
        tokens: 127,
        provider: "OpenAI"
      },
      anthropic: { 
        text: "The architecture demonstrates several important principles: separation of concerns...",
        model: "claude-3-opus",
        tokens: 95,
        provider: "Anthropic"
      },
      huggingface: { 
        text: "Analysis complete. The system shows strong modularity with clear interfaces...",
        model: "meta-llama/Llama-2-7b",
        tokens: 68,
        provider: "HuggingFace"
      },
      custom: { 
        text: "Custom model output: Interface-based design allows seamless integration...",
        model: "proprietary-model-v2",
        tokens: 45,
        provider: "Custom"
      }
    }

    return sampleData[provider.id]
  }

  return (
    <div className="plugin-socket-container">
      <div className="interface-definition">
        <h3>1. Define the Contract (Interface)</h3>
        <pre>
          <code>{interfaceDefinition}</code>
        </pre>
        <p>This is the actual interface that all LangChain components implement!</p>
        <div className="framework-connection">
          <p className="insight">🔍 <strong>Real-world parallel:</strong> This is exactly how modern frameworks work!</p>
          <ul>
            <li><strong>PyTorch:</strong> <code>nn.Module</code> interface that all neural network layers must implement</li>
            <li><strong>TensorFlow:</strong> <code>tf.keras.layers.Layer</code> base interface for all layers</li>
            <li><strong>LangChain:</strong> <code>BaseChain</code> interface for all chain implementations</li>
            <li><strong>LangGraph:</strong> <code>Node</code> and <code>Edge</code> interfaces for graph components</li>
          </ul>
        </div>
      </div>

      <div className="plugin-system">
        <div className="providers-panel">
          <h3>2. Available Providers</h3>
          <p>Drag any LLM chain to the socket - they all implement the Runnable interface</p>
          <p className="framework-hint">💡 In ML frameworks, these could be: DataLoaders, Optimizers, Loss Functions, or Model Architectures!</p>
          <div className="providers-list">
            {providers.map(provider => (
              <div
                key={provider.id}
                className={`provider-card ${activeProvider === provider.id ? 'active' : ''}`}
                draggable
                onDragEnd={() => handleProviderDrop(provider.id)}
                onClick={() => handleProviderDrop(provider.id)}
                style={{ borderColor: provider.color }}
              >
                <div className="provider-icon" style={{ backgroundColor: provider.color }}>
                  {provider.icon}
                </div>
                <div className="provider-info">
                  <h4>{provider.name}</h4>
                  <p>Click or drag to connect</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="system-panel">
          <h3>3. System with Plugin Socket</h3>
          <div className="system-diagram">
            <div className="data-service">
              <h4>LangChain Sequential Chain</h4>
              <pre>
                <code>{systemCode}</code>
              </pre>
            </div>
            
            <div className={`socket ${activeProvider ? 'connected' : ''} ${animating ? 'animating' : ''}`}>
              <div className="socket-visual">
                <div className="socket-slot">
                  {activeProvider ? (
                    <div 
                      className="connected-provider"
                      style={{ 
                        backgroundColor: providers.find(p => p.id === activeProvider)?.color 
                      }}
                    >
                      {providers.find(p => p.id === activeProvider)?.icon}
                    </div>
                  ) : (
                    <span className="socket-label">Runnable</span>
                  )}
                </div>
              </div>
              <p className="socket-status">
                {activeProvider 
                  ? `Connected: ${providers.find(p => p.id === activeProvider)?.name}`
                  : 'No provider connected'}
              </p>
            </div>
          </div>

          {activeProvider && (
            <div className="test-section">
              <button 
                className="test-btn"
                onClick={handleDataRequest}
                disabled={dataRequested}
              >
                {dataRequested ? 'Processing...' : 'Test LLM Chain'}
              </button>
              
              {dataRequested && (
                <div className="data-result">
                  <h4>LLM Response:</h4>
                  <pre>
                    <code>{JSON.stringify(getProviderData(), null, 2)}</code>
                  </pre>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {activeProvider && (
        <div className="implementation-view">
          <h3>4. Current Provider Implementation</h3>
          <pre>
            <code>{providers.find(p => p.id === activeProvider)?.implementation}</code>
          </pre>
        </div>
      )}

      <div className="benefits-section">
        <h4>Benefits of Interface-Based Design:</h4>
        <div className="benefits-grid">
          <div className="benefit">
            <span className="benefit-icon">🔄</span>
            <strong>Flexibility</strong>
            <p>Swap implementations without changing system code</p>
          </div>
          <div className="benefit">
            <span className="benefit-icon">🧪</span>
            <strong>Testability</strong>
            <p>Easy to create mock implementations for testing</p>
          </div>
          <div className="benefit">
            <span className="benefit-icon">📦</span>
            <strong>Extensibility</strong>
            <p>Add new providers without modifying existing code</p>
          </div>
          <div className="benefit">
            <span className="benefit-icon">🎯</span>
            <strong>Decoupling</strong>
            <p>System depends on interface, not concrete classes</p>
          </div>
        </div>
        
        <div className="framework-design-challenge">
          <h4>🏆 Framework Design Challenge:</h4>
          <p>This plugin pattern is the foundation of extensible frameworks! Consider:</p>
          <ul>
            <li><strong>PyTorch:</strong> How would you design a plugin system for custom optimizers? (Hint: <code>torch.optim.Optimizer</code>)</li>
            <li><strong>TensorFlow:</strong> How could you create pluggable data pipelines? (Think <code>tf.data.Dataset</code>)</li>
            <li><strong>LangChain:</strong> Design an interface for swappable LLM providers (OpenAI, Anthropic, etc.)</li>
            <li><strong>LangGraph:</strong> Create a plugin system for custom graph traversal algorithms</li>
          </ul>
          <p className="think-prompt">
            🤔 <strong>Think about it:</strong> What interface would you define to make your framework both powerful and extensible? How would you balance simplicity with flexibility?
          </p>
        </div>
      </div>
    </div>
  )
}

export default PluginSocket