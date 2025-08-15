import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert, InputGroup, ProgressBar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { 
  FaUser, 
  FaEnvelope, 
  FaLock, 
  FaEye, 
  FaEyeSlash, 
  FaPhone,
  FaMapMarkerAlt,
  FaIdCard,
  FaCheckCircle
} from 'react-icons/fa';

const Register = ({ onLogin }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Personal Information
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    idNumber: '',
    
    // Location Information
    constituency: '',
    ward: '',
    address: '',
    
    // Account Security
    password: '',
    confirmPassword: '',
    agreeToTerms: false,
    subscribeToUpdates: true
  });
  
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const constituencies = [
    'Nyeri Town', 'Othaya', 'Mukurwe-ini', 'Tetu', 'Kieni East', 'Kieni West'
  ];

  const wards = {
    'Nyeri Town': ['Kiganjo/Mathari', 'Ruring\'u', 'Gatitu/Muruguru', 'Rware', 'Kamakwa/Mukaro'],
    'Othaya': ['Karima', 'Mahiga', 'Iria-ini', 'Chinga'],
    'Mukurwe-ini': ['Rugi', 'Gikondi', 'Mukurwe-ini West', 'Mukurwe-ini Central'],
    'Tetu': ['Dedan Kimathi', 'Wamagana', 'Aguthi-Gaaki'],
    'Kieni East': ['Gatarakwa', 'Thegu River', 'Mweiga', 'Naromoru/Kiamathaga'],
    'Kieni West': ['Mugunda', 'Kabaru', 'Gakawa', 'Mwiyogo/Endarasha']
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    // Clear errors when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateStep = (step) => {
    const newErrors = {};

    if (step === 1) {
      if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
      if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
      if (!formData.email.trim()) newErrors.email = 'Email is required';
      else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
      if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
      if (!formData.idNumber.trim()) newErrors.idNumber = 'ID number is required';
    }

    if (step === 2) {
      if (!formData.constituency) newErrors.constituency = 'Constituency is required';
      if (!formData.ward) newErrors.ward = 'Ward is required';
      if (!formData.address.trim()) newErrors.address = 'Address is required';
    }

    if (step === 3) {
      if (!formData.password) newErrors.password = 'Password is required';
      else if (formData.password.length < 8) newErrors.password = 'Password must be at least 8 characters';
      if (!formData.confirmPassword) newErrors.confirmPassword = 'Please confirm your password';
      else if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
      if (!formData.agreeToTerms) newErrors.agreeToTerms = 'You must agree to the terms and conditions';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handleBack = () => {
    setCurrentStep(prev => prev - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateStep(3)) return;

    setLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Success - log in the user
      onLogin('citizen');
    } catch (error) {
      setErrors({ submit: 'Registration failed. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  const getPasswordStrength = () => {
    const password = formData.password;
    let strength = 0;
    
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    
    return strength;
  };

  const getStrengthColor = () => {
    const strength = getPasswordStrength();
    if (strength <= 2) return 'danger';
    if (strength === 3) return 'warning';
    if (strength === 4) return 'info';
    return 'success';
  };

  const getStrengthText = () => {
    const strength = getPasswordStrength();
    if (strength <= 2) return 'Weak';
    if (strength === 3) return 'Fair';
    if (strength === 4) return 'Good';
    return 'Strong';
  };

  const renderStep1 = () => (
    <>
      <h4 className="fw-bold text-center mb-4">Personal Information</h4>
      
      <Row>
        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label className="fw-medium">First Name *</Form.Label>
            <InputGroup>
              <InputGroup.Text>
                <FaUser className="text-muted" />
              </InputGroup.Text>
              <Form.Control
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                placeholder="Enter your first name"
                isInvalid={!!errors.firstName}
              />
            </InputGroup>
            <Form.Control.Feedback type="invalid">
              {errors.firstName}
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
        
        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label className="fw-medium">Last Name *</Form.Label>
            <InputGroup>
              <InputGroup.Text>
                <FaUser className="text-muted" />
              </InputGroup.Text>
              <Form.Control
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                placeholder="Enter your last name"
                isInvalid={!!errors.lastName}
              />
            </InputGroup>
            <Form.Control.Feedback type="invalid">
              {errors.lastName}
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
      </Row>

      <Form.Group className="mb-3">
        <Form.Label className="fw-medium">Email Address *</Form.Label>
        <InputGroup>
          <InputGroup.Text>
            <FaEnvelope className="text-muted" />
          </InputGroup.Text>
          <Form.Control
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Enter your email address"
            isInvalid={!!errors.email}
          />
        </InputGroup>
        <Form.Control.Feedback type="invalid">
          {errors.email}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label className="fw-medium">Phone Number *</Form.Label>
        <InputGroup>
          <InputGroup.Text>
            <FaPhone className="text-muted" />
          </InputGroup.Text>
          <Form.Control
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            placeholder="0700123456"
            isInvalid={!!errors.phone}
          />
        </InputGroup>
        <Form.Control.Feedback type="invalid">
          {errors.phone}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-4">
        <Form.Label className="fw-medium">National ID Number *</Form.Label>
        <InputGroup>
          <InputGroup.Text>
            <FaIdCard className="text-muted" />
          </InputGroup.Text>
          <Form.Control
            type="text"
            name="idNumber"
            value={formData.idNumber}
            onChange={handleInputChange}
            placeholder="Enter your ID number"
            isInvalid={!!errors.idNumber}
          />
        </InputGroup>
        <Form.Control.Feedback type="invalid">
          {errors.idNumber}
        </Form.Control.Feedback>
      </Form.Group>
    </>
  );

  const renderStep2 = () => (
    <>
      <h4 className="fw-bold text-center mb-4">Location Information</h4>
      
      <Form.Group className="mb-3">
        <Form.Label className="fw-medium">Constituency *</Form.Label>
        <Form.Select
          name="constituency"
          value={formData.constituency}
          onChange={handleInputChange}
          isInvalid={!!errors.constituency}
        >
          <option value="">Select your constituency</option>
          {constituencies.map(constituency => (
            <option key={constituency} value={constituency}>
              {constituency}
            </option>
          ))}
        </Form.Select>
        <Form.Control.Feedback type="invalid">
          {errors.constituency}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label className="fw-medium">Ward *</Form.Label>
        <Form.Select
          name="ward"
          value={formData.ward}
          onChange={handleInputChange}
          isInvalid={!!errors.ward}
          disabled={!formData.constituency}
        >
          <option value="">Select your ward</option>
          {formData.constituency && wards[formData.constituency]?.map(ward => (
            <option key={ward} value={ward}>
              {ward}
            </option>
          ))}
        </Form.Select>
        <Form.Control.Feedback type="invalid">
          {errors.ward}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-4">
        <Form.Label className="fw-medium">Physical Address *</Form.Label>
        <InputGroup>
          <InputGroup.Text>
            <FaMapMarkerAlt className="text-muted" />
          </InputGroup.Text>
          <Form.Control
            as="textarea"
            rows={3}
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            placeholder="Enter your complete physical address"
            isInvalid={!!errors.address}
          />
        </InputGroup>
        <Form.Control.Feedback type="invalid">
          {errors.address}
        </Form.Control.Feedback>
      </Form.Group>
    </>
  );

  const renderStep3 = () => (
    <>
      <h4 className="fw-bold text-center mb-4">Account Security</h4>
      
      <Form.Group className="mb-3">
        <Form.Label className="fw-medium">Password *</Form.Label>
        <InputGroup>
          <InputGroup.Text>
            <FaLock className="text-muted" />
          </InputGroup.Text>
          <Form.Control
            type={showPassword ? 'text' : 'password'}
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            placeholder="Create a strong password"
            isInvalid={!!errors.password}
          />
          <InputGroup.Text 
            style={{ cursor: 'pointer' }}
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </InputGroup.Text>
        </InputGroup>
        
        {formData.password && (
          <div className="mt-2">
            <div className="d-flex justify-content-between mb-1">
              <small className="text-muted">Password Strength:</small>
              <small className={`text-${getStrengthColor()}`}>
                {getStrengthText()}
              </small>
            </div>
            <ProgressBar 
              now={(getPasswordStrength() / 5) * 100} 
              variant={getStrengthColor()}
              style={{ height: '4px' }}
            />
          </div>
        )}
        
        <Form.Control.Feedback type="invalid">
          {errors.password}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-4">
        <Form.Label className="fw-medium">Confirm Password *</Form.Label>
        <InputGroup>
          <InputGroup.Text>
            <FaLock className="text-muted" />
          </InputGroup.Text>
          <Form.Control
            type={showConfirmPassword ? 'text' : 'password'}
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleInputChange}
            placeholder="Confirm your password"
            isInvalid={!!errors.confirmPassword}
          />
          <InputGroup.Text 
            style={{ cursor: 'pointer' }}
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          >
            {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
          </InputGroup.Text>
        </InputGroup>
        <Form.Control.Feedback type="invalid">
          {errors.confirmPassword}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Check
          type="checkbox"
          name="agreeToTerms"
          checked={formData.agreeToTerms}
          onChange={handleInputChange}
          isInvalid={!!errors.agreeToTerms}
          label={
            <span>
              I agree to the{' '}
              <Link to="/terms" className="text-primary">
                Terms of Service
              </Link>{' '}
              and{' '}
              <Link to="/privacy" className="text-primary">
                Privacy Policy
              </Link>
            </span>
          }
        />
        <Form.Control.Feedback type="invalid">
          {errors.agreeToTerms}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-4">
        <Form.Check
          type="checkbox"
          name="subscribeToUpdates"
          checked={formData.subscribeToUpdates}
          onChange={handleInputChange}
          label="Subscribe to county updates and newsletters"
        />
      </Form.Group>

      {errors.submit && (
        <Alert variant="danger" className="mb-4">
          {errors.submit}
        </Alert>
      )}
    </>
  );

  return (
    <div 
      className="register-page min-vh-100 d-flex align-items-center"
      style={{
        background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
        paddingTop: '2rem',
        paddingBottom: '2rem'
      }}
    >
      <Container>
        <Row className="justify-content-center">
          <Col md={8} lg={6}>
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
                  <h2 className="fw-bold text-dark">Create Account</h2>
                  <p className="text-muted">Join the Nyeri County digital community</p>
                </div>

                {/* Progress Bar */}
                <div className="mb-4">
                  <div className="d-flex justify-content-between mb-2">
                    <small className="fw-bold text-primary">Step {currentStep} of 3</small>
                    <small className="text-muted">{Math.round((currentStep / 3) * 100)}% Complete</small>
                  </div>
                  <ProgressBar 
                    now={(currentStep / 3) * 100} 
                    style={{ height: '6px', borderRadius: '3px' }}
                  />
                </div>

                <Form onSubmit={handleSubmit}>
                  {currentStep === 1 && renderStep1()}
                  {currentStep === 2 && renderStep2()}
                  {currentStep === 3 && renderStep3()}

                  {/* Navigation Buttons */}
                  <div className="d-flex justify-content-between">
                    {currentStep > 1 && (
                      <Button
                        type="button"
                        variant="outline-secondary"
                        onClick={handleBack}
                        style={{ borderRadius: '12px' }}
                      >
                        Back
                      </Button>
                    )}
                    
                    <div className="ms-auto">
                      {currentStep < 3 ? (
                        <Button
                          type="button"
                          onClick={handleNext}
                          style={{
                            background: 'linear-gradient(135deg, #1e40af 0%, #3b82f6 100%)',
                            border: 'none',
                            borderRadius: '12px'
                          }}
                        >
                          Next Step
                        </Button>
                      ) : (
                        <Button
                          type="submit"
                          disabled={loading}
                          style={{
                            background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
                            border: 'none',
                            borderRadius: '12px'
                          }}
                        >
                          {loading ? (
                            <>
                              <span className="spinner-border spinner-border-sm me-2" />
                              Creating Account...
                            </>
                          ) : (
                            <>
                              <FaCheckCircle className="me-2" />
                              Create Account
                            </>
                          )}
                        </Button>
                      )}
                    </div>
                  </div>
                </Form>

                {/* Login Link */}
                <div className="text-center mt-4">
                  <p className="text-muted mb-0">
                    Already have an account?{' '}
                    <Link 
                      to="/login" 
                      className="text-primary fw-bold text-decoration-none"
                    >
                      Sign In
                    </Link>
                  </p>
                </div>
              </Card.Body>
            </Card>

            {/* Additional Info */}
            <div className="text-center mt-4">
              <small className="text-muted">
                By registering, you're joining the digital governance revolution in Nyeri County
              </small>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Register;