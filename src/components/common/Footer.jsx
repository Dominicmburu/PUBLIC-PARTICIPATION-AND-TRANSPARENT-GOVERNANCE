import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaGlobe
} from 'react-icons/fa';

const Footer = () => {
  return (
    <footer
      className="mt-auto text-white"
      style={{
        background: 'linear-gradient(135deg, #1e293b 0%, #334155 100%)',
        borderTop: '3px solid #22c55e'
      }}
    >
      <Container fluid className="py-5">
        <Row>
          {/* Logo and Description */}
          <Col lg={4} md={6} className="mb-4">
            <div className="d-flex align-items-center mb-3">
              <div
                className="me-3 d-flex align-items-center justify-content-center"
                style={{
                  width: '50px',
                  height: '50px',
                  background: 'rgba(255, 255, 255, 0.1)',
                  borderRadius: '12px',
                  backdropFilter: 'blur(10px)'
                }}
              >
                <img src="https://img.icons8.com/external-flaticons-lineal-color-flat-icons/64/external-public-public-relations-agency-flaticons-lineal-color-flat-icons-2.png" alt="Logo" style={{ width: "50px", height: "50px" }} />

              </div>
              <div>
                <h5 className="fw-bold mb-0">Nyeri County</h5>
                <small className="opacity-75">Digital Platform</small>
              </div>
            </div>
            <p className="opacity-75 mb-3" style={{ fontSize: '0.9rem' }}>
              Empowering citizens through digital participation in governance.
              Your voice matters in building a better Nyeri County.
            </p>
            <div className="d-flex gap-3">
              <a
                href="#"
                className="text-white-50 hover-text-white"
                style={{ fontSize: '1.2rem' }}
              >
                <FaFacebook />
              </a>
              <a
                href="#"
                className="text-white-50 hover-text-white"
                style={{ fontSize: '1.2rem' }}
              >
                <FaTwitter />
              </a>
              <a
                href="#"
                className="text-white-50 hover-text-white"
                style={{ fontSize: '1.2rem' }}
              >
                <FaInstagram />
              </a>
              <a
                href="#"
                className="text-white-50 hover-text-white"
                style={{ fontSize: '1.2rem' }}
              >
                <FaLinkedin />
              </a>
            </div>
          </Col>

          {/* Quick Links */}
          <Col lg={2} md={6} className="mb-4">
            <h6 className="fw-bold mb-3">Quick Links</h6>
            <ul className="list-unstyled">
              <li className="mb-2">
                <Link to="/" className="text-white-50 text-decoration-none hover-text-white">
                  Home
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/about" className="text-white-50 text-decoration-none hover-text-white">
                  About Us
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/contact" className="text-white-50 text-decoration-none hover-text-white">
                  Contact
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/help" className="text-white-50 text-decoration-none hover-text-white">
                  Help Center
                </Link>
              </li>
            </ul>
          </Col>

          {/* Services */}
          <Col lg={2} md={6} className="mb-4">
            <h6 className="fw-bold mb-3">Services</h6>
            <ul className="list-unstyled">
              <li className="mb-2">
                <Link to="/citizen/report-issue" className="text-white-50 text-decoration-none hover-text-white">
                  Report Issues
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/citizen/consultations" className="text-white-50 text-decoration-none hover-text-white">
                  Consultations
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/citizen/forum" className="text-white-50 text-decoration-none hover-text-white">
                  Community Forum
                </Link>
              </li>
              <li className="mb-2">
                <a href="#" className="text-white-50 text-decoration-none hover-text-white">
                  Track Issues
                </a>
              </li>
            </ul>
          </Col>

          {/* Contact Information */}
          <Col lg={4} md={6} className="mb-4">
            <h6 className="fw-bold mb-3">Contact Information</h6>
            <div className="d-flex align-items-center mb-3">
              <FaMapMarkerAlt className="me-3 text-success" />
              <div>
                <div className="fw-medium">County Headquarters</div>
                <small className="text-white-50">Kimathi Way, Nyeri Town</small>
              </div>
            </div>

            <div className="d-flex align-items-center mb-3">
              <FaPhone className="me-3 text-success" />
              <div>
                <div className="fw-medium">+254 700 NYERI</div>
                <small className="text-white-50">24/7 Hotline</small>
              </div>
            </div>

            <div className="d-flex align-items-center mb-3">
              <FaEnvelope className="me-3 text-success" />
              <div>
                <div className="fw-medium">info@nyeri.go.ke</div>
                <small className="text-white-50">General Inquiries</small>
              </div>
            </div>

            <div className="d-flex align-items-center">
              <FaGlobe className="me-3 text-success" />
              <div>
                <div className="fw-medium">www.nyeri.go.ke</div>
                <small className="text-white-50">Official Website</small>
              </div>
            </div>
          </Col>
        </Row>
      </Container>

      {/* Bottom Bar */}
      <div
        className="py-3"
        style={{
          borderTop: '1px solid rgba(255, 255, 255, 0.1)',
          background: 'rgba(0, 0, 0, 0.2)'
        }}
      >
        <Container fluid>
          <Row className="align-items-center">
            <Col md={6}>
              <small className="text-white-50">
                © 2025 Nyeri County Government. All rights reserved.
              </small>
            </Col>
            <Col md={6} className="text-md-end">
              <div className="d-flex justify-content-md-end gap-4">
                <a href="#" className="text-white-50 text-decoration-none hover-text-white">
                  <small>Privacy Policy</small>
                </a>
                <a href="#" className="text-white-50 text-decoration-none hover-text-white">
                  <small>Terms of Service</small>
                </a>
                <a href="#" className="text-white-50 text-decoration-none hover-text-white">
                  <small>Accessibility</small>
                </a>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </footer>
  );
};

export default Footer;