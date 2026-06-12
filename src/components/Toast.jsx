import React from 'react';
import { useBooking } from '../context/BookingContext';

export default function Toast() {
  const { toasts } = useBooking();

  if (toasts.length === 0) return null;

  return (
    <div className="toast-container">
      {toasts.map((toast) => (
        <div key={toast.id} className="toast">
          <i className="fa-solid fa-circle-check"></i>
          <span>{toast.message}</span>
        </div>
      ))}
    </div>
  );
}
