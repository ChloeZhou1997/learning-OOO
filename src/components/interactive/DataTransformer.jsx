import React, { useState } from 'react'
import './DataTransformer.css'

const DataTransformer = () => {
  const [activeObject, setActiveObject] = useState('person')
  const [transformStep, setTransformStep] = useState('object')
  const [showMapping, setShowMapping] = useState(false)

  const sampleObjects = {
    person: {
      name: 'Person',
      data: {
        name: 'Alice Johnson',
        age: 28,
        email: 'alice@example.com',
        skills: ['JavaScript', 'React', 'Node.js'],
        active: true
      }
    },
    product: {
      name: 'Product',
      data: {
        id: 'PRD-001',
        name: 'Laptop',
        price: 999.99,
        inStock: true,
        specs: {
          cpu: 'Intel i7',
          ram: '16GB',
          storage: '512GB SSD'
        }
      }
    },
    order: {
      name: 'Order',
      data: {
        orderId: 'ORD-12345',
        customerId: 'CUST-789',
        items: [
          { productId: 'PRD-001', quantity: 2, price: 999.99 },
          { productId: 'PRD-002', quantity: 1, price: 49.99 }
        ],
        total: 2049.97,
        status: 'processing'
      }
    }
  }

  const getJsonRepresentation = (obj) => {
    return JSON.stringify(obj, null, 2)
  }

  const getSerializationSteps = () => {
    switch(transformStep) {
      case 'object':
        return {
          title: 'Step 1: Object in Memory',
          description: 'The object exists in memory with its properties and values',
          visual: 'object'
        }
      case 'serialize':
        return {
          title: 'Step 2: Serialization Process',
          description: 'Converting object properties to JSON key-value pairs',
          visual: 'transforming'
        }
      case 'json':
        return {
          title: 'Step 3: JSON String',
          description: 'The object is now a portable JSON string that can be stored or transmitted',
          visual: 'json'
        }
      default:
        return {}
    }
  }

  const renderObjectVisual = () => {
    const currentObject = sampleObjects[activeObject]
    const step = getSerializationSteps()

    if (step.visual === 'object') {
      return (
        <div className="object-representation">
          <div className="object-header">
            <span className="object-type">{currentObject.name} Object</span>
            <span className="memory-address">@memory: 0x7fff5fbff8c0</span>
          </div>
          <div className="object-properties">
            {Object.entries(currentObject.data).map(([key, value]) => (
              <div key={key} className="property-row">
                <span className="property-key">{key}:</span>
                <span className="property-value">
                  {typeof value === 'object' ? '[Object]' : String(value)}
                </span>
              </div>
            ))}
          </div>
        </div>
      )
    } else if (step.visual === 'transforming') {
      return (
        <div className="transformation-visual">
          <div className="transform-animation">
            <div className="object-side">
              <h4>Object Properties</h4>
              {Object.entries(currentObject.data).slice(0, 3).map(([key, value]) => (
                <div key={key} className="transform-item">
                  <span>{key}: {typeof value === 'object' ? '{...}' : String(value)}</span>
                  <span className="arrow">→</span>
                </div>
              ))}
            </div>
            <div className="json-side">
              <h4>JSON Format</h4>
              {Object.entries(currentObject.data).slice(0, 3).map(([key, value]) => (
                <div key={key} className="json-item">
                  <span>"{key}": {typeof value === 'string' ? `"${value}"` : String(value)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )
    } else {
      return (
        <div className="json-representation">
          <div className="json-header">
            <span className="json-label">JSON String</span>
            <button className="copy-btn" onClick={() => {
              navigator.clipboard.writeText(getJsonRepresentation(currentObject.data))
            }}>
              📋 Copy
            </button>
          </div>
          <pre className="json-content">
            <code>{getJsonRepresentation(currentObject.data)}</code>
          </pre>
        </div>
      )
    }
  }

  const runFullTransformation = () => {
    setTransformStep('object')
    setShowMapping(false)
    
    setTimeout(() => {
      setTransformStep('serialize')
      setShowMapping(true)
    }, 1000)
    
    setTimeout(() => {
      setTransformStep('json')
    }, 2500)
  }

  return (
    <div className="data-transformer-container">
      <div className="transformer-header">
        <h3>Object to JSON Serialization</h3>
        <p>See how objects are transformed into portable JSON format</p>
      </div>

      <div className="object-selector">
        {Object.entries(sampleObjects).map(([key, obj]) => (
          <button
            key={key}
            className={`object-btn ${activeObject === key ? 'active' : ''}`}
            onClick={() => {
              setActiveObject(key)
              setTransformStep('object')
              setShowMapping(false)
            }}
          >
            {obj.name}
          </button>
        ))}
      </div>

      <div className="transformation-area">
        <div className="step-indicator">
          <div className={`step ${transformStep === 'object' ? 'active' : ''}`}>
            <span className="step-number">1</span>
            <span className="step-label">Object</span>
          </div>
          <div className="step-line"></div>
          <div className={`step ${transformStep === 'serialize' ? 'active' : ''}`}>
            <span className="step-number">2</span>
            <span className="step-label">Serialize</span>
          </div>
          <div className="step-line"></div>
          <div className={`step ${transformStep === 'json' ? 'active' : ''}`}>
            <span className="step-number">3</span>
            <span className="step-label">JSON</span>
          </div>
        </div>

        <div className="visual-area">
          <h4>{getSerializationSteps().title}</h4>
          <p>{getSerializationSteps().description}</p>
          {renderObjectVisual()}
        </div>

        <div className="controls">
          <button 
            className="control-btn"
            onClick={() => setTransformStep('object')}
            disabled={transformStep === 'object'}
          >
            ← Previous
          </button>
          <button 
            className="control-btn primary"
            onClick={runFullTransformation}
          >
            ▶ Run Full Transformation
          </button>
          <button 
            className="control-btn"
            onClick={() => {
              if (transformStep === 'object') {
                setTransformStep('serialize')
                setShowMapping(true)
              } else if (transformStep === 'serialize') {
                setTransformStep('json')
              }
            }}
            disabled={transformStep === 'json'}
          >
            Next →
          </button>
        </div>
      </div>

      {showMapping && transformStep === 'serialize' && (
        <div className="mapping-rules">
          <h4>Serialization Rules:</h4>
          <ul>
            <li>Object properties become JSON keys (as strings)</li>
            <li>String values are wrapped in double quotes</li>
            <li>Numbers and booleans remain as literals</li>
            <li>Arrays and nested objects maintain their structure</li>
            <li>Functions and undefined values are omitted</li>
          </ul>
        </div>
      )}

      <div className="use-cases">
        <h4>Common Use Cases:</h4>
        <div className="use-case-grid">
          <div className="use-case">
            <span className="icon">💾</span>
            <strong>Persistence</strong>
            <p>Save object state to files or databases</p>
          </div>
          <div className="use-case">
            <span className="icon">🌐</span>
            <strong>API Communication</strong>
            <p>Send/receive data between client and server</p>
          </div>
          <div className="use-case">
            <span className="icon">📱</span>
            <strong>Cross-Platform</strong>
            <p>Share data between different systems</p>
          </div>
          <div className="use-case">
            <span className="icon">🔄</span>
            <strong>State Management</strong>
            <p>Store and restore application state</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DataTransformer