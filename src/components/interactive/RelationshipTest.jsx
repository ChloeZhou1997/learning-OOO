import React, { useState } from 'react'
import './RelationshipTest.css'

const RelationshipTest = () => {
  const [currentScenario, setCurrentScenario] = useState(0)
  const [userAnswers, setUserAnswers] = useState({})
  const [showResults, setShowResults] = useState(false)

  const scenarios = [
    {
      id: 1,
      classA: 'nn.Conv2d',
      classB: 'nn.Module',
      framework: 'PyTorch',
      icon: '🔥',
      questions: [
        {
          question: 'Can you say "Conv2d IS A Module"?',
          correctAnswer: 'yes',
          explanation: 'Conv2d inherits from nn.Module in PyTorch'
        },
        {
          question: 'Can you say "Conv2d HAS A Module"?',
          correctAnswer: 'no',
          explanation: 'Conv2d doesn\'t contain a Module, it IS a Module'
        },
        {
          question: 'Does Conv2d have all the methods of Module (forward, parameters, etc.)?',
          correctAnswer: 'yes',
          explanation: 'Conv2d inherits forward(), parameters(), train(), eval() from Module'
        },
        {
          question: 'Can Conv2d be used anywhere Module is expected?',
          correctAnswer: 'yes',
          explanation: 'Liskov Substitution - Conv2d can replace Module in any context'
        }
      ],
      correctRelationship: 'inheritance',
      codeExample: `import torch.nn as nn

class Conv2d(nn.Module):  # Conv2d inherits from Module
    def __init__(self, in_channels, out_channels, kernel_size):
        super().__init__()  # Call Module's constructor
        self.weight = nn.Parameter(torch.randn(out_channels, in_channels, *kernel_size))
        self.bias = nn.Parameter(torch.zeros(out_channels))
    
    def forward(self, x):  # Override Module's abstract method
        return F.conv2d(x, self.weight, self.bias)

# Usage: Conv2d IS-A Module
model = nn.Sequential(
    nn.Conv2d(3, 64, 3),  # Conv2d used as Module
    nn.ReLU(),
    nn.Conv2d(64, 128, 3)
)`
    },
    {
      id: 2,
      classA: 'Sequential',
      classB: 'Module[]',
      framework: 'PyTorch',
      icon: '🔗',
      questions: [
        {
          question: 'Can you say "Sequential IS A list of Modules"?',
          correctAnswer: 'no',
          explanation: 'Sequential is not a list, it\'s a Module that contains other Modules'
        },
        {
          question: 'Can you say "Sequential HAS Modules"?',
          correctAnswer: 'yes',
          explanation: 'Sequential contains and manages a collection of Modules'
        },
        {
          question: 'Can the contained Modules exist independently?',
          correctAnswer: 'yes',
          explanation: 'Modules can be created separately and added to Sequential'
        },
        {
          question: 'If Sequential is deleted, are the Modules necessarily destroyed?',
          correctAnswer: 'depends',
          explanation: 'Depends if other references exist to those Module objects'
        }
      ],
      correctRelationship: 'composition',
      codeExample: `import torch.nn as nn

class Sequential(nn.Module):
    def __init__(self, *modules):
        super().__init__()
        # Sequential HAS modules (composition)
        self._modules = nn.ModuleDict()
        for idx, module in enumerate(modules):
            self._modules[str(idx)] = module
    
    def forward(self, x):
        # Delegate to contained modules
        for module in self._modules.values():
            x = module(x)
        return x

# Usage: Sequential HAS-A collection of Modules
model = nn.Sequential(
    nn.Linear(784, 128),    # These modules are contained
    nn.ReLU(),              # within Sequential
    nn.Linear(128, 10)
)`
    },
    {
      id: 3,
      classA: 'ChatOpenAI',
      classB: 'BaseLLM',
      framework: 'LangChain',
      icon: '🦜',
      questions: [
        {
          question: 'Can you say "ChatOpenAI IS A BaseLLM"?',
          correctAnswer: 'yes',
          explanation: 'ChatOpenAI inherits from BaseLLM abstract class'
        },
        {
          question: 'Can you say "ChatOpenAI HAS A BaseLLM"?',
          correctAnswer: 'no',
          explanation: 'ChatOpenAI doesn\'t contain a BaseLLM, it specializes it'
        },
        {
          question: 'Must ChatOpenAI implement all abstract methods of BaseLLM?',
          correctAnswer: 'yes',
          explanation: 'Must implement _generate(), _llm_type, and other abstract methods'
        },
        {
          question: 'Can ChatOpenAI be passed to functions expecting BaseLLM?',
          correctAnswer: 'yes',
          explanation: 'Polymorphism - ChatOpenAI can be used wherever BaseLLM is expected'
        }
      ],
      correctRelationship: 'inheritance',
      codeExample: `from langchain.llms.base import BaseLLM
from langchain.schema import LLMResult

class ChatOpenAI(BaseLLM):  # ChatOpenAI IS-A BaseLLM
    """OpenAI Chat model implementation."""
    
    model_name: str = "gpt-3.5-turbo"
    temperature: float = 0.7
    openai_api_key: str
    
    @property
    def _llm_type(self) -> str:
        """Return type of LLM."""
        return "openai-chat"
    
    def _generate(
        self,
        prompts: List[str],
        stop: Optional[List[str]] = None,
        **kwargs
    ) -> LLMResult:
        """Call OpenAI API to generate completions."""
        # Implementation specific to OpenAI
        messages = [{"role": "user", "content": prompt} for prompt in prompts]
        response = openai.ChatCompletion.create(
            model=self.model_name,
            messages=messages,
            temperature=self.temperature
        )
        return self._create_llm_result(response)`
    },
    {
      id: 4,
      classA: 'LLMChain',
      classB: 'PromptTemplate',
      framework: 'LangChain',
      icon: '⛓️',
      questions: [
        {
          question: 'Can you say "LLMChain IS A PromptTemplate"?',
          correctAnswer: 'no',
          explanation: 'LLMChain is not a type of PromptTemplate'
        },
        {
          question: 'Can you say "LLMChain HAS A PromptTemplate"?',
          correctAnswer: 'yes',
          explanation: 'LLMChain contains a PromptTemplate to format inputs'
        },
        {
          question: 'Can PromptTemplate exist without LLMChain?',
          correctAnswer: 'yes',
          explanation: 'PromptTemplates are independent and reusable components'
        },
        {
          question: 'Can you swap the PromptTemplate at runtime?',
          correctAnswer: 'yes',
          explanation: 'Different prompts can be used with the same chain'
        }
      ],
      correctRelationship: 'composition',
      codeExample: `from langchain import LLMChain, PromptTemplate
from langchain.llms import OpenAI

class LLMChain(Chain):
    """Chain to run queries against LLMs."""
    
    # LLMChain HAS-A PromptTemplate (composition)
    prompt: PromptTemplate
    llm: BaseLLM
    
    def __init__(self, llm: BaseLLM, prompt: PromptTemplate):
        self.llm = llm
        self.prompt = prompt  # Composed, not inherited
    
    def run(self, **kwargs) -> str:
        # Use the composed prompt to format input
        prompt_text = self.prompt.format(**kwargs)
        # Then pass to LLM
        return self.llm(prompt_text)

# Usage: Composition allows flexibility
template = PromptTemplate(
    input_variables=["product"],
    template="What is a good name for a company that makes {product}?"
)

chain = LLMChain(
    llm=OpenAI(),
    prompt=template  # Injected dependency
)`
    },
    {
      id: 5,
      classA: 'DenseLayer',
      classB: 'tf.keras.Layer',
      framework: 'TensorFlow',
      icon: '🧠',
      questions: [
        {
          question: 'Can you say "Dense IS A Layer"?',
          correctAnswer: 'yes',
          explanation: 'Dense inherits from tf.keras.layers.Layer base class'
        },
        {
          question: 'Can you say "Dense HAS A Layer"?',
          correctAnswer: 'no',
          explanation: 'Dense extends Layer functionality, doesn\'t contain it'
        },
        {
          question: 'Must Dense implement build() and call() methods?',
          correctAnswer: 'yes',
          explanation: 'These are abstract methods that all Layers must implement'
        },
        {
          question: 'Can Dense layers be used in any Keras Model?',
          correctAnswer: 'yes',
          explanation: 'All Layer subclasses are compatible with Keras APIs'
        }
      ],
      correctRelationship: 'inheritance',
      codeExample: `import tensorflow as tf

class Dense(tf.keras.layers.Layer):  # Dense IS-A Layer
    """Densely-connected NN layer."""
    
    def __init__(self, units, activation=None, **kwargs):
        super().__init__(**kwargs)  # Initialize Layer
        self.units = units
        self.activation = tf.keras.activations.get(activation)
    
    def build(self, input_shape):
        # Required Layer method - creates weights
        self.kernel = self.add_weight(
            name='kernel',
            shape=(input_shape[-1], self.units),
            initializer='glorot_uniform'
        )
        self.bias = self.add_weight(
            name='bias',
            shape=(self.units,),
            initializer='zeros'
        )
        super().build(input_shape)
    
    def call(self, inputs):
        # Required Layer method - forward pass
        output = tf.matmul(inputs, self.kernel) + self.bias
        return self.activation(output) if self.activation else output`
    },
    {
      id: 6,
      classA: 'GraphState',
      classB: 'MessageList',
      framework: 'LangGraph',
      icon: '🕸️',
      questions: [
        {
          question: 'Can you say "GraphState IS A MessageList"?',
          correctAnswer: 'no',
          explanation: 'GraphState is not a type of MessageList'
        },
        {
          question: 'Can you say "GraphState HAS MessageList"?',
          correctAnswer: 'yes',
          explanation: 'GraphState contains messages as part of its state'
        },
        {
          question: 'Can MessageList exist outside of GraphState?',
          correctAnswer: 'yes',
          explanation: 'Messages can be created and managed independently'
        },
        {
          question: 'Is the relationship defined by state management needs?',
          correctAnswer: 'yes',
          explanation: 'GraphState aggregates various state components including messages'
        }
      ],
      correctRelationship: 'composition',
      codeExample: `from langgraph.graph import StateGraph, State
from typing import TypedDict, Annotated, Sequence
from langchain_core.messages import BaseMessage
import operator

class GraphState(TypedDict):
    """State container for graph execution."""
    # GraphState HAS messages (composition)
    messages: Annotated[Sequence[BaseMessage], operator.add]
    next_step: str
    context: dict
    
    # GraphState can contain other state components
    intermediate_results: list
    final_answer: str

# Building a graph with state management
workflow = StateGraph(GraphState)

def process_input(state: GraphState) -> GraphState:
    # Access composed message list
    messages = state["messages"]
    # Add new message
    messages.append(HumanMessage(content="Process this"))
    return {"messages": messages}

workflow.add_node("process", process_input)

# The graph manages state transitions
# Messages are part of state, not inheritance`
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
        <h3>Framework Relationship Analysis</h3>
        <p>Understand inheritance vs composition in real ML/AI frameworks</p>
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
            <div className="scenario-btn-content">
              <span className="scenario-icon">{scenario.icon}</span>
              <span className="scenario-framework">{scenario.framework}</span>
              <span className="scenario-classes">{scenario.classA} & {scenario.classB}</span>
            </div>
          </button>
        ))}
      </div>

      <div className="test-content">
        <div className="scenario-display">
          <div className="framework-badge">{scenarios[currentScenario].framework}</div>
          <div className="class-pair">
            <div className="class-box primary">{scenarios[currentScenario].classA}</div>
            <div className="relationship-arrow">?</div>
            <div className="class-box secondary">{scenarios[currentScenario].classB}</div>
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
            Check My Analysis
          </button>
        )}

        {showResults && (
          <div className="results-section">
            <div className="recommendation">
              <h3>Analysis Result: {getRecommendation() === scenarios[currentScenario].correctRelationship ? '✅' : '⚠️'} {getRecommendation().toUpperCase()}</h3>
              <p>
                The correct relationship is: <strong>{scenarios[currentScenario].correctRelationship}</strong>
              </p>
            </div>
            
            <div className="code-example">
              <h4>Framework Implementation:</h4>
              <pre>
                <code>{scenarios[currentScenario].codeExample}</code>
              </pre>
            </div>
          </div>
        )}
      </div>

      <div className="framework-patterns">
        <h4>Common Framework Patterns:</h4>
        <div className="pattern-grid">
          <div className="pattern">
            <h5>🔥 PyTorch</h5>
            <p><strong>Inheritance:</strong> All layers inherit from nn.Module</p>
            <p><strong>Composition:</strong> Models contain layers and parameters</p>
          </div>
          <div className="pattern">
            <h5>🧠 TensorFlow</h5>
            <p><strong>Inheritance:</strong> Custom layers extend tf.keras.Layer</p>
            <p><strong>Composition:</strong> Models compose layers in Sequential/Functional APIs</p>
          </div>
          <div className="pattern">
            <h5>🦜 LangChain</h5>
            <p><strong>Inheritance:</strong> LLMs inherit from BaseLLM</p>
            <p><strong>Composition:</strong> Chains compose prompts, LLMs, and tools</p>
          </div>
          <div className="pattern">
            <h5>🕸️ LangGraph</h5>
            <p><strong>Inheritance:</strong> Custom nodes can extend base node types</p>
            <p><strong>Composition:</strong> Graphs compose nodes, edges, and state</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RelationshipTest