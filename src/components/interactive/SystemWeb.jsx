import React, { useState, useEffect } from 'react'
import './SystemWeb.css'

const SystemWeb = () => {
  const [couplingLevel, setCouplingLevel] = useState(50)
  const [selectedService, setSelectedService] = useState(null)
  const [animating, setAnimating] = useState(false)
  const [architecture, setArchitecture] = useState('microservices')

  // Netflix-style microservices architecture
  const microservices = [
    { id: 'api-gateway', name: 'API Gateway', x: 375, y: 50, tech: 'Spring Cloud Gateway' },
    { id: 'auth', name: 'Auth Service', x: 150, y: 150, tech: 'OAuth2/JWT' },
    { id: 'user', name: 'User Service', x: 375, y: 150, tech: 'Spring Boot' },
    { id: 'recommendation', name: 'Recommendation Service', x: 600, y: 150, tech: 'Python/ML' },
    { id: 'video', name: 'Video Service', x: 150, y: 250, tech: 'Node.js/FFmpeg' },
    { id: 'analytics', name: 'Analytics Service', x: 375, y: 250, tech: 'Spark/Kafka' },
    { id: 'payment', name: 'Payment Service', x: 600, y: 250, tech: 'Spring Boot' },
    { id: 'eureka', name: 'Service Registry', x: 150, y: 350, tech: 'Netflix Eureka' },
    { id: 'config', name: 'Config Server', x: 375, y: 350, tech: 'Spring Cloud Config' },
    { id: 'circuit', name: 'Circuit Breaker', x: 600, y: 350, tech: 'Hystrix/Resilience4j' }
  ]

  // Connections showing different types of coupling
  const microserviceConnections = [
    { from: 'api-gateway', to: 'auth', type: 'REST/gRPC' },
    { from: 'api-gateway', to: 'user', type: 'REST/gRPC' },
    { from: 'api-gateway', to: 'video', type: 'REST/gRPC' },
    { from: 'recommendation', to: 'user', type: 'async/Kafka' },
    { from: 'recommendation', to: 'video', type: 'async/Kafka' },
    { from: 'video', to: 'analytics', type: 'event stream' },
    { from: 'user', to: 'analytics', type: 'event stream' },
    { from: 'payment', to: 'user', type: 'REST' },
    { from: 'api-gateway', to: 'eureka', type: 'discovery' },
    { from: 'auth', to: 'config', type: 'config fetch' },
    { from: 'api-gateway', to: 'circuit', type: 'resilience' }
  ]

  // Monolithic architecture for comparison
  const monolith = [
    { id: 'ui-layer', name: 'UI Layer', x: 375, y: 100, tech: 'JSP/Thymeleaf' },
    { id: 'controller', name: 'Controller Layer', x: 375, y: 200, tech: 'Spring MVC' },
    { id: 'service', name: 'Service Layer', x: 375, y: 300, tech: 'Spring Services' },
    { id: 'dao', name: 'DAO Layer', x: 375, y: 400, tech: 'Hibernate/JPA' }
  ]

  const monolithConnections = [
    { from: 'ui-layer', to: 'controller', type: 'direct call' },
    { from: 'controller', to: 'service', type: 'direct call' },
    { from: 'service', to: 'dao', type: 'direct call' }
  ]

  const services = architecture === 'microservices' ? microservices : monolith
  const connections = architecture === 'microservices' ? microserviceConnections : monolithConnections

  const getCouplingDescription = () => {
    if (architecture === 'monolith') {
      return {
        level: 'Monolithic Architecture',
        description: 'All components deployed as single unit. Shared memory, synchronous calls.',
        color: '#dc3545'
      }
    }
    
    if (couplingLevel < 33) {
      return {
        level: 'Loose Coupling (Event-Driven)',
        description: 'Services communicate via events/messages. Highly resilient and scalable.',
        color: '#28a745'
      }
    } else if (couplingLevel < 66) {
      return {
        level: 'Moderate Coupling (REST/gRPC)',
        description: 'Services use synchronous APIs with circuit breakers for resilience.',
        color: '#ffc107'
      }
    } else {
      return {
        level: 'Tight Coupling (Direct Database)',
        description: 'Services share databases or make synchronous calls without protection.',
        color: '#dc3545'
      }
    }
  }

  const getConnectionStyle = () => {
    const thickness = 1 + (couplingLevel / 100) * 4
    const opacity = 0.3 + (couplingLevel / 100) * 0.7
    return { thickness, opacity }
  }

  const handleServiceClick = (serviceId) => {
    setSelectedService(serviceId)
    setAnimating(true)
    setTimeout(() => setAnimating(false), 600)
  }

  const getConnectedServices = (serviceId) => {
    return connections
      .filter(conn => conn.from === serviceId || conn.to === serviceId)
      .map(conn => conn.from === serviceId ? conn.to : conn.from)
  }

  const isConnected = (serviceId) => {
    if (!selectedService) return false
    return serviceId === selectedService || getConnectedServices(selectedService).includes(serviceId)
  }

  const coupling = getCouplingDescription()
  const connectionStyle = getConnectionStyle()

  return (
    <div className="system-web-container">
      <div className="control-panel">
        <div className="architecture-selector">
          <button 
            className={architecture === 'microservices' ? 'active' : ''}
            onClick={() => setArchitecture('microservices')}
          >
            Microservices
          </button>
          <button 
            className={architecture === 'monolith' ? 'active' : ''}
            onClick={() => setArchitecture('monolith')}
          >
            Monolithic
          </button>
        </div>
        
        {architecture === 'microservices' && (
          <>
            <label htmlFor="coupling-slider">Communication Pattern:</label>
            <input
              id="coupling-slider"
              type="range"
              min="0"
              max="100"
              value={couplingLevel}
              onChange={(e) => setCouplingLevel(e.target.value)}
              className="coupling-slider"
            />
          </>
        )}
        
        <div className={`coupling-indicator ${coupling.level.toLowerCase().replace(/[\s\/()]/g, '-')}`}>
          <h3 style={{ color: coupling.color }}>{coupling.level}</h3>
          <p>{coupling.description}</p>
        </div>
      </div>

      <div className="web-visualization">
        <svg width="750" height="500" viewBox="0 0 750 500">
          {/* Render connections */}
          {connections.map((conn, index) => {
            const fromService = services.find(s => s.id === conn.from)
            const toService = services.find(s => s.id === conn.to)
            const isHighlighted = selectedService && (conn.from === selectedService || conn.to === selectedService)
            
            return (
              <g key={index}>
                <line
                  x1={fromService.x}
                  y1={fromService.y}
                  x2={toService.x}
                  y2={toService.y}
                  stroke={isHighlighted ? coupling.color : '#6c757d'}
                  strokeWidth={isHighlighted ? connectionStyle.thickness * 1.5 : connectionStyle.thickness}
                  opacity={isHighlighted ? 1 : connectionStyle.opacity}
                  strokeDasharray={conn.type.includes('async') || conn.type.includes('event') ? '5,5' : ''}
                  className={`connection-line ${animating && isHighlighted ? 'pulse' : ''}`}
                />
                {isHighlighted && (
                  <text
                    x={(fromService.x + toService.x) / 2}
                    y={(fromService.y + toService.y) / 2}
                    textAnchor="middle"
                    className="connection-label"
                    fill={coupling.color}
                  >
                    {conn.type}
                  </text>
                )}
              </g>
            )
          })}

          {/* Render service nodes */}
          {services.map(service => {
            const connected = isConnected(service.id)
            const isSelected = service.id === selectedService
            
            return (
              <g
                key={service.id}
                onClick={() => handleServiceClick(service.id)}
                className="service-node"
                style={{ cursor: 'pointer' }}
              >
                <rect
                  x={service.x - 70}
                  y={service.y - 30}
                  width="140"
                  height="60"
                  rx="8"
                  fill={isSelected ? coupling.color : connected ? '#e7f3ff' : 'white'}
                  stroke={connected ? coupling.color : '#dee2e6'}
                  strokeWidth={connected ? 3 : 2}
                  className={animating && connected ? 'node-highlight' : ''}
                />
                <text
                  x={service.x}
                  y={service.y - 5}
                  textAnchor="middle"
                  className="service-name"
                  fill={isSelected ? 'white' : '#212529'}
                  fontSize="12"
                  fontWeight="bold"
                >
                  {service.name}
                </text>
                <text
                  x={service.x}
                  y={service.y + 12}
                  textAnchor="middle"
                  className="service-tech"
                  fill={isSelected ? 'white' : '#6c757d'}
                  fontSize="10"
                >
                  {service.tech}
                </text>
              </g>
            )
          })}
        </svg>
      </div>

      <div className="coupling-effects">
        <h4>{architecture === 'microservices' ? 'Microservices Characteristics' : 'Monolith Characteristics'}:</h4>
        <div className="effects-grid">
          <div className="effect-card">
            <h5>📊 Scalability</h5>
            <p>
              {architecture === 'monolith' 
                ? 'Scale entire application together'
                : couplingLevel < 33 
                ? 'Independent service scaling' 
                : couplingLevel < 66 
                ? 'Some coordination needed' 
                : 'Cascading failures possible'}
            </p>
          </div>
          <div className="effect-card">
            <h5>🚀 Deployment</h5>
            <p>
              {architecture === 'monolith' 
                ? 'Single deployment unit'
                : couplingLevel < 33 
                ? 'Independent CI/CD pipelines' 
                : couplingLevel < 66 
                ? 'Coordinated deployments' 
                : 'Complex deployment dependencies'}
            </p>
          </div>
          <div className="effect-card">
            <h5>💾 Data Management</h5>
            <p>
              {architecture === 'monolith' 
                ? 'Shared database, ACID transactions'
                : couplingLevel < 33 
                ? 'Service-owned databases' 
                : couplingLevel < 66 
                ? 'Some shared data stores' 
                : 'Database coupling anti-pattern'}
            </p>
          </div>
          <div className="effect-card">
            <h5>🛡️ Fault Isolation</h5>
            <p>
              {architecture === 'monolith' 
                ? 'Failure affects entire system'
                : couplingLevel < 33 
                ? 'Failures isolated to services' 
                : couplingLevel < 66 
                ? 'Circuit breakers prevent cascades' 
                : 'Failures propagate across services'}
            </p>
          </div>
        </div>
      </div>

      <div className="tips">
        <p><strong>💡 Real-world Examples:</strong></p>
        <ul>
          <li><strong>Netflix:</strong> 700+ microservices handling 2+ billion API requests daily</li>
          <li><strong>Uber:</strong> Migrated from monolith to 1000+ microservices for global scale</li>
          <li><strong>Amazon:</strong> Pioneered service-oriented architecture, enabling AWS</li>
        </ul>
        <p><strong>Try:</strong> Click services to see dependencies. Compare architectures and coupling levels.</p>
      </div>
    </div>
  )
}

export default SystemWeb