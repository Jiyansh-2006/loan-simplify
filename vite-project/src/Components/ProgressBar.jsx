import React from 'react';
import './ProgressBar.css';

const ProgressBar = ({ currentStep, totalSteps }) => {
  const progress = (currentStep / totalSteps) * 100;

  return (
    <div className="progress-container">
      <div className="progress-header">
        <h2 className="progress-title">
          Step {currentStep} of {totalSteps}
        </h2>
      </div>
      <div className="progress-bar">
        <div
          className="progress-fill"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
