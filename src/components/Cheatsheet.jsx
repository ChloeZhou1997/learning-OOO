import React, { useState } from 'react'
import { ChevronDown, ChevronRight, BookOpen } from 'lucide-react'
import { cheatsheetData } from '../data/cheatsheetData'

const Cheatsheet = () => {
  const [expandedSections, setExpandedSections] = useState(new Set())

  const toggleSection = (sectionId) => {
    const newExpanded = new Set(expandedSections)
    if (newExpanded.has(sectionId)) {
      newExpanded.delete(sectionId)
    } else {
      newExpanded.add(sectionId)
    }
    setExpandedSections(newExpanded)
  }

  // Use the imported cheatsheetData and add icons
  const enhancedCheatsheetData = {
    principles: {
      ...cheatsheetData.principles,
      icon: <cheatsheetData.principles.icon size={20} />,
      items: cheatsheetData.principles.items
    },
    checklists: {
      ...cheatsheetData.checklists,
      icon: <cheatsheetData.checklists.icon size={20} />,
      items: cheatsheetData.checklists.items
    },
    methodologies: {
      ...cheatsheetData.methodologies,
      icon: <cheatsheetData.methodologies.icon size={20} />,
      items: cheatsheetData.methodologies.items
    }
  }

  return (
    <div className="cheatsheet-container">
      <div className="cheatsheet-header">
        <h1 className="cheatsheet-title">
          <BookOpen size={24} />
          OO Design Cheatsheet
        </h1>
        <p className="cheatsheet-subtitle">
          Quick reference for object-oriented design principles, checklists, and methodologies
        </p>
      </div>

      <div className="cheatsheet-content">
        {Object.entries(enhancedCheatsheetData).map(([sectionKey, section]) => {
          const isExpanded = expandedSections.has(sectionKey)
          
          return (
            <div key={sectionKey} className="cheatsheet-section">
              <button
                className="section-header"
                onClick={() => toggleSection(sectionKey)}
              >
                <div className="section-header-content">
                  {section.icon}
                  <h2 className="section-title">{section.title}</h2>
                </div>
                {isExpanded ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
              </button>

              {isExpanded && (
                <div className="section-content">
                  {section.items.map((item, index) => (
                    <div key={index} className="category-card">
                      <div className="category-header">
                        <h3 className="category-title">{item.category}</h3>
                        <span className="category-chapter">{item.chapter}</span>
                      </div>
                      <ul className="category-items">
                        {item.items.map((subItem, subIndex) => (
                          <li key={subIndex} className="category-item">
                            {subItem}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Cheatsheet