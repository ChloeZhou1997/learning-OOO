import React, { useState } from 'react'
import './RobustObjectConstruction.css'

const RobustObjectConstruction = () => {
  const [constructorInputs, setConstructorInputs] = useState({
    username: 'john_doe',
    email: 'john@example.com',
    age: '25',
    password: 'MyPass123!',
    role: 'USER'
  })
  const [constructionResult, setConstructionResult] = useState(null)
  const [validationSteps, setValidationSteps] = useState([])
  const [selectedValidator, setSelectedValidator] = useState('javabean')

  const validators = {
    javabean: {
      name: 'Java Bean Validation (Spring)',
      code: `@Entity
public class User {
  @NotBlank(message = "Username is required")
  @Size(min = 3, max = 20)
  @Pattern(regexp = "^[a-zA-Z0-9_]+$")
  private String username;
  
  @NotBlank
  @Email(message = "Email must be valid")
  private String email;
  
  @NotNull
  @Min(value = 18, message = "Must be 18 or older")
  @Max(value = 120)
  private Integer age;
  
  @NotBlank
  @Size(min = 8, max = 100)
  @Pattern(regexp = "^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=]).*$",
          message = "Password must contain digit, lowercase, uppercase, special char")
  private String password;
  
  @NotNull
  @Enumerated(EnumType.STRING)
  private Role role;
}

// Spring automatically validates with @Valid
@PostMapping("/users")
public ResponseEntity<User> createUser(@Valid @RequestBody User user) {
  return ResponseEntity.ok(userService.save(user));
}`,
      validate: (inputs) => {
        const steps = []
        let success = true
        
        // Username validation
        const usernameValid = inputs.username && 
          inputs.username.length >= 3 && 
          inputs.username.length <= 20 &&
          /^[a-zA-Z0-9_]+$/.test(inputs.username)
        steps.push({
          step: '@NotBlank @Size @Pattern on username',
          status: usernameValid ? 'success' : 'error',
          message: usernameValid 
            ? `Username "${inputs.username}" passes all constraints`
            : 'Username must be 3-20 chars, alphanumeric + underscore'
        })
        if (!usernameValid) success = false
        
        // Email validation
        const emailValid = inputs.email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(inputs.email)
        steps.push({
          step: '@Email validation',
          status: emailValid ? 'success' : 'error',
          message: emailValid ? `Email "${inputs.email}" is valid` : 'Invalid email format'
        })
        if (!emailValid) success = false
        
        // Age validation
        const age = parseInt(inputs.age)
        const ageValid = !isNaN(age) && age >= 18 && age <= 120
        steps.push({
          step: '@Min(18) @Max(120) on age',
          status: ageValid ? 'success' : 'error',
          message: ageValid ? `Age ${age} is valid` : 'Age must be between 18 and 120'
        })
        if (!ageValid) success = false
        
        // Password validation
        const passwordValid = inputs.password && 
          inputs.password.length >= 8 &&
          /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=]).*$/.test(inputs.password)
        steps.push({
          step: '@Pattern password complexity',
          status: passwordValid ? 'success' : 'error',
          message: passwordValid 
            ? 'Password meets complexity requirements'
            : 'Password needs digit, upper, lower, special char'
        })
        if (!passwordValid) success = false
        
        if (success) {
          steps.push({
            step: 'JPA Entity Creation',
            status: 'success',
            message: 'Entity saved to database with generated ID'
          })
        }
        
        return {
          success,
          object: success ? {
            id: Math.floor(Math.random() * 10000),
            username: inputs.username,
            email: inputs.email.toLowerCase(),
            age: age,
            role: inputs.role,
            createdAt: new Date().toISOString(),
            validated: true
          } : null,
          steps
        }
      }
    },
    pydantic: {
      name: 'Python Pydantic',
      code: `from pydantic import BaseModel, Field, EmailStr, validator
from typing import Optional
from enum import Enum
from datetime import datetime

class UserRole(str, Enum):
    USER = "USER"
    ADMIN = "ADMIN"
    MODERATOR = "MODERATOR"

class User(BaseModel):
    username: str = Field(
        ...,  # Required field
        min_length=3,
        max_length=20,
        regex="^[a-zA-Z0-9_]+$"
    )
    email: EmailStr  # Pydantic's built-in email validator
    age: int = Field(..., ge=18, le=120)
    password: str = Field(..., min_length=8)
    role: UserRole
    
    @validator('password')
    def validate_password(cls, v):
        if not any(c.islower() for c in v):
            raise ValueError('Password must contain lowercase')
        if not any(c.isupper() for c in v):
            raise ValueError('Password must contain uppercase')
        if not any(c.isdigit() for c in v):
            raise ValueError('Password must contain digit')
        if not any(c in '@#$%^&+=' for c in v):
            raise ValueError('Password must contain special char')
        return v
    
    class Config:
        # Pydantic v2 settings
        validate_assignment = True
        use_enum_values = True

# Usage in FastAPI
@app.post("/users")
async def create_user(user: User):  # Automatic validation!
    return {"id": 12345, **user.dict()}`,
      validate: (inputs) => {
        const steps = [];
        
        // First, check required fields
        steps.push({
          step: 'BaseModel field presence check',
          status: 'success',
          message: 'All required fields present (no Optional fields)'
        })
        
        // Username validation with Field constraints
        const usernameValid = inputs.username && 
          inputs.username.length >= 3 && 
          inputs.username.length <= 20 &&
          /^[a-zA-Z0-9_]+$/.test(inputs.username)
        steps.push({
          step: 'Field(min_length=3, max_length=20, regex=...)',
          status: usernameValid ? 'success' : 'error',
          message: usernameValid 
            ? `username "${inputs.username}" valid`
            : 'Username validation failed'
        })
        
        // Email validation with EmailStr type
        const emailValid = inputs.email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(inputs.email)
        steps.push({
          step: 'EmailStr type validation',
          status: emailValid ? 'success' : 'error',
          message: emailValid 
            ? `Pydantic EmailStr validated "${inputs.email}"`
            : 'Invalid email format'
        })
        
        // Age validation with Field constraints
        const age = parseInt(inputs.age)
        const ageValid = !isNaN(age) && age >= 18 && age <= 120
        steps.push({
          step: 'Field(ge=18, le=120)',
          status: ageValid ? 'success' : 'error',
          message: ageValid 
            ? `Age ${age} within bounds`
            : 'Age must be 18-120'
        })
        
        // Password custom validator
        let passwordValid = inputs.password && inputs.password.length >= 8
        let passwordMessage = ''
        if (passwordValid) {
          const checks = [
            { test: /[a-z]/.test(inputs.password), msg: 'lowercase' },
            { test: /[A-Z]/.test(inputs.password), msg: 'uppercase' },
            { test: /[0-9]/.test(inputs.password), msg: 'digit' },
            { test: /[@#$%^&+=]/.test(inputs.password), msg: 'special char' }
          ]
          const failed = checks.filter(c => !c.test)
          passwordValid = failed.length === 0
          passwordMessage = passwordValid 
            ? 'Password passes all @validator checks'
            : `Missing: ${failed.map(f => f.msg).join(', ')}`
        }
        steps.push({
          step: '@validator(\'password\') custom validation',
          status: passwordValid ? 'success' : 'error',
          message: passwordMessage || 'Password too short'
        })
        
        // Enum validation
        const roleValid = ['USER', 'ADMIN', 'MODERATOR'].includes(inputs.role)
        steps.push({
          step: 'UserRole Enum validation',
          status: roleValid ? 'success' : 'error',
          message: roleValid 
            ? `Role "${inputs.role}" is valid enum value`
            : 'Invalid role'
        })
        
        const success = usernameValid && emailValid && ageValid && passwordValid && roleValid
        
        if (success) {
          steps.push({
            step: 'Pydantic model instantiation',
            status: 'success',
            message: 'User model created and serialization-ready'
          })
        }
        
        return {
          success,
          object: success ? {
            username: inputs.username,
            email: inputs.email.toLowerCase(),
            age: age,
            role: inputs.role,
            created_at: new Date().toISOString(),
            _pydantic_validated: true
          } : null,
          steps
        }
      }
    },
    typescript: {
      name: 'TypeScript class-validator (NestJS)',
      code: `import {
  IsNotEmpty, IsEmail, IsInt, Min, Max,
  MinLength, Matches, IsEnum
} from 'class-validator'
import { Type } from 'class-transformer'

enum UserRole {
  USER = 'USER',
  ADMIN = 'ADMIN',
  MODERATOR = 'MODERATOR'
}

export class CreateUserDto {
  @IsNotEmpty()
  @MinLength(3)
  @Matches(/^[a-zA-Z0-9_]+$/, {
    message: 'Username must be alphanumeric with underscores'
  })
  username: string
  
  @IsEmail({}, { message: 'Please provide valid email' })
  email: string
  
  @Type(() => Number)  // Transform string to number
  @IsInt()
  @Min(18, { message: 'Must be 18 or older' })
  @Max(120)
  age: number
  
  @MinLength(8)
  @Matches(
    /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=]).*$/,
    { message: 'Password too weak' }
  )
  password: string
  
  @IsEnum(UserRole)
  role: UserRole
}

// NestJS Controller with automatic validation
@Controller('users')
export class UserController {
  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  async create(@Body() createUserDto: CreateUserDto) {
    // DTO is already validated and transformed!
    return this.userService.create(createUserDto)
  }
}

// Type guard for runtime checking
function isValidUser(obj: any): obj is CreateUserDto {
  return obj?.username && obj?.email && obj?.age >= 18
}`,
      validate: (inputs) => {
        const steps = [];
        let success = true;
        
        // Type transformation
        steps.push({
          step: '@Type(() => Number) transformation',
          status: 'success',
          message: `Transforming age "${inputs.age}" to number type`
        })
        
        const age = parseInt(inputs.age)
        
        // Username validation
        const usernameValid = inputs.username && 
          inputs.username.length >= 3 &&
          /^[a-zA-Z0-9_]+$/.test(inputs.username)
        steps.push({
          step: '@IsNotEmpty() @MinLength(3) @Matches()',
          status: usernameValid ? 'success' : 'error',
          message: usernameValid 
            ? `Username "${inputs.username}" valid`
            : 'Username validation failed'
        })
        if (!usernameValid) success = false
        
        // Email validation
        const emailValid = inputs.email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(inputs.email)
        steps.push({
          step: '@IsEmail() decorator',
          status: emailValid ? 'success' : 'error',
          message: emailValid 
            ? `Email "${inputs.email}" validated`
            : 'Invalid email format'
        })
        if (!emailValid) success = false
        
        // Age validation
        const ageValid = !isNaN(age) && age >= 18 && age <= 120
        steps.push({
          step: '@IsInt() @Min(18) @Max(120)',
          status: ageValid ? 'success' : 'error',
          message: ageValid 
            ? `Age ${age} passes all decorators`
            : 'Age validation failed'
        })
        if (!ageValid) success = false
        
        // Password validation
        const passwordValid = inputs.password && 
          inputs.password.length >= 8 &&
          /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=]).*$/.test(inputs.password)
        steps.push({
          step: '@MinLength(8) @Matches() regex',
          status: passwordValid ? 'success' : 'error',
          message: passwordValid 
            ? 'Password meets complexity requirements'
            : 'Password too weak'
        })
        if (!passwordValid) success = false
        
        // Enum validation
        const roleValid = ['USER', 'ADMIN', 'MODERATOR'].includes(inputs.role)
        steps.push({
          step: '@IsEnum(UserRole)',
          status: roleValid ? 'success' : 'error',
          message: roleValid 
            ? `Role "${inputs.role}" is valid enum`
            : 'Invalid role'
        })
        if (!roleValid) success = false
        
        // Type guard check
        if (success) {
          steps.push({
            step: 'isValidUser() type guard',
            status: 'success',
            message: 'Runtime type checking passed'
          })
          steps.push({
            step: 'NestJS ValidationPipe',
            status: 'success',
            message: 'DTO validated and transformed'
          })
        }
        
        return {
          success,
          object: success ? {
            username: inputs.username,
            email: inputs.email.toLowerCase(),
            age: age,
            role: inputs.role,
            password: '[ENCRYPTED]',
            validatedAt: new Date().toISOString(),
            _classValidator: true
          } : null,
          steps
        }
      }
    }
  }

  const handleValidate = () => {
    const validator = validators[selectedValidator]
    const result = validator.validate(constructorInputs)
    
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
        <h3>Select Validation Framework:</h3>
        <div className="constructor-buttons">
          {Object.entries(validators).map(([key, validator]) => (
            <button
              key={key}
              className={`constructor-btn ${selectedValidator === key ? 'active' : ''}`}
              onClick={() => {
                setSelectedValidator(key)
                setConstructionResult(null)
                setValidationSteps([])
              }}
            >
              {validator.name}
            </button>
          ))}
        </div>
      </div>

      <div className="construction-workspace">
        <div className="input-panel">
          <h4>User Registration Form</h4>
          <div className="input-fields">
            {Object.entries(constructorInputs).map(([field, value]) => (
              <div key={field} className="input-group">
                <label>{field.charAt(0).toUpperCase() + field.slice(1).replace('_', ' ')}:</label>
                {field === 'role' ? (
                  <select 
                    value={value}
                    onChange={(e) => handleInputChange(field, e.target.value)}
                  >
                    <option value="USER">USER</option>
                    <option value="ADMIN">ADMIN</option>
                    <option value="MODERATOR">MODERATOR</option>
                  </select>
                ) : (
                  <input
                    type={field === 'password' ? 'password' : field === 'age' ? 'number' : 'text'}
                    value={value}
                    onChange={(e) => handleInputChange(field, e.target.value)}
                    placeholder={`Enter ${field}...`}
                  />
                )}
              </div>
            ))}
          </div>
          <button className="construct-btn" onClick={handleValidate}>
            Validate & Create User
          </button>
        </div>

        <div className="code-panel">
          <h4>{validators[selectedValidator].name} Implementation</h4>
          <pre>
            <code>{validators[selectedValidator].code}</code>
          </pre>
        </div>
      </div>

      {validationSteps.length > 0 && (
        <div className="validation-process">
          <h4>Validation Pipeline:</h4>
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
          <h4>Validation Result:</h4>
          {constructionResult.success ? (
            <>
              <p className="success-message">✅ All validations passed!</p>
              <div className="created-object">
                <h5>Created User Object:</h5>
                <pre>
                  <code>{JSON.stringify(constructionResult.object, null, 2)}</code>
                </pre>
              </div>
            </>
          ) : (
            <p className="error-message">
              ❌ Validation failed! Fix the errors above.
            </p>
          )}
        </div>
      )}

      <div className="best-practices">
        <h4>Modern Validation Frameworks:</h4>
        <div className="framework-comparison">
          <div className="framework-info">
            <h5>🌳 Java Bean Validation</h5>
            <p>Declarative validation with annotations. Used by Spring Boot, Quarkus, and Jakarta EE.</p>
          </div>
          <div className="framework-info">
            <h5>🐍 Python Pydantic</h5>
            <p>Type hints + validation. Powers FastAPI, used by OpenAI, Microsoft, and Uber.</p>
          </div>
          <div className="framework-info">
            <h5>📘 TypeScript class-validator</h5>
            <p>Decorator-based validation. Core of NestJS, used in enterprise Node.js apps.</p>
          </div>
        </div>
        <p className="framework-note">
          <strong>Why frameworks matter:</strong> Manual validation is error-prone. These frameworks provide 
          consistent validation, automatic error messages, and integration with web frameworks for 
          seamless request/response handling.
        </p>
      </div>
    </div>
  )
}

export default RobustObjectConstruction