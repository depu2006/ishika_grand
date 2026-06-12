import React, { useState } from 'react';
import { useBooking } from '../context/BookingContext';

const MENU_ITEMS = {
  'south-indian-starters': [
    { name: 'Konaseema Kodi Vepudu', price: '₹419', desc: 'Authentic Andhra-style spicy fried chicken tossed with curry leaves, cashews, and traditional Konaseema spices.' },
    { name: 'Natukodi Roast', price: '₹499', desc: 'Country chicken dry roast slow-cooked in a traditional iron wok with fiery dry red chillies and ghee.' },
    { name: 'Bhimavaram Royyala Vepudu', price: '₹499', desc: 'Stir-fried fresh prawns coated with a rich, aromatic spice blend from the coastal town of Bhimavaram.' },
    { name: 'Karivepaku Mushroom Vepudu', price: '₹349', desc: 'Crisp button mushrooms stir-fried with a fragrant, house-ground curry leaf powder and green chillies.' },
    { name: 'Miryala Paneer Vepudu', price: '₹349', desc: 'Paneer cubes fried with freshly crushed black pepper corns and basic spices.' },
    { name: 'Bangla Paneer', price: '₹359', desc: 'Soft cottage cheese cubes deep-fried and tossed in a special, creamy red masala sauce.' },
  ],
  'clay-oven': [
    { name: 'Velluli Kodi Kebab', price: '₹429', desc: 'Juicy boneless chicken marinated in a robust fresh garlic and yogurt paste, grilled to smoky perfection.' },
    { name: 'Murgh Malai Kebab', price: '₹399', desc: 'Mouth-melting chicken skewers marinated in cream, cheese, cardamom, and fresh green coriander.' },
    { name: 'Tandoori Chicken (Half)', price: '₹389', desc: 'Traditional bone-in chicken (4 pieces) marinated in red chilli yogurt paste and char-grilled in our clay oven.' },
    { name: 'Paneer Tikka', price: '₹349', desc: 'Cubes of fresh cottage cheese, onions, and bell peppers marinated in tandoori spices and skewered hot.' },
    { name: 'Hara Bhara Kebab', price: '₹349', desc: 'Pan-fried green patties made of mashed spinach, green peas, cottage cheese, and spices.' },
    { name: 'Mutton Seekh Kebab', price: '₹499', desc: 'Finely minced mutton mixed with aromatic spices, skewered and roasted on glowing charcoal.' },
  ],
  'pulaos-biryanis': [
    { name: 'Raju Gari Kodi Pulao', price: '₹499', desc: 'Our signature aromatic, mild yet extremely flavorful chicken pulao cooked to perfection with pure ghee.' },
    { name: 'Pachi Mirchi Kodi Pulao', price: '₹429', desc: 'Spicy and green chilli paste-infused tender chicken cooked together with fragrant basmati rice.' },
    { name: 'Potlam Biryani', price: '₹599', desc: 'Flavorful minced meat and rice parcel wrapped in a thin omelette, a unique and delicious specialty.' },
    { name: 'Special Chicken Biryani', price: '₹429', desc: 'Fragrant basmati rice served with rich, delicious boneless chicken tikka and spiced gravy.' },
    { name: 'Nalli Gosht Biryani', price: '₹569', desc: 'The ultimate royalty. Basmati rice served with slowly simmered tender mutton shanks (nalli).' },
    { name: 'Kaju Paneer Biryani', price: '₹389', desc: 'A rich and aromatic vegetarian option featuring fried cashews and cottage cheese cubes.' },
  ],
  'main-course': [
    { name: 'Mamsam Sangati', price: '₹499', desc: 'A wholesome, traditional Rayalaseema delicacy of ragi mudda served with spicy mutton gravy.' },
    { name: 'Avakaya Muddapappu Annam', price: '₹329', desc: 'An authentic Telugu emotion of steamed rice mixed with yellow lentils, spicy mango pickle, and pure ghee.' },
    { name: 'Andhra Mutton Curry', price: '₹499', desc: 'Tender mutton pieces slow-cooked in a spicy gravy with freshly roasted spices and coconut paste.' },
    { name: 'Chepala Pulusu', price: '₹499', desc: 'A classic coastal Andhra tangy and spicy fish curry made in tamarind juice and custom spices.' },
    { name: 'Bagara Rice + Kodi Kura', price: '₹549', desc: 'Classic Hyderabadi bagara rice served alongside a spicy, traditional home-style chicken curry.' },
    { name: 'Gongura Prawns Curry', price: '₹499', desc: 'Fresh prawns simmered in a tangy and spicy gravy infused with sour sorrel (gongura) leaves.' },
  ],
  'chinese-special': [
    { name: 'Chicken Majestic', price: '₹429', desc: 'Fried chicken strips tossed in a spicy, tangy yogurt sauce with green chillies and curry leaves.' },
    { name: 'Chicken Fried Rice', price: '₹379', desc: 'Stir-fried basmati rice cooked with eggs, tender chicken pieces, fresh vegetables, and soy sauce.' },
    { name: 'Veg Schezwan Noodles', price: '₹349', desc: 'Noodles stir-fried with mixed vegetables in a fiery, hot house-made Schezwan paste.' },
    { name: 'Veg Manchurian', price: '₹329', desc: 'Deep-fried mixed vegetable balls tossed in a tangy, sweet, and spicy Manchurian sauce.' },
    { name: 'Chicken 65', price: '₹429', desc: 'Spicy, deep-fried chicken cubes marinated with red chillies, yogurt, and curry leaves.' },
    { name: 'Chilli Chicken Wet Gravy', price: '₹359', desc: 'Crispy batter-fried chicken bites tossed with onions, bell peppers, and green chillies in a semi-gravy.' },
  ],
  'beverages-desserts': [
    { name: 'Spiced Jamun Mocktail', price: '₹179', desc: 'A unique twist of sweet jamun pulp blended with dynamic spices and lemon zest.' },
    { name: 'Virgin Mojito', price: '₹179', desc: 'Refreshing mocktail with crushed fresh mint leaves, lemon juice, sugar, and fizz.' },
    { name: 'Lassi (Sweet / Salt)', price: '₹109', desc: 'Traditional thick and creamy churned yogurt beverage, served chilled.' },
    { name: 'Anjeer Badam Ice Cream', price: '₹129', desc: 'Premium dried fig and almond flavored ice cream scoop, rich and nutty.' },
    { name: 'Caramel Nuts Ice Cream', price: '₹129', desc: 'Vanilla bean ice cream scoop laced with rich golden caramel sauce and roasted cashews.' },
    { name: 'Fresh Fruit Juice', price: '₹109', desc: 'Seasonal fresh juice extracted daily, served chilled without preservatives.' },
  ],
};

export default function Dining() {
  const [activeTab, setActiveTab] = useState('south-indian-starters');
  const { addToast } = useBooking();
  
  // Table Booking Form State
  const [resName, setResName] = useState('');
  const [resPhone, setResPhone] = useState('');
  const [resDate, setResDate] = useState('');
  const [resTime, setResTime] = useState('20:00');
  const [resGuests, setResGuests] = useState('2');

  const handleBookTable = (e) => {
    e.preventDefault();
    if (!resName || !resPhone || !resDate) {
      alert('Please fill out all table reservation fields.');
      return;
    }

    addToast(`Table reserved successfully for ${resGuests} guests on ${resDate} at ${resTime}. Reservation ID: T-${Math.floor(100 + Math.random() * 900)}`);
    setResName('');
    setResPhone('');
    setResDate('');
  };

  return (
    <div style={{ paddingTop: '80px' }}>
      {/* Header Banner */}
      <section 
        className="hero-wrapper" 
        style={{ 
          backgroundImage: `url('/assets/restaurant_interior.jpg')`, 
          minHeight: '40vh',
          height: '40vh'
        }}
      >
        <div className="hero-overlay"></div>
        <div className="container" style={{ position: 'relative', zIndex: '2', textAlign: 'center' }}>
          <span className="sub-title" style={{ color: 'var(--gold-accent)' }}>Culinary Delights</span>
          <h1 className="title-decor" style={{ fontSize: '3rem', margin: '0' }}>Ishika Multi-Cuisine Restaurant</h1>
        </div>
      </section>

      {/* Main Dining Menu Section */}
      <section className="section-padding">
        <div className="container">
          <div className="grid-2col align-center">
            
            {/* Left side: Menu card list */}
            <div>
              <div className="section-header" style={{ textAlign: 'left', marginBottom: '30px' }}>
                <span className="sub-title">Aromatic Flavors</span>
                <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.4rem', color: 'var(--text-pure)' }}>
                  Our Dining Menu
                </h2>
              </div>

              {/* Tabs */}
              <div className="menu-tabs">
                <button 
                  className={`menu-tab-btn ${activeTab === 'south-indian-starters' ? 'active' : ''}`}
                  onClick={() => setActiveTab('south-indian-starters')}
                >
                  South Indian Starters
                </button>
                <button 
                  className={`menu-tab-btn ${activeTab === 'clay-oven' ? 'active' : ''}`}
                  onClick={() => setActiveTab('clay-oven')}
                >
                  Clay Oven & Tandoor
                </button>
                <button 
                  className={`menu-tab-btn ${activeTab === 'pulaos-biryanis' ? 'active' : ''}`}
                  onClick={() => setActiveTab('pulaos-biryanis')}
                >
                  Pulaos & Biryanis
                </button>
                <button 
                  className={`menu-tab-btn ${activeTab === 'main-course' ? 'active' : ''}`}
                  onClick={() => setActiveTab('main-course')}
                >
                  Main Course
                </button>
                <button 
                  className={`menu-tab-btn ${activeTab === 'chinese-special' ? 'active' : ''}`}
                  onClick={() => setActiveTab('chinese-special')}
                >
                  Chinese Special
                </button>
                <button 
                  className={`menu-tab-btn ${activeTab === 'beverages-desserts' ? 'active' : ''}`}
                  onClick={() => setActiveTab('beverages-desserts')}
                >
                  Beverages & Desserts
                </button>
              </div>

              {/* Tab content panel */}
              <div className="menu-tabs-content" style={{ minHeight: '350px' }}>
                <div className="tab-pane active" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  {MENU_ITEMS[activeTab]?.map((item, index) => (
                    <div key={index} className="menu-item">
                      <div className="menu-item-header">
                        <span className="dish-name">{item.name}</span>
                        <span className="dish-price">{item.price}</span>
                      </div>
                      <p className="dish-desc">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right side: Restaurant Interior Photo with operating details */}
            <div className="dining-image-side">
              <div className="image-frame-gold">
                <img 
                  src="/assets/restaurant_interior.jpg" 
                  alt="Ishika Grand Restaurant Interior" 
                  className="img-responsive rounded" 
                />
                <div className="dining-time-tag">
                  <i className="fa-regular fa-clock" style={{ marginRight: '8px' }}></i>
                  Open Daily: 11:00 AM - 11:00 PM
                </div>
              </div>
            </div>

          </div>

          {/* Signature Recommendations */}
          <div className="signature-section">
            <h3 className="signature-title">
              <i className="fa-solid fa-star"></i> Chef's Signature Recommendations
            </h3>
            <div className="signature-grid">
              <div className="signature-card">
                <div className="sig-img-container">
                  <img src="/assets/pulao.png" alt="Raju Gari Kodi Pulao" />
                </div>
                <div className="sig-details">
                  <h4>Raju Gari Kodi Pulao</h4>
                  <p>A spicy, aromatic traditional Andhra chicken rice dish cooked with signature spice-blends and served with raita.</p>
                  <span className="sig-price">₹499</span>
                </div>
              </div>

              <div className="signature-card">
                <div className="sig-img-container">
                  <img src="/assets/chicken_fry.jpg" alt="Nalla Miriyala Kodi Vepudu" />
                </div>
                <div className="sig-details">
                  <h4>Nalla Miriyala Kodi Vepudu</h4>
                  <p>Tender chicken pieces tossed in freshly ground black pepper (nalla miriyalu) and traditional spices. Crispy and spicy.</p>
                  <span className="sig-price">₹379</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Table Reservation Form Section */}
      <section className="section-padding alt-bg">
        <div className="container">
          <div className="grid-2col align-center">
            
            {/* Left side: Reservation details */}
            <div>
              <span className="sub-title">Book A Table</span>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.4rem', color: 'var(--text-pure)', marginBottom: '15px' }}>
                Secure Your Fine Dining Table
              </h2>
              <p style={{ color: 'var(--text-muted)', marginBottom: '20px' }}>
                Skip the queue and secure the perfect corner for a family dinner or a quick lunch meeting. Select your preferred date, timings, and number of guests below.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', color: 'var(--text-muted)' }}>
                <p><i className="fa-solid fa-check" style={{ color: 'var(--gold-primary)', marginRight: '10px' }}></i> Dynamic catering customization available</p>
                <p><i className="fa-solid fa-check" style={{ color: 'var(--gold-primary)', marginRight: '10px' }}></i> Dedicated private lounge spaces</p>
                <p><i className="fa-solid fa-check" style={{ color: 'var(--gold-primary)', marginRight: '10px' }}></i> Fully air-conditioned comfort</p>
              </div>
            </div>

            {/* Right side: Form */}
            <form onSubmit={handleBookTable} className="contact-form">
              <div className="form-group">
                <label htmlFor="res-name">Your Name</label>
                <input 
                  type="text" 
                  id="res-name" 
                  placeholder="Enter full name" 
                  required
                  value={resName}
                  onChange={(e) => setResName(e.target.value)}
                />
              </div>

              <div className="form-grid">
                <div className="form-group">
                  <label htmlFor="res-phone">Phone Number</label>
                  <input 
                    type="tel" 
                    id="res-phone" 
                    placeholder="Enter phone number" 
                    required
                    value={resPhone}
                    onChange={(e) => setResPhone(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="res-guests">Number of Guests</label>
                  <select 
                    id="res-guests"
                    value={resGuests}
                    onChange={(e) => setResGuests(e.target.value)}
                  >
                    <option value="2">2 Guests</option>
                    <option value="4">4 Guests</option>
                    <option value="6">6 Guests</option>
                    <option value="8">8 Guests</option>
                    <option value="10+">10+ Guests</option>
                  </select>
                </div>
              </div>

              <div className="form-grid">
                <div className="form-group">
                  <label htmlFor="res-date">Date</label>
                  <input 
                    type="date" 
                    id="res-date" 
                    required
                    min={new Date().toISOString().split('T')[0]}
                    value={resDate}
                    onChange={(e) => setResDate(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="res-time">Timings</label>
                  <select 
                    id="res-time"
                    value={resTime}
                    onChange={(e) => setResTime(e.target.value)}
                  >
                    <option value="12:00">12:00 PM (Lunch)</option>
                    <option value="13:00">01:00 PM (Lunch)</option>
                    <option value="14:00">02:00 PM (Lunch)</option>
                    <option value="19:00">07:00 PM (Dinner)</option>
                    <option value="20:00">08:00 PM (Dinner)</option>
                    <option value="21:00">09:00 PM (Dinner)</option>
                    <option value="22:00">10:00 PM (Dinner)</option>
                  </select>
                </div>
              </div>

              <button type="submit" className="btn btn-gold btn-block" style={{ marginTop: '10px' }}>
                Reserve Table Now
              </button>
            </form>

          </div>
        </div>
      </section>

    </div>
  );
}
