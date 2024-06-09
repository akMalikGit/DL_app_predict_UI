import React from 'react';
// import './OverlayMessage.css';

export default function OverlayMessage ({ message, onClose }) {
  return (
    <div className="overlay">
      <div className="overlay-content">
        <p>{message}</p>
        {/* <button onClick={onClose}>Close</button> */}
      </div>
    </div>
  );
};

