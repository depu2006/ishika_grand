import React, { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useBooking } from '../context/BookingContext';

export default function Header() {
  const [isSticky, setIsSticky] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { openBooking } = useBooking();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className={`header ${isSticky ? 'sticky' : ''}`}>
      <div className="container">
        <div className="nav-wrapper">
          {/* Logo Area */}
          <Link to="/" className="logo-container" onClick={closeMenu}>
            <img 
              src="/assets/original_logo.png" 
              alt="Ishika Grand Logo" 
              className="logo-glowing-backlight" 
            />
            <div className="logo-text">
              <span className="logo-telugu">ఇషిక</span>
              <span className="logo-main">ISHIKA GRAND</span>
            </div>
          </Link>

          {/* Navigation Links */}
          <nav className={`nav-links ${isMenuOpen ? 'open' : ''}`}>
            <NavLink 
              to="/" 
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
              onClick={closeMenu}
              end
            >
              Home
            </NavLink>
            <NavLink 
              to="/about" 
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
              onClick={closeMenu}
            >
              About
            </NavLink>
            <NavLink 
              to="/rooms" 
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
              onClick={closeMenu}
            >
              Rooms
            </NavLink>
            <NavLink 
              to="/dining" 
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
              onClick={closeMenu}
            >
              Dining
            </NavLink>
            <NavLink 
              to="/banquets" 
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
              onClick={closeMenu}
            >
              Banquets
            </NavLink>
            <NavLink 
              to="/gallery" 
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
              onClick={closeMenu}
            >
              Gallery
            </NavLink>
            <NavLink 
              to="/contact" 
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
              onClick={closeMenu}
            >
              Contact
            </NavLink>
          </nav>

          {/* Right Header Controls */}
          <div className="header-right">
            <a href="tel:09581756678" className="phone-link">
              <i className="fa-solid fa-phone"></i>
              <span>+91 95817 56678</span>
            </a>
            <button 
              className="btn btn-gold" 
              onClick={() => openBooking()}
            >
              Book A Room
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className={`hamburger ${isMenuOpen ? 'open' : ''}`} 
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>
    </header>
  );
}
