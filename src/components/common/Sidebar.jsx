import React from 'react';
import { Nav, Offcanvas } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import { 
  FaTachometerAlt, 
  FaExclamationTriangle, 
  FaComments, 
  FaVoteYea,
  FaUser,
  FaUsers,
  FaChartBar,
  FaPlus,
  FaCog,
  FaClipboardList
} from 'react-icons/fa';

const Sidebar = ({ isOpen, onClose, userRole }) => {
  const location = useLocation();

  const citizenMenuItems = [
    {
      path: '/citizen/dashboard',
      icon: FaTachometerAlt,
      label: 'Dashboard',
      color: '#3b82f6'
    },
    {
      path: '/citizen/report-issue',
      icon: FaExclamationTriangle,
      label: 'Report Issue',
      color: '#ef4444'
    },
    {
      path: '/citizen/consultations',
      icon: FaVoteYea,
      label: 'Consultations',
      color: '#8b5cf6'
    },
    {
      path: '/citizen/forum',
      icon: FaComments,
      label: 'Forum',
      color: '#22c55e'
    },
    {
      path: '/citizen/profile',
      icon: FaUser,
      label: 'Profile',
      color: '#64748b'
    }
  ];

  const adminMenuItems = [
    {
      path: '/admin/dashboard',
      icon: FaTachometerAlt,
      label: 'Dashboard',
      color: '#3b82f6'
    },
    {
      path: '/admin/issues',
      icon: FaClipboardList,
      label: 'Manage Issues',
      color: '#ef4444'
    },
    {
      path: '/admin/consultations',
      icon: FaPlus,
      label: 'Create Consultation',
      color: '#8b5cf6'
    },
    {
      path: '/admin/analytics',
      icon: FaChartBar,
      label: 'Analytics',
      color: '#f59e0b'
    },
    {
      path: '/admin/users',
      icon: FaUsers,
      label: 'User Management',
      color: '#22c55e'
    },
    {
      path: '/admin/settings',
      icon: FaCog,
      label: 'Settings',
      color: '#64748b'
    }
  ];

  const menuItems = userRole === 'admin' ? adminMenuItems : citizenMenuItems;

  const isActiveLink = (path) => {
    return location.pathname === path;
  };

  const SidebarContent = () => (
    <div className="h-100 d-flex flex-column">
      {/* Header */}
      <div 
        className="p-4 text-white text-center"
        style={{
          background: 'linear-gradient(135deg, #1e40af 0%, #3b82f6 100%)',
          borderBottom: '2px solid rgba(255, 255, 255, 0.1)'
        }}
      >
        <h5 className="mb-1 fw-bold">
          {userRole === 'admin' ? 'Admin Panel' : 'Citizen Portal'}
        </h5>
        <small className="opacity-75">Nyeri County Platform</small>
      </div>

      {/* Navigation */}
      <Nav className="flex-column p-3 flex-grow-1">
        {menuItems.map((item) => {
          const IconComponent = item.icon;
          const isActive = isActiveLink(item.path);
          
          return (
            <Nav.Link
              key={item.path}
              as={Link}
              to={item.path}
              onClick={onClose}
              className={`sidebar-nav-link mb-2 ${isActive ? 'active' : ''}`}
              style={{
                padding: '12px 16px',
                borderRadius: '12px',
                color: isActive ? 'white' : '#64748b',
                background: isActive 
                  ? `linear-gradient(135deg, ${item.color} 0%, ${item.color}dd 100%)`
                  : 'transparent',
                textDecoration: 'none',
                transition: 'all 0.3s ease',
                border: 'none',
                display: 'flex',
                alignItems: 'center',
                fontWeight: isActive ? '600' : '500'
              }}
            >
              <IconComponent 
                className="me-3" 
                style={{ 
                  fontSize: '1.1rem',
                  color: isActive ? 'white' : item.color
                }} 
              />
              {item.label}
              {isActive && (
                <div 
                  className="ms-auto"
                  style={{
                    width: '6px',
                    height: '6px',
                    borderRadius: '50%',
                    background: 'rgba(255, 255, 255, 0.8)'
                  }}
                />
              )}
            </Nav.Link>
          );
        })}
      </Nav>

      {/* Footer */}
      <div 
        className="p-3 mt-auto"
        style={{
          borderTop: '1px solid #e2e8f0',
          background: '#f8fafc'
        }}
      >
        <div className="text-center">
          <small className="text-muted">
            © 2025 Nyeri County
          </small>
          <br />
          <small className="text-muted">
            Version 1.0.0
          </small>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Sidebar */}
      <Offcanvas 
        show={isOpen} 
        onHide={onClose} 
        placement="start"
        className="d-lg-none"
        style={{ width: '280px' }}
      >
        <SidebarContent />
      </Offcanvas>

      {/* Desktop Sidebar */}
      <div 
        className={`sidebar-desktop d-none d-lg-block position-fixed ${isOpen ? 'open' : ''}`}
        style={{
          width: '280px',
          height: '100vh',
          top: 0,
          left: 0,
          background: 'white',
          boxShadow: '2px 0 10px rgba(0, 0, 0, 0.1)',
          transition: 'transform 0.3s ease',
          transform: isOpen ? 'translateX(0)' : 'translateX(-100%)',
          zIndex: 1040
        }}
      >
        <SidebarContent />
      </div>

      {/* Overlay for mobile */}
      {isOpen && (
        <div 
          className="sidebar-overlay d-lg-none position-fixed w-100 h-100"
          style={{
            top: 0,
            left: 0,
            background: 'rgba(0, 0, 0, 0.5)',
            zIndex: 1030
          }}
          onClick={onClose}
        />
      )}
    </>
  );
};

export default Sidebar;