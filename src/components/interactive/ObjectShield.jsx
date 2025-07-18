import React, { useState, useEffect } from 'react'
import { useAnalytics } from '../../hooks/useAnalytics'
import './ObjectShield.css'

/**
 * ObjectShield Interactive Component
 * 
 * Demonstrates the concept of encapsulation in object-oriented programming by visualizing
 * how objects protect their internal state from direct external access.
 * 
 * @component
 * @example
 * return (
 *   <ObjectShield />
 * )
 * 
 * Educational concepts covered:
 * - Data hiding and encapsulation
 * - Public vs private access modifiers
 * - Controlled access through public methods
 * - Real-world example using React component internals
 */
const ObjectShield = ({ chapterId = 'unknown' }) => {
  const [selectedAccess, setSelectedAccess] = useState('public')
  const [attempts, setAttempts] = useState([])
  const [shieldActive, setShieldActive] = useState(true)
  const { trackComponentInteraction, trackComponentTime } = useAnalytics()
  const [startTime] = useState(Date.now())

  /**
   * Simulated private state of a React component
   * These represent internal implementation details that should not be directly accessible
   */
  const privateState = {
    _state: 'Object { count: 42, user: "John" }',
    _props: 'Object { theme: "dark", size: "large" }',
    _hooks: '["useState", "useEffect"]',
    _fiber: 'FiberNode<Component>'
  }

  /**
   * Public API methods that provide controlled access to the component
   * These are the only approved ways to interact with the component's internals
   */
  const publicMethods = {
    setState: (updates) => `State updated with ${JSON.stringify(updates)}`,
    forceUpdate: () => 'Component re-rendered',
    render: () => '<div>Hello World</div>',
    componentDidMount: () => 'Lifecycle: Component mounted'
  }

  // Track component usage on mount
  useEffect(() => {
    trackComponentInteraction('ObjectShield', chapterId, 'started');
    
    // Track time spent when component unmounts
    return () => {
      const timeSpent = Math.round((Date.now() - startTime) / 1000); // seconds
      trackComponentTime('ObjectShield', chapterId, timeSpent);
    };
  }, [chapterId, startTime, trackComponentInteraction, trackComponentTime]);

  /**
   * Handles access attempts to the object's data
   * @param {string} type - Type of access attempt ('direct' or 'method')
   * @param {string} target - The property or method being accessed
   */
  const handleAccess = (type, target) => {
    const timestamp = new Date().toLocaleTimeString()
    let result = {
      time: timestamp,
      type,
      target,
      success: false,
      message: ''
    }

    if (type === 'direct') {
      result.success = false
      result.message = `🛡️ BLOCKED: Direct access to private ${target} denied!`
    } else if (type === 'method') {
      result.success = true
      result.message = `✅ SUCCESS: ${publicMethods[target]()}`
    }

    setAttempts([result, ...attempts.slice(0, 4)])
    
    // Track interaction
    trackComponentInteraction('ObjectShield', chapterId, 'interaction', {
      accessType: type,
      target: target,
      success: result.success
    })
  }

  return (
    <div className="object-shield-container">
      <div className="shield-visual">
        <div className="outer-world">
          <h3>Outside World</h3>
          <div className="access-controls">
            <button 
              className={`access-btn ${selectedAccess === 'direct' ? 'active danger' : ''}`}
              onClick={() => setSelectedAccess('direct')}
            >
              Direct Access
            </button>
            <button 
              className={`access-btn ${selectedAccess === 'public' ? 'active safe' : ''}`}
              onClick={() => setSelectedAccess('public')}
            >
              Public Methods
            </button>
          </div>
        </div>

        <div className={`shield-layer ${shieldActive ? 'active' : 'inactive'}`}>
          <div className="shield-icon">🛡️</div>
          <span>Encapsulation Shield</span>
        </div>

        <div className="object-core">
          <h3>React Component Instance</h3>
          
          <div className="private-section">
            <h4>🔒 Private Internal State</h4>
            {Object.entries(privateState).map(([key, value]) => (
              <div 
                key={key}
                className={`data-item private ${selectedAccess === 'direct' ? 'targeted' : ''}`}
                onClick={() => selectedAccess === 'direct' && handleAccess('direct', key)}
              >
                <span className="key">{key}:</span>
                <span className="value">{selectedAccess === 'direct' ? '???' : String(value)}</span>
              </div>
            ))}
          </div>

          <div className="public-section">
            <h4>🌐 Public Methods</h4>
            {Object.keys(publicMethods).map(method => (
              <button
                key={method}
                className={`method-btn ${selectedAccess === 'public' ? 'accessible' : ''}`}
                onClick={() => selectedAccess === 'public' && handleAccess('method', method)}
                disabled={selectedAccess !== 'public'}
              >
                {method}()
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="access-log">
        <h3>Access Log</h3>
        {attempts.length === 0 ? (
          <p className="log-empty">Try accessing the object's data or methods...</p>
        ) : (
          <div className="log-entries">
            {attempts.map((attempt, index) => (
              <div 
                key={index} 
                className={`log-entry ${attempt.success ? 'success' : 'blocked'}`}
              >
                <span className="log-time">{attempt.time}</span>
                <span className="log-message">{attempt.message}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="explanation">
        <p>
          <strong>React's Encapsulation:</strong> React components hide their internal state, props, 
          and fiber nodes from direct access. You can't directly modify _state or _fiber. 
          Instead, React provides public APIs like setState() and lifecycle methods for controlled 
          interaction. This ensures component integrity and enables React's reconciliation algorithm.
        </p>
        <div className="framework-note">
          <strong>Real-world impact:</strong> This encapsulation is why React can efficiently update 
          the DOM, track component changes, and maintain a virtual DOM - all internal implementation 
          details are hidden behind a clean public API.
        </div>
      </div>
    </div>
  )
}

export default ObjectShield