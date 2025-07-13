import React, { useState } from 'react'
import './RelationshipTest.css'

const RelationshipTest = () => {
  const [currentScenario, setCurrentScenario] = useState(0)
  const [userAnswers, setUserAnswers] = useState({})
  const [showResults, setShowResults] = useState(false)

  const scenarios = [
    {
      id: 1,
      classA: 'Car',
      classB: 'Engine',
      icon: '🚗',
      questions: [
        {
          question: 'Can you say "A Car IS AN Engine"?',
          correctAnswer: 'no',
          explanation: 'A Car is not a type of Engine'
        },
        {
          question: 'Can you say "A Car HAS AN Engine"?',
          correctAnswer: 'yes',
          explanation: 'A Car contains an Engine as a component'
        },
        {
          question: 'Can a Car exist without an Engine?',
          correctAnswer: 'depends',
          explanation: 'Electric cars don\'t have traditional engines, but typically cars need some form of engine'
        },
        {
          question: 'Should you be able to swap the Engine at runtime?',
          correctAnswer: 'yes',
          explanation: 'Engines can be replaced, suggesting composition'
        }
      ],
      correctRelationship: 'composition',
      codeExample: `class Car {
  private engine: Engine;
  
  constructor(engine: Engine) {
    this.engine = engine;
  }
  
  start() {
    this.engine.ignite();
  }
}`
    },
    {
      id: 2,
      classA: 'Dog',
      classB: 'Animal',
      icon: '🐕',
      questions: [
        {
          question: 'Can you say "A Dog IS AN Animal"?',
          correctAnswer: 'yes',
          explanation: 'A Dog is a specific type of Animal'
        },
        {
          question: 'Can you say "A Dog HAS AN Animal"?',
          correctAnswer: 'no',
          explanation: 'This doesn\'t make logical sense'
        },
        {
          question: 'Does a Dog have all the characteristics of an Animal?',
          correctAnswer: 'yes',
          explanation: 'Dogs inherit all animal characteristics'
        },
        {
          question: 'Is the relationship permanent and unchangeable?',
          correctAnswer: 'yes',
          explanation: 'A Dog will always be an Animal'
        }
      ],
      correctRelationship: 'inheritance',
      codeExample: `class Animal {
  breathe() {
    console.log("Breathing...");
  }
}

class Dog extends Animal {
  bark() {
    console.log("Woof!");
  }
}`
    },
    {
      id: 3,
      classA: 'House',
      classB: 'Room',
      icon: '🏠',
      questions: [
        {
          question: 'Can you say "A House IS A Room"?',
          correctAnswer: 'no',
          explanation: 'A House is not a type of Room'
        },
        {
          question: 'Can you say "A House HAS Rooms"?',
          correctAnswer: 'yes',
          explanation: 'A House contains multiple Rooms'
        },
        {
          question: 'Can a Room exist independently of a House?',
          correctAnswer: 'no',
          explanation: 'Rooms are part of a building structure'
        },
        {
          question: 'If the House is destroyed, are the Rooms destroyed?',
          correctAnswer: 'yes',
          explanation: 'Rooms cannot exist without the House'
        }
      ],
      correctRelationship: 'composition',
      codeExample: `class House {
  private rooms: Room[] = [];
  
  constructor(numRooms: number) {
    for (let i = 0; i < numRooms; i++) {
      this.rooms.push(new Room());
    }
  }
  
  // Rooms are created and destroyed with the House
}`
    }
  ]

  const handleAnswer = (questionIndex, answer) => {
    const key = `${currentScenario}-${questionIndex}`
    setUserAnswers({ ...userAnswers, [key]: answer })
  }

  const checkAnswer = (questionIndex) => {
    const scenario = scenarios[currentScenario]
    const question = scenario.questions[questionIndex]
    const key = `${currentScenario}-${questionIndex}`
    return userAnswers[key] === question.correctAnswer
  }

  const getRecommendation = () => {
    const scenario = scenarios[currentScenario]
    let inheritanceScore = 0
    let compositionScore = 0

    scenario.questions.forEach((q, i) => {
      const key = `${currentScenario}-${i}`
      const answer = userAnswers[key]
      
      if (i === 0 && answer === 'yes') inheritanceScore += 2
      if (i === 1 && answer === 'yes') compositionScore += 2
      if (i === 2 && answer === 'yes' && scenario.correctRelationship === 'inheritance') inheritanceScore++
      if (i === 3 && answer === 'yes' && scenario.correctRelationship === 'composition') compositionScore++
    })

    return inheritanceScore > compositionScore ? 'inheritance' : 'composition'
  }

  const allQuestionsAnswered = () => {
    const scenario = scenarios[currentScenario]
    return scenario.questions.every((_, i) => {
      const key = `${currentScenario}-${i}`
      return userAnswers[key] !== undefined
    })
  }

  return (
    <div className="relationship-test-container">
      <div className="test-header">
        <h3>Relationship Litmus Test</h3>
        <p>Answer these questions to determine the correct relationship type</p>
      </div>

      <div className="scenario-selector">
        {scenarios.map((scenario, index) => (
          <button
            key={scenario.id}
            className={`scenario-btn ${currentScenario === index ? 'active' : ''}`}
            onClick={() => {
              setCurrentScenario(index)
              setShowResults(false)
            }}
          >
            {scenario.icon} {scenario.classA} & {scenario.classB}
          </button>
        ))}
      </div>

      <div className="test-content">
        <div className="scenario-display">
          <div className="class-pair">
            <div className="class-box">{scenarios[currentScenario].classA}</div>
            <div className="relationship-arrow">?</div>
            <div className="class-box">{scenarios[currentScenario].classB}</div>
          </div>
        </div>

        <div className="questions-section">
          {scenarios[currentScenario].questions.map((question, index) => {
            const key = `${currentScenario}-${index}`
            const answered = userAnswers[key] !== undefined
            const isCorrect = answered && checkAnswer(index)
            
            return (
              <div key={index} className="question-block">
                <h4>{question.question}</h4>
                <div className="answer-options">
                  <button
                    className={`answer-btn ${userAnswers[key] === 'yes' ? 'selected' : ''} ${
                      showResults && userAnswers[key] === 'yes' && !isCorrect ? 'incorrect' : ''
                    }`}
                    onClick={() => handleAnswer(index, 'yes')}
                  >
                    Yes
                  </button>
                  <button
                    className={`answer-btn ${userAnswers[key] === 'no' ? 'selected' : ''} ${
                      showResults && userAnswers[key] === 'no' && !isCorrect ? 'incorrect' : ''
                    }`}
                    onClick={() => handleAnswer(index, 'no')}
                  >
                    No
                  </button>
                  {question.correctAnswer === 'depends' && (
                    <button
                      className={`answer-btn ${userAnswers[key] === 'depends' ? 'selected' : ''}`}
                      onClick={() => handleAnswer(index, 'depends')}
                    >
                      It Depends
                    </button>
                  )}
                </div>
                {showResults && answered && (
                  <div className={`explanation ${isCorrect ? 'correct' : 'incorrect'}`}>
                    {isCorrect ? '✅' : '❌'} {question.explanation}
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {allQuestionsAnswered() && !showResults && (
          <button className="check-answers-btn" onClick={() => setShowResults(true)}>
            Check My Answers
          </button>
        )}

        {showResults && (
          <div className="results-section">
            <div className="recommendation">
              <h3>Recommendation: Use {getRecommendation() === scenarios[currentScenario].correctRelationship ? '✅' : '⚠️'} {getRecommendation().toUpperCase()}</h3>
              <p>
                The correct relationship is: <strong>{scenarios[currentScenario].correctRelationship}</strong>
              </p>
            </div>
            
            <div className="code-example">
              <h4>Implementation Example:</h4>
              <pre>
                <code>{scenarios[currentScenario].codeExample}</code>
              </pre>
            </div>
          </div>
        )}
      </div>

      <div className="tips-section">
        <h4>Quick Tips:</h4>
        <ul>
          <li><strong>IS-A Test:</strong> If X IS-A Y makes sense, consider inheritance</li>
          <li><strong>HAS-A Test:</strong> If X HAS-A Y makes sense, consider composition</li>
          <li><strong>Lifetime:</strong> If components have independent lifetimes, use aggregation</li>
          <li><strong>Flexibility:</strong> Composition is generally more flexible than inheritance</li>
        </ul>
      </div>
    </div>
  )
}

export default RelationshipTest