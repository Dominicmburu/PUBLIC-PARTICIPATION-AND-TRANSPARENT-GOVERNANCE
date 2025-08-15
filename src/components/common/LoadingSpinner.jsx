import React from 'react';
import { Spinner } from 'react-bootstrap';

const LoadingSpinner = ({ message = "Loading..." }) => {
  return (
    <div 
      className="d-flex flex-column justify-content-center align-items-center min-vh-100"
      style={{
        background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)'
      }}
    >
      <div className="text-center">
        {/* Custom Logo Spinner */}
        <div 
          className="mb-4 mx-auto d-flex align-items-center justify-content-center pulse"
          style={{
            width: '80px',
            height: '80px',
            background: 'linear-gradient(135deg, #1e40af 0%, #3b82f6 100%)',
            borderRadius: '20px',
            color: 'white',
            fontSize: '2.5rem'
          }}
        >
          🏛️
        </div>
        
        {/* Spinner */}
        <Spinner 
          animation="border" 
          variant="primary" 
          style={{ 
            width: '3rem', 
            height: '3rem',
            borderWidth: '3px'
          }}
        />
        
        {/* Loading Message */}
        <div className="mt-3">
          <h5 className="fw-bold text-primary">Nyeri County Platform</h5>
          <p className="text-muted">{message}</p>
        </div>
      </div>
    </div>
  );
};

export default LoadingSpinner;