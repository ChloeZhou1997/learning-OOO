import React, { useState } from 'react'
import './UMLBlueprintDrafter.css'

const UMLBlueprintDrafter = () => {
  const [classes, setClasses] = useState([])
  const [selectedClass, setSelectedClass] = useState(null)
  const [connections, setConnections] = useState([])
  const [isAddingClass, setIsAddingClass] = useState(false)
  const [connectionMode, setConnectionMode] = useState(null)
  const [connectionStart, setConnectionStart] = useState(null)
  const [selectedTemplate, setSelectedTemplate] = useState('pytorch')

  const relationshipTypes = {
    inheritance: { symbol: '▷', label: 'Inheritance (extends)', style: 'solid' },
    implementation: { symbol: '▷', label: 'Implementation', style: 'dashed' },
    composition: { symbol: '◆', label: 'Composition (owns)', style: 'solid' },
    aggregation: { symbol: '◇', label: 'Aggregation (uses)', style: 'solid' },
    dependency: { symbol: '- ->', label: 'Dependency', style: 'dotted' }
  }

  const frameworkTemplates = {
    pytorch: {
      name: 'PyTorch nn.Module Architecture',
      classes: [
        {
          id: 1,
          name: 'nn.Module',
          x: 300,
          y: 50,
          attributes: [
            { name: '_parameters', visibility: 'protected', type: 'OrderedDict' },
            { name: '_buffers', visibility: 'protected', type: 'OrderedDict' },
            { name: '_modules', visibility: 'protected', type: 'OrderedDict' },
            { name: 'training', visibility: 'public', type: 'bool' }
          ],
          methods: [
            { name: 'forward', visibility: 'public', returnType: 'Tensor', abstract: true },
            { name: 'parameters', visibility: 'public', returnType: 'Iterator[Parameter]' },
            { name: 'train', visibility: 'public', returnType: 'Module' },
            { name: 'eval', visibility: 'public', returnType: 'Module' },
            { name: 'to', visibility: 'public', returnType: 'Module' }
          ]
        },
        {
          id: 2,
          name: 'nn.Linear',
          x: 100,
          y: 250,
          attributes: [
            { name: 'in_features', visibility: 'public', type: 'int' },
            { name: 'out_features', visibility: 'public', type: 'int' },
            { name: 'weight', visibility: 'public', type: 'Parameter' },
            { name: 'bias', visibility: 'public', type: 'Optional[Parameter]' }
          ],
          methods: [
            { name: 'forward', visibility: 'public', returnType: 'Tensor' },
            { name: 'reset_parameters', visibility: 'public', returnType: 'None' }
          ]
        },
        {
          id: 3,
          name: 'nn.Conv2d',
          x: 300,
          y: 250,
          attributes: [
            { name: 'kernel_size', visibility: 'public', type: 'Tuple[int, int]' },
            { name: 'stride', visibility: 'public', type: 'Tuple[int, int]' },
            { name: 'padding', visibility: 'public', type: 'Tuple[int, int]' },
            { name: 'weight', visibility: 'public', type: 'Parameter' }
          ],
          methods: [
            { name: 'forward', visibility: 'public', returnType: 'Tensor' },
            { name: '_conv_forward', visibility: 'protected', returnType: 'Tensor' }
          ]
        },
        {
          id: 4,
          name: 'nn.Sequential',
          x: 500,
          y: 250,
          attributes: [
            { name: '_modules', visibility: 'private', type: 'OrderedDict[str, Module]' }
          ],
          methods: [
            { name: 'forward', visibility: 'public', returnType: 'Tensor' },
            { name: 'append', visibility: 'public', returnType: 'Sequential' }
          ]
        }
      ],
      connections: [
        { id: 101, from: 2, to: 1, type: 'inheritance' },
        { id: 102, from: 3, to: 1, type: 'inheritance' },
        { id: 103, from: 4, to: 1, type: 'inheritance' },
        { id: 104, from: 4, to: 1, type: 'aggregation' }
      ]
    },
    langchain: {
      name: 'LangChain Core Architecture',
      classes: [
        {
          id: 1,
          name: 'BaseLanguageModel',
          x: 300,
          y: 50,
          attributes: [
            { name: 'callbacks', visibility: 'public', type: 'Optional[Callbacks]' },
            { name: 'tags', visibility: 'public', type: 'Optional[List[str]]' }
          ],
          methods: [
            { name: 'generate_prompt', visibility: 'public', returnType: 'LLMResult', abstract: true },
            { name: 'predict', visibility: 'public', returnType: 'str' },
            { name: 'predict_messages', visibility: 'public', returnType: 'BaseMessage' }
          ]
        },
        {
          id: 2,
          name: 'LLM',
          x: 150,
          y: 200,
          attributes: [
            { name: 'model_name', visibility: 'public', type: 'str' },
            { name: 'temperature', visibility: 'public', type: 'float' },
            { name: 'max_tokens', visibility: 'public', type: 'Optional[int]' }
          ],
          methods: [
            { name: '_call', visibility: 'protected', returnType: 'str', abstract: true },
            { name: '_generate', visibility: 'protected', returnType: 'LLMResult' }
          ]
        },
        {
          id: 3,
          name: 'BaseChatModel',
          x: 450,
          y: 200,
          attributes: [],
          methods: [
            { name: '_generate', visibility: 'protected', returnType: 'ChatResult', abstract: true },
            { name: 'call_as_llm', visibility: 'public', returnType: 'str' }
          ]
        },
        {
          id: 4,
          name: 'Chain',
          x: 300,
          y: 350,
          attributes: [
            { name: 'memory', visibility: 'public', type: 'Optional[BaseMemory]' },
            { name: 'callbacks', visibility: 'public', type: 'Optional[Callbacks]' },
            { name: 'verbose', visibility: 'public', type: 'bool' }
          ],
          methods: [
            { name: 'run', visibility: 'public', returnType: 'Any' },
            { name: '__call__', visibility: 'public', returnType: 'Dict[str, Any]' },
            { name: '_call', visibility: 'protected', returnType: 'Dict[str, Any]', abstract: true }
          ]
        },
        {
          id: 5,
          name: 'LLMChain',
          x: 150,
          y: 500,
          attributes: [
            { name: 'llm', visibility: 'public', type: 'BaseLanguageModel' },
            { name: 'prompt', visibility: 'public', type: 'BasePromptTemplate' }
          ],
          methods: [
            { name: '_call', visibility: 'protected', returnType: 'Dict[str, str]' },
            { name: 'predict', visibility: 'public', returnType: 'str' }
          ]
        }
      ],
      connections: [
        { id: 101, from: 2, to: 1, type: 'inheritance' },
        { id: 102, from: 3, to: 1, type: 'inheritance' },
        { id: 103, from: 5, to: 4, type: 'inheritance' },
        { id: 104, from: 5, to: 1, type: 'dependency' }
      ]
    },
    spring: {
      name: 'Spring Framework Core',
      classes: [
        {
          id: 1,
          name: 'BeanFactory',
          x: 300,
          y: 50,
          attributes: [],
          methods: [
            { name: 'getBean', visibility: 'public', returnType: 'Object' },
            { name: 'containsBean', visibility: 'public', returnType: 'boolean' },
            { name: 'isSingleton', visibility: 'public', returnType: 'boolean' }
          ]
        },
        {
          id: 2,
          name: 'ApplicationContext',
          x: 300,
          y: 200,
          attributes: [],
          methods: [
            { name: 'getApplicationName', visibility: 'public', returnType: 'String' },
            { name: 'getEnvironment', visibility: 'public', returnType: 'Environment' },
            { name: 'publishEvent', visibility: 'public', returnType: 'void' }
          ]
        },
        {
          id: 3,
          name: 'BeanDefinition',
          x: 100,
          y: 350,
          attributes: [
            { name: 'beanClassName', visibility: 'private', type: 'String' },
            { name: 'scope', visibility: 'private', type: 'String' },
            { name: 'lazyInit', visibility: 'private', type: 'boolean' }
          ],
          methods: [
            { name: 'setBeanClassName', visibility: 'public', returnType: 'void' },
            { name: 'setScope', visibility: 'public', returnType: 'void' }
          ]
        },
        {
          id: 4,
          name: 'BeanPostProcessor',
          x: 500,
          y: 350,
          attributes: [],
          methods: [
            { name: 'postProcessBeforeInitialization', visibility: 'public', returnType: 'Object' },
            { name: 'postProcessAfterInitialization', visibility: 'public', returnType: 'Object' }
          ]
        }
      ],
      connections: [
        { id: 101, from: 2, to: 1, type: 'inheritance' },
        { id: 102, from: 2, to: 3, type: 'aggregation' },
        { id: 103, from: 2, to: 4, type: 'dependency' }
      ]
    }
  }

  const loadTemplate = (templateKey) => {
    const template = frameworkTemplates[templateKey]
    setClasses(template.classes)
    setConnections(template.connections)
    setSelectedTemplate(templateKey)
    setSelectedClass(null)
  }

  const addClass = (name) => {
    const newClass = {
      id: Date.now(),
      name: name || `NewClass${classes.length + 1}`,
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
          type: 'Object'
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
    let uml = `// UML Class Diagram - ${frameworkTemplates[selectedTemplate]?.name || 'Custom'}\n\n`
    
    classes.forEach(cls => {
      uml += `class ${cls.name} {\n`
      cls.attributes.forEach(attr => {
        const visibility = attr.visibility === 'private' ? '-' : 
                         attr.visibility === 'protected' ? '#' : '+'
        uml += `  ${visibility} ${attr.name}: ${attr.type}\n`
      })
      if (cls.attributes.length > 0 && cls.methods.length > 0) {
        uml += '\n'
      }
      cls.methods.forEach(method => {
        const visibility = method.visibility === 'private' ? '-' : 
                         method.visibility === 'protected' ? '#' : '+'
        const abstract = method.abstract ? '{abstract} ' : ''
        uml += `  ${visibility} ${abstract}${method.name}(): ${method.returnType}\n`
      })
      uml += '}\n\n'
    })
    
    connections.forEach(conn => {
      const fromClass = classes.find(c => c.id === conn.from)
      const toClass = classes.find(c => c.id === conn.to)
      if (fromClass && toClass) {
        const relationship = relationshipTypes[conn.type]
        uml += `${fromClass.name} ${relationship.symbol} ${toClass.name} // ${relationship.label}\n`
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
          <h4>Framework Templates</h4>
          <div className="template-buttons">
            {Object.entries(frameworkTemplates).map(([key, template]) => (
              <button
                key={key}
                className={`template-btn ${selectedTemplate === key ? 'active' : ''}`}
                onClick={() => loadTemplate(key)}
              >
                {template.name}
              </button>
            ))}
          </div>
        </div>

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
                    <span className="visibility">
                      {attr.visibility === 'private' ? '-' : 
                       attr.visibility === 'protected' ? '#' : '+'}
                    </span>
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
                  <div key={index} className={`member ${method.abstract ? 'abstract' : ''}`}>
                    <span className="visibility">
                      {method.visibility === 'private' ? '-' : 
                       method.visibility === 'protected' ? '#' : '+'}
                    </span>
                    {method.abstract && <em>}
                    {method.name}(): {method.returnType}
                    {method.abstract && </em>}
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
          <li><strong># </strong> Protected member</li>
          <li><strong>- </strong> Private member</li>
          <li><strong>▷</strong> Inheritance/Implementation</li>
          <li><strong>◆</strong> Composition (owns lifecycle)</li>
          <li><strong>◇</strong> Aggregation (uses/references)</li>
          <li><strong><em>italic</em></strong> Abstract method</li>
        </ul>
      </div>
    </div>
  )
}

export default UMLBlueprintDrafter