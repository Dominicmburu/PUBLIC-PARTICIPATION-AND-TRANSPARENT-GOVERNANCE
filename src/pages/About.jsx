import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { 
  FaEye, 
  FaBullseye, 
  FaHeart,
  FaUsers,
  FaLightbulb,
  FaShieldAlt,
  FaHandshake,
  FaGlobe
} from 'react-icons/fa';

const About = () => {
  const values = [
    {
      icon: FaUsers,
      title: 'Inclusive Participation',
      description: 'We believe every citizen\'s voice matters and should be heard in governance decisions.',
      color: '#3b82f6'
    },
    {
      icon: FaLightbulb,
      title: 'Innovation',
      description: 'Leveraging technology to modernize how citizens engage with county government.',
      color: '#f59e0b'
    },
    {
      icon: FaShieldAlt,
      title: 'Transparency',
      description: 'Providing clear, accessible information about government processes and decisions.',
      color: '#22c55e'
    },
    {
      icon: FaHandshake,
      title: 'Accountability',
      description: 'Ensuring government remains responsive and accountable to citizen needs.',
      color: '#8b5cf6'
    }
  ];

  const features = [
    {
      title: 'Digital Issue Reporting',
      description: 'Citizens can report infrastructure and community issues with photos, GPS location, and detailed descriptions.',
      icon: '📋'
    },
    {
      title: 'Policy Consultations',
      description: 'Participate in county policy development through surveys, polls, and structured feedback mechanisms.',
      icon: '🗳️'
    },
    {
      title: 'Community Forums',
      description: 'Engage in moderated discussions about county affairs and participate in virtual barazas.',
      icon: '💬'
    },
    {
      title: 'Real-time Analytics',
      description: 'Track the impact of citizen participation with transparent data and progress updates.',
      icon: '📊'
    }
  ];

  const teamMembers = [
    {
      name: 'Hon. Mutahi Kahiga',
      role: 'County Governor',
      description: 'Leading the digital transformation of Nyeri County governance.',
      image: '👨‍💼'
    },
    {
      name: 'ICT Department',
      role: 'Technical Team',
      description: 'Developing and maintaining the digital participation platform.',
      image: '👨‍💻'
    },
    {
      name: 'Citizen Engagement Office',
      role: 'Community Liaison',
      description: 'Facilitating citizen participation and feedback collection.',
      image: '👥'
    }
  ];

  return (
    <div className="about-page">
      {/* Hero Section */}
      <section 
        className="hero-section text-white py-5"
        style={{
          background: 'linear-gradient(135deg, #1e40af 0%, #3b82f6 100%)',
          minHeight: '60vh',
          display: 'flex',
          alignItems: 'center'
        }}
      >
        <Container>
          <Row className="align-items-center">
            <Col lg={6}>
              <h1 className="display-4 fw-bold mb-4">
                About Nyeri County Digital Platform
              </h1>
              <p className="lead mb-4 opacity-90">
                Transforming governance through technology, empowering citizens to actively 
                participate in building a better Nyeri County for all.
              </p>
            </Col>
            <Col lg={6} className="text-center">
              <div style={{ fontSize: '10rem', opacity: 0.2 }}>
                🏛️
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Mission & Vision */}
      <section className="py-5 bg-white">
        <Container>
          <Row>
            <Col lg={6} className="mb-4">
              <Card className="h-100 border-0 shadow-sm">
                <Card.Body className="p-4 text-center">
                  <div 
                    className="mx-auto mb-3 d-flex align-items-center justify-content-center"
                    style={{
                      width: '60px',
                      height: '60px',
                      background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
                      borderRadius: '16px',
                      color: 'white'
                    }}
                  >
                    <FaBullseye style={{ fontSize: '1.5rem' }} />
                  </div>
                  <h3 className="fw-bold text-dark mb-3">Our Mission</h3>
                  <p className="text-muted">
                    To create an inclusive, transparent, and efficient digital platform that 
                    empowers Nyeri County citizens to actively participate in governance, 
                    ensuring their voices are heard and their needs are addressed through 
                    innovative technology solutions.
                  </p>
                </Card.Body>
              </Card>
            </Col>
            
            <Col lg={6} className="mb-4">
              <Card className="h-100 border-0 shadow-sm">
                <Card.Body className="p-4 text-center">
                  <div 
                    className="mx-auto mb-3 d-flex align-items-center justify-content-center"
                    style={{
                      width: '60px',
                      height: '60px',
                      background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
                      borderRadius: '16px',
                      color: 'white'
                    }}
                  >
                    <FaEye style={{ fontSize: '1.5rem' }} />
                  </div>
                  <h3 className="fw-bold text-dark mb-3">Our Vision</h3>
                  <p className="text-muted">
                    To be the leading model of digital governance in Kenya, where every 
                    citizen has equal access to participate in democratic processes, 
                    fostering a transparent, accountable, and responsive county government 
                    that serves all people effectively.
                  </p>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Our Values */}
      <section className="py-5" style={{ background: '#f8fafc' }}>
        <Container>
          <Row className="text-center mb-5">
            <Col>
              <h2 className="display-5 fw-bold mb-3">Our Core Values</h2>
              <p className="lead text-muted">
                The principles that guide our work and commitment to the people of Nyeri County
              </p>
            </Col>
          </Row>
          
          <Row>
            {values.map((value, index) => {
              const IconComponent = value.icon;
              return (
                <Col md={6} lg={3} key={index} className="mb-4">
                  <Card className="h-100 border-0 shadow-sm text-center">
                    <Card.Body className="p-4">
                      <div 
                        className="mx-auto mb-3 d-flex align-items-center justify-content-center"
                        style={{
                          width: '60px',
                          height: '60px',
                          background: value.color,
                          borderRadius: '16px',
                          color: 'white'
                        }}
                      >
                        <IconComponent style={{ fontSize: '1.5rem' }} />
                      </div>
                      <h5 className="fw-bold text-dark mb-3">{value.title}</h5>
                      <p className="text-muted mb-0">{value.description}</p>
                    </Card.Body>
                  </Card>
                </Col>
              );
            })}
          </Row>
        </Container>
      </section>

      {/* Platform Features */}
      <section className="py-5 bg-white">
        <Container>
          <Row className="text-center mb-5">
            <Col>
              <h2 className="display-5 fw-bold mb-3">Platform Features</h2>
              <p className="lead text-muted">
                Comprehensive tools for meaningful citizen engagement
              </p>
            </Col>
          </Row>
          
          <Row>
            {features.map((feature, index) => (
              <Col md={6} lg={3} key={index} className="mb-4">
                <div className="text-center h-100">
                  <div 
                    className="mx-auto mb-3 d-flex align-items-center justify-content-center"
                    style={{
                      width: '80px',
                      height: '80px',
                      background: 'white',
                      borderRadius: '20px',
                      fontSize: '2.5rem',
                      boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)'
                    }}
                  >
                    {feature.icon}
                  </div>
                  <h5 className="fw-bold text-dark mb-3">{feature.title}</h5>
                  <p className="text-muted">{feature.description}</p>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* County Information */}
      <section className="py-5" style={{ background: '#f8fafc' }}>
        <Container>
          <Row>
            <Col lg={6} className="mb-4">
              <h2 className="fw-bold text-dark mb-4">About Nyeri County</h2>
              <p className="text-muted mb-3">
                Nyeri County is located in the central highlands of Kenya, covering an area of 
                3,356 square kilometers. With a population of over 759,000 people, it is one 
                of the most populous counties in the Mt. Kenya region.
              </p>
              <p className="text-muted mb-3">
                The county is divided into 6 constituencies and 30 wards, with Nyeri Town 
                serving as the county headquarters. Known for its rich agricultural heritage, 
                scenic landscapes, and historical significance, Nyeri County is home to 
                diverse communities working together for development.
              </p>
              <p className="text-muted">
                Our county government is committed to improving service delivery, promoting 
                economic development, and ensuring all citizens have access to quality 
                healthcare, education, and infrastructure services.
              </p>
            </Col>
            
            <Col lg={6}>
              <Card className="border-0 shadow-sm">
                <Card.Body className="p-4">
                  <h5 className="fw-bold text-dark mb-4">Quick Facts</h5>
                  
                  <div className="mb-3">
                    <div className="d-flex justify-content-between">
                      <span className="text-muted">Population:</span>
                      <span className="fw-bold">759,164</span>
                    </div>
                  </div>
                  
                  <div className="mb-3">
                    <div className="d-flex justify-content-between">
                      <span className="text-muted">Area:</span>
                      <span className="fw-bold">3,356 km²</span>
                    </div>
                  </div>
                  
                  <div className="mb-3">
                    <div className="d-flex justify-content-between">
                      <span className="text-muted">Constituencies:</span>
                      <span className="fw-bold">6</span>
                    </div>
                  </div>
                  
                  <div className="mb-3">
                    <div className="d-flex justify-content-between">
                      <span className="text-muted">Wards:</span>
                      <span className="fw-bold">30</span>
                    </div>
                  </div>
                  
                  <div className="mb-3">
                    <div className="d-flex justify-content-between">
                      <span className="text-muted">Sub-Counties:</span>
                      <span className="fw-bold">8</span>
                    </div>
                  </div>
                  
                  <div>
                    <div className="d-flex justify-content-between">
                      <span className="text-muted">County Code:</span>
                      <span className="fw-bold">036</span>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Team Section */}
      <section className="py-5 bg-white">
        <Container>
          <Row className="text-center mb-5">
            <Col>
              <h2 className="display-5 fw-bold mb-3">Our Team</h2>
              <p className="lead text-muted">
                Dedicated leaders working to transform governance in Nyeri County
              </p>
            </Col>
          </Row>
          
          <Row>
            {teamMembers.map((member, index) => (
              <Col md={4} key={index} className="mb-4">
                <Card className="border-0 shadow-sm text-center h-100">
                  <Card.Body className="p-4">
                    <div 
                      className="mx-auto mb-3"
                      style={{
                        width: '80px',
                        height: '80px',
                        fontSize: '3rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      {member.image}
                    </div>
                    <h5 className="fw-bold text-dark mb-2">{member.name}</h5>
                    <p className="text-primary fw-medium mb-3">{member.role}</p>
                    <p className="text-muted mb-0">{member.description}</p>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Call to Action */}
      <section 
        className="py-5 text-white text-center"
        style={{
          background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)'
        }}
      >
        <Container>
          <Row>
            <Col lg={8} className="mx-auto">
              <h2 className="display-5 fw-bold mb-3">
                Be Part of the Change
              </h2>
              <p className="lead mb-4 opacity-90">
                Your participation shapes the future of Nyeri County. Join us in building 
                a more transparent, accountable, and responsive government.
              </p>
              <div className="d-flex justify-content-center gap-3 flex-wrap">
                <a 
                  href="/register" 
                  className="btn btn-light btn-lg px-4"
                  style={{ borderRadius: '12px' }}
                >
                  Join the Platform
                </a>
                <a 
                  href="/contact" 
                  className="btn btn-outline-light btn-lg px-4"
                  style={{ borderRadius: '12px' }}
                >
                  Get in Touch
                </a>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </div>
  );
};

export default About;