export const extractKeyConceptsFromChapter = (chapterContent) => {
  const concepts = [];
  
  // Create a temporary DOM element to parse HTML
  const parser = new DOMParser();
  const doc = parser.parseFromString(chapterContent, 'text/html');
  
  // 1. Extract bold terms with context
  const strongElements = doc.querySelectorAll('strong');
  strongElements.forEach(strong => {
    const term = strong.textContent.trim();
    // Get the parent paragraph or nearest text context
    let context = '';
    let parent = strong.parentElement;
    while (parent && parent.tagName !== 'P' && parent.tagName !== 'LI') {
      parent = parent.parentElement;
    }
    if (parent) {
      context = parent.textContent.trim();
    }
    
    // Avoid duplicates and filter out non-concept terms
    if (term.length > 2 && !concepts.some(c => c.term === term)) {
      concepts.push({
        term,
        definition: context,
        type: 'bold'
      });
    }
  });
  
  // 2. Extract tooltip definitions
  const tooltips = doc.querySelectorAll('.tooltip[data-tooltip]');
  tooltips.forEach(tooltip => {
    const term = tooltip.textContent.trim();
    const definition = tooltip.getAttribute('data-tooltip');
    
    if (!concepts.some(c => c.term === term)) {
      concepts.push({
        term,
        definition,
        type: 'tooltip'
      });
    }
  });
  
  // 3. Extract info-box titles as concepts
  const infoBoxes = doc.querySelectorAll('.info-box h4');
  infoBoxes.forEach(infoBox => {
    const term = infoBox.textContent.trim();
    const definition = infoBox.nextElementSibling?.textContent?.trim() || '';
    
    if (!concepts.some(c => c.term === term)) {
      concepts.push({
        term,
        definition,
        type: 'info-box'
      });
    }
  });
  
  // 4. Extract code terms (method names, class names)
  const codeElements = doc.querySelectorAll('code');
  codeElements.forEach(code => {
    const text = code.textContent.trim();
    // Filter for method names and class names (simple heuristic)
    if (text.includes('()') || (text.length > 2 && text[0] === text[0].toUpperCase() && !text.includes(' '))) {
      const term = text;
      // Try to find context from parent paragraph
      let parent = code.parentElement;
      while (parent && parent.tagName !== 'P') {
        parent = parent.parentElement;
      }
      const context = parent ? parent.textContent.trim() : '';
      
      if (!concepts.some(c => c.term === term)) {
        concepts.push({
          term,
          definition: context,
          type: 'code'
        });
      }
    }
  });
  
  // Sort concepts alphabetically
  concepts.sort((a, b) => a.term.localeCompare(b.term));
  
  // Filter and clean up concepts
  return concepts.filter(concept => {
    // Remove very short terms and common words
    const commonWords = ['the', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for'];
    return concept.term.length > 2 && 
           !commonWords.includes(concept.term.toLowerCase()) &&
           concept.definition.length > concept.term.length; // Definition should be longer than the term
  });
};

// Helper function to extract key concepts from all chapters
export const extractAllKeyConcepts = (chapters) => {
  const allConcepts = {};
  
  chapters.forEach(chapter => {
    if (chapter.content) {
      allConcepts[chapter.id] = extractKeyConceptsFromChapter(chapter.content);
    }
  });
  
  return allConcepts;
};

// Create a glossary from all concepts
export const createGlossary = (allConcepts) => {
  const glossary = [];
  const seen = new Set();
  
  Object.values(allConcepts).forEach(chapterConcepts => {
    chapterConcepts.forEach(concept => {
      if (!seen.has(concept.term)) {
        seen.add(concept.term);
        glossary.push(concept);
      }
    });
  });
  
  return glossary.sort((a, b) => a.term.localeCompare(b.term));
};