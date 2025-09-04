import React from "react";
import { useNavigate } from "react-router-dom";
import { CheckCircle, Shield, Zap, Clock } from "lucide-react";
import Header from "./Header";
import Footer from "./Footer";
import "./Home.css"; // import CSS file

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <Header />

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <div className="hero-grid">
            
            {/* Left Text */}
            <div className="hero-text">
              <h1 className="hero-title">
                Aadhaar-Based <br />
                <span className="highlight">Document Verification</span><br />
                Simplified
              </h1>
              <p className="hero-subtitle">
                A secure, compliant, and lightning-fast platform for Aadhaar-based document verification. 
                Built for businesses, trusted by professionals, and designed for India’s digital future.
              </p>

              {/* CTA Buttons */}
              <div className="cta-buttons">
                <button className="btn-primary" onClick={() => navigate("/login")}>
                  Login
                </button>
                <button className="btn-outline" onClick={() => navigate("/signup")}>
                  Sign Up
                </button>
              </div>

              {/* Quick Feature Highlights */}
              <div className="quick-features">
                <div className="feature-item">
                  <Zap className="icon-blue" />
                  <span>Instant Results</span>
                </div>
                <div className="feature-item">
                  <Shield className="icon-teal" />
                  <span>Bank-Grade Security</span>
                </div>
                <div className="feature-item">
                  <CheckCircle className="icon-green" />
                  <span>Govt. Compliant</span>
                </div>
              </div>
            </div>

            {/* Right Hero Image */}
            <div className="hero-image">
              <img
                src="https://images.pexels.com/photos/5668772/pexels-photo-5668772.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Document Verification"
              />
              <div className="circle circle-blue"></div>
              <div className="circle circle-teal"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="features-container">
          <div className="features-header">
            <h2>
              Why Choose <span className="highlight">LoanSimplify</span>?
            </h2>
            <p>
              A trusted platform that combines speed, compliance, and security—empowering organizations to verify identities effortlessly.
            </p>
          </div>

          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon blue">
                <Zap />
              </div>
              <h3>Lightning Fast</h3>
              <p>Verification results in under <strong>3 seconds</strong>. Optimized algorithms ensure speed without compromising accuracy.</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon teal">
                <Shield />
              </div>
              <h3>Bank-Grade Security</h3>
              <p>Enterprise-level encryption with strict data handling protocols. Your sensitive data is never stored or shared.</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon green">
                <Clock />
              </div>
              <h3>Always Available</h3>
              <p>24/7 availability ensures uninterrupted access to our verification services—anytime, anywhere.</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
