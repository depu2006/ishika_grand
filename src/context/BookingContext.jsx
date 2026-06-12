import React, { createContext, useState, useContext } from 'react';

const BookingContext = createContext();

export const BookingProvider = ({ children }) => {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isEnquiryOpen, setIsEnquiryOpen] = useState(false);
  const [selectedRoomType, setSelectedRoomType] = useState('deluxe');
  const [selectedHallType, setSelectedHallType] = useState('grand');
  const [checkInDate, setCheckInDate] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');
  const [toasts, setToasts] = useState([]);

  const openBooking = (roomType = 'deluxe', checkIn = '', checkOut = '') => {
    setSelectedRoomType(roomType);
    if (checkIn) setCheckInDate(checkIn);
    if (checkOut) setCheckOutDate(checkOut);
    setIsBookingOpen(true);
  };

  const closeBooking = () => setIsBookingOpen(false);

  const openEnquiry = (hallType = 'grand') => {
    setSelectedHallType(hallType);
    setIsEnquiryOpen(true);
  };

  const closeEnquiry = () => setIsEnquiryOpen(false);

  const addToast = (message) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  return (
    <BookingContext.Provider
      value={{
        isBookingOpen,
        isEnquiryOpen,
        selectedRoomType,
        selectedHallType,
        checkInDate,
        checkOutDate,
        toasts,
        openBooking,
        closeBooking,
        openEnquiry,
        closeEnquiry,
        addToast,
        setCheckInDate,
        setCheckOutDate,
        setSelectedRoomType,
        setSelectedHallType,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};

export const useBooking = () => useContext(BookingContext);
