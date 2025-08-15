import React, { useState } from 'react';
import { Navbar, Nav, Container, Dropdown, Badge } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import {
  FaBars,
  FaBell,
  FaUser,
  FaSignOutAlt,
  FaCog,
  FaHome,
  FaInfoCircle,
  FaEnvelope,
  FaQuestionCircle
} from 'react-icons/fa';

const Header = ({ isAuthenticated, userRole, onLogout, onToggleSidebar }) => {
  const [notifications] = useState([
    { id: 1, message: "New policy consultation available", time: "2 hours ago", unread: true },
    { id: 2, message: "Your issue report has been updated", time: "1 day ago", unread: true },
    { id: 3, message: "Forum discussion reply", time: "2 days ago", unread: false }
  ]);

  const navigate = useNavigate();

  const unreadCount = notifications.filter(n => n.unread).length;

  const handleLogout = () => {
    onLogout();
    navigate('/');
  };

  return (
    <Navbar
      expand="lg"
      className="custom-navbar shadow-sm"
      style={{
        background: 'linear-gradient(135deg, #1e40af 0%, #3b82f6 100%)',
        borderBottom: '3px solid #22c55e'
      }}
    >
      <Container fluid>
        {/* Mobile Sidebar Toggle & Logo */}
        <div className="d-flex align-items-center">
          {isAuthenticated && (
            <button
              className="btn btn-link text-white me-3 d-lg-none"
              onClick={onToggleSidebar}
              style={{ border: 'none', fontSize: '1.2rem' }}
            >
              <FaBars />
            </button>
          )}

          <Navbar.Brand
            as={Link}
            to="/"
            className="text-white fw-bold d-flex align-items-center"
            style={{ fontSize: '1.5rem' }}
          >
            <div
              className="me-2 d-flex align-items-center justify-content-center"
              style={{
                width: '40px',
                height: '40px',
                background: 'rgba(255, 255, 255, 0.2)',
                borderRadius: '50%',
                backdropFilter: 'blur(10px)'
              }}
            >
              <img src="https://img.icons8.com/external-flaticons-lineal-color-flat-icons/64/external-public-public-relations-agency-flaticons-lineal-color-flat-icons-2.png" alt="Logo" style={{ width: "50px", height: "50px" }} />
            </div>
            <span className="d-none d-md-inline">Nyeri County</span>
            <span className="d-md-none">NC</span>
          </Navbar.Brand>
        </div>

        <Navbar.Toggle aria-controls="basic-navbar-nav" className="border-0">
          <span className="navbar-toggler-icon" style={{ backgroundImage: 'none' }}>
            <FaBars style={{ color: 'white', fontSize: '1.2rem' }} />
          </span>
        </Navbar.Toggle>

        <Navbar.Collapse id="basic-navbar-nav">
          {/* Navigation Links */}
          {!isAuthenticated && (
            <Nav className="me-auto">
              <Nav.Link
                as={Link}
                to="/"
                className="text-white fw-medium mx-2 d-flex align-items-center"
              >
                <FaHome className="me-1" />
                Home
              </Nav.Link>
              <Nav.Link
                as={Link}
                to="/about"
                className="text-white fw-medium mx-2 d-flex align-items-center"
              >
                <FaInfoCircle className="me-1" />
                About
              </Nav.Link>
              <Nav.Link
                as={Link}
                to="/contact"
                className="text-white fw-medium mx-2 d-flex align-items-center"
              >
                <FaEnvelope className="me-1" />
                Contact
              </Nav.Link>
              <Nav.Link
                as={Link}
                to="/help"
                className="text-white fw-medium mx-2 d-flex align-items-center"
              >
                <FaQuestionCircle className="me-1" />
                Help
              </Nav.Link>
            </Nav>
          )}

          {/* User Actions */}
          <Nav className="ms-auto d-flex align-items-center">
            {isAuthenticated ? (
              <>
                {/* Notifications */}
                <Dropdown className="me-3">
                  <Dropdown.Toggle
                    variant="link"
                    className="text-white position-relative"
                    style={{ border: 'none', background: 'none' }}
                  >
                    <FaBell style={{ fontSize: '1.2rem' }} />
                    {unreadCount > 0 && (
                      <Badge
                        bg="danger"
                        pill
                        className="position-absolute"
                        style={{
                          top: '-5px',
                          right: '-5px',
                          fontSize: '0.7rem'
                        }}
                      >
                        {unreadCount}
                      </Badge>
                    )}
                  </Dropdown.Toggle>

                  <Dropdown.Menu
                    align="end"
                    className="shadow-lg border-0"
                    style={{
                      minWidth: '320px',
                      borderRadius: '12px'
                    }}
                  >
                    <Dropdown.Header className="fw-bold text-primary">
                      Notifications
                    </Dropdown.Header>
                    {notifications.map((notification) => (
                      <Dropdown.Item
                        key={notification.id}
                        className={`border-bottom ${notification.unread ? 'bg-light' : ''}`}
                        style={{ padding: '12px 16px' }}
                      >
                        <div className="d-flex justify-content-between">
                          <small className="text-muted">{notification.time}</small>
                          {notification.unread && (
                            <Badge bg="primary" pill style={{ fontSize: '0.6rem' }}>
                              New
                            </Badge>
                          )}
                        </div>
                        <div className="mt-1">{notification.message}</div>
                      </Dropdown.Item>
                    ))}
                    <Dropdown.Item className="text-center text-primary">
                      View All Notifications
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>

                {/* User Menu */}
                <Dropdown>
                  <Dropdown.Toggle
                    variant="link"
                    className="text-white d-flex align-items-center"
                    style={{ border: 'none', background: 'none', textDecoration: 'none' }}
                  >
                    <div
                      className="me-2 d-flex align-items-center justify-content-center"
                      style={{
                        width: '35px',
                        height: '35px',
                        background: 'rgba(255, 255, 255, 0.2)',
                        borderRadius: '50%',
                        backdropFilter: 'blur(10px)'
                      }}
                    >
                      <FaUser />
                    </div>
                    <div className="d-none d-md-block">
                      <small className="opacity-75">Welcome,</small>
                      <div className="fw-bold">{userRole === 'admin' ? 'Administrator' : 'Citizen'}</div>
                    </div>
                  </Dropdown.Toggle>

                  <Dropdown.Menu
                    align="end"
                    className="shadow-lg border-0"
                    style={{ borderRadius: '12px' }}
                  >
                    <Dropdown.Item
                      as={Link}
                      to={userRole === 'admin' ? '/admin/dashboard' : '/citizen/dashboard'}
                      className="d-flex align-items-center"
                    >
                      <FaHome className="me-2" />
                      Dashboard
                    </Dropdown.Item>

                    <Dropdown.Item
                      as={Link}
                      to={userRole === 'admin' ? '/admin/profile' : '/citizen/profile'}
                      className="d-flex align-items-center"
                    >
                      <FaCog className="me-2" />
                      Settings
                    </Dropdown.Item>

                    <Dropdown.Divider />

                    <Dropdown.Item
                      onClick={handleLogout}
                      className="d-flex align-items-center text-danger"
                    >
                      <FaSignOutAlt className="me-2" />
                      Logout
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </>
            ) : (
              <div className="d-flex align-items-center">
                <Nav.Link
                  as={Link}
                  to="/login"
                  className="btn btn-outline-light me-2"
                  style={{
                    borderRadius: '8px',
                    padding: '8px 20px',
                    fontWeight: '500'
                  }}
                >
                  Login
                </Nav.Link>
                <Nav.Link
                  as={Link}
                  to="/register"
                  className="btn text-primary fw-bold"
                  style={{
                    background: 'white',
                    borderRadius: '8px',
                    padding: '8px 20px',
                    border: 'none'
                  }}
                >
                  Register
                </Nav.Link>
              </div>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;