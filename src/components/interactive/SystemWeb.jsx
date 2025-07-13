import React, { useState, useEffect } from 'react'
import './SystemWeb.css'

const SystemWeb = () => {
  const [couplingLevel, setCouplingLevel] = useState(50)
  const [selectedClass, setSelectedClass] = useState(null)
  const [animating, setAnimating] = useState(false)

  const classes = [
    { id: 'ui', name: 'UserInterface', x: 150, y: 100 },
    { id: 'auth', name: 'AuthService', x: 450, y: 100 },
    { id: 'user', name: 'UserManager', x: 300, y: 250 },
    { id: 'db', name: 'Database', x: 150, y: 400 },
    { id: 'logger', name: 'Logger', x: 450, y: 400 },
    { id: 'config', name: 'ConfigService', x: 600, y: 250 }
  ]

  const connections = [
    { from: 'ui', to: 'auth', type: 'uses' },
    { from: 'ui', to: 'user', type: 'uses' },
    { from: 'auth', to: 'user', type: 'validates' },
    { from: 'user', to: 'db', type: 'stores' },
    { from: 'auth', to: 'logger', type: 'logs' },
    { from: 'user', to: 'logger', type: 'logs' },
    { from: 'auth', to: 'config', type: 'reads' },
    { from: 'ui', to: 'config', type: 'reads' }
  ]

  const getCouplingDescription = () => {
    if (couplingLevel < 33) {
      return {
        level: 'Low Coupling',
        description: 'Classes interact through well-defined interfaces. Changes are easy to make.',
        color: '#28a745'
      }
    } else if (couplingLevel < 66) {
      return {
        level: 'Moderate Coupling',
        description: 'Some dependencies exist. Changes require careful consideration.',
        color: '#ffc107'
      }
    } else {
      return {
        level: 'High Coupling',
        description: 'Classes are tightly intertwined. Changes ripple throughout the system.',
        color: '#dc3545'
      }
    }
  }

  const getConnectionStyle = () => {
    const thickness = 1 + (couplingLevel / 100) * 4
    const opacity = 0.3 + (couplingLevel / 100) * 0.7
    return { thickness, opacity }
  }

  const handleClassClick = (classId) => {
    setSelectedClass(classId)
    setAnimating(true)
    setTimeout(() => setAnimating(false), 600)
  }

  const getConnectedClasses = (classId) => {
    return connections
      .filter(conn => conn.from === classId || conn.to === classId)
      .map(conn => conn.from === classId ? conn.to : conn.from)
  }

  const isConnected = (classId) => {
    if (!selectedClass) return false
    return classId === selectedClass || getConnectedClasses(selectedClass).includes(classId)
  }

  const coupling = getCouplingDescription()
  const connectionStyle = getConnectionStyle()

  return (
    <div className="system-web-container">
      <div className="control-panel">
        <label htmlFor="coupling-slider">Adjust Coupling Level:</label>
        <input
          id="coupling-slider"
          type="range"
          min="0"
          max="100"
          value={couplingLevel}
          onChange={(e) => setCouplingLevel(e.target.value)}
          className="coupling-slider"
        />
        <div className={`coupling-indicator ${coupling.level.toLowerCase().replace(' ', '-')}`}>
          <h3 style={{ color: coupling.color }}>{coupling.level}</h3>
          <p>{coupling.description}</p>
        </div>
      </div>

      <div className="web-visualization">
        <svg width="750" height="500" viewBox="0 0 750 500">
          {/* Render connections */}
          {connections.map((conn, index) => {
            const fromClass = classes.find(c => c.id === conn.from)
            const toClass = classes.find(c => c.id === conn.to)
            const isHighlighted = selectedClass && (conn.from === selectedClass || conn.to === selectedClass)
            
            return (
              <g key={index}>
                <line
                  x1={fromClass.x}
                  y1={fromClass.y}
                  x2={toClass.x}
                  y2={toClass.y}
                  stroke={isHighlighted ? coupling.color : '#6c757d'}
                  strokeWidth={isHighlighted ? connectionStyle.thickness * 1.5 : connectionStyle.thickness}
                  opacity={isHighlighted ? 1 : connectionStyle.opacity}
                  className={`connection-line ${animating && isHighlighted ? 'pulse' : ''}`}
                />
                {isHighlighted && (
                  <text
                    x={(fromClass.x + toClass.x) / 2}
                    y={(fromClass.y + toClass.y) / 2}
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

          {/* Render class nodes */}
          {classes.map(cls => {
            const connected = isConnected(cls.id)
            const isSelected = cls.id === selectedClass
            
            return (
              <g
                key={cls.id}
                onClick={() => handleClassClick(cls.id)}
                className="class-node"
                style={{ cursor: 'pointer' }}
              >
                <rect
                  x={cls.x - 60}
                  y={cls.y - 25}
                  width="120"
                  height="50"
                  rx="8"
                  fill={isSelected ? coupling.color : connected ? '#e7f3ff' : 'white'}
                  stroke={connected ? coupling.color : '#dee2e6'}
                  strokeWidth={connected ? 3 : 2}
                  className={animating && connected ? 'node-highlight' : ''}
                />
                <text
                  x={cls.x}
                  y={cls.y + 5}
                  textAnchor="middle"
                  className="class-name"
                  fill={isSelected ? 'white' : '#212529'}
                >
                  {cls.name}
                </text>
              </g>
            )
          })}
        </svg>
      </div>

      <div className="coupling-effects">
        <h4>Effects of {coupling.level}:</h4>
        <div className="effects-grid">
          <div className="effect-card">
            <h5>🔧 Maintenance</h5>
            <p>
              {couplingLevel < 33 
                ? 'Easy to modify individual classes' 
                : couplingLevel < 66 
                ? 'Moderate effort required for changes' 
                : 'Changes cascade through multiple classes'}
            </p>
          </div>
          <div className="effect-card">
            <h5>🧪 Testing</h5>
            <p>
              {couplingLevel < 33 
                ? 'Classes can be tested in isolation' 
                : couplingLevel < 66 
                ? 'Some mock objects needed' 
                : 'Complex test setup required'}
            </p>
          </div>
          <div className="effect-card">
            <h5>♻️ Reusability</h5>
            <p>
              {couplingLevel < 33 
                ? 'Classes are highly reusable' 
                : couplingLevel < 66 
                ? 'Limited reuse opportunities' 
                : 'Difficult to reuse without dependencies'}
            </p>
          </div>
          <div className="effect-card">
            <h5>🎯 Understanding</h5>
            <p>
              {couplingLevel < 33 
                ? 'Clear, focused responsibilities' 
                : couplingLevel < 66 
                ? 'Some complexity in interactions' 
                : 'Hard to understand without context'}
            </p>
          </div>
        </div>
      </div>

      <div className="tips">
        <p><strong>💡 Tip:</strong> Click on any class to see its connections. Move the slider to see how coupling affects the system's flexibility.</p>
      </div>
    </div>
  )
}

export default SystemWeb