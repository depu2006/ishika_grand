import React from 'react';
import { useBooking } from '../context/BookingContext';

export default function Banquets() {
  const { openEnquiry } = useBooking();

  return (
    <div style={{ paddingTop: '80px' }}>
      {/* Header Banner */}
      <section 
        className="hero-wrapper" 
        style={{ 
          backgroundImage: `url('/assets/banquet.png')`, 
          minHeight: '40vh',
          height: '40vh'
        }}
      >
        <div className="hero-overlay"></div>
        <div className="container" style={{ position: 'relative', zIndex: '2', textAlign: 'center' }}>
          <span className="sub-title" style={{ color: 'var(--gold-accent)' }}>Glorious Occasions</span>
          <h1 className="title-decor" style={{ fontSize: '3rem', margin: '0' }}>Banquet Halls & Venues</h1>
        </div>
      </section>

      {/* Main content */}
      <section className="section-padding">
        <div className="container">
          <div className="section-header">
            <span className="sub-title">Celebrate in Grandeur</span>
            <h2 className="title-decor">Luxury Event Spaces</h2>
            <p className="lead-text">
              From majestic wedding receptions to corporate conferences and executive meetings, our fully equipped halls offer customization options for every event size.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '50px' }}>
            
            {/* Hall 1: Grand Imperial Hall */}
            <div className="grid-2col align-center alt-bg" style={{ borderRadius: '8px', overflow: 'hidden', border: '1px solid var(--border-dark)' }}>
              <div className="room-img-container" style={{ height: '100%', minHeight: '350px' }}>
                <img src="/assets/banquet.png" alt="Grand Imperial Hall" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <span className="room-price-badge">Capacity: 500-800 guests</span>
              </div>
              <div style={{ padding: '40px' }}>
                <span className="sub-title" style={{ fontSize: '0.75rem' }}>Weddings & Receptions</span>
                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', marginBottom: '15px' }}>Grand Imperial Hall</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginBottom: '20px' }}>
                  Our premier and largest venue, featuring high ceilings, state-of-the-art acoustics, and magnificent chandeliers. Crafted to turn weddings, grand receptions, and major trade shows into beautiful, life-long memories.
                </p>
                <div className="room-specs" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '15px' }}>
                  <div className="spec-item"><i className="fa-solid fa-hotel"></i> Large Elevated Stage</div>
                  <div className="spec-item"><i className="fa-solid fa-microphone"></i> Premium Audio Setup</div>
                  <div className="spec-item"><i className="fa-solid fa-ice-cream"></i> Custom Buffet Area</div>
                  <div className="spec-item"><i className="fa-solid fa-snowflake"></i> Centralized Air-Conditioning</div>
                </div>
                <button className="btn btn-gold" onClick={() => openEnquiry('grand')}>Enquire Availability</button>
              </div>
            </div>

            {/* Hall 2: Royal Crystal Ballroom */}
            <div className="grid-2col align-center alt-bg" style={{ borderRadius: '8px', overflow: 'hidden', border: '1px solid var(--border-dark)', direction: 'rtl' }}>
              <div className="room-img-container" style={{ height: '100%', minHeight: '350px' }}>
                <img src="/assets/restaurant.png" alt="Royal Crystal Ballroom" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <span className="room-price-badge" style={{ left: '20px', right: 'auto' }}>Capacity: 200-400 guests</span>
              </div>
              <div style={{ padding: '40px', textAlign: 'left', direction: 'ltr' }}>
                <span className="sub-title" style={{ fontSize: '0.75rem' }}>Parties & Seminars</span>
                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', marginBottom: '15px' }}>Royal Crystal Ballroom</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginBottom: '20px' }}>
                  An elegant ballroom designed to host corporate presentations, high-impact conferences, birthdays, and anniversary parties. Fitted with customized stage lighting, digital screens, and executive layouts.
                </p>
                <div className="room-specs" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '15px' }}>
                  <div className="spec-item"><i className="fa-solid fa-display"></i> Dual Digital Projectors</div>
                  <div className="spec-item"><i className="fa-solid fa-chair"></i> Ergonomic Banquet Chairs</div>
                  <div className="spec-item"><i className="fa-solid fa-wifi"></i> Dedicated High-Speed LAN</div>
                  <div className="spec-item"><i className="fa-solid fa-lightbulb"></i> Custom Stage Spotlights</div>
                </div>
                <button className="btn btn-gold" onClick={() => openEnquiry('royal')}>Enquire Availability</button>
              </div>
            </div>

            {/* Hall 3: The Senate Boardroom */}
            <div className="grid-2col align-center alt-bg" style={{ borderRadius: '8px', overflow: 'hidden', border: '1px solid var(--border-dark)' }}>
              <div className="room-img-container" style={{ height: '100%', minHeight: '350px' }}>
                <img src="/assets/dining_table.png" alt="The Senate Boardroom" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <span className="room-price-badge">Capacity: 30-50 guests</span>
              </div>
              <div style={{ padding: '40px' }}>
                <span className="sub-title" style={{ fontSize: '0.75rem' }}>Corporate Meetings</span>
                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', marginBottom: '15px' }}>The Senate Boardroom</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginBottom: '20px' }}>
                  Fitted for close-door executive sessions, board meetings, training programs, and close-circle private celebrations. Offering quiet soundproof walls and high-tech connection setups.
                </p>
                <div className="room-specs" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '15px' }}>
                  <div className="spec-item"><i className="fa-solid fa-tv"></i> 65" Ultra HD Screen</div>
                  <div className="spec-item"><i className="fa-solid fa-plug"></i> Desktop Power Outlets</div>
                  <div className="spec-item"><i className="fa-solid fa-volume-high"></i> Soundproof Boardroom</div>
                  <div className="spec-item"><i className="fa-solid fa-mug-hot"></i> Coffee & Tea Station</div>
                </div>
                <button className="btn btn-gold" onClick={() => openEnquiry('senate')}>Enquire Availability</button>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
