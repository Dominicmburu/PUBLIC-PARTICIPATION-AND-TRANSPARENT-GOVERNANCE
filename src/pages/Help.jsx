import React, { useState } from 'react';
import { Container, Row, Col, Card, Accordion, Form, Button, InputGroup } from 'react-bootstrap';
import { 
  FaSearch, 
  FaQuestionCircle, 
  FaBook, 
  FaVideo,
  FaDownload,
  FaEnvelope,
  FaPhone,
  FaComments
} from 'react-icons/fa';

const Help = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const faqCategories = [
    {
      title: 'Getting Started',
      icon: FaBook,
      color: '#3b82f6',
      items: [
        {
          question: 'How do I create an account?',
          answer: 'Click on "Register" in the top navigation menu, fill out the registration form with your personal details including name, email, phone number, and constituency information. After submitting, verify your email address to activate your account.'
        },
        {
          question: 'What information do I need to register?',
          answer: 'You\'ll need your full name, email address, phone number, National ID number, constituency, ward, and physical address. All information is kept secure and used only for verification and communication purposes.'
        },
        {
          question: 'Is the platform free to use?',
          answer: 'Yes, the Nyeri County Digital Platform is completely free for all citizens. There are no charges for registration, reporting issues, participating in consultations, or using any platform features.'
        }
      ]
    },
    {
      title: 'Reporting Issues',
      icon: FaQuestionCircle,
      color: '#ef4444',
      items: [
        {
          question: 'How do I report an infrastructure issue?',
          answer: 'Navigate to "Report Issue" from your dashboard or sidebar menu. Select the appropriate category (roads, lighting, water, etc.), provide a detailed description, add photos if possible, and include the exact location. The more details you provide, the faster we can respond.'
        },
        {
          question: 'Can I track the status of my reported issues?',
          answer: 'Yes! After submitting a report, you\'ll receive a unique tracking ID. You can view the status of all your reports in your dashboard, and you\'ll receive email notifications when there are updates.'
        },
        {
          question: 'What types of issues can I report?',
          answer: 'You can report infrastructure issues (potholes, broken street lights), water and sanitation problems, waste management issues, public safety concerns, and problems with public facilities. For emergencies, please call 999 directly.'
        }
      ]
    },
    {
      title: 'Policy Consultations',
      icon: FaVideo,
      color: '#8b5cf6',
      items: [
        {
          question: 'How do I participate in policy consultations?',
          answer: 'Go to the "Consultations" section to see active policy discussions. Click "Participate Now" on any consultation to answer questions and provide feedback. Your responses help shape county policies and budget allocations.'
        },
        {
          question: 'When are consultation results published?',
          answer: 'Results are typically published within 2-4 weeks after the consultation period ends. You\'ll receive an email notification when results are available, and they\'ll be posted in the consultations section.'
        },
        {
          question: 'Can I change my consultation responses?',
          answer: 'You can modify your responses anytime before the consultation deadline. After the deadline, responses cannot be changed to ensure fairness and data integrity.'
        }
      ]
    },
    {
      title: 'Community Forum',
      icon: FaComments,
      color: '#22c55e',
      items: [
        {
          question: 'How do forum discussions work?',
          answer: 'The forum allows you to discuss county topics with other citizens and officials. You can start new discussions, reply to existing ones, and participate in virtual barazas. All discussions are moderated to maintain respectful dialogue.'
        },
        {
          question: 'Are forum discussions public?',
          answer: 'Yes, forum discussions are public and can be viewed by all registered users. However, personal contact information is never displayed publicly, and you can report inappropriate content to moderators.'
        }
      ]
    },
    {
      title: 'Technical Support',
      icon: FaDownload,
      color: '#f59e0b',
      items: [
        {
          question: 'The platform is not working properly. What should I do?',
          answer: 'First, try refreshing your browser and clearing your cache. If problems persist, check your internet connection. For ongoing issues, contact our technical support team at support@nyeri.go.ke with details about the problem.'
        },
        {
          question: 'Can I use the platform on my mobile phone?',
          answer: 'Yes! The platform is fully responsive and works on smartphones, tablets, and desktop computers. We recommend using an updated web browser for the best experience.'
        },
        {
          question: 'I forgot my password. How do I reset it?',
          answer: 'Click "Forgot Password" on the login page, enter your email address, and you\'ll receive a password reset link. Follow the instructions in the email to create a new password.'
        }
      ]
    }
  ];

  const quickLinks = [
    {
      title: 'User Guide PDF',
      description: 'Download the complete user guide',
      icon: FaDownload,
      action: 'Download',
      color: '#3b82f6'
    },
    {
      title: 'Video Tutorials',
      description: 'Watch step-by-step video guides',
      icon: FaVideo,
      action: 'Watch',
      color: '#ef4444'
    },
    {
      title: 'Contact Support',
      description: 'Get direct help from our team',
      icon: FaEnvelope,
      action: 'Contact',
      color: '#22c55e'
    },
    {
      title: 'Emergency Contacts',
      description: 'Important phone numbers',
      icon: FaPhone,
      action: 'View',
      color: '#f59e0b'
    }
  ];

  const filteredFAQs = faqCategories.map(category => ({
    ...category,
    items: category.items.filter(item =>
      item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(category => category.items.length > 0);

  return (
    <div className="help-page">
      {/* Hero Section */}
      <section 
        className="hero-section text-white py-5"
        style={{
          background: 'linear-gradient(135deg, #1e40af 0%, #3b82f6 100%)',
          minHeight: '50vh',
          display: 'flex',
          alignItems: 'center'
        }}
      >
        <Container>
          <Row className="text-center">
            <Col lg={8} className="mx-auto">
              <h1 className="display-4 fw-bold mb-4">Help Center</h1>
              <p className="lead mb-4 opacity-90">
                Find answers to your questions and learn how to make the most 
                of the Nyeri County Digital Platform
              </p>
              
              {/* Search Bar */}
              <div className="mx-auto" style={{ maxWidth: '500px' }}>
                <InputGroup size="lg">
                  <InputGroup.Text 
                    style={{ 
                      background: 'rgba(255, 255, 255, 0.1)',
                      border: 'none',
                      color: 'white'
                    }}
                  >
                    <FaSearch />
                  </InputGroup.Text>
                  <Form.Control
                    type="text"
                    placeholder="Search for help topics..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{
                      background: 'rgba(255, 255, 255, 0.1)',
                      border: 'none',
                      color: 'white'
                    }}
                  />
                </InputGroup>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Quick Links */}
      <section className="py-5 bg-white">
        <Container>
          <Row className="mb-4">
            <Col>
              <h2 className="fw-bold text-dark text-center mb-3">Quick Help</h2>
              <p className="text-muted text-center">
                Fast access to the most common resources
              </p>
            </Col>
          </Row>
          
          <Row>
            {quickLinks.map((link, index) => {
              const IconComponent = link.icon;
              return (
                <Col lg={3} md={6} key={index} className="mb-4">
                  <Card className="h-100 border-0 shadow-sm text-center quick-link-card">
                    <Card.Body className="p-4">
                      <div 
                        className="mx-auto mb-3 d-flex align-items-center justify-content-center"
                        style={{
                          width: '60px',
                          height: '60px',
                          background: link.color,
                          borderRadius: '16px',
                          color: 'white'
                        }}
                      >
                        <IconComponent style={{ fontSize: '1.5rem' }} />
                      </div>
                      <h5 className="fw-bold text-dark mb-2">{link.title}</h5>
                      <p className="text-muted mb-3">{link.description}</p>
                      <Button 
                        variant="outline-primary"
                        style={{ borderRadius: '8px' }}
                      >
                        {link.action}
                      </Button>
                    </Card.Body>
                  </Card>
                </Col>
              );
            })}
          </Row>
        </Container>
      </section>

      {/* FAQ Section */}
      <section className="py-5" style={{ background: '#f8fafc' }}>
        <Container>
          <Row className="mb-4">
            <Col>
              <h2 className="fw-bold text-dark text-center mb-3">
                Frequently Asked Questions
              </h2>
              <p className="text-muted text-center">
                Find answers to the most common questions about using our platform
              </p>
            </Col>
          </Row>

          {searchTerm && filteredFAQs.length === 0 && (
            <Row className="mb-4">
              <Col>
                <div className="text-center py-4">
                  <FaSearch className="text-muted mb-3" style={{ fontSize: '3rem' }} />
                  <h5 className="text-muted">No results found</h5>
                  <p className="text-muted">
                    Try searching with different keywords or browse the categories below
                  </p>
                </div>
              </Col>
            </Row>
          )}

          <Row>
            <Col>
              {(searchTerm ? filteredFAQs : faqCategories).map((category, categoryIndex) => {
                const IconComponent = category.icon;
                return (
                  <Card key={categoryIndex} className="mb-4 border-0 shadow-sm">
                    <Card.Header 
                      className="bg-white border-0 py-3"
                      style={{ borderRadius: '12px 12px 0 0' }}
                    >
                      <div className="d-flex align-items-center">
                        <div 
                          className="me-3 d-flex align-items-center justify-content-center"
                          style={{
                            width: '40px',
                            height: '40px',
                            background: category.color,
                            borderRadius: '10px',
                            color: 'white'
                          }}
                        >
                          <IconComponent />
                        </div>
                        <h5 className="fw-bold text-dark mb-0">{category.title}</h5>
                      </div>
                    </Card.Header>
                    
                    <Card.Body className="p-0">
                      <Accordion flush>
                        {category.items.map((item, itemIndex) => (
                          <Accordion.Item 
                            key={itemIndex} 
                            eventKey={`${categoryIndex}-${itemIndex}`}
                          >
                            <Accordion.Header>
                              <span className="fw-medium">{item.question}</span>
                            </Accordion.Header>
                            <Accordion.Body className="text-muted">
                              {item.answer}
                            </Accordion.Body>
                          </Accordion.Item>
                        ))}
                      </Accordion>
                    </Card.Body>
                  </Card>
                );
              })}
            </Col>
          </Row>
        </Container>
      </section>

      {/* Contact Support */}
      <section className="py-5 bg-white">
        <Container>
          <Row>
            <Col lg={8} className="mx-auto text-center">
              <h2 className="fw-bold text-dark mb-3">Still Need Help?</h2>
              <p className="text-muted mb-4">
                Can't find what you're looking for? Our support team is here to help you.
              </p>
              
              <Row>
                <Col md={4} className="mb-3">
                  <Card className="border-0 shadow-sm h-100">
                    <Card.Body className="text-center p-4">
                      <FaEnvelope 
                        className="text-primary mb-3" 
                        style={{ fontSize: '2rem' }} 
                      />
                      <h6 className="fw-bold mb-2">Email Support</h6>
                      <p className="text-muted mb-3">
                        Get detailed help via email
                      </p>
                      <Button 
                        variant="outline-primary"
                        href="mailto:support@nyeri.go.ke"
                        style={{ borderRadius: '8px' }}
                      >
                        Send Email
                      </Button>
                    </Card.Body>
                  </Card>
                </Col>
                
                <Col md={4} className="mb-3">
                  <Card className="border-0 shadow-sm h-100">
                    <Card.Body className="text-center p-4">
                      <FaPhone 
                        className="text-success mb-3" 
                        style={{ fontSize: '2rem' }} 
                      />
                      <h6 className="fw-bold mb-2">Phone Support</h6>
                      <p className="text-muted mb-3">
                        Speak directly with our team
                      </p>
                      <Button 
                        variant="outline-success"
                        href="tel:+254612030001"
                        style={{ borderRadius: '8px' }}
                      >
                        Call Now
                      </Button>
                    </Card.Body>
                  </Card>
                </Col>
                
                <Col md={4} className="mb-3">
                  <Card className="border-0 shadow-sm h-100">
                    <Card.Body className="text-center p-4">
                      <FaComments 
                        className="text-warning mb-3" 
                        style={{ fontSize: '2rem' }} 
                      />
                      <h6 className="fw-bold mb-2">Live Chat</h6>
                      <p className="text-muted mb-3">
                        Chat with us in real-time
                      </p>
                      <Button 
                        variant="outline-warning"
                        style={{ borderRadius: '8px' }}
                      >
                        Start Chat
                      </Button>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </section>
    </div>
  );
};

export default Help;