import React, { useState } from 'react'
import './RefactoringSlider.css'

const RefactoringSlider = () => {
  const [sliderValue, setSliderValue] = useState(0)

  const proceduralCode = `// jQuery Approach (Procedural DOM Manipulation)
$(document).ready(function() {
  // Global state variables
  var todoItems = []
  var todoId = 0
  
  // Direct DOM manipulation
  $('#add-button').click(function() {
    var inputText = $('#todo-input').val()
    if (inputText) {
      todoId++
      todoItems.push({ id: todoId, text: inputText, done: false })
      
      // Manually create and append HTML
      var todoHtml = '<li id="todo-' + todoId + '">' +
                     '<span>' + inputText + '</span>' +
                     '<button onclick="deleteTodo(' + todoId + ')">Delete</button>' +
                     '</li>'
      $('#todo-list').append(todoHtml)
      $('#todo-input').val('')
    }
  })
  
  // Global function pollutes namespace
  window.deleteTodo = function(id) {
    $('#todo-' + id).remove()
    todoItems = todoItems.filter(function(item) {
      return item.id !== id
    })
  }
})`

  const objectOrientedCode = `// React Approach (Component-Based OOP)
class TodoApp extends React.Component {
  constructor(props) {
    super(props)
    // Encapsulated state
    this.state = {
      todos: [],
      nextId: 1
    }
  }
  
  // Methods bound to component
  addTodo = (text) => {
    if (text) {
      this.setState(prevState => ({
        todos: [...prevState.todos, {
          id: prevState.nextId,
          text: text,
          done: false
        }],
        nextId: prevState.nextId + 1
      }))
    }
  }
  
  deleteTodo = (id) => {
    this.setState(prevState => ({
      todos: prevState.todos.filter(todo => todo.id !== id)
    }))
  }
  
  render() {
    return (
      <div>
        <TodoInput onAdd={this.addTodo} />
        <TodoList 
          todos={this.state.todos} 
          onDelete={this.deleteTodo} 
        />
      </div>
    )
  }
}

// Separate, reusable components
class TodoItem extends React.Component {
  render() {
    const { todo, onDelete } = this.props
    return (
      <li>
        <span>{todo.text}</span>
        <button onClick={() => onDelete(todo.id)}>Delete</button>
      </li>
    )
  }
}`

  const getHighlightedCode = () => {
    const progress = sliderValue / 100
    
    if (progress < 0.2) {
      return {
        code: proceduralCode,
        highlights: ['var todoItems', 'var todoId', 'window.deleteTodo'],
        message: 'jQuery: Global variables and functions pollute namespace'
      }
    } else if (progress < 0.4) {
      return {
        code: proceduralCode,
        highlights: ['#add-button', '$(\'#todo-list\').append', 'onclick='],
        message: 'jQuery: Direct DOM manipulation and inline event handlers'
      }
    } else if (progress < 0.6) {
      return {
        code: objectOrientedCode,
        highlights: ['class TodoApp', 'class TodoItem', 'extends React.Component'],
        message: 'React: Components encapsulate UI logic and state'
      }
    } else if (progress < 0.8) {
      return {
        code: objectOrientedCode,
        highlights: ['this.state', 'setState', 'prevState'],
        message: 'React: State is encapsulated and immutably updated'
      }
    } else {
      return {
        code: objectOrientedCode,
        highlights: ['onAdd={this.addTodo}', 'onDelete={this.deleteTodo}', 'props'],
        message: 'React: Components communicate through props, not global functions'
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
          <h4>jQuery (Procedural) Problems</h4>
          <ul>
            <li>Global state pollution</li>
            <li>DOM manipulation scattered everywhere</li>
            <li>Hard to test and debug</li>
            <li>No clear component boundaries</li>
          </ul>
        </div>
        <div className="comparison-column oop">
          <h4>React (Component-Based) Benefits</h4>
          <ul>
            <li>Encapsulated component state</li>
            <li>Declarative UI updates</li>
            <li>Reusable, testable components</li>
            <li>Clear data flow through props</li>
          </ul>
        </div>
      </div>
      
      <div className="framework-insight">
        <h4>🚀 Real-World Impact:</h4>
        <p>
          This transformation from jQuery to React represents a major shift in web development. 
          Companies like Facebook, Netflix, and Airbnb migrated from jQuery's procedural approach 
          to React's component-based architecture, resulting in more maintainable, scalable applications.
        </p>
      </div>
    </div>
  )
}

export default RefactoringSlider