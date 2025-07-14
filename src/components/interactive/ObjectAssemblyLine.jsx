import React, { useState } from 'react'
import './ObjectAssemblyLine.css'

const ObjectAssemblyLine = () => {
  const [currentStep, setCurrentStep] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const [createdObject, setCreatedObject] = useState(null)

  const steps = [
    {
      id: 'scan',
      title: '1. Component Scanning',
      description: 'Spring scans for @Component, @Service, @Repository annotations',
      icon: '🔍',
      code: '@Service\n@Transactional\npublic class UserService {\n  // Spring detects this class\n}',
      visual: 'scanning'
    },
    {
      id: 'instantiate',
      title: '2. Bean Instantiation',
      description: 'Spring creates instance using reflection or factory',
      icon: '🏗️',
      code: '// Spring internally does:\nUserService userService = \n  constructor.newInstance();',
      visual: 'instantiating'
    },
    {
      id: 'inject',
      title: '3. Dependency Injection',
      description: '@Autowired dependencies are injected',
      icon: '💉',
      code: '@Autowired\nprivate UserRepository userRepo;\n@Autowired\nprivate EmailService emailService;',
      visual: 'injecting'
    },
    {
      id: 'postconstruct',
      title: '4. Post-Construction',
      description: '@PostConstruct methods are called',
      icon: '🚀',
      code: '@PostConstruct\npublic void init() {\n  cache.warmUp();\n  logger.info("Service ready");\n}',
      visual: 'postconstruct'
    },
    {
      id: 'proxy',
      title: '5. Proxy Creation',
      description: 'AOP proxy wraps the bean for transactions, security, etc.',
      icon: '🎭',
      code: '// Spring creates proxy:\nUserService proxy = \n  createProxy(userService);\n// Adds @Transactional behavior',
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
          beanName: 'userService',
          class: 'com.example.UserService',
          scope: 'singleton',
          dependencies: ['userRepository', 'emailService'],
          proxied: true,
          transactional: true,
          initialized: new Date().toLocaleString()
        })
      }
    }

    animateSteps(0)
  }

  const getObjectVisual = () => {
    const step = steps[currentStep]
    
    switch(step.visual) {
      case 'scanning':
        return (
          <div className="object-visual scanning">
            <div className="memory-block">
              <span>🔍 Scanning Classpath...</span>
              <div className="empty-slots">
                <div className="slot scanning">@Service detected</div>
                <div className="slot scanning">@Transactional detected</div>
                <div className="slot empty">Preparing bean...</div>
              </div>
            </div>
          </div>
        )
      case 'instantiating':
        return (
          <div className="object-visual filling">
            <div className="memory-block">
              <span>UserService Bean</span>
              <div className="slots">
                <div className="slot filled">instance: UserService@4a3f</div>
                <div className="slot filled">scope: "singleton"</div>
                <div className="slot empty">dependencies: pending...</div>
              </div>
            </div>
          </div>
        )
      case 'injecting':
        return (
          <div className="object-visual complete">
            <div className="memory-block">
              <span>UserService Bean</span>
              <div className="slots">
                <div className="slot filled">instance: UserService@4a3f</div>
                <div className="slot filled">userRepository: ✓ Injected</div>
                <div className="slot filled">emailService: ✓ Injected</div>
                <div className="slot filled">transactionManager: ✓ Injected</div>
                <div className="slot pending">initialization: pending...</div>
              </div>
            </div>
          </div>
        )
      case 'postconstruct':
        return (
          <div className="object-visual validated">
            <div className="memory-block validated">
              <span>UserService Bean ✓</span>
              <div className="slots">
                <div className="slot filled validated">dependencies: ✓ All injected</div>
                <div className="slot filled validated">@PostConstruct: ✓ Executed</div>
                <div className="slot filled validated">cache: ✓ Warmed up</div>
                <div className="slot filled validated">logger: ✓ Configured</div>
                <div className="slot pending">proxy: creating...</div>
              </div>
            </div>
          </div>
        )
      case 'ready':
        return (
          <div className="object-visual ready">
            <div className="memory-block ready">
              <span>UserService Proxy 🎉</span>
              <div className="slots">
                <div className="slot filled ready">type: CGLIBProxy$UserService</div>
                <div className="slot filled ready">@Transactional: ✓ Enabled</div>
                <div className="slot filled ready">@Cacheable: ✓ Enabled</div>
                <div className="slot filled ready">@Secured: ✓ Enabled</div>
                <div className="slot filled ready">Status: Ready for requests!</div>
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
        <h3>Spring Bean Lifecycle</h3>
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
          <strong>Spring's IoC Container:</strong> Spring manages object creation through a sophisticated 
          lifecycle. It handles dependency injection, initialization callbacks, and AOP proxy creation 
          automatically. This is how frameworks like Spring Boot can wire together complex applications 
          with minimal configuration.
        </p>
        <div className="framework-insight">
          <strong>Real-world impact:</strong> Companies like Netflix, Uber, and LinkedIn use Spring's 
          dependency injection to manage thousands of beans in their microservices, ensuring consistent 
          initialization and proper resource management.
        </div>
      </div>
    </div>
  )
}

export default ObjectAssemblyLine