import React, { useEffect, useMemo } from 'react'
import Quiz from './Quiz'
import LearningObjectiveCard from './LearningObjectiveCard'
import KeyConceptsSection from './KeyConceptsSection'
import ContentWithInteractives from './ContentWithInteractives'
import { extractKeyConceptsFromChapter } from '../utils/extractKeyConcepts'

const Section = ({ section, prerequisiteQuiz }) => {
  // Extract key concepts from the section content
  const keyConcepts = useMemo(() => {
    if (section.content) {
      return extractKeyConceptsFromChapter(section.content);
    }
    return [];
  }, [section.content]);
  
  // Process content with additional interactives
  const processedContent = useMemo(() => {
    if (!section.content || !section.additionalInteractives) {
      return section.content;
    }
    
    let content = section.content;
    
    // Insert interactive components after specific sections
    section.additionalInteractives.forEach(interactive => {
      const regex = new RegExp(`(<h2>${interactive.afterSection}</h2>.*?)(<h2>|$)`, 's');
      content = content.replace(regex, (match, p1, p2) => {
        const interactiveHtml = `
        <div class="interactive-container">
          <h3 class="interactive-title">${interactive.title}</h3>
          <p class="interactive-description">${interactive.description}</p>
          <div class="interactive-component" data-component="${interactive.component.name}"></div>
        </div>
        `;
        return p1 + interactiveHtml + p2;
      });
    });
    
    return content;
  }, [section.content, section.additionalInteractives]);
  useEffect(() => {
    // Add tooltips functionality
    const tooltipElements = document.querySelectorAll('.tooltip')
    tooltipElements.forEach(tooltipEl => {
      if (!tooltipEl.querySelector('.tooltip-text')) {
        const tooltipText = document.createElement('span')
        tooltipText.className = 'tooltip-text'
        tooltipText.textContent = tooltipEl.dataset.tooltip
        tooltipEl.appendChild(tooltipText)
      }
    })
  }, [section])

  return (
    <section id={section.id} className="chapter-section">
      <h2>{section.title}</h2>
      
      {section.id === 'prerequisite-check' ? (
        <>
          <p>Before we dive in, let's ensure you have the foundational knowledge needed to get the most out of this book. This short quiz will test your understanding of basic programming concepts.</p>
          {prerequisiteQuiz && (
            <div className="quiz-container">
              <Quiz quiz={prerequisiteQuiz} />
            </div>
          )}
        </>
      ) : (
        <>
          {section.learningObjectives && section.learningObjectives.length > 0 && (
            <LearningObjectiveCard objectives={section.learningObjectives} />
          )}
          {keyConcepts.length > 0 && (
            <KeyConceptsSection concepts={keyConcepts} />
          )}
          <ContentWithInteractives 
            content={processedContent || section.content} 
            additionalInteractives={section.additionalInteractives}
          />
        </>
      )}

      {section.interactive && (
        <div className="interactive-container">
          <h3 className="interactive-title">{section.interactive.title}</h3>
          <p className="interactive-description">{section.interactive.description}</p>
          {section.interactive.component && (
            <div className="interactive-component">
              <section.interactive.component />
            </div>
          )}
        </div>
      )}

      {section.quiz && (
        <div className="quiz-container">
          <Quiz quiz={section.quiz} />
        </div>
      )}
    </section>
  )
}

export default Section