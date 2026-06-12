import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function About() {
  const navigate = useNavigate();

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
          <span className="sub-title" style={{ color: 'var(--gold-accent)' }}>Learn Our Story</span>
          <h1 className="title-decor" style={{ fontSize: '3rem', margin: '0' }}>About Ishika Grand</h1>
        </div>
      </section>

      {/* Main Content */}
      <section className="section-padding">
        <div className="container">
          <div className="grid-2col align-center">
            {/* Left Column: Story text */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <span className="sub-title">A Legacy of Comfort</span>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.4rem', color: 'var(--text-pure)' }}>
                Redefining Luxury & Hospitality in Hyderabad
              </h2>
              <p style={{ color: 'var(--text-muted)' }}>
                Ishika Grand stands as a premier hospitality landmark in Hyderabad, offering an exquisite blend of high-end modern amenities and traditional values. Located conveniently in Annojiguda, we provide our guests with an unparalleled retreat, whether they are visiting for leisure, business, or celebrating grand life events.
              </p>
              <p style={{ color: 'var(--text-muted)' }}>
                Our commitment is to deliver a perfect, stress-free stay with prompt services, premium bedding, hygiene-focused clean rooms, and customized event planning in our grand banquet halls.
              </p>
              
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px', marginTop: '20px' }}>
                <div style={{ borderLeft: '3px solid var(--gold-primary)', paddingLeft: '15px' }}>
                  <h4 style={{ fontFamily: 'var(--font-decor)', color: 'var(--gold-primary)', fontSize: '1.8rem', fontWeight: '800' }}>10+</h4>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Years of Professional Excellence</p>
                </div>
                <div style={{ borderLeft: '3px solid var(--gold-primary)', paddingLeft: '15px' }}>
                  <h4 style={{ fontFamily: 'var(--font-decor)', color: 'var(--gold-primary)', fontSize: '1.8rem', fontWeight: '800' }}>100k+</h4>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Happy Guests Served</p>
                </div>
              </div>
            </div>

            {/* Right Column: Building Image with experience badge */}
            <div className="image-frame-gold" style={{ position: 'relative' }}>
              <img 
                src="/assets/building.jpg" 
                alt="Ishika Grand Hotel Entrance" 
                className="img-responsive rounded" 
              />
              <div 
                style={{ 
                  position: 'absolute', 
                  bottom: '-20px', 
                  right: '-20px', 
                  backgroundColor: 'rgba(28, 26, 22, 0.95)', 
                  border: '1px solid var(--border-gold)',
                  padding: '20px',
                  borderRadius: '4px',
                  backdropFilter: 'blur(5px)',
                  maxWidth: '240px',
                  textAlign: 'center'
                }}
              >
                <i className="fa-solid fa-award" style={{ fontSize: '2rem', color: 'var(--gold-primary)', marginBottom: '10px' }}></i>
                <h4 style={{ fontFamily: 'var(--font-serif)', color: 'var(--text-pure)', fontSize: '1.1rem' }}>Premium Rated Hotel</h4>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '5px' }}>Recognized for top-tier hygiene and premium room service.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Highlights / Values */}
      <section className="section-padding alt-bg">
        <div className="container">
          <div className="section-header">
            <span className="sub-title">Why Choose Us</span>
            <h2 className="title-decor">Our Core Pillars</h2>
          </div>

          <div className="grid-3col">
            <div className="room-card" style={{ padding: '30px', textAlign: 'center' }}>
              <i className="fa-solid fa-shield-halved" style={{ fontSize: '2.2rem', color: 'var(--gold-primary)', marginBottom: '20px' }}></i>
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.35rem', marginBottom: '12px' }}>Hygiene & Safety</h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                We maintain the highest sanitation guidelines across all rooms, dining tables, kitchens, and hallways for guest security.
              </p>
            </div>

            <div className="room-card" style={{ padding: '30px', textAlign: 'center' }}>
              <i className="fa-solid fa-clock-rotate-left" style={{ fontSize: '2.2rem', color: 'var(--gold-primary)', marginBottom: '20px' }}></i>
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.35rem', marginBottom: '12px' }}>24/7 Prompt Support</h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                From late-night dinner requests to prompt checkout aid, our hospitable lobby staff is available 24/7.
              </p>
            </div>

            <div className="room-card" style={{ padding: '30px', textAlign: 'center' }}>
              <i className="fa-solid fa-map-location-dot" style={{ fontSize: '2.2rem', color: 'var(--gold-primary)', marginBottom: '20px' }}></i>
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.35rem', marginBottom: '12px' }}>Convenient Location</h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                Situated on the Annojiguda main road, we are highly accessible from both Hyderabad city centre and Secunderabad railway hub.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
