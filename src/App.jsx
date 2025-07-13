import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import MainContent from './components/MainContent'
import MobileMenuButton from './components/MobileMenuButton'
import { courseContent, prerequisiteQuiz } from './data/contentData'
import './App.css'

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('')

  const allSectionsData = [
    { id: 'prerequisite-check', navTitle: 'Prerequisite Check', title: 'Prerequisite Check' },
    ...courseContent
  ]

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsSidebarOpen(false)
      } else {
        setIsMobileMenuOpen(false)
      }
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const toggleSidebar = () => {
    if (window.innerWidth > 768) {
      setIsSidebarOpen(!isSidebarOpen)
    } else {
      setIsMobileMenuOpen(false)
    }
  }

  const openMobileMenu = () => {
    setIsMobileMenuOpen(true)
  }

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
  }

  return (
    <Router>
      <div className={`app-container ${!isSidebarOpen && window.innerWidth > 768 ? 'sidebar-collapsed' : ''} ${isMobileMenuOpen ? 'sidebar-mobile-open' : ''}`}>
        <MobileMenuButton onClick={openMobileMenu} />
        
        <Sidebar 
          sections={allSectionsData}
          activeSection={activeSection}
          onToggle={toggleSidebar}
          isOpen={isSidebarOpen || isMobileMenuOpen}
        />
        
        <MainContent 
          sections={allSectionsData}
          prerequisiteQuiz={prerequisiteQuiz}
          onSectionChange={setActiveSection}
        />
        
        {isMobileMenuOpen && (
          <div 
            className="mobile-menu-overlay"
            onClick={closeMobileMenu}
          />
        )}
      </div>
    </Router>
  )
}

export default App