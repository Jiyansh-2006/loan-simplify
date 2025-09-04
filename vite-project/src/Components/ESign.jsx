import React, { useState } from "react";
import { useLocation, Link } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import "./ESign.css";

const ESign = () => {
  const location = useLocation();
  const applicant = location.state || {};

  const [otpSent, setOtpSent] = useState(false);
  const [generatedOtp, setGeneratedOtp] = useState("");
  const [otpInput, setOtpInput] = useState("");
  const [isSigned, setIsSigned] = useState(false);
  const [error, setError] = useState("");

  const sendOtp = () => {
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedOtp(otp);
    setOtpSent(true);
    setError("");
    alert(`Simulated OTP sent: ${otp}`);
  };

  const verifyOtp = () => {
    if (otpInput === generatedOtp) {
      setIsSigned(true);
      setError("");
    } else {
      setError("❌ Invalid OTP. Please try again.");
    }
  };

  return (
    <div className="page-wrapper">
      <Header />
      <div className="container">
        <div className="form-title">E-Sign Document</div>

        <div className="kyc-details">
          <p><strong>Name:</strong> {applicant.name || "N/A"}</p>
          <p><strong>Aadhaar:</strong> {applicant.aadhaar || "N/A"}</p>
          <p><strong>DOB:</strong> {applicant.dob || "N/A"}</p>
          <p><strong>Gender:</strong> {applicant.gender || "N/A"}</p>
          <p><strong>Address:</strong> {applicant.address || "N/A"}</p>
          <p><strong>Phone:</strong> {applicant.phone || "N/A"}</p>
        </div>

        {!isSigned ? (
          <div className="otp-section">
            {!otpSent ? (
              <button className="btn primary" onClick={sendOtp}>
                Send OTP
              </button>
            ) : (
              <>
                <input
                  type="text"
                  maxLength="6"
                  className="otp-input"
                  placeholder="Enter OTP"
                  value={otpInput}
                  onChange={(e) => setOtpInput(e.target.value)}
                />
                <button className="btn primary" onClick={verifyOtp}>
                  Verify OTP
                </button>
              </>
            )}
            {error && <p className="error">{error}</p>}
          </div>
        ) : (
          <div className="success">✅ E-Sign completed successfully!</div>
        )}

        <div className="buttons">
          <Link to="/dashboard" className="btn secondary">Back</Link>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ESign;