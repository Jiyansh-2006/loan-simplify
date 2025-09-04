import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="site-footer" id="contact">
      <div className="footer-content">
        <p>Contact us: support@aadhaarverify.com | +91 98765 43210</p>
        <p className="copyright">
          &copy; {new Date().getFullYear()} AadhaarVerify. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
