import React, { useState } from 'react'
import './UMLBlueprintDrafter.css'

const UMLBlueprintDrafter = () => {
  const [classes, setClasses] = useState([])
  const [selectedClass, setSelectedClass] = useState(null)
  const [connections, setConnections] = useState([])
  const [isAddingClass, setIsAddingClass] = useState(false)
  const [connectionMode, setConnectionMode] = useState(null)
  const [connectionStart, setConnectionStart] = useState(null)

  const relationshipTypes = {
    inheritance: { symbol: '▷', label: 'Inheritance (is-a)', style: 'solid' },
    composition: { symbol: '◆', label: 'Composition (has-a)', style: 'solid' },
    association: { symbol: '→', label: 'Association', style: 'dashed' },
    dependency: { symbol: '- ->', label: 'Dependency', style: 'dotted' }
  }

  const addClass = (name) => {
    const newClass = {
      id: Date.now(),
      name: name || `Class${classes.length + 1}`,
      x: 100 + (classes.length % 3) * 250,
      y: 100 + Math.floor(classes.length / 3) * 200,
      attributes: [],
      methods: [],
      visibility: 'public'
    }
    setClasses([...classes, newClass])
    setIsAddingClass(false)
  }

  const updateClass = (classId, updates) => {
    setClasses(classes.map(cls => 
      cls.id === classId ? { ...cls, ...updates } : cls
    ))
  }

  const addAttribute = (classId, attribute) => {
    const cls = classes.find(c => c.id === classId)
    if (cls && attribute.trim()) {
      updateClass(classId, {
        attributes: [...cls.attributes, { 
          name: attribute, 
          visibility: 'private',
          type: 'string'
        }]
      })
    }
  }

  const addMethod = (classId, method) => {
    const cls = classes.find(c => c.id === classId)
    if (cls && method.trim()) {
      updateClass(classId, {
        methods: [...cls.methods, { 
          name: method, 
          visibility: 'public',
          returnType: 'void'
        }]
      })
    }
  }

  const deleteClass = (classId) => {
    setClasses(classes.filter(cls => cls.id !== classId))
    setConnections(connections.filter(conn => 
      conn.from !== classId && conn.to !== classId
    ))
    if (selectedClass === classId) {
      setSelectedClass(null)
    }
  }

  const startConnection = (type) => {
    setConnectionMode(type)
    setConnectionStart(null)
  }

  const handleClassClick = (classId) => {
    if (connectionMode && connectionStart === null) {
      setConnectionStart(classId)
    } else if (connectionMode && connectionStart !== null && connectionStart !== classId) {
      // Create connection
      const newConnection = {
        id: Date.now(),
        from: connectionStart,
        to: classId,
        type: connectionMode
      }
      setConnections([...connections, newConnection])
      setConnectionMode(null)
      setConnectionStart(null)
    } else {
      setSelectedClass(classId)
    }
  }

  const exportUML = () => {
    let uml = '// UML Class Diagram\n\n'
    
    classes.forEach(cls => {
      uml += `class ${cls.name} {\n`
      cls.attributes.forEach(attr => {
        const visibility = attr.visibility === 'private' ? '-' : '+'
        uml += `  ${visibility} ${attr.name}: ${attr.type}\n`
      })
      if (cls.attributes.length > 0 && cls.methods.length > 0) {
        uml += '\n'
      }
      cls.methods.forEach(method => {
        const visibility = method.visibility === 'private' ? '-' : '+'
        uml += `  ${visibility} ${method.name}(): ${method.returnType}\n`
      })
      uml += '}\n\n'
    })
    
    connections.forEach(conn => {
      const fromClass = classes.find(c => c.id === conn.from)
      const toClass = classes.find(c => c.id === conn.to)
      if (fromClass && toClass) {
        const relationship = relationshipTypes[conn.type]
        uml += `${fromClass.name} ${relationship.symbol} ${toClass.name}\n`
      }
    })
    
    return uml
  }

  const getConnectionPath = (conn) => {
    const fromClass = classes.find(c => c.id === conn.from)
    const toClass = classes.find(c => c.id === conn.to)
    if (!fromClass || !toClass) return ''
    
    const x1 = fromClass.x + 100
    const y1 = fromClass.y + 50
    const x2 = toClass.x + 100
    const y2 = toClass.y + 50
    
    return `M ${x1} ${y1} L ${x2} ${y2}`
  }

  return (
    <div className="uml-drafter-container">
      <div className="uml-toolbar">
        <div className="toolbar-section">
          <h4>Classes</h4>
          <button 
            className="toolbar-btn"
            onClick={() => setIsAddingClass(true)}
          >
            + Add Class
          </button>
        </div>
        
        <div className="toolbar-section">
          <h4>Relationships</h4>
          <div className="relationship-buttons">
            {Object.entries(relationshipTypes).map(([type, rel]) => (
              <button
                key={type}
                className={`relationship-btn ${connectionMode === type ? 'active' : ''}`}
                onClick={() => startConnection(type)}
                title={rel.label}
              >
                {rel.symbol} {rel.label}
              </button>
            ))}
          </div>
          {connectionMode && (
            <p className="connection-hint">
              Click on two classes to connect them
              <button onClick={() => {
                setConnectionMode(null)
                setConnectionStart(null)
              }}>Cancel</button>
            </p>
          )}
        </div>
      </div>

      <div className="uml-canvas">
        <svg className="connections-layer">
          {connections.map(conn => {
            const relationship = relationshipTypes[conn.type]
            return (
              <g key={conn.id}>
                <path
                  d={getConnectionPath(conn)}
                  stroke="#495057"
                  strokeWidth="2"
                  fill="none"
                  strokeDasharray={
                    relationship.style === 'dashed' ? '5,5' : 
                    relationship.style === 'dotted' ? '2,2' : 
                    'none'
                  }
                />
                <text
                  x={(classes.find(c => c.id === conn.from)?.x + classes.find(c => c.id === conn.to)?.x + 200) / 2}
                  y={(classes.find(c => c.id === conn.from)?.y + classes.find(c => c.id === conn.to)?.y + 100) / 2}
                  textAnchor="middle"
                  className="relationship-label"
                >
                  {relationship.symbol}
                </text>
              </g>
            )
          })}
        </svg>

        <div className="classes-layer">
          {classes.map(cls => (
            <div
              key={cls.id}
              className={`uml-class ${selectedClass === cls.id ? 'selected' : ''} ${
                connectionMode && connectionStart === cls.id ? 'connection-start' : ''
              }`}
              style={{ left: cls.x, top: cls.y }}
              onClick={() => handleClassClick(cls.id)}
            >
              <div className="class-header">
                <h5>{cls.name}</h5>
                <button
                  className="delete-class-btn"
                  onClick={(e) => {
                    e.stopPropagation()
                    deleteClass(cls.id)
                  }}
                >
                  ×
                </button>
              </div>
              
              <div className="class-section attributes">
                <div className="section-label">Attributes</div>
                {cls.attributes.map((attr, index) => (
                  <div key={index} className="member">
                    <span className="visibility">{attr.visibility === 'private' ? '-' : '+'}</span>
                    {attr.name}: {attr.type}
                  </div>
                ))}
                {cls.attributes.length === 0 && (
                  <div className="empty-section">No attributes</div>
                )}
              </div>
              
              <div className="class-section methods">
                <div className="section-label">Methods</div>
                {cls.methods.map((method, index) => (
                  <div key={index} className="member">
                    <span className="visibility">{method.visibility === 'private' ? '-' : '+'}</span>
                    {method.name}(): {method.returnType}
                  </div>
                ))}
                {cls.methods.length === 0 && (
                  <div className="empty-section">No methods</div>
                )}
              </div>
            </div>
          ))}

          {isAddingClass && (
            <div className="new-class-form" style={{ left: 100, top: 100 }}>
              <input
                type="text"
                placeholder="Class name..."
                autoFocus
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    addClass(e.target.value)
                  }
                }}
                onBlur={(e) => addClass(e.target.value)}
              />
            </div>
          )}
        </div>
      </div>

      {selectedClass && (
        <div className="class-editor">
          <h4>Edit: {classes.find(c => c.id === selectedClass)?.name}</h4>
          
          <div className="editor-section">
            <h5>Add Attribute</h5>
            <input
              type="text"
              placeholder="attributeName"
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  addAttribute(selectedClass, e.target.value)
                  e.target.value = ''
                }
              }}
            />
          </div>
          
          <div className="editor-section">
            <h5>Add Method</h5>
            <input
              type="text"
              placeholder="methodName"
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  addMethod(selectedClass, e.target.value)
                  e.target.value = ''
                }
              }}
            />
          </div>
        </div>
      )}

      <div className="uml-export">
        <h4>UML Text Representation:</h4>
        <pre>
          <code>{exportUML()}</code>
        </pre>
      </div>

      <div className="uml-legend">
        <h4>UML Notation:</h4>
        <ul>
          <li><strong>+ </strong> Public member</li>
          <li><strong>- </strong> Private member</li>
          <li><strong>▷</strong> Inheritance (solid line)</li>
          <li><strong>◆</strong> Composition (solid line)</li>
          <li><strong>→</strong> Association (dashed line)</li>
        </ul>
      </div>
    </div>
  )
}

export default UMLBlueprintDrafter