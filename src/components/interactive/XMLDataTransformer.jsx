import React, { useState } from 'react'
import './XMLDataTransformer.css'

const XMLDataTransformer = () => {
  const [selectedObject, setSelectedObject] = useState('book')
  const [transformStep, setTransformStep] = useState('object')
  const [showMapping, setShowMapping] = useState(false)

  const sampleObjects = {
    book: {
      name: 'Book',
      icon: '📚',
      data: {
        isbn: '978-0135181966',
        title: 'The Object-Oriented Thought Process',
        author: {
          firstName: 'Matt',
          lastName: 'Weisfeld'
        },
        price: 49.99,
        inStock: true,
        categories: ['Programming', 'Object-Oriented Design', 'Software Engineering']
      }
    },
    employee: {
      name: 'Employee',
      icon: '👤',
      data: {
        id: 'EMP001',
        personalInfo: {
          name: 'Jane Smith',
          email: 'jane.smith@company.com'
        },
        department: 'Engineering',
        salary: 85000,
        active: true,
        skills: ['Java', 'Python', 'SQL']
      }
    },
    order: {
      name: 'Order',
      icon: '🛒',
      data: {
        orderId: 'ORD-2024-001',
        customer: {
          id: 'CUST123',
          name: 'John Doe'
        },
        items: [
          { productId: 'PROD001', name: 'Laptop', quantity: 1, price: 999.99 },
          { productId: 'PROD002', name: 'Mouse', quantity: 2, price: 29.99 }
        ],
        total: 1059.97,
        status: 'processing'
      }
    }
  }

  const objectToXML = (obj, rootName = 'root', indent = 0) => {
    const spaces = '  '.repeat(indent)
    let xml = `${spaces}<${rootName}>\n`
    
    for (const [key, value] of Object.entries(obj)) {
      if (Array.isArray(value)) {
        xml += `${spaces}  <${key}>\n`
        value.forEach((item, index) => {
          const itemName = key.endsWith('s') ? key.slice(0, -1) : 'item'
          if (typeof item === 'object') {
            xml += objectToXML(item, itemName, indent + 2)
          } else {
            xml += `${spaces}    <${itemName}>${item}</${itemName}>\n`
          }
        })
        xml += `${spaces}  </${key}>\n`
      } else if (typeof value === 'object' && value !== null) {
        xml += objectToXML(value, key, indent + 1)
      } else {
        xml += `${spaces}  <${key}>${value}</${key}>\n`
      }
    }
    
    xml += `${spaces}</${rootName}>\n`
    return xml
  }

  const getTransformationStep = () => {
    switch(transformStep) {
      case 'object':
        return {
          title: 'Step 1: Object in Memory',
          description: 'The object exists with nested properties and arrays'
        }
      case 'mapping':
        return {
          title: 'Step 2: Mapping Process',
          description: 'Object properties are mapped to XML elements'
        }
      case 'xml':
        return {
          title: 'Step 3: XML Document',
          description: 'Hierarchical XML structure ready for storage or transmission'
        }
      default:
        return {}
    }
  }

  const renderObjectView = () => {
    const current = sampleObjects[selectedObject]
    return (
      <div className="object-display">
        <div className="object-header">
          <span className="object-icon">{current.icon}</span>
          <span className="object-name">{current.name} Object</span>
        </div>
        <pre className="object-content">
          <code>{JSON.stringify(current.data, null, 2)}</code>
        </pre>
      </div>
    )
  }

  const renderMappingView = () => {
    return (
      <div className="mapping-visualization">
        <div className="mapping-rules">
          <h4>XML Mapping Rules:</h4>
          <div className="rule">
            <span className="rule-object">Object Property</span>
            <span className="arrow">→</span>
            <span className="rule-xml">XML Element</span>
          </div>
          <div className="rule">
            <span className="rule-object">Nested Object</span>
            <span className="arrow">→</span>
            <span className="rule-xml">Nested Element</span>
          </div>
          <div className="rule">
            <span className="rule-object">Array</span>
            <span className="arrow">→</span>
            <span className="rule-xml">Parent + Child Elements</span>
          </div>
          <div className="rule">
            <span className="rule-object">Primitive Value</span>
            <span className="arrow">→</span>
            <span className="rule-xml">Text Content</span>
          </div>
        </div>
        <div className="mapping-example">
          <div className="example-item">
            <code className="json">author: {'{ firstName: "Matt" }'}</code>
            <span className="transforms-to">transforms to</span>
            <code className="xml">&lt;author&gt;&lt;firstName&gt;Matt&lt;/firstName&gt;&lt;/author&gt;</code>
          </div>
        </div>
      </div>
    )
  }

  const renderXMLView = () => {
    const current = sampleObjects[selectedObject]
    const xmlContent = objectToXML(current.data, current.name.toLowerCase())
    
    return (
      <div className="xml-display">
        <div className="xml-header">
          <span>XML Document</span>
          <button 
            className="copy-btn"
            onClick={() => navigator.clipboard.writeText(xmlContent)}
          >
            📋 Copy
          </button>
        </div>
        <pre className="xml-content">
          <code>{xmlContent}</code>
        </pre>
      </div>
    )
  }

  const runTransformation = () => {
    setTransformStep('object')
    setShowMapping(false)
    
    setTimeout(() => {
      setTransformStep('mapping')
      setShowMapping(true)
    }, 1000)
    
    setTimeout(() => {
      setTransformStep('xml')
    }, 2500)
  }

  return (
    <div className="xml-transformer-container">
      <div className="transformer-header">
        <h3>Object to XML Transformation</h3>
        <p>See how complex objects are converted to hierarchical XML format</p>
      </div>

      <div className="object-selector">
        {Object.entries(sampleObjects).map(([key, obj]) => (
          <button
            key={key}
            className={`object-select-btn ${selectedObject === key ? 'active' : ''}`}
            onClick={() => {
              setSelectedObject(key)
              setTransformStep('object')
              setShowMapping(false)
            }}
          >
            <span className="btn-icon">{obj.icon}</span>
            <span className="btn-label">{obj.name}</span>
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
          <div className={`step ${transformStep === 'mapping' ? 'active' : ''}`}>
            <span className="step-number">2</span>
            <span className="step-label">Map</span>
          </div>
          <div className="step-line"></div>
          <div className={`step ${transformStep === 'xml' ? 'active' : ''}`}>
            <span className="step-number">3</span>
            <span className="step-label">XML</span>
          </div>
        </div>

        <div className="visual-area">
          <h4>{getTransformationStep().title}</h4>
          <p>{getTransformationStep().description}</p>
          
          {transformStep === 'object' && renderObjectView()}
          {transformStep === 'mapping' && renderMappingView()}
          {transformStep === 'xml' && renderXMLView()}
        </div>

        <div className="controls">
          <button 
            className="control-btn"
            onClick={() => setTransformStep('object')}
            disabled={transformStep === 'object'}
          >
            ← Reset
          </button>
          <button 
            className="control-btn primary"
            onClick={runTransformation}
          >
            ▶ Run Transformation
          </button>
          <button 
            className="control-btn"
            onClick={() => {
              if (transformStep === 'object') {
                setTransformStep('mapping')
                setShowMapping(true)
              } else if (transformStep === 'mapping') {
                setTransformStep('xml')
              }
            }}
            disabled={transformStep === 'xml'}
          >
            Next →
          </button>
        </div>
      </div>

      <div className="xml-characteristics">
        <h4>XML Characteristics:</h4>
        <div className="characteristics-grid">
          <div className="characteristic">
            <span className="icon">🌳</span>
            <strong>Hierarchical</strong>
            <p>Nested structure matches object relationships</p>
          </div>
          <div className="characteristic">
            <span className="icon">📖</span>
            <strong>Human Readable</strong>
            <p>Text-based format easy to understand</p>
          </div>
          <div className="characteristic">
            <span className="icon">✔️</span>
            <strong>Self-Describing</strong>
            <p>Element names describe the data</p>
          </div>
          <div className="characteristic">
            <span className="icon">🌐</span>
            <strong>Platform Independent</strong>
            <p>Works across different systems</p>
          </div>
        </div>
      </div>

      <div className="comparison-note">
        <h4>XML vs JSON:</h4>
        <ul>
          <li><strong>XML:</strong> More verbose, supports attributes and namespaces, better for document-style data</li>
          <li><strong>JSON:</strong> More compact, simpler syntax, better for data interchange in web applications</li>
          <li>Both formats serve the same purpose: making object data portable and platform-independent</li>
        </ul>
      </div>
    </div>
  )
}

export default XMLDataTransformer