import React, { useState } from 'react'
import './XMLDataTransformer.css'

const XMLDataTransformer = () => {
  const [selectedFramework, setSelectedFramework] = useState('jaxb')
  const [transformStep, setTransformStep] = useState('object')
  const [showMapping, setShowMapping] = useState(false)

  const frameworks = {
    jaxb: {
      name: 'JAXB (Java)',
      icon: '☕',
      object: {
        name: 'Spring Boot SOAP Response',
        code: `@XmlRootElement(name = "PurchaseOrder")
@XmlAccessorType(XmlAccessType.FIELD)
public class PurchaseOrder {
    @XmlAttribute
    private String orderId = "PO-2024-001234";
    
    @XmlElement(name = "orderDate")
    @XmlJavaTypeAdapter(DateAdapter.class)
    private LocalDate date = LocalDate.now();
    
    @XmlElement(required = true)
    private Customer customer;
    
    @XmlElementWrapper(name = "items")
    @XmlElement(name = "item")
    private List<OrderItem> orderItems;
    
    @XmlElement
    @XmlSchemaType(name = "decimal")
    private BigDecimal totalAmount;
    
    @XmlTransient
    private String internalNotes; // Won't be serialized
}`,
        data: {
          orderId: 'PO-2024-001234',
          orderDate: '2024-01-15',
          customer: {
            customerId: 'CUST-789456',
            companyName: 'TechCorp Solutions',
            vatNumber: 'DE123456789',
            address: {
              street: 'Innovation Drive 42',
              city: 'Munich',
              country: 'Germany',
              postalCode: '80331'
            }
          },
          items: [
            {
              productCode: 'SRV-CLOUD-01',
              description: 'Cloud Infrastructure Service',
              quantity: 12,
              unitPrice: 299.99,
              lineTotal: 3599.88
            },
            {
              productCode: 'SUP-PREMIUM-01',
              description: '24/7 Premium Support',
              quantity: 1,
              unitPrice: 1500.00,
              lineTotal: 1500.00
            }
          ],
          totalAmount: 5099.88,
          status: 'APPROVED'
        }
      }
    },
    elementtree: {
      name: 'Python ElementTree',
      icon: '🐍',
      object: {
        name: 'ML Pipeline Configuration',
        code: `import xml.etree.ElementTree as ET
from dataclasses import dataclass
from typing import List, Dict

@dataclass
class MLPipelineConfig:
    def to_xml(self):
        root = ET.Element('pipeline', 
                         {'version': '2.0', 'framework': 'tensorflow'})
        
        # Model configuration
        model = ET.SubElement(root, 'model')
        ET.SubElement(model, 'name').text = self.model_name
        ET.SubElement(model, 'version').text = self.model_version
        
        # Feature engineering steps
        features = ET.SubElement(root, 'features')
        for feature in self.feature_transforms:
            transform = ET.SubElement(features, 'transform',
                                    {'type': feature['type']})
            ET.SubElement(transform, 'input').text = feature['input']
            ET.SubElement(transform, 'output').text = feature['output']
        
        # Training configuration
        training = ET.SubElement(root, 'training')
        hyperparams = ET.SubElement(training, 'hyperparameters')
        for key, value in self.hyperparameters.items():
            ET.SubElement(hyperparams, key).text = str(value)
        
        return ET.tostring(root, encoding='unicode')`,
        data: {
          pipeline: {
            version: '2.0',
            framework: 'tensorflow',
            model: {
              name: 'sentiment-analyzer',
              version: '3.2.1',
              architecture: 'transformer-bert-base'
            },
            features: [
              {
                transform: {
                  type: 'tokenization',
                  input: 'raw_text',
                  output: 'token_ids',
                  maxLength: 512
                }
              },
              {
                transform: {
                  type: 'embedding',
                  input: 'token_ids',
                  output: 'embeddings',
                  dimensions: 768
                }
              }
            ],
            training: {
              hyperparameters: {
                learningRate: 0.00002,
                batchSize: 32,
                epochs: 10,
                warmupSteps: 1000,
                gradientClipping: 1.0
              },
              distributed: {
                strategy: 'MirroredStrategy',
                gpus: 4
              }
            }
          }
        }
      }
    },
    dotnet: {
      name: '.NET XmlSerializer',
      icon: '🔷',
      object: {
        name: 'Azure Service Bus Message',
        code: `[XmlRoot("ServiceBusMessage", Namespace = "http://schemas.microsoft.com/servicebus")]
public class ServiceBusMessage
{
    [XmlAttribute("MessageId")]
    public string Id { get; set; } = Guid.NewGuid().ToString();
    
    [XmlAttribute("Version")]
    public string Version { get; set; } = "1.0";
    
    [XmlElement("Header")]
    public MessageHeader Header { get; set; }
    
    [XmlArray("Properties")]
    [XmlArrayItem("Property")]
    public List<MessageProperty> CustomProperties { get; set; }
    
    [XmlElement("Body")]
    public MessageBody Body { get; set; }
    
    [XmlIgnore]
    public DateTime ProcessedTime { get; set; }
}

[Serializable]
public class MessageHeader
{
    [XmlElement(Order = 1)]
    public string CorrelationId { get; set; }
    
    [XmlElement(Order = 2)]
    public string ContentType { get; set; }
    
    [XmlElement(Order = 3, DataType = "dateTime")]
    public DateTime EnqueuedTimeUtc { get; set; }
}`,
        data: {
          serviceBusMessage: {
            messageId: 'msg-7f3a4b2c-8e9d-4a1b-b5c6-1234567890ab',
            version: '1.0',
            header: {
              correlationId: 'corr-123456',
              contentType: 'application/vnd.company.order+xml',
              enqueuedTimeUtc: '2024-01-15T10:30:45Z',
              timeToLive: 'PT24H',
              partitionKey: 'customer-789'
            },
            properties: [
              { key: 'OrderType', value: 'Premium' },
              { key: 'Region', value: 'EU-West' },
              { key: 'Priority', value: 'High' }
            ],
            body: {
              eventType: 'OrderProcessed',
              payload: {
                orderId: 'ORD-2024-5678',
                customerId: 'CUST-789',
                amount: 4999.99,
                currency: 'EUR'
              }
            }
          }
        }
      }
    }
  }

  const objectToXML = (obj, rootName = 'root', indent = 0) => {
    const spaces = '  '.repeat(indent)
    let xml = ''
    
    // Special handling for root elements with attributes
    if (indent === 0 && rootName === 'serviceBusMessage') {
      xml += `<?xml version="1.0" encoding="UTF-8"?>\n`
      xml += `<ServiceBusMessage xmlns="http://schemas.microsoft.com/servicebus" `
      xml += `MessageId="${obj.messageId}" Version="${obj.version}">\n`
    } else if (indent === 0 && rootName === 'pipeline') {
      xml += `<?xml version="1.0" encoding="UTF-8"?>\n`
      xml += `<pipeline version="${obj.version}" framework="${obj.framework}">\n`
    } else if (indent === 0) {
      xml += `<?xml version="1.0" encoding="UTF-8"?>\n`
      xml += `<PurchaseOrder orderId="${obj.orderId}">\n`
    } else {
      xml += `${spaces}<${rootName}>\n`
    }
    
    for (const [key, value] of Object.entries(obj)) {
      // Skip attributes already handled
      if ((key === 'messageId' || key === 'version' || key === 'orderId') && indent === 0) continue
      if ((key === 'framework') && rootName === 'pipeline') continue
      
      if (Array.isArray(value)) {
        if (key === 'items' || key === 'orderItems') {
          xml += `${spaces}  <items>\n`
          value.forEach((item) => {
            xml += objectToXML(item, 'item', indent + 2)
          })
          xml += `${spaces}  </items>\n`
        } else if (key === 'properties') {
          xml += `${spaces}  <Properties>\n`
          value.forEach((prop) => {
            xml += `${spaces}    <Property key="${prop.key}">${prop.value}</Property>\n`
          })
          xml += `${spaces}  </Properties>\n`
        } else if (key === 'features') {
          xml += `${spaces}  <features>\n`
          value.forEach((item) => {
            xml += objectToXML(item, 'transform', indent + 2)
          })
          xml += `${spaces}  </features>\n`
        }
      } else if (typeof value === 'object' && value !== null) {
        if (key === 'transform' && value.type) {
          xml += `${spaces}  <transform type="${value.type}">\n`
          Object.entries(value).forEach(([k, v]) => {
            if (k !== 'type') {
              xml += `${spaces}    <${k}>${v}</${k}>\n`
            }
          })
          xml += `${spaces}  </transform>\n`
        } else {
          xml += objectToXML(value, key, indent + 1)
        }
      } else {
        xml += `${spaces}  <${key}>${value}</${key}>\n`
      }
    }
    
    if (indent === 0 && rootName === 'serviceBusMessage') {
      xml += `</ServiceBusMessage>`
    } else if (indent === 0 && (rootName === 'pipeline' || rootName === 'root')) {
      xml += rootName === 'pipeline' ? `</pipeline>` : `</PurchaseOrder>`
    } else {
      xml += `${spaces}</${rootName}>\n`
    }
    
    return xml
  }

  const getTransformationStep = () => {
    switch(transformStep) {
      case 'object':
        return {
          title: 'Step 1: Annotated Object/Class',
          description: 'Objects with XML serialization annotations/attributes'
        }
      case 'mapping':
        return {
          title: 'Step 2: Framework Serialization',
          description: 'Framework applies mapping rules based on annotations'
        }
      case 'xml':
        return {
          title: 'Step 3: XML Output',
          description: 'Generated XML ready for SOAP, messaging, or configuration'
        }
      default:
        return {}
    }
  }

  const renderObjectView = () => {
    const current = frameworks[selectedFramework]
    return (
      <div className="object-display">
        <div className="object-header">
          <span className="object-icon">{current.icon}</span>
          <span className="object-name">{current.object.name}</span>
        </div>
        <pre className="object-content">
          <code>{current.object.code}</code>
        </pre>
      </div>
    )
  }

  const renderMappingView = () => {
    const framework = frameworks[selectedFramework]
    return (
      <div className="mapping-visualization">
        <div className="mapping-rules">
          <h4>{framework.name} Mapping Features:</h4>
          {selectedFramework === 'jaxb' && (
            <>
              <div className="rule">
                <span className="annotation">@XmlRootElement</span>
                <span className="arrow">→</span>
                <span className="result">Root XML element</span>
              </div>
              <div className="rule">
                <span className="annotation">@XmlAttribute</span>
                <span className="arrow">→</span>
                <span className="result">XML attributes</span>
              </div>
              <div className="rule">
                <span className="annotation">@XmlElementWrapper</span>
                <span className="arrow">→</span>
                <span className="result">Collection wrapper</span>
              </div>
              <div className="rule">
                <span className="annotation">@XmlTransient</span>
                <span className="arrow">→</span>
                <span className="result">Exclude from XML</span>
              </div>
            </>
          )}
          {selectedFramework === 'elementtree' && (
            <>
              <div className="rule">
                <span className="annotation">ET.Element()</span>
                <span className="arrow">→</span>
                <span className="result">Create elements</span>
              </div>
              <div className="rule">
                <span className="annotation">element.attrib</span>
                <span className="arrow">→</span>
                <span className="result">Set attributes</span>
              </div>
              <div className="rule">
                <span className="annotation">SubElement()</span>
                <span className="arrow">→</span>
                <span className="result">Nested elements</span>
              </div>
              <div className="rule">
                <span className="annotation">.text property</span>
                <span className="arrow">→</span>
                <span className="result">Element content</span>
              </div>
            </>
          )}
          {selectedFramework === 'dotnet' && (
            <>
              <div className="rule">
                <span className="annotation">[XmlRoot]</span>
                <span className="arrow">→</span>
                <span className="result">Root with namespace</span>
              </div>
              <div className="rule">
                <span className="annotation">[XmlArray]/[XmlArrayItem]</span>
                <span className="arrow">→</span>
                <span className="result">Collection mapping</span>
              </div>
              <div className="rule">
                <span className="annotation">[XmlElement(Order=)]</span>
                <span className="arrow">→</span>
                <span className="result">Element ordering</span>
              </div>
              <div className="rule">
                <span className="annotation">[XmlIgnore]</span>
                <span className="arrow">→</span>
                <span className="result">Skip serialization</span>
              </div>
            </>
          )}
        </div>
      </div>
    )
  }

  const renderXMLView = () => {
    const current = frameworks[selectedFramework]
    const rootName = selectedFramework === 'jaxb' ? 'root' : 
                     selectedFramework === 'elementtree' ? 'pipeline' : 
                     'serviceBusMessage'
    const xmlContent = objectToXML(current.object.data, rootName)
    
    return (
      <div className="xml-display">
        <div className="xml-header">
          <span>Generated XML</span>
          <button 
            className="copy-btn"
            onClick={() => navigator.clipboard.writeText(xmlContent)}
          >
            📋 Copy
          </button>
        </div>
        <pre className="xml-content">
          <code>{xmlContent}</code>
        </pre>
      </div>
    )
  }

  const runTransformation = () => {
    setTransformStep('object')
    setShowMapping(false)
    
    setTimeout(() => {
      setTransformStep('mapping')
      setShowMapping(true)
    }, 1000)
    
    setTimeout(() => {
      setTransformStep('xml')
    }, 2500)
  }

  return (
    <div className="xml-transformer-container">
      <div className="transformer-header">
        <h3>Enterprise XML Serialization</h3>
        <p>How production frameworks serialize objects to XML for SOAP, messaging, and configuration</p>
      </div>

      <div className="framework-selector">
        {Object.entries(frameworks).map(([key, framework]) => (
          <button
            key={key}
            className={`framework-select-btn ${selectedFramework === key ? 'active' : ''}`}
            onClick={() => {
              setSelectedFramework(key)
              setTransformStep('object')
              setShowMapping(false)
            }}
          >
            <span className="btn-icon">{framework.icon}</span>
            <span className="btn-label">{framework.name}</span>
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
          <div className={`step ${transformStep === 'mapping' ? 'active' : ''}`}>
            <span className="step-number">2</span>
            <span className="step-label">Serialize</span>
          </div>
          <div className="step-line"></div>
          <div className={`step ${transformStep === 'xml' ? 'active' : ''}`}>
            <span className="step-number">3</span>
            <span className="step-label">XML</span>
          </div>
        </div>

        <div className="visual-area">
          <h4>{getTransformationStep().title}</h4>
          <p>{getTransformationStep().description}</p>
          
          {transformStep === 'object' && renderObjectView()}
          {transformStep === 'mapping' && renderMappingView()}
          {transformStep === 'xml' && renderXMLView()}
        </div>

        <div className="controls">
          <button 
            className="control-btn"
            onClick={() => setTransformStep('object')}
            disabled={transformStep === 'object'}
          >
            ← Reset
          </button>
          <button 
            className="control-btn primary"
            onClick={runTransformation}
          >
            ▶ Run Transformation
          </button>
          <button 
            className="control-btn"
            onClick={() => {
              if (transformStep === 'object') {
                setTransformStep('mapping')
                setShowMapping(true)
              } else if (transformStep === 'mapping') {
                setTransformStep('xml')
              }
            }}
            disabled={transformStep === 'xml'}
          >
            Next →
          </button>
        </div>
      </div>

      <div className="xml-use-cases">
        <h4>Real-World XML Usage:</h4>
        <div className="use-case-grid">
          <div className="use-case">
            <span className="icon">🧼</span>
            <strong>SOAP Web Services</strong>
            <p>Enterprise B2B communication (SAP, Oracle)</p>
          </div>
          <div className="use-case">
            <span className="icon">📬</span>
            <strong>Message Queues</strong>
            <p>Azure Service Bus, IBM MQ, RabbitMQ</p>
          </div>
          <div className="use-case">
            <span className="icon">⚙️</span>
            <strong>Configuration</strong>
            <p>Spring XML config, Maven POM, .NET config</p>
          </div>
          <div className="use-case">
            <span className="icon">📊</span>
            <strong>Data Exchange</strong>
            <p>HL7 (healthcare), SWIFT (banking), EDI</p>
          </div>
        </div>
      </div>

      <div className="framework-comparison">
        <h4>XML Serialization Comparison:</h4>
        <table>
          <thead>
            <tr>
              <th>Feature</th>
              <th>JAXB</th>
              <th>ElementTree</th>
              <th>.NET XmlSerializer</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Approach</td>
              <td>Annotation-based</td>
              <td>Programmatic</td>
              <td>Attribute-based</td>
            </tr>
            <tr>
              <td>Schema Support</td>
              <td>XSD generation/validation</td>
              <td>Manual validation</td>
              <td>XSD.exe tool</td>
            </tr>
            <tr>
              <td>Performance</td>
              <td>Fast (compiled)</td>
              <td>Moderate</td>
              <td>Fast (reflection cache)</td>
            </tr>
            <tr>
              <td>Use Cases</td>
              <td>SOAP, Spring WS</td>
              <td>Config files, data processing</td>
              <td>WCF, Service Bus</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default XMLDataTransformer