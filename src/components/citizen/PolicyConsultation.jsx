import React, { useState } from 'react';
import { 
  Container, 
  Row, 
  Col, 
  Card, 
  Button, 
  Badge, 
  Form,
  Modal,
  ProgressBar,
  Alert,
  Tabs,
  Tab
} from 'react-bootstrap';
import { 
  FaVoteYea, 
  FaClock, 
  FaUsers, 
  FaEye,
  FaChartBar,
  FaCalendarAlt,
  FaFileAlt,
  FaComments,
  FaCheckCircle,
  FaQuestionCircle
} from 'react-icons/fa';

const PolicyConsultation = () => {
  const [activeTab, setActiveTab] = useState('active');
  const [selectedConsultation, setSelectedConsultation] = useState(null);
  const [showParticipateModal, setShowParticipateModal] = useState(false);
  const [participationData, setParticipationData] = useState({});

  const consultations = [
    {
      id: 1,
      title: 'County Budget Allocation 2025',
      description: 'Share your priorities for next year\'s budget allocation across different sectors including healthcare, education, infrastructure, and social services.',
      category: 'Budget & Finance',
      status: 'active',
      deadline: '2025-01-30',
      participants: 1247,
      documentsCount: 3,
      questionsCount: 12,
      priority: 'high',
      color: '#8b5cf6',
      participationRate: 65,
      questions: [
        {
          id: 1,
          type: 'multiple-choice',
          question: 'Which sector should receive the highest budget allocation?',
          options: ['Healthcare', 'Education', 'Infrastructure', 'Agriculture', 'Security'],
          required: true
        },
        {
          id: 2,
          type: 'rating',
          question: 'Rate the current state of county healthcare services (1-5)',
          min: 1,
          max: 5,
          required: true
        },
        {
          id: 3,
          type: 'text',
          question: 'What specific infrastructure projects should be prioritized?',
          required: false
        }
      ]
    },
    {
      id: 2,
      title: 'Public Transport Route Planning',
      description: 'Help us design better public transport routes for improved connectivity between towns, markets, and essential services.',
      category: 'Transport & Infrastructure',
      status: 'active',
      deadline: '2025-02-15',
      participants: 892,
      documentsCount: 2,
      questionsCount: 8,
      priority: 'medium',
      color: '#f59e0b',
      participationRate: 45,
      questions: [
        {
          id: 1,
          type: 'multiple-choice',
          question: 'Which routes need the most improvement?',
          options: ['Nyeri-Karatina', 'Nyeri-Nanyuki', 'Nyeri-Othaya', 'Town Center Routes'],
          required: true
        }
      ]
    },
    {
      id: 3,
      title: 'Environmental Conservation Policy',
      description: 'Contribute to the development of our new environmental protection policies for forest conservation and waste management.',
      category: 'Environment',
      status: 'active',
      deadline: '2025-02-20',
      participants: 567,
      documentsCount: 4,
      questionsCount: 10,
      priority: 'high',
      color: '#22c55e',
      participationRate: 38
    },
    {
      id: 4,
      title: 'Youth Development Programs 2024',
      description: 'Previously concluded consultation on youth empowerment initiatives and skills training programs.',
      category: 'Social Development',
      status: 'completed',
      deadline: '2024-12-15',
      participants: 1523,
      documentsCount: 5,
      questionsCount: 15,
      priority: 'high',
      color: '#3b82f6',
      participationRate: 78,
      results: 'Implementation started in January 2025'
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'success';
      case 'closing-soon': return 'warning';
      case 'completed': return 'secondary';
      default: return 'primary';
    }
  };

  const getDaysRemaining = (deadline) => {
    const today = new Date();
    const deadlineDate = new Date(deadline);
    const diffTime = deadlineDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const handleParticipate = (consultation) => {
    setSelectedConsultation(consultation);
    setShowParticipateModal(true);
  };

  const handleSubmitResponse = () => {
    // Handle form submission
    setShowParticipateModal(false);
    // Show success message
  };

  const renderQuestion = (question, index) => {
    const questionKey = `q_${question.id}`;
    
    switch (question.type) {
      case 'multiple-choice':
        return (
          <Form.Group key={question.id} className="mb-4">
            <Form.Label className="fw-bold">
              {index + 1}. {question.question}
              {question.required && <span className="text-danger">*</span>}
            </Form.Label>
            {question.options.map((option, optionIndex) => (
              <Form.Check
                key={optionIndex}
                type="radio"
                name={questionKey}
                id={`${questionKey}_${optionIndex}`}
                label={option}
                value={option}
                onChange={(e) => setParticipationData(prev => ({
                  ...prev,
                  [questionKey]: e.target.value
                }))}
                className="mb-2"
              />
            ))}
          </Form.Group>
        );
      
      case 'rating':
        return (
          <Form.Group key={question.id} className="mb-4">
            <Form.Label className="fw-bold">
              {index + 1}. {question.question}
              {question.required && <span className="text-danger">*</span>}
            </Form.Label>
            <div className="d-flex gap-2 mt-2">
              {[...Array(question.max)].map((_, i) => (
                <Button
                  key={i + 1}
                  variant={participationData[questionKey] === (i + 1) ? 'primary' : 'outline-primary'}
                  size="sm"
                  style={{ width: '40px', height: '40px', borderRadius: '50%' }}
                  onClick={() => setParticipationData(prev => ({
                    ...prev,
                    [questionKey]: i + 1
                  }))}
                >
                  {i + 1}
                </Button>
              ))}
            </div>
            <div className="d-flex justify-content-between mt-1">
              <small className="text-muted">Poor</small>
              <small className="text-muted">Excellent</small>
            </div>
          </Form.Group>
        );
      
      case 'text':
        return (
          <Form.Group key={question.id} className="mb-4">
            <Form.Label className="fw-bold">
              {index + 1}. {question.question}
              {question.required && <span className="text-danger">*</span>}
            </Form.Label>
            <Form.Control
              as="textarea"
              rows={4}
              placeholder="Enter your response..."
              value={participationData[questionKey] || ''}
              onChange={(e) => setParticipationData(prev => ({
                ...prev,
                [questionKey]: e.target.value
              }))}
            />
          </Form.Group>
        );
      
      default:
        return null;
    }
  };

  const filteredConsultations = consultations.filter(consultation => {
    if (activeTab === 'active') return consultation.status === 'active';
    if (activeTab === 'completed') return consultation.status === 'completed';
    return true;
  });

  return (
    <div className="policy-consultation">
      <Container fluid className="p-4">
        {/* Header */}
        <Row className="mb-4">
          <Col>
            <h1 className="h3 fw-bold text-dark mb-2">
              Policy Consultations 🗳️
            </h1>
            <p className="text-muted">
              Participate in shaping Nyeri County's policies and decisions
            </p>
          </Col>
        </Row>

        {/* Tabs */}
        <Row className="mb-4">
          <Col>
            <Tabs
              activeKey={activeTab}
              onSelect={(k) => setActiveTab(k)}
              className="nav-pills-custom"
            >
              <Tab eventKey="active" title="Active Consultations">
                {/* Active consultations content */}
              </Tab>
              <Tab eventKey="completed" title="Completed">
                {/* Completed consultations content */}
              </Tab>
              <Tab eventKey="all" title="All">
                {/* All consultations content */}
              </Tab>
            </Tabs>
          </Col>
        </Row>

        {/* Consultations Grid */}
        <Row>
          {filteredConsultations.map((consultation) => {
            const daysRemaining = getDaysRemaining(consultation.deadline);
            const isUrgent = daysRemaining <= 7 && consultation.status === 'active';
            
            return (
              <Col lg={6} xl={4} key={consultation.id} className="mb-4">
                <Card 
                  className="h-100 border-0 shadow-sm consultation-card"
                  style={{ borderRadius: '16px' }}
                >
                  <Card.Header 
                    className="border-0 pb-0"
                    style={{ background: 'transparent' }}
                  >
                    <div className="d-flex justify-content-between align-items-start">
                      <Badge 
                        style={{ 
                          background: consultation.color,
                          fontSize: '0.75rem'
                        }}
                        className="mb-2"
                      >
                        {consultation.category}
                      </Badge>
                      
                      <div className="text-end">
                        <Badge bg={getStatusColor(consultation.status)}>
                          {consultation.status.replace('-', ' ')}
                        </Badge>
                        {isUrgent && (
                          <Badge bg="danger" className="ms-1">
                            Urgent
                          </Badge>
                        )}
                      </div>
                    </div>
                  </Card.Header>
                  
                  <Card.Body className="pt-0">
                    <h5 className="fw-bold text-dark mb-3">
                      {consultation.title}
                    </h5>
                    
                    <p className="text-muted mb-3" style={{ fontSize: '0.9rem' }}>
                      {consultation.description}
                    </p>

                    {/* Stats */}
                    <div className="mb-3">
                      <Row className="g-3">
                        <Col xs={6}>
                          <div className="d-flex align-items-center">
                            <FaUsers className="text-primary me-2" />
                            <div>
                              <div className="fw-bold">{consultation.participants}</div>
                              <small className="text-muted">Participants</small>
                            </div>
                          </div>
                        </Col>
                        
                        <Col xs={6}>
                          <div className="d-flex align-items-center">
                            <FaQuestionCircle className="text-success me-2" />
                            <div>
                              <div className="fw-bold">{consultation.questionsCount}</div>
                              <small className="text-muted">Questions</small>
                            </div>
                          </div>
                        </Col>
                      </Row>
                    </div>

                    {/* Progress */}
                    {consultation.status === 'active' && (
                      <div className="mb-3">
                        <div className="d-flex justify-content-between mb-1">
                          <small className="text-muted">Participation Rate</small>
                          <small className="fw-bold">{consultation.participationRate}%</small>
                        </div>
                        <ProgressBar 
                          now={consultation.participationRate} 
                          style={{ height: '6px' }}
                          variant={consultation.participationRate > 50 ? 'success' : 'warning'}
                        />
                      </div>
                    )}

                    {/* Deadline */}
                    <div className="d-flex align-items-center mb-3">
                      <FaCalendarAlt className="text-warning me-2" />
                      <div>
                        {consultation.status === 'active' ? (
                          <>
                            <small className="text-muted">Closes in </small>
                            <span className={`fw-bold ${isUrgent ? 'text-danger' : 'text-dark'}`}>
                              {daysRemaining > 0 ? `${daysRemaining} days` : 'Today'}
                            </span>
                          </>
                        ) : (
                          <>
                            <small className="text-muted">Closed on </small>
                            <span className="fw-bold">
                              {new Date(consultation.deadline).toLocaleDateString()}
                            </span>
                          </>
                        )}
                      </div>
                    </div>

                    {/* Results for completed */}
                    {consultation.status === 'completed' && consultation.results && (
                      <Alert variant="info" className="mb-3" style={{ fontSize: '0.85rem' }}>
                        <FaCheckCircle className="me-2" />
                        {consultation.results}
                      </Alert>
                    )}
                  </Card.Body>
                  
                  <Card.Footer className="border-0 pt-0" style={{ background: 'transparent' }}>
                    <div className="d-grid gap-2">
                      {consultation.status === 'active' ? (
                        <Button
                          onClick={() => handleParticipate(consultation)}
                          style={{
                            background: consultation.color,
                            border: 'none',
                            borderRadius: '12px'
                          }}
                        >
                          <FaVoteYea className="me-2" />
                          Participate Now
                        </Button>
                      ) : (
                        <Button
                          variant="outline-primary"
                          style={{ borderRadius: '12px' }}
                        >
                          <FaEye className="me-2" />
                          View Results
                        </Button>
                      )}
                      
                      <Button
                        variant="outline-secondary"
                        size="sm"
                        style={{ borderRadius: '8px' }}
                      >
                        <FaFileAlt className="me-2" />
                        View Documents ({consultation.documentsCount})
                      </Button>
                    </div>
                  </Card.Footer>
                </Card>
              </Col>
            );
          })}
        </Row>

        {/* Empty State */}
        {filteredConsultations.length === 0 && (
          <Row>
            <Col className="text-center py-5">
              <div 
                className="mx-auto mb-3 d-flex align-items-center justify-content-center"
                style={{
                  width: '80px',
                  height: '80px',
                  background: '#f8fafc',
                  borderRadius: '50%',
                  color: '#64748b'
                }}
              >
                <FaVoteYea style={{ fontSize: '2rem' }} />
              </div>
              <h5 className="fw-bold text-dark mb-2">No consultations found</h5>
              <p className="text-muted">
                {activeTab === 'active' 
                  ? 'There are no active consultations at the moment. Check back soon!'
                  : 'No consultations in this category yet.'
                }
              </p>
            </Col>
          </Row>
        )}
      </Container>

      {/* Participation Modal */}
      <Modal 
        show={showParticipateModal} 
        onHide={() => setShowParticipateModal(false)} 
        size="lg"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title className="fw-bold">
            {selectedConsultation?.title}
          </Modal.Title>
        </Modal.Header>
        
        <Modal.Body className="p-4">
          {selectedConsultation && (
            <>
              <Alert variant="info" className="mb-4">
                <FaComments className="me-2" />
                Your responses will help shape county policies. Please answer honestly and thoughtfully.
              </Alert>

              <Form>
                {selectedConsultation.questions?.map((question, index) => 
                  renderQuestion(question, index)
                )}
              </Form>
            </>
          )}
        </Modal.Body>
        
        <Modal.Footer>
          <Button 
            variant="outline-secondary" 
            onClick={() => setShowParticipateModal(false)}
          >
            Cancel
          </Button>
          <Button 
            onClick={handleSubmitResponse}
            style={{
              background: selectedConsultation?.color || '#3b82f6',
              border: 'none'
            }}
          >
            <FaCheckCircle className="me-2" />
            Submit Response
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default PolicyConsultation;