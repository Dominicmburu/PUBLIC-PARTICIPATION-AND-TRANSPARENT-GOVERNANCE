import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import {
  FaExclamationTriangle,
  FaVoteYea,
  FaComments,
  FaChartBar,
  FaUsers,
  FaShieldAlt,
  FaMobile,
  FaGlobe
} from 'react-icons/fa';

const Home = () => {
  const features = [
    {
      icon: FaExclamationTriangle,
      title: 'Report Issues',
      description: 'Submit infrastructure complaints and community issues with photos and GPS location.',
      color: '#ef4444',
      gradient: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)'
    },
    {
      icon: FaVoteYea,
      title: 'Policy Consultations',
      description: 'Participate in county policy discussions through surveys and structured feedback.',
      color: '#8b5cf6',
      gradient: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)'
    },
    {
      icon: FaComments,
      title: 'Community Forums',
      description: 'Join moderated discussions and participate in virtual barazas from anywhere.',
      color: '#22c55e',
      gradient: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)'
    },
    {
      icon: FaChartBar,
      title: 'Transparent Analytics',
      description: 'Track how your input influences decisions with real-time data and updates.',
      color: '#f59e0b',
      gradient: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)'
    }
  ];

  const benefits = [
    {
      icon: FaUsers,
      title: 'Inclusive Participation',
      description: 'Access governance from anywhere, breaking geographical and time barriers.'
    },
    {
      icon: FaShieldAlt,
      title: 'Secure & Reliable',
      description: 'Your data is protected with enterprise-grade security measures.'
    },
    {
      icon: FaMobile,
      title: 'Mobile Optimized',
      description: 'Fully responsive design works perfectly on all devices.'
    },
    {
      icon: FaGlobe,
      title: 'Always Accessible',
      description: '24/7 availability for continuous citizen engagement.'
    }
  ];

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section
        className="hero-section text-white position-relative overflow-hidden"
        style={{
          backgroundImage: 'linear-gradient(rgba(30, 64, 175, 0.8), rgba(59, 130, 246, 0.8)), url("https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
          minHeight: '70vh',
          display: 'flex',
          alignItems: 'center'
        }}
      >
        {/* Background Pattern */}
        <div
          className="position-absolute w-100 h-100"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            top: 0,
            left: 0,
            zIndex: 1
          }}
        />

        <Container className="position-relative" style={{ zIndex: 2 }}>
          <Row className="align-items-center">
            <Col lg={7}>
              <div className="fade-in">
                <h1 className="display-4 fw-bold mb-4">
                  Your Voice, <span style={{ color: "var(--accent-red)" }}>Your County</span>
                </h1>
                <p className="lead mb-4 opacity-90">
                  Join Nyeri County's digital transformation. Report issues, participate in policy
                  consultations, and engage in meaningful discussions that shape our community's future.
                </p>
                <div className="d-flex flex-wrap gap-3">
                  <Button
                    as={Link}
                    to="/register"
                    size="lg"
                    className="btn-light text-white fw-bold px-4 py-3"
                    style={{ borderRadius: '12px' }}
                  >
                    Get Started Today
                  </Button>
                  <Button
                    as={Link}
                    to="/about"
                    variant="outline-light"
                    size="lg"
                    className="px-4 py-3"
                    style={{ borderRadius: '12px' }}
                  >
                    Learn More
                  </Button>
                </div>
              </div>
            </Col>
            <Col lg={5} className="text-center">
              <div className="hero-graphic mt-5 mt-lg-0">
                <img
                  src="/images/intro.png"
                  alt="Digital civic engagement illustration showing modern government building with technology elements"
                  className="img-fluid"
                  style={{
                    maxWidth: '100%',
                    height: 'auto',
                    borderRadius: '20px',
                    boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
                    opacity: 0.9,
                    transform: 'perspective(1000px) rotateY(-5deg)',
                    transition: 'all 0.3s ease'
                  }}
                />
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Features Section */}
      <section className="py-5" style={{ background: '#f8fafc' }}>
        <Container>
          <Row className="text-center mb-5">
            <Col>
              <h2 className="display-5 fw-bold mb-3">
                Engage. Participate. Transform.
              </h2>
              <p className="lead text-muted">
                Our platform provides comprehensive tools for meaningful civic engagement
              </p>
            </Col>
          </Row>

          <Row>
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <Col md={6} lg={3} key={index} className="mb-4">
                  <Card
                    className="h-100 border-0 shadow-sm feature-card"
                    style={{
                      borderRadius: '16px',
                      transition: 'all 0.3s ease'
                    }}
                  >
                    <Card.Body className="text-center p-4">
                      <div
                        className="mb-3 mx-auto d-flex align-items-center justify-content-center"
                        style={{
                          width: '60px',
                          height: '60px',
                          background: feature.gradient,
                          borderRadius: '16px',
                          color: 'white'
                        }}
                      >
                        <IconComponent style={{ fontSize: '1.5rem' }} />
                      </div>
                      <h5 className="fw-bold mb-2">{feature.title}</h5>
                      <p className="text-muted mb-0" style={{ fontSize: '0.9rem' }}>
                        {feature.description}
                      </p>
                    </Card.Body>
                  </Card>
                </Col>
              );
            })}
          </Row>
        </Container>
      </section>

      {/* Statistics Section */}
      <section className="py-5 bg-white">
        <Container>
          <Row className="text-center">
            <Col md={3} className="mb-4">
              <div className="stat-item">
                <h3 className="display-4 fw-bold text-primary mb-0">759K+</h3>
                <p className="text-muted">Citizens Served</p>
              </div>
            </Col>
            <Col md={3} className="mb-4">
              <div className="stat-item">
                <h3 className="display-4 fw-bold text-success mb-0">8</h3>
                <p className="text-muted">Sub-Counties</p>
              </div>
            </Col>
            <Col md={3} className="mb-4">
              <div className="stat-item">
                <h3 className="display-4 fw-bold text-warning mb-0">6</h3>
                <p className="text-muted">Constituencies</p>
              </div>
            </Col>
            <Col md={3} className="mb-4">
              <div className="stat-item">
                <h3 className="display-4 fw-bold text-info mb-0">24/7</h3>
                <p className="text-muted">Platform Access</p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Benefits Section */}
      <section className="py-5" style={{ background: '#f8fafc' }}>
        <Container>
          <Row className="text-center mb-5">
            <Col>
              <h2 className="display-5 fw-bold mb-3">
                Why Choose Our Platform?
              </h2>
              <p className="lead text-muted">
                Built for transparency, accessibility, and meaningful participation
              </p>
            </Col>
          </Row>

          <Row>
            {benefits.map((benefit, index) => {
              const IconComponent = benefit.icon;
              return (
                <Col md={6} lg={3} key={index} className="mb-4">
                  <div className="text-center">
                    <div
                      className="mb-3 mx-auto d-flex align-items-center justify-content-center"
                      style={{
                        width: '80px',
                        height: '80px',
                        background: 'white',
                        borderRadius: '50%',
                        boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
                        color: '#3b82f6'
                      }}
                    >
                      <IconComponent style={{ fontSize: '1.8rem' }} />
                    </div>
                    <h5 className="fw-bold mb-2">{benefit.title}</h5>
                    <p className="text-muted" style={{ fontSize: '0.9rem' }}>
                      {benefit.description}
                    </p>
                  </div>
                </Col>
              );
            })}
          </Row>
        </Container>
      </section>

      {/* CTA Section */}
      <section
        className="py-5 position-relative overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)',
          minHeight: '400px',
          display: 'flex',
          alignItems: 'center'
        }}
      >
        {/* Animated Background Elements */}
        <div
          className="position-absolute"
          style={{
            top: '-50px',
            right: '-50px',
            width: '200px',
            height: '200px',
            background: 'linear-gradient(45deg, #22c55e, #10b981)',
            borderRadius: '50%',
            opacity: 0.1,
            animation: 'float 6s ease-in-out infinite'
          }}
        />
        <div
          className="position-absolute"
          style={{
            bottom: '-30px',
            left: '-30px',
            width: '150px',
            height: '150px',
            background: 'linear-gradient(45deg, #3b82f6, #2563eb)',
            borderRadius: '50%',
            opacity: 0.1,
            animation: 'float 4s ease-in-out infinite reverse'
          }}
        />

        {/* Grid Pattern Overlay */}
        <div
          className="position-absolute w-100 h-100"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%2322c55e' fill-opacity='0.03' fill-rule='evenodd'%3E%3Cpath d='M0 40L40 0H20L0 20M40 40V20L20 40'/%3E%3C/g%3E%3C/svg%3E")`,
            opacity: 0.5
          }}
        />

        <Container className="position-relative text-center text-white" style={{ zIndex: 2 }}>
          <Row>
            <Col lg={10} className="mx-auto">

              {/* Main Content */}
              <h2
                className="display-5 fw-bold mb-4"
                style={{
                  background: 'linear-gradient(135deg, #ffffff, #e2e8f0)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}
              >
                Ready to Make Your Voice Heard?
              </h2>

              <p className="lead mb-5" style={{ color: '#cbd5e1', maxWidth: '600px', margin: '0 auto' }}>
                Join <strong className="text-green-400">2,847 citizens</strong> already participating in Nyeri County's digital governance revolution
              </p>

              {/* CTA Button with enhanced styling */}
              <div className="d-flex justify-content-center gap-3 flex-wrap">
                <Button
                  as={Link}
                  to="/register"
                  size="lg"
                  className="fw-bold px-5 py-3 position-relative"
                  style={{
                    background: 'linear-gradient(135deg, #22c55e, #16a34a)',
                    border: 'none',
                    borderRadius: '15px',
                    color: 'white',
                    boxShadow: '0 10px 25px rgba(34, 197, 94, 0.3)',
                    transition: 'all 0.3s ease',
                    overflow: 'hidden'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.transform = 'translateY(-3px)';
                    e.target.style.boxShadow = '0 15px 35px rgba(34, 197, 94, 0.4)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = 'translateY(0)';
                    e.target.style.boxShadow = '0 10px 25px rgba(34, 197, 94, 0.3)';
                  }}
                >
                  Join the Platform
                  <span className="ms-2">→</span>
                </Button>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Add this CSS for animations */}
      <style jsx>{`
  @keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-20px); }
  }
  
  .text-green-400 {
    color: #4ade80;
  }
`}</style>
    </div>
  );
};

export default Home;