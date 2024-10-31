// CustomSwitch.js
import React from 'react';
import './CustomSwitch.css'; // Import your custom styles

const CustomSwitch = ({ checked, onChange }) => {
  return (
    <div className={`custom-switch ${checked ? 'checked' : ''}`} onClick={() => onChange(!checked)}>
      <div className="slider"></div>
    </div>
  );
};

export default CustomSwitch;
