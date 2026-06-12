import React, { useState, useEffect } from 'react';

const GALLERY_IMAGES = [
  { id: 1, category: 'hotel', src: '/assets/building.jpg', title: 'Hotel Exterior', desc: 'Sleek luxury design at dusk' },
  { id: 2, category: 'rooms', src: '/assets/room.png', title: 'Deluxe Suite', desc: 'Premium bedding and comfort' },
  { id: 3, category: 'dining', src: '/assets/restaurant_interior.jpg', title: 'Restaurant Interior', desc: 'Warm ambient fine dining seating' },
  { id: 4, category: 'dining', src: '/assets/pulao.png', title: 'Raju Gari Kodi Pulao', desc: 'Signature authentic chicken pulao' },
  { id: 5, category: 'dining', src: '/assets/chicken_fry.jpg', title: 'Nalla Miriyala Kodi Vepudu', desc: 'Spicy black pepper chicken fry' },
  { id: 6, category: 'hotel', src: '/assets/dining_table.png', title: 'Executive Dinner Layout', desc: 'Elegantly decorated VIP tables' },
  { id: 7, category: 'hotel', src: '/assets/banquet.png', title: 'Grand Imperial Hall', desc: 'Spectacular banquet layout' },
  { id: 8, category: 'hotel', src: '/assets/hero.png', title: 'Lobby Entrance Lounge', desc: 'Premium welcoming space' },
  { id: 9, category: 'dining', src: '/assets/restaurant.png', title: 'Fine Dining Buffet', desc: 'Multi-cuisine spread' },
];

export default function Gallery() {
  const [filter, setFilter] = useState('all');
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const filteredImages = filter === 'all' 
    ? GALLERY_IMAGES 
    : GALLERY_IMAGES.filter(img => img.category === filter);

  // Keyboard Navigation for Lightbox
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (lightboxIndex === null) return;
      if (e.key === 'Escape') setLightboxIndex(null);
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex]);

  const handleNext = () => {
    setLightboxIndex((prevIndex) => {
      if (prevIndex === null) return null;
      return (prevIndex + 1) % filteredImages.length;
    });
  };

  const handlePrev = () => {
    setLightboxIndex((prevIndex) => {
      if (prevIndex === null) return null;
      return (prevIndex - 1 + filteredImages.length) % filteredImages.length;
    });
  };

  const activeImage = lightboxIndex !== null ? filteredImages[lightboxIndex] : null;

  return (
    <div style={{ paddingTop: '80px' }}>
      {/* Header Banner */}
      <section 
        className="hero-wrapper" 
        style={{ 
          backgroundImage: `url('/assets/hero.png')`, 
          minHeight: '40vh',
          height: '40vh'
        }}
      >
        <div className="hero-overlay"></div>
        <div className="container" style={{ position: 'relative', zIndex: '2', textAlign: 'center' }}>
          <span className="sub-title" style={{ color: 'var(--gold-accent)' }}>Visual Tour</span>
          <h1 className="title-decor" style={{ fontSize: '3rem', margin: '0' }}>Hotel Photo Gallery</h1>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="section-padding">
        <div className="container">
          {/* Category Filters */}
          <div className="gallery-filter">
            <button 
              className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
              onClick={() => { setFilter('all'); setLightboxIndex(null); }}
            >
              All Photos
            </button>
            <button 
              className={`filter-btn ${filter === 'hotel' ? 'active' : ''}`}
              onClick={() => { setFilter('hotel'); setLightboxIndex(null); }}
            >
              Hotel & Banquets
            </button>
            <button 
              className={`filter-btn ${filter === 'dining' ? 'active' : ''}`}
              onClick={() => { setFilter('dining'); setLightboxIndex(null); }}
            >
              Fine Dining
            </button>
            <button 
              className={`filter-btn ${filter === 'rooms' ? 'active' : ''}`}
              onClick={() => { setFilter('rooms'); setLightboxIndex(null); }}
            >
              Luxury Rooms
            </button>
          </div>

          {/* Grid Layout */}
          <div className="gallery-grid">
            {filteredImages.map((image, index) => (
              <div 
                key={image.id} 
                className="gallery-item"
                onClick={() => setLightboxIndex(index)}
              >
                <img src={image.src} alt={image.title} loading="lazy" />
                <div className="gallery-overlay">
                  <i className="fa-solid fa-expand"></i>
                  <h4>{image.title}</h4>
                  <span>{image.category}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      {activeImage && (
        <div className="lightbox-modal" onClick={() => setLightboxIndex(null)}>
          <button 
            className="lightbox-close" 
            onClick={() => setLightboxIndex(null)}
            aria-label="Close Lightbox"
          >
            <i className="fa-solid fa-xmark"></i>
          </button>

          {/* Prev Arrow */}
          <button 
            style={{
              position: 'absolute',
              left: '40px',
              background: 'none',
              border: 'none',
              color: '#fff',
              fontSize: '2.5rem',
              cursor: 'pointer',
              zIndex: '2005'
            }}
            onClick={(e) => { e.stopPropagation(); handlePrev(); }}
            aria-label="Previous Image"
          >
            <i className="fa-solid fa-chevron-left"></i>
          </button>

          {/* Image Content */}
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            <img src={activeImage.src} alt={activeImage.title} />
            <div className="lightbox-caption">
              <h4>{activeImage.title}</h4>
              <p>{activeImage.desc}</p>
            </div>
          </div>

          {/* Next Arrow */}
          <button 
            style={{
              position: 'absolute',
              right: '40px',
              background: 'none',
              border: 'none',
              color: '#fff',
              fontSize: '2.5rem',
              cursor: 'pointer',
              zIndex: '2005'
            }}
            onClick={(e) => { e.stopPropagation(); handleNext(); }}
            aria-label="Next Image"
          >
            <i className="fa-solid fa-chevron-right"></i>
          </button>
        </div>
      )}
    </div>
  );
}
