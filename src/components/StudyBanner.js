// src/components/StudyBanner.js
import React from 'react';

const StudyBanner = ({ title, style }) => {
  return (
    <div style={{ ...defaultStyle, ...style }}>
      <h3>{title}</h3>
    </div>
  );
};

const defaultStyle = {
  border: '1px solid #d1d5db',
  borderRadius: '10px',
  padding: '20px',
  marginBottom: '30px',
  backgroundColor: '#edf2f7',
  textAlign: 'center',
  color: '#4b5563',
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

export default StudyBanner;
