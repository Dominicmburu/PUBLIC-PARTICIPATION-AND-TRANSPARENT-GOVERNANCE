import React, { useState } from 'react';
import { 
  Container, 
  Row, 
  Col, 
  Card, 
  Form, 
  Button,
  Modal,
  Badge,
  Alert,
  Tabs,
  Tab,
  Table
} from 'react-bootstrap';
import { 
  FaPlus, 
  FaEdit, 
  FaTrash, 
  FaEye,
  FaSave,
  FaCalendarAlt,
  FaUsers,
  FaChartBar,
  FaQuestionCircle,
  FaCopy,
  FaPause,
  FaPlay,
  FaFileAlt
} from 'react-icons/fa';

const CreateConsultation = () => {
  const [activeTab, setActiveTab] = useState('create');
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedConsultation, setSelectedConsultation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const [consultationData, setConsultationData] = useState({
    title: '',
    description: '',
    category: '',
    startDate: '',
    endDate: '',
    targetAudience: 'all',
    isPublic: true,
    requiresLogin: true,
    allowAnonymous: false,
    questions: []
  });

  const [newQuestion, setNewQuestion] = useState({
    type: 'multiple-choice',
    question: '',
    options: [''],
    required: true,
    allowOther: false
  });

  const [editingQuestion, setEditingQuestion] = useState(null);

  const categories = [
    'Budget & Finance',
    'Infrastructure Development',
    'Healthcare Services',
    'Education',
    'Environment & Conservation',
    'Agriculture & Livestock',
    'Transport & Roads',
    'Water & Sanitation',
    'Youth & Sports',
    'Gender & Social Services',
    'Trade & Investment',
    'ICT & Innovation'
  ];

  const questionTypes = [
    { value: 'multiple-choice', label: 'Multiple Choice', icon: '🔘' },
    { value: 'single-choice', label: 'Single Choice', icon: '⚪' },
    { value: 'text', label: 'Text Response', icon: '📝' },
    { value: 'rating', label: 'Rating Scale', icon: '⭐' },
    { value: 'yes-no', label: 'Yes/No', icon: '✅' },
    { value: 'file-upload', label: 'File Upload', icon: '📎' }
  ];

  const existingConsultations = [
    {
      id: 1,
      title: 'County Budget Allocation 2025',
      category: 'Budget & Finance',
      status: 'active',
      startDate: '2025-01-10',
      endDate: '2025-01-30',
      participants: 1247,
      responses: 892,
      questions: 12
    },
    {
      id: 2,
      title: 'Public Transport Route Planning',
      category: 'Transport & Roads',
      status: 'draft',
      startDate: '2025-02-01',
      endDate: '2025-02-15',
      participants: 0,
      responses: 0,
      questions: 8
    },
    {
      id: 3,
      title: 'Youth Development Programs 2024',
      category: 'Youth & Sports',
      status: 'completed',
      startDate: '2024-11-01',
      endDate: '2024-12-15',
      participants: 1523,
      responses: 1203,
      questions: 15
    }
  ];

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setConsultationData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleQuestionChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewQuestion(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const addOption = () => {
    setNewQuestion(prev => ({
      ...prev,
      options: [...prev.options, '']
    }));
  };

  const removeOption = (index) => {
    setNewQuestion(prev => ({
      ...prev,
      options: prev.options.filter((_, i) => i !== index)
    }));
  };

  const updateOption = (index, value) => {
    setNewQuestion(prev => ({
      ...prev,
      options: prev.options.map((opt, i) => i === index ? value : opt)
    }));
  };

  const addQuestion = () => {
    if (!newQuestion.question.trim()) {
      setError('Question text is required');
      return;
    }

    if (['multiple-choice', 'single-choice'].includes(newQuestion.type) && 
        newQuestion.options.filter(opt => opt.trim()).length < 2) {
      setError('At least 2 options are required for choice questions');
      return;
    }

    const questionToAdd = {
      id: Date.now(),
      ...newQuestion,
      options: newQuestion.options.filter(opt => opt.trim())
    };

    setConsultationData(prev => ({
      ...prev,
      questions: [...prev.questions, questionToAdd]
    }));

    // Reset form
    setNewQuestion({
      type: 'multiple-choice',
      question: '',
      options: [''],
      required: true,
      allowOther: false
    });
    setError('');
  };

  const editQuestion = (question) => {
    setEditingQuestion(question);
    setNewQuestion({
      ...question,
      options: question.options || ['']
    });
  };

  const updateQuestion = () => {
    if (!newQuestion.question.trim()) {
      setError('Question text is required');
      return;
    }

    setConsultationData(prev => ({
      ...prev,
      questions: prev.questions.map(q => 
        q.id === editingQuestion.id 
          ? { ...newQuestion, options: newQuestion.options.filter(opt => opt.trim()) }
          : q
      )
    }));

    setEditingQuestion(null);
    setNewQuestion({
      type: 'multiple-choice',
      question: '',
      options: [''],
      required: true,
      allowOther: false
    });
    setError('');
  };

  const deleteQuestion = (id) => {
    setConsultationData(prev => ({
      ...prev,
      questions: prev.questions.filter(q => q.id !== id)
    }));
  };

  const duplicateQuestion = (question) => {
    const duplicated = {
      ...question,
      id: Date.now(),
      question: question.question + ' (Copy)'
    };
    setConsultationData(prev => ({
      ...prev,
      questions: [...prev.questions, duplicated]
    }));
  };

  const handleSubmit = async (e, isDraft = false) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Validation
      if (!consultationData.title.trim()) {
        throw new Error('Title is required');
      }
      if (!consultationData.description.trim()) {
        throw new Error('Description is required');
      }
      if (!consultationData.category) {
        throw new Error('Category is required');
      }
      if (!consultationData.startDate || !consultationData.endDate) {
        throw new Error('Start and end dates are required');
      }
      if (new Date(consultationData.startDate) >= new Date(consultationData.endDate)) {
        throw new Error('End date must be after start date');
      }
      if (!isDraft && consultationData.questions.length === 0) {
        throw new Error('At least one question is required');
      }

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setSuccess(`Consultation ${isDraft ? 'saved as draft' : 'created'} successfully!`);
      
      // Reset form
      setConsultationData({
        title: '',
        description: '',
        category: '',
        startDate: '',
        endDate: '',
        targetAudience: 'all',
        isPublic: true,
        requiresLogin: true,
        allowAnonymous: false,
        questions: []
      });

      setTimeout(() => setSuccess(''), 5000);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const toggleConsultationStatus = async (id, newStatus) => {
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSuccess(`Consultation ${newStatus} successfully!`);
      setTimeout(() => setSuccess(''), 3000);
    } finally {
      setLoading(false);
    }
  };

  const deleteConsultation = async (id) => {
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSuccess('Consultation deleted successfully!');
      setShowDeleteModal(false);
      setSelectedConsultation(null);
      setTimeout(() => setSuccess(''), 3000);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'success';
      case 'draft': return 'secondary';
      case 'completed': return 'primary';
      case 'paused': return 'warning';
      default: return 'secondary';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="create-consultation">
      <Container fluid className="p-4">
        {/* Header */}
        <Row className="mb-4">
          <Col>
            <h1 className="h3 fw-bold text-dark mb-2">
              Public Consultations 🗳️
            </h1>
            <p className="text-muted">
              Create and manage public consultations to engage with citizens
            </p>
          </Col>
        </Row>

        {/* Success/Error Alerts */}
        {success && (
          <Row className="mb-3">
            <Col>
              <Alert variant="success" dismissible onClose={() => setSuccess('')}>
                {success}
              </Alert>
            </Col>
          </Row>
        )}

        {error && (
          <Row className="mb-3">
            <Col>
              <Alert variant="danger" dismissible onClose={() => setError('')}>
                {error}
              </Alert>
            </Col>
          </Row>
        )}

        {/* Main Tabs */}
        <Row>
          <Col>
            <Card className="shadow-sm">
              <Tabs activeKey={activeTab} onSelect={setActiveTab} className="nav-tabs-custom">
                <Tab eventKey="create" title={
                  <span>
                    <FaPlus className="me-2" />
                    Create Consultation
                  </span>
                }>
                  <div className="p-4">
                    <Form onSubmit={(e) => handleSubmit(e, false)}>
                      {/* Basic Information */}
                      <h5 className="mb-3">Basic Information</h5>
                      <Row className="mb-3">
                        <Col md={8}>
                          <Form.Group className="mb-3">
                            <Form.Label>Title *</Form.Label>
                            <Form.Control
                              type="text"
                              name="title"
                              value={consultationData.title}
                              onChange={handleInputChange}
                              placeholder="Enter consultation title"
                              required
                            />
                          </Form.Group>

                          <Form.Group className="mb-3">
                            <Form.Label>Description *</Form.Label>
                            <Form.Control
                              as="textarea"
                              rows={4}
                              name="description"
                              value={consultationData.description}
                              onChange={handleInputChange}
                              placeholder="Describe the purpose and context of this consultation"
                              required
                            />
                          </Form.Group>

                          <Form.Group className="mb-3">
                            <Form.Label>Category *</Form.Label>
                            <Form.Select
                              name="category"
                              value={consultationData.category}
                              onChange={handleInputChange}
                              required
                            >
                              <option value="">Select category</option>
                              {categories.map(category => (
                                <option key={category} value={category}>
                                  {category}
                                </option>
                              ))}
                            </Form.Select>
                          </Form.Group>
                        </Col>

                        <Col md={4}>
                          <Card className="bg-light">
                            <Card.Body>
                              <h6 className="mb-3">
                                <FaCalendarAlt className="me-2" />
                                Schedule
                              </h6>
                              
                              <Form.Group className="mb-3">
                                <Form.Label>Start Date *</Form.Label>
                                <Form.Control
                                  type="date"
                                  name="startDate"
                                  value={consultationData.startDate}
                                  onChange={handleInputChange}
                                  required
                                />
                              </Form.Group>

                              <Form.Group className="mb-3">
                                <Form.Label>End Date *</Form.Label>
                                <Form.Control
                                  type="date"
                                  name="endDate"
                                  value={consultationData.endDate}
                                  onChange={handleInputChange}
                                  required
                                />
                              </Form.Group>

                              <h6 className="mb-3 mt-4">
                                <FaUsers className="me-2" />
                                Access Settings
                              </h6>

                              <Form.Group className="mb-3">
                                <Form.Label>Target Audience</Form.Label>
                                <Form.Select
                                  name="targetAudience"
                                  value={consultationData.targetAudience}
                                  onChange={handleInputChange}
                                >
                                  <option value="all">All Citizens</option>
                                  <option value="ward">Ward Residents</option>
                                  <option value="constituency">Constituency Residents</option>
                                  <option value="youth">Youth (18-35)</option>
                                  <option value="business">Business Community</option>
                                </Form.Select>
                              </Form.Group>

                              <Form.Check
                                type="switch"
                                id="isPublic"
                                name="isPublic"
                                label="Public consultation"
                                checked={consultationData.isPublic}
                                onChange={handleInputChange}
                                className="mb-2"
                              />

                              <Form.Check
                                type="switch"
                                id="requiresLogin"
                                name="requiresLogin"
                                label="Require user login"
                                checked={consultationData.requiresLogin}
                                onChange={handleInputChange}
                                className="mb-2"
                              />

                              <Form.Check
                                type="switch"
                                id="allowAnonymous"
                                name="allowAnonymous"
                                label="Allow anonymous responses"
                                checked={consultationData.allowAnonymous}
                                onChange={handleInputChange}
                                className="mb-2"
                              />
                            </Card.Body>
                          </Card>
                        </Col>
                      </Row>

                      {/* Questions Section */}
                      <h5 className="mb-3 mt-4">Questions</h5>
                      
                      {/* Existing Questions */}
                      {consultationData.questions.length > 0 && (
                        <div className="mb-4">
                          {consultationData.questions.map((question, index) => (
                            <Card key={question.id} className="mb-3 question-card">
                              <Card.Body>
                                <div className="d-flex justify-content-between align-items-start">
                                  <div className="flex-grow-1">
                                    <div className="d-flex align-items-center mb-2">
                                      <Badge bg="secondary" className="me-2">
                                        Q{index + 1}
                                      </Badge>
                                      <Badge bg="info" className="me-2">
                                        {questionTypes.find(t => t.value === question.type)?.icon} {questionTypes.find(t => t.value === question.type)?.label}
                                      </Badge>
                                      {question.required && (
                                        <Badge bg="warning" className="me-2">Required</Badge>
                                      )}
                                    </div>
                                    <h6 className="mb-2">{question.question}</h6>
                                    
                                    {['multiple-choice', 'single-choice'].includes(question.type) && (
                                      <ul className="list-unstyled text-muted small">
                                        {question.options.map((option, i) => (
                                          <li key={i}>• {option}</li>
                                        ))}
                                        {question.allowOther && <li>• Other (text input)</li>}
                                      </ul>
                                    )}
                                  </div>
                                  
                                  <div className="d-flex gap-2">
                                    <Button 
                                      variant="outline-secondary" 
                                      size="sm"
                                      onClick={() => editQuestion(question)}
                                    >
                                      <FaEdit />
                                    </Button>
                                    <Button 
                                      variant="outline-info" 
                                      size="sm"
                                      onClick={() => duplicateQuestion(question)}
                                    >
                                      <FaCopy />
                                    </Button>
                                    <Button 
                                      variant="outline-danger" 
                                      size="sm"
                                      onClick={() => deleteQuestion(question.id)}
                                    >
                                      <FaTrash />
                                    </Button>
                                  </div>
                                </div>
                              </Card.Body>
                            </Card>
                          ))}
                        </div>
                      )}

                      {/* Add Question Form */}
                      <Card className="mb-4">
                        <Card.Body>
                          <h6 className="mb-3">
                            {editingQuestion ? 'Edit Question' : 'Add New Question'}
                          </h6>
                          
                          <Row>
                            <Col md={6}>
                              <Form.Group className="mb-3">
                                <Form.Label>Question Type</Form.Label>
                                <Form.Select
                                  name="type"
                                  value={newQuestion.type}
                                  onChange={handleQuestionChange}
                                >
                                  {questionTypes.map(type => (
                                    <option key={type.value} value={type.value}>
                                      {type.icon} {type.label}
                                    </option>
                                  ))}
                                </Form.Select>
                              </Form.Group>
                            </Col>
                            <Col md={6}>
                              <div className="d-flex gap-3 mt-4">
                                <Form.Check
                                  type="switch"
                                  id="required"
                                  name="required"
                                  label="Required"
                                  checked={newQuestion.required}
                                  onChange={handleQuestionChange}
                                />
                                {['multiple-choice', 'single-choice'].includes(newQuestion.type) && (
                                  <Form.Check
                                    type="switch"
                                    id="allowOther"
                                    name="allowOther"
                                    label="Allow 'Other'"
                                    checked={newQuestion.allowOther}
                                    onChange={handleQuestionChange}
                                  />
                                )}
                              </div>
                            </Col>
                          </Row>

                          <Form.Group className="mb-3">
                            <Form.Label>Question Text *</Form.Label>
                            <Form.Control
                              as="textarea"
                              rows={2}
                              name="question"
                              value={newQuestion.question}
                              onChange={handleQuestionChange}
                              placeholder="Enter your question"
                            />
                          </Form.Group>

                          {/* Options for choice questions */}
                          {['multiple-choice', 'single-choice'].includes(newQuestion.type) && (
                            <div className="mb-3">
                              <Form.Label>Answer Options</Form.Label>
                              {newQuestion.options.map((option, index) => (
                                <div key={index} className="d-flex mb-2">
                                  <Form.Control
                                    type="text"
                                    value={option}
                                    onChange={(e) => updateOption(index, e.target.value)}
                                    placeholder={`Option ${index + 1}`}
                                  />
                                  {newQuestion.options.length > 1 && (
                                    <Button
                                      variant="outline-danger"
                                      size="sm"
                                      className="ms-2"
                                      onClick={() => removeOption(index)}
                                    >
                                      <FaTrash />
                                    </Button>
                                  )}
                                </div>
                              ))}
                              <Button
                                variant="outline-primary"
                                size="sm"
                                onClick={addOption}
                              >
                                <FaPlus className="me-1" />
                                Add Option
                              </Button>
                            </div>
                          )}

                          <div className="text-end">
                            {editingQuestion && (
                              <Button
                                variant="secondary"
                                className="me-2"
                                onClick={() => {
                                  setEditingQuestion(null);
                                  setNewQuestion({
                                    type: 'multiple-choice',
                                    question: '',
                                    options: [''],
                                    required: true,
                                    allowOther: false
                                  });
                                }}
                              >
                                Cancel
                              </Button>
                            )}
                            <Button
                              variant="primary"
                              onClick={editingQuestion ? updateQuestion : addQuestion}
                            >
                              <FaPlus className="me-2" />
                              {editingQuestion ? 'Update Question' : 'Add Question'}
                            </Button>
                          </div>
                        </Card.Body>
                      </Card>

                      {/* Form Actions */}
                      <div className="d-flex justify-content-between align-items-center">
                        <Button
                          variant="outline-primary"
                          onClick={() => setShowPreviewModal(true)}
                          disabled={loading}
                        >
                          <FaEye className="me-2" />
                          Preview
                        </Button>

                        <div className="d-flex gap-2">
                          <Button
                            variant="secondary"
                            onClick={(e) => handleSubmit(e, true)}
                            disabled={loading}
                          >
                            {loading ? (
                              <>
                                <span className="spinner-border spinner-border-sm me-2" />
                                Saving...
                              </>
                            ) : (
                              <>
                                <FaSave className="me-2" />
                                Save Draft
                              </>
                            )}
                          </Button>

                          <Button
                            type="submit"
                            variant="primary"
                            disabled={loading}
                          >
                            {loading ? (
                              <>
                                <span className="spinner-border spinner-border-sm me-2" />
                                Creating...
                              </>
                            ) : (
                              <>
                                <FaFileAlt className="me-2" />
                                Create Consultation
                              </>
                            )}
                          </Button>
                        </div>
                      </div>
                    </Form>
                  </div>
                </Tab>

                <Tab eventKey="manage" title={
                  <span>
                    <FaChartBar className="me-2" />
                    Manage Consultations
                  </span>
                }>
                  <div className="p-4">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <h5>Your Consultations</h5>
                      <div className="d-flex gap-2">
                        <Form.Select style={{ width: 'auto' }}>
                          <option>All Status</option>
                          <option>Active</option>
                          <option>Draft</option>
                          <option>Completed</option>
                        </Form.Select>
                        <Form.Select style={{ width: 'auto' }}>
                          <option>All Categories</option>
                          {categories.map(cat => (
                            <option key={cat}>{cat}</option>
                          ))}
                        </Form.Select>
                      </div>
                    </div>

                    <Table responsive hover>
                      <thead>
                        <tr>
                          <th>Title</th>
                          <th>Category</th>
                          <th>Status</th>
                          <th>Period</th>
                          <th>Participation</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {existingConsultations.map((consultation) => (
                          <tr key={consultation.id}>
                            <td>
                              <div>
                                <strong>{consultation.title}</strong>
                                <div className="small text-muted">
                                  {consultation.questions} questions
                                </div>
                              </div>
                            </td>
                            <td>{consultation.category}</td>
                            <td>
                              <Badge bg={getStatusColor(consultation.status)}>
                                {consultation.status.charAt(0).toUpperCase() + consultation.status.slice(1)}
                              </Badge>
                            </td>
                            <td>
                              <div className="small">
                                {formatDate(consultation.startDate)} - {formatDate(consultation.endDate)}
                              </div>
                            </td>
                            <td>
                              <div className="small">
                                <div><FaUsers className="me-1" />{consultation.participants} participants</div>
                                <div>{consultation.responses} responses</div>
                              </div>
                            </td>
                            <td>
                              <div className="d-flex gap-1">
                                <Button variant="outline-primary" size="sm">
                                  <FaEye />
                                </Button>
                                <Button variant="outline-secondary" size="sm">
                                  <FaEdit />
                                </Button>
                                {consultation.status === 'active' ? (
                                  <Button 
                                    variant="outline-warning" 
                                    size="sm"
                                    onClick={() => toggleConsultationStatus(consultation.id, 'paused')}
                                  >
                                    <FaPause />
                                  </Button>
                                ) : consultation.status === 'paused' ? (
                                  <Button 
                                    variant="outline-success" 
                                    size="sm"
                                    onClick={() => toggleConsultationStatus(consultation.id, 'resumed')}
                                  >
                                    <FaPlay />
                                  </Button>
                                ) : null}
                                <Button 
                                  variant="outline-danger" 
                                  size="sm"
                                  onClick={() => {
                                    setSelectedConsultation(consultation);
                                    setShowDeleteModal(true);
                                  }}
                                >
                                  <FaTrash />
                                </Button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>

                    {existingConsultations.length === 0 && (
                      <div className="text-center text-muted py-5">
                        <FaQuestionCircle size={48} className="mb-3" />
                        <p>No consultations found</p>
                        <Button 
                          variant="primary"
                          onClick={() => setActiveTab('create')}
                        >
                          Create Your First Consultation
                        </Button>
                      </div>
                    )}
                  </div>
                </Tab>
              </Tabs>
            </Card>
          </Col>
        </Row>

        {/* Preview Modal */}
        <Modal show={showPreviewModal} onHide={() => setShowPreviewModal(false)} size="lg" centered>
          <Modal.Header closeButton>
            <Modal.Title>Preview Consultation</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="consultation-preview">
              <h4 className="mb-3">{consultationData.title || 'Consultation Title'}</h4>
              
              <div className="mb-3">
                <Badge bg="primary" className="me-2">{consultationData.category}</Badge>
                <Badge bg="secondary" className="me-2">
                  {consultationData.startDate} to {consultationData.endDate}
                </Badge>
                <Badge bg="info">{consultationData.targetAudience}</Badge>
              </div>

              <p className="text-muted mb-4">
                {consultationData.description || 'Consultation description will appear here...'}
              </p>

              {consultationData.questions.length > 0 && (
                <div>
                  <h6 className="mb-3">Questions Preview:</h6>
                  {consultationData.questions.map((question, index) => (
                    <Card key={question.id} className="mb-3">
                      <Card.Body>
                        <div className="d-flex align-items-center mb-2">
                          <Badge bg="secondary" className="me-2">Q{index + 1}</Badge>
                          {question.required && <Badge bg="warning" className="me-2">Required</Badge>}
                        </div>
                        <h6>{question.question}</h6>
                        
                        {question.type === 'multiple-choice' && (
                          <div className="mt-2">
                            {question.options.map((option, i) => (
                              <Form.Check
                                key={i}
                                type="checkbox"
                                label={option}
                                disabled
                                className="mb-1"
                              />
                            ))}
                          </div>
                        )}

                        {question.type === 'single-choice' && (
                          <div className="mt-2">
                            {question.options.map((option, i) => (
                              <Form.Check
                                key={i}
                                type="radio"
                                name={`preview-${question.id}`}
                                label={option}
                                disabled
                                className="mb-1"
                              />
                            ))}
                          </div>
                        )}

                        {question.type === 'text' && (
                         <Form.Control
                           as="textarea"
                           rows={3}
                           placeholder="Text response..."
                           disabled
                           className="mt-2"
                         />
                       )}

                       {question.type === 'rating' && (
                         <div className="mt-2">
                           <div className="d-flex align-items-center">
                             <span className="me-2">1</span>
                             {[1, 2, 3, 4, 5].map(star => (
                               <span key={star} className="me-1" style={{ fontSize: '1.5rem', color: '#ddd' }}>
                                 ⭐
                               </span>
                             ))}
                             <span className="ms-2">5</span>
                           </div>
                         </div>
                       )}

                       {question.type === 'yes-no' && (
                         <div className="mt-2">
                           <Form.Check
                             type="radio"
                             name={`preview-yn-${question.id}`}
                             label="Yes"
                             disabled
                             className="mb-1"
                           />
                           <Form.Check
                             type="radio"
                             name={`preview-yn-${question.id}`}
                             label="No"
                             disabled
                           />
                         </div>
                       )}

                       {question.type === 'file-upload' && (
                         <div className="mt-2">
                           <Form.Control
                             type="file"
                             disabled
                           />
                           <Form.Text className="text-muted">
                             Supported formats: PDF, DOC, DOCX, JPG, PNG (Max 5MB)
                           </Form.Text>
                         </div>
                       )}

                       {question.allowOther && ['multiple-choice', 'single-choice'].includes(question.type) && (
                         <div className="mt-2">
                           <Form.Check
                             type={question.type === 'multiple-choice' ? 'checkbox' : 'radio'}
                             label="Other:"
                             disabled
                             className="mb-1"
                           />
                           <Form.Control
                             type="text"
                             placeholder="Please specify..."
                             disabled
                             size="sm"
                             className="ms-4"
                             style={{ maxWidth: '300px' }}
                           />
                         </div>
                       )}
                     </Card.Body>
                   </Card>
                 ))}
               </div>
             )}

             {consultationData.questions.length === 0 && (
               <div className="text-center text-muted py-4">
                 <FaQuestionCircle size={48} className="mb-3" />
                 <p>No questions added yet</p>
               </div>
             )}
           </div>
         </Modal.Body>
         <Modal.Footer>
           <Button variant="secondary" onClick={() => setShowPreviewModal(false)}>
             Close Preview
           </Button>
         </Modal.Footer>
       </Modal>

       {/* Delete Confirmation Modal */}
       <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)} centered>
         <Modal.Header closeButton>
           <Modal.Title className="text-danger">Delete Consultation</Modal.Title>
         </Modal.Header>
         <Modal.Body>
           <Alert variant="danger">
             <strong>Warning!</strong> This action cannot be undone.
           </Alert>
           <p>
             Are you sure you want to delete the consultation "
             <strong>{selectedConsultation?.title}</strong>"?
           </p>
           <p className="text-muted small">
             This will permanently delete all associated responses and data.
           </p>
         </Modal.Body>
         <Modal.Footer>
           <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
             Cancel
           </Button>
           <Button 
             variant="danger" 
             onClick={() => deleteConsultation(selectedConsultation?.id)}
             disabled={loading}
           >
             {loading ? (
               <>
                 <span className="spinner-border spinner-border-sm me-2" />
                 Deleting...
               </>
             ) : (
               <>
                 <FaTrash className="me-2" />
                 Delete Consultation
               </>
             )}
           </Button>
         </Modal.Footer>
       </Modal>
     </Container>

     {/* Custom Styles */}
     <style jsx>{`
       .nav-tabs-custom {
         border-bottom: 2px solid #dee2e6;
       }
       
       .nav-tabs-custom .nav-link {
         border: none;
         border-bottom: 2px solid transparent;
         color: #6c757d;
         font-weight: 500;
         padding: 1rem 1.5rem;
       }
       
       .nav-tabs-custom .nav-link:hover {
         border-bottom-color: #0d6efd;
         color: #0d6efd;
       }
       
       .nav-tabs-custom .nav-link.active {
         background: none;
         border-bottom-color: #0d6efd;
         color: #0d6efd;
       }

       .question-card {
         border-left: 4px solid #0d6efd;
       }

       .question-card:hover {
         box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.1);
         transition: box-shadow 0.3s ease;
       }

       .consultation-preview {
         max-height: 70vh;
         overflow-y: auto;
       }

       .table th {
         border-top: none;
         font-weight: 600;
         background-color: #f8f9fa;
       }

       .badge {
         font-size: 0.75em;
       }

       .btn-group .btn {
         border-radius: 0.25rem !important;
         margin-right: 0.25rem;
       }

       .form-check-input:checked {
         background-color: #0d6efd;
         border-color: #0d6efd;
       }

       .form-select:focus,
       .form-control:focus {
         border-color: #86b7fe;
         box-shadow: 0 0 0 0.25rem rgba(13, 110, 253, 0.25);
       }

       .spinner-border-sm {
         width: 1rem;
         height: 1rem;
       }

       @media (max-width: 768px) {
         .d-flex.gap-2 {
           flex-direction: column;
         }
         
         .d-flex.gap-2 .btn {
           margin-bottom: 0.5rem;
         }
         
         .table-responsive {
           font-size: 0.875rem;
         }
       }
     `}</style>
   </div>
 );
};

export default CreateConsultation;