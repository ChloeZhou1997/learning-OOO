import React, { useState } from 'react'
import './NetworkCall.css'

const NetworkCall = () => {
  const [currentStep, setCurrentStep] = useState('idle')
  const [validationError, setValidationError] = useState(null)
  const [serverProcessing, setServerProcessing] = useState(false)
  const [requestData, setRequestData] = useState({
    query: 'What is machine learning?',
    model: 'gpt-4',
    temperature: 0.7
  })

  const steps = {
    idle: { label: 'Ready', description: 'LangChain client ready' },
    clientValidation: { label: 'Input Validation', description: 'LangChain validates prompt' },
    serialization: { label: 'Request Building', description: 'Creating OpenAI API request' },
    networkTransit: { label: 'API Call', description: 'Sending to OpenAI servers' },
    serverReceive: { label: 'OpenAI Receives', description: 'Request queued for processing' },
    serverValidation: { label: 'Token Validation', description: 'Checking API key and limits' },
    serverProcess: { label: 'LLM Processing', description: 'GPT-4 generating response' },
    serverResponse: { label: 'Streaming Response', description: 'Tokens streaming back' },
    clientReceive: { label: 'Chain Output', description: 'LangChain processes response' }
  }

  const clientFormObject = {
    type: 'LLMChain',
    prompt: {
      template: requestData.query,
      inputVariables: [],
      validate: 'async () => { ... }'
    },
    llm: {
      model: requestData.model,
      temperature: requestData.temperature,
      maxTokens: 1000
    }
  }

  const serializedData = JSON.stringify({
    model: requestData.model,
    messages: [{
      role: 'user',
      content: requestData.query
    }],
    temperature: requestData.temperature,
    stream: true
  }, null, 2)

  const serverUserObject = {
    type: 'OpenAICompletionHandler',
    requestId: 'req_abc123',
    model: requestData.model,
    promptTokens: 15,
    maxCompletionTokens: 1000,
    streamHandler: 'AsyncGenerator',
    process: 'async function* () { ... }'
  }

  const responseData = {
    id: 'chatcmpl-abc123',
    object: 'chat.completion',
    created: Date.now(),
    model: requestData.model,
    choices: [{
      message: {
        role: 'assistant',
        content: 'Machine learning is a subset of AI that enables systems to learn from data...'
      },
      finish_reason: 'stop'
    }],
    usage: {
      prompt_tokens: 15,
      completion_tokens: 127,
      total_tokens: 142
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
    if (requestData.query.length < 5) {
      setValidationError('Query too short! Please provide more context.')
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
        <h3>LangChain → OpenAI API Communication</h3>
        <p>See how LLM chains serialize requests and handle streaming responses</p>
      </div>

      <div className="network-visualization">
        <div className="client-side">
          <h4>🔗 LangChain Client</h4>
          
          <div className="client-form">
            <h5>LangChain LLM Query</h5>
            <textarea
              placeholder="Enter your question..."
              value={requestData.query}
              onChange={(e) => setRequestData({...requestData, query: e.target.value})}
              rows={3}
            />
            <div className="model-settings">
              <select 
                value={requestData.model}
                onChange={(e) => setRequestData({...requestData, model: e.target.value})}
              >
                <option value="gpt-4">GPT-4</option>
                <option value="gpt-3.5-turbo">GPT-3.5 Turbo</option>
                <option value="claude-3">Claude 3</option>
              </select>
              <label>
                Temperature: {requestData.temperature}
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={requestData.temperature}
                  onChange={(e) => setRequestData({...requestData, temperature: parseFloat(e.target.value)})}
                />
              </label>
            </div>
            <button 
              onClick={runNetworkFlow}
              disabled={currentStep !== 'idle'}
            >
              {currentStep === 'idle' ? 'Send to LLM' : 'Processing...'}
            </button>
            {validationError && (
              <div className="error-message">{validationError}</div>
            )}
          </div>

          <div className={`object-view ${isStepActive('clientValidation') ? 'active' : ''}`}>
            <h5>LangChain LLMChain Object</h5>
            <pre>
              <code>{JSON.stringify(clientFormObject, null, 2)}</code>
            </pre>
          </div>

          {isStepActive('clientValidation') && (
            <div className="validation-note client">
              ⚡ LangChain validates prompt structure before API call
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
            <span>POST https://api.openai.com/v1/chat/completions</span>
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
          <h4>🤖 OpenAI API Server</h4>

          <div className={`object-view ${isStepActive('serverReceive') ? 'active' : ''}`}>
            <h5>OpenAI Request Handler</h5>
            <pre>
              <code>{JSON.stringify(serverUserObject, null, 2)}</code>
            </pre>
          </div>

          {serverProcessing && (
            <div className="server-processes">
              <div className={`process ${currentStep === 'serverValidation' ? 'active' : ''}`}>
                🔐 Validate API key
              </div>
              <div className={`process ${currentStep === 'serverProcess' ? 'active' : ''}`}>
                🧠 Load model weights
              </div>
              <div className={`process ${currentStep === 'serverProcess' ? 'active' : ''}`}>
                ⚙️ Generate tokens
              </div>
            </div>
          )}

          {isStepActive('serverValidation') && (
            <div className="validation-note server">
              🛡️ Token limit validation & content filtering
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
        <h4>LangChain + LLM API Concepts:</h4>
        <div className="concepts-grid">
          <div className="concept">
            <h5>🔗 Chain Abstraction</h5>
            <p>LangChain wraps complex API calls in simple interfaces</p>
          </div>
          <div className="concept">
            <h5>🌊 Streaming Responses</h5>
            <p>Tokens stream back as they're generated</p>
          </div>
          <div className="concept">
            <h5>📊 Token Management</h5>
            <p>Track usage for cost and context limits</p>
          </div>
          <div className="concept">
            <h5>🔄 Retry & Error Handling</h5>
            <p>Automatic retries on rate limits</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NetworkCall