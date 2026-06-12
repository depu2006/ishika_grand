import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBooking } from '../context/BookingContext';

export default function Home() {
  const navigate = useNavigate();
  const { openBooking } = useBooking();
  
  // Quick booking state
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [roomType, setRoomType] = useState('deluxe');

  const handleQuickBook = (e) => {
    e.preventDefault();
    openBooking(roomType, checkIn, checkOut);
  };

  return (
    <div>
      {/* Hero Section */}
      <section 
        className="hero-wrapper" 
        style={{ backgroundImage: `url('/assets/hero.png')` }}
      >
        <div className="hero-overlay"></div>
        <div className="container">
          <div className="hero-content">
            <span className="sub-title" style={{ color: 'var(--gold-accent)' }}>
              Welcome to Golden Hospitality
            </span>
            <h1 className="hero-title">
              A Sanctuary of Comfort <span>& Elegance in Hyderabad</span>
            </h1>
            <p className="hero-desc">
              Experience premium rooms, exquisite multi-cuisine dining, and magnificent banquet spaces tailored to your special moments.
            </p>
            <div className="hero-btn-group">
              <button className="btn btn-gold btn-lg" onClick={() => openBooking()}>
                Explore Rooms & Book
              </button>
              <button className="btn btn-outline btn-lg" onClick={() => navigate('/contact')}>
                Contact Us
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Booking Bar */}
      <div className="container">
        <div className="quick-booking-bar">
          <form onSubmit={handleQuickBook} className="booking-form-row">
            <div className="input-group">
              <label htmlFor="quick-check-in">Check In</label>
              <input 
                type="date" 
                id="quick-check-in" 
                required
                min={new Date().toISOString().split('T')[0]}
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
              />
            </div>
            <div className="input-group">
              <label htmlFor="quick-check-out">Check Out</label>
              <input 
                type="date" 
                id="quick-check-out" 
                required
                min={checkIn || new Date().toISOString().split('T')[0]}
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
              />
            </div>
            <div className="input-group">
              <label htmlFor="quick-room-type">Room Type</label>
              <select 
                id="quick-room-type"
                value={roomType}
                onChange={(e) => setRoomType(e.target.value)}
              >
                <option value="deluxe">Deluxe Room</option>
                <option value="executive">Executive Suite</option>
                <option value="family">Family Suite</option>
              </select>
            </div>
            <button type="submit" className="btn btn-gold btn-block" style={{ height: '49px' }}>
              Check Availability <i className="fa-solid fa-arrow-right" style={{ marginLeft: '5px' }}></i>
            </button>
          </form>
        </div>
      </div>

      {/* Hospitality Highlights */}
      <section className="section-padding">
        <div className="container">
          <div className="section-header">
            <span className="sub-title">Outstanding Experience</span>
            <h2 className="title-decor">Our Core Services</h2>
            <p className="lead-text">We offer premium facilities to make your stay, dining, and celebratory events memorable and luxurious.</p>
          </div>

          <div className="grid-3col">
            <div className="room-card" style={{ padding: '40px', textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '20px', alignItems: 'center' }}>
              <div style={{ width: '80px', height: '80px', borderRadius: '50%', backgroundColor: 'var(--bg-primary)', border: '1px solid var(--border-gold)', display: 'flex', alignItems: 'center', justifycontent: 'center', fontSize: '2rem', color: 'var(--gold-primary)' }}>
                <i className="fa-solid fa-hotel" style={{ marginTop: '20px' }}></i>
              </div>
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem' }}>Luxury Stays</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Choose from our Deluxe Rooms, Executive Suites, and spacious Family Suites designed for pure relaxation.</p>
              <button className="btn btn-outline" onClick={() => navigate('/rooms')}>Explore Rooms</button>
            </div>

            <div className="room-card" style={{ padding: '40px', textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '20px', alignItems: 'center' }}>
              <div style={{ width: '80px', height: '80px', borderRadius: '50%', backgroundColor: 'var(--bg-primary)', border: '1px solid var(--border-gold)', display: 'flex', alignItems: 'center', justifycontent: 'center', fontSize: '2rem', color: 'var(--gold-primary)' }}>
                <i className="fa-solid fa-utensils" style={{ marginTop: '20px' }}></i>
              </div>
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem' }}>Fine Dining</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Explore authentic South Indian Pulaos, spicy Clay Oven Kebabs, and mouth-watering multi-cuisine specialties.</p>
              <button className="btn btn-outline" onClick={() => navigate('/dining')}>View Menu</button>
            </div>

            <div className="room-card" style={{ padding: '40px', textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '20px', alignItems: 'center' }}>
              <div style={{ width: '80px', height: '80px', borderRadius: '50%', backgroundColor: 'var(--bg-primary)', border: '1px solid var(--border-gold)', display: 'flex', alignItems: 'center', justifycontent: 'center', fontSize: '2rem', color: 'var(--gold-primary)' }}>
                <i className="fa-solid fa-champagne-glasses" style={{ marginTop: '20px' }}></i>
              </div>
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem' }}>Banquets & Events</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Plan your dream weddings, grand receptions, and premium corporate events in our spacious banquet halls.</p>
              <button className="btn btn-outline" onClick={() => navigate('/banquets')}>Enquire Space</button>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial / Feedback Section */}
      <section className="section-padding alt-bg">
        <div className="container">
          <div className="section-header">
            <span className="sub-title">What Our Guests Say</span>
            <h2 className="title-decor">Testimonials</h2>
          </div>

          <div className="grid-3col">
            <div className="room-card" style={{ padding: '30px', position: 'relative' }}>
              <div style={{ color: 'var(--gold-primary)', fontSize: '1.5rem', marginBottom: '15px' }}>
                <i className="fa-solid fa-quote-left"></i>
              </div>
              <p style={{ fontStyle: 'italic', fontSize: '0.9rem', marginBottom: '20px', color: 'var(--text-muted)' }}>
                "The rooms were absolutely clean and the staff was extremely polite. We stayed in the Family Suite and the experience was truly five-star. Highly recommend their room service too!"
              </p>
              <h4 style={{ fontFamily: 'var(--font-serif)', color: 'var(--text-pure)' }}>Rajesh Kumar</h4>
              <span style={{ fontSize: '0.75rem', color: 'var(--gold-primary)', fontFamily: 'var(--font-decor)' }}>Corporate Guest</span>
            </div>

            <div className="room-card" style={{ padding: '30px', position: 'relative' }}>
              <div style={{ color: 'var(--gold-primary)', fontSize: '1.5rem', marginBottom: '15px' }}>
                <i className="fa-solid fa-quote-left"></i>
              </div>
              <p style={{ fontStyle: 'italic', fontSize: '0.9rem', marginBottom: '20px', color: 'var(--text-muted)' }}>
                "We hosted our daughter's wedding reception at the Grand Imperial Hall of Ishika Grand. The catering was exceptional, and the decorations were absolutely stunning. Special thanks to the banquet manager!"
              </p>
              <h4 style={{ fontFamily: 'var(--font-serif)', color: 'var(--text-pure)' }}>Anitha Rao</h4>
              <span style={{ fontSize: '0.75rem', color: 'var(--gold-primary)', fontFamily: 'var(--font-decor)' }}>Wedding Host</span>
            </div>

            <div className="room-card" style={{ padding: '30px', position: 'relative' }}>
              <div style={{ color: 'var(--gold-primary)', fontSize: '1.5rem', marginBottom: '15px' }}>
                <i className="fa-solid fa-quote-left"></i>
              </div>
              <p style={{ fontStyle: 'italic', fontSize: '0.9rem', marginBottom: '20px', color: 'var(--text-muted)' }}>
                "Their Raju Gari Kodi Pulao is out of this world! The dining ambiance is premium and dark gold themed, making it perfect for family gatherings. A must-visit place in Hyderabad."
              </p>
              <h4 style={{ fontFamily: 'var(--font-serif)', color: 'var(--text-pure)' }}>Vikram Aditya</h4>
              <span style={{ fontSize: '0.75rem', color: 'var(--gold-primary)', fontFamily: 'var(--font-decor)' }}>Food Connoisseur</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
