import React, { useEffect, useRef } from 'react'
import Section from './Section'

const MainContent = ({ sections, prerequisiteQuiz, onSectionChange }) => {
  const contentRef = useRef(null)

  useEffect(() => {
    const observerOptions = {
      root: contentRef.current,
      rootMargin: '-40% 0px -60% 0px',
      threshold: 0,
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id')
          onSectionChange(id)
        }
      })
    }, observerOptions)

    const sectionElements = contentRef.current?.querySelectorAll('.chapter-section')
    sectionElements?.forEach(section => {
      observer.observe(section)
    })

    return () => {
      sectionElements?.forEach(section => {
        observer.unobserve(section)
      })
    }
  }, [onSectionChange])

  return (
    <main ref={contentRef} className="main-content">
      <div className="content-wrapper">
        <header className="content-header">
          <h1>The Object-Oriented Thought Process</h1>
          <p>An Interactive Learning Experience</p>
        </header>

        <div className="content-sections">
          {sections.map((section) => (
            <Section 
              key={section.id}
              section={section}
              prerequisiteQuiz={section.id === 'prerequisite-check' ? prerequisiteQuiz : null}
            />
          ))}
        </div>
      </div>
    </main>
  )
}

export default MainContent