import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert, InputGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaUser, FaLock, FaEye, FaEyeSlash, FaUserShield } from 'react-icons/fa';

const Login = ({ onLogin }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [loginType, setLoginType] = useState('citizen'); // 'citizen' or 'admin'

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Simulate login API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Demo: Check for demo credentials
      if (formData.email === 'admin@nyeri.gov.ke' && formData.password === 'admin123') {
        onLogin('admin');
      } else if (formData.email && formData.password) {
        onLogin('citizen');
      } else {
        throw new Error('Invalid credentials');
      }
    } catch (err) {
      setError('Invalid email or password. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleDemoLogin = (role) => {
    setLoading(true);
    setTimeout(() => {
      onLogin(role);
      setLoading(false);
    }, 1000);
  };

  return (
    <div 
      className="login-page min-vh-100 d-flex align-items-center"
      style={{
        background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
        paddingTop: '2rem',
        paddingBottom: '2rem'
      }}
    >
      <Container>
        <Row className="justify-content-center">
          <Col md={6} lg={5}>
            <Card 
              className="shadow-lg border-0"
              style={{ borderRadius: '20px' }}
            >
              <Card.Body className="p-5">
                {/* Header */}
                <div className="text-center mb-4">
                  <div 
                    className="mx-auto mb-3 d-flex align-items-center justify-content-center"
                    style={{
                      width: '80px',
                      height: '80px',
                      background: 'linear-gradient(135deg, #1e40af 0%, #3b82f6 100%)',
                      borderRadius: '20px',
                      color: 'white',
                      fontSize: '2rem'
                    }}
                  >
                    🏛️
                  </div>
                  <h2 className="fw-bold text-dark">Welcome Back</h2>
                  <p className="text-muted">Sign in to your Nyeri County account</p>
                </div>

                {/* Login Type Toggle */}
                <div className="mb-4">
                  <div 
                    className="btn-group w-100"
                    role="group"
                    style={{ borderRadius: '12px' }}
                  >
                    <input
                      type="radio"
                      className="btn-check"
                      name="loginType"
                      id="citizen"
                      checked={loginType === 'citizen'}
                      onChange={() => setLoginType('citizen')}
                    />
                    <label 
                      className="btn btn-outline-primary"
                      htmlFor="citizen"
                      style={{ 
                        borderRadius: '12px 0 0 12px',
                        padding: '12px'
                      }}
                    >
                      <FaUser className="me-2" />
                      Citizen
                    </label>

                    <input
                      type="radio"
                      className="btn-check"
                      name="loginType"
                      id="admin"
                      checked={loginType === 'admin'}
                      onChange={() => setLoginType('admin')}
                    />
                    <label 
                      className="btn btn-outline-primary"
                      htmlFor="admin"
                      style={{ 
                        borderRadius: '0 12px 12px 0',
                        padding: '12px'
                      }}
                    >
                      <FaUserShield className="me-2" />
                      Administrator
                    </label>
                  </div>
                </div>

                {error && (
                  <Alert variant="danger" className="mb-4" style={{ borderRadius: '12px' }}>
                    {error}
                  </Alert>
                )}

                {/* Login Form */}
                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3">
                    <Form.Label className="fw-medium">Email Address</Form.Label>
                    <InputGroup>
                      <InputGroup.Text 
                        style={{ 
                          background: '#f8fafc',
                          border: '1px solid #e2e8f0',
                          borderRadius: '12px 0 0 12px'
                        }}
                      >
                        <FaUser className="text-muted" />
                      </InputGroup.Text>
                      <Form.Control
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Enter your email"
                        required
                        style={{ 
                          borderRadius: '0 12px 12px 0',
                          border: '1px solid #e2e8f0',
                          padding: '12px'
                        }}
                      />
                    </InputGroup>
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label className="fw-medium">Password</Form.Label>
                    <InputGroup>
                      <InputGroup.Text 
                        style={{ 
                          background: '#f8fafc',
                          border: '1px solid #e2e8f0',
                          borderRadius: '12px 0 0 12px'
                        }}
                      >
                        <FaLock className="text-muted" />
                      </InputGroup.Text>
                      <Form.Control
                        type={showPassword ? 'text' : 'password'}
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Enter your password"
                        required
                        style={{ 
                          border: '1px solid #e2e8f0',
                          padding: '12px'
                        }}
                      />
                      <InputGroup.Text 
                        style={{ 
                          background: '#f8fafc',
                          border: '1px solid #e2e8f0',
                          borderRadius: '0 12px 12px 0',
                          cursor: 'pointer'
                        }}
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                      </InputGroup.Text>
                    </InputGroup>
                  </Form.Group>

                  <div className="d-flex justify-content-between align-items-center mb-4">
                    <Form.Check
                      type="checkbox"
                      name="rememberMe"
                      checked={formData.rememberMe}
                      onChange={handleChange}
                      label="Remember me"
                      style={{ fontSize: '0.9rem' }}
                    />
                    <Link 
                      to="/forgot-password" 
                      className="text-primary text-decoration-none"
                      style={{ fontSize: '0.9rem' }}
                    >
                      Forgot password?
                    </Link>
                  </div>

                  <Button
                    type="submit"
                    className="w-100 fw-bold"
                    size="lg"
                    disabled={loading}
                    style={{
                      background: 'linear-gradient(135deg, #1e40af 0%, #3b82f6 100%)',
                      border: 'none',
                      borderRadius: '12px',
                      padding: '12px'
                    }}
                  >
                    {loading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" />
                        Signing In...
                      </>
                    ) : (
                      'Sign In'
                    )}
                  </Button>
                </Form>

                {/* Demo Login Buttons */}
                <div className="mt-4">
                  <hr className="my-4" />
                  <p className="text-center text-muted mb-3" style={{ fontSize: '0.9rem' }}>
                    Demo Login (For Testing)
                  </p>
                  <div className="d-grid gap-2">
                    <Button
                      variant="outline-success"
                      onClick={() => handleDemoLogin('citizen')}
                      disabled={loading}
                      style={{ borderRadius: '12px' }}
                    >
                      <FaUser className="me-2" />
                      Demo Citizen Login
                    </Button>
                    <Button
                      variant="outline-warning"
                      onClick={() => handleDemoLogin('admin')}
                      disabled={loading}
                      style={{ borderRadius: '12px' }}
                    >
                      <FaUserShield className="me-2" />
                      Demo Admin Login
                    </Button>
                  </div>
                </div>

                {/* Register Link */}
                <div className="text-center mt-4">
                  <p className="text-muted mb-0">
                    Don't have an account?{' '}
                    <Link 
                      to="/register" 
                      className="text-primary fw-bold text-decoration-none"
                    >
                      Create Account
                    </Link>
                  </p>
                </div>
              </Card.Body>
            </Card>

            {/* Additional Info */}
            <div className="text-center mt-4">
              <small className="text-muted">
                Secure login powered by Nyeri County Digital Platform
              </small>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Login;