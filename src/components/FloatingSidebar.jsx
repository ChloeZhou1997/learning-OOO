import React from 'react'
import { Target, BookOpen, Bookmark, FileText } from 'lucide-react'
import './FloatingSidebar.css'

const FloatingSidebar = ({ activeSection, sections, cheatsheetData, isVisible, onShowBookmarks, onShowNotes }) => {
  // Find the current section
  const currentSection = sections.find(section => section.id === activeSection)
  
  // Extract chapter number from section id (e.g., 'chapter-1' -> '1')
  const chapterNumber = activeSection.match(/chapter-(\d+)/)?.[1]
  
  // Get relevant cheatsheet items for current chapter
  const getCheatsheetItemsForChapter = () => {
    if (!chapterNumber) return []
    
    const chapterKey = `Chapter ${chapterNumber}`
    const items = []
    
    // Search through all cheatsheet categories
    Object.values(cheatsheetData).forEach(category => {
      category.items.forEach(item => {
        if (item.chapter === chapterKey) {
          items.push({
            category: category.title,
            ...item
          })
        }
      })
    })
    
    return items
  }
  
  const cheatsheetItems = getCheatsheetItemsForChapter()
  
  // Don't render if not visible or no learning objectives
  if (!isVisible || !currentSection || (!currentSection.learningObjectives && cheatsheetItems.length === 0)) {
    return null
  }
  
  return (
    <div className="floating-sidebar">
      <div className="floating-sidebar-content">
        {/* Quick Actions */}
        <div className="floating-quick-actions">
          <button 
            className="floating-action-button"
            onClick={onShowBookmarks}
            title="View Bookmarks"
          >
            <Bookmark size={20} />
          </button>
          <button 
            className="floating-action-button"
            onClick={onShowNotes}
            title="View Notes"
          >
            <FileText size={20} />
          </button>
        </div>
        {/* Learning Objectives Section */}
        {currentSection.learningObjectives && currentSection.learningObjectives.length > 0 && (
          <div className="floating-section">
            <div className="floating-section-header">
              <Target size={18} />
              <h3>Study Objectives</h3>
            </div>
            <div className="floating-chapter-label">
              {currentSection.navTitle}
            </div>
            <ul className="floating-objectives-list">
              {currentSection.learningObjectives.map((objective, index) => (
                <li key={index} className="floating-objective-item">
                  <span className="objective-bullet"></span>
                  <span className="objective-text">{objective}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
        
        {/* Cheatsheet Section */}
        {cheatsheetItems.length > 0 && (
          <div className="floating-section">
            <div className="floating-section-header">
              <BookOpen size={18} />
              <h3>Quick Reference</h3>
            </div>
            {cheatsheetItems.map((item, index) => (
              <div key={index} className="floating-cheatsheet-item">
                <h4 className="floating-item-category">{item.category}</h4>
                <ul className="floating-item-list">
                  {item.items.map((subItem, subIndex) => (
                    <li key={subIndex} className="floating-subitem">
                      {subItem}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default FloatingSidebar