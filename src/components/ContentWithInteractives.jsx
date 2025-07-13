import React, { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom/client';

const ContentWithInteractives = ({ content, additionalInteractives }) => {
  const contentRef = useRef(null);
  const rootsRef = useRef({});

  useEffect(() => {
    if (!contentRef.current || !additionalInteractives) return;

    // Clean up previous roots
    Object.values(rootsRef.current).forEach(root => {
      try {
        root.unmount();
      } catch (e) {
        // Root might already be unmounted
      }
    });
    rootsRef.current = {};

    // Find all interactive component placeholders
    const placeholders = contentRef.current.querySelectorAll('[data-component]');
    
    placeholders.forEach(placeholder => {
      const componentName = placeholder.getAttribute('data-component');
      
      // Find the matching interactive component
      const interactive = additionalInteractives.find(
        int => int.component && int.component.name === componentName
      );
      
      if (interactive && interactive.component) {
        // Create a root and render the component
        const root = ReactDOM.createRoot(placeholder);
        rootsRef.current[componentName] = root;
        
        const Component = interactive.component;
        root.render(<Component />);
      }
    });

    // Cleanup function
    return () => {
      Object.values(rootsRef.current).forEach(root => {
        try {
          root.unmount();
        } catch (e) {
          // Root might already be unmounted
        }
      });
      rootsRef.current = {};
    };
  }, [content, additionalInteractives]);

  return <div ref={contentRef} dangerouslySetInnerHTML={{ __html: content }} />;
};

export default ContentWithInteractives;