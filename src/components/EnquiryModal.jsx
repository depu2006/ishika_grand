import React, { useState } from 'react';
import { useBooking } from '../context/BookingContext';

const HALL_DETAILS = {
  grand: { name: 'Grand Imperial Hall', capacity: '500-800 Guests' },
  royal: { name: 'Royal Crystal Ballroom', capacity: '200-400 Guests' },
  senate: { name: 'The Senate Boardroom', capacity: '30-50 Guests' },
};

export default function EnquiryModal() {
  const {
    isEnquiryOpen,
    closeEnquiry,
    selectedHallType,
    setSelectedHallType,
    addToast,
  } = useBooking();

  const [eventDate, setEventDate] = useState('');
  const [guestsCount, setGuestsCount] = useState('');
  const [eventType, setEventType] = useState('wedding');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [notes, setNotes] = useState('');

  if (!isEnquiryOpen) return null;

  const currentHall = HALL_DETAILS[selectedHallType] || HALL_DETAILS.grand;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !phone || !email || !eventDate || !guestsCount) {
      alert('Please fill out all required fields.');
      return;
    }

    addToast(`Banquet enquiry submitted for ${currentHall.name} on ${eventDate}. Enquiry ID: BH-${Math.floor(100000 + Math.random() * 900000)}`);
    closeEnquiry();

    // Reset inputs
    setName('');
    setPhone('');
    setEmail('');
    setNotes('');
    setEventDate('');
    setGuestsCount('');
  };

  return (
    <div className="booking-modal-overlay" onClick={closeEnquiry}>
      <div className="booking-modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={closeEnquiry} aria-label="Close modal">
          <i className="fa-solid fa-xmark"></i>
        </button>

        <h2 className="modal-title">Banquet Hall Enquiry</h2>
        <p className="modal-subtitle">Host your premium corporate meetings, wedding receptions, or social gatherings at Ishika Grand</p>

        <form onSubmit={handleSubmit}>
          {/* Hall & Event Selection */}
          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="enquiry-hall">Select Hall / Space</label>
              <select
                id="enquiry-hall"
                value={selectedHallType}
                onChange={(e) => setSelectedHallType(e.target.value)}
              >
                <option value="grand">Grand Imperial Hall (500-800 capacity)</option>
                <option value="royal">Royal Crystal Ballroom (200-400 capacity)</option>
                <option value="senate">The Senate Boardroom (30-50 capacity)</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="enquiry-date">Event Date</label>
              <input
                type="date"
                id="enquiry-date"
                required
                min={new Date().toISOString().split('T')[0]}
                value={eventDate}
                onChange={(e) => setEventDate(e.target.value)}
              />
            </div>
          </div>

          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="enquiry-event-type">Event Type</label>
              <select
                id="enquiry-event-type"
                value={eventType}
                onChange={(e) => setEventType(e.target.value)}
              >
                <option value="wedding">Wedding / Reception</option>
                <option value="corporate">Corporate Seminar / Meeting</option>
                <option value="birthday">Birthday Celebration</option>
                <option value="anniversary">Anniversary Party</option>
                <option value="other">Other Social Gathering</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="enquiry-guests">Expected Guests</label>
              <input
                type="number"
                id="enquiry-guests"
                required
                placeholder="e.g. 250"
                min="10"
                value={guestsCount}
                onChange={(e) => setGuestsCount(e.target.value)}
              />
            </div>
          </div>

          {/* Contact Info */}
          <h3 style={{ fontFamily: 'var(--font-decor)', fontSize: '0.85rem', color: 'var(--gold-primary)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '15px', marginTop: '10px' }}>
            Contact Information
          </h3>

          <div className="form-group">
            <label htmlFor="enquiry-name">Full Name</label>
            <input
              type="text"
              id="enquiry-name"
              placeholder="Enter your name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="enquiry-phone">Phone Number</label>
              <input
                type="tel"
                id="enquiry-phone"
                placeholder="Enter phone number"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="enquiry-email">Email Address</label>
              <input
                type="email"
                id="enquiry-email"
                placeholder="Enter email address"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="enquiry-notes">Special Requirements / Catering Details</label>
            <textarea
              id="enquiry-notes"
              rows="3"
              placeholder="Describe decor, stage, audio-visual setup or dining preferences..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            ></textarea>
          </div>

          <button type="submit" className="btn btn-gold btn-block" style={{ marginTop: '10px' }}>
            Submit Banquet Enquiry
          </button>
        </form>
      </div>
    </div>
  );
}
