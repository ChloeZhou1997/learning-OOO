import React, { useState } from 'react'
import './RobustObjectConstruction.css'

const RobustObjectConstruction = () => {
  const [constructorInputs, setConstructorInputs] = useState({
    name: 'John Doe',
    age: '25',
    email: 'john@example.com',
    salary: '50000'
  })
  const [constructionResult, setConstructionResult] = useState(null)
  const [validationSteps, setValidationSteps] = useState([])
  const [selectedConstructor, setSelectedConstructor] = useState('robust')

  const constructors = {
    basic: {
      name: 'Basic Constructor',
      code: `constructor(name, age, email, salary) {
  this.name = name
  this.age = age
  this.email = email
  this.salary = salary
}`,
      validate: (inputs) => {
        return {
          success: true,
          object: inputs,
          steps: [
            { step: 'Assignment', status: 'success', message: 'All values assigned directly' }
          ]
        }
      }
    },
    robust: {
      name: 'Robust Constructor',
      code: `constructor(name, age, email, salary) {
  // Validate name
  if (!name || name.trim().length < 2) {
    throw new Error('Name must be at least 2 characters')
  }
  
  // Validate age
  const ageNum = parseInt(age)
  if (isNaN(ageNum) || ageNum < 0 || ageNum > 150) {
    throw new Error('Age must be between 0 and 150')
  }
  
  // Validate email
  const emailRegex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/
  if (!emailRegex.test(email)) {
    throw new Error('Invalid email format')
  }
  
  // Validate salary
  const salaryNum = parseFloat(salary)
  if (isNaN(salaryNum) || salaryNum < 0) {
    throw new Error('Salary must be a positive number')
  }
  
  // Set validated values
  this.name = name.trim()
  this.age = ageNum
  this.email = email.toLowerCase()
  this.salary = salaryNum
  
  // Set defaults
  this.id = generateId()
  this.createdAt = new Date()
  this.active = true
}`,
      validate: (inputs) => {
        const steps = []
        const errors = []
        
        // Validate name
        steps.push({
          step: 'Validate Name',
          status: !inputs.name || inputs.name.trim().length < 2 ? 'error' : 'success',
          message: !inputs.name || inputs.name.trim().length < 2 
            ? 'Name must be at least 2 characters' 
            : `Name "${inputs.name}" is valid`
        })
        
        // Validate age
        const ageNum = parseInt(inputs.age)
        const ageValid = !isNaN(ageNum) && ageNum >= 0 && ageNum <= 150
        steps.push({
          step: 'Validate Age',
          status: ageValid ? 'success' : 'error',
          message: ageValid 
            ? `Age ${ageNum} is valid` 
            : 'Age must be between 0 and 150'
        })
        
        // Validate email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        const emailValid = emailRegex.test(inputs.email)
        steps.push({
          step: 'Validate Email',
          status: emailValid ? 'success' : 'error',
          message: emailValid 
            ? `Email "${inputs.email}" is valid` 
            : 'Invalid email format'
        })
        
        // Validate salary
        const salaryNum = parseFloat(inputs.salary)
        const salaryValid = !isNaN(salaryNum) && salaryNum >= 0
        steps.push({
          step: 'Validate Salary',
          status: salaryValid ? 'success' : 'error',
          message: salaryValid 
            ? `Salary $${salaryNum} is valid` 
            : 'Salary must be a positive number'
        })
        
        const hasErrors = steps.some(s => s.status === 'error')
        
        if (!hasErrors) {
          steps.push({
            step: 'Set Defaults',
            status: 'success',
            message: 'ID, createdAt, and active status initialized'
          })
        }
        
        return {
          success: !hasErrors,
          object: hasErrors ? null : {
            name: inputs.name.trim(),
            age: ageNum,
            email: inputs.email.toLowerCase(),
            salary: salaryNum,
            id: 'EMP-' + Math.random().toString(36).substr(2, 9),
            createdAt: new Date().toISOString(),
            active: true
          },
          steps
        }
      }
    },
    overloaded: {
      name: 'Overloaded Constructor',
      code: `// Multiple constructor patterns
constructor(data) {
  // Handle different input formats
  if (typeof data === 'string') {
    // Parse from JSON string
    const parsed = JSON.parse(data)
    this.initFromObject(parsed)
  } else if (Array.isArray(data)) {
    // Initialize from array [name, age, email, salary]
    this.initFromArray(data)
  } else if (typeof data === 'object') {
    // Initialize from object
    this.initFromObject(data)
  } else {
    throw new Error('Invalid constructor argument')
  }
}

initFromObject(obj) {
  // Validate and set from object...
}

initFromArray(arr) {
  // Validate and set from array...
}`,
      validate: (inputs) => {
        return {
          success: true,
          object: {
            ...inputs,
            age: parseInt(inputs.age),
            salary: parseFloat(inputs.salary),
            id: 'EMP-' + Math.random().toString(36).substr(2, 9),
            createdAt: new Date().toISOString(),
            source: 'Initialized from object'
          },
          steps: [
            { step: 'Detect Input Type', status: 'success', message: 'Input is object format' },
            { step: 'Route to Handler', status: 'success', message: 'Using initFromObject()' },
            { step: 'Initialize', status: 'success', message: 'Object created successfully' }
          ]
        }
      }
    }
  }

  const handleConstruct = () => {
    const constructor = constructors[selectedConstructor]
    const result = constructor.validate(constructorInputs)
    
    setValidationSteps(result.steps)
    setConstructionResult(result)
  }

  const handleInputChange = (field, value) => {
    setConstructorInputs({ ...constructorInputs, [field]: value })
    setConstructionResult(null)
    setValidationSteps([])
  }

  return (
    <div className="robust-construction-container">
      <div className="constructor-selector">
        <h3>Select Constructor Type:</h3>
        <div className="constructor-buttons">
          {Object.entries(constructors).map(([key, constructor]) => (
            <button
              key={key}
              className={`constructor-btn ${selectedConstructor === key ? 'active' : ''}`}
              onClick={() => {
                setSelectedConstructor(key)
                setConstructionResult(null)
                setValidationSteps([])
              }}
            >
              {constructor.name}
            </button>
          ))}
        </div>
      </div>

      <div className="construction-workspace">
        <div className="input-panel">
          <h4>Constructor Inputs</h4>
          <div className="input-fields">
            {Object.entries(constructorInputs).map(([field, value]) => (
              <div key={field} className="input-group">
                <label>{field.charAt(0).toUpperCase() + field.slice(1)}:</label>
                <input
                  type="text"
                  value={value}
                  onChange={(e) => handleInputChange(field, e.target.value)}
                  placeholder={`Enter ${field}...`}
                />
              </div>
            ))}
          </div>
          <button className="construct-btn" onClick={handleConstruct}>
            Construct Object
          </button>
        </div>

        <div className="code-panel">
          <h4>{constructors[selectedConstructor].name} Implementation</h4>
          <pre>
            <code>{constructors[selectedConstructor].code}</code>
          </pre>
        </div>
      </div>

      {validationSteps.length > 0 && (
        <div className="validation-process">
          <h4>Construction Process:</h4>
          <div className="validation-steps">
            {validationSteps.map((step, index) => (
              <div 
                key={index} 
                className={`validation-step ${step.status}`}
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="step-icon">
                  {step.status === 'success' ? '✅' : '❌'}
                </div>
                <div className="step-content">
                  <strong>{step.step}</strong>
                  <p>{step.message}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {constructionResult && (
        <div className={`construction-result ${constructionResult.success ? 'success' : 'error'}`}>
          <h4>Construction Result:</h4>
          {constructionResult.success ? (
            <>
              <p className="success-message">✅ Object successfully created!</p>
              <div className="created-object">
                <h5>Created Employee Object:</h5>
                <pre>
                  <code>{JSON.stringify(constructionResult.object, null, 2)}</code>
                </pre>
              </div>
            </>
          ) : (
            <p className="error-message">
              ❌ Construction failed! Fix the validation errors above.
            </p>
          )}
        </div>
      )}

      <div className="best-practices">
        <h4>Constructor Best Practices:</h4>
        <ul>
          <li><strong>Validate Early:</strong> Check all inputs before setting any properties</li>
          <li><strong>Fail Fast:</strong> Throw descriptive errors for invalid inputs</li>
          <li><strong>Set Defaults:</strong> Initialize all properties to prevent undefined state</li>
          <li><strong>Type Conversion:</strong> Convert strings to appropriate types (numbers, dates)</li>
          <li><strong>Immutable After Creation:</strong> Consider making critical properties read-only</li>
        </ul>
      </div>
    </div>
  )
}

export default RobustObjectConstruction