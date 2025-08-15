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
  InputGroup,
  Alert,
  Tabs,
  Tab,
  Dropdown
} from 'react-bootstrap';
import { 
  FaSearch, 
  FaFilter, 
  FaUserPlus,
  FaEdit,
  FaTrash,
  FaBan,
  FaUserShield,
  FaUser,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaEye,
  FaDownload,
  FaUserCheck,
  FaUserTimes
} from 'react-icons/fa';

const UserManagement = () => {
  const [selectedTab, setSelectedTab] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [showUserModal, setShowUserModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [modalMode, setModalMode] = useState('view'); // 'view', 'edit', 'create'

  const [newUser, setNewUser] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    role: 'citizen',
    constituency: '',
    ward: '',
    status: 'active'
  });

  const users = [
    {
      id: 1,
      firstName: 'John',
      lastName: 'Mwangi',
      email: 'john.mwangi@email.com',
      phone: '+254700123456',
      role: 'citizen',
      status: 'active',
      constituency: 'Nyeri Town',
      ward: 'Kiganjo/Mathari',
      joinDate: '2024-03-15',
      lastLogin: '2025-01-15T10:30:00Z',
      issuesReported: 12,
      consultationsParticipated: 5,
      forumPosts: 23,
      verificationStatus: 'verified'
    },
    {
      id: 2,
      firstName: 'Mary',
      lastName: 'Wanjiku',
      email: 'mary.wanjiku@email.com',
      phone: '+254711234567',
      role: 'citizen',
      status: 'active',
      constituency: 'Othaya',
      ward: 'Karima',
      joinDate: '2024-01-20',
      lastLogin: '2025-01-14T16:45:00Z',
      issuesReported: 8,
      consultationsParticipated: 12,
      forumPosts: 45,
      verificationStatus: 'verified'
    },
    {
      id: 3,
      firstName: 'Peter',
      lastName: 'Kamau',
      email: 'peter.kamau@nyeri.gov.ke',
      phone: '+254722345678',
      role: 'admin',
      status: 'active',
      constituency: 'N/A',
      ward: 'N/A',
      joinDate: '2023-08-10',
      lastLogin: '2025-01-15T09:15:00Z',
      issuesReported: 0,
      consultationsParticipated: 0,
      forumPosts: 15,
      verificationStatus: 'verified',
      department: 'ICT Department'
    },
    {
      id: 4,
      firstName: 'Grace',
      lastName: 'Njeri',
      email: 'grace.njeri@email.com',
      phone: '+254733456789',
      role: 'citizen',
      status: 'suspended',
      constituency: 'Tetu',
      ward: 'Dedan Kimathi',
      joinDate: '2024-06-05',
      lastLogin: '2025-01-10T14:20:00Z',
      issuesReported: 3,
      consultationsParticipated: 1,
      forumPosts: 8,
      verificationStatus: 'pending',
      suspensionReason: 'Violation of community guidelines'
    },
    {
      id: 5,
      firstName: 'James',
      lastName: 'Kiprotich',
      email: 'james.kiprotich@email.com',
      phone: '+254744567890',
      role: 'moderator',
      status: 'active',
      constituency: 'Kieni East',
      ward: 'Gatarakwa',
      joinDate: '2024-02-12',
      lastLogin: '2025-01-15T11:00:00Z',
      issuesReported: 2,
      consultationsParticipated: 8,
      forumPosts: 67,
      verificationStatus: 'verified',
      department: 'Community Engagement'
    }
  ];

  const constituencies = [
    'Nyeri Town', 'Othaya', 'Mukurwe-ini', 'Tetu', 'Kieni East', 'Kieni West'
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'success';
      case 'suspended': return 'danger';
      case 'pending': return 'warning';
      case 'inactive': return 'secondary';
      default: return 'info';
    }
  };

  const getRoleColor = (role) => {
    switch (role) {
      case 'admin': return 'primary';
      case 'moderator': return 'info';
      case 'citizen': return 'secondary';
      default: return 'light';
    }
  };

  const getVerificationColor = (status) => {
    switch (status) {
      case 'verified': return 'success';
      case 'pending': return 'warning';
      case 'rejected': return 'danger';
      default: return 'secondary';
    }
  };

  const getTimeAgo = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMinutes = Math.floor((now - date) / (1000 * 60));
    
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  const filteredUsers = users.filter(user => {
    const matchesTab = selectedTab === 'all' || 
      (selectedTab === 'citizens' && user.role === 'citizen') ||
      (selectedTab === 'staff' && (user.role === 'admin' || user.role === 'moderator'));
    
    const matchesSearch = searchTerm === '' || 
      user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.phone.includes(searchTerm);
    
    const matchesRole = selectedRole === 'all' || user.role === selectedRole;
    const matchesStatus = selectedStatus === 'all' || user.status === selectedStatus;
    
    return matchesTab && matchesSearch && matchesRole && matchesStatus;
  });

  const handleViewUser = (user) => {
    setSelectedUser(user);
    setModalMode('view');
    setShowUserModal(true);
  };

  const handleEditUser = (user) => {
    setSelectedUser(user);
    setNewUser({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phone: user.phone,
      role: user.role,
      constituency: user.constituency,
      ward: user.ward,
      status: user.status
    });
    setModalMode('edit');
    setShowUserModal(true);
  };

  const handleCreateUser = () => {
    setSelectedUser(null);
    setNewUser({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      role: 'citizen',
      constituency: '',
      ward: '',
      status: 'active'
    });
    setModalMode('create');
    setShowUserModal(true);
  };

  const handleDeleteUser = (user) => {
    setSelectedUser(user);
    setShowDeleteModal(true);
  };

  const handleStatusChange = (userId, newStatus) => {
    console.log('Change status:', userId, newStatus);
    // Handle status change logic
  };

  const handleUserSubmit = (e) => {
    e.preventDefault();
    // Handle user creation/update
    console.log('User data:', newUser);
    setShowUserModal(false);
  };

  const stats = {
    total: users.length,
    active: users.filter(u => u.status === 'active').length,
    citizens: users.filter(u => u.role === 'citizen').length,
    staff: users.filter(u => u.role === 'admin' || u.role === 'moderator').length,
    verified: users.filter(u => u.verificationStatus === 'verified').length
  };

  return (
    <div className="user-management">
      <Container fluid className="p-4">
        {/* Header */}
        <Row className="mb-4">
          <Col>
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <h1 className="h3 fw-bold text-dark mb-2">
                  User Management 👥
                </h1>
                <p className="text-muted">
                  Manage platform users, roles, and permissions
                </p>
              </div>
              
              <div className="d-flex gap-2">
                <Button
                  variant="outline-success"
                  onClick={handleCreateUser}
                  style={{ borderRadius: '12px' }}
                >
                  <FaUserPlus className="me-2" />
                  Add User
                </Button>
                <Button
                  variant="outline-primary"
                  style={{ borderRadius: '12px' }}
                >
                  <FaDownload className="me-2" />
                  Export
                </Button>
              </div>
            </div>
          </Col>
        </Row>

        {/* Statistics Cards */}
        <Row className="mb-4">
          <Col lg={2} md={4} sm={6} className="mb-3">
            <Card className="border-0 shadow-sm text-center">
              <Card.Body className="p-3">
                <h4 className="fw-bold text-primary">{stats.total}</h4>
                <p className="text-muted mb-0 small">Total Users</p>
              </Card.Body>
            </Card>
          </Col>
          <Col lg={2} md={4} sm={6} className="mb-3">
            <Card className="border-0 shadow-sm text-center">
              <Card.Body className="p-3">
                <h4 className="fw-bold text-success">{stats.active}</h4>
                <p className="text-muted mb-0 small">Active Users</p>
              </Card.Body>
            </Card>
          </Col>
          <Col lg={2} md={4} sm={6} className="mb-3">
            <Card className="border-0 shadow-sm text-center">
              <Card.Body className="p-3">
                <h4 className="fw-bold text-info">{stats.citizens}</h4>
                <p className="text-muted mb-0 small">Citizens</p>
              </Card.Body>
            </Card>
          </Col>
          <Col lg={2} md={4} sm={6} className="mb-3">
            <Card className="border-0 shadow-sm text-center">
              <Card.Body className="p-3">
                <h4 className="fw-bold text-warning">{stats.staff}</h4>
                <p className="text-muted mb-0 small">Staff</p>
              </Card.Body>
            </Card>
          </Col>
          <Col lg={2} md={4} sm={6} className="mb-3">
            <Card className="border-0 shadow-sm text-center">
              <Card.Body className="p-3">
                <h4 className="fw-bold text-success">{stats.verified}</h4>
                <p className="text-muted mb-0 small">Verified</p>
              </Card.Body>
            </Card>
          </Col>
          <Col lg={2} md={4} sm={6} className="mb-3">
            <Card className="border-0 shadow-sm text-center">
              <Card.Body className="p-3">
                <h4 className="fw-bold text-info">
                  {Math.round((stats.active / stats.total) * 100)}%
                </h4>
                <p className="text-muted mb-0 small">Activity Rate</p>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Tabs */}
        <Tabs activeKey={selectedTab} onSelect={setSelectedTab} className="mb-4">
          <Tab eventKey="all" title="All Users">
            {/* Content handled below */}
          </Tab>
          <Tab eventKey="citizens" title="Citizens">
            {/* Content handled below */}
          </Tab>
          <Tab eventKey="staff" title="Staff">
            {/* Content handled below */}
          </Tab>
        </Tabs>

        {/* Filters */}
        <Row className="mb-4">
          <Col lg={3} md={6} className="mb-3">
            <InputGroup>
              <InputGroup.Text>
                <FaSearch className="text-muted" />
              </InputGroup.Text>
              <Form.Control
                type="text"
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </InputGroup>
          </Col>
          <Col lg={2} md={6} className="mb-3">
            <Form.Select
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
            >
              <option value="all">All Roles</option>
              <option value="citizen">Citizens</option>
              <option value="moderator">Moderators</option>
              <option value="admin">Administrators</option>
            </Form.Select>
          </Col>
          <Col lg={2} md={6} className="mb-3">
            <Form.Select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="suspended">Suspended</option>
              <option value="pending">Pending</option>
              <option value="inactive">Inactive</option>
            </Form.Select>
          </Col>
        </Row>

        {/* Users Table */}
        <Row>
          <Col>
            <Card className="border-0 shadow-sm">
              <Card.Body className="p-0">
                <div className="table-responsive">
                  <Table hover className="align-middle mb-0">
                    <thead className="table-light">
                      <tr>
                        <th className="px-4 py-3">User</th>
                        <th>Contact</th>
                        <th>Role</th>
                        <th>Status</th>
                        <th>Location</th>
                        <th>Activity</th>
                        <th>Joined</th>
                        <th>Last Login</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredUsers.map((user) => (
                        <tr key={user.id}>
                          <td className="px-4">
                            <div className="d-flex align-items-center">
                              <div 
                                className="me-3 d-flex align-items-center justify-content-center"
                                style={{
                                  width: '40px',
                                  height: '40px',
                                  background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
                                  borderRadius: '50%',
                                  color: 'white',
                                  fontSize: '0.9rem'
                                }}
                              >
                                {user.firstName[0]}{user.lastName[0]}
                              </div>
                              <div>
                                <div className="fw-medium">
                                  {user.firstName} {user.lastName}
                                </div>
                                <Badge bg={getVerificationColor(user.verificationStatus)} className="mt-1">
                                  {user.verificationStatus === 'verified' ? <FaUserCheck className="me-1" /> : <FaUserTimes className="me-1" />}
                                  {user.verificationStatus}
                                </Badge>
                              </div>
                            </div>
                          </td>
                          <td>
                            <div>
                              <div className="small">
                                <FaEnvelope className="me-1 text-muted" />
                                {user.email}
                              </div>
                              <div className="small">
                                <FaPhone className="me-1 text-muted" />
                                {user.phone}
                              </div>
                            </div>
                          </td>
                          <td>
                            <Badge bg={getRoleColor(user.role)} className="px-2 py-1">
                              {user.role === 'admin' && <FaUserShield className="me-1" />}
                              {user.role.toUpperCase()}
                            </Badge>
                            {user.department && (
                              <div className="small text-muted mt-1">{user.department}</div>
                            )}
                          </td>
                          <td>
                            <Dropdown>
                              <Dropdown.Toggle 
                                variant={getStatusColor(user.status)}
                                size="sm"
                                style={{ textTransform: 'capitalize' }}
                              >
                                {user.status}
                              </Dropdown.Toggle>
                              <Dropdown.Menu>
                                <Dropdown.Item onClick={() => handleStatusChange(user.id, 'active')}>
                                  Active
                                </Dropdown.Item>
                                <Dropdown.Item onClick={() => handleStatusChange(user.id, 'suspended')}>
                                  Suspended
                                </Dropdown.Item>
                                <Dropdown.Item onClick={() => handleStatusChange(user.id, 'inactive')}>
                                  Inactive
                                </Dropdown.Item>
                              </Dropdown.Menu>
                            </Dropdown>
                            {user.suspensionReason && (
                              <div className="small text-danger mt-1">
                                {user.suspensionReason}
                              </div>
                            )}
                          </td>
                          <td>
                            {user.constituency !== 'N/A' ? (
                              <div>
                                <div className="fw-medium small">{user.constituency}</div>
                                <div className="small text-muted">{user.ward}</div>
                              </div>
                            ) : (
                              <Badge bg="light" text="dark">Staff</Badge>
                            )}
                          </td>
                          <td>
                            <div className="small">
                              <div>Reports: <span className="fw-bold">{user.issuesReported}</span></div>
                              <div>Consultations: <span className="fw-bold">{user.consultationsParticipated}</span></div>
                              <div>Posts: <span className="fw-bold">{user.forumPosts}</span></div>
                            </div>
                          </td>
                          <td>
                            <div className="small text-muted">
                              {new Date(user.joinDate).toLocaleDateString()}
                            </div>
                          </td>
                          <td>
                            <div className="small text-muted">
                              {getTimeAgo(user.lastLogin)}
                            </div>
                          </td>
                          <td>
                            <div className="d-flex gap-1">
                              <Button
                                variant="outline-primary"
                                size="sm"
                                onClick={() => handleViewUser(user)}
                                title="View Details"
                              >
                                <FaEye />
                              </Button>
                              <Button
                                variant="outline-success"
                                size="sm"
                                onClick={() => handleEditUser(user)}
                                title="Edit User"
                              >
                                <FaEdit />
                              </Button>
                              <Button
                                variant="outline-danger"
                                size="sm"
                                onClick={() => handleDeleteUser(user)}
                                title="Delete User"
                              >
                                <FaTrash />
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
        </Row>
      </Container>

      {/* User Modal */}
      <Modal show={showUserModal} onHide={() => setShowUserModal(false)} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title className="fw-bold">
            {modalMode === 'create' ? 'Add New User' : 
             modalMode === 'edit' ? 'Edit User' : 'User Details'}
          </Modal.Title>
        </Modal.Header>
        
        {modalMode === 'view' && selectedUser ? (
          <Modal.Body>
            <Row>
              <Col md={8}>
                <h5 className="fw-bold mb-3">
                  {selectedUser.firstName} {selectedUser.lastName}
                </h5>
                
                <div className="mb-3">
                  <strong>Contact Information:</strong>
                  <div className="mt-1">
                    <div><FaEnvelope className="me-2 text-muted" />{selectedUser.email}</div>
                    <div><FaPhone className="me-2 text-muted" />{selectedUser.phone}</div>
                  </div>
                </div>

                {selectedUser.constituency !== 'N/A' && (
                  <div className="mb-3">
                    <strong>Location:</strong>
                    <div className="mt-1">
                      <FaMapMarkerAlt className="me-2 text-muted" />
                      {selectedUser.constituency}, {selectedUser.ward}
                    </div>
                  </div>
                )}

                <div className="mb-3">
                  <strong>Platform Activity:</strong>
                  <div className="mt-1">
                    <div>Issues Reported: <span className="fw-bold">{selectedUser.issuesReported}</span></div>
                    <div>Consultations: <span className="fw-bold">{selectedUser.consultationsParticipated}</span></div>
                    <div>Forum Posts: <span className="fw-bold">{selectedUser.forumPosts}</span></div>
                  </div>
                </div>
              </Col>
              
              <Col md={4}>
                <Card className="border-0 bg-light">
                  <Card.Body>
                    <div className="mb-2">
                      <strong>Role:</strong>
                      <Badge bg={getRoleColor(selectedUser.role)} className="ms-2">
                        {selectedUser.role.toUpperCase()}
                      </Badge>
                    </div>
                    
                    <div className="mb-2">
                      <strong>Status:</strong>
                      <Badge bg={getStatusColor(selectedUser.status)} className="ms-2">
                        {selectedUser.status}
                      </Badge>
                    </div>
                    
                    <div className="mb-2">
                      <strong>Verification:</strong>
                      <Badge bg={getVerificationColor(selectedUser.verificationStatus)} className="ms-2">
                        {selectedUser.verificationStatus}
                      </Badge>
                    </div>
                    
                    <div className="mb-2">
                      <strong>Joined:</strong>
                      <div className="text-muted">
                        {new Date(selectedUser.joinDate).toLocaleDateString()}
                      </div>
                    </div>
                    
                    <div>
                      <strong>Last Login:</strong>
                      <div className="text-muted">
                        {getTimeAgo(selectedUser.lastLogin)}
                      </div>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Modal.Body>
        ) : (
          <Form onSubmit={handleUserSubmit}>
            <Modal.Body>
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label className="fw-medium">First Name</Form.Label>
                    <Form.Control
                      type="text"
                      value={newUser.firstName}
                      onChange={(e) => setNewUser(prev => ({ ...prev, firstName: e.target.value }))}
                      required
                      style={{ borderRadius: '12px' }}
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label className="fw-medium">Last Name</Form.Label>
                    <Form.Control
                      type="text"
                      value={newUser.lastName}
                      onChange={(e) => setNewUser(prev => ({ ...prev, lastName: e.target.value }))}
                      required
                      style={{ borderRadius: '12px' }}
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label className="fw-medium">Email</Form.Label>
                    <Form.Control
                      type="email"
                      value={newUser.email}
                      onChange={(e) => setNewUser(prev => ({ ...prev, email: e.target.value }))}
                      required
                      style={{ borderRadius: '12px' }}
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label className="fw-medium">Phone</Form.Label>
                    <Form.Control
                      type="tel"
                      value={newUser.phone}
                      onChange={(e) => setNewUser(prev => ({ ...prev, phone: e.target.value }))}
                      required
                      style={{ borderRadius: '12px' }}
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label className="fw-medium">Role</Form.Label>
                    <Form.Select
                      value={newUser.role}
                      onChange={(e) => setNewUser(prev => ({ ...prev, role: e.target.value }))}
                      style={{ borderRadius: '12px' }}
                    >
                      <option value="citizen">Citizen</option>
                      <option value="moderator">Moderator</option>
                      <option value="admin">Administrator</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label className="fw-medium">Status</Form.Label>
                    <Form.Select
                      value={newUser.status}
                      onChange={(e) => setNewUser(prev => ({ ...prev, status: e.target.value }))}
                      style={{ borderRadius: '12px' }}
                    >
                      <option value="active">Active</option>
                      <option value="pending">Pending</option>
                      <option value="suspended">Suspended</option>
                      <option value="inactive">Inactive</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
              </Row>

              {newUser.role === 'citizen' && (
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label className="fw-medium">Constituency</Form.Label>
                      <Form.Select
                        value={newUser.constituency}
                        onChange={(e) => setNewUser(prev => ({ ...prev, constituency: e.target.value }))}
                        style={{ borderRadius: '12px' }}
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
                    <Form.Group className="mb-3">
                      <Form.Label className="fw-medium">Ward</Form.Label>
                      <Form.Control
                        type="text"
                        value={newUser.ward}
                        onChange={(e) => setNewUser(prev => ({ ...prev, ward: e.target.value }))}
                        placeholder="Enter ward"
                        style={{ borderRadius: '12px' }}
                      />
                    </Form.Group>
                  </Col>
                </Row>
              )}
            </Modal.Body>
            
            <Modal.Footer>
              <Button variant="outline-secondary" onClick={() => setShowUserModal(false)}>
                Cancel
              </Button>
              <Button type="submit" variant="success">
                {modalMode === 'create' ? 'Create User' : 'Update User'}
              </Button>
            </Modal.Footer>
          </Form>
        )}
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title className="fw-bold text-danger">Delete User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedUser && (
            <>
              <Alert variant="danger">
                <FaTrash className="me-2" />
                <strong>Warning:</strong> This action cannot be undone.
              </Alert>
              
              <p>
                Are you sure you want to delete the user <strong>{selectedUser.firstName} {selectedUser.lastName}</strong>?
              </p>
              
              <p className="text-muted">
                This will permanently remove all their data including:
              </p>
              <ul className="text-muted">
                <li>Personal information</li>
                <li>Reported issues</li>
                <li>Forum posts and replies</li>
                <li>Consultation responses</li>
              </ul>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-secondary" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={() => setShowDeleteModal(false)}>
            Delete User
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default UserManagement;