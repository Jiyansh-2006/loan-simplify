import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CheckCircle, Shield, Zap, Clock, ArrowRight, Play, Star, Users, Award, TrendingUp } from "lucide-react";
import Header from "./Header";
import Footer from "./Footer";
import "./Home.css";

const Home = () => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const stats = [
    { number: "1M+", label: "Verifications" },
    { number: "99.9%", label: "Accuracy" },
    { number: "2.3s", label: "Avg. Speed" },
    { number: "500+", label: "Enterprises" }
  ];

  const testimonials = [
    {
      name: "Rahul Sharma",
      role: "CTO, FinTech Solutions",
      content: "LoanSimplify transformed our KYC process. The speed and accuracy are unmatched.",
      rating: 5
    },
    {
      name: "Priya Patel", 
      role: "Head of Operations, SecureBank",
      content: "Seamless integration and exceptional security. Our verification time reduced by 90%.",
      rating: 5
    }
  ];

  return (
    <div className="home-container">
      <Header />

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-background">
          <div className="gradient-orb orb-1"></div>
          <div className="gradient-orb orb-2"></div>
          <div className="gradient-orb orb-3"></div>
        </div>
        
        <div className="hero-content">
          <div className="hero-grid">
            
            {/* Left Text */}
              <div className={`hero-text ${isVisible ? 'animate-in' : ''}`}>
              <div className="trust-badge">
                <Shield size={16} />
                <span>Trusted by 500+ Organizations</span>
              </div>
              
              <h1 className="hero-title">
                Aadhaar-Based <br />
                <span className="highlight">Document Verification</span><br />
                <span className="gradient-text">Simplified</span>
              </h1>
              
              <p className="hero-subtitle">
                A secure, compliant, and lightning-fast platform for Aadhaar-based document verification. 
                Built for businesses, trusted by professionals, and designed for India's digital future.
              </p>

              {/* Stats Row */}
              <div className="stats-row">
                {stats.map((stat, index) => (
                  <div key={index} className="stat-item">
                    <div className="stat-number">{stat.number}</div>
                    <div className="stat-label">{stat.label}</div>
                  </div>
                ))}
              </div>

              {/* CTA Buttons */}
              <div className="cta-buttons">
                <button className="btn-primary" onClick={() => navigate("/login")}>
                  <span>Get Started</span>
                  <ArrowRight size={20} />
                </button>
                <button className="btn-outline" onClick={() => navigate("/signup")}>
                  <Play size={18} />
                  <span>Watch Demo</span>
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
            <div className={hero-image ${isVisible ? 'animate-in-delay' : ''}}>
              <div className="image-container">
                <img
                  src="https://images.pexels.com/photos/5668772/pexels-photo-5668772.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt="Document Verification"
                />
                <div className="floating-card verification-card">
                  <div className="card-icon">
                    <CheckCircle size={24} />
                  </div>
                  <div className="card-content">
                    <div className="card-title">Verification Complete</div>
                    <div className="card-subtitle">✓ Identity Confirmed</div>
                  </div>
                </div>
                <div className="floating-card speed-card">
                  <div className="speed-indicator">
                    <Clock size={20} />
                    <span>2.3s</span>
                  </div>
                </div>
              </div>
              <div className="circle circle-blue"></div>
              <div className="circle circle-teal"></div>
              <div className="circle circle-orange"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="features-container">
          <div className="features-header">
            <div className="section-badge">
              <Award size={16} />
              <span>Industry Leading</span>
            </div>
            <h2>
              Why Choose <span className="highlight">LoanSimplify</span>?
            </h2>
            <p>
              A trusted platform that combines speed, compliance, and security—empowering organizations to verify identities effortlessly.
            </p>
          </div>

          <div className="features-grid">
            <div className="feature-card modern">
              <div className="feature-icon blue">
                <Zap />
              </div>
              <h3>Lightning Fast</h3>
              <p>Verification results in under <strong>3 seconds</strong>. Optimized algorithms ensure speed without compromising accuracy.</p>
              <div className="feature-metric">
                <TrendingUp size={16} />
                <span>90% faster than competitors</span>
              </div>
            </div>

            <div className="feature-card modern">
              <div className="feature-icon teal">
                <Shield />
              </div>
              <h3>Bank-Grade Security</h3>
              <p>Enterprise-level encryption with strict data handling protocols. Your sensitive data is never stored or shared.</p>
              <div className="feature-metric">
                <Award size={16} />
                <span>ISO 27001 Certified</span>
              </div>
            </div>

            <div className="feature-card modern">
              <div className="feature-icon green">
                <Clock />
              </div>
              <h3>Always Available</h3>
              <p>24/7 availability ensures uninterrupted access to our verification services—anytime, anywhere.</p>
              <div className="feature-metric">
                <Users size={16} />
                <span>99.9% uptime guarantee</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials-section">
        <div className="testimonials-container">
          <div className="testimonials-header">
            <h2>Trusted by Industry Leaders</h2>
            <p>See what our customers have to say about their experience</p>
          </div>
          
          <div className="testimonials-grid">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="testimonial-card">
                <div className="testimonial-rating">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} size={16} fill="currentColor" />
                  ))}
                </div>
                <p className="testimonial-content">"{testimonial.content}"</p>
                <div className="testimonial-author">
                  <div className="author-info">
                    <div className="author-name">{testimonial.name}</div>
                    <div className="author-role">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
