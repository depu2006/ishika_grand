import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          {/* Col 1: About / Branding */}
          <div className="footer-col">
            <div className="logo-container" style={{ marginBottom: '20px' }}>
              <img 
                src="/assets/original_logo.png" 
                alt="Ishika Grand Logo" 
                className="logo-glowing-backlight" 
                style={{ width: '40px', height: '40px' }}
              />
              <div className="logo-text">
                <span className="logo-telugu" style={{ fontSize: '0.65rem' }}>ఇషిక</span>
                <span className="logo-main" style={{ fontSize: '1.1rem' }}>ISHIKA GRAND</span>
              </div>
            </div>
            <p>Experience world-class hospitality combined with traditional values. Our luxury rooms, restaurant, and banquet halls make every moment grand.</p>
            <div className="social-links">
              <a href="#" className="social-link" aria-label="Facebook"><i className="fa-brands fa-facebook-f"></i></a>
              <a href="#" className="social-link" aria-label="Instagram"><i className="fa-brands fa-instagram"></i></a>
              <a href="#" className="social-link" aria-label="Twitter"><i className="fa-brands fa-twitter"></i></a>
              <a href="#" className="social-link" aria-label="YouTube"><i className="fa-brands fa-youtube"></i></a>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="footer-col">
            <h3>Quick Links</h3>
            <ul>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/rooms">Luxury Rooms</Link></li>
              <li><Link to="/dining">Fine Dining</Link></li>
              <li><Link to="/banquets">Banquet Halls</Link></li>
              <li><Link to="/gallery">Photo Gallery</Link></li>
              <li><Link to="/contact">Contact & Support</Link></li>
            </ul>
          </div>

          {/* Col 3: Amenities */}
          <div className="footer-col">
            <h3>Amenities</h3>
            <ul style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
              <li style={{ marginBottom: '12px' }}><i className="fa-solid fa-wifi" style={{ color: 'var(--gold-primary)', marginRight: '10px' }}></i> Free High-Speed Wi-Fi</li>
              <li style={{ marginBottom: '12px' }}><i className="fa-solid fa-utensils" style={{ color: 'var(--gold-primary)', marginRight: '10px' }}></i> Free Breakfast</li>
              <li style={{ marginBottom: '12px' }}><i className="fa-solid fa-square-parking" style={{ color: 'var(--gold-primary)', marginRight: '10px' }}></i> Free Parking Space</li>
              <li style={{ marginBottom: '12px' }}><i className="fa-solid fa-snowflake" style={{ color: 'var(--gold-primary)', marginRight: '10px' }}></i> Fully Air-Conditioned</li>
              <li style={{ marginBottom: '12px' }}><i className="fa-solid fa-shirt" style={{ color: 'var(--gold-primary)', marginRight: '10px' }}></i> Express Laundry Service</li>
              <li style={{ marginBottom: '12px' }}><i className="fa-solid fa-bell-concierge" style={{ color: 'var(--gold-primary)', marginRight: '10px' }}></i> 24/7 Room Service</li>
            </ul>
          </div>

          {/* Col 4: Contact info */}
          <div className="footer-col">
            <h3>Reach Us</h3>
            <p style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
              <i className="fa-solid fa-location-dot" style={{ color: 'var(--gold-primary)', marginTop: '4px' }}></i>
              <span>2-21, Annojiguda, Hyderabad, Secunderabad, Telangana 500088</span>
            </p>
            <p style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
              <i className="fa-solid fa-phone" style={{ color: 'var(--gold-primary)' }}></i>
              <span>095817 56678</span>
            </p>
            <p style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
              <i className="fa-solid fa-envelope" style={{ color: 'var(--gold-primary)' }}></i>
              <span>info@ishikagrand.com</span>
            </p>
          </div>
        </div>

        <div className="footer-bottom">
          <span>&copy; {currentYear} Ishika Grand. All Rights Reserved.</span>
          <span>Designed with Premium Luxury & Gold Theme</span>
        </div>
      </div>
    </footer>
  );
}
