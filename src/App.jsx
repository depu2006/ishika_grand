import React from 'react';
import { BrowserRouter, Routes, Route, ScrollRestoration } from 'react-router-dom';
import { BookingProvider } from './context/BookingContext';

import Header from './components/Header';
import Footer from './components/Footer';
import BookingModal from './components/BookingModal';
import EnquiryModal from './components/EnquiryModal';
import Toast from './components/Toast';

import Home from './pages/Home';
import About from './pages/About';
import Rooms from './pages/Rooms';
import Dining from './pages/Dining';
import Banquets from './pages/Banquets';
import Gallery from './pages/Gallery';
import Contact from './pages/Contact';

function ScrollToTop() {
  // Scroll to top on every route change
  React.useEffect(() => {
    window.scrollTo(0, 0);
  });
  return null;
}

function App() {
  return (
    <BrowserRouter>
      <BookingProvider>
        <ScrollToTop />
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/rooms" element={<Rooms />} />
            <Route path="/dining" element={<Dining />} />
            <Route path="/banquets" element={<Banquets />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
        <Footer />

        {/* Global Modals & Toast */}
        <BookingModal />
        <EnquiryModal />
        <Toast />
      </BookingProvider>
    </BrowserRouter>
  );
}

export default App;
