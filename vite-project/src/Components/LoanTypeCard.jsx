import React from 'react';

const LoanTypeCard = ({ type, label, icon: Icon, selected, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`loan-type-card ${selected ? 'selected' : ''}`}
    >
      <div className="loan-type-content">
        <div className={`loan-type-icon ${selected ? 'selected-icon' : ''}`}>
          <Icon className="icon" />
        </div>
        <span className={`loan-type-label ${selected ? 'selected-label' : ''}`}>
          {label}
        </span>
      </div>
    </button>
  );
};

export default LoanTypeCard;
