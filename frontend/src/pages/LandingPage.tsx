import React, { useEffect, useState } from "react";
import DoctorCard from "../components/DoctorCard";

interface Doctor {
  id: string;
  name: string;
  specialization: string;
  profileImage: string;
  availability: "Available" | "Busy";
  nextAvailable: string;
}

const LandingPage: React.FC = () => {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("http://localhost:4000/api/doctors")
      .then(res => res.json())
      .then(setDoctors)
      .catch(() => setDoctors([]));
  }, []);

  const filtered = doctors.filter(
    d =>
      d.name.toLowerCase().includes(search.toLowerCase()) ||
      d.specialization.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container py-4">
      <h1 className="text-center mb-4">Book a Healthcare Appointment</h1>

      <input
        type="text"
        className="form-control mb-4 mx-auto w-100 w-md-50"
        style={{maxWidth: 400}}
        placeholder="Search by name or specialization"
        value={search}
        onChange={e => setSearch(e.target.value)}
      />

      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
        {filtered.map(doc => (
          <DoctorCard doctor={doc} key={doc.id} />
        ))}
      </div>
    </div>
  );
};

export default LandingPage;
