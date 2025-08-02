import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { BookingProvider } from "./context/BookingContext";
import LandingPage from "./pages/LandingPage";
import DoctorProfilePage from "./pages/DoctorProfilePage";
import BookAppointmentPage from "./pages/BookAppointmentPage";

function App() {
  return (
    <BookingProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/doctor/:id" element={<DoctorProfilePage />} />
          <Route path="/doctor/:id/book" element={<BookAppointmentPage />} />
        </Routes>
      </BrowserRouter>
    </BookingProvider>
  );
}
export default App;
