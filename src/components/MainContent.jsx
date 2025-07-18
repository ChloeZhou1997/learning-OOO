import React, { useEffect, useRef, useState } from 'react'
import Section from './Section'
import Cheatsheet from './Cheatsheet'
import ProgressDashboard from './ProgressDashboard'
import AnalyticsDashboard from './AnalyticsDashboard'
import FloatingSidebar from './FloatingSidebar'
import BookmarksPanel from './BookmarksPanel'
import NotesPanel from './NotesPanel'
import { cheatsheetData } from '../data/cheatsheetData'
import { useProgress } from '../hooks/useProgress'
import { useAnalytics } from '../hooks/useAnalytics'
import './Cheatsheet.css'

const MainContent = ({ sections, prerequisiteQuiz, onSectionChange }) => {
  const contentRef = useRef(null)
  const [showFloatingSidebar, setShowFloatingSidebar] = useState(false)
  const [activeSection, setActiveSection] = useState('')
  const [showBookmarks, setShowBookmarks] = useState(false)
  const [showNotes, setShowNotes] = useState(false)
  const { markChapterAsRead } = useProgress()
  const { trackComponentInteraction } = useAnalytics()

  useEffect(() => {
    const chapterReadingProgress = new Map()
    const sectionTimeTracking = new Map()
    const readingThreshold = 0.8 // Consider chapter read when 80% viewed
    let previousSection = null
    
    // Observer for tracking which section is active
    const activeObserverOptions = {
      root: contentRef.current,
      rootMargin: '-40% 0px -60% 0px',
      threshold: 0,
    }

    const activeObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id')
          onSectionChange(id)
          setActiveSection(id)
          
          // Track navigation
          if (previousSection && previousSection !== id) {
            trackComponentInteraction('navigation', 'sectionChange', { 
              from: previousSection, 
              to: id,
              chapterId: id 
            })
          }
          
          // Start tracking time for new section
          sectionTimeTracking.set(id, Date.now())
          
          // Track engagement for previous section
          if (previousSection && sectionTimeTracking.has(previousSection)) {
            const timeSpent = Math.round((Date.now() - sectionTimeTracking.get(previousSection)) / 1000)
            const scrollDepth = chapterReadingProgress.get(previousSection) / 100 || 0
            trackComponentInteraction('sectionEngagement', 'completed', { 
              sectionId: previousSection,
              timeSpent, 
              scrollDepth,
              chapterId: previousSection
            })
          }
          
          previousSection = id
        }
      })
    }, activeObserverOptions)
    
    // Observer for tracking reading progress
    const progressObserverOptions = {
      root: contentRef.current,
      rootMargin: '0px',
      threshold: Array.from({ length: 101 }, (_, i) => i / 100), // 0%, 1%, 2%, ..., 100%
    }
    
    const progressObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const id = entry.target.getAttribute('id')
        if (id && id !== 'prerequisite-check' && id !== 'progress' && id !== 'cheatsheet') {
          const currentProgress = chapterReadingProgress.get(id) || 0
          const newProgress = Math.round(entry.intersectionRatio * 100)
          
          // Only update if progress increased
          if (newProgress > currentProgress) {
            chapterReadingProgress.set(id, newProgress)
            markChapterAsRead(id, newProgress)
          }
        }
      })
    }, progressObserverOptions)

    const sectionElements = contentRef.current?.querySelectorAll('.chapter-section')
    sectionElements?.forEach(section => {
      activeObserver.observe(section)
      progressObserver.observe(section)
    })

    return () => {
      sectionElements?.forEach(section => {
        activeObserver.unobserve(section)
        progressObserver.unobserve(section)
      })
    }
  }, [onSectionChange, markChapterAsRead, trackComponentInteraction])

  // Add scroll detection for showing/hiding floating sidebar
  useEffect(() => {
    const handleScroll = () => {
      if (!contentRef.current) return
      
      // Check if we've scrolled past the learning objectives
      const learningObjectiveCards = contentRef.current.querySelectorAll('.learning-objectives-card')
      let shouldShow = false
      
      learningObjectiveCards.forEach(card => {
        const rect = card.getBoundingClientRect()
        // Show floating sidebar when learning objectives are scrolled out of view
        if (rect.bottom < 0) {
          shouldShow = true
        }
      })
      
      setShowFloatingSidebar(shouldShow)
    }
    
    const scrollContainer = contentRef.current
    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', handleScroll)
      handleScroll() // Check initial state
    }
    
    return () => {
      if (scrollContainer) {
        scrollContainer.removeEventListener('scroll', handleScroll)
      }
    }
  }, [])

  return (
    <main ref={contentRef} className="main-content">
      <div className="content-wrapper">
        <header className="content-header">
          <h1>The Object-Oriented Thought Process</h1>
          <p>An Interactive Learning Experience</p>
        </header>

        <div className="content-sections">
          {sections.map((section) => {
            if (section.id === 'cheatsheet') {
              return (
                <div key={section.id} id="cheatsheet" className="chapter-section">
                  <Cheatsheet />
                </div>
              )
            }
            if (section.id === 'progress') {
              return (
                <div key={section.id} id="progress" className="chapter-section">
                  <ProgressDashboard chapters={sections.filter(s => s.id.startsWith('chapter-') || s.id === 'introduction' || s.id === 'conclusion')} />
                </div>
              )
            }
            if (section.id === 'analytics') {
              return (
                <div key={section.id} id="analytics" className="chapter-section">
                  <AnalyticsDashboard chapters={sections.filter(s => s.id.startsWith('chapter-') || s.id === 'introduction' || s.id === 'conclusion')} />
                </div>
              )
            }
            return (
              <Section 
                key={section.id}
                section={section}
                prerequisiteQuiz={section.id === 'prerequisite-check' ? prerequisiteQuiz : null}
              />
            )
          })}
        </div>
      </div>
      
      <FloatingSidebar 
        activeSection={activeSection}
        sections={sections}
        cheatsheetData={cheatsheetData}
        isVisible={showFloatingSidebar}
        onShowBookmarks={() => setShowBookmarks(true)}
        onShowNotes={() => setShowNotes(true)}
      />
      
      <BookmarksPanel 
        isOpen={showBookmarks}
        onClose={() => setShowBookmarks(false)}
        onNavigate={(sectionId) => {
          const element = document.getElementById(sectionId)
          if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' })
          }
        }}
      />
      
      <NotesPanel 
        isOpen={showNotes}
        onClose={() => setShowNotes(false)}
        currentChapter={activeSection}
        currentSection={activeSection}
      />
    </main>
  )
}

export default MainContent