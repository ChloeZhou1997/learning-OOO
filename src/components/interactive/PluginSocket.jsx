import React, { useState } from 'react'
import './PluginSocket.css'

const PluginSocket = () => {
  const [activeProvider, setActiveProvider] = useState(null)
  const [dataRequested, setDataRequested] = useState(false)
  const [animating, setAnimating] = useState(false)

  const providers = [
    {
      id: 'database',
      name: 'DatabaseProvider',
      icon: '🗄️',
      color: '#007bff',
      implementation: `class DatabaseProvider implements IDataProvider {
  getData(query) {
    // Connect to SQL database
    const connection = db.connect()
    const result = connection.query(query)
    return result.toJSON()
  }
}`
    },
    {
      id: 'api',
      name: 'ApiProvider',
      icon: '🌐',
      color: '#28a745',
      implementation: `class ApiProvider implements IDataProvider {
  getData(query) {
    // Fetch from REST API
    const response = fetch('/api/data?q=' + query)
    return response.json()
  }
}`
    },
    {
      id: 'file',
      name: 'FileProvider',
      icon: '📁',
      color: '#ffc107',
      implementation: `class FileProvider implements IDataProvider {
  getData(query) {
    // Read from local file
    const file = fs.readFile(query + '.json')
    return JSON.parse(file)
  }
}`
    },
    {
      id: 'cache',
      name: 'CacheProvider',
      icon: '⚡',
      color: '#dc3545',
      implementation: `class CacheProvider implements IDataProvider {
  getData(query) {
    // Check memory cache first
    if (cache.has(query)) {
      return cache.get(query)
    }
    return null
  }
}`
    }
  ]

  const interfaceDefinition = `interface IDataProvider {
  getData(query: string): Promise<any>
}`

  const systemCode = `class DataService {
  private provider: IDataProvider
  
  constructor(provider: IDataProvider) {
    this.provider = provider
  }
  
  async fetchData(query: string) {
    // Works with ANY provider that implements IDataProvider
    return await this.provider.getData(query)
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
      database: { id: 1, name: 'John Doe', role: 'Admin', source: 'PostgreSQL' },
      api: { users: [{ id: 1, name: 'John' }], timestamp: Date.now(), source: 'REST API' },
      file: { config: { theme: 'dark', lang: 'en' }, source: 'config.json' },
      cache: { cachedAt: Date.now() - 5000, data: { quick: 'response' }, source: 'Memory Cache' }
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
        <p>This interface defines what any data provider must implement</p>
      </div>

      <div className="plugin-system">
        <div className="providers-panel">
          <h3>2. Available Providers</h3>
          <p>Drag any provider to the socket - they all implement IDataProvider</p>
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
              <h4>DataService</h4>
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
                    <span className="socket-label">IDataProvider</span>
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
                {dataRequested ? 'Fetching Data...' : 'Test Data Fetch'}
              </button>
              
              {dataRequested && (
                <div className="data-result">
                  <h4>Data Retrieved:</h4>
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
      </div>
    </div>
  )
}

export default PluginSocket