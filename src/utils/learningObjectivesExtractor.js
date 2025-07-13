/**
 * Extracts learning objectives from HTML content and returns both the objectives
 * and the content with learning objectives section removed
 */
export const extractLearningObjectives = (htmlContent) => {
  // Create a temporary div to parse HTML
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = htmlContent;
  
  // Find the learning objectives section
  const learningObjectivesHeader = Array.from(tempDiv.querySelectorAll('h3')).find(
    h3 => h3.textContent.includes('Learning Objectives')
  );
  
  if (!learningObjectivesHeader) {
    return {
      objectives: [],
      contentWithoutObjectives: htmlContent
    };
  }
  
  // Find the ul element that contains the objectives
  let currentElement = learningObjectivesHeader.nextElementSibling;
  let objectives = [];
  
  // Skip the intro paragraph (e.g., "Upon completing this chapter, you will be able to:")
  if (currentElement && currentElement.tagName === 'P') {
    currentElement = currentElement.nextElementSibling;
  }
  
  // Extract objectives from the ul element
  if (currentElement && currentElement.tagName === 'UL') {
    const listItems = currentElement.querySelectorAll('li');
    objectives = Array.from(listItems).map(li => li.textContent.trim());
    
    // Remove the learning objectives section from content
    learningObjectivesHeader.remove();
    if (learningObjectivesHeader.nextElementSibling && learningObjectivesHeader.nextElementSibling.tagName === 'P') {
      learningObjectivesHeader.nextElementSibling.remove();
    }
    currentElement.remove();
  }
  
  return {
    objectives,
    contentWithoutObjectives: tempDiv.innerHTML
  };
};

/**
 * Parses learning objectives from static HTML content (for server-side processing)
 */
export const parseLearningObjectivesFromHTML = (htmlContent) => {
  // Use regex to extract learning objectives from HTML string
  const learningObjectivesRegex = /<h3>Learning Objectives<\/h3>\s*<p>.*?<\/p>\s*<ul>(.*?)<\/ul>/s;
  const match = htmlContent.match(learningObjectivesRegex);
  
  if (!match) {
    return {
      objectives: [],
      contentWithoutObjectives: htmlContent
    };
  }
  
  // Extract list items
  const ulContent = match[1];
  const liRegex = /<li>(.*?)<\/li>/g;
  const objectives = [];
  let liMatch;
  
  while ((liMatch = liRegex.exec(ulContent)) !== null) {
    // Remove HTML tags and clean up the text
    const objective = liMatch[1]
      .replace(/<[^>]*>/g, '') // Remove HTML tags
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&amp;/g, '&')
      .trim();
    objectives.push(objective);
  }
  
  // Remove the entire learning objectives section from the content
  const contentWithoutObjectives = htmlContent.replace(learningObjectivesRegex, '').trim();
  
  return {
    objectives,
    contentWithoutObjectives
  };
};