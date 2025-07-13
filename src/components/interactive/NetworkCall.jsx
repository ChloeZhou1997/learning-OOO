import React, { useState } from 'react'
import './NetworkCall.css'

const NetworkCall = () => {
  const [currentStep, setCurrentStep] = useState('idle')
  const [validationError, setValidationError] = useState(null)
  const [serverProcessing, setServerProcessing] = useState(false)
  const [requestData, setRequestData] = useState({
    username: 'alice@example.com',
    password: 'password123'
  })

  const steps = {
    idle: { label: 'Ready', description: 'Waiting for user action' },
    clientValidation: { label: 'Client Validation', description: 'Checking form data in browser' },
    serialization: { label: 'Serialization', description: 'Converting objects to JSON' },
    networkTransit: { label: 'Network Transit', description: 'Sending data over network' },
    serverReceive: { label: 'Server Receives', description: 'Server receives and parses data' },
    serverValidation: { label: 'Server Validation', description: 'Authoritative validation on server' },
    serverProcess: { label: 'Processing', description: 'Server processes the request' },
    serverResponse: { label: 'Response', description: 'Server sends response' },
    clientReceive: { label: 'Client Update', description: 'Client receives and updates UI' }
  }

  const clientFormObject = {
    type: 'LoginForm',
    fields: {
      username: { value: requestData.username, valid: true },
      password: { value: requestData.password, valid: true }
    },
    validate: 'function() { ... }'
  }

  const serializedData = JSON.stringify({
    username: requestData.username,
    password: requestData.password
  }, null, 2)

  const serverUserObject = {
    type: 'User',
    id: 12345,
    username: requestData.username,
    passwordHash: '5f4dcc3b5aa765d61d8327deb882cf99',
    lastLogin: new Date().toISOString(),
    authenticate: 'function() { ... }'
  }

  const responseData = {
    success: true,
    user: {
      id: 12345,
      username: requestData.username,
      token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
    }
  }

  const runNetworkFlow = async () => {
    // Reset
    setCurrentStep('clientValidation')
    setValidationError(null)
    setServerProcessing(false)

    // Client validation
    await sleep(800)
    
    // Check for validation error simulation
    if (requestData.username.length < 3) {
      setValidationError('Username too short!')
      setCurrentStep('idle')
      return
    }

    // Serialization
    setCurrentStep('serialization')
    await sleep(800)

    // Network transit
    setCurrentStep('networkTransit')
    await sleep(1200)

    // Server receives
    setCurrentStep('serverReceive')
    await sleep(600)

    // Server validation
    setCurrentStep('serverValidation')
    setServerProcessing(true)
    await sleep(1000)

    // Server processing
    setCurrentStep('serverProcess')
    await sleep(1200)

    // Server response
    setCurrentStep('serverResponse')
    await sleep(800)

    // Client receives
    setCurrentStep('clientReceive')
    await sleep(600)

    // Complete
    setServerProcessing(false)
    setTimeout(() => setCurrentStep('idle'), 2000)
  }

  const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms))

  const isStepActive = (step) => {
    const stepOrder = Object.keys(steps)
    const currentIndex = stepOrder.indexOf(currentStep)
    const stepIndex = stepOrder.indexOf(step)
    return stepIndex <= currentIndex && currentStep !== 'idle'
  }

  return (
    <div className="network-call-container">
      <div className="network-header">
        <h3>Client/Server Object Communication</h3>
        <p>See how objects are serialized and transmitted between client and server</p>
      </div>

      <div className="network-visualization">
        <div className="client-side">
          <h4>🖥️ Client (Browser)</h4>
          
          <div className="client-form">
            <h5>Login Form</h5>
            <input
              type="text"
              placeholder="Username"
              value={requestData.username}
              onChange={(e) => setRequestData({...requestData, username: e.target.value})}
            />
            <input
              type="password"
              placeholder="Password"
              value={requestData.password}
              onChange={(e) => setRequestData({...requestData, password: e.target.value})}
            />
            <button 
              onClick={runNetworkFlow}
              disabled={currentStep !== 'idle'}
            >
              {currentStep === 'idle' ? 'Submit Login' : 'Processing...'}
            </button>
            {validationError && (
              <div className="error-message">{validationError}</div>
            )}
          </div>

          <div className={`object-view ${isStepActive('clientValidation') ? 'active' : ''}`}>
            <h5>Client-Side Form Object</h5>
            <pre>
              <code>{JSON.stringify(clientFormObject, null, 2)}</code>
            </pre>
          </div>

          {isStepActive('clientValidation') && (
            <div className="validation-note client">
              ⚡ Fast client-side validation for immediate feedback
            </div>
          )}
        </div>

        <div className="network-flow">
          <div className={`flow-step ${currentStep === 'serialization' ? 'active' : ''}`}>
            <div className="step-icon">📦</div>
            <span>Serialize to JSON</span>
          </div>

          <div className={`network-line ${isStepActive('networkTransit') ? 'active' : ''}`}>
            <div className="data-packet">
              {isStepActive('serialization') && (
                <pre>
                  <code>{serializedData}</code>
                </pre>
              )}
            </div>
            <div className="arrow down"></div>
          </div>

          <div className={`api-endpoint ${isStepActive('serverReceive') ? 'active' : ''}`}>
            <span>POST /api/login</span>
          </div>

          <div className={`network-line ${isStepActive('serverResponse') ? 'active' : ''}`}>
            <div className="arrow up"></div>
            <div className="data-packet response">
              {isStepActive('serverResponse') && (
                <pre>
                  <code>{JSON.stringify(responseData, null, 2)}</code>
                </pre>
              )}
            </div>
          </div>
        </div>

        <div className="server-side">
          <h4>🖥️ Server (Backend)</h4>

          <div className={`object-view ${isStepActive('serverReceive') ? 'active' : ''}`}>
            <h5>Server-Side User Object</h5>
            <pre>
              <code>{JSON.stringify(serverUserObject, null, 2)}</code>
            </pre>
          </div>

          {serverProcessing && (
            <div className="server-processes">
              <div className={`process ${currentStep === 'serverValidation' ? 'active' : ''}`}>
                🔐 Validate credentials
              </div>
              <div className={`process ${currentStep === 'serverProcess' ? 'active' : ''}`}>
                🔑 Generate auth token
              </div>
              <div className={`process ${currentStep === 'serverProcess' ? 'active' : ''}`}>
                💾 Update last login
              </div>
            </div>
          )}

          {isStepActive('serverValidation') && (
            <div className="validation-note server">
              🛡️ Authoritative server-side validation (never trust the client!)
            </div>
          )}
        </div>
      </div>

      <div className="step-indicator">
        <h4>Current Step: {steps[currentStep]?.label || 'Ready'}</h4>
        <p>{steps[currentStep]?.description || 'Click Submit to start'}</p>
        <div className="step-progress">
          {Object.entries(steps).slice(1).map(([key, step]) => (
            <div 
              key={key} 
              className={`progress-step ${isStepActive(key) ? 'completed' : ''} ${currentStep === key ? 'active' : ''}`}
            >
              <div className="step-dot"></div>
              <span>{step.label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="key-concepts">
        <h4>Key Concepts:</h4>
        <div className="concepts-grid">
          <div className="concept">
            <h5>🎭 Dual Validation</h5>
            <p>Client-side for UX, server-side for security</p>
          </div>
          <div className="concept">
            <h5>📦 Serialization</h5>
            <p>Objects converted to JSON for transmission</p>
          </div>
          <div className="concept">
            <h5>🔒 Security</h5>
            <p>Never trust client data - always validate server-side</p>
          </div>
          <div className="concept">
            <h5>🏗️ Object Reconstruction</h5>
            <p>JSON data becomes objects on both ends</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NetworkCall