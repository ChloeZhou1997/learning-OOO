import React, { useState } from 'react'
import './DigitalCRCSession.css'

const DigitalCRCSession = () => {
  const [scenario, setScenario] = useState('pytorch')
  const [cards, setCards] = useState([])
  const [selectedCard, setSelectedCard] = useState(null)
  const [isAddingCard, setIsAddingCard] = useState(false)
  const [newCardName, setNewCardName] = useState('')

  const scenarios = {
    pytorch: {
      name: 'PyTorch Neural Network Framework',
      icon: '🔥',
      description: 'Design the core components of PyTorch\'s neural network module system (torch.nn)',
      suggestedClasses: ['Module', 'Parameter', 'Linear', 'Conv2d', 'Optimizer', 'Tensor', 'Autograd', 'DataLoader']
    },
    langchain: {
      name: 'LangChain Agent System',
      icon: '🦜',
      description: 'Design components for building LLM-powered agents with tools and memory',
      suggestedClasses: ['Agent', 'Tool', 'Memory', 'LLM', 'PromptTemplate', 'Chain', 'OutputParser', 'Callback']
    },
    kafka: {
      name: 'Apache Kafka Streaming',
      icon: '📊',
      description: 'Design a distributed streaming platform like Kafka for high-throughput data pipelines',
      suggestedClasses: ['Producer', 'Consumer', 'Broker', 'Topic', 'Partition', 'ConsumerGroup', 'Offset', 'ZooKeeper']
    },
    react: {
      name: 'React Component System',
      icon: '⚛️',
      description: 'Design the core architecture of React\'s component and rendering system',
      suggestedClasses: ['Component', 'VirtualDOM', 'Fiber', 'Hook', 'Context', 'Reconciler', 'Renderer', 'Scheduler']
    }
  }

  const addCard = (className) => {
    const newCard = {
      id: Date.now(),
      name: className,
      responsibilities: [],
      collaborators: []
    }
    setCards([...cards, newCard])
    setNewCardName('')
    setIsAddingCard(false)
  }

  const updateCard = (cardId, field, value) => {
    setCards(cards.map(card => 
      card.id === cardId ? { ...card, [field]: value } : card
    ))
  }

  const addResponsibility = (cardId, responsibility) => {
    if (responsibility.trim()) {
      setCards(cards.map(card => 
        card.id === cardId 
          ? { ...card, responsibilities: [...card.responsibilities, responsibility] }
          : card
      ))
    }
  }

  const addCollaborator = (cardId, collaborator) => {
    if (collaborator.trim() && !cards.find(c => c.id === cardId).collaborators.includes(collaborator)) {
      setCards(cards.map(card => 
        card.id === cardId 
          ? { ...card, collaborators: [...card.collaborators, collaborator] }
          : card
      ))
    }
  }

  const removeResponsibility = (cardId, index) => {
    setCards(cards.map(card => 
      card.id === cardId 
        ? { ...card, responsibilities: card.responsibilities.filter((_, i) => i !== index) }
        : card
    ))
  }

  const removeCollaborator = (cardId, index) => {
    setCards(cards.map(card => 
      card.id === cardId 
        ? { ...card, collaborators: card.collaborators.filter((_, i) => i !== index) }
        : card
    ))
  }

  const deleteCard = (cardId) => {
    setCards(cards.filter(card => card.id !== cardId))
    setSelectedCard(null)
  }

  const resetScenario = (newScenario) => {
    setScenario(newScenario)
    setCards([])
    setSelectedCard(null)
    setIsAddingCard(false)
  }

  // Pre-populate with example CRC card for selected scenario
  const loadExampleCard = () => {
    const examples = {
      pytorch: {
        name: 'Module',
        responsibilities: [
          'Manage parameters and submodules',
          'Define forward pass computation',
          'Track gradients for backpropagation',
          'Support training/eval mode switching',
          'Enable device placement (CPU/GPU)'
        ],
        collaborators: ['Parameter', 'Tensor', 'Autograd']
      },
      langchain: {
        name: 'Agent',
        responsibilities: [
          'Decide which tool to use',
          'Parse LLM output into actions',
          'Execute tool calls',
          'Maintain conversation history',
          'Handle errors and retries'
        ],
        collaborators: ['Tool', 'LLM', 'Memory', 'OutputParser']
      },
      kafka: {
        name: 'Broker',
        responsibilities: [
          'Store messages in topics',
          'Manage partitions and replicas',
          'Handle producer/consumer requests',
          'Coordinate with cluster',
          'Persist messages to disk'
        ],
        collaborators: ['Topic', 'Partition', 'Producer', 'Consumer', 'ZooKeeper']
      },
      react: {
        name: 'Component',
        responsibilities: [
          'Define UI structure (render method)',
          'Manage local state',
          'Handle lifecycle events',
          'Process props from parent',
          'Trigger re-renders on update'
        ],
        collaborators: ['VirtualDOM', 'Hook', 'Context', 'Fiber']
      }
    }

    const example = examples[scenario]
    if (example && !cards.some(card => card.name === example.name)) {
      const newCard = {
        id: Date.now(),
        ...example
      }
      setCards([...cards, newCard])
    }
  }

  return (
    <div className="crc-session-container">
      <div className="scenario-selector">
        <h3>Select a Framework to Design:</h3>
        <div className="scenario-buttons">
          {Object.entries(scenarios).map(([key, scenarioData]) => (
            <button
              key={key}
              className={`scenario-btn ${key === scenario ? 'active' : ''}`}
              onClick={() => resetScenario(key)}
            >
              <span className="scenario-icon">{scenarioData.icon}</span>
              <span className="scenario-name">{scenarioData.name}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="scenario-info">
        <h4>{scenarios[scenario].icon} {scenarios[scenario].name}</h4>
        <p>{scenarios[scenario].description}</p>
        <div className="suggested-classes">
          <strong>Core components to design:</strong>
          <div className="suggestion-chips">
            {scenarios[scenario].suggestedClasses.map(cls => (
              <button
                key={cls}
                className="suggestion-chip"
                onClick={() => addCard(cls)}
                disabled={cards.some(card => card.name === cls)}
              >
                + {cls}
              </button>
            ))}
          </div>
          <button className="example-btn" onClick={loadExampleCard}>
            📝 Load Example Card
          </button>
        </div>
      </div>

      <div className="crc-workspace">
        <div className="cards-area">
          <h3>CRC Cards - {scenarios[scenario].name}</h3>
          <div className="cards-grid">
            {cards.map(card => (
              <div
                key={card.id}
                className={`crc-card ${selectedCard === card.id ? 'selected' : ''}`}
                onClick={() => setSelectedCard(card.id)}
              >
                <div className="card-header">
                  <h4>{card.name}</h4>
                  <button
                    className="delete-btn"
                    onClick={(e) => {
                      e.stopPropagation()
                      deleteCard(card.id)
                    }}
                  >
                    ×
                  </button>
                </div>
                <div className="card-content">
                  <div className="responsibilities-section">
                    <h5>Responsibilities</h5>
                    {card.responsibilities.length === 0 ? (
                      <p className="empty-state">No responsibilities yet</p>
                    ) : (
                      <ul>
                        {card.responsibilities.map((resp, index) => (
                          <li key={index}>{resp}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                  <div className="collaborators-section">
                    <h5>Collaborators</h5>
                    {card.collaborators.length === 0 ? (
                      <p className="empty-state">No collaborators yet</p>
                    ) : (
                      <div className="collaborator-tags">
                        {card.collaborators.map((collab, index) => (
                          <span key={index} className="collaborator-tag">{collab}</span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
            
            {isAddingCard ? (
              <div className="crc-card new-card">
                <input
                  type="text"
                  placeholder="Enter class name..."
                  value={newCardName}
                  onChange={(e) => setNewCardName(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter' && newCardName.trim()) {
                      addCard(newCardName)
                    }
                  }}
                  autoFocus
                />
                <div className="new-card-actions">
                  <button onClick={() => addCard(newCardName)} disabled={!newCardName.trim()}>
                    Add
                  </button>
                  <button onClick={() => {
                    setIsAddingCard(false)
                    setNewCardName('')
                  }}>
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <button className="add-card-btn" onClick={() => setIsAddingCard(true)}>
                + Add New Card
              </button>
            )}
          </div>
        </div>

        {selectedCard && (
          <div className="card-editor">
            <h3>Edit: {cards.find(c => c.id === selectedCard)?.name}</h3>
            
            <div className="editor-section">
              <h4>Responsibilities</h4>
              <p className="section-hint">What does this class know or do in the framework?</p>
              {cards.find(c => c.id === selectedCard)?.responsibilities.map((resp, index) => (
                <div key={index} className="editable-item">
                  <span>{resp}</span>
                  <button onClick={() => removeResponsibility(selectedCard, index)}>×</button>
                </div>
              ))}
              <input
                type="text"
                placeholder="Add a responsibility..."
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    addResponsibility(selectedCard, e.target.value)
                    e.target.value = ''
                  }
                }}
              />
            </div>

            <div className="editor-section">
              <h4>Collaborators</h4>
              <p className="section-hint">Which other framework components does this work with?</p>
              {cards.find(c => c.id === selectedCard)?.collaborators.map((collab, index) => (
                <div key={index} className="editable-item">
                  <span>{collab}</span>
                  <button onClick={() => removeCollaborator(selectedCard, index)}>×</button>
                </div>
              ))}
              <select
                onChange={(e) => {
                  if (e.target.value) {
                    addCollaborator(selectedCard, e.target.value)
                    e.target.value = ''
                  }
                }}
                defaultValue=""
              >
                <option value="">Select a collaborator...</option>
                {cards
                  .filter(c => c.id !== selectedCard && !cards.find(card => card.id === selectedCard).collaborators.includes(c.name))
                  .map(c => (
                    <option key={c.id} value={c.name}>{c.name}</option>
                  ))
                }
              </select>
            </div>
          </div>
        )}
      </div>

      <div className="framework-insights">
        <h4>Framework Design Insights:</h4>
        <div className="insight-grid">
          <div className="insight">
            <h5>🔥 PyTorch</h5>
            <p>Module is the central abstraction. Everything is a Module - layers, models, loss functions. This enables composability and automatic differentiation.</p>
          </div>
          <div className="insight">
            <h5>🦜 LangChain</h5>
            <p>Agent orchestrates Tool usage through LLM reasoning. The modular design allows swapping LLMs, tools, and memory systems independently.</p>
          </div>
          <div className="insight">
            <h5>📊 Kafka</h5>
            <p>Broker manages distributed state. Topics are partitioned for scalability, with producers/consumers decoupled through the broker abstraction.</p>
          </div>
          <div className="insight">
            <h5>⚛️ React</h5>
            <p>Component defines UI as a function of state. The Virtual DOM enables efficient updates by diffing component trees.</p>
          </div>
        </div>
      </div>

      <div className="crc-tips">
        <h4>CRC Design Process:</h4>
        <ul>
          <li><strong>Start with core abstractions:</strong> What are the fundamental concepts in your framework?</li>
          <li><strong>Single Responsibility:</strong> Each class should have one clear purpose</li>
          <li><strong>Collaboration patterns:</strong> How do components work together to achieve framework goals?</li>
          <li><strong>Think about extensibility:</strong> How will users extend your framework?</li>
          <li><strong>Consider performance:</strong> Which components are on the critical path?</li>
        </ul>
      </div>
    </div>
  )
}

export default DigitalCRCSession