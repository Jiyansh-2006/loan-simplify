import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import Logo from "../assets/Logo.png";

const Header = () => {
  return (
    <header className="site-header">
      <div className="logo-container">
        <img src={Logo} alt="" className="Logo"/>
        <h1 className="logo">LoanSimplify</h1>
      </div>
      <nav className="navigation">
        <Link to="/" className="nav-link active">Home</Link>
        <a href="#about" className="nav-link">About</a>
        <a href="#contact" className="nav-link">Contact Us</a>
      </nav>
    </header>
  );
};

export default Header;
