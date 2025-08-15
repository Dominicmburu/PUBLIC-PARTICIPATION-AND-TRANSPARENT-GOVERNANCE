import React, { useState } from 'react';
import { 
  Container, 
  Row, 
  Col, 
  Card, 
  Form, 
  Button, 
  Tab, 
  Nav,
  Alert,
  Badge,
  Table,
  Modal
} from 'react-bootstrap';
import { 
  FaUser, 
  FaLock, 
  FaBell, 
  FaShieldAlt,
  FaCamera,
  FaEdit,
  FaSave,
  FaEye,
  FaTrash,
  FaDownload,
  FaHistory
} from 'react-icons/fa';

const ProfileSettings = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');

  const [profileData, setProfileData] = useState({
    firstName: 'John',
    lastName: 'Mwangi',
    email: 'john.mwangi@email.com',
    phone: '+254700123456',
    idNumber: '12345678',
    constituency: 'Nyeri Town',
    ward: 'Kiganjo/Mathari',
    address: 'P.O. Box 123, Nyeri',
    dateOfBirth: '1990-05-15',
    gender: 'male',
    occupation: 'Teacher',
    profilePicture: null
  });

  const [notifications, setNotifications] = useState({
    emailIssueUpdates: true,
    emailConsultations: true,
    emailForumReplies: false,
    emailNewsletter: true,
    smsImportant: true,
    smsAll: false,
    pushNotifications: true
  });

  const [privacy, setPrivacy] = useState({
    profileVisibility: 'public',
    showEmail: false,
    showPhone: false,
    allowMessages: true,
    dataSharing: false
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const constituencies = [
    'Nyeri Town', 'Othaya', 'Mukurwe-ini', 'Tetu', 'Kieni East', 'Kieni West'
  ];

  const wards = {
    'Nyeri Town': ['Kiganjo/Mathari', 'Ruring\'u', 'Gatitu/Muruguru', 'Rware', 'Kamakwa/Mukaro'],
    'Othaya': ['Karima', 'Mahiga', 'Iria-ini', 'Chinga'],
    'Mukurwe-ini': ['Rugi', 'Gikondi', 'Mukurwe-ini West', 'Mukurwe-ini Central']
  };

  const activityHistory = [
    {
      id: 1,
      action: 'Reported Issue',
      description: 'Pothole on Kimathi Way',
      date: '2025-01-15T10:30:00Z',
      type: 'issue'
    },
    {
      id: 2,
      action: 'Participated in Consultation',
      description: 'County Budget 2025',
      date: '2025-01-14T14:20:00Z',
      type: 'consultation'
    },
    {
      id: 3,
      action: 'Forum Post',
      description: 'Healthcare Services Discussion',
      date: '2025-01-13T09:15:00Z',
      type: 'forum'
    },
    {
      id: 4,
      action: 'Profile Updated',
      description: 'Changed contact information',
      date: '2025-01-12T16:45:00Z',
      type: 'profile'
    }
  ];

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      setSuccess('Profile updated successfully!');
      setTimeout(() => setSuccess(''), 3000);
    } catch (error) {
      console.error('Error updating profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleNotificationSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSuccess('Notification preferences updated!');
      setTimeout(() => setSuccess(''), 3000);
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      setShowPasswordModal(false);
      setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
      setSuccess('Password changed successfully!');
      setTimeout(() => setSuccess(''), 3000);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAccount = async () => {
    setLoading(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      // Handle account deletion
      alert('Account deletion initiated. You will receive a confirmation email.');
      setShowDeleteModal(false);
    } finally {
      setLoading(false);
    }
  };

  const getActivityIcon = (type) => {
    switch (type) {
      case 'issue': return '📋';
      case 'consultation': return '🗳️';
      case 'forum': return '💬';
      case 'profile': return '👤';
      default: return '📝';
    }
  };

  const getActivityColor = (type) => {
    switch (type) {
      case 'issue': return 'danger';
      case 'consultation': return 'primary';
      case 'forum': return 'success';
      case 'profile': return 'secondary';
      default: return 'info';
    }
  };

  const handleProfileChange = (field, value) => {
    setProfileData(prev => ({ ...prev, [field]: value }));
  };

  const handleNotificationChange = (field, value) => {
    setNotifications(prev => ({ ...prev, [field]: value }));
  };

  const handlePrivacyChange = (field, value) => {
    setPrivacy(prev => ({ ...prev, [field]: value }));
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const exportData = () => {
    const data = {
      profile: profileData,
      notifications,
      privacy,
      activityHistory
    };
    
    const dataStr = JSON.stringify(data, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = 'profile_data.json';
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  return (
    <div className="profile-settings">
      <Container fluid className="p-4">
        {/* Header */}
        <Row className="mb-4">
          <Col>
            <h1 className="h3 fw-bold text-dark mb-2">
              Profile Settings ⚙️
            </h1>
            <p className="text-muted">
              Manage your account information, preferences, and privacy settings
            </p>
          </Col>
        </Row>

        {/* Success Alert */}
        {success && (
          <Row className="mb-3">
            <Col>
              <Alert variant="success" dismissible onClose={() => setSuccess('')}>
                {success}
              </Alert>
            </Col>
          </Row>
        )}

        {/* Navigation Tabs */}
        <Row>
          <Col>
            <Card className="shadow-sm">
              <Tab.Container activeKey={activeTab} onSelect={setActiveTab}>
                <Nav variant="tabs" className="nav-tabs-custom">
                  <Nav.Item>
                    <Nav.Link eventKey="profile">
                      <FaUser className="me-2" />
                      Profile Information
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="notifications">
                      <FaBell className="me-2" />
                      Notifications
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="privacy">
                      <FaShieldAlt className="me-2" />
                      Privacy & Security
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="activity">
                      <FaHistory className="me-2" />
                      Activity History
                    </Nav.Link>
                  </Nav.Item>
                </Nav>

                <Card.Body className="p-4">
                  <Tab.Content>
                    {/* Profile Information Tab */}
                    <Tab.Pane eventKey="profile">
                      <Form onSubmit={handleProfileSubmit}>
                        <Row>
                          <Col md={8}>
                            <Row className="mb-3">
                              <Col md={6}>
                                <Form.Group>
                                  <Form.Label>First Name</Form.Label>
                                  <Form.Control
                                    type="text"
                                    value={profileData.firstName}
                                    onChange={(e) => handleProfileChange('firstName', e.target.value)}
                                    required
                                  />
                                </Form.Group>
                              </Col>
                              <Col md={6}>
                                <Form.Group>
                                  <Form.Label>Last Name</Form.Label>
                                  <Form.Control
                                    type="text"
                                    value={profileData.lastName}
                                    onChange={(e) => handleProfileChange('lastName', e.target.value)}
                                    required
                                  />
                                </Form.Group>
                              </Col>
                            </Row>

                            <Row className="mb-3">
                              <Col md={6}>
                                <Form.Group>
                                  <Form.Label>Email Address</Form.Label>
                                  <Form.Control
                                    type="email"
                                    value={profileData.email}
                                    onChange={(e) => handleProfileChange('email', e.target.value)}
                                    required
                                  />
                                </Form.Group>
                              </Col>
                              <Col md={6}>
                                <Form.Group>
                                  <Form.Label>Phone Number</Form.Label>
                                  <Form.Control
                                    type="tel"
                                    value={profileData.phone}
                                    onChange={(e) => handleProfileChange('phone', e.target.value)}
                                    required
                                  />
                                </Form.Group>
                              </Col>
                            </Row>

                            <Row className="mb-3">
                              <Col md={6}>
                                <Form.Group>
                                  <Form.Label>ID Number</Form.Label>
                                  <Form.Control
                                    type="text"
                                    value={profileData.idNumber}
                                    onChange={(e) => handleProfileChange('idNumber', e.target.value)}
                                    required
                                  />
                                </Form.Group>
                              </Col>
                              <Col md={6}>
                                <Form.Group>
                                  <Form.Label>Date of Birth</Form.Label>
                                  <Form.Control
                                    type="date"
                                    value={profileData.dateOfBirth}
                                    onChange={(e) => handleProfileChange('dateOfBirth', e.target.value)}
                                    required
                                  />
                                </Form.Group>
                              </Col>
                            </Row>

                            <Row className="mb-3">
                              <Col md={6}>
                                <Form.Group>
                                  <Form.Label>Gender</Form.Label>
                                  <Form.Select
                                    value={profileData.gender}
                                    onChange={(e) => handleProfileChange('gender', e.target.value)}
                                    required
                                  >
                                    <option value="">Select Gender</option>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                    <option value="other">Other</option>
                                  </Form.Select>
                                </Form.Group>
                              </Col>
                              <Col md={6}>
                                <Form.Group>
                                  <Form.Label>Occupation</Form.Label>
                                  <Form.Control
                                    type="text"
                                    value={profileData.occupation}
                                    onChange={(e) => handleProfileChange('occupation', e.target.value)}
                                  />
                                </Form.Group>
                              </Col>
                            </Row>

                            <Row className="mb-3">
                              <Col md={6}>
                                <Form.Group>
                                  <Form.Label>Constituency</Form.Label>
                                  <Form.Select
                                    value={profileData.constituency}
                                    onChange={(e) => {
                                      handleProfileChange('constituency', e.target.value);
                                      handleProfileChange('ward', ''); // Reset ward when constituency changes
                                    }}
                                    required
                                  >
                                    <option value="">Select Constituency</option>
                                    {constituencies.map(constituency => (
                                      <option key={constituency} value={constituency}>
                                        {constituency}
                                      </option>
                                    ))}
                                  </Form.Select>
                                </Form.Group>
                              </Col>
                              <Col md={6}>
                                <Form.Group>
                                  <Form.Label>Ward</Form.Label>
                                  <Form.Select
                                    value={profileData.ward}
                                    onChange={(e) => handleProfileChange('ward', e.target.value)}
                                    disabled={!profileData.constituency}
                                    required
                                  >
                                    <option value="">Select Ward</option>
                                    {profileData.constituency && wards[profileData.constituency]?.map(ward => (
                                      <option key={ward} value={ward}>
                                        {ward}
                                      </option>
                                    ))}
                                  </Form.Select>
                                </Form.Group>
                              </Col>
                            </Row>

                            <Row className="mb-4">
                              <Col>
                                <Form.Group>
                                  <Form.Label>Address</Form.Label>
                                  <Form.Control
                                    as="textarea"
                                    rows={2}
                                    value={profileData.address}
                                    onChange={(e) => handleProfileChange('address', e.target.value)}
                                  />
                                </Form.Group>
                              </Col>
                            </Row>
                          </Col>

                          {/* Profile Picture Section */}
                          <Col md={4}>
                            <div className="text-center">
                              <div className="profile-picture-container mb-3">
                                <div className="profile-picture-placeholder bg-light border rounded-circle d-flex align-items-center justify-content-center" 
                                     style={{ width: '120px', height: '120px', margin: '0 auto' }}>
                                  {profileData.profilePicture ? (
                                    <img 
                                      src={profileData.profilePicture} 
                                      alt="Profile" 
                                      className="rounded-circle"
                                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                    />
                                  ) : (
                                    <FaUser size={40} className="text-muted" />
                                  )}
                                </div>
                              </div>
                              <Button variant="outline-primary" size="sm">
                                <FaCamera className="me-1" />
                                Change Photo
                              </Button>
                            </div>
                          </Col>
                        </Row>

                        <div className="text-end">
                          <Button type="submit" variant="primary" disabled={loading}>
                            {loading ? (
                              <>
                                <span className="spinner-border spinner-border-sm me-2" />
                                Updating...
                              </>
                            ) : (
                              <>
                                <FaSave className="me-2" />
                                Save Changes
                              </>
                            )}
                          </Button>
                        </div>
                      </Form>
                    </Tab.Pane>

                    {/* Notifications Tab */}
                    <Tab.Pane eventKey="notifications">
                      <Form onSubmit={handleNotificationSubmit}>
                        <h5 className="mb-3">Email Notifications</h5>
                        <Row className="mb-4">
                          <Col md={6}>
                            <Form.Check
                              type="switch"
                              id="emailIssueUpdates"
                              label="Issue status updates"
                              checked={notifications.emailIssueUpdates}
                              onChange={(e) => handleNotificationChange('emailIssueUpdates', e.target.checked)}
                              className="mb-2"
                            />
                            <Form.Check
                              type="switch"
                              id="emailConsultations"
                              label="New consultation opportunities"
                              checked={notifications.emailConsultations}
                              onChange={(e) => handleNotificationChange('emailConsultations', e.target.checked)}
                              className="mb-2"
                            />
                          </Col>
                          <Col md={6}>
                            <Form.Check
                              type="switch"
                              id="emailForumReplies"
                              label="Forum replies and mentions"
                              checked={notifications.emailForumReplies}
                              onChange={(e) => handleNotificationChange('emailForumReplies', e.target.checked)}
                              className="mb-2"
                            />
                            <Form.Check
                              type="switch"
                              id="emailNewsletter"
                              label="Weekly newsletter"
                              checked={notifications.emailNewsletter}
                              onChange={(e) => handleNotificationChange('emailNewsletter', e.target.checked)}
                              className="mb-2"
                            />
                          </Col>
                        </Row>

                        <h5 className="mb-3">SMS Notifications</h5>
                        <Row className="mb-4">
                          <Col md={6}>
                            <Form.Check
                              type="switch"
                              id="smsImportant"
                              label="Important updates only"
                              checked={notifications.smsImportant}
                              onChange={(e) => handleNotificationChange('smsImportant', e.target.checked)}
                              className="mb-2"
                            />
                          </Col>
                          <Col md={6}>
                            <Form.Check
                              type="switch"
                              id="smsAll"
                              label="All notifications"
                              checked={notifications.smsAll}
                              onChange={(e) => handleNotificationChange('smsAll', e.target.checked)}
                              className="mb-2"
                            />
                          </Col>
                        </Row>

                        <h5 className="mb-3">Push Notifications</h5>
                        <Row className="mb-4">
                          <Col md={6}>
                            <Form.Check
                              type="switch"
                              id="pushNotifications"
                              label="Enable push notifications"
                              checked={notifications.pushNotifications}
                              onChange={(e) => handleNotificationChange('pushNotifications', e.target.checked)}
                              className="mb-2"
                            />
                          </Col>
                        </Row>

                        <div className="text-end">
                          <Button type="submit" variant="primary" disabled={loading}>
                            {loading ? (
                              <>
                                <span className="spinner-border spinner-border-sm me-2" />
                                Updating...
                              </>
                            ) : (
                              <>
                                <FaSave className="me-2" />
                                Save Preferences
                              </>
                            )}
                          </Button>
                        </div>
                      </Form>
                    </Tab.Pane>

                    {/* Privacy & Security Tab */}
                    <Tab.Pane eventKey="privacy">
                      <h5 className="mb-3">Profile Visibility</h5>
                      <Row className="mb-4">
                        <Col md={6}>
                          <Form.Group>
                            <Form.Label>Who can see your profile?</Form.Label>
                            <Form.Select
                              value={privacy.profileVisibility}
                              onChange={(e) => handlePrivacyChange('profileVisibility', e.target.value)}
                            >
                              <option value="public">Public</option>
                              <option value="registered">Registered users only</option>
                              <option value="private">Private</option>
                            </Form.Select>
                          </Form.Group>
                        </Col>
                      </Row>

                      <h5 className="mb-3">Contact Information</h5>
                      <Row className="mb-4">
                        <Col md={6}>
                          <Form.Check
                            type="switch"
                            id="showEmail"
                            label="Show email address on profile"
                            checked={privacy.showEmail}
                            onChange={(e) => handlePrivacyChange('showEmail', e.target.checked)}
                            className="mb-2"
                          />
                          <Form.Check
                            type="switch"
                            id="showPhone"
                            label="Show phone number on profile"
                            checked={privacy.showPhone}
                            onChange={(e) => handlePrivacyChange('showPhone', e.target.checked)}
                            className="mb-2"
                          />
                        </Col>
                        <Col md={6}>
                          <Form.Check
                            type="switch"
                            id="allowMessages"
                            label="Allow direct messages"
                            checked={privacy.allowMessages}
                            onChange={(e) => handlePrivacyChange('allowMessages', e.target.checked)}
                            className="mb-2"
                          />
                        </Col>
                      </Row>

                      <h5 className="mb-3">Data & Analytics</h5>
                      <Row className="mb-4">
                        <Col md={6}>
                          <Form.Check
                            type="switch"
                            id="dataSharing"
                            label="Share anonymized data for research"
                            checked={privacy.dataSharing}
                            onChange={(e) => handlePrivacyChange('dataSharing', e.target.checked)}
                            className="mb-2"
                          />
                        </Col>
                      </Row>

                      <h5 className="mb-3">Account Security</h5>
                      <Row className="mb-4">
                        <Col md={6}>
                          <Button
                            variant="outline-primary"
                            onClick={() => setShowPasswordModal(true)}
                            className="me-3 mb-2"
                          >
                            <FaLock className="me-2" />
                            Change Password
                          </Button>
                          <Button
                            variant="outline-success"
                            onClick={exportData}
                            className="me-3 mb-2"
                          >
                            <FaDownload className="me-2" />
                            Export Data
                          </Button>
                        </Col>
                      </Row>

                      <h5 className="mb-3 text-danger">Danger Zone</h5>
                      <Row>
                        <Col md={6}>
                          <Button
                            variant="outline-danger"
                            onClick={() => setShowDeleteModal(true)}
                          >
                            <FaTrash className="me-2" />
                            Delete Account
                          </Button>
                          <Form.Text className="text-muted d-block mt-1">
                            This action cannot be undone
                          </Form.Text>
                        </Col>
                      </Row>
                    </Tab.Pane>

                    {/* Activity History Tab */}
                    <Tab.Pane eventKey="activity">
                      <div className="d-flex justify-content-between align-items-center mb-3">
                        <h5>Recent Activity</h5>
                        <Button variant="outline-primary" size="sm" onClick={exportData}>
                          <FaDownload className="me-2" />
                          Export History
                        </Button>
                      </div>

                      <Table responsive hover>
                        <thead>
                          <tr>
                            <th>Activity</th>
                            <th>Description</th>
                            <th>Date</th>
                            <th>Type</th>
                          </tr>
                        </thead>
                        <tbody>
                          {activityHistory.map((activity) => (
                            <tr key={activity.id}>
                              <td>
                                <span className="me-2">{getActivityIcon(activity.type)}</span>
                                {activity.action}
                              </td>
                              <td>{activity.description}</td>
                              <td>{formatDate(activity.date)}</td>
                              <td>
                                <Badge bg={getActivityColor(activity.type)}>
                                  {activity.type}
                                </Badge>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </Table>

                      {activityHistory.length === 0 && (
                        <div className="text-center text-muted py-4">
                          <FaHistory size={48} className="mb-3" />
                          <p>No activity history available</p>
                        </div>
                      )}
                    </Tab.Pane>
                  </Tab.Content>
                </Card.Body>
              </Tab.Container>
            </Card>
          </Col>
        </Row>

        {/* Password Change Modal */}
        <Modal show={showPasswordModal} onHide={() => setShowPasswordModal(false)} centered>
          <Modal.Header closeButton>
            <Modal.Title>Change Password</Modal.Title>
          </Modal.Header>
          <Form onSubmit={handlePasswordSubmit}>
            <Modal.Body>
              <Form.Group className="mb-3">
                <Form.Label>Current Password</Form.Label>
                <Form.Control
                  type="password"
                  value={passwordData.currentPassword}
                  onChange={(e) => setPasswordData(prev => ({ ...prev, currentPassword: e.target.value }))}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>New Password</Form.Label>
                <Form.Control
                  type="password"
                  value={passwordData.newPassword}
                  onChange={(e) => setPasswordData(prev => ({ ...prev, newPassword: e.target.value }))}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Confirm New Password</Form.Label>
                <Form.Control
                  type="password"
                  value={passwordData.confirmPassword}
                  onChange={(e) => setPasswordData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                  required
                />
              </Form.Group>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => setShowPasswordModal(false)}>
                Cancel
              </Button>
              <Button type="submit" variant="primary" disabled={loading}>
                {loading ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" />
                    Changing...
                  </>
                ) : (
                  'Change Password'
                )}
              </Button>
            </Modal.Footer>
          </Form>
        </Modal>

        {/* Delete Account Modal */}
        <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)} centered>
          <Modal.Header closeButton>
            <Modal.Title className="text-danger">Delete Account</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Alert variant="danger">
              <strong>Warning!</strong> This action cannot be undone. All your data including:
              <ul className="mt-2 mb-0">
                <li>Profile information</li>
                <li>Reported issues</li>
                <li>Forum posts and comments</li>
                <li>Consultation participations</li>
              </ul>
              will be permanently deleted.
            </Alert>
            <p>Are you sure you want to delete your account?</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
              Cancel
            </Button>
            <Button variant="danger" onClick={handleDeleteAccount} disabled={loading}>
              {loading ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" />
                  Deleting...
                </>
              ) : (
                'Delete Account'
              )}
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>

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
        
        .profile-picture-placeholder {
          transition: all 0.3s ease;
        }
        
        .profile-picture-placeholder:hover {
          transform: scale(1.05);
        }
      `}</style>
    </div>
  );
};

export default ProfileSettings;