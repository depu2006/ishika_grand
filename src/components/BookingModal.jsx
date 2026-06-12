import React, { useState, useEffect } from 'react';
import { useBooking } from '../context/BookingContext';

const ROOM_PRICES = {
  deluxe: { name: 'Deluxe Room', price: 3499 },
  executive: { name: 'Executive Suite', price: 5499 },
  family: { name: 'Family Suite', price: 7499 },
};

export default function BookingModal() {
  const {
    isBookingOpen,
    closeBooking,
    selectedRoomType,
    setSelectedRoomType,
    checkInDate,
    setCheckInDate,
    checkOutDate,
    setCheckOutDate,
    addToast,
  } = useBooking();

  const [guests, setGuests] = useState(1);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [nights, setNights] = useState(1);

  // Set default dates if empty
  useEffect(() => {
    if (isBookingOpen) {
      const today = new Date();
      const tomorrow = new Date();
      tomorrow.setDate(today.getDate() + 1);

      if (!checkInDate) {
        setCheckInDate(today.toISOString().split('T')[0]);
      }
      if (!checkOutDate) {
        setCheckOutDate(tomorrow.toISOString().split('T')[0]);
      }
    }
  }, [isBookingOpen]);

  // Calculate nights whenever dates change
  useEffect(() => {
    if (checkInDate && checkOutDate) {
      const checkIn = new Date(checkInDate);
      const checkOut = new Date(checkOutDate);
      const timeDiff = checkOut.getTime() - checkIn.getTime();
      const calculatedNights = Math.ceil(timeDiff / (1000 * 3600 * 24));
      setNights(calculatedNights > 0 ? calculatedNights : 1);
    }
  }, [checkInDate, checkOutDate]);

  if (!isBookingOpen) return null;

  const currentRoom = ROOM_PRICES[selectedRoomType] || ROOM_PRICES.deluxe;
  const basePricePerNight = currentRoom.price;
  const subtotal = basePricePerNight * nights;
  const gst = Math.round(subtotal * 0.18);
  const totalAmount = subtotal + gst;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !phone || !email) {
      alert('Please fill out all personal details.');
      return;
    }
    
    // Simulate booking reservation
    addToast(`Successfully booked ${currentRoom.name} for ${nights} night(s). Enquiry ID: IG-${Math.floor(100000 + Math.random() * 900000)}`);
    closeBooking();
    
    // Reset inputs
    setName('');
    setPhone('');
    setEmail('');
  };

  return (
    <div className="booking-modal-overlay" onClick={closeBooking}>
      <div className="booking-modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={closeBooking} aria-label="Close modal">
          <i className="fa-solid fa-xmark"></i>
        </button>

        <h2 className="modal-title">Reserve Your Stay</h2>
        <p className="modal-subtitle">Indulge in premium comfort and luxury at Ishika Grand</p>

        <form onSubmit={handleSubmit}>
          {/* Stay Details */}
          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="modal-check-in">Check In</label>
              <input
                type="date"
                id="modal-check-in"
                required
                value={checkInDate}
                min={new Date().toISOString().split('T')[0]}
                onChange={(e) => setCheckInDate(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="modal-check-out">Check Out</label>
              <input
                type="date"
                id="modal-check-out"
                required
                value={checkOutDate}
                min={checkInDate || new Date().toISOString().split('T')[0]}
                onChange={(e) => setCheckOutDate(e.target.value)}
              />
            </div>
          </div>

          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="modal-room-type">Room / Suite Type</label>
              <select
                id="modal-room-type"
                value={selectedRoomType}
                onChange={(e) => setSelectedRoomType(e.target.value)}
              >
                <option value="deluxe">Deluxe Room (₹3,499/night)</option>
                <option value="executive">Executive Suite (₹5,499/night)</option>
                <option value="family">Family Suite (₹7,499/night)</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="modal-guests">Guests</label>
              <select
                id="modal-guests"
                value={guests}
                onChange={(e) => setGuests(parseInt(e.target.value))}
              >
                <option value="1">1 Guest</option>
                <option value="2">2 Guests</option>
                <option value="3">3 Guests</option>
                <option value="4">4 Guests</option>
                <option value="5">5+ Guests</option>
              </select>
            </div>
          </div>

          {/* Pricing Estimation Summary */}
          <div className="booking-summary-box">
            <div className="summary-row">
              <span>Selected Option:</span>
              <strong>{currentRoom.name}</strong>
            </div>
            <div className="summary-row">
              <span>Rate:</span>
              <span>₹{basePricePerNight.toLocaleString()} / night</span>
            </div>
            <div className="summary-row">
              <span>Nights:</span>
              <span>{nights} night(s)</span>
            </div>
            <div className="summary-row">
              <span>Subtotal:</span>
              <span>₹{subtotal.toLocaleString()}</span>
            </div>
            <div className="summary-row">
              <span>GST (18%):</span>
              <span>₹{gst.toLocaleString()}</span>
            </div>
            <div className="summary-row total">
              <span>Estimated Total:</span>
              <span>₹{totalAmount.toLocaleString()}</span>
            </div>
          </div>

          {/* Personal Information */}
          <h3 style={{ fontFamily: 'var(--font-decor)', fontSize: '0.85rem', color: 'var(--gold-primary)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '15px' }}>
            Guest Information
          </h3>

          <div className="form-group">
            <label htmlFor="modal-name">Full Name</label>
            <input
              type="text"
              id="modal-name"
              placeholder="Enter your full name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="modal-phone">Phone Number</label>
              <input
                type="tel"
                id="modal-phone"
                placeholder="Enter phone number"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="modal-email">Email Address</label>
              <input
                type="email"
                id="modal-email"
                placeholder="Enter email address"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <button type="submit" className="btn btn-gold btn-block" style={{ marginTop: '10px' }}>
            Confirm Stay Request
          </button>
        </form>
      </div>
    </div>
  );
}
