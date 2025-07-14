import React, { useState } from 'react'
import './DataTransformer.css'

const DataTransformer = () => {
  const [activeFramework, setActiveFramework] = useState('jackson')
  const [transformStep, setTransformStep] = useState('object')
  const [showMapping, setShowMapping] = useState(false)

  const frameworks = {
    jackson: {
      name: 'Jackson (Java)',
      object: {
        name: 'Spring REST Response',
        code: `@RestController
public class UserController {
  @GetMapping("/api/user/{id}")
  public ResponseEntity<User> getUser(@PathVariable Long id) {
    User user = new User();
    user.setId(id);
    user.setUsername("john_doe");
    user.setEmail("john@example.com");
    user.setRoles(Arrays.asList("USER", "PREMIUM"));
    user.setProfile(new Profile("John", "Doe", 
      LocalDate.of(1990, 5, 15)));
    user.setLastLogin(ZonedDateTime.now());
    
    return ResponseEntity.ok(user);
  }
}`,
        data: {
          id: 12345,
          username: 'john_doe',
          email: 'john@example.com',
          roles: ['USER', 'PREMIUM'],
          profile: {
            firstName: 'John',
            lastName: 'Doe',
            birthDate: '1990-05-15'
          },
          lastLogin: '2024-01-15T10:30:00Z',
          accountStatus: 'ACTIVE'
        },
        annotations: `@JsonInclude(JsonInclude.Include.NON_NULL)
@JsonPropertyOrder({"id", "username", "email"})
public class User {
  @JsonProperty("user_id")
  private Long id;
  
  @JsonIgnore
  private String password;
  
  @JsonFormat(shape = JsonFormat.Shape.STRING, 
              pattern = "yyyy-MM-dd'T'HH:mm:ss'Z'")
  private ZonedDateTime lastLogin;
  
  @JsonSerialize(using = RoleSerializer.class)
  private List<String> roles;
}`
      }
    },
    gson: {
      name: 'Gson (Android/Java)',
      object: {
        name: 'Android API Response',
        code: `// Retrofit API Service
interface ApiService {
  @GET("weather/current")
  suspend fun getWeather(@Query("city") city: String): WeatherResponse
}

// In ViewModel
class WeatherViewModel : ViewModel() {
  fun fetchWeather(city: String) {
    viewModelScope.launch {
      val response = apiService.getWeather(city)
      // Gson automatically deserializes JSON to WeatherResponse
      updateUI(response)
    }
  }
}`,
        data: {
          location: {
            city: 'San Francisco',
            country: 'US',
            coordinates: {
              lat: 37.7749,
              lon: -122.4194
            }
          },
          current: {
            temperature: 18.5,
            feelsLike: 17.2,
            humidity: 65,
            windSpeed: 15.5
          },
          forecast: [
            { day: 'Monday', high: 20, low: 14 },
            { day: 'Tuesday', high: 22, low: 15 }
          ],
          timestamp: 1705316400000
        },
        annotations: `// Gson configuration
val gson = GsonBuilder()
  .setFieldNamingPolicy(FieldNamingPolicy.LOWER_CASE_WITH_UNDERSCORES)
  .registerTypeAdapter(Date::class.java, DateDeserializer())
  .excludeFieldsWithModifiers(Modifier.TRANSIENT)
  .serializeNulls()
  .create()

data class WeatherResponse(
  @SerializedName("location_data")
  val location: Location,
  
  @Expose
  val current: CurrentWeather,
  
  @SerializedName("daily_forecast")
  val forecast: List<DayForecast>,
  
  @Expose(serialize = false)
  val timestamp: Long
)`
      }
    },
    fastapi: {
      name: 'FastAPI/Pydantic (Python)',
      object: {
        name: 'ML Model API Response',
        code: `from fastapi import FastAPI
from pydantic import BaseModel
from typing import List, Dict
import numpy as np

app = FastAPI()

class PredictionResponse(BaseModel):
    model_name: str
    model_version: str
    predictions: List[float]
    confidence_scores: Dict[str, float]
    metadata: ModelMetadata
    processed_at: datetime

@app.post("/predict", response_model=PredictionResponse)
async def predict(input_data: InputData):
    # Run ML model inference
    predictions = model.predict(input_data.features)
    
    return PredictionResponse(
        model_name="sentiment-analyzer",
        model_version="2.1.0",
        predictions=predictions.tolist(),
        confidence_scores={
            "positive": 0.85,
            "negative": 0.10,
            "neutral": 0.05
        },
        metadata=ModelMetadata(...),
        processed_at=datetime.now()
    )`,
        data: {
          model_name: 'sentiment-analyzer',
          model_version: '2.1.0',
          predictions: [0.85, 0.10, 0.05],
          confidence_scores: {
            positive: 0.85,
            negative: 0.10,
            neutral: 0.05
          },
          metadata: {
            preprocessing_time_ms: 23,
            inference_time_ms: 157,
            postprocessing_time_ms: 12
          },
          processed_at: '2024-01-15T10:30:45.123Z'
        },
        annotations: `class ModelMetadata(BaseModel):
    preprocessing_time_ms: int
    inference_time_ms: int
    postprocessing_time_ms: int

class PredictionResponse(BaseModel):
    model_name: str = Field(..., description="Name of the ML model")
    model_version: str = Field(..., regex="^\\d+\\.\\d+\\.\\d+$")
    predictions: List[float] = Field(..., min_items=1)
    confidence_scores: Dict[str, float] = Field(...)
    metadata: ModelMetadata
    processed_at: datetime
    
    class Config:
        # Pydantic configuration
        json_encoders = {
            datetime: lambda v: v.strftime("%Y-%m-%dT%H:%M:%S.%fZ"),
            np.ndarray: lambda v: v.tolist()
        }
        schema_extra = {
            "example": {
                "model_name": "sentiment-analyzer",
                "model_version": "2.1.0",
                "predictions": [0.85, 0.10, 0.05]
            }
        }`
      }
    }
  }

  const getJsonRepresentation = (obj) => {
    return JSON.stringify(obj, null, 2)
  }

  const getSerializationSteps = () => {
    switch(transformStep) {
      case 'object':
        return {
          title: 'Step 1: Object in Memory',
          description: 'The object exists in application memory with typed properties',
          visual: 'object'
        }
      case 'serialize':
        return {
          title: 'Step 2: Serialization with Annotations',
          description: 'Framework applies serialization rules based on annotations/configuration',
          visual: 'transforming'
        }
      case 'json':
        return {
          title: 'Step 3: JSON Output',
          description: 'The serialized JSON ready for API response or storage',
          visual: 'json'
        }
      default:
        return {}
    }
  }

  const renderObjectVisual = () => {
    const currentFramework = frameworks[activeFramework]
    const step = getSerializationSteps()

    if (step.visual === 'object') {
      return (
        <div className="object-representation">
          <div className="object-header">
            <span className="object-type">{currentFramework.object.name}</span>
            <span className="framework-badge">{currentFramework.name}</span>
          </div>
          <div className="code-snippet">
            <pre><code>{currentFramework.object.code}</code></pre>
          </div>
        </div>
      )
    } else if (step.visual === 'transforming') {
      return (
        <div className="transformation-visual">
          <div className="annotations-panel">
            <h4>Serialization Annotations</h4>
            <pre><code>{currentFramework.object.annotations}</code></pre>
          </div>
          <div className="transform-arrows">
            <div className="arrow-container">
              <span className="transform-label">@JsonProperty</span>
              <span className="arrow">→</span>
              <span className="transform-result">Custom field names</span>
            </div>
            <div className="arrow-container">
              <span className="transform-label">@JsonIgnore</span>
              <span className="arrow">→</span>
              <span className="transform-result">Exclude sensitive data</span>
            </div>
            <div className="arrow-container">
              <span className="transform-label">@JsonFormat</span>
              <span className="arrow">→</span>
              <span className="transform-result">Date/time formatting</span>
            </div>
          </div>
        </div>
      )
    } else {
      return (
        <div className="json-representation">
          <div className="json-header">
            <span className="json-label">Serialized JSON Response</span>
            <div className="json-actions">
              <button className="copy-btn" onClick={() => {
                navigator.clipboard.writeText(getJsonRepresentation(currentFramework.object.data))
              }}>
                📋 Copy
              </button>
              <span className="content-type">Content-Type: application/json</span>
            </div>
          </div>
          <pre className="json-content">
            <code>{getJsonRepresentation(currentFramework.object.data)}</code>
          </pre>
        </div>
      )
    }
  }

  const runFullTransformation = () => {
    setTransformStep('object')
    setShowMapping(false)
    
    setTimeout(() => {
      setTransformStep('serialize')
      setShowMapping(true)
    }, 1000)
    
    setTimeout(() => {
      setTransformStep('json')
    }, 2500)
  }

  return (
    <div className="data-transformer-container">
      <div className="transformer-header">
        <h3>Production JSON Serialization Frameworks</h3>
        <p>How enterprise frameworks serialize objects to JSON for APIs and storage</p>
      </div>

      <div className="framework-selector">
        {Object.entries(frameworks).map(([key, framework]) => (
          <button
            key={key}
            className={`framework-btn ${activeFramework === key ? 'active' : ''}`}
            onClick={() => {
              setActiveFramework(key)
              setTransformStep('object')
              setShowMapping(false)
            }}
          >
            {framework.name}
          </button>
        ))}
      </div>

      <div className="transformation-area">
        <div className="step-indicator">
          <div className={`step ${transformStep === 'object' ? 'active' : ''}`}>
            <span className="step-number">1</span>
            <span className="step-label">Object</span>
          </div>
          <div className="step-line"></div>
          <div className={`step ${transformStep === 'serialize' ? 'active' : ''}`}>
            <span className="step-number">2</span>
            <span className="step-label">Serialize</span>
          </div>
          <div className="step-line"></div>
          <div className={`step ${transformStep === 'json' ? 'active' : ''}`}>
            <span className="step-number">3</span>
            <span className="step-label">JSON</span>
          </div>
        </div>

        <div className="visual-area">
          <h4>{getSerializationSteps().title}</h4>
          <p>{getSerializationSteps().description}</p>
          {renderObjectVisual()}
        </div>

        <div className="controls">
          <button 
            className="control-btn"
            onClick={() => setTransformStep('object')}
            disabled={transformStep === 'object'}
          >
            ← Previous
          </button>
          <button 
            className="control-btn primary"
            onClick={runFullTransformation}
          >
            ▶ Run Full Transformation
          </button>
          <button 
            className="control-btn"
            onClick={() => {
              if (transformStep === 'object') {
                setTransformStep('serialize')
                setShowMapping(true)
              } else if (transformStep === 'serialize') {
                setTransformStep('json')
              }
            }}
            disabled={transformStep === 'json'}
          >
            Next →
          </button>
        </div>
      </div>

      {showMapping && transformStep === 'serialize' && (
        <div className="mapping-rules">
          <h4>Framework Features:</h4>
          <div className="features-grid">
            <div className="feature">
              <strong>🏷️ Annotations/Decorators</strong>
              <p>Control field names, visibility, and formatting</p>
            </div>
            <div className="feature">
              <strong>🔄 Type Adapters</strong>
              <p>Custom serialization for complex types</p>
            </div>
            <div className="feature">
              <strong>🛡️ Security</strong>
              <p>Exclude sensitive fields, prevent injection</p>
            </div>
            <div className="feature">
              <strong>⚡ Performance</strong>
              <p>Streaming, lazy loading, efficient parsing</p>
            </div>
          </div>
        </div>
      )}

      <div className="use-cases">
        <h4>Real-World Applications:</h4>
        <div className="use-case-grid">
          <div className="use-case">
            <span className="icon">🌐</span>
            <strong>REST APIs</strong>
            <p>Spring Boot, Django REST, FastAPI responses</p>
          </div>
          <div className="use-case">
            <span className="icon">📱</span>
            <strong>Mobile Apps</strong>
            <p>Android Retrofit, iOS Codable, React Native</p>
          </div>
          <div className="use-case">
            <span className="icon">🔧</span>
            <strong>Microservices</strong>
            <p>Service-to-service communication</p>
          </div>
          <div className="use-case">
            <span className="icon">📊</span>
            <strong>Data Pipelines</strong>
            <p>Kafka messages, event streaming</p>
          </div>
        </div>
      </div>

      <div className="framework-comparison">
        <h4>Framework Comparison:</h4>
        <table>
          <thead>
            <tr>
              <th>Feature</th>
              <th>Jackson</th>
              <th>Gson</th>
              <th>Pydantic</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Annotations</td>
              <td>@JsonProperty, @JsonIgnore</td>
              <td>@SerializedName, @Expose</td>
              <td>Field(), @validator</td>
            </tr>
            <tr>
              <td>Performance</td>
              <td>Very Fast (streaming)</td>
              <td>Fast (reflection)</td>
              <td>Fast (compiled)</td>
            </tr>
            <tr>
              <td>Type Safety</td>
              <td>Runtime + compile</td>
              <td>Runtime</td>
              <td>Runtime + type hints</td>
            </tr>
            <tr>
              <td>Use Cases</td>
              <td>Spring Boot, Kafka</td>
              <td>Android, simple APIs</td>
              <td>FastAPI, ML APIs</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default DataTransformer