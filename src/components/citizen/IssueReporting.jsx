import React, { useState } from 'react';
import { 
  Container, 
  Row, 
  Col, 
  Card, 
  Form, 
  Button, 
  Alert, 
  Badge,
  Modal,
  ProgressBar 
} from 'react-bootstrap';
import { 
  FaCamera, 
  FaMapMarkerAlt, 
  FaUpload, 
  FaCheckCircle,
  FaTimes,
  FaExclamationTriangle,
  FaRoad,
  FaLightbulb,
  FaTint,
  FaTrash,
  FaShieldAlt,
  FaTools
} from 'react-icons/fa';

const IssueReporting = () => {
  const [formData, setFormData] = useState({
    category: '',
    title: '',
    description: '',
    location: '',
    priority: 'medium',
    coordinates: { lat: null, lng: null }
  });
  
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [locationLoading, setLocationLoading] = useState(false);
  const [formErrors, setFormErrors] = useState({});

  const categories = [
    { 
      id: 'roads', 
      name: 'Roads & Infrastructure', 
      icon: FaRoad, 
      color: '#ef4444',
      examples: ['Potholes', 'Road damage', 'Missing signs']
    },
    { 
      id: 'lighting', 
      name: 'Street Lighting', 
      icon: FaLightbulb, 
      color: '#f59e0b',
      examples: ['Broken lights', 'Dark areas', 'Electrical issues']
    },
    { 
      id: 'water', 
      name: 'Water & Sanitation', 
      icon: FaTint, 
      color: '#3b82f6',
      examples: ['Water leaks', 'Sewage issues', 'Pipe bursts']
    },
    { 
      id: 'waste', 
      name: 'Waste Management', 
      icon: FaTrash, 
      color: '#22c55e',
      examples: ['Uncollected garbage', 'Illegal dumping', 'Overflowing bins']
    },
    { 
      id: 'security', 
      name: 'Public Safety', 
      icon: FaShieldAlt, 
      color: '#8b5cf6',
      examples: ['Crime incidents', 'Safety hazards', 'Emergency issues']
    },
    { 
      id: 'maintenance', 
      name: 'Public Facilities', 
      icon: FaTools, 
      color: '#06b6d4',
      examples: ['Broken equipment', 'Facility repairs', 'Maintenance needs']
    }
  ];

  const priorities = [
    { value: 'low', label: 'Low', color: '#22c55e', description: 'Can wait for scheduled maintenance' },
    { value: 'medium', label: 'Medium', color: '#f59e0b', description: 'Should be addressed soon' },
    { value: 'high', label: 'High', color: '#ef4444', description: 'Requires immediate attention' },
    { value: 'urgent', label: 'Urgent', color: '#dc2626', description: 'Emergency - safety risk' }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (formErrors[name]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    
    files.forEach(file => {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (event) => {
          setImages(prev => [...prev, {
            id: Date.now() + Math.random(),
            file: file,
            preview: event.target.result,
            name: file.name
          }]);
        };
        reader.readAsDataURL(file);
      }
    });
  };

  const removeImage = (imageId) => {
    setImages(prev => prev.filter(img => img.id !== imageId));
  };

  const getCurrentLocation = () => {
    setLocationLoading(true);
    
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setFormData(prev => ({
            ...prev,
            coordinates: {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            },
            location: `${position.coords.latitude.toFixed(6)}, ${position.coords.longitude.toFixed(6)}`
          }));
          setLocationLoading(false);
        },
        (error) => {
          console.error('Error getting location:', error);
          setLocationLoading(false);
          alert('Could not get your location. Please enter it manually.');
        }
      );
    } else {
      setLocationLoading(false);
      alert('Geolocation is not supported by this browser.');
    }
  };

  const validateForm = () => {
    const errors = {};
    
    if (!formData.category) errors.category = 'Please select a category';
    if (!formData.title.trim()) errors.title = 'Title is required';
    if (!formData.description.trim()) errors.description = 'Description is required';
    if (!formData.location.trim()) errors.location = 'Location is required';
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Show success modal
      setShowSuccess(true);
      
      // Reset form
      setFormData({
        category: '',
        title: '',
        description: '',
        location: '',
        priority: 'medium',
        coordinates: { lat: null, lng: null }
      });
      setImages([]);
      
    } catch (error) {
      console.error('Error submitting report:', error);
    } finally {
      setLoading(false);
    }
  };

  const selectedCategory = categories.find(cat => cat.id === formData.category);
  const selectedPriority = priorities.find(p => p.value === formData.priority);

  return (
    <div className="issue-reporting">
      <Container fluid className="p-4">
        {/* Header */}
        <Row className="mb-4">
          <Col>
            <h1 className="h3 fw-bold text-dark mb-2">
              Report an Issue 📋
            </h1>
            <p className="text-muted">
              Help us improve Nyeri County by reporting infrastructure and community issues
            </p>
          </Col>
        </Row>

        <Row>
          <Col lg={8}>
            <Card className="border-0 shadow-sm">
              <Card.Body className="p-4">
                <Form onSubmit={handleSubmit}>
                  {/* Category Selection */}
                  <Form.Group className="mb-4">
                    <Form.Label className="fw-bold mb-3">Issue Category *</Form.Label>
                    <Row>
                      {categories.map((category) => {
                        const IconComponent = category.icon;
                        const isSelected = formData.category === category.id;
                        
                        return (
                          <Col md={6} lg={4} key={category.id} className="mb-3">
                            <div
                              className={`category-card p-3 border rounded-3 cursor-pointer transition-all ${
                                isSelected ? 'border-primary bg-primary bg-opacity-10' : 'border-light'
                              }`}
                              style={{ cursor: 'pointer' }}
                              onClick={() => setFormData(prev => ({ ...prev, category: category.id }))}
                            >
                              <div className="text-center">
                                <div 
                                  className="mb-2 mx-auto d-flex align-items-center justify-content-center"
                                  style={{
                                    width: '40px',
                                    height: '40px',
                                    background: isSelected ? category.color : '#f8fafc',
                                    borderRadius: '10px',
                                    color: isSelected ? 'white' : category.color
                                  }}
                                >
                                  <IconComponent />
                                </div>
                                <h6 className="fw-bold mb-1">{category.name}</h6>
                                <small className="text-muted">
                                  {category.examples.join(', ')}
                                </small>
                              </div>
                            </div>
                          </Col>
                        );
                      })}
                    </Row>
                    {formErrors.category && (
                      <Form.Text className="text-danger">{formErrors.category}</Form.Text>
                    )}
                  </Form.Group>

                  {/* Title */}
                  <Form.Group className="mb-3">
                    <Form.Label className="fw-bold">Issue Title *</Form.Label>
                    <Form.Control
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      placeholder="Brief title describing the issue"
                      isInvalid={!!formErrors.title}
                      style={{ borderRadius: '12px' }}
                    />
                    <Form.Control.Feedback type="invalid">
                      {formErrors.title}
                    </Form.Control.Feedback>
                  </Form.Group>

                  {/* Description */}
                  <Form.Group className="mb-3">
                    <Form.Label className="fw-bold">Detailed Description *</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={4}
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      placeholder="Provide detailed information about the issue, including when you noticed it and any relevant context"
                      isInvalid={!!formErrors.description}
                      style={{ borderRadius: '12px' }}
                    />
                    <Form.Control.Feedback type="invalid">
                      {formErrors.description}
                    </Form.Control.Feedback>
                  </Form.Group>

                  {/* Location */}
                  <Form.Group className="mb-3">
                    <Form.Label className="fw-bold">Location *</Form.Label>
                    <div className="d-flex gap-2">
                      <Form.Control
                        type="text"
                        name="location"
                        value={formData.location}
                        onChange={handleInputChange}
                        placeholder="Enter street address or landmark"
                        isInvalid={!!formErrors.location}
                        style={{ borderRadius: '12px' }}
                      />
                      <Button
                        type="button"
                        variant="outline-primary"
                        onClick={getCurrentLocation}
                        disabled={locationLoading}
                        style={{ 
                          borderRadius: '12px',
                          minWidth: '120px'
                        }}
                      >
                        {locationLoading ? (
                          <>
                            <span className="spinner-border spinner-border-sm me-2" />
                            Getting...
                          </>
                        ) : (
                          <>
                            <FaMapMarkerAlt className="me-2" />
                            Use GPS
                          </>
                        )}
                      </Button>
                    </div>
                    <Form.Control.Feedback type="invalid">
                      {formErrors.location}
                    </Form.Control.Feedback>
                  </Form.Group>

                  {/* Priority */}
                  <Form.Group className="mb-4">
                    <Form.Label className="fw-bold mb-3">Priority Level</Form.Label>
                    <Row>
                      {priorities.map((priority) => {
                        const isSelected = formData.priority === priority.value;
                        
                        return (
                          <Col md={6} lg={3} key={priority.value} className="mb-2">
                            <div
                              className={`priority-card p-3 border rounded-3 cursor-pointer ${
                                isSelected ? 'border-primary bg-primary bg-opacity-10' : 'border-light'
                              }`}
                              style={{ cursor: 'pointer' }}
                              onClick={() => setFormData(prev => ({ ...prev, priority: priority.value }))}
                            >
                              <div className="text-center">
                                <Badge 
                                  style={{ 
                                    background: priority.color,
                                    fontSize: '0.8rem'
                                  }}
                                  className="mb-2"
                                >
                                  {priority.label}
                                </Badge>
                                <div>
                                  <small className="text-muted d-block">
                                    {priority.description}
                                  </small>
                                </div>
                              </div>
                            </div>
                          </Col>
                        );
                      })}
                    </Row>
                  </Form.Group>

                  {/* Image Upload */}
                  <Form.Group className="mb-4">
                    <Form.Label className="fw-bold">Upload Photos (Optional)</Form.Label>
                    <div 
                      className="upload-area border border-dashed rounded-3 p-4 text-center"
                      style={{ 
                        borderColor: '#e2e8f0',
                        background: '#f8fafc',
                        borderRadius: '12px'
                      }}
                    >
                      <FaCamera className="text-muted mb-2" style={{ fontSize: '2rem' }} />
                      <p className="text-muted mb-2">
                        Add photos to help us understand the issue better
                      </p>
                      <Form.Control
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={handleImageUpload}
                        style={{ display: 'none' }}
                        id="image-upload"
                      />
                      <Button
                        as="label"
                        htmlFor="image-upload"
                        variant="outline-primary"
                        style={{ borderRadius: '8px' }}
                      >
                        <FaUpload className="me-2" />
                        Choose Photos
                      </Button>
                    </div>
                    
                    {/* Image Previews */}
                    {images.length > 0 && (
                      <Row className="mt-3">
                        {images.map((image) => (
                          <Col xs={6} md={4} lg={3} key={image.id} className="mb-3">
                            <div className="position-relative">
                              <img
                                src={image.preview}
                                alt={image.name}
                                className="w-100 rounded-3"
                                style={{ 
                                  height: '100px',
                                  objectFit: 'cover'
                                }}
                              />
                              <Button
                                variant="danger"
                                size="sm"
                                className="position-absolute top-0 end-0 m-1"
                                style={{ 
                                  borderRadius: '50%',
                                  width: '30px',
                                  height: '30px',
                                  padding: 0
                                }}
                                onClick={() => removeImage(image.id)}
                              >
                                <FaTimes />
                              </Button>
                            </div>
                          </Col>
                        ))}
                      </Row>
                    )}
                  </Form.Group>

                  {/* Submit Button */}
                  <div className="d-grid">
                    <Button
                      type="submit"
                      size="lg"
                      disabled={loading}
                      style={{
                        background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
                        border: 'none',
                        borderRadius: '12px',
                        padding: '12px'
                      }}
                    >
                      {loading ? (
                        <>
                          <span className="spinner-border spinner-border-sm me-2" />
                          Submitting Report...
                        </>
                      ) : (
                        <>
                          <FaExclamationTriangle className="me-2" />
                          Submit Issue Report
                        </>
                      )}
                    </Button>
                  </div>
                </Form>
              </Card.Body>
            </Card>
          </Col>

          {/* Sidebar */}
          <Col lg={4}>
            <Card className="border-0 shadow-sm mb-4">
              <Card.Header className="bg-primary text-white">
                <h6 className="fw-bold mb-0">
                  <FaExclamationTriangle className="me-2" />
                  Reporting Guidelines
                </h6>
              </Card.Header>
              <Card.Body>
                <div className="d-flex align-items-start mb-3">
                  <div 
                    className="me-3 d-flex align-items-center justify-content-center"
                    style={{
                      width: '30px',
                      height: '30px',
                      background: '#22c55e',
                      borderRadius: '50%',
                      color: 'white',
                      fontSize: '0.8rem'
                    }}
                  >
                    1
                  </div>
                  <div>
                    <h6 className="fw-bold mb-1">Be Specific</h6>
                    <small className="text-muted">
                      Provide clear, detailed descriptions and exact locations
                    </small>
                  </div>
                </div>
                
                <div className="d-flex align-items-start mb-3">
                  <div 
                    className="me-3 d-flex align-items-center justify-content-center"
                    style={{
                      width: '30px',
                      height: '30px',
                      background: '#3b82f6',
                      borderRadius: '50%',
                      color: 'white',
                      fontSize: '0.8rem'
                    }}
                  >
                    2
                  </div>
                  <div>
                    <h6 className="fw-bold mb-1">Add Photos</h6>
                    <small className="text-muted">
                      Images help us understand and prioritize issues better
                    </small>
                  </div>
                </div>
                
                <div className="d-flex align-items-start mb-3">
                  <div 
                    className="me-3 d-flex align-items-center justify-content-center"
                    style={{
                      width: '30px',
                      height: '30px',
                      background: '#f59e0b',
                      borderRadius: '50%',
                      color: 'white',
                      fontSize: '0.8rem'
                    }}
                  >
                    3
                  </div>
                  <div>
                    <h6 className="fw-bold mb-1">Use GPS Location</h6>
                    <small className="text-muted">
                      Accurate location helps our teams respond quickly
                    </small>
                  </div>
                </div>
                
                <div className="d-flex align-items-start">
                  <div 
                    className="me-3 d-flex align-items-center justify-content-center"
                    style={{
                      width: '30px',
                      height: '30px',
                      background: '#8b5cf6',
                      borderRadius: '50%',
                      color: 'white',
                      fontSize: '0.8rem'
                    }}
                  >
                    4
                  </div>
                  <div>
                    <h6 className="fw-bold mb-1">Set Priority</h6>
                    <small className="text-muted">
                      Help us prioritize by setting appropriate urgency level
                    </small>
                  </div>
                </div>
              </Card.Body>
            </Card>

            {/* Contact Info */}
            <Card className="border-0 shadow-sm">
              <Card.Header className="bg-light">
                <h6 className="fw-bold mb-0">Emergency Contacts</h6>
              </Card.Header>
              <Card.Body>
                <div className="mb-3">
                  <div className="fw-bold text-danger">Emergency: 999</div>
                  <small className="text-muted">Police, Fire, Medical emergencies</small>
                </div>
                
                <div className="mb-3">
                  <div className="fw-bold text-primary">County Hotline: 0700-NYERI</div>
                  <small className="text-muted">24/7 county services hotline</small>
                </div>
                
                <div>
                  <div className="fw-bold text-success">Water Emergencies: 0711-WATER</div>
                  <small className="text-muted">Water supply emergencies</small>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      {/* Success Modal */}
      <Modal show={showSuccess} onHide={() => setShowSuccess(false)} centered>
        <Modal.Body className="text-center p-5">
          <div 
            className="mb-4 mx-auto d-flex align-items-center justify-content-center"
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
          
          <h4 className="fw-bold text-dark mb-3">Report Submitted Successfully!</h4>
          <p className="text-muted mb-4">
            Your issue has been reported and assigned tracking ID: <strong>#IR{Date.now()}</strong>
          </p>
          <p className="text-muted mb-4">
            You will receive updates via email and can track progress in your dashboard.
          </p>
          
          <Button 
            variant="primary" 
            onClick={() => setShowSuccess(false)}
            style={{ borderRadius: '12px' }}
          >
            Continue
          </Button>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default IssueReporting;