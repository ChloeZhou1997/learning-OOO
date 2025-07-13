import React, { useState, useEffect } from 'react'
import { ChevronLeft, ChevronDown, ChevronRight, BookOpen } from 'lucide-react'
import { extractSubsections } from '../utils/extractSubsections'

const Sidebar = ({ sections, activeSection, onToggle, isOpen }) => {
  const [expandedSections, setExpandedSections] = useState(new Set());
  const [sectionSubsections, setSectionSubsections] = useState({});
  // Extract subsections for each chapter on mount
  useEffect(() => {
    const subsections = {};
    sections.forEach(section => {
      if (section.content) {
        subsections[section.id] = extractSubsections(section.content);
      }
    });
    setSectionSubsections(subsections);
  }, [sections]);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }
  
  const toggleSection = (sectionId) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(sectionId)) {
      newExpanded.delete(sectionId);
    } else {
      newExpanded.add(sectionId);
    }
    setExpandedSections(newExpanded);
  }
  
  const scrollToSubsection = (sectionId, subsectionTitle) => {
    // First scroll to the main section
    scrollToSection(sectionId);
    
    // Then find and scroll to the specific subsection
    setTimeout(() => {
      const headings = document.querySelectorAll('h2, h3');
      for (const heading of headings) {
        if (heading.textContent.trim() === subsectionTitle) {
          heading.scrollIntoView({ behavior: 'smooth', block: 'start' });
          break;
        }
      }
    }, 100);
  }

  return (
    <aside className={`sidebar ${isOpen ? '' : 'collapsed'}`}>
      <div className="sidebar-header">
        <h1 className="sidebar-title">The OO Thought Process</h1>
        <button className="sidebar-toggle" onClick={onToggle}>
          <ChevronLeft className="toggle-icon" />
        </button>
      </div>
      
      <nav className="chapter-nav">
        <ul>
          {sections.map((section) => {
            const hasSubsections = sectionSubsections[section.id]?.length > 0;
            const isExpanded = expandedSections.has(section.id);
            
            return (
              <li key={section.id} className="nav-item">
                <div className="nav-link-wrapper">
                  <a 
                    href={`#${section.id}`}
                    className={`nav-link ${activeSection === section.id ? 'active' : ''}`}
                    onClick={(e) => {
                      e.preventDefault()
                      scrollToSection(section.id)
                    }}
                  >
                    <span className="status-icon">
                      <BookOpen size={16} />
                    </span>
                    <span className="link-text">{section.navTitle}</span>
                  </a>
                  {hasSubsections && (
                    <button
                      className="expand-toggle"
                      onClick={() => toggleSection(section.id)}
                      aria-label={isExpanded ? 'Collapse section' : 'Expand section'}
                    >
                      {isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                    </button>
                  )}
                </div>
                
                {hasSubsections && isExpanded && (
                  <ul className="subsections">
                    {sectionSubsections[section.id].map((subsection) => (
                      <li key={subsection.id} className="subsection-item">
                        <a
                          href="#"
                          className="subsection-link"
                          onClick={(e) => {
                            e.preventDefault();
                            scrollToSubsection(section.id, subsection.title);
                          }}
                        >
                          {subsection.subsections?.length > 0 ? (
                            <>
                              <span className="subsection-title">{subsection.title}</span>
                              <ul className="nested-subsections">
                                {subsection.subsections.map((nested, index) => (
                                  <li key={index}>
                                    <a
                                      href="#"
                                      className="nested-subsection-link"
                                      onClick={(e) => {
                                        e.preventDefault();
                                        scrollToSubsection(section.id, nested.title);
                                      }}
                                    >
                                      {nested.title}
                                    </a>
                                  </li>
                                ))}
                              </ul>
                            </>
                          ) : (
                            subsection.title
                          )}
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  )
}

export default Sidebar