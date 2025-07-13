import React, { useState } from 'react'

const Quiz = ({ quiz }) => {
  const [answers, setAnswers] = useState({})
  const [feedback, setFeedback] = useState({})
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [score, setScore] = useState(null)

  const handleInputChange = (questionIndex, value) => {
    setAnswers({
      ...answers,
      [questionIndex]: value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    let newScore = 0
    const newFeedback = {}
    const total = quiz.questions.filter(q => q.type !== 'deeper-thinking' && q.type !== 'coding-challenge').length

    quiz.questions.forEach((q, index) => {
      if (q.type === 'mcq') {
        const selectedAnswer = parseInt(answers[index])
        if (selectedAnswer === q.answerIndex) {
          newScore++
          newFeedback[index] = { correct: true, message: 'Correct!' }
        } else {
          newFeedback[index] = { 
            correct: false, 
            message: `Incorrect. The correct answer is: ${q.options[q.answerIndex]}` 
          }
        }
      } else if (q.type === 'fill-in') {
        if (answers[index]?.trim().toLowerCase() === q.answer.toLowerCase()) {
          newScore++
          newFeedback[index] = { correct: true, message: 'Correct!' }
        } else {
          newFeedback[index] = { 
            correct: false, 
            message: `Incorrect. The correct answer is: ${q.answer}` 
          }
        }
      } else if (q.type === 'deeper-thinking' || q.type === 'coding-challenge') {
        newFeedback[index] = { 
          modelAnswer: true, 
          message: `Model Answer: ${q.modelAnswer}` 
        }
      }
    })

    setFeedback(newFeedback)
    setScore({ correct: newScore, total })
    setIsSubmitted(true)
  }

  const scorePercentage = score ? (score.total > 0 ? (score.correct / score.total) * 100 : 100) : 0

  return (
    <div className="quiz">
      <h3 className="quiz-title">{quiz.title}</h3>
      <form onSubmit={handleSubmit} className="quiz-form">
        {quiz.questions.map((question, index) => (
          <div key={index} className="quiz-question">
            <p className="question-text">{index + 1}. {question.question}</p>
            
            {question.type === 'mcq' && (
              <ul className="quiz-options">
                {question.options.map((option, optionIndex) => (
                  <li key={optionIndex}>
                    <label>
                      <input
                        type="radio"
                        name={`q${index}`}
                        value={optionIndex}
                        onChange={(e) => handleInputChange(index, e.target.value)}
                        disabled={isSubmitted}
                      />
                      <span>{option}</span>
                    </label>
                  </li>
                ))}
              </ul>
            )}
            
            {question.type === 'fill-in' && (
              <input
                type="text"
                className="fill-in-blank"
                placeholder="Your answer..."
                onChange={(e) => handleInputChange(index, e.target.value)}
                disabled={isSubmitted}
              />
            )}
            
            {question.type === 'deeper-thinking' && (
              <textarea
                className="deeper-thinking"
                placeholder="Your thoughts..."
                onChange={(e) => handleInputChange(index, e.target.value)}
                disabled={isSubmitted}
              />
            )}
            
            {question.type === 'coding-challenge' && (
              <textarea
                className="deeper-thinking"
                placeholder="Your code..."
                defaultValue={question.starterCode}
                onChange={(e) => handleInputChange(index, e.target.value)}
                disabled={isSubmitted}
              />
            )}
            
            {feedback[index] && (
              <div className={`feedback ${feedback[index].correct ? 'feedback-correct' : feedback[index].modelAnswer ? 'model-answer' : 'feedback-incorrect'}`}>
                {feedback[index].message}
              </div>
            )}
          </div>
        ))}
        
        {!isSubmitted && (
          <button type="submit" className="quiz-submit-btn">
            Check Answers
          </button>
        )}
      </form>
      
      {isSubmitted && score && (
        <div className={`quiz-results ${scorePercentage >= 70 ? 'results-success' : 'results-warning'}`}>
          <h3>Quiz Complete!</h3>
          <p>You scored {score.correct} out of {score.total} ({scorePercentage.toFixed(0)}%).</p>
          {quiz.title === 'Prerequisite Knowledge Check' && scorePercentage < 70 && (
            <p className="warning-message">
              It looks like you might benefit from reviewing some programming fundamentals before proceeding. 
              Consider brushing up on variables, loops, and functions.
            </p>
          )}
        </div>
      )}
    </div>
  )
}

export default Quiz