import React, { useState } from 'react';
import { useBooking } from '../context/BookingContext';

const FAQS = [
  {
    id: 1,
    q: "What are the standard Check-In and Check-Out timings?",
    a: "Our standard Check-In time is 12:00 PM (noon) and Check-Out is 11:00 AM. Early Check-In or late Check-Out is subject to availability and might incur additional nominal charges."
  },
  {
    id: 2,
    q: "Is complimentary breakfast included in the room rates?",
    a: "Yes! All room reservations (Deluxe Room, Executive Suite, Family Suite) come with complimentary traditional South Indian and Continental breakfast, served at our dining lounge."
  },
  {
    id: 3,
    q: "Does the hotel provide parking facilities?",
    a: "Absolutely. We offer secure, private outdoor and basement parking spaces for both guests staying at the hotel and visitors attending events at our banquet halls."
  },
  {
    id: 4,
    q: "Can we customize catering packages for wedding events at the Banquet Hall?",
    a: "Yes, we specialize in custom catering. Our culinary chef team offers customizable multi-cuisine menus (Veg/Non-Veg) including signature South Indian biryanis, Chinese platters, and hot starters."
  },
  {
    id: 5,
    q: "Is there Wi-Fi available at the hotel?",
    a: "Yes. We offer free, high-speed Wi-Fi access throughout the entire property, including all guest rooms, public lounges, and banquet conference spaces."
  }
];

export default function Contact() {
  const { addToast } = useBooking();
  const [activeFaq, setActiveFaq] = useState(null);

  // Form State
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('general');
  const [message, setMessage] = useState('');

  const toggleFaq = (id) => {
    setActiveFaq(activeFaq === id ? null : id);
  };

  const handleContactSubmit = (e) => {
    e.preventDefault();
    if (!name || !phone || !email || !message) {
      alert('Please fill out all contact form fields.');
      return;
    }

    addToast(`Thanks for contacting us, ${name}! Our team will call you back shortly. Message ID: MSG-${Math.floor(100 + Math.random() * 900)}`);
    setName('');
    setPhone('');
    setEmail('');
    setMessage('');
  };

  return (
    <div style={{ paddingTop: '80px' }}>
      {/* Header Banner */}
      <section 
        className="hero-wrapper" 
        style={{ 
          backgroundImage: `url('/assets/building.jpg')`, 
          minHeight: '40vh',
          height: '40vh'
        }}
      >
        <div className="hero-overlay"></div>
        <div className="container" style={{ position: 'relative', zIndex: '2', textAlign: 'center' }}>
          <span className="sub-title" style={{ color: 'var(--gold-accent)' }}>Get In Touch</span>
          <h1 className="title-decor" style={{ fontSize: '3rem', margin: '0' }}>Contact & FAQ</h1>
        </div>
      </section>

      {/* Contact info and form */}
      <section className="section-padding">
        <div className="container">
          <div className="contact-grid">
            {/* Info details */}
            <div className="contact-info">
              <span className="sub-title">Find Us</span>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.2rem', color: '#fff', marginBottom: '10px' }}>
                Reach Out To Our Desk
              </h2>
              <p style={{ color: 'var(--text-muted)' }}>
                Have questions regarding rooms, restaurant bookings, or catering estimates for banquet events? Call us or fill out the enquiry form.
              </p>

              <div className="info-item">
                <div className="info-icon">
                  <i className="fa-solid fa-location-dot"></i>
                </div>
                <div className="info-text">
                  <h3>Our Location</h3>
                  <p>2-21, Annojiguda, Hyderabad, Secunderabad, Telangana 500088</p>
                </div>
              </div>

              <div className="info-item">
                <div className="info-icon">
                  <i className="fa-solid fa-phone"></i>
                </div>
                <div className="info-text">
                  <h3>Direct Phone Call</h3>
                  <p>095817 56678 / +91 95817 56678</p>
                </div>
              </div>

              <div className="info-item">
                <div className="info-icon">
                  <i className="fa-solid fa-envelope"></i>
                </div>
                <div className="info-text">
                  <h3>General Email</h3>
                  <p>info@ishikagrand.com / support@ishikagrand.com</p>
                </div>
              </div>
            </div>

            {/* General enquiry form */}
            <form onSubmit={handleContactSubmit} className="contact-form">
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.6rem', color: '#fff', marginBottom: '25px' }}>
                Send A Direct Message
              </h3>

              <div className="form-group">
                <label htmlFor="contact-name">Full Name</label>
                <input 
                  type="text" 
                  id="contact-name" 
                  placeholder="Enter your name" 
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className="form-grid">
                <div className="form-group">
                  <label htmlFor="contact-phone">Phone Number</label>
                  <input 
                    type="tel" 
                    id="contact-phone" 
                    placeholder="Enter phone number" 
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="contact-email">Email Address</label>
                  <input 
                    type="email" 
                    id="contact-email" 
                    placeholder="Enter email address" 
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="contact-subject">Topic of Enquiry</label>
                <select 
                  id="contact-subject"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                >
                  <option value="general">General Query / Help</option>
                  <option value="room">Room Reservation Query</option>
                  <option value="dining">Restaurant Query</option>
                  <option value="banquet">Banquet Hall / Event Packages</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="contact-message">Your Message</label>
                <textarea 
                  id="contact-message" 
                  rows="4" 
                  placeholder="Describe your questions or requirements here..." 
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                ></textarea>
              </div>

              <button type="submit" className="btn btn-gold btn-block">
                Send Message
              </button>
            </form>
          </div>

          {/* Map Frame */}
          <div className="map-frame">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3806.94060867825!2d78.6473138!3d17.4146059!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb9f7831fbb739%3A0xc48c0879ee417f7d!2sHotel%20Ishika%20Grand!5e0!3m2!1sen!2sin!4v1689000000000!5m2!1sen!2sin"
              allowFullScreen="" 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="Google Map location of Ishika Grand hotel"
            ></iframe>
          </div>
        </div>
      </section>

      {/* FAQ Accordions */}
      <section className="section-padding alt-bg faq-section">
        <div className="container">
          <div className="section-header">
            <span className="sub-title">Got Questions?</span>
            <h2 className="title-decor">Frequently Asked Questions</h2>
          </div>

          <div className="faq-grid">
            {FAQS.map((faq) => (
              <div 
                key={faq.id} 
                className={`faq-item ${activeFaq === faq.id ? 'active' : ''}`}
              >
                <button 
                  className="faq-question"
                  onClick={() => toggleFaq(faq.id)}
                >
                  <span>{faq.q}</span>
                  <i className="fa-solid fa-chevron-down"></i>
                </button>
                <div className="faq-answer">
                  <p>{faq.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
