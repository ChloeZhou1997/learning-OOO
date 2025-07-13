import React, { useState } from 'react'
import './DigitalCRCSession.css'

const DigitalCRCSession = () => {
  const [scenario, setScenario] = useState('library')
  const [cards, setCards] = useState([])
  const [selectedCard, setSelectedCard] = useState(null)
  const [isAddingCard, setIsAddingCard] = useState(false)
  const [newCardName, setNewCardName] = useState('')

  const scenarios = {
    library: {
      name: 'Library Management System',
      description: 'Design a system for managing books, members, and loans in a library.',
      suggestedClasses: ['Book', 'Member', 'Loan', 'Librarian', 'Catalog']
    },
    restaurant: {
      name: 'Restaurant Ordering System',
      description: 'Design a system for taking orders, managing tables, and processing payments.',
      suggestedClasses: ['Table', 'Order', 'MenuItem', 'Server', 'Kitchen', 'Payment']
    },
    parking: {
      name: 'Parking Lot System',
      description: 'Design a system for managing parking spaces, vehicles, and payments.',
      suggestedClasses: ['ParkingSpace', 'Vehicle', 'Ticket', 'Payment', 'Gate']
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

  return (
    <div className="crc-session-container">
      <div className="scenario-selector">
        <h3>Select a Scenario:</h3>
        <div className="scenario-buttons">
          {Object.entries(scenarios).map(([key, scenario]) => (
            <button
              key={key}
              className={`scenario-btn ${key === scenario ? 'active' : ''}`}
              onClick={() => resetScenario(key)}
            >
              {scenario.name}
            </button>
          ))}
        </div>
      </div>

      <div className="scenario-info">
        <h4>{scenarios[scenario].name}</h4>
        <p>{scenarios[scenario].description}</p>
        <div className="suggested-classes">
          <strong>Suggested classes to consider:</strong>
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
        </div>
      </div>

      <div className="crc-workspace">
        <div className="cards-area">
          <h3>CRC Cards</h3>
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
              <p className="section-hint">What does this class know or do?</p>
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
              <p className="section-hint">Which other classes does this work with?</p>
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

      <div className="crc-tips">
        <h4>CRC Card Tips:</h4>
        <ul>
          <li><strong>Class:</strong> A noun from your problem domain (Person, Order, etc.)</li>
          <li><strong>Responsibilities:</strong> What the class knows (data) or does (behavior)</li>
          <li><strong>Collaborators:</strong> Other classes needed to fulfill responsibilities</li>
          <li>Keep responsibilities high-level - avoid implementation details</li>
          <li>If a class has too many responsibilities, consider splitting it</li>
        </ul>
      </div>
    </div>
  )
}

export default DigitalCRCSession