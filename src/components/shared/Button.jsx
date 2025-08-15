import React from 'react';
import { Button as BootstrapButton } from 'react-bootstrap';

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md',
  gradient = false,
  icon = null,
  loading = false,
  className = '',
  style = {},
  ...props 
}) => {
  const getGradientStyle = () => {
    switch (variant) {
      case 'primary':
        return { background: 'linear-gradient(135deg, #1e40af 0%, #3b82f6 100%)' };
      case 'success':
        return { background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)' };
      case 'warning':
        return { background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)' };
      case 'danger':
        return { background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)' };
      case 'info':
        return { background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)' };
      default:
        return {};
    }
  };

  const getSizeStyle = () => {
    switch (size) {
      case 'sm':
        return { borderRadius: '8px', padding: '6px 12px' };
      case 'lg':
        return { borderRadius: '12px', padding: '12px 24px' };
      case 'xl':
        return { borderRadius: '16px', padding: '16px 32px', fontSize: '1.1rem' };
      default:
        return { borderRadius: '10px', padding: '8px 16px' };
    }
  };

  const buttonStyle = {
    border: 'none',
    fontWeight: '500',
    transition: 'all 0.2s ease',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: icon ? '0.5rem' : '0',
    ...(gradient && getGradientStyle()),
    ...getSizeStyle(),
    ...style
  };

  const buttonClasses = [
    loading ? 'disabled' : '',
    className
  ].filter(Boolean).join(' ');

  return (
    <BootstrapButton
      variant={gradient ? '' : variant}
      className={buttonClasses}
      style={buttonStyle}
      disabled={loading || props.disabled}
      {...props}
    >
      {loading && (
        <span 
          className="spinner-border spinner-border-sm me-2" 
          role="status" 
          aria-hidden="true"
        />
      )}
      {icon && !loading && <span>{icon}</span>}
      {children}
    </BootstrapButton>
  );
};

export default Button;