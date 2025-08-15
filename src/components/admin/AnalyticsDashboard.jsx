import React, { useState } from 'react';
import { 
  Container, 
  Row, 
  Col, 
  Card, 
  Dropdown,
  Badge,
  Table,
  ProgressBar
} from 'react-bootstrap';
import { 
  FaUsers, 
  FaExclamationTriangle, 
  FaVoteYea, 
  FaComments,
  FaChartLine,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaDownload,
  FaEye
} from 'react-icons/fa';

const AnalyticsDashboard = () => {
  const [timeFrame, setTimeFrame] = useState('week');

  const overallStats = {
    totalUsers: 2847,
    activeUsers: 1245,
    totalIssues: 156,
    resolvedIssues: 123,
    activeConsultations: 3,
    forumPosts: 234,
    avgResponseTime: 2.4,
    userGrowth: 12.5,
    issueResolution: 78.8,
    participationRate: 64.2
  };

  const issuesByCategory = [
    { category: 'Roads & Infrastructure', count: 45, percentage: 28.8, trend: 'up' },
    { category: 'Water & Sanitation', count: 32, percentage: 20.5, trend: 'down' },
    { category: 'Street Lighting', count: 28, percentage: 17.9, trend: 'up' },
    { category: 'Waste Management', count: 24, percentage: 15.4, trend: 'stable' },
    { category: 'Public Safety', count: 18, percentage: 11.5, trend: 'up' },
    { category: 'Public Facilities', count: 9, percentage: 5.8, trend: 'down' }
  ];

  const consultationStats = [
    {
      title: 'County Budget 2025',
      participants: 1247,
      responses: 892,
      completionRate: 71.5,
      avgTimeSpent: '12:30',
      engagement: 'high'
    },
    {
      title: 'Transport Planning',
      participants: 567,
      responses: 234,
      completionRate: 41.3,
      avgTimeSpent: '8:45',
      engagement: 'medium'
    },
    {
      title: 'Environment Policy',
      participants: 342,
      responses: 198,
      completionRate: 57.9,
      avgTimeSpent: '15:20',
      engagement: 'high'
    }
  ];

  const geographicData = [
    { constituency: 'Nyeri Town', issues: 42, users: 856, participation: 78.2 },
    { constituency: 'Othaya', issues: 28, users: 634, participation: 65.4 },
    { constituency: 'Tetu', issues: 24, users: 523, participation: 58.9 },
    { constituency: 'Mukurwe-ini', issues: 21, users: 445, participation: 52.3 },
    { constituency: 'Kieni East', issues: 22, users: 398, participation: 49.7 },
    { constituency: 'Kieni West', issues: 19, users: 291, participation: 45.1 }
  ];

  const userDemographics = [
    { ageGroup: '18-25', count: 542, percentage: 19.0 },
    { ageGroup: '26-35', count: 867, percentage: 30.4 },
    { ageGroup: '36-45', count: 734, percentage: 25.8 },
    { ageGroup: '46-55', count: 456, percentage: 16.0 },
    { ageGroup: '55+', count: 248, percentage: 8.7 }
  ];

  const getTrendIcon = (trend) => {
    switch (trend) {
      case 'up': return <FaChartLine className="text-success" />;
      case 'down': return <FaChartLine className="text-danger" />;
      default: return <span className="text-muted">—</span>;
    }
  };

  const getEngagementColor = (engagement) => {
    switch (engagement) {
      case 'high': return 'success';
      case 'medium': return 'warning';
      case 'low': return 'danger';
      default: return 'secondary';
    }
  };

  return (
    <div className="analytics-dashboard">
      <Container fluid className="p-4">
        {/* Header */}
        <Row className="mb-4">
          <Col>
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <h1 className="h3 fw-bold text-dark mb-2">
                  Analytics Dashboard 📊
                </h1>
                <p className="text-muted">
                  Comprehensive insights into platform usage and citizen engagement
                </p>
              </div>
              
              <div className="d-flex gap-2">
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
                
                <Dropdown>
                  <Dropdown.Toggle variant="outline-success" style={{ borderRadius: '12px' }}>
                    <FaDownload className="me-2" />
                    Export
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item>Export as PDF</Dropdown.Item>
                    <Dropdown.Item>Export as Excel</Dropdown.Item>
                    <Dropdown.Item>Export as CSV</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </div>
            </div>
          </Col>
        </Row>

        {/* Key Metrics */}
        <Row className="mb-4">
          <Col lg={3} md={6} className="mb-3">
            <Card className="border-0 shadow-sm h-100">
              <Card.Body className="text-center">
                <div 
                  className="mx-auto mb-3 d-flex align-items-center justify-content-center"
                  style={{
                    width: '60px',
                    height: '60px',
                    background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
                    borderRadius: '16px',
                    color: 'white'
                  }}
                >
                  <FaUsers style={{ fontSize: '1.5rem' }} />
                </div>
                <h3 className="fw-bold text-dark">{overallStats.totalUsers.toLocaleString()}</h3>
                <p className="text-muted mb-1">Total Users</p>
                <div className="d-flex align-items-center justify-content-center">
                  <FaChartLine className="text-success me-1" />
                  <small className="text-success fw-bold">+{overallStats.userGrowth}%</small>
                </div>
              </Card.Body>
            </Card>
          </Col>
          
          <Col lg={3} md={6} className="mb-3">
            <Card className="border-0 shadow-sm h-100">
              <Card.Body className="text-center">
                <div 
                  className="mx-auto mb-3 d-flex align-items-center justify-content-center"
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
                <h3 className="fw-bold text-dark">{overallStats.totalIssues}</h3>
                <p className="text-muted mb-1">Total Issues</p>
                <div className="d-flex align-items-center justify-content-center">
                  <small className="text-success fw-bold">{overallStats.issueResolution}% Resolved</small>
                </div>
              </Card.Body>
            </Card>
          </Col>
          
          <Col lg={3} md={6} className="mb-3">
            <Card className="border-0 shadow-sm h-100">
              <Card.Body className="text-center">
                <div 
                  className="mx-auto mb-3 d-flex align-items-center justify-content-center"
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
                <h3 className="fw-bold text-dark">{overallStats.activeConsultations}</h3>
                <p className="text-muted mb-1">Active Consultations</p>
                <div className="d-flex align-items-center justify-content-center">
                  <small className="text-info fw-bold">{overallStats.participationRate}% Participation</small>
                </div>
              </Card.Body>
            </Card>
          </Col>
          
          <Col lg={3} md={6} className="mb-3">
            <Card className="border-0 shadow-sm h-100">
              <Card.Body className="text-center">
                <div 
                  className="mx-auto mb-3 d-flex align-items-center justify-content-center"
                  style={{
                    width: '60px',
                    height: '60px',
                    background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
                    borderRadius: '16px',
                    color: 'white'
                  }}
                >
                  <FaChartLine style={{ fontSize: '1.5rem' }} />
                </div>
                <h3 className="fw-bold text-dark">{overallStats.avgResponseTime}h</h3>
                <p className="text-muted mb-1">Avg Response Time</p>
                <div className="d-flex align-items-center justify-content-center">
                  <FaChartLine className="text-success me-1" />
                  <small className="text-success fw-bold">15% Faster</small>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Row>
          {/* Issues by Category */}
          <Col lg={6} className="mb-4">
            <Card className="border-0 shadow-sm h-100">
              <Card.Header className="bg-white border-0">
                <h5 className="fw-bold mb-0">Issues by Category</h5>
              </Card.Header>
              <Card.Body>
                {issuesByCategory.map((item, index) => (
                  <div key={index} className="mb-3">
                    <div className="d-flex justify-content-between align-items-center mb-1">
                      <span className="fw-medium">{item.category}</span>
                      <div className="d-flex align-items-center gap-2">
                        <span className="fw-bold">{item.count}</span>
                        {getTrendIcon(item.trend)}
                      </div>
                    </div>
                    <ProgressBar 
                      now={item.percentage} 
                      style={{ height: '8px' }}
                      variant={index < 2 ? 'danger' : index < 4 ? 'warning' : 'info'}
                    />
                    <small className="text-muted">{item.percentage}% of total issues</small>
                  </div>
                ))}
              </Card.Body>
            </Card>
          </Col>

          {/* Consultation Performance */}
          <Col lg={6} className="mb-4">
            <Card className="border-0 shadow-sm h-100">
              <Card.Header className="bg-white border-0">
                <h5 className="fw-bold mb-0">Consultation Performance</h5>
              </Card.Header>
              <Card.Body>
                <div className="table-responsive">
                  <Table hover className="align-middle">
                    <thead className="table-light">
                      <tr>
                        <th>Consultation</th>
                        <th>Completion</th>
                        <th>Engagement</th>
                      </tr>
                    </thead>
                    <tbody>
                      {consultationStats.map((consultation, index) => (
                        <tr key={index}>
                          <td>
                            <div>
                              <div className="fw-medium">{consultation.title}</div>
                              <small className="text-muted">
                                {consultation.responses}/{consultation.participants} responses
                              </small>
                            </div>
                          </td>
                          <td>
                            <div>
                              <div className="fw-bold">{consultation.completionRate}%</div>
                              <ProgressBar 
                                now={consultation.completionRate} 
                                style={{ height: '4px' }}
                                variant={consultation.completionRate > 60 ? 'success' : 'warning'}
                              />
                            </div>
                          </td>
                          <td>
                            <Badge bg={getEngagementColor(consultation.engagement)}>
                              {consultation.engagement}
                            </Badge>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </div>
              </Card.Body>
            </Card>
          </Col>

          {/* Geographic Distribution */}
          <Col lg={6} className="mb-4">
            <Card className="border-0 shadow-sm h-100">
              <Card.Header className="bg-white border-0">
                <h5 className="fw-bold mb-0">Geographic Distribution</h5>
              </Card.Header>
              <Card.Body>
                <div className="table-responsive">
                  <Table hover className="align-middle">
                    <thead className="table-light">
                      <tr>
                        <th>Constituency</th>
                        <th>Users</th>
                        <th>Issues</th>
                        <th>Participation</th>
                      </tr>
                    </thead>
                    <tbody>
                      {geographicData.map((area, index) => (
                        <tr key={index}>
                          <td>
                            <div className="d-flex align-items-center">
                              <FaMapMarkerAlt className="text-primary me-2" />
                              {area.constituency}
                            </div>
                          </td>
                          <td className="fw-bold">{area.users}</td>
                          <td>{area.issues}</td>
                          <td>
                            <div>
                              <span className="fw-bold">{area.participation}%</span>
                              <ProgressBar 
                                now={area.participation} 
                                style={{ height: '4px' }}
                                variant={area.participation > 60 ? 'success' : area.participation > 40 ? 'warning' : 'danger'}
                              />
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

          {/* User Demographics */}
          <Col lg={6} className="mb-4">
            <Card className="border-0 shadow-sm h-100">
              <Card.Header className="bg-white border-0">
                <h5 className="fw-bold mb-0">User Demographics</h5>
              </Card.Header>
              <Card.Body>
                {userDemographics.map((demo, index) => (
                  <div key={index} className="mb-3">
                    <div className="d-flex justify-content-between align-items-center mb-1">
                      <span className="fw-medium">Age {demo.ageGroup}</span>
                      <div className="d-flex align-items-center gap-2">
                        <span className="fw-bold">{demo.count}</span>
                        <small className="text-muted">({demo.percentage}%)</small>
                      </div>
                    </div>
                    <ProgressBar 
                      now={demo.percentage} 
                      style={{ height: '8px' }}
                      variant="info"
                    />
                  </div>
                ))}
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Additional Insights */}
        <Row>
          <Col>
            <Card className="border-0 shadow-sm">
              <Card.Header className="bg-primary text-white">
                <h5 className="fw-bold mb-0">📈 Key Insights</h5>
              </Card.Header>
              <Card.Body>
                <Row>
                  <Col md={4}>
                    <div className="text-center p-3">
                      <div className="h4 fw-bold text-success">Peak Usage</div>
                      <div className="text-muted">Wednesday 2-4 PM</div>
                      <small className="text-muted">Highest platform activity</small>
                    </div>
                  </Col>
                  <Col md={4}>
                    <div className="text-center p-3">
                      <div className="h4 fw-bold text-info">Top Issue Type</div>
                      <div className="text-muted">Road Infrastructure</div>
                      <small className="text-muted">28.8% of all reports</small>
                    </div>
                  </Col>
                  <Col md={4}>
                    <div className="text-center p-3">
                      <div className="h4 fw-bold text-warning">Engagement Rate</div>
                      <div className="text-muted">64.2% Active</div>
                      <small className="text-muted">Above national average</small>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default AnalyticsDashboard;