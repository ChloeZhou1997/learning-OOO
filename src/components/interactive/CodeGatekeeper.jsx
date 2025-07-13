import React, { useState } from 'react'
import './CodeGatekeeper.css'

const CodeGatekeeper = () => {
  const [selectedModifier, setSelectedModifier] = useState('public')
  const [accessAttempts, setAccessAttempts] = useState([])
  const [currentContext, setCurrentContext] = useState('outside')

  const classMembers = {
    private: [
      { name: 'balance', type: 'field', value: 1000, icon: '💰' },
      { name: 'password', type: 'field', value: '****', icon: '🔑' },
      { name: 'calculateInterest()', type: 'method', icon: '🔧' }
    ],
    protected: [
      { name: 'accountType', type: 'field', value: 'SAVINGS', icon: '📋' },
      { name: 'validateTransaction()', type: 'method', icon: '🛡️' }
    ],
    public: [
      { name: 'accountNumber', type: 'field', value: 'ACC-789', icon: '🏷️' },
      { name: 'deposit()', type: 'method', icon: '💵' },
      { name: 'withdraw()', type: 'method', icon: '💸' },
      { name: 'getBalance()', type: 'method', icon: '📊' }
    ]
  }

  const contexts = {
    outside: { name: 'Outside Class', canAccess: ['public'] },
    subclass: { name: 'Subclass', canAccess: ['public', 'protected'] },
    inside: { name: 'Inside Class', canAccess: ['public', 'protected', 'private'] }
  }

  const attemptAccess = (modifier, member) => {
    const canAccess = contexts[currentContext].canAccess.includes(modifier)
    const timestamp = new Date().toLocaleTimeString()
    
    const attempt = {
      time: timestamp,
      context: contexts[currentContext].name,
      member: member.name,
      modifier,
      success: canAccess,
      message: canAccess 
        ? `✅ Access granted to ${modifier} ${member.type}: ${member.name}`
        : `🚫 Access denied! ${modifier} members not accessible from ${contexts[currentContext].name}`
    }

    setAccessAttempts([attempt, ...accessAttempts.slice(0, 4)])
  }

  const getAccessIndicator = (modifier) => {
    const canAccess = contexts[currentContext].canAccess.includes(modifier)
    return canAccess ? 'accessible' : 'blocked'
  }

  return (
    <div className="gatekeeper-container">
      <div className="context-selector">
        <h3>Access Context:</h3>
        <div className="context-buttons">
          {Object.entries(contexts).map(([key, context]) => (
            <button
              key={key}
              className={`context-btn ${currentContext === key ? 'active' : ''}`}
              onClick={() => setCurrentContext(key)}
            >
              {context.name}
            </button>
          ))}
        </div>
      </div>

      <div className="class-diagram">
        <div className="class-header">
          <h3>🏦 BankAccount Class</h3>
        </div>

        <div className="class-sections">
          {Object.entries(classMembers).map(([modifier, members]) => {
            const accessStatus = getAccessIndicator(modifier)
            return (
              <div key={modifier} className={`class-section ${modifier} ${accessStatus}`}>
                <div className="section-header">
                  <span className="modifier-label">{modifier}</span>
                  <span className={`access-indicator ${accessStatus}`}>
                    {accessStatus === 'accessible' ? '🔓' : '🔒'}
                  </span>
                </div>
                <div className="members-list">
                  {members.map((member, index) => (
                    <div
                      key={index}
                      className={`member-item ${accessStatus}`}
                      onClick={() => attemptAccess(modifier, member)}
                    >
                      <span className="member-icon">{member.icon}</span>
                      <span className="member-name">{member.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      <div className="access-log">
        <h3>Access Attempts Log</h3>
        {accessAttempts.length === 0 ? (
          <p className="log-empty">Click on class members to test access...</p>
        ) : (
          <div className="log-entries">
            {accessAttempts.map((attempt, index) => (
              <div 
                key={index} 
                className={`log-entry ${attempt.success ? 'success' : 'denied'}`}
              >
                <span className="log-time">{attempt.time}</span>
                <span className="log-context">[{attempt.context}]</span>
                <span className="log-message">{attempt.message}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="modifier-guide">
        <h4>Access Modifier Rules:</h4>
        <div className="guide-items">
          <div className="guide-item">
            <span className="modifier-badge private">private</span>
            <span>Only accessible within the same class</span>
          </div>
          <div className="guide-item">
            <span className="modifier-badge protected">protected</span>
            <span>Accessible within class and subclasses</span>
          </div>
          <div className="guide-item">
            <span className="modifier-badge public">public</span>
            <span>Accessible from anywhere</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CodeGatekeeper