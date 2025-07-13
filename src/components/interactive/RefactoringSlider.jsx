import React, { useState } from 'react'
import './RefactoringSlider.css'

const RefactoringSlider = () => {
  const [sliderValue, setSliderValue] = useState(0)

  const proceduralCode = `// Procedural Approach
function manageLibrary() {
  // Data stored as separate variables
  let bookTitle = "The Object-Oriented Thought Process"
  let bookISBN = "978-0135181966"
  let bookAvailable = true
  
  let memberName = "Alice Johnson"
  let memberID = "M001"
  let memberBooks = []
  
  // Functions operate on external data
  if (bookAvailable) {
    memberBooks.push(bookTitle)
    bookAvailable = false
    console.log(\`\${memberName} borrowed \${bookTitle}\`)
  }
  
  // Return book
  if (memberBooks.includes(bookTitle)) {
    memberBooks = memberBooks.filter(b => b !== bookTitle)
    bookAvailable = true
    console.log(\`\${memberName} returned \${bookTitle}\`)
  }
}`

  const objectOrientedCode = `// Object-Oriented Approach
class Book {
  constructor(title, isbn) {
    this.title = title
    this.isbn = isbn
    this.available = true
  }
  
  checkout() {
    if (this.available) {
      this.available = false
      return true
    }
    return false
  }
  
  return() {
    this.available = true
  }
}

class Member {
  constructor(name, id) {
    this.name = name
    this.id = id
    this.borrowedBooks = []
  }
  
  borrowBook(book) {
    if (book.checkout()) {
      this.borrowedBooks.push(book)
      console.log(\`\${this.name} borrowed \${book.title}\`)
    }
  }
  
  returnBook(book) {
    const index = this.borrowedBooks.indexOf(book)
    if (index > -1) {
      this.borrowedBooks.splice(index, 1)
      book.return()
      console.log(\`\${this.name} returned \${book.title}\`)
    }
  }
}

// Usage
const book = new Book("The Object-Oriented Thought Process", "978-0135181966")
const member = new Member("Alice Johnson", "M001")
member.borrowBook(book)
member.returnBook(book)`

  const getHighlightedCode = () => {
    const progress = sliderValue / 100
    
    if (progress < 0.2) {
      return {
        code: proceduralCode,
        highlights: ['let bookTitle', 'let bookISBN', 'let memberName', 'let memberID'],
        message: 'Procedural: Data is scattered as separate variables'
      }
    } else if (progress < 0.4) {
      return {
        code: proceduralCode,
        highlights: ['if (bookAvailable)', 'memberBooks.push', 'console.log'],
        message: 'Procedural: Logic operates on external data directly'
      }
    } else if (progress < 0.6) {
      return {
        code: objectOrientedCode,
        highlights: ['class Book', 'class Member'],
        message: 'OOP: Data and behavior are grouped into classes'
      }
    } else if (progress < 0.8) {
      return {
        code: objectOrientedCode,
        highlights: ['constructor', 'this.title', 'this.name', 'this.borrowedBooks'],
        message: 'OOP: Objects encapsulate their own state'
      }
    } else {
      return {
        code: objectOrientedCode,
        highlights: ['checkout()', 'borrowBook()', 'returnBook()'],
        message: 'OOP: Objects interact through methods, not direct data access'
      }
    }
  }

  const { code, highlights, message } = getHighlightedCode()

  const highlightCode = (code, highlights) => {
    let highlightedCode = code
    highlights.forEach(term => {
      const regex = new RegExp(`(${term})`, 'g')
      highlightedCode = highlightedCode.replace(regex, '<mark>$1</mark>')
    })
    return highlightedCode
  }

  return (
    <div className="refactoring-slider-container">
      <div className="slider-control">
        <label>Slide to transform from Procedural to Object-Oriented:</label>
        <input
          type="range"
          min="0"
          max="100"
          value={sliderValue}
          onChange={(e) => setSliderValue(e.target.value)}
          className="slider"
        />
        <div className="slider-labels">
          <span>Procedural</span>
          <span>Object-Oriented</span>
        </div>
      </div>

      <div className="transformation-message">
        <p>{message}</p>
      </div>

      <div className="code-display">
        <pre>
          <code dangerouslySetInnerHTML={{ __html: highlightCode(code, highlights) }} />
        </pre>
      </div>

      <div className="comparison-points">
        <div className="comparison-column procedural">
          <h4>Procedural Characteristics</h4>
          <ul>
            <li>Data and functions are separate</li>
            <li>Functions operate on global data</li>
            <li>Focus on "what happens next"</li>
            <li>Difficult to maintain as it grows</li>
          </ul>
        </div>
        <div className="comparison-column oop">
          <h4>Object-Oriented Characteristics</h4>
          <ul>
            <li>Data and methods are bundled together</li>
            <li>Objects manage their own state</li>
            <li>Focus on "what are the things"</li>
            <li>Easier to extend and maintain</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default RefactoringSlider