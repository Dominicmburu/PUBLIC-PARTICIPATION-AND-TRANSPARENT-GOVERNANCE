import React, { useState } from 'react';
import { 
  Container, 
  Row, 
  Col, 
  Card, 
  Table, 
  Button, 
  Badge,
  Form,
  Modal,
  Dropdown,
  InputGroup,
  Alert,
  ProgressBar,
  Tabs,
  Tab
} from 'react-bootstrap';
import { 
  FaSearch, 
  FaFilter, 
  FaEye, 
  FaEdit, 
  FaCheck,
  FaClock,
  FaExclamationTriangle,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaUser,
  FaPhone,
  FaEnvelope,
  FaImage,
  FaDownload,
  FaTasks,
  FaComments
} from 'react-icons/fa';

const ManageIssues = () => {
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedPriority, setSelectedPriority] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [selectedIssue, setSelectedIssue] = useState(null);
  const [assignmentData, setAssignmentData] = useState({
    assignTo: '',
    department: '',
    notes: '',
    priority: '',
    estimatedCompletion: ''
  });

  const issues = [
    {
      id: 'IR001',
      title: 'Pothole on Kimathi Way causing traffic delays',
      category: 'Roads & Infrastructure',
      priority: 'high',
      status: 'in-progress',
      reportedBy: {
        name: 'John Mwangi',
        email: 'john.mwangi@email.com',
        phone: '+254700123456'
      },
      reportedDate: '2025-01-10T08:30:00Z',
      location: 'Kimathi Way, Nyeri Town',
      coordinates: { lat: -0.4167, lng: 36.9500 },
      description: 'Large pothole near the roundabout causing severe traffic delays during peak hours. Multiple vehicles have been damaged.',
      images: ['pothole1.jpg', 'pothole2.jpg'],
      assignedTo: 'Roads Department',
      assignedStaff: 'Eng. Peter Kamau',
      estimatedCompletion: '2025-01-20',
      updates: [
        {
          date: '2025-01-15T10:00:00Z',
          status: 'in-progress',
          note: 'Site assessment completed. Materials ordered.',
          by: 'Eng. Peter Kamau'
        },
        {
          date: '2025-01-12T14:30:00Z',
          status: 'assigned',
          note: 'Issue assigned to Roads Department for immediate action.',
          by: 'Admin'
        }
      ],
      citizenComments: 3,
      likes: 24,
      urgencyScore: 85
    },
    {
      id: 'IR002',
      title: 'Street lights not working in Rware Estate',
      category: 'Lighting',
      priority: 'medium',
      status: 'pending',
      reportedBy: {
        name: 'Mary Wanjiku',
        email: 'mary.wanjiku@email.com',
        phone: '+254711234567'
      },
      reportedDate: '2025-01-12T19:45:00Z',
      location: 'Rware Estate, Phase 2',
      coordinates: { lat: -0.4200, lng: 36.9480 },
      description: 'Multiple street lights have been non-functional for over a week, creating safety concerns for residents.',
      images: ['lights1.jpg'],
      assignedTo: null,
      assignedStaff: null,
      estimatedCompletion: null,
      updates: [],
      citizenComments: 7,
      likes: 18,
      urgencyScore: 65
    },
    {
      id: 'IR003',
      title: 'Water pipe burst flooding residential area',
      category: 'Water & Sanitation',
      priority: 'urgent',
      status: 'resolved',
      reportedBy: {
        name: 'Peter Njuguna',
        email: 'peter.njuguna@email.com',
        phone: '+254722345678'
      },
      reportedDate: '2025-01-08T06:15:00Z',
      location: 'Kamakwa Ward',
      coordinates: { lat: -0.4100, lng: 36.9600 },
      description: 'Major water pipe burst causing flooding in residential area. Immediate attention required.',
      images: ['waterpipe1.jpg', 'waterpipe2.jpg', 'waterpipe3.jpg'],
      assignedTo: 'Water Department',
      assignedStaff: 'Eng. Grace Nyambura',
      estimatedCompletion: '2025-01-09',
      updates: [
        {
          date: '2025-01-09T16:00:00Z',
          status: 'resolved',
          note: 'Pipe repaired and water supply restored. Area cleaned up.',
          by: 'Eng. Grace Nyambura'
        }
      ],
      citizenComments: 12,
      likes: 45,
      urgencyScore: 95
    }
  ];

  const departments = [
    'Roads Department',
    'Water Department', 
    'Electrical Services',
    'Waste Management',
    'Public Health',
    'Security',
    'Environment',
    'Planning'
  ];

  const staff = [
    { name: 'Eng. Peter Kamau', department: 'Roads Department' },
    { name: 'Eng. Grace Nyambura', department: 'Water Department' },
    { name: 'John Kiprotich', department: 'Electrical Services' },
    { name: 'Mary Wanjiru', department: 'Waste Management' }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'resolved': return 'success';
      case 'in-progress': return 'warning';
      case 'pending': return 'danger';
      case 'assigned': return 'info';
      default: return 'secondary';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'urgent': return 'danger';
      case 'high': return 'warning';
      case 'medium': return 'info';
      case 'low': return 'success';
      default: return 'secondary';
    }
  };

  const getUrgencyColor = (score) => {
    if (score >= 80) return 'danger';
    if (score >= 60) return 'warning';
    if (score >= 40) return 'info';
    return 'success';
  };

  const getTimeAgo = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMinutes = Math.floor((now - date) / (1000 * 60));
    
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  const filteredIssues = issues.filter(issue => {
    const matchesStatus = selectedStatus === 'all' || issue.status === selectedStatus;
    const matchesCategory = selectedCategory === 'all' || issue.category === selectedCategory;
    const matchesPriority = selectedPriority === 'all' || issue.priority === selectedPriority;
    const matchesSearch = searchTerm === '' || 
      issue.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      issue.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      issue.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      issue.reportedBy.name.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesStatus && matchesCategory && matchesPriority && matchesSearch;
  });

  const handleViewDetails = (issue) => {
    setSelectedIssue(issue);
    setShowDetailsModal(true);
  };

  const handleAssignIssue = (issue) => {
    setSelectedIssue(issue);
    setAssignmentData({
      assignTo: issue.assignedStaff || '',
      department: issue.assignedTo || '',
      notes: '',
      priority: issue.priority,
      estimatedCompletion: issue.estimatedCompletion || ''
    });
    setShowAssignModal(true);
  };

  const handleStatusUpdate = (issueId, newStatus) => {
    // Handle status update
    console.log('Update status:', issueId, newStatus);
  };

  const handleAssignmentSubmit = (e) => {
    e.preventDefault();
    // Handle assignment submission
    console.log('Assignment data:', assignmentData);
    setShowAssignModal(false);
  };

  const stats = {
    total: issues.length,
    pending: issues.filter(i => i.status === 'pending').length,
    inProgress: issues.filter(i => i.status === 'in-progress').length,
    resolved: issues.filter(i => i.status === 'resolved').length,
    urgent: issues.filter(i => i.priority === 'urgent').length
  };

  return (
    <div className="manage-issues">
      <Container fluid className="p-4">
        {/* Header */}
        <Row className="mb-4">
          <Col>
            <h1 className="h3 fw-bold text-dark mb-2">
              Manage Issues 📋
            </h1>
            <p className="text-muted">
              Review, assign, and track citizen-reported issues
            </p>
          </Col>
        </Row>

        {/* Statistics Cards */}
        <Row className="mb-4">
          <Col lg={2} md={4} sm={6} className="mb-3">
            <Card className="border-0 shadow-sm text-center">
              <Card.Body className="p-3">
                <h4 className="fw-bold text-primary">{stats.total}</h4>
                <p className="text-muted mb-0 small">Total Issues</p>
              </Card.Body>
            </Card>
          </Col>
          <Col lg={2} md={4} sm={6} className="mb-3">
            <Card className="border-0 shadow-sm text-center">
              <Card.Body className="p-3">
                <h4 className="fw-bold text-danger">{stats.pending}</h4>
                <p className="text-muted mb-0 small">Pending</p>
              </Card.Body>
            </Card>
          </Col>
          <Col lg={2} md={4} sm={6} className="mb-3">
            <Card className="border-0 shadow-sm text-center">
              <Card.Body className="p-3">
                <h4 className="fw-bold text-warning">{stats.inProgress}</h4>
                <p className="text-muted mb-0 small">In Progress</p>
              </Card.Body>
            </Card>
          </Col>
          <Col lg={2} md={4} sm={6} className="mb-3">
            <Card className="border-0 shadow-sm text-center">
              <Card.Body className="p-3">
                <h4 className="fw-bold text-success">{stats.resolved}</h4>
                <p className="text-muted mb-0 small">Resolved</p>
              </Card.Body>
            </Card>
          </Col>
          <Col lg={2} md={4} sm={6} className="mb-3">
            <Card className="border-0 shadow-sm text-center">
              <Card.Body className="p-3">
                <h4 className="fw-bold text-danger">{stats.urgent}</h4>
                <p className="text-muted mb-0 small">Urgent</p>
              </Card.Body>
            </Card>
          </Col>
          <Col lg={2} md={4} sm={6} className="mb-3">
            <Card className="border-0 shadow-sm text-center">
              <Card.Body className="p-3">
                <h4 className="fw-bold text-info">
                  {Math.round((stats.resolved / stats.total) * 100)}%
                </h4>
                <p className="text-muted mb-0 small">Resolution Rate</p>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Filters */}
        <Row className="mb-4">
          <Col lg={3} md={6} className="mb-3">
            <InputGroup>
              <InputGroup.Text>
                <FaSearch className="text-muted" />
              </InputGroup.Text>
              <Form.Control
                type="text"
                placeholder="Search issues..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </InputGroup>
          </Col>
          <Col lg={2} md={6} className="mb-3">
            <Form.Select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="assigned">Assigned</option>
              <option value="in-progress">In Progress</option>
              <option value="resolved">Resolved</option>
            </Form.Select>
          </Col>
          <Col lg={2} md={6} className="mb-3">
            <Form.Select
              value={selectedPriority}
              onChange={(e) => setSelectedPriority(e.target.value)}
            >
              <option value="all">All Priority</option>
              <option value="urgent">Urgent</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </Form.Select>
          </Col>
          <Col lg={3} md={6} className="mb-3">
            <Form.Select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="all">All Categories</option>
              <option value="Roads & Infrastructure">Roads & Infrastructure</option>
              <option value="Lighting">Street Lighting</option>
              <option value="Water & Sanitation">Water & Sanitation</option>
              <option value="Waste Management">Waste Management</option>
              <option value="Public Safety">Public Safety</option>
            </Form.Select>
          </Col>
          <Col lg={2} md={6} className="mb-3">
            <Button variant="outline-primary" className="w-100">
              <FaDownload className="me-2" />
              Export
            </Button>
          </Col>
        </Row>

        {/* Issues Table */}
        <Row>
          <Col>
            <Card className="border-0 shadow-sm">
              <Card.Body className="p-0">
                <div className="table-responsive">
                  <Table hover className="align-middle mb-0">
                    <thead className="table-light">
                      <tr>
                        <th className="px-4 py-3">Issue ID</th>
                        <th>Title & Location</th>
                        <th>Reporter</th>
                        <th>Category</th>
                        <th>Priority</th>
                        <th>Status</th>
                        <th>Assigned To</th>
                        <th>Urgency</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredIssues.map((issue) => (
                        <tr key={issue.id}>
                          <td className="px-4">
                            <code className="text-primary fw-bold">{issue.id}</code>
                            <div className="small text-muted">
                              {getTimeAgo(issue.reportedDate)}
                            </div>
                          </td>
                          <td>
                            <div>
                              <div className="fw-medium text-dark mb-1">
                                {issue.title.substring(0, 50)}...
                              </div>
                              <div className="small text-muted">
                                <FaMapMarkerAlt className="me-1" />
                                {issue.location}
                              </div>
                              {issue.images.length > 0 && (
                                <Badge bg="info" className="mt-1">
                                  <FaImage className="me-1" />
                                  {issue.images.length} photos
                                </Badge>
                              )}
                            </div>
                          </td>
                          <td>
                            <div>
                              <div className="fw-medium">{issue.reportedBy.name}</div>
                              <div className="small text-muted">{issue.reportedBy.phone}</div>
                            </div>
                          </td>
                          <td>
                            <Badge bg="secondary" className="px-2 py-1">
                              {issue.category}
                            </Badge>
                          </td>
                          <td>
                            <Badge bg={getPriorityColor(issue.priority)} className="px-2 py-1">
                              {issue.priority.toUpperCase()}
                            </Badge>
                          </td>
                          <td>
                            <Dropdown>
                              <Dropdown.Toggle 
                                variant={getStatusColor(issue.status)}
                                size="sm"
                                style={{ textTransform: 'capitalize' }}
                              >
                                {issue.status.replace('-', ' ')}
                              </Dropdown.Toggle>
                              <Dropdown.Menu>
                                <Dropdown.Item onClick={() => handleStatusUpdate(issue.id, 'pending')}>
                                  Pending
                                </Dropdown.Item>
                                <Dropdown.Item onClick={() => handleStatusUpdate(issue.id, 'assigned')}>
                                  Assigned
                                </Dropdown.Item>
                                <Dropdown.Item onClick={() => handleStatusUpdate(issue.id, 'in-progress')}>
                                  In Progress
                                </Dropdown.Item>
                                <Dropdown.Item onClick={() => handleStatusUpdate(issue.id, 'resolved')}>
                                  Resolved
                                </Dropdown.Item>
                              </Dropdown.Menu>
                            </Dropdown>
                          </td>
                          <td>
                            {issue.assignedStaff ? (
                              <div>
                                <div className="fw-medium small">{issue.assignedStaff}</div>
                                <div className="small text-muted">{issue.assignedTo}</div>
                              </div>
                            ) : (
                              <Badge bg="light" text="dark">Unassigned</Badge>
                            )}
                          </td>
                          <td>
                            <div className="text-center">
                              <div className={`fw-bold text-${getUrgencyColor(issue.urgencyScore)}`}>
                                {issue.urgencyScore}
                              </div>
                              <ProgressBar 
                                now={issue.urgencyScore} 
                                variant={getUrgencyColor(issue.urgencyScore)}
                                style={{ height: '4px' }}
                              />
                            </div>
                          </td>
                          <td>
                            <div className="d-flex gap-1">
                              <Button
                                variant="outline-primary"
                                size="sm"
                                onClick={() => handleViewDetails(issue)}
                                title="View Details"
                              >
                                <FaEye />
                              </Button>
                              <Button
                                variant="outline-success"
                                size="sm"
                                onClick={() => handleAssignIssue(issue)}
                                title="Assign/Edit"
                              >
                                <FaEdit />
                              </Button>
                              {issue.citizenComments > 0 && (
                                <Button
                                  variant="outline-info"
                                  size="sm"
                                  title={`${issue.citizenComments} comments`}
                                >
                                  <FaComments />
                                  <span className="ms-1">{issue.citizenComments}</span>
                                </Button>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      {/* Issue Details Modal */}
      <Modal show={showDetailsModal} onHide={() => setShowDetailsModal(false)} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title className="fw-bold">
            Issue Details: {selectedIssue?.id}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedIssue && (
            <Tabs defaultActiveKey="details" className="mb-3">
              <Tab eventKey="details" title="Details">
                <Row>
                  <Col md={8}>
                    <h5 className="fw-bold mb-3">{selectedIssue.title}</h5>
                    <p className="text-muted mb-3">{selectedIssue.description}</p>
                    
                    <div className="mb-3">
                      <strong>Location:</strong>
                      <div className="d-flex align-items-center mt-1">
                        <FaMapMarkerAlt className="text-danger me-2" />
                        {selectedIssue.location}
                      </div>
                    </div>

                    {selectedIssue.images.length > 0 && (
                      <div className="mb-3">
                        <strong>Attached Images:</strong>
                        <div className="d-flex gap-2 mt-2">
                          {selectedIssue.images.map((image, index) => (
                            <div 
                              key={index}
                              className="border rounded p-3 text-center"
                              style={{ width: '100px', height: '80px' }}
                            >
                              <FaImage className="text-muted" />
                              <div className="small mt-1">{image}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </Col>
                  
                  <Col md={4}>
                    <Card className="border-0 bg-light">
                      <Card.Body>
                        <h6 className="fw-bold mb-3">Issue Information</h6>
                        
                        <div className="mb-2">
                          <strong>Status:</strong>
                          <Badge bg={getStatusColor(selectedIssue.status)} className="ms-2">
                            {selectedIssue.status.replace('-', ' ')}
                          </Badge>
                        </div>
                        
                        <div className="mb-2">
                          <strong>Priority:</strong>
                          <Badge bg={getPriorityColor(selectedIssue.priority)} className="ms-2">
                            {selectedIssue.priority.toUpperCase()}
                          </Badge>
                        </div>
                        
                        <div className="mb-2">
                          <strong>Category:</strong>
                          <div className="text-muted">{selectedIssue.category}</div>
                        </div>
                        
                        <div className="mb-2">
                          <strong>Reported:</strong>
                          <div className="text-muted">
                            {new Date(selectedIssue.reportedDate).toLocaleDateString()}
                          </div>
                        </div>
                        
                        <div className="mb-2">
                          <strong>Urgency Score:</strong>
                          <div className={`fw-bold text-${getUrgencyColor(selectedIssue.urgencyScore)}`}>
                            {selectedIssue.urgencyScore}/100
                          </div>
                        </div>
                      </Card.Body>
                    </Card>

                    <Card className="border-0 bg-light mt-3">
                      <Card.Body>
                        <h6 className="fw-bold mb-3">Reporter Information</h6>
                        
                        <div className="mb-2">
                          <FaUser className="me-2 text-muted" />
                          {selectedIssue.reportedBy.name}
                        </div>
                        
                        <div className="mb-2">
                          <FaEnvelope className="me-2 text-muted" />
                          {selectedIssue.reportedBy.email}
                        </div>
                        
                        <div className="mb-2">
                          <FaPhone className="me-2 text-muted" />
                          {selectedIssue.reportedBy.phone}
                        </div>
                      </Card.Body>
                    </Card>
                  </Col>
                </Row>
              </Tab>
              
              <Tab eventKey="updates" title="Updates">
                {selectedIssue.updates.length === 0 ? (
                  <div className="text-center py-4">
                    <FaClock className="text-muted mb-3" style={{ fontSize: '3rem' }} />
                    <h6 className="text-muted">No updates yet</h6>
                    <p className="text-muted">Updates will appear here as progress is made</p>
                  </div>
                ) : (
                  <div>
                    {selectedIssue.updates.map((update, index) => (
                      <Card key={index} className="mb-3 border-0 bg-light">
                        <Card.Body>
                          <div className="d-flex justify-content-between align-items-start mb-2">
                            <Badge bg={getStatusColor(update.status)}>
                              {update.status.replace('-', ' ')}
                            </Badge>
                            <small className="text-muted">
                              {new Date(update.date).toLocaleDateString()} - {update.by}
                            </small>
                          </div>
                          <p className="mb-0">{update.note}</p>
                        </Card.Body>
                      </Card>
                    ))}
                  </div>
                )}
              </Tab>
              
              <Tab eventKey="assignment" title="Assignment">
                <Row>
                  <Col md={6}>
                    <h6 className="fw-bold mb-3">Current Assignment</h6>
                    
                    {selectedIssue.assignedTo ? (
                      <div>
                        <div className="mb-2">
                          <strong>Department:</strong>
                          <div className="text-muted">{selectedIssue.assignedTo}</div>
                        </div>
                        
                        <div className="mb-2">
                          <strong>Assigned Staff:</strong>
                          <div className="text-muted">{selectedIssue.assignedStaff}</div>
                        </div>
                        
                        {selectedIssue.estimatedCompletion && (
                          <div className="mb-2">
                            <strong>Estimated Completion:</strong>
                            <div className="text-muted">
                              {new Date(selectedIssue.estimatedCompletion).toLocaleDateString()}
                            </div>
                          </div>
                        )}
                      </div>
                    ) : (
                      <Alert variant="warning">
                        <FaExclamationTriangle className="me-2" />
                        This issue has not been assigned yet.
                      </Alert>
                    )}
                  </Col>
                  
                  <Col md={6}>
                    <h6 className="fw-bold mb-3">Community Engagement</h6>
                    
                    <div className="mb-2">
                      <strong>Comments:</strong>
                      <span className="ms-2">{selectedIssue.citizenComments}</span>
                    </div>
                    
                    <div className="mb-2">
                      <strong>Likes:</strong>
                      <span className="ms-2">{selectedIssue.likes}</span>
                    </div>
                  </Col>
                </Row>
              </Tab>
            </Tabs>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-secondary" onClick={() => setShowDetailsModal(false)}>
            Close
          </Button>
          <Button 
            variant="primary"
            onClick={() => {
              setShowDetailsModal(false);
              handleAssignIssue(selectedIssue);
            }}
          >
            <FaEdit className="me-2" />
            Edit Assignment
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Assignment Modal */}
      <Modal show={showAssignModal} onHide={() => setShowAssignModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title className="fw-bold">
            Assign Issue: {selectedIssue?.id}
          </Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleAssignmentSubmit}>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label className="fw-medium">Department</Form.Label>
              <Form.Select
                value={assignmentData.department}
                onChange={(e) => setAssignmentData(prev => ({ ...prev, department: e.target.value }))}
                required
              >
                <option value="">Select Department</option>
                {departments.map(dept => (
                  <option key={dept} value={dept}>{dept}</option>
                ))}
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label className="fw-medium">Assign to Staff</Form.Label>
              <Form.Select
                value={assignmentData.assignTo}
                onChange={(e) => setAssignmentData(prev => ({ ...prev, assignTo: e.target.value }))}
                required
              >
                <option value="">Select Staff Member</option>
                {staff
                  .filter(s => !assignmentData.department || s.department === assignmentData.department)
                  .map(staffMember => (
                    <option key={staffMember.name} value={staffMember.name}>
                      {staffMember.name}
                    </option>
                  ))
                }
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label className="fw-medium">Priority Level</Form.Label>
              <Form.Select
                value={assignmentData.priority}
                onChange={(e) => setAssignmentData(prev => ({ ...prev, priority: e.target.value }))}
                required
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
                <option value="urgent">Urgent</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label className="fw-medium">Estimated Completion Date</Form.Label>
              <Form.Control
                type="date"
                value={assignmentData.estimatedCompletion}
                onChange={(e) => setAssignmentData(prev => ({ ...prev, estimatedCompletion: e.target.value }))}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label className="fw-medium">Assignment Notes</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={assignmentData.notes}
                onChange={(e) => setAssignmentData(prev => ({ ...prev, notes: e.target.value }))}
                placeholder="Add any special instructions or notes for the assigned staff..."
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="outline-secondary" onClick={() => setShowAssignModal(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="success">
              <FaTasks className="me-2" />
              Assign Issue
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
};

export default ManageIssues;