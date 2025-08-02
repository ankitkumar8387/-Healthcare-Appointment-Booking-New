import React, { createContext, useContext, useState, ReactNode } from "react";

interface Booking {
  doctorId: string;
  patientName: string;
  email: string;
  datetime: string;
}

interface BookingContextType {
  bookings: Booking[];
  addBooking: (booking: Booking) => void;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export const BookingProvider: React.FC<{children: ReactNode}> = ({ children }) => {
  const [bookings, setBookings] = useState<Booking[]>([]);

  const addBooking = (booking: Booking) => setBookings(prev => [...prev, booking]);

  return (
    <BookingContext.Provider value={{ bookings, addBooking }}>
      {children}
    </BookingContext.Provider>
  );
};

export const useBooking = () => {
  const ctx = useContext(BookingContext);
  if (!ctx) throw new Error("useBooking must be used within BookingProvider");
  return ctx;
};
