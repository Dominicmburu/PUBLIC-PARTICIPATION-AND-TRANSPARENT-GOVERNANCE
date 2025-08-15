import React from 'react';
import { Modal as BootstrapModal } from 'react-bootstrap';

const Modal = ({ 
  children, 
  show, 
  onHide, 
  size = 'md',
  centered = true,
  backdrop = true,
  className = '',
  animation = true,
  ...props 
}) => {
  const modalStyle = {
    borderRadius: '20px',
    border: 'none',
    overflow: 'hidden'
  };

  return (
    <BootstrapModal
      show={show}
      onHide={onHide}
      size={size}
      centered={centered}
      backdrop={backdrop}
      animation={animation}
      className={className}
      contentClassName="border-0"
      style={{ '--bs-modal-border-radius': '20px' }}
      {...props}
    >
      <div style={modalStyle}>
        {children}
      </div>
    </BootstrapModal>
  );
};

// Header component
Modal.Header = ({ children, className = '', closeButton = true, ...props }) => (
  <BootstrapModal.Header 
    closeButton={closeButton}
    className={`border-0 pb-0 ${className}`}
    style={{ borderRadius: '20px 20px 0 0' }}
    {...props}
  >
    {children}
  </BootstrapModal.Header>
);

// Title component
Modal.Title = ({ children, className = '', ...props }) => (
  <BootstrapModal.Title 
    className={`fw-bold ${className}`}
    {...props}
  >
    {children}
  </BootstrapModal.Title>
);

// Body component
Modal.Body = ({ children, className = '', padding = 'normal', ...props }) => {
  const getPaddingClass = () => {
    switch (padding) {
      case 'none': return 'p-0';
      case 'sm': return 'p-3';
      case 'lg': return 'p-5';
      default: return 'p-4';
    }
  };

  return (
    <BootstrapModal.Body 
      className={`${getPaddingClass()} ${className}`}
      {...props}
    >
      {children}
    </BootstrapModal.Body>
  );
};

// Footer component
Modal.Footer = ({ children, className = '', ...props }) => (
  <BootstrapModal.Footer 
    className={`border-0 ${className}`}
    style={{ borderRadius: '0 0 20px 20px' }}
    {...props}
  >
    {children}
  </BootstrapModal.Footer>
);

export default Modal;