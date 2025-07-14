export const extractKeyConceptsFromChapter = (chapterContent) => {
  const concepts = [];
  
  // Define actual OOP concepts to look for (case-insensitive)
  const oopConcepts = [
    'encapsulation', 'inheritance', 'polymorphism', 'abstraction',
    'interface', 'implementation', 'class', 'object', 'method',
    'attribute', 'composition', 'aggregation', 'association',
    'design pattern', 'solid principles', 'coupling', 'cohesion',
    'constructor', 'destructor', 'overloading', 'overriding',
    'abstract class', 'concrete class', 'instance', 'instantiation',
    'message', 'behavior', 'state', 'property', 'member',
    'public', 'private', 'protected', 'static', 'final',
    'singleton', 'factory', 'observer', 'strategy', 'adapter',
    'decorator', 'facade', 'proxy', 'command', 'iterator',
    'template method', 'dependency injection', 'inversion of control',
    'liskov substitution', 'open/closed principle', 'single responsibility',
    'interface segregation', 'dependency inversion', 'has-a relationship',
    'is-a relationship', 'delegation', 'black box', 'white box',
    'information hiding', 'data hiding', 'getter', 'setter',
    'accessor', 'mutator', 'superclass', 'subclass', 'parent class',
    'child class', 'base class', 'derived class', 'virtual method',
    'abstract method', 'concrete method', 'method signature',
    'method overloading', 'method overriding', 'dynamic binding',
    'static binding', 'early binding', 'late binding', 'runtime polymorphism',
    'compile-time polymorphism', 'multiple inheritance', 'single inheritance',
    'hierarchical inheritance', 'multilevel inheritance', 'hybrid inheritance',
    'reusability', 'modularity', 'extensibility', 'maintainability',
    'data member', 'member function', 'object reference', 'object identity',
    'object equality', 'shallow copy', 'deep copy', 'object cloning',
    'object serialization', 'object persistence', 'object lifecycle',
    'object creation', 'object destruction', 'garbage collection',
    'reference counting', 'memory management', 'object pool',
    'object factory', 'object builder', 'fluent interface',
    'method chaining', 'object composition', 'object aggregation',
    'object delegation', 'mixin', 'trait', 'protocol',
    'abstract data type', 'concrete data type', 'generic programming',
    'parametric polymorphism', 'ad hoc polymorphism', 'subtype polymorphism',
    'covariance', 'contravariance', 'invariance', 'type safety',
    'type casting', 'type conversion', 'type inference'
  ];
  
  // Define example objects to exclude
  const exampleObjects = [
    'cat', 'dog', 'animal', 'mammal', 'bird', 'fish',
    'circle', 'square', 'rectangle', 'shape', 'triangle', 'star',
    'car', 'engine', 'vehicle', 'wheel', 'door', 'cabbie', 'taxi',
    'person', 'student', 'teacher', 'employee', 'manager', 'developer',
    'bank', 'account', 'customer', 'transaction', 'payroll',
    'book', 'library', 'author', 'publisher', 'reader',
    'computer', 'monitor', 'keyboard', 'mouse', 'screen',
    'phone', 'smartphone', 'tablet', 'device',
    'house', 'room', 'window', 'door', 'furniture',
    'pizza', 'food', 'restaurant', 'menu',
    'game', 'player', 'score', 'level', 'enemy', 'powerup',
    'user', 'admin', 'guest', 'member', 'role',
    'button', 'textfield', 'panel', 'canvas', 'renderer',
    'database', 'oracle', 'sql', 'sqlanywhere',
    'toaster', 'appliance', 'outlet', 'electricity',
    'draw', 'move', 'rotate', 'scale', 'calculate',
    'paycheck', 'timesheet', 'division', 'spouse', 'child'
  ];
  
  // Create a temporary DOM element to parse HTML
  const parser = new DOMParser();
  const doc = parser.parseFromString(chapterContent, 'text/html');
  
  // Helper function to check if a term is a valid OOP concept
  const isOOPConcept = (term) => {
    const lowerTerm = term.toLowerCase().trim();
    
    // Check if it's an example object (exact match or contains)
    if (exampleObjects.some(ex => {
      const lowerEx = ex.toLowerCase();
      return lowerTerm === lowerEx || 
             lowerTerm.includes(lowerEx) || 
             lowerEx.includes(lowerTerm);
    })) {
      return false;
    }
    
    // Check if it contains method syntax like draw(), move(), etc.
    if (lowerTerm.includes('()') && !isGenericMethod(term)) {
      return false;
    }
    
    // Check if it's a known OOP concept (exact match preferred)
    return oopConcepts.some(concept => {
      const lowerConcept = concept.toLowerCase();
      return lowerTerm === lowerConcept || 
             lowerTerm === lowerConcept + 's' || // Handle plurals
             (lowerTerm.includes(lowerConcept) && lowerTerm.split(' ').length <= 3); // Allow short phrases
    });
  };
  
  // Helper function to check if a term is a generic method name
  const isGenericMethod = (term) => {
    const genericMethods = ['getters', 'setters', 'getter', 'setter', 'accessor', 'mutator', 
                           'constructor', 'destructor', 'initializer'];
    const lowerTerm = term.toLowerCase().replace('()', '').trim();
    return genericMethods.some(method => lowerTerm === method || lowerTerm === method + 's');
  };
  
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
    
    // Only add if it's an OOP concept
    if (term.length > 2 && isOOPConcept(term)) {
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
    
    if (isOOPConcept(term)) {
      concepts.push({
        term,
        definition,
        type: 'tooltip'
      });
    }
  });
  
  // 3. Extract info-box titles as concepts (but filter them)
  const infoBoxes = doc.querySelectorAll('.info-box h4');
  infoBoxes.forEach(infoBox => {
    const term = infoBox.textContent.trim();
    const definition = infoBox.nextElementSibling?.textContent?.trim() || '';
    
    // Info boxes often contain explanatory titles, not just concept names
    // Only include if it contains OOP concepts
    if (isOOPConcept(term)) {
      concepts.push({
        term,
        definition,
        type: 'info-box'
      });
    }
  });
  
  // 4. Extract code terms (method names, class names) - but only generic ones
  const codeElements = doc.querySelectorAll('code');
  codeElements.forEach(code => {
    const text = code.textContent.trim();
    
    // Check for generic method patterns (getters/setters)
    if (text.includes('()') && isGenericMethod(text)) {
      const term = text;
      // Try to find context from parent paragraph
      let parent = code.parentElement;
      while (parent && parent.tagName !== 'P') {
        parent = parent.parentElement;
      }
      const context = parent ? parent.textContent.trim() : '';
      
      concepts.push({
        term: term.replace('()', ''), // Remove parentheses for display
        definition: context,
        type: 'code'
      });
    }
  });
  
  // First, clean up all concepts before deduplication
  const cleanedConcepts = concepts.map(concept => {
    return {
      ...concept,
      term: concept.term
        .replace(/["""]/g, '') // Remove smart quotes
        .replace(/['']/g, "'") // Replace smart apostrophes with regular ones
        .replace(/[:;]/g, '') // Remove colons and semicolons
        .replace(/\s+/g, ' ') // Normalize whitespace
        .trim(),
      definition: concept.definition
        .replace(/["""]/g, '"') // Replace smart quotes with regular quotes
        .replace(/['']/g, "'") // Replace smart apostrophes with regular ones
        .replace(/\s+/g, ' ') // Normalize whitespace
        .trim()
    };
  });
  
  // Helper function to normalize terms for comparison
  const normalizeTerm = (term) => {
    let normalized = term.toLowerCase().trim();
    // Remove common plural 's' but preserve terms that naturally end in 's'
    if (normalized.endsWith('s') && normalized.length > 3 && 
        !['class', 'process', 'access', 'address', 'business'].includes(normalized)) {
      const singular = normalized.slice(0, -1);
      // Check if the singular form is a known OOP concept
      if (oopConcepts.some(c => c.toLowerCase() === singular)) {
        normalized = singular;
      }
    }
    return normalized;
  };
  
  // Remove duplicates based on normalized term (after cleaning)
  const uniqueConcepts = [];
  const seenNormalizedTerms = new Map(); // Map normalized term to actual term
  
  cleanedConcepts.forEach(concept => {
    const normalizedTerm = normalizeTerm(concept.term);
    
    if (!seenNormalizedTerms.has(normalizedTerm)) {
      seenNormalizedTerms.set(normalizedTerm, concept.term);
      uniqueConcepts.push(concept);
    } else {
      // If we've seen this normalized term, keep the one with the better definition
      const existingIndex = uniqueConcepts.findIndex(c => 
        normalizeTerm(c.term) === normalizedTerm
      );
      if (existingIndex !== -1 && concept.definition.length > uniqueConcepts[existingIndex].definition.length) {
        uniqueConcepts[existingIndex] = concept;
        seenNormalizedTerms.set(normalizedTerm, concept.term);
      }
    }
  });
  
  // Filter out invalid concepts
  const filteredConcepts = uniqueConcepts.filter(concept => {
    // Remove very short terms and common words
    const commonWords = ['the', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'a', 'an'];
    const lowerTerm = concept.term.toLowerCase();
    
    return concept.term.length > 2 && 
           !commonWords.includes(lowerTerm) &&
           concept.definition && 
           concept.definition.length > concept.term.length && // Definition should be longer than the term
           !concept.term.includes('()'); // Remove method calls that slipped through
  });
  
  // Sort concepts alphabetically
  filteredConcepts.sort((a, b) => a.term.localeCompare(b.term));
  
  return filteredConcepts;
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