import React, { useState } from 'react';
import { 
  Percent, 
  Home, 
  GraduationCap, 
  Car, 
  Gem, 
  Tractor, 
  Briefcase,
  ArrowRight,
  ArrowLeft
} from 'lucide-react';
import ProgressBar from './ProgressBar';
import LoanTypeCard from './LoanTypeCard';
import './LoanApplication.css';

const LoanApplication = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedLoanType, setSelectedLoanType] = useState('');
  const [loanAmount, setLoanAmount] = useState('50000');
  const [formData, setFormData] = useState({
    personalInfo: {
      fullName: '',
      email: '',
      phone: '',
      aadhaar: ''
    },
    employmentInfo: {
      employmentType: '',
      companyName: '',
      monthlyIncome: ''
    }
  });
  const handleSubmit = (formData) => {
  localStorage.setItem('loanAadhaar', formData.aadhaarNumber);
  navigate('/upload-documents');
};

  const loanTypes = [
    { type: 'personal', label: 'Personal Loan', icon: Percent, description: 'For personal expenses, travel, or emergencies' },
    { type: 'home', label: 'Home Loan', icon: Home, description: 'Buy, build, or renovate your home' },
    { type: 'education', label: 'Education Loan', icon: GraduationCap, description: 'Fund your or your children\'s education' },
    { type: 'auto', label: 'Auto Loan', icon: Car, description: 'Purchase a new or used vehicle' },
    { type: 'gold', label: 'Gold Loan', icon: Gem, description: 'Loan against your gold ornaments' },
    { type: 'agriculture', label: 'Agriculture Loan', icon: Tractor, description: 'Support for farming and agriculture needs' },
    { type: 'business', label: 'Business Loan', icon: Briefcase, description: 'Grow or start your business' },
  ];

  const formatLoanAmount = (value) => {
    // Remove all non-digit characters
    const digits = value.replace(/\D/g, '');
    
    // Format with commas
    return digits.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  const handleLoanAmountChange = (e) => {
    const formattedValue = formatLoanAmount(e.target.value);
    setLoanAmount(formattedValue);
  };

  const handleInputChange = (section, field, value) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const validateStep1 = () => {
    return selectedLoanType && loanAmount.replace(/\D/g, '').length > 0;
  };

  const validateStep2 = () => {
    return formData.personalInfo.fullName && 
           formData.personalInfo.email && 
           formData.personalInfo.phone && 
           formData.personalInfo.aadhaar;
  };

  const validateStep3 = () => {
    return formData.employmentInfo.employmentType && 
           formData.employmentInfo.companyName && 
           formData.employmentInfo.monthlyIncome;
  };

  const getAadhaarNumber = () => {
    return formData.personalInfo.aadhaar.replace(/\s/g, '');
  };

  return (
    <div className="loan-application">
      <div className="loan-container">
        {/* Header */}
        <div className="loan-header">
          <h1>Loan Application</h1>
          <p>Complete the form below to apply for a loan. It only takes a few minutes.</p>
        </div>

        {/* Progress */}
        <ProgressBar currentStep={currentStep} totalSteps={4} />

        {/* Form Content */}
        <div className="loan-form">
          {/* Step 1 - Loan Selection */}
          {currentStep === 1 && (
            <div className="step step-1">
              <div className="loan-type-selection">
                <h3>What type of loan do you need?</h3>
                <p className="step-description">Select the option that best matches your requirements</p>
                <div className="loan-types-grid">
                  {loanTypes.map((loan) => (
                    <LoanTypeCard
                      key={loan.type}
                      type={loan.type}
                      label={loan.label}
                      description={loan.description}
                      icon={loan.icon}
                      selected={selectedLoanType === loan.type}
                      onClick={() => setSelectedLoanType(loan.type)}
                    />
                  ))}
                </div>
              </div>

              <div className="loan-amount">
                <label htmlFor="loanAmount">How much do you need?</label>
                <p className="input-hint">Enter amount between ₹10,000 to ₹50,00,000</p>
                <div className="input-wrapper">
                  <span className="currency">₹</span>
                  <input
                    id="loanAmount"
                    type="text"
                    value={loanAmount}
                    onChange={handleLoanAmountChange}
                    placeholder="50,000"
                  />
                </div>
                <div className="amount-slider">
                  <input
                    type="range"
                    min="10000"
                    max="5000000"
                    step="10000"
                    value={loanAmount.replace(/\D/g, '')}
                    onChange={(e) => setLoanAmount(formatLoanAmount(e.target.value))}
                  />
                  <div className="slider-labels">
                    <span>10K</span>
                    <span>25L</span>
                    <span>50L</span>
                  </div>
                </div>
              </div>

              <div className="step-navigation">
                <div></div>
                <button
                  onClick={() => setCurrentStep(2)}
                  disabled={!validateStep1()}
                  className="btn-primary"
                >
                  Continue <ArrowRight size={16} />
                </button>
              </div>
            </div>
          )}

          {/* Step 2 - Personal Information */}
          {currentStep === 2 && (
            <div className="step step-2">
              <h3>Tell us about yourself</h3>
              <p className="step-description">We need some basic information to process your application</p>
              
              <div className="form-grid">
                <div className="input-group">
                  <label htmlFor="fullName">Full Name</label>
                  <input
                    id="fullName"
                    type="text"
                    value={formData.personalInfo.fullName}
                    onChange={(e) => handleInputChange('personalInfo', 'fullName', e.target.value)}
                    placeholder="Enter your full name"
                  />
                </div>
                
                <div className="input-group">
                  <label htmlFor="email">Email Address</label>
                  <input
                    id="email"
                    type="email"
                    value={formData.personalInfo.email}
                    onChange={(e) => handleInputChange('personalInfo', 'email', e.target.value)}
                    placeholder="your.email@example.com"
                  />
                </div>
                
                <div className="input-group">
                  <label htmlFor="phone">Phone Number</label>
                  <input
                    id="phone"
                    type="tel"
                    value={formData.personalInfo.phone}
                    onChange={(e) => handleInputChange('personalInfo', 'phone', e.target.value)}
                    placeholder="10-digit mobile number"
                    maxLength="10"
                  />
                </div>
                
                <div className="input-group">
                  <label htmlFor="aadhaar">Aadhaar Number</label>
                  <input
                    id="aadhaar"
                    type="text"
                    value={formData.personalInfo.aadhaar}
                    onChange={(e) => {
                      // Format Aadhaar as 1234 5678 9012
                      const value = e.target.value.replace(/\D/g, '');
                      let formattedValue = value;
                      if (value.length > 4) formattedValue = value.substring(0, 4) + ' ' + value.substring(4);
                      if (value.length > 8) formattedValue = formattedValue.substring(0, 9) + ' ' + value.substring(8, 12);
                      handleInputChange('personalInfo', 'aadhaar', formattedValue);
                    }}
                    placeholder="1234 5678 9012"
                    maxLength="14"
                  />
                  <p className="input-hint">This will be verified in the next step</p>
                </div>
              </div>

              <div className="step-navigation">
                <button 
                  onClick={() => setCurrentStep(1)}
                  className="btn-secondary"
                >
                  <ArrowLeft size={16} /> Back
                </button>
                <button
                  onClick={() => setCurrentStep(3)}
                  disabled={!validateStep2()}
                  className="btn-primary"
                >
                  Continue <ArrowRight size={16} />
                </button>
              </div>
            </div>
          )}

          {/* Step 3 - Employment Information */}
          {currentStep === 3 && (
            <div className="step step-3">
              <h3>Employment Information</h3>
              <p className="step-description">Help us understand your financial situation</p>
              
              <div className="form-grid">
                <div className="input-group">
                  <label htmlFor="employmentType">Employment Type</label>
                  <select
                    id="employmentType"
                    value={formData.employmentInfo.employmentType}
                    onChange={(e) => handleInputChange('employmentInfo', 'employmentType', e.target.value)}
                  >
                    <option value="">Select employment type</option>
                    <option value="salaried">Salaried</option>
                    <option value="self-employed">Self Employed</option>
                    <option value="business">Business Owner</option>
                    <option value="freelancer">Freelancer</option>
                    <option value="retired">Retired</option>
                    <option value="student">Student</option>
                  </select>
                </div>
                
                <div className="input-group">
                  <label htmlFor="companyName">Company Name</label>
                  <input
                    id="companyName"
                    type="text"
                    value={formData.employmentInfo.companyName}
                    onChange={(e) => handleInputChange('employmentInfo', 'companyName', e.target.value)}
                    placeholder="Where do you work?"
                  />
                </div>
                
                <div className="input-group">
                  <label htmlFor="monthlyIncome">Monthly Income (₹)</label>
                  <input
                    id="monthlyIncome"
                    type="text"
                    value={formData.employmentInfo.monthlyIncome}
                    onChange={(e) => handleInputChange('employmentInfo', 'monthlyIncome', formatLoanAmount(e.target.value))}
                    placeholder="50,000"
                  />
                </div>
              </div>

              <div className="step-navigation">
                <button 
                  onClick={() => setCurrentStep(2)}
                  className="btn-secondary"
                >
                  <ArrowLeft size={16} /> Back
                </button>
                <button
                  onClick={() => setCurrentStep(4)}
                  disabled={!validateStep3()}
                  className="btn-primary"
                >
                  Continue <ArrowRight size={16} />
                </button>
              </div>
            </div>
          )}

          {/* Step 4 - Summary */}
          {currentStep === 4 && (
            <div className="step step-4">
              <h3>Review Your Application</h3>
              <p className="step-description">Please verify your information before submitting</p>
              
              <div className="application-summary">
                <div className="summary-section">
                  <h4>Loan Details</h4>
                  <p><strong>Loan Type:</strong> {loanTypes.find(l => l.type === selectedLoanType)?.label}</p>
                  <p><strong>Loan Amount:</strong> ₹{loanAmount}</p>
                </div>
                
                <div className="summary-section">
                  <h4>Personal Information</h4>
                  <p><strong>Name:</strong> {formData.personalInfo.fullName}</p>
                  <p><strong>Email:</strong> {formData.personalInfo.email}</p>
                  <p><strong>Phone:</strong> {formData.personalInfo.phone}</p>
                  <p><strong>Aadhaar:</strong> {formData.personalInfo.aadhaar}</p>
                </div>
                
                <div className="summary-section">
                  <h4>Employment Information</h4>
                  <p><strong>Employment Type:</strong> {formData.employmentInfo.employmentType}</p>
                  <p><strong>Company:</strong> {formData.employmentInfo.companyName}</p>
                  <p><strong>Monthly Income:</strong> ₹{formData.employmentInfo.monthlyIncome}</p>
                </div>
              </div>

              <div className="step-navigation">
                <button 
                  onClick={() => setCurrentStep(3)}
                  className="btn-secondary"
                >
                  <ArrowLeft size={16} /> Back
                </button>
                <button
                  onClick={() => {
                    // Store Aadhaar in localStorage for verification in UploadDocuments
                    localStorage.setItem('loanApplicationAadhaar', getAadhaarNumber());
                    // Navigate to document upload
                    window.location.href = '/upload-documents';
                  }}
                  className="btn-primary"
                >
                  Proceed to Document Verification
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoanApplication;