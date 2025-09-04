import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import "./UploadDocuments.css";

const MAX_FILE_SIZE = 2 * 1024 * 1024;
const ALLOWED_TYPES = ["image/png", "image/jpeg", "application/pdf"];
const OTP_VALIDITY = 120;

const UploadDocuments = () => {
  const navigate = useNavigate();

  const [aadhaar, setAadhaar] = useState("");
  const [pan, setPan] = useState("");
  const [apaar, setApaar] = useState("");

  const [otpSent, setOtpSent] = useState({ aadhaar: false, pan: false, apaar: false });
  const [otpInput, setOtpInput] = useState({ aadhaar: "", pan: "", apaar: "" });
  const [generatedOtp, setGeneratedOtp] = useState({ aadhaar: "", pan: "", apaar: "" });
  const [otpTimer, setOtpTimer] = useState({ aadhaar: 0, pan: 0, apaar: 0 });
  const [verified, setVerified] = useState({ aadhaar: false, pan: false, apaar: false });

  const [files, setFiles] = useState({ aadhaar: null, pan: null, apaar: null });

  const [review, setReview] = useState({
    aadhaar: { status: "Pending", feedback: "", details: null },
    pan: { status: "Pending", feedback: "", details: null },
    apaar: { status: "Pending", feedback: "", details: null }
  });

  const [submitDisabled, setSubmitDisabled] = useState(true);

  // OTP timer
  useEffect(() => {
    const interval = setInterval(() => {
      setOtpTimer((prev) => ({
        aadhaar: prev.aadhaar > 0 ? prev.aadhaar - 1 : 0,
        pan: prev.pan > 0 ? prev.pan - 1 : 0,
        apaar: prev.apaar > 0 ? prev.apaar - 1 : 0
      }));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (verified.aadhaar && verified.pan && verified.apaar &&
      files.aadhaar && files.pan && files.apaar) {
      setSubmitDisabled(false);
    } else {
      setSubmitDisabled(true);
    }
  }, [verified, files]);

  const sendOtp = (docType) => {
    // Validate document number format before sending OTP
    let isValid = false;
    
    if (docType === "aadhaar") {
      // Aadhaar validation: 12 digits (with or without spaces)
      const cleanAadhaar = aadhaar.replace(/\s/g, '');
      isValid = /^\d{12}$/.test(cleanAadhaar);
      if (!isValid) alert("Aadhaar must be 12 digits");
    } else if (docType === "pan") {
      // PAN validation: 5 letters, 4 digits, 1 letter
      isValid = /^[A-Z]{5}[0-9]{4}[A-Z]$/i.test(pan);
      if (!isValid) alert("PAN must be in format ABCDE1234F");
    } else if (docType === "apaar") {
      // APAAR validation: 12 digits
      isValid = /^\d{12}$/.test(apaar);
      if (!isValid) alert("APAAR must be 12 digits");
    }
    
    if (!isValid) return;
    
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedOtp((prev) => ({ ...prev, [docType]: otp }));
    setOtpSent((prev) => ({ ...prev, [docType]: true }));
    setOtpTimer((prev) => ({ ...prev, [docType]: OTP_VALIDITY }));
    alert(`Simulated OTP for ${docType.toUpperCase()}: ${otp}`);
  };

  const verifyOtp = (docType) => {
    if (otpInput[docType] === generatedOtp[docType] && otpTimer[docType] > 0) {
      setVerified((prev) => ({ ...prev, [docType]: true }));
      alert(`${docType.toUpperCase()} OTP verified!`);
    } else {
      setVerified((prev) => ({ ...prev, [docType]: false }));
      alert(`${docType.toUpperCase()} OTP invalid or expired`);
    }
  };

  const handleFileChange = (docType, file) => {
    if (!file) return;
    if (!ALLOWED_TYPES.includes(file.type)) {
      alert(`${docType.toUpperCase()} must be PNG, JPEG, or PDF`);
      setFiles((prev) => ({ ...prev, [docType]: null }));
      return;
    }
    if (file.size > MAX_FILE_SIZE) {
      alert(`${docType.toUpperCase()} exceeds 2MB`);
      setFiles((prev) => ({ ...prev, [docType]: null }));
      return;
    }
    setFiles((prev) => ({ ...prev, [docType]: file }));
  };

  const verifyDocument = async (file, docType, userInput) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("doc_type", docType);
    formData.append("user_input", userInput);

    const res = await fetch(`${import.meta.env.VITE_API_URL}/verify`, {
      method: "POST",
      body: formData
    });

    return res.json();
  };

  const handleVerifyDocument = async (docType) => {
    const file = files[docType];
    if (!file) { 
      alert(`Upload ${docType} document first`); 
      return; 
    }
    
    // Get the user input for this document type
    let userInput = "";
    if (docType === "aadhaar") userInput = aadhaar.replace(/\s/g, '');
    else if (docType === "pan") userInput = pan;
    else if (docType === "apaar") userInput = apaar;
    
    if (!userInput) { 
      alert(`Enter ${docType} number first`); 
      return; 
    }

    try {
      const result = await verifyDocument(file, docType, userInput);
      setReview((prev) => ({ 
        ...prev, 
        [docType]: { 
          status: result.status, 
          feedback: result.feedback,
          details: result.details || null
        } 
      }));
      
      // Only mark as verified if the backend confirms it
      setVerified((prev) => ({ ...prev, [docType]: result.status === "Verified" }));
      alert(`${docType.toUpperCase()} verification ${result.status}`);
    } catch (err) {
      alert("Server error while verifying document");
      console.error(err);
    }
  };

  const handleSubmit = () => {
    navigate("/review", { state: review });
  };

  // Format document type for display
  const formatDocType = (docType) => {
    if (docType === "aadhaar") return "Aadhaar";
    if (docType === "pan") return "PAN";
    if (docType === "apaar") return "APAAR";
    return docType;
  };

  return (
    <>
      <Header />
      <div className="container">
        <h2>Upload & Verify Documents</h2>
        
        {["aadhaar", "pan", "apaar"].map(doc => (
          <div key={doc} className="document-section">
            <h3>{formatDocType(doc)} Document</h3>
            
            <div className="input-group">
              <label>{formatDocType(doc)} Number</label>
              <input
                type="text"
                value={doc === "aadhaar" ? aadhaar : doc === "pan" ? pan : apaar}
                onChange={e => {
                  if (doc === "aadhaar") setAadhaar(e.target.value);
                  else if (doc === "pan") setPan(e.target.value);
                  else setApaar(e.target.value);
                }}
                placeholder={
                  doc === "aadhaar" ? "1234 5678 9012" : 
                  doc === "pan" ? "ABCDE1234F" : 
                  "123456789012"
                }
                disabled={verified[doc]}
              />
              
              {!verified[doc] && (
                <button 
                  onClick={() => sendOtp(doc)}
                  disabled={
                    (doc === "aadhaar" && !aadhaar) ||
                    (doc === "pan" && !pan) ||
                    (doc === "apaar" && !apaar)
                  }
                >
                  Send OTP
                </button>
              )}
              
              {otpSent[doc] && !verified[doc] && (
                <div className="otp-group">
                  <input
                    type="text"
                    placeholder="Enter OTP"
                    value={otpInput[doc]}
                    onChange={e => setOtpInput(prev => ({ ...prev, [doc]: e.target.value }))}
                    maxLength={6}
                  />
                  <button onClick={() => verifyOtp(doc)}>Verify OTP</button>
                  <span className="otp-timer">
                    {otpTimer[doc] > 0 ? `Expires in ${otpTimer[doc]}s` : "OTP expired"}
                  </span>
                </div>
              )}
              
              {verified[doc] && (
                <div className="verified-badge">OTP Verified ✓</div>
              )}
            </div>
            
            {verified[doc] && (
              <div className="file-upload-group">
                <label>Upload {formatDocType(doc)} Document</label>
                <input 
                  type="file" 
                  onChange={e => handleFileChange(doc, e.target.files[0])} 
                  accept=".png,.jpg,.jpeg,.pdf"
                />
                
                {files[doc] && (
                  <div>
                    <p>Selected: {files[doc].name}</p>
                    <button onClick={() => handleVerifyDocument(doc)}>
                      Verify Document
                    </button>
                  </div>
                )}
                
                <div className="verification-result">
                  <p className={`status ${review[doc].status.toLowerCase()}`}>
                    Status: {review[doc].status}
                  </p>
                  <p>Feedback: {review[doc].feedback}</p>
                  
                  {review[doc].details && Object.keys(review[doc].details).length > 0 && (
                    <div className="extracted-details">
                      <h4>Extracted Details:</h4>
                      {review[doc].details.name && <p><strong>Name:</strong> {review[doc].details.name}</p>}
                      {review[doc].details.dob && <p><strong>Date of Birth:</strong> {review[doc].details.dob}</p>}
                      {review[doc].details.gender && <p><strong>Gender:</strong> {review[doc].details.gender}</p>}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}
        
        <button 
          onClick={handleSubmit} 
          disabled={submitDisabled}
          className="submit-button"
        >
          Submit All Documents
        </button>
      </div>
      <Footer />
    </>
  );
};

export default UploadDocuments;