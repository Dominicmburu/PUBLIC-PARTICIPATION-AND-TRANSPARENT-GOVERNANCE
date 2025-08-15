import React from 'react';
import { Form as BootstrapForm, InputGroup } from 'react-bootstrap';

const Form = ({ children, className = '', ...props }) => (
  <BootstrapForm className={className} {...props}>
    {children}
  </BootstrapForm>
);

// Group component
Form.Group = ({ children, className = '', spacing = 'normal', ...props }) => {
  const getSpacingClass = () => {
    switch (spacing) {
      case 'none': return '';
      case 'sm': return 'mb-2';
      case 'lg': return 'mb-4';
      default: return 'mb-3';
    }
  };

  return (
    <BootstrapForm.Group 
      className={`${getSpacingClass()} ${className}`}
      {...props}
    >
      {children}
    </BootstrapForm.Group>
  );
};

// Label component
Form.Label = ({ children, required = false, className = '', ...props }) => (
  <BootstrapForm.Label 
    className={`fw-medium ${className}`}
    {...props}
  >
    {children}
    {required && <span className="text-danger ms-1">*</span>}
  </BootstrapForm.Label>
);

// Control component
Form.Control = ({ 
  size = 'md',
  radius = 'normal',
  className = '',
  style = {},
  ...props 
}) => {
  const getRadiusStyle = () => {
    switch (radius) {
      case 'sm': return { borderRadius: '6px' };
      case 'lg': return { borderRadius: '16px' };
      case 'xl': return { borderRadius: '20px' };
      default: return { borderRadius: '12px' };
    }
  };

  const getSizeStyle = () => {
    switch (size) {
      case 'sm': return { padding: '6px 12px', fontSize: '0.875rem' };
      case 'lg': return { padding: '12px 16px', fontSize: '1.1rem' };
      default: return { padding: '10px 14px' };
    }
  };

  const controlStyle = {
    border: '1px solid #e2e8f0',
    transition: 'all 0.2s ease',
    ...getRadiusStyle(),
    ...getSizeStyle(),
    ...style
  };

  return (
    <BootstrapForm.Control
      className={className}
      style={controlStyle}
      {...props}
    />
  );
};

// Select component
Form.Select = ({ 
  size = 'md',
  radius = 'normal',
  className = '',
  style = {},
  ...props 
}) => {
  const getRadiusStyle = () => {
    switch (radius) {
      case 'sm': return { borderRadius: '6px' };
      case 'lg': return { borderRadius: '16px' };
      case 'xl': return { borderRadius: '20px' };
      default: return { borderRadius: '12px' };
    }
  };

  const getSizeStyle = () => {
    switch (size) {
      case 'sm': return { padding: '6px 12px', fontSize: '0.875rem' };
      case 'lg': return { padding: '12px 16px', fontSize: '1.1rem' };
      default: return { padding: '10px 14px' };
    }
  };

  const selectStyle = {
    border: '1px solid #e2e8f0',
    transition: 'all 0.2s ease',
    ...getRadiusStyle(),
    ...getSizeStyle(),
    ...style
  };

  return (
    <BootstrapForm.Select
      className={className}
      style={selectStyle}
      {...props}
    />
  );
};

// Check component
Form.Check = ({ 
  type = 'checkbox',
  className = '',
  label,
  ...props 
}) => (
  <BootstrapForm.Check
    type={type}
    className={className}
    label={label}
    {...props}
  />
);

// Text component
Form.Text = ({ children, className = '', variant = 'muted', ...props }) => (
  <BootstrapForm.Text 
    className={`text-${variant} ${className}`}
    {...props}
  >
    {children}
  </BootstrapForm.Text>
);

// Feedback component
Form.Control.Feedback = ({ children, type = 'invalid', className = '', ...props }) => (
  <BootstrapForm.Control.Feedback
    type={type}
    className={className}
    {...props}
  >
    {children}
  </BootstrapForm.Control.Feedback>
);

// Input Group for enhanced inputs
Form.InputGroup = ({ children, className = '', ...props }) => (
  <InputGroup className={className} {...props}>
    {children}
  </InputGroup>
);

Form.InputGroup.Text = ({ children, className = '', ...props }) => (
  <InputGroup.Text 
    className={className}
    style={{ 
      background: '#f8fafc',
      border: '1px solid #e2e8f0',
      borderRadius: '12px 0 0 12px'
    }}
    {...props}
  >
    {children}
  </InputGroup.Text>
);

export default Form;