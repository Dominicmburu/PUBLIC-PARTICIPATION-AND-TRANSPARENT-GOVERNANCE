import React, { useState } from 'react';
import { Container, Row, Col, Card, Table, Badge, Button, Dropdown } from 'react-bootstrap';
import { 
  FaUsers, 
  FaExclamationTriangle, 
  FaVoteYea, 
  FaComments,
  FaChartLine,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaEye,
  FaEdit,
  FaCheck,
  FaClock,
  FaArrowUp,
  FaArrowDown
} from 'react-icons/fa';
import Sidebar from '../common/Sidebar';

const AdminDashboard = () => {
  const [timeFrame, setTimeFrame] = useState('week');

  const stats = {
    totalUsers: 2847,
    activeIssues: 23,
    activeConsultations: 3,
    forumDiscussions: 156,
    userGrowth: 12.5,
    issueResolution: 78.3,
    participationRate: 64.7,
    responseTime: 2.4
  };

  const recentIssues = [
    {
      id: 'IR001',
      title: 'Pothole on Kimathi Way',
      location: 'Nyeri Town',
      category: 'Roads',
      priority: 'high',
      status: 'in-progress',
      reportedBy: 'John Mwangi',
      reportedDate: '2025-01-10',
      assignedTo: 'Roads Department'
    },
    {
      id: 'IR002',
      title: 'Street Light Not Working',
      location: 'Rware Estate',
      category: 'Lighting',
      priority: 'medium',
      status: 'pending',
      reportedBy: 'Mary Wanjiku',
      reportedDate: '2025-01-12',
      assignedTo: 'Electrical Team'
    },
    {
      id: 'IR003',
      title: 'Water Pipe Burst',
      location: 'Kamakwa',
      category: 'Water',
      priority: 'urgent',
      status: 'resolved',
      reportedBy: 'Peter Njuguna',
      reportedDate: '2025-01-08',
      assignedTo: 'Water Department'
    }
  ];

  const activeConsultations = [
    {
      id: 1,
      title: 'County Budget 2025',
      participants: 1247,
      responses: 892,
      deadline: '2025-01-30',
      status: 'active'
    },
    {
      id: 2,
      title: 'Transport Planning',
      participants: 567,
      responses: 234,
      deadline: '2025-02-15',
      status: 'active'
    }
  ];

  const topContributors = [
    { name: 'Mary Wanjiku', contributions: 45, type: 'reports' },
    { name: 'John Mwangi', contributions: 38, type: 'forum' },
    { name: 'Grace Njeri', contributions: 32, type: 'consultations' },
    { name: 'Peter Kamau', contributions: 28, type: 'reports' }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'resolved': return 'success';
      case 'in-progress': return 'warning';
      case 'pending': return 'danger';
      case 'urgent': return 'danger';
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

  const quickActions = [
    {
      icon: FaExclamationTriangle,
      title: 'Manage Issues',
      description: 'Review and respond to citizen reports',
      link: '/admin/issues',
      color: '#ef4444'
    },
    {
      icon: FaVoteYea,
      title: 'Create Consultation',
      description: 'Launch new policy consultation',
      link: '/admin/consultations',
      color: '#8b5cf6'
    },
    {
      icon: FaChartLine,
      title: 'View Analytics',
      description: 'Detailed platform analytics',
      link: '/admin/analytics',
      color: '#f59e0b'
    }
  ];

  return (
    <div className="admin-dashboard">
      <Container fluid className="p-4">
        {/* Header */}
        <Row className="mb-4">
          <Col>
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <h1 className="h3 fw-bold text-dark mb-2">
                  Admin Dashboard 🏛️
                </h1>
                <p className="text-muted">
                  Overview of platform activity and citizen engagement
                </p>
              </div>
              
              <Dropdown>
                <Dropdown.Toggle variant="outline-primary" style={{ borderRadius: '12px' }}>
                  <FaCalendarAlt className="me-2" />
                  Last {timeFrame}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item onClick={() => setTimeFrame('day')}>Last Day</Dropdown.Item>
                  <Dropdown.Item onClick={() => setTimeFrame('week')}>Last Week</Dropdown.Item>
                  <Dropdown.Item onClick={() => setTimeFrame('month')}>Last Month</Dropdown.Item>
                  <Dropdown.Item onClick={() => setTimeFrame('year')}>Last Year</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </Col>
        </Row>

        {/* Key Metrics */}
        <Row className="mb-4">
          <Col lg={3} md={6} className="mb-3">
            <Card className="border-0 shadow-sm h-100">
              <Card.Body>
                <div className="d-flex align-items-center">
                  <div 
                    className="me-3 d-flex align-items-center justify-content-center"
                    style={{
                      width: '50px',
                      height: '50px',
                      background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
                      borderRadius: '12px',
                      color: 'white'
                    }}
                  >
                    <FaUsers />
                  </div>
                  <div className="flex-grow-1">
                    <h4 className="fw-bold mb-0">{stats.totalUsers.toLocaleString()}</h4>
                    <p className="text-muted mb-0">Total Users</p>
                    <small className="text-success">
                      <FaArrowUp className="me-1" />
                      +{stats.userGrowth}% from last {timeFrame}
                    </small>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>

          <Col lg={3} md={6} className="mb-3">
            <Card className="border-0 shadow-sm h-100">
              <Card.Body>
                <div className="d-flex align-items-center">
                  <div 
                    className="me-3 d-flex align-items-center justify-content-center"
                    style={{
                      width: '50px',
                      height: '50px',
                      background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
                      borderRadius: '12px',
                      color: 'white'
                    }}
                  >
                    <FaExclamationTriangle />
                  </div>
                  <div className="flex-grow-1">
                    <h4 className="fw-bold mb-0">{stats.activeIssues}</h4>
                    <p className="text-muted mb-0">Active Issues</p>
                    <small className="text-success">
                      <FaArrowUp className="me-1" />
                      {stats.issueResolution}% resolution rate
                    </small>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>

          <Col lg={3} md={6} className="mb-3">
            <Card className="border-0 shadow-sm h-100">
              <Card.Body>
                <div className="d-flex align-items-center">
                  <div 
                    className="me-3 d-flex align-items-center justify-content-center"
                    style={{
                      width: '50px',
                      height: '50px',
                      background: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
                      borderRadius: '12px',
                      color: 'white'
                    }}
                  >
                    <FaVoteYea />
                  </div>
                  <div className="flex-grow-1">
                    <h4 className="fw-bold mb-0">{stats.activeConsultations}</h4>
                    <p className="text-muted mb-0">Active Consultations</p>
                    <small className="text-info">
                      {stats.participationRate}% participation rate
                    </small>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>

          <Col lg={3} md={6} className="mb-3">
            <Card className="border-0 shadow-sm h-100">
              <Card.Body>
                <div className="d-flex align-items-center">
                  <div 
                    className="me-3 d-flex align-items-center justify-content-center"
                    style={{
                      width: '50px',
                      height: '50px',
                      background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
                      borderRadius: '12px',
                      color: 'white'
                    }}
                  >
                    <FaClock />
                  </div>
                  <div className="flex-grow-1">
                    <h4 className="fw-bold mb-0">{stats.responseTime}h</h4>
                    <p className="text-muted mb-0">Avg Response Time</p>
                    <small className="text-success">
                      <FaArrowDown className="me-1" />
                      15% faster response
                    </small>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Row>
          {/* Recent Issues */}
          <Col lg={8} className="mb-4">
            <Card className="border-0 shadow-sm h-100">
              <Card.Header className="bg-white border-0 pb-0">
                <div className="d-flex justify-content-between align-items-center">
                  <h5 className="fw-bold mb-0">Recent Issues</h5>
                  <Button 
                    variant="outline-primary" 
                    size="sm"
                    href="/admin/issues"
                    style={{ borderRadius: '8px' }}
                  >
                    View All
                  </Button>
                </div>
              </Card.Header>
              <Card.Body>
                <div className="table-responsive">
                  <Table hover className="align-middle">
                    <thead className="table-light">
                      <tr>
                        <th>Issue ID</th>
                        <th>Title</th>
                        <th>Location</th>
                        <th>Priority</th>
                        <th>Status</th>
                        <th>Assigned To</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentIssues.map((issue) => (
                        <tr key={issue.id}>
                          <td>
                            <code className="text-primary">{issue.id}</code>
                          </td>
                          <td>
                            <div>
                              <div className="fw-medium">{issue.title}</div>
                              <small className="text-muted">
                                by {issue.reportedBy}
                              </small>
                            </div>
                          </td>
                          <td>
                            <FaMapMarkerAlt className="text-muted me-1" />
                            {issue.location}
                          </td>
                          <td>
                            <Badge bg={getPriorityColor(issue.priority)}>
                              {issue.priority}
                            </Badge>
                          </td>
                          <td>
                            <Badge bg={getStatusColor(issue.status)}>
                              {issue.status.replace('-', ' ')}
                            </Badge>
                          </td>
                          <td>
                            <small className="text-muted">{issue.assignedTo}</small>
                          </td>
                          <td>
                            <div className="d-flex gap-1">
                              <Button variant="outline-primary" size="sm">
                                <FaEye />
                              </Button>
                              <Button variant="outline-success" size="sm">
                                <FaEdit />
                              </Button>
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

          {/* Quick Actions & Stats */}
          <Col lg={4}>
            {/* Quick Actions */}
            <Card className="border-0 shadow-sm mb-4">
              <Card.Header className="bg-white border-0 pb-0">
                <h5 className="fw-bold mb-0">Quick Actions</h5>
              </Card.Header>
              <Card.Body>
                <div className="d-grid gap-3">
                  {quickActions.map((action, index) => {
                    const IconComponent = action.icon;
                    return (
                      <Button
                        key={index}
                        variant="outline-primary"
                        className="d-flex align-items-center p-3 text-start"
                        style={{ borderRadius: '12px' }}
                        href={action.link}
                      >
                        <div 
                          className="me-3 d-flex align-items-center justify-content-center"
                          style={{
                            width: '40px',
                            height: '40px',
                            background: action.color,
                            borderRadius: '10px',
                            color: 'white'
                          }}
                        >
                          <IconComponent />
                        </div>
                        <div>
                          <div className="fw-bold text-dark">{action.title}</div>
                          <small className="text-muted">{action.description}</small>
                        </div>
                      </Button>
                    );
                  })}
                </div>
              </Card.Body>
            </Card>

            {/* Active Consultations */}
            <Card className="border-0 shadow-sm mb-4">
              <Card.Header className="bg-white border-0 pb-0">
                <h5 className="fw-bold mb-0">Active Consultations</h5>
              </Card.Header>
              <Card.Body>
                {activeConsultations.map((consultation) => {
                  const participationRate = (consultation.responses / consultation.participants) * 100;
                  return (
                    <div key={consultation.id} className="mb-3 pb-3 border-bottom">
                      <h6 className="fw-bold text-dark mb-2">{consultation.title}</h6>
                      <div className="d-flex justify-content-between mb-2">
                        <small className="text-muted">
                          {consultation.responses}/{consultation.participants} responses
                        </small>
                        <small className="fw-bold text-primary">
                          {participationRate.toFixed(1)}%
                        </small>
                      </div>
                      <div className="progress mb-2" style={{ height: '6px' }}>
                        <div 
                          className="progress-bar"
                          style={{ 
                            width: `${participationRate}%`,
                            background: participationRate > 50 ? '#22c55e' : '#f59e0b'
                          }}
                        />
                      </div>
                      <small className="text-muted">
                        Deadline: {new Date(consultation.deadline).toLocaleDateString()}
                      </small>
                    </div>
                  );
                })}
                <Button 
                  variant="link" 
                  className="p-0 text-primary"
                  href="/admin/consultations"
                >
                  Manage All Consultations
                </Button>
              </Card.Body>
            </Card>

            {/* Top Contributors */}
            <Card className="border-0 shadow-sm">
              <Card.Header className="bg-white border-0 pb-0">
                <h5 className="fw-bold mb-0">Top Contributors</h5>
              </Card.Header>
              <Card.Body>
                {topContributors.map((contributor, index) => (
                  <div key={index} className="d-flex align-items-center mb-3">
                    <div 
                      className="me-3 d-flex align-items-center justify-content-center"
                      style={{
                        width: '35px',
                        height: '35px',
                        background: index === 0 ? '#ffd700' : 
                                   index === 1 ? '#c0c0c0' : 
                                   index === 2 ? '#cd7f32' : '#e2e8f0',
                        borderRadius: '50%',
                        color: index < 3 ? 'white' : '#64748b',
                        fontSize: '0.8rem',
                        fontWeight: 'bold'
                      }}
                    >
                      {index + 1}
                    </div>
                    <div className="flex-grow-1">
                      <div className="fw-medium text-dark">{contributor.name}</div>
                      <small className="text-muted">
                        {contributor.contributions} {contributor.type}
                      </small>
                    </div>
                    <Badge 
                      bg={contributor.type === 'reports' ? 'danger' : 
                          contributor.type === 'forum' ? 'success' : 'primary'}
                      pill
                    >
                      {contributor.contributions}
                    </Badge>
                  </div>
                ))}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default AdminDashboard;