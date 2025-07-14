import React, { useState } from 'react'
import './CodeGatekeeper.css'

const CodeGatekeeper = () => {
  const [selectedModifier, setSelectedModifier] = useState('public')
  const [accessAttempts, setAccessAttempts] = useState([])
  const [currentContext, setCurrentContext] = useState('outside')

  const classMembers = {
    private: [
      { name: '_parameters', type: 'field', value: 'OrderedDict()', icon: '📦' },
      { name: '_buffers', type: 'field', value: 'OrderedDict()', icon: '💾' },
      { name: '_modules', type: 'field', value: 'OrderedDict()', icon: '🔗' },
      { name: '_load_state_dict_pre_hooks', type: 'field', value: 'OrderedDict()', icon: '🪝' },
      { name: '_apply(fn)', type: 'method', icon: '🔧' },
      { name: '_named_members()', type: 'method', icon: '🏷️' }
    ],
    protected: [
      { name: '_forward_unimplemented()', type: 'method', icon: '⚠️' },
      { name: '_get_name()', type: 'method', icon: '📛' },
      { name: '_replicate_for_data_parallel()', type: 'method', icon: '📊' }
    ],
    public: [
      { name: 'forward(*input)', type: 'method', icon: '➡️' },
      { name: 'parameters()', type: 'method', icon: '⚙️' },
      { name: 'named_parameters()', type: 'method', icon: '🏷️' },
      { name: 'train(mode=True)', type: 'method', icon: '🏃' },
      { name: 'eval()', type: 'method', icon: '📈' },
      { name: 'to(device)', type: 'method', icon: '🖥️' },
      { name: 'register_parameter()', type: 'method', icon: '📝' },
      { name: 'add_module()', type: 'method', icon: '➕' }
    ]
  }

  const contexts = {
    outside: { name: 'User Code', canAccess: ['public'] },
    subclass: { name: 'Custom Layer (Subclass)', canAccess: ['public', 'protected'] },
    inside: { name: 'nn.Module Internal', canAccess: ['public', 'protected', 'private'] }
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
          <h3>🧠 PyTorch nn.Module Class</h3>
          <p className="class-subtitle">The foundation of every neural network in PyTorch!</p>
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
        
        <div className="framework-insight">
          <h4>🚀 Understanding PyTorch's Design:</h4>
          <p>
            This interactive demonstrates the actual access patterns in PyTorch's nn.Module:
          </p>
          <ul>
            <li><strong>Private (_parameters, _buffers):</strong> Core state management that users should never directly modify</li>
            <li><strong>Protected (_forward_unimplemented):</strong> Methods that subclasses might need but aren't part of the public API</li>
            <li><strong>Public (forward, parameters, train):</strong> The clean, documented API that users interact with</li>
          </ul>
          <p className="challenge-prompt">
            💡 <strong>Try this:</strong> Click on different members from different contexts to see how PyTorch enforces encapsulation. Notice how user code can only access the public API, while custom layers (subclasses) get additional protected access!
          </p>
        </div>
      </div>
    </div>
  )
}

export default CodeGatekeeper