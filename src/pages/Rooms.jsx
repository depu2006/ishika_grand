import React from 'react';
import { useBooking } from '../context/BookingContext';

export default function Rooms() {
  const { openBooking } = useBooking();

  return (
    <div style={{ paddingTop: '80px' }}>
      {/* Header Banner */}
      <section 
        className="hero-wrapper" 
        style={{ 
          backgroundImage: `url('/assets/room.png')`, 
          minHeight: '40vh',
          height: '40vh'
        }}
      >
        <div className="hero-overlay"></div>
        <div className="container" style={{ position: 'relative', zIndex: '2', textAlign: 'center' }}>
          <span className="sub-title" style={{ color: 'var(--gold-accent)' }}>Opulent Stays</span>
          <h1 className="title-decor" style={{ fontSize: '3rem', margin: '0' }}>Rooms & Suites</h1>
        </div>
      </section>

      {/* Main Content */}
      <section className="section-padding">
        <div className="container">
          <div className="section-header">
            <span className="sub-title">Premium Accommodations</span>
            <h2 className="title-decor">Luxury Spaces Built For Rest</h2>
            <p className="lead-text">
              Every room is meticulously designed with plush bedding, climate control, premium toiletries, and free breakfast to offer you a home away from home.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '50px' }}>
            
            {/* Card 1: Deluxe Room */}
            <div className="grid-2col align-center alt-bg" style={{ borderRadius: '8px', overflow: 'hidden', border: '1px solid var(--border-dark)' }}>
              <div className="room-img-container" style={{ height: '100%', minHeight: '350px' }}>
                <img src="/assets/room.png" alt="Deluxe Room" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <span className="room-price-badge">₹3,499 / Night</span>
              </div>
              <div style={{ padding: '40px' }}>
                <span className="sub-title" style={{ fontSize: '0.75rem' }}>Popular Choice</span>
                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', marginBottom: '15px' }}>Deluxe Room</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginBottom: '20px' }}>
                  Our Deluxe Rooms provide the perfect balance of cozy ambiance and upscale amenities. Ideal for solo travellers, couples, or corporate guests seeking a peaceful and functional workspace.
                </p>
                <div className="room-specs">
                  <div className="spec-item"><i className="fa-solid fa-bed"></i> 1 King Bed</div>
                  <div className="spec-item"><i className="fa-solid fa-users"></i> Max 2 Adults</div>
                  <div className="spec-item"><i className="fa-solid fa-maximize"></i> 320 sq. ft.</div>
                </div>
                <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
                  <button className="btn btn-gold" onClick={() => openBooking('deluxe')}>Book Now</button>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-dark)' }}>*Includes free high-speed Wi-Fi & Breakfast</span>
                </div>
              </div>
            </div>

            {/* Card 2: Executive Suite */}
            <div className="grid-2col align-center alt-bg" style={{ borderRadius: '8px', overflow: 'hidden', border: '1px solid var(--border-dark)', direction: 'rtl' }}>
              <div className="room-img-container" style={{ height: '100%', minHeight: '350px' }}>
                <img src="/assets/dining_table.png" alt="Executive Suite" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <span className="room-price-badge" style={{ left: '20px', right: 'auto' }}>₹5,499 / Night</span>
              </div>
              <div style={{ padding: '40px', textAlign: 'left', direction: 'ltr' }}>
                <span className="sub-title" style={{ fontSize: '0.75rem' }}>Business & Leisure</span>
                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', marginBottom: '15px' }}>Executive Suite</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginBottom: '20px' }}>
                  Experience top-tier hospitality in our Executive Suites. Featuring a spacious layout with separate living and sleeping areas, high-speed Wi-Fi, writing desks, and scenic city views.
                </p>
                <div className="room-specs">
                  <div className="spec-item"><i className="fa-solid fa-bed"></i> 1 King Bed</div>
                  <div className="spec-item"><i className="fa-solid fa-users"></i> Max 3 Guests</div>
                  <div className="spec-item"><i className="fa-solid fa-maximize"></i> 480 sq. ft.</div>
                </div>
                <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
                  <button className="btn btn-gold" onClick={() => openBooking('executive')}>Book Now</button>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-dark)' }}>*Includes free access to lobby lounge</span>
                </div>
              </div>
            </div>

            {/* Card 3: Family Suite */}
            <div className="grid-2col align-center alt-bg" style={{ borderRadius: '8px', overflow: 'hidden', border: '1px solid var(--border-dark)' }}>
              <div className="room-img-container" style={{ height: '100%', minHeight: '350px' }}>
                <img src="/assets/banquet.png" alt="Family Suite" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <span className="room-price-badge">₹7,499 / Night</span>
              </div>
              <div style={{ padding: '40px' }}>
                <span className="sub-title" style={{ fontSize: '0.75rem' }}>Ultimate Space</span>
                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', marginBottom: '15px' }}>Family Suite</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginBottom: '20px' }}>
                  A luxurious three-bed suite crafted for families or small groups of friends traveling together. Includes dual bathrooms, customized minibar, spacious sitting area, and full air-conditioning.
                </p>
                <div className="room-specs">
                  <div className="spec-item"><i className="fa-solid fa-bed"></i> 2 King Beds</div>
                  <div className="spec-item"><i className="fa-solid fa-users"></i> Max 5 Guests</div>
                  <div className="spec-item"><i className="fa-solid fa-maximize"></i> 650 sq. ft.</div>
                </div>
                <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
                  <button className="btn btn-gold" onClick={() => openBooking('family')}>Book Now</button>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-dark)' }}>*Complimentary laundry service up to 4 pieces</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
