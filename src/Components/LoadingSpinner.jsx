import React, { useState, useEffect } from 'react';
import './LoadingSpinner.css';

const LoadingSpinner = ({ delay = 0 }) => {
  const [showSpinner, setShowSpinner] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSpinner(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  return showSpinner ? (
    <div className="loading-spinner-container">
      <div className="loading-spinner"></div>
    </div>
  ) : null;
};

export default LoadingSpinner;
