import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import './Header.css';
import logoImg from "../assets/Logo.png";

const Header = () => {
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const menuRef = useRef(null);

  // Detect scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMobileMenuOpen(false);
      }
    };

    if (isMobileMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMobileMenuOpen]);

  // Check login status on load
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  const menuItems = [
    { label: 'Home', path: '/' },
    { label: 'Features', path: '#features' },
    { label: 'Pricing', path: '#pricing' },
    { label: 'Contact', path: '#contact' }
  ];

  return (
    <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="header-container">
        {/* Left: Logo */}
        <div className="header-left">
          <div className="logo" onClick={() => navigate('/')}>
            <img src={logoImg} alt="LoanSimplify Logo" className="logo-icon" />
            <span className="logo-text">LoanSimplify</span>
          </div>
        </div>

        {/* Center: Navigation */}
        <div className="header-center">
          <nav className="desktop-nav">
            {menuItems.map((item, index) => (
              <a
                key={index}
                href={item.path}
                className="nav-link"
                onClick={(e) => {
                  if (item.path === '/') {
                    e.preventDefault();
                    navigate('/');
                  }
                }}
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>

        {/* Right: Auth / Account */}
        <div className="header-right">
          <div className="desktop-auth">
            {user ? (
              <div className="account-dropdown">
                <button>Account ▾</button>
                <div className="account-dropdown-content">
                  <p><strong>Name:</strong> {user.name}</p>
                  <p><strong>Email:</strong> {user.email}</p>
                  <button onClick={handleLogout}>Logout</button>
                </div>
              </div>
            ) : (
              <>
                <button className="btn-ghost" onClick={() => navigate('/login')}>
                  Login
                </button>
                <button className="btn-primary" onClick={() => navigate('/signup')}>
                  Sign Up
                </button>
              </>
            )}
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="mobile-menu-btn"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="mobile-nav" ref={menuRef}>
          {menuItems.map((item, index) => (
            <a
              key={index}
              href={item.path}
              className="mobile-nav-link"
              onClick={(e) => {
                if (item.path === '/') {
                  e.preventDefault();
                  navigate('/');
                }
                setIsMobileMenuOpen(false); // close menu on link click
              }}
            >
              {item.label}
            </a>
          ))}

          <div className="mobile-auth">
            {user ? (
              <>
                <button
                  className="btn-ghost"
                  onClick={() => {
                    navigate('/account');
                    setIsMobileMenuOpen(false);
                  }}
                >
                  Account
                </button>
                <button
                  className="btn-primary"
                  onClick={() => {
                    handleLogout();
                    setIsMobileMenuOpen(false);
                  }}
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <button
                  className="btn-ghost"
                  onClick={() => {
                    navigate('/login');
                    setIsMobileMenuOpen(false);
                  }}
                >
                  Login
                </button>
                <button
                  className="btn-primary"
                  onClick={() => {
                    navigate('/signup');
                    setIsMobileMenuOpen(false);
                  }}
                >
                  Sign Up
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
