import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useBooking } from "../context/BookingContext";

interface Doctor {
  id: string;
  name: string;
  specialization: string;
  profileImage: string;
  availability: "Available" | "Busy";
  nextAvailable: string;
}

const BookAppointmentPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [doctor, setDoctor] = useState<Doctor | null>(null);
  const [form, setForm] = useState({ patientName: "", email: "", datetime: "" });
  const [confirmed, setConfirmed] = useState(false);
  const { addBooking } = useBooking();

  useEffect(() => {
    fetch(`http://localhost:4000/api/doctors/${id}`)
      .then(res => res.json())
      .then(setDoctor)
      .catch(() => setDoctor(null));
  }, [id]);

  if (!doctor) return <div className="container text-center p-5">Doctor not found</div>;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.patientName || !form.email || !form.datetime) return;

    fetch("http://localhost:4000/api/appointments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        doctorId: doctor.id,
        ...form,
      }),
    });

    addBooking({ doctorId: doctor.id, ...form });
    setConfirmed(true);
    setTimeout(() => navigate("/"), 1500);
  };

  if (confirmed)
    return (
      <div className="container py-5 text-center">
        <div className="alert alert-success">
          <h4 className="mb-2">Appointment Confirmed!</h4>
          <p>Thank you, {form.patientName}. Confirmation sent to {form.email}</p>
        </div>
      </div>
    );

  return (
    <div className="container py-5">
      <div className="card shadow mx-auto" style={{maxWidth: 400}}>
        <div className="card-header bg-primary text-white fs-5">
          Book Appointment with {doctor.name}
        </div>
        <div className="card-body">
          <form className="vstack gap-3" onSubmit={handleSubmit}>
            <input
              name="patientName"
              className="form-control"
              placeholder="Your Name"
              value={form.patientName}
              onChange={handleChange}
              required
            />
            <input
              name="email"
              className="form-control"
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              required
            />
            <input
              name="datetime"
              className="form-control"
              type="datetime-local"
              value={form.datetime}
              onChange={handleChange}
              required
            />
            <button type="submit" className="btn btn-success w-100 mt-2">
              Book Appointment
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BookAppointmentPage;
