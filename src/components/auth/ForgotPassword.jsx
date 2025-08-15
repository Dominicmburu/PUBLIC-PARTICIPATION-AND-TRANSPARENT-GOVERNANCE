import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaEnvelope, FaArrowLeft, FaCheckCircle } from 'react-icons/fa';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email.trim()) {
      setError('Email address is required');
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Please enter a valid email address');
      return;
    }

    setLoading(true);
    setError('');

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      setSuccess(true);
    } catch (err) {
      setError('Failed to send reset email. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div 
        className="forgot-password-page min-vh-100 d-flex align-items-center"
        style={{
          background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)'
        }}
      >
        <Container>
          <Row className="justify-content-center">
            <Col md={6} lg={4}>
              <Card 
                className="shadow-lg border-0 text-center"
                style={{ borderRadius: '20px' }}
              >
                <Card.Body className="p-5">
                  <div 
                    className="mx-auto mb-4 d-flex align-items-center justify-content-center"
                    style={{
                      width: '80px',
                      height: '80px',
                      background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
                      borderRadius: '50%',
                      color: 'white'
                    }}
                  >
                    <FaCheckCircle style={{ fontSize: '2.5rem' }} />
                  </div>
                  
                  <h3 className="fw-bold text-dark mb-3">Check Your Email</h3>
                  <p className="text-muted mb-4">
                    We've sent a password reset link to <strong>{email}</strong>
                  </p>
                  <p className="text-muted mb-4">
                    Click the link in the email to reset your password. If you don't see the email, 
                    check your spam folder.
                  </p>
                  
                  <div className="d-grid gap-2">
                    <Button
                      as={Link}
                      to="/login"
                      variant="primary"
                      style={{ borderRadius: '12px' }}
                    >
                      Back to Login
                    </Button>
                    <Button
                      variant="outline-secondary"
                      onClick={() => setSuccess(false)}
                      style={{ borderRadius: '12px' }}
                    >
                      Send Another Email
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }

  return (
    <div 
      className="forgot-password-page min-vh-100 d-flex align-items-center"
      style={{
        background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)'
      }}
    >
      <Container>
        <Row className="justify-content-center">
          <Col md={6} lg={4}>
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
                    🔐
                  </div>
                  <h2 className="fw-bold text-dark">Forgot Password?</h2>
                  <p className="text-muted">
                    No worries! Enter your email and we'll send you a reset link.
                  </p>
                </div>

                {error && (
                  <Alert variant="danger" className="mb-4" style={{ borderRadius: '12px' }}>
                    {error}
                  </Alert>
                )}

                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-4">
                    <Form.Label className="fw-medium">Email Address</Form.Label>
                    <div className="position-relative">
                      <Form.Control
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email address"
                        style={{ 
                          borderRadius: '12px',
                          paddingLeft: '45px',
                          height: '50px'
                        }}
                      />
                      <FaEnvelope 
                        className="position-absolute text-muted"
                        style={{ 
                          left: '15px',
                          top: '50%',
                          transform: 'translateY(-50%)'
                        }}
                      />
                    </div>
                  </Form.Group>

                  <div className="d-grid mb-4">
                    <Button
                      type="submit"
                      size="lg"
                      disabled={loading}
                      style={{
                        background: 'linear-gradient(135deg, #1e40af 0%, #3b82f6 100%)',
                        border: 'none',
                        borderRadius: '12px',
                        height: '50px'
                      }}
                    >
                      {loading ? (
                        <>
                          <span className="spinner-border spinner-border-sm me-2" />
                          Sending Reset Link...
                        </>
                      ) : (
                        'Send Reset Link'
                      )}
                    </Button>
                  </div>
                </Form>

                {/* Back to Login */}
                <div className="text-center">
                  <Link 
                    to="/login" 
                    className="text-primary text-decoration-none d-flex align-items-center justify-content-center"
                  >
                    <FaArrowLeft className="me-2" />
                    Back to Login
                  </Link>
                </div>
              </Card.Body>
            </Card>

            {/* Additional Help */}
            <div className="text-center mt-4">
              <p className="text-muted mb-2">
                <small>Still having trouble accessing your account?</small>
              </p>
              <Link 
                to="/contact" 
                className="text-primary text-decoration-none"
              >
                <small>Contact Support</small>
              </Link>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ForgotPassword;