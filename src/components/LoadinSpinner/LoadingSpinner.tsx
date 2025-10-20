
import React from 'react';
import './LoadingSpinner.css';

interface LoadingSpinnerProps {
  size?: 'small' | 'medium' | 'large';
  color?: string;
  text?: string;
  className?: string;
}

const LoadingSpinner = ({ 
  size = 'medium', 
  color = '#007bff', 
  text,
  className = '' 
}: LoadingSpinnerProps) => {
  return (
    <div className={`loading-spinner ${size} ${className}`}>
      <div 
        className="spinner" 
        style={{ borderTopColor: color }}
      ></div>
      {text && <span className="spinner-text">{text}</span>}
    </div>
  );
};

export default LoadingSpinner;