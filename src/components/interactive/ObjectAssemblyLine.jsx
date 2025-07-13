import React, { useState } from 'react'
import './ObjectAssemblyLine.css'

const ObjectAssemblyLine = () => {
  const [currentStep, setCurrentStep] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const [createdObject, setCreatedObject] = useState(null)

  const steps = [
    {
      id: 'allocate',
      title: '1. Memory Allocation',
      description: 'System allocates memory space for the new object',
      icon: '💾',
      code: '// Memory is reserved\nlet person = { }',
      visual: 'empty-space'
    },
    {
      id: 'construct',
      title: '2. Constructor Called',
      description: 'Constructor initializes the object with provided values',
      icon: '🔨',
      code: 'constructor(name, age) {\n  this.name = name\n  this.age = age\n}',
      visual: 'filling'
    },
    {
      id: 'initialize',
      title: '3. Field Initialization',
      description: 'Default values are set for any uninitialized fields',
      icon: '⚙️',
      code: 'this.id = generateId()\nthis.createdAt = new Date()\nthis.active = true',
      visual: 'complete'
    },
    {
      id: 'validate',
      title: '4. Validation',
      description: 'Constructor validates the object state before returning',
      icon: '✅',
      code: 'if (age < 0) {\n  throw new Error("Invalid age")\n}',
      visual: 'validated'
    },
    {
      id: 'ready',
      title: '5. Object Ready',
      description: 'Fully initialized object is returned to the caller',
      icon: '🎉',
      code: 'return person // Ready to use!',
      visual: 'ready'
    }
  ]

  const handleStepClick = (index) => {
    if (!isAnimating) {
      setCurrentStep(index)
    }
  }

  const runFullAnimation = () => {
    setIsAnimating(true)
    setCurrentStep(0)
    setCreatedObject(null)

    const animateSteps = (step) => {
      if (step < steps.length) {
        setCurrentStep(step)
        setTimeout(() => animateSteps(step + 1), 1200)
      } else {
        setIsAnimating(false)
        setCreatedObject({
          name: 'John Doe',
          age: 30,
          id: 'USR-12345',
          createdAt: new Date().toLocaleString(),
          active: true
        })
      }
    }

    animateSteps(0)
  }

  const getObjectVisual = () => {
    const step = steps[currentStep]
    
    switch(step.visual) {
      case 'empty-space':
        return (
          <div className="object-visual empty">
            <div className="memory-block">
              <span>Memory Block</span>
              <div className="empty-slots">
                <div className="slot empty"></div>
                <div className="slot empty"></div>
                <div className="slot empty"></div>
              </div>
            </div>
          </div>
        )
      case 'filling':
        return (
          <div className="object-visual filling">
            <div className="memory-block">
              <span>Person Object</span>
              <div className="slots">
                <div className="slot filled">name: "John Doe"</div>
                <div className="slot filled">age: 30</div>
                <div className="slot empty"></div>
              </div>
            </div>
          </div>
        )
      case 'complete':
        return (
          <div className="object-visual complete">
            <div className="memory-block">
              <span>Person Object</span>
              <div className="slots">
                <div className="slot filled">name: "John Doe"</div>
                <div className="slot filled">age: 30</div>
                <div className="slot filled">id: "USR-12345"</div>
                <div className="slot filled">createdAt: "{new Date().toLocaleTimeString()}"</div>
                <div className="slot filled">active: true</div>
              </div>
            </div>
          </div>
        )
      case 'validated':
        return (
          <div className="object-visual validated">
            <div className="memory-block validated">
              <span>Person Object ✓</span>
              <div className="slots">
                <div className="slot filled validated">name: "John Doe" ✓</div>
                <div className="slot filled validated">age: 30 ✓</div>
                <div className="slot filled">id: "USR-12345"</div>
                <div className="slot filled">createdAt: "{new Date().toLocaleTimeString()}"</div>
                <div className="slot filled">active: true</div>
              </div>
            </div>
          </div>
        )
      case 'ready':
        return (
          <div className="object-visual ready">
            <div className="memory-block ready">
              <span>Person Object 🎉</span>
              <div className="slots">
                <div className="slot filled ready">name: "John Doe"</div>
                <div className="slot filled ready">age: 30</div>
                <div className="slot filled ready">id: "USR-12345"</div>
                <div className="slot filled ready">createdAt: "{new Date().toLocaleTimeString()}"</div>
                <div className="slot filled ready">active: true</div>
              </div>
            </div>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div className="assembly-line-container">
      <div className="assembly-header">
        <h3>Object Creation Assembly Line</h3>
        <button 
          className="run-animation-btn"
          onClick={runFullAnimation}
          disabled={isAnimating}
        >
          {isAnimating ? 'Running...' : '▶ Run Full Animation'}
        </button>
      </div>

      <div className="assembly-line">
        <div className="steps-track">
          {steps.map((step, index) => (
            <div
              key={step.id}
              className={`step ${index === currentStep ? 'active' : ''} ${index < currentStep ? 'completed' : ''}`}
              onClick={() => handleStepClick(index)}
            >
              <div className="step-icon">{step.icon}</div>
              <div className="step-content">
                <h4>{step.title}</h4>
                <p>{step.description}</p>
              </div>
              {index < steps.length - 1 && <div className="step-connector" />}
            </div>
          ))}
        </div>

        <div className="visualization-area">
          <div className="code-panel">
            <h4>Code Execution</h4>
            <pre>
              <code>{steps[currentStep].code}</code>
            </pre>
          </div>

          <div className="object-panel">
            <h4>Object State</h4>
            {getObjectVisual()}
          </div>
        </div>
      </div>

      {createdObject && (
        <div className="result-panel">
          <h4>✨ Object Successfully Created!</h4>
          <div className="final-object">
            <pre>
              <code>{JSON.stringify(createdObject, null, 2)}</code>
            </pre>
          </div>
        </div>
      )}

      <div className="explanation">
        <p>
          <strong>Key Concept:</strong> Object creation is a multi-step process. 
          The constructor ensures that every object starts life in a valid, 
          consistent state. This prevents bugs caused by partially initialized objects.
        </p>
      </div>
    </div>
  )
}

export default ObjectAssemblyLine