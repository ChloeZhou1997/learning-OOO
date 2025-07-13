import React, { useState } from 'react';

const KeyConcept = ({ term, definition, type = 'default' }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  // Remove icons for minimal design
  const getTypeIcon = () => '';
  
  const getTypeColor = () => {
    switch (type) {
      case 'tooltip':
        return '#10b981'; // green
      case 'info-box':
        return '#3b82f6'; // blue
      case 'code':
        return '#8b5cf6'; // purple
      default:
        return '#64FFDA'; // teal
    }
  };
  
  return (
    <div 
      className="key-concept-item"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        position: 'relative',
        display: 'inline-flex',
        alignItems: 'center',
        padding: '0.25rem 0.625rem',
        backgroundColor: isHovered ? '#f3f4f6' : 'transparent',
        border: `1px solid ${isHovered ? '#d1d5db' : '#e5e7eb'}`,
        borderRadius: '0.25rem',
        cursor: 'help',
        transition: 'background-color 0.2s, border-color 0.2s',
        margin: '0.125rem',
        fontSize: '0.8125rem',
        fontWeight: '500',
        color: '#4B5563',
        boxShadow: 'none',
        transform: 'none',
      }}
    >
      <span>{term}</span>
      
      {isHovered && definition && (
        <div 
          className="key-concept-tooltip"
          style={{
            position: 'absolute',
            bottom: '100%',
            left: '50%',
            transform: 'translateX(-50%)',
            marginBottom: '0.5rem',
            padding: '0.5rem 0.75rem',
            backgroundColor: '#1F2937',
            color: '#F3F4F6',
            borderRadius: '0.25rem',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            maxWidth: '250px',
            minWidth: '150px',
            zIndex: 1000,
            fontSize: '0.75rem',
            lineHeight: '1.4',
            textAlign: 'left',
            fontWeight: '400',
          }}
        >
          <div 
            style={{
              position: 'absolute',
              top: '100%',
              left: '50%',
              transform: 'translateX(-50%)',
              width: 0,
              height: 0,
              borderLeft: '8px solid transparent',
              borderRight: '8px solid transparent',
              borderTop: '8px solid #0A192F',
            }}
          />
          {definition}
        </div>
      )}
    </div>
  );
};

export default KeyConcept;