import React, { useState } from 'react';
import { Key, ChevronDown, ChevronUp } from 'lucide-react';
import KeyConcept from './KeyConcept';

const KeyConceptsSection = ({ concepts = [] }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  if (!concepts || concepts.length === 0) {
    return null;
  }
  
  // Show first 6 concepts when collapsed, all when expanded
  const displayedConcepts = isExpanded ? concepts : concepts.slice(0, 6);
  const hasMore = concepts.length > 6;
  
  return (
    <div className="key-concepts-section">
      <div className="key-concepts-header">
        <div className="concepts-icon">
          <Key size={24} />
        </div>
        <h3>Key Concepts</h3>
      </div>
      
      <p className="concepts-intro">
        Hover over any concept below to see its definition
      </p>
      
      <div className="concepts-grid">
        {displayedConcepts.map((concept, index) => (
          <KeyConcept
            key={`${concept.term}-${index}`}
            term={concept.term}
            definition={concept.definition}
            type={concept.type}
          />
        ))}
      </div>
      
      {hasMore && (
        <button
          className="concepts-toggle-btn"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? (
            <>
              <ChevronUp size={16} />
              Show Less
            </>
          ) : (
            <>
              <ChevronDown size={16} />
              Show All {concepts.length} Concepts
            </>
          )}
        </button>
      )}
    </div>
  );
};

export default KeyConceptsSection;