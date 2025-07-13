export const extractSubsections = (htmlContent) => {
  const sections = [];
  let currentH2 = null;
  
  // Create a temporary DOM element to parse HTML
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlContent, 'text/html');
  
  // Get all headings
  const headings = doc.querySelectorAll('h2, h3');
  
  headings.forEach(heading => {
    if (heading.tagName === 'H2') {
      currentH2 = {
        id: heading.textContent.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/-$/, ''),
        title: heading.textContent.trim(),
        level: 2,
        subsections: []
      };
      sections.push(currentH2);
    } else if (heading.tagName === 'H3' && currentH2) {
      currentH2.subsections.push({
        id: heading.textContent.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/-$/, ''),
        title: heading.textContent.trim(),
        level: 3
      });
    }
  });
  
  return sections;
};

// Helper to add subsections to existing chapter data
export const enhanceChapterWithSubsections = (chapter) => {
  if (!chapter.content) return chapter;
  
  const subsections = extractSubsections(chapter.content);
  return {
    ...chapter,
    subsections
  };
};