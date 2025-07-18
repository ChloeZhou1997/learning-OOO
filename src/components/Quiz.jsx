import React, { useState } from 'react'
import { useProgress } from '../hooks/useProgress'

/**
 * Quiz Component
 * 
 * Renders an interactive quiz with multiple question types and tracks user progress.
 * Supports MCQ, fill-in-the-blank, deeper thinking, and coding challenge questions.
 * 
 * @component
 * @param {Object} props - Component props
 * @param {Object} props.quiz - Quiz configuration object
 * @param {string} props.quiz.title - Title of the quiz
 * @param {Array} props.quiz.questions - Array of question objects
 * @param {string} props.chapterId - ID of the chapter this quiz belongs to
 * 
 * @example
 * const quiz = {
 *   title: 'Chapter 1 Quiz',
 *   questions: [
 *     { type: 'mcq', question: 'What is OOP?', options: [...], answerIndex: 0 }
 *   ]
 * }
 * return <Quiz quiz={quiz} chapterId="chapter-1" />
 */
const Quiz = ({ quiz, chapterId }) => {
  const [answers, setAnswers] = useState({})
  const [feedback, setFeedback] = useState({})
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [score, setScore] = useState(null)
  const [attemptCount, setAttemptCount] = useState(0)
  const { updateQuizScore, getQuizProgress } = useProgress()
  
  // Get previous quiz attempts
  const previousProgress = getQuizProgress(chapterId, quiz.title || 'quiz')

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
          newFeedback[index] = { 
            correct: true, 
            message: 'Correct!',
            explanation: q.explanation || getDefaultExplanation(q, true)
          }
        } else {
          newFeedback[index] = { 
            correct: false, 
            message: `Incorrect. The correct answer is: ${q.options[q.answerIndex]}`,
            explanation: q.explanation || getDefaultExplanation(q, false),
            userAnswer: selectedAnswer !== undefined ? q.options[selectedAnswer] : 'No answer selected'
          }
        }
      } else if (q.type === 'fill-in') {
        if (answers[index]?.trim().toLowerCase() === q.answer.toLowerCase()) {
          newScore++
          newFeedback[index] = { 
            correct: true, 
            message: 'Correct!',
            explanation: q.explanation || getDefaultExplanation(q, true)
          }
        } else {
          newFeedback[index] = { 
            correct: false, 
            message: `Incorrect. The correct answer is: ${q.answer}`,
            explanation: q.explanation || getDefaultExplanation(q, false),
            userAnswer: answers[index] || 'No answer provided'
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
    setAttemptCount(attemptCount + 1)
    
    // Track quiz score if chapterId is provided
    if (chapterId && total > 0) {
      updateQuizScore(chapterId, quiz.title || 'quiz', newScore, total)
    }
  }

  const scorePercentage = score ? (score.total > 0 ? (score.correct / score.total) * 100 : 100) : 0

  /**
   * Generates default explanations for quiz answers when custom explanations aren't provided
   * @param {Object} question - The question object
   * @param {boolean} isCorrect - Whether the user's answer was correct
   * @returns {string} A contextual explanation for the answer
   */
  const getDefaultExplanation = (question, isCorrect) => {
    if (question.type === 'mcq') {
      if (isCorrect) {
        return `Great job! ${question.options[question.answerIndex]} is indeed the correct answer because it accurately describes the concept being tested.`
      } else {
        return `The correct answer is ${question.options[question.answerIndex]}. Understanding why this is correct will help reinforce this concept. Consider reviewing the relevant section in the chapter.`
      }
    } else if (question.type === 'fill-in') {
      if (isCorrect) {
        return `Excellent! "${question.answer}" is the correct term for this concept.`
      } else {
        return `The correct answer is "${question.answer}". This term is important because it represents a key concept in object-oriented programming. Review the chapter section where this term is introduced.`
      }
    }
    return ''
  }
  
  /**
   * Resets the quiz state to allow the user to retry
   * Clears all answers, feedback, and scores
   */
  const handleRetry = () => {
    setAnswers({})
    setFeedback({})
    setIsSubmitted(false)
    setScore(null)
  }

  return (
    <div className="quiz">
      <div className="quiz-header">
        <h3 className="quiz-title">{quiz.title}</h3>
        {previousProgress && (
          <div className="quiz-stats">
            <span className="stat-item">Attempts: {previousProgress.attempts}</span>
            <span className="stat-item">Best Score: {Math.round((previousProgress.bestScore / previousProgress.totalQuestions) * 100)}%</span>
          </div>
        )}
      </div>
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
                <div className="feedback-message">{feedback[index].message}</div>
                {feedback[index].userAnswer && !feedback[index].correct && (
                  <div className="user-answer">Your answer: {feedback[index].userAnswer}</div>
                )}
                {feedback[index].explanation && (
                  <div className="feedback-explanation">
                    <strong>Explanation:</strong> {feedback[index].explanation}
                  </div>
                )}
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
          {scorePercentage < 100 && (
            <button 
              type="button" 
              onClick={handleRetry}
              className="quiz-retry-btn"
            >
              Try Again
            </button>
          )}
        </div>
      )}
    </div>
  )
}

export default Quiz