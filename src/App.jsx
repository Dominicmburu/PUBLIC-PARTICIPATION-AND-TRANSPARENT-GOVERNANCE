import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/globals.css';

// Components
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import Sidebar from './components/common/Sidebar';
import LoadingSpinner from './components/common/LoadingSpinner';

// Auth Components
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import ForgotPassword from './components/auth/ForgotPassword';

// Pages
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Help from './pages/Help';

// Citizen Components
import CitizenDashboard from './components/citizen/CitizenDashboard';
import IssueReporting from './components/citizen/IssueReporting';
import PolicyConsultation from './components/citizen/PolicyConsultation';
import ForumDiscussion from './components/citizen/ForumDiscussion';
import ProfileSettings from './components/citizen/ProfileSettings';

// Admin Components
import AdminDashboard from './components/admin/AdminDashboard';
import ManageIssues from './components/admin/ManageIssues';
import CreateConsultation from './components/admin/CreateConsultation';
import AnalyticsDashboard from './components/admin/AnalyticsDashboard';
import UserManagement from './components/admin/UserManagement';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState('citizen'); // 'citizen' or 'admin'
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    // Simulate checking authentication status
    const checkAuth = () => {
      const token = localStorage.getItem('authToken');
      const role = localStorage.getItem('userRole') || 'citizen';
      
      if (token) {
        setIsAuthenticated(true);
        setUserRole(role);
      }
      
      setLoading(false);
    };

    setTimeout(checkAuth, 1000); // Simulate API call delay
  }, []);

  const handleLogin = (role = 'citizen') => {
    setIsAuthenticated(true);
    setUserRole(role);
    localStorage.setItem('authToken', 'dummy-token');
    localStorage.setItem('userRole', role);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUserRole('citizen');
    localStorage.removeItem('authToken');
    localStorage.removeItem('userRole');
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <Router>
      <div className="App">
        {isAuthenticated && (
          <Sidebar 
            isOpen={sidebarOpen} 
            onClose={() => setSidebarOpen(false)}
            userRole={userRole}
          />
        )}
        
        <div className={`main-content ${isAuthenticated && sidebarOpen ? 'sidebar-open' : ''}`}>
          <Header 
            isAuthenticated={isAuthenticated}
            userRole={userRole}
            onLogout={handleLogout}
            onToggleSidebar={toggleSidebar}
          />
          
          <main className="content-wrapper">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/help" element={<Help />} />
              
              {/* Auth Routes */}
              <Route 
                path="/login" 
                element={
                  !isAuthenticated ? 
                  <Login onLogin={handleLogin} /> : 
                  <Navigate to={userRole === 'admin' ? '/admin/dashboard' : '/citizen/dashboard'} />
                } 
              />
              <Route 
                path="/register" 
                element={
                  !isAuthenticated ? 
                  <Register onLogin={handleLogin} /> : 
                  <Navigate to={userRole === 'admin' ? '/admin/dashboard' : '/citizen/dashboard'} />
                } 
              />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              
              {/* Protected Citizen Routes */}
              <Route 
                path="/citizen/dashboard" 
                element={
                  isAuthenticated ? <CitizenDashboard /> : <Navigate to="/login" />
                } 
              />
              <Route 
                path="/citizen/report-issue" 
                element={
                  isAuthenticated ? <IssueReporting /> : <Navigate to="/login" />
                } 
              />
              <Route 
                path="/citizen/consultations" 
                element={
                  isAuthenticated ? <PolicyConsultation /> : <Navigate to="/login" />
                } 
              />
              <Route 
                path="/citizen/forum" 
                element={
                  isAuthenticated ? <ForumDiscussion /> : <Navigate to="/login" />
                } 
              />
              <Route 
                path="/citizen/profile" 
                element={
                  isAuthenticated ? <ProfileSettings /> : <Navigate to="/login" />
                } 
              />
              
              {/* Protected Admin Routes */}
              <Route 
                path="/admin/dashboard" 
                element={
                  isAuthenticated && userRole === 'admin' ? 
                  <AdminDashboard /> : 
                  <Navigate to="/login" />
                } 
              />
              <Route 
                path="/admin/issues" 
                element={
                  isAuthenticated && userRole === 'admin' ? 
                  <ManageIssues /> : 
                  <Navigate to="/login" />
                } 
              />
              <Route 
                path="/admin/consultations" 
                element={
                  isAuthenticated && userRole === 'admin' ? 
                  <CreateConsultation /> : 
                  <Navigate to="/login" />
                } 
              />
              <Route 
                path="/admin/analytics" 
                element={
                  isAuthenticated && userRole === 'admin' ? 
                  <AnalyticsDashboard /> : 
                  <Navigate to="/login" />
                } 
              />
              <Route 
                path="/admin/users" 
                element={
                  isAuthenticated && userRole === 'admin' ? 
                  <UserManagement /> : 
                  <Navigate to="/login" />
                } 
              />
              
              {/* Redirect based on authentication and role */}
              <Route 
                path="*" 
                element={
                  <Navigate to={
                    isAuthenticated ? 
                    (userRole === 'admin' ? '/admin/dashboard' : '/citizen/dashboard') : 
                    '/'
                  } />
                } 
              />
            </Routes>
          </main>
          
          <Footer />
        </div>
      </div>
    </Router>
  );
}

export default App;