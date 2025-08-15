import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Badge, Alert, ProgressBar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { 
  FaPlus, 
  FaExclamationTriangle, 
  FaVoteYea, 
  FaComments, 
  FaCheckCircle,
  FaClock,
  FaEye,
  FaBell,
  FaChartLine,
  FaMapMarkerAlt,
  FaCalendarAlt
} from 'react-icons/fa';

const CitizenDashboard = () => {
  const [stats, setStats] = useState({
    totalReports: 12,
    resolvedIssues: 8,
    activeConsultations: 3,
    forumPosts: 25
  });

  const [recentActivity, setRecentActivity] = useState([
    {
      id: 1,
      type: 'issue',
      title: 'Pothole on Kimathi Way',
      status: 'resolved',
      date: '2 days ago',
      location: 'Nyeri Town'
    },
    {
      id: 2,
      type: 'consultation',
      title: '2025 Budget Consultation',
      status: 'active',
      date: '1 week ago',
      deadline: '5 days remaining'
    },
    {
      id: 3,
      type: 'forum',
      title: 'Healthcare Services Discussion',
      status: 'active',
      date: '3 days ago',
      replies: 8
    }
  ]);

  const [activeConsultations, setActiveConsultations] = useState([
    {
      id: 1,
      title: 'County Budget Allocation 2025',
      description: 'Share your priorities for next year\'s budget allocation across different sectors.',
      deadline: '2025-01-30',
      participants: 1247,
      category: 'Budget'
    },
    {
      id: 2,
      title: 'Public Transport Route Planning',
      description: 'Help us design better public transport routes for improved connectivity.',
      deadline: '2025-02-15',
      participants: 892,
      category: 'Transport'
    },
    {
      id: 3,
      title: 'Environmental Conservation Policy',
      description: 'Contribute to the development of our new environmental protection policies.',
      deadline: '2025-02-20',
      participants: 567,
      category: 'Environment'
    }
  ]);

  const [notifications, setNotifications] = useState([
    {
      id: 1,
      message: 'Your reported pothole issue has been marked as resolved',
      type: 'success',
      time: '2 hours ago'
    },
    {
      id: 2,
      message: 'New consultation: Youth Development Programs',
      type: 'info',
      time: '1 day ago'
    }
  ]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'resolved': return 'success';
      case 'in-progress': return 'warning';
      case 'active': return 'primary';
      default: return 'secondary';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'resolved': return <FaCheckCircle />;
      case 'in-progress': return <FaClock />;
      case 'active': return <FaEye />;
      default: return <FaClock />;
    }
  };

  const quickActions = [
    {
      icon: FaExclamationTriangle,
      title: 'Report Issue',
      description: 'Report infrastructure or community issues',
      link: '/citizen/report-issue',
      color: '#ef4444',
      gradient: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)'
    },
    {
      icon: FaVoteYea,
      title: 'Join Consultation',
      description: 'Participate in policy discussions',
      link: '/citizen/consultations',
      color: '#8b5cf6',
      gradient: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)'
    },
    {
      icon: FaComments,
      title: 'Forum Discussion',
      description: 'Join community conversations',
      link: '/citizen/forum',
      color: '#22c55e',
      gradient: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)'
    }
  ];

  return (
    <div className="citizen-dashboard">
      <Container fluid className="p-4">
        {/* Header */}
        <Row className="mb-4">
          <Col>
            <h1 className="h3 fw-bold text-dark mb-2">
              Welcome back, Citizen! 👋
            </h1>
            <p className="text-muted">
              Stay updated with your participation and community activities
            </p>
          </Col>
        </Row>

        {/* Notifications */}
        {notifications.length > 0 && (
          <Row className="mb-4">
            <Col>
              {notifications.map((notification) => (
                <Alert 
                  key={notification.id}
                  variant={notification.type === 'success' ? 'success' : 'info'}
                  dismissible
                  className="d-flex align-items-center"
                  style={{ borderRadius: '12px' }}
                >
                  <FaBell className="me-2" />
                  <div className="flex-grow-1">
                    {notification.message}
                    <small className="text-muted ms-2">• {notification.time}</small>
                  </div>
                </Alert>
              ))}
            </Col>
          </Row>
        )}

        {/* Statistics Cards */}
        <Row className="mb-4">
          <Col lg={3} md={6} className="mb-3">
            <Card className="h-100 border-0 shadow-sm">
              <Card.Body className="text-center">
                <div 
                  className="mb-3 mx-auto d-flex align-items-center justify-content-center"
                  style={{
                    width: '60px',
                    height: '60px',
                    background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
                    borderRadius: '16px',
                    color: 'white'
                  }}
                >
                  <FaExclamationTriangle style={{ fontSize: '1.5rem' }} />
                </div>
                <h3 className="fw-bold text-dark">{stats.totalReports}</h3>
                <p className="text-muted mb-0">Total Reports</p>
              </Card.Body>
            </Card>
          </Col>
          
          <Col lg={3} md={6} className="mb-3">
            <Card className="h-100 border-0 shadow-sm">
              <Card.Body className="text-center">
                <div 
                  className="mb-3 mx-auto d-flex align-items-center justify-content-center"
                  style={{
                    width: '60px',
                    height: '60px',
                    background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
                    borderRadius: '16px',
                    color: 'white'
                  }}
                >
                  <FaCheckCircle style={{ fontSize: '1.5rem' }} />
                </div>
                <h3 className="fw-bold text-dark">{stats.resolvedIssues}</h3>
                <p className="text-muted mb-0">Resolved Issues</p>
              </Card.Body>
            </Card>
          </Col>
          
          <Col lg={3} md={6} className="mb-3">
            <Card className="h-100 border-0 shadow-sm">
              <Card.Body className="text-center">
                <div 
                  className="mb-3 mx-auto d-flex align-items-center justify-content-center"
                  style={{
                    width: '60px',
                    height: '60px',
                    background: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
                    borderRadius: '16px',
                    color: 'white'
                  }}
                >
                  <FaVoteYea style={{ fontSize: '1.5rem' }} />
                </div>
                <h3 className="fw-bold text-dark">{stats.activeConsultations}</h3>
                <p className="text-muted mb-0">Active Consultations</p>
              </Card.Body>
            </Card>
          </Col>
          
          <Col lg={3} md={6} className="mb-3">
            <Card className="h-100 border-0 shadow-sm">
              <Card.Body className="text-center">
                <div 
                  className="mb-3 mx-auto d-flex align-items-center justify-content-center"
                  style={{
                    width: '60px',
                    height: '60px',
                    background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
                    borderRadius: '16px',
                    color: 'white'
                  }}
                >
                  <FaComments style={{ fontSize: '1.5rem' }} />
                </div>
                <h3 className="fw-bold text-dark">{stats.forumPosts}</h3>
                <p className="text-muted mb-0">Forum Contributions</p>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Row>
          {/* Quick Actions */}
          <Col lg={4} className="mb-4">
            <Card className="h-100 border-0 shadow-sm">
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
                        as={Link}
                        to={action.link}
                        variant="outline-primary"
                        className="d-flex align-items-center p-3 text-start"
                        style={{ 
                          borderRadius: '12px',
                          border: '2px solid #e2e8f0',
                          background: 'white'
                        }}
                      >
                        <div 
                          className="me-3 d-flex align-items-center justify-content-center"
                          style={{
                            width: '40px',
                            height: '40px',
                            background: action.gradient,
                            borderRadius: '10px',
                            color: 'white'
                          }}
                        >
                          <IconComponent />
                        </div>
                        <div className="text-dark">
                          <div className="fw-bold">{action.title}</div>
                          <small className="text-muted">{action.description}</small>
                        </div>
                      </Button>
                    );
                  })}
                </div>
              </Card.Body>
            </Card>
          </Col>

          {/* Recent Activity */}
          <Col lg={4} className="mb-4">
            <Card className="h-100 border-0 shadow-sm">
              <Card.Header className="bg-white border-0 pb-0">
                <h5 className="fw-bold mb-0">Recent Activity</h5>
              </Card.Header>
              <Card.Body>
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="d-flex align-items-center mb-3 pb-3 border-bottom">
                    <div 
                      className="me-3 d-flex align-items-center justify-content-center"
                      style={{
                        width: '35px',
                        height: '35px',
                        background: `var(--${getStatusColor(activity.status)})`,
                        borderRadius: '8px',
                        color: 'white',
                        fontSize: '0.8rem'
                      }}
                    >
                      {getStatusIcon(activity.status)}
                    </div>
                    <div className="flex-grow-1">
                      <div className="fw-medium text-dark">{activity.title}</div>
                      <div className="d-flex align-items-center">
                        <small className="text-muted me-2">
                          <FaCalendarAlt className="me-1" />
                          {activity.date}
                        </small>
                        {activity.location && (
                          <small className="text-muted">
                            <FaMapMarkerAlt className="me-1" />
                            {activity.location}
                          </small>
                        )}
                      </div>
                      <Badge bg={getStatusColor(activity.status)} className="mt-1">
                        {activity.status.replace('-', ' ')}
                      </Badge>
                    </div>
                  </div>
                ))}
                <Button 
                  variant="link" 
                  className="p-0 text-primary"
                  style={{ fontSize: '0.9rem' }}
                >
                  View All Activity
                </Button>
              </Card.Body>
            </Card>
          </Col>

          {/* Active Consultations */}
          <Col lg={4} className="mb-4">
            <Card className="h-100 border-0 shadow-sm">
              <Card.Header className="bg-white border-0 pb-0">
                <h5 className="fw-bold mb-0">Active Consultations</h5>
              </Card.Header>
              <Card.Body>
                {activeConsultations.slice(0, 2).map((consultation) => {
                  const daysLeft = Math.ceil((new Date(consultation.deadline) - new Date()) / (1000 * 60 * 60 * 24));
                  return (
                    <div key={consultation.id} className="mb-4 pb-3 border-bottom">
                      <div className="d-flex justify-content-between align-items-start mb-2">
                        <Badge bg="primary" className="mb-2">
                          {consultation.category}
                        </Badge>
                        <small className="text-muted">{daysLeft} days left</small>
                      </div>
                      <h6 className="fw-bold text-dark mb-2">{consultation.title}</h6>
                      <p className="text-muted small mb-2">
                        {consultation.description.substring(0, 80)}...
                      </p>
                      <div className="d-flex justify-content-between align-items-center">
                        <small className="text-muted">
                          <FaChartLine className="me-1" />
                          {consultation.participants} participants
                        </small>
                        <Button 
                          size="sm" 
                          variant="primary"
                          style={{ borderRadius: '8px' }}
                        >
                          Participate
                        </Button>
                      </div>
                    </div>
                  );
                })}
                <Button 
                  as={Link}
                  to="/citizen/consultations"
                  variant="link" 
                  className="p-0 text-primary"
                  style={{ fontSize: '0.9rem' }}
                >
                  View All Consultations
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default CitizenDashboard;