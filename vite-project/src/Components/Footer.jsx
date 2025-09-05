import React from 'react';
import { Shield, Mail, Phone, MapPin, Twitter, Linkedin, Github } from 'lucide-react';
import './Footer.css';
import logoImg from "../assets/Logo.png";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    product: [
      { label: 'Features', href: '#features' },
      { label: 'Pricing', href: '#pricing' },
      { label: 'API Documentation', href: '#api' },
      { label: 'Integration Guide', href: '#integration' }
    ],
    company: [
      { label: 'About Us', href: '#about' },
      { label: 'Careers', href: '#careers' },
      { label: 'Press Kit', href: '#press' },
      { label: 'Contact', href: '#contact' }
    ],
    support: [
      { label: 'Help Center', href: '#help' },
      { label: 'Community', href: '#community' },
      { label: 'Status', href: '#status' },
      { label: 'Bug Reports', href: '#bugs' }
    ],
    legal: [
      { label: 'Privacy Policy', href: '#privacy' },
      { label: 'Terms of Service', href: '#terms' },
      { label: 'Security', href: '#security' },
      { label: 'Compliance', href: '#compliance' }
    ]
  };

  const socialLinks = [
    { icon: Twitter, href: '#twitter', label: 'Twitter' },
    { icon: Linkedin, href: '#linkedin', label: 'LinkedIn' },
    { icon: Github, href: '#github', label: 'GitHub' }
  ];

  return (
    <footer className="footer">
      <div className="footer-container">
        
        {/* Main Footer Content */}
        <div className="footer-content">
          
          {/* Company Info */}
          <div className="footer-brand">
            <div className="footer-logo">
              <img src={logoImg} alt="LoanSimplify Logo" className="logo-icon" />
              <span className="logo-text">LoanSimplify</span>
            </div>
            <p className="footer-description">
              Secure, compliant, and lightning-fast Aadhaar-based document verification 
              platform designed for India's digital future.
            </p>

            <div className="contact-info">
              <div className="contact-item">
                <Mail size={16} />
                <span>support@loansimplify.com</span>
              </div>
              <div className="contact-item">
                <Phone size={16} />
                <span>+91 99999 99999</span>
              </div>
              <div className="contact-item">
                <MapPin size={16} />
                <span>Mumbai, Maharashtra, India</span>
              </div>
            </div>

            <div className="social-links">
              {socialLinks.map((social, index) => (
                <a 
                  key={index} 
                  href={social.href} 
                  className="social-link" 
                  aria-label={social.label}
                >
                  <social.icon size={20} />
                </a>
              ))}
            </div>
          </div>

          {/* Footer Links */}
          <div className="footer-links">
            {Object.entries(footerLinks).map(([section, links], idx) => (
              <div className="footer-column" key={idx}>
                <h3 className="footer-heading">
                  {section.charAt(0).toUpperCase() + section.slice(1)}
                </h3>
                <ul className="footer-list">
                  {links.map((link, i) => (
                    <li key={i}>
                      <a href={link.href} className="footer-link">{link.label}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom">
          <div className="footer-bottom-content">
            <p className="copyright">
              © {currentYear} LoanSimplify. All rights reserved.
            </p>
            <div className="footer-bottom-links">
              <span className="compliance-badge">
                <Shield size={14} />
                SOC 2 Compliant
              </span>
              <span className="compliance-badge">
                <Shield size={14} />
                ISO 27001 Certified
              </span>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
