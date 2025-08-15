import React from 'react';
import { Card as BootstrapCard } from 'react-bootstrap';

const Card = ({ 
  children, 
  className = '', 
  gradient = false, 
  hover = false, 
  elevation = 'md',
  ...props 
}) => {
  const getElevationClass = () => {
    switch (elevation) {
      case 'sm': return 'shadow-sm';
      case 'lg': return 'shadow-lg';
      case 'xl': return 'shadow-xl';
      default: return 'shadow';
    }
  };

  const cardClasses = [
    'border-0',
    getElevationClass(),
    hover ? 'card-hover' : '',
    gradient ? 'card-gradient' : '',
    className
  ].filter(Boolean).join(' ');

  const cardStyle = {
    borderRadius: '16px',
    transition: 'all 0.3s ease',
    ...(gradient && {
      background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
      backdropFilter: 'blur(10px)'
    }),
    ...props.style
  };

  return (
    <BootstrapCard 
      className={cardClasses}
      style={cardStyle}
      {...props}
    >
      {children}
    </BootstrapCard>
  );
};

// Header component
Card.Header = ({ children, className = '', ...props }) => (
  <BootstrapCard.Header 
    className={`border-0 ${className}`}
    style={{ 
      background: 'transparent',
      borderRadius: '16px 16px 0 0',
      ...props.style 
    }}
    {...props}
  >
    {children}
  </BootstrapCard.Header>
);

// Body component
Card.Body = ({ children, className = '', padding = 'normal', ...props }) => {
  const getPaddingClass = () => {
    switch (padding) {
      case 'none': return 'p-0';
      case 'sm': return 'p-3';
      case 'lg': return 'p-5';
      default: return 'p-4';
    }
  };

  return (
    <BootstrapCard.Body 
      className={`${getPaddingClass()} ${className}`}
      {...props}
    >
      {children}
    </BootstrapCard.Body>
  );
};

// Footer component
Card.Footer = ({ children, className = '', ...props }) => (
  <BootstrapCard.Footer 
    className={`border-0 bg-transparent ${className}`}
    style={{ 
      borderRadius: '0 0 16px 16px',
      ...props.style 
    }}
    {...props}
  >
    {children}
  </BootstrapCard.Footer>
);

export default Card;