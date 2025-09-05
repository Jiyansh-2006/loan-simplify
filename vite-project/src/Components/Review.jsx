import React from "react";
import { useLocation } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import "./Review.css"; // Make sure to import the CSS file

const Review = () => {
  const { state } = useLocation();
  
  // Create uploadedDocs array with proper fallbacks
  const uploadedDocs = [
    { 
      id: 1, 
      name: "Aadhaar", 
      status: state?.aadhaar?.status || "Not Uploaded", 
      feedback: state?.aadhaar?.feedback || "Document not uploaded",
      details: state?.aadhaar?.details || null
    },
    { 
      id: 2, 
      name: "PAN", 
      status: state?.pan?.status || "Not Uploaded", 
      feedback: state?.pan?.feedback || "Document not uploaded",
      details: state?.pan?.details || null
    },
    { 
      id: 3, 
      name: "APAAR", 
      status: state?.apaar?.status || "Not Uploaded", 
      feedback: state?.apaar?.feedback || "Document not uploaded",
      details: state?.apaar?.details || null
    },
  ];

  const getStatusClass = (status) => {
    switch(status) {
      case "Verified": return "status-verified";
      case "Rejected": return "status-rejected";
      case "Not Uploaded": return "status-not-uploaded";
      default: return "status-pending";
    }
  };

  return (
    <>
      <Header />
      <div className="review-container">
        <div className="review-content">
          <h2>Document Review & Status</h2>
          
          <div className="document-cards">
            {uploadedDocs.map((doc) => (
              <div key={doc.id} className="document-card">
                <div className="card-header">
                  <div className="document-name">{doc.name}</div>
                  <div className={`status-badge ${getStatusClass(doc.status)}`}>
                    {doc.status}
                  </div>
                </div>
                
                <div className="card-body">
                  <div className="detail-item">
                    <span className="detail-label">Feedback</span>
                    <span className="detail-value">{doc.feedback || "—"}</span>
                  </div>
                  
                  {doc.details && (
                    <>
                      <div className="detail-item">
                        <span className="detail-label">Details</span>
                        <div className="detail-value">
                          {doc.details.name && (
                            <div><b>Name:</b> {doc.details.name}</div>
                          )}
                          {doc.details.dob && (
                            <div><b>Date of Birth:</b> {doc.details.dob}</div>
                          )}
                          {doc.details.age && (
                            <div><b>Age:</b> {doc.details.age}</div>
                          )}
                          {doc.details.gender && (
                            <div><b>Gender:</b> {doc.details.gender}</div>
                          )}
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Review;
