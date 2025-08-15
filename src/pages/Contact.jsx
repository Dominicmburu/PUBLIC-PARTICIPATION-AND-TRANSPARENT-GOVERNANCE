import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';
import { 
  FaPhone, 
  FaEnvelope, 
  FaMapMarkerAlt, 
  FaClock,
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaPaperPlane
} from 'react-icons/fa';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    department: ''
  });
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const departments = [
    'General Inquiry',
    'ICT Department',
    'Governor\'s Office',
    'County Assembly',
    'Health Services',
    'Education',
    'Agriculture',
    'Roads & Infrastructure',
    'Water & Sanitation',
    'Finance & Budget',
    'Human Resources',
    'Legal Affairs'
  ];

  const contactInfo = [
    {
      icon: FaPhone,
      title: 'Phone Numbers',
      items: [
        { label: 'Main Office', value: '+254 61 203 0000' },
        { label: 'Emergency Hotline', value: '0700-NYERI (69374)' },
        { label: 'ICT Support', value: '+254 61 203 0001' }
      ],
      color: '#22c55e'
    },
    {
      icon: FaEnvelope,
      title: 'Email Addresses',
      items: [
        { label: 'General Inquiries', value: 'info@nyeri.go.ke' },
        { label: 'Technical Support', value: 'support@nyeri.go.ke' },
        { label: 'Governor\'s Office', value: 'governor@nyeri.go.ke' }
      ],
      color: '#3b82f6'
    },
    {
      icon: FaMapMarkerAlt,
      title: 'Physical Address',
      items: [
        { label: 'County Headquarters', value: 'Kimathi Way, Nyeri Town' },
        { label: 'P.O. Box', value: 'P.O. Box 156-10100' },
        { label: 'Location', value: 'Nyeri, Kenya' }
      ],
      color: '#f59e0b'
    },
    {
      icon: FaClock,
      title: 'Working Hours',
      items: [
        { label: 'Monday - Friday', value: '8:00 AM - 5:00 PM' },
        { label: 'Saturday', value: '8:00 AM - 1:00 PM' },
        { label: 'Emergency Line', value: '24/7 Available' }
      ],
      color: '#8b5cf6'
    }
  ];

  const officeLocations = [
    {
      name: 'County Headquarters',
      address: 'Kimathi Way, Nyeri Town',
      phone: '+254 61 203 0000',
      services: ['Governor\'s Office', 'County Secretary', 'Finance', 'HR']
    },
    {
      name: 'County Assembly',
      address: 'Assembly Road, Nyeri',
      phone: '+254 61 203 0100',
      services: ['Legislative Services', 'Committee Offices', 'Speaker\'s Office']
    },
    {
      name: 'Health Department',
      address: 'Hospital Road, Nyeri',
      phone: '+254 61 203 0200',
      services: ['Public Health', 'Medical Services', 'Health Records']
    },
    {
      name: 'Education Office',
      address: 'Education Block, Nyeri',
      phone: '+254 61 203 0300',
      services: ['Early Childhood', 'Vocational Training', 'Bursaries']
    }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setShowSuccess(true);
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
        department: ''
      });
      
      // Hide success message after 5 seconds
      setTimeout(() => setShowSuccess(false), 5000);
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="contact-page">
      {/* Hero Section */}
      <section 
        className="hero-section text-white py-5"
        style={{
          background: 'linear-gradient(135deg, #1e40af 0%, #3b82f6 100%)',
          minHeight: '50vh',
          display: 'flex',
          alignItems: 'center'
        }}
      >
        <Container>
          <Row className="text-center">
            <Col>
              <h1 className="display-4 fw-bold mb-4">Contact Us</h1>
              <p className="lead opacity-90">
                We're here to help and answer any question you might have. 
                We look forward to hearing from you.
              </p>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Contact Information */}
      <section className="py-5 bg-white">
        <Container>
          <Row>
            {contactInfo.map((info, index) => {
              const IconComponent = info.icon;
              return (
                <Col lg={3} md={6} key={index} className="mb-4">
                  <Card className="h-100 border-0 shadow-sm text-center">
                    <Card.Body className="p-4">
                      <div 
                        className="mx-auto mb-3 d-flex align-items-center justify-content-center"
                        style={{
                          width: '60px',
                          height: '60px',
                          background: info.color,
                          borderRadius: '16px',
                          color: 'white'
                        }}
                      >
                        <IconComponent style={{ fontSize: '1.5rem' }} />
                      </div>
                      <h5 className="fw-bold text-dark mb-3">{info.title}</h5>
                      {info.items.map((item, itemIndex) => (
                        <div key={itemIndex} className="mb-2">
                          <div className="fw-medium text-dark">{item.label}</div>
                          <div className="text-muted">{item.value}</div>
                        </div>
                      ))}
                    </Card.Body>
                  </Card>
                </Col>
              );
            })}
          </Row>
        </Container>
      </section>

      {/* Contact Form & Map */}
      <section className="py-5" style={{ background: '#f8fafc' }}>
        <Container>
          <Row>
            {/* Contact Form */}
            <Col lg={8} className="mb-4">
              <Card className="border-0 shadow-sm">
                <Card.Body className="p-4">
                  <h3 className="fw-bold text-dark mb-4">Send us a Message</h3>
                  
                  {showSuccess && (
                    <Alert variant="success" className="mb-4">
                      <FaPaperPlane className="me-2" />
                      Thank you! Your message has been sent successfully. 
                      We'll get back to you within 24 hours.
                    </Alert>
                  )}

                  <Form onSubmit={handleSubmit}>
                    <Row>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label className="fw-medium">Email Address *</Form.Label>
                          <Form.Control
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder="Enter your email address"
                            required
                            style={{ borderRadius: '12px' }}
                          />
                        </Form.Group>
                      </Col>
                    </Row>

                    <Row>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label className="fw-medium">Department</Form.Label>
                          <Form.Select
                            name="department"
                            value={formData.department}
                            onChange={handleInputChange}
                            style={{ borderRadius: '12px' }}
                          >
                            <option value="">Select department (optional)</option>
                            {departments.map((dept, index) => (
                              <option key={index} value={dept}>{dept}</option>
                            ))}
                          </Form.Select>
                        </Form.Group>
                      </Col>
                      
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label className="fw-medium">Subject *</Form.Label>
                          <Form.Control
                            type="text"
                            name="subject"
                            value={formData.subject}
                            onChange={handleInputChange}
                            placeholder="Brief subject of your message"
                            required
                            style={{ borderRadius: '12px' }}
                          />
                        </Form.Group>
                      </Col>
                    </Row>

                    <Form.Group className="mb-4">
                      <Form.Label className="fw-medium">Message *</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={6}
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        placeholder="Please provide details about your inquiry, feedback, or concern..."
                        required
                        style={{ borderRadius: '12px' }}
                      />
                    </Form.Group>

                    <Button
                      type="submit"
                      size="lg"
                      disabled={loading}
                      style={{
                        background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
                        border: 'none',
                        borderRadius: '12px',
                        padding: '12px 30px'
                      }}
                    >
                      {loading ? (
                        <>
                          <span className="spinner-border spinner-border-sm me-2" />
                          Sending Message...
                        </>
                      ) : (
                        <>
                          <FaPaperPlane className="me-2" />
                          Send Message
                        </>
                      )}
                    </Button>
                  </Form>
                </Card.Body>
              </Card>
            </Col>

            {/* Quick Contact & Social */}
            <Col lg={4}>
              {/* Emergency Contacts */}
              <Card className="border-0 shadow-sm mb-4">
                <Card.Header className="bg-danger text-white">
                  <h6 className="fw-bold mb-0">Emergency Contacts</h6>
                </Card.Header>
                <Card.Body>
                  <div className="mb-3">
                    <div className="fw-bold text-danger">Emergency Services: 999</div>
                    <small className="text-muted">Police, Fire, Medical emergencies</small>
                  </div>
                  
                  <div className="mb-3">
                    <div className="fw-bold text-warning">County Hotline: 0700-NYERI</div>
                    <small className="text-muted">24/7 county services hotline</small>
                  </div>
                  
                  <div>
                    <div className="fw-bold text-info">Water Emergencies: 0711-WATER</div>
                    <small className="text-muted">Water supply emergencies</small>
                  </div>
                </Card.Body>
              </Card>

              {/* Social Media */}
              <Card className="border-0 shadow-sm mb-4">
                <Card.Header className="bg-primary text-white">
                  <h6 className="fw-bold mb-0">Follow Us</h6>
                </Card.Header>
                <Card.Body>
                  <p className="text-muted mb-3">
                    Stay connected with Nyeri County on social media for updates and announcements.
                  </p>
                  
                  <div className="d-flex gap-3">
                    <a 
                      href="#" 
                      className="btn btn-outline-primary"
                      style={{ borderRadius: '50%', width: '45px', height: '45px' }}
                    >
                      <FaFacebook />
                    </a>
                    <a 
                      href="#" 
                      className="btn btn-outline-info"
                      style={{ borderRadius: '50%', width: '45px', height: '45px' }}
                    >
                      <FaTwitter />
                    </a>
                    <a 
                      href="#" 
                      className="btn btn-outline-danger"
                      style={{ borderRadius: '50%', width: '45px', height: '45px' }}
                    >
                      <FaInstagram />
                    </a>
                    <a 
                      href="#" 
                      className="btn btn-outline-primary"
                      style={{ borderRadius: '50%', width: '45px', height: '45px' }}
                    >
                      <FaLinkedin />
                    </a>
                  </div>
                </Card.Body>
              </Card>

              {/* Office Hours */}
              <Card className="border-0 shadow-sm">
                <Card.Header className="bg-success text-white">
                  <h6 className="fw-bold mb-0">Office Hours</h6>
                </Card.Header>
                <Card.Body>
                  <div className="mb-2">
                    <div className="d-flex justify-content-between">
                      <span className="fw-medium">Monday - Friday</span>
                      <span className="text-muted">8:00 AM - 5:00 PM</span>
                    </div>
                  </div>
                  <div className="mb-2">
                    <div className="d-flex justify-content-between">
                      <span className="fw-medium">Saturday</span>
                      <span className="text-muted">8:00 AM - 1:00 PM</span>
                    </div>
                  </div>
                  <div className="mb-2">
                    <div className="d-flex justify-content-between">
                      <span className="fw-medium">Sunday</span>
                      <span className="text-muted">Closed</span>
                    </div>
                  </div>
                  <hr />
                  <div>
                    <div className="d-flex justify-content-between">
                      <span className="fw-medium text-success">Emergency Line</span>
                      <span className="text-success fw-bold">24/7</span>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Office Locations */}
      <section className="py-5 bg-white">
        <Container>
          <Row className="mb-4">
            <Col>
              <h2 className="fw-bold text-dark text-center mb-3">Office Locations</h2>
              <p className="text-muted text-center">
                Visit our offices for in-person assistance and services
              </p>
            </Col>
          </Row>
          
          <Row>
            {officeLocations.map((office, index) => (
              <Col lg={3} md={6} key={index} className="mb-4">
                <Card className="h-100 border-0 shadow-sm">
                  <Card.Body className="p-4">
                    <h5 className="fw-bold text-dark mb-3">{office.name}</h5>
                    
                    <div className="mb-3">
                      <div className="d-flex align-items-start">
                        <FaMapMarkerAlt className="text-danger me-2 mt-1" />
                        <div>
                          <small className="text-muted">Address</small>
                          <div className="fw-medium">{office.address}</div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mb-3">
                      <div className="d-flex align-items-center">
                        <FaPhone className="text-success me-2" />
                        <div>
                          <small className="text-muted">Phone</small>
                          <div className="fw-medium">{office.phone}</div>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <small className="text-muted d-block mb-2">Services:</small>
                      <div className="d-flex flex-wrap gap-1">
                        {office.services.map((service, serviceIndex) => (
                          <span 
                            key={serviceIndex}
                            className="badge bg-light text-dark"
                            style={{ fontSize: '0.7rem' }}
                          >
                            {service}
                          </span>
                        ))}
                      </div>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Map Section */}
      <section className="py-5" style={{ background: '#f8fafc' }}>
        <Container>
          <Row className="mb-4">
            <Col>
              <h2 className="fw-bold text-dark text-center mb-3">Find Us</h2>
              <p className="text-muted text-center">
                Nyeri County Government Headquarters
              </p>
            </Col>
          </Row>
          
          <Row>
            <Col>
              <Card className="border-0 shadow-sm">
                <Card.Body className="p-0">
                  {/* Placeholder for map - In a real app, you'd integrate with Google Maps or similar */}
                  <div 
                    className="w-100 d-flex align-items-center justify-content-center text-muted"
                    style={{ 
                      height: '400px',
                      background: 'linear-gradient(45deg, #f8fafc, #e2e8f0)',
                      borderRadius: '12px'
                    }}
                  >
                    <div className="text-center">
                      <FaMapMarkerAlt style={{ fontSize: '3rem', color: '#ef4444' }} />
                      <h5 className="mt-3">Interactive Map</h5>
                      <p>Kimathi Way, Nyeri Town</p>
                      <Button 
                        variant="primary" 
                        href="https://maps.google.com/?q=Nyeri+County+Government"
                        target="_blank"
                        style={{ borderRadius: '8px' }}
                      >
                        Open in Google Maps
                      </Button>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>

      {/* FAQ Section */}
      <section className="py-5 bg-white">
        <Container>
          <Row className="mb-4">
            <Col>
              <h2 className="fw-bold text-dark text-center mb-3">Frequently Asked Questions</h2>
              <p className="text-muted text-center">
                Quick answers to common questions
              </p>
            </Col>
          </Row>
          
          <Row>
            <Col lg={8} className="mx-auto">
              <div className="accordion" id="faqAccordion">
                <Card className="border-0 shadow-sm mb-3">
                  <Card.Header className="bg-white">
                    <h6 className="fw-bold mb-0">How do I register for the digital platform?</h6>
                  </Card.Header>
                  <Card.Body>
                    <p className="text-muted mb-0">
                      Click on "Register" in the top navigation, fill out the registration form 
                      with your personal details, and verify your email address. You'll then have 
                      access to all platform features.
                    </p>
                  </Card.Body>
                </Card>

                <Card className="border-0 shadow-sm mb-3">
                  <Card.Header className="bg-white">
                    <h6 className="fw-bold mb-0">How long does it take to get a response to reported issues?</h6>
                  </Card.Header>
                  <Card.Body>
                    <p className="text-muted mb-0">
                      We aim to respond to all reported issues within 24-48 hours. Emergency 
                      issues are prioritized and may receive immediate attention. You'll receive 
                      email notifications about the status of your reports.
                    </p>
                  </Card.Body>
                </Card>

                <Card className="border-0 shadow-sm mb-3">
                  <Card.Header className="bg-white">
                    <h6 className="fw-bold mb-0">Can I participate in consultations anonymously?</h6>
                  </Card.Header>
                  <Card.Body>
                    <p className="text-muted mb-0">
                      While you need to be registered to participate, your personal identity 
                      is not revealed in consultation responses. Only aggregate data and 
                      anonymized feedback are used in policy development.
                    </p>
                  </Card.Body>
                </Card>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </div>
  );
};

export default Contact;