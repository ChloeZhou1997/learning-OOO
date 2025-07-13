import React from 'react'

const LearningObjectiveCard = ({ objectives }) => {
  if (!objectives || objectives.length === 0) {
    return null
  }

  return (
    <div className="learning-objectives-card">
      <div className="learning-objectives-header">
        <div className="objectives-icon">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2L13.09 8.26L19 9L13.09 9.74L12 16L10.91 9.74L5 9L10.91 8.26L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
          </svg>
        </div>
        <h3>Learning Objectives</h3>
      </div>
      <p className="objectives-intro">Upon completing this chapter, you will be able to:</p>
      <ul className="objectives-list">
        {objectives.map((objective, index) => (
          <li key={index} className="objective-item">
            <span className="objective-bullet"></span>
            <span className="objective-text">{objective}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default LearningObjectiveCard