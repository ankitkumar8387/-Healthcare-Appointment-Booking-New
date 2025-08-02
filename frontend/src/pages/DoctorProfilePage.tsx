import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

interface Doctor {
  id: string;
  name: string;
  specialization: string;
  profileImage: string;
  availability: "Available" | "Busy";
  nextAvailable: string;
}

const DoctorProfilePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [doctor, setDoctor] = useState<Doctor | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:4000/api/doctors/${id}`)
      .then(res => res.json())
      .then(setDoctor)
      .catch(() => setDoctor(null));
  }, [id]);

  if (!doctor) return <div className="container text-center p-5">Doctor not found</div>;

  return (
    <div className="container py-5">
      <div className="card mx-auto p-4 shadow" style={{maxWidth: 400}}>
        <img
          src={doctor.profileImage}
          alt={doctor.name}
          className="rounded-circle shadow mx-auto mt-3"
          style={{ width: 120, height: 120, objectFit: "cover" }}
        />
        <div className="card-body text-center">
          <h3 className="card-title">{doctor.name}</h3>
          <p className="text-muted">{doctor.specialization}</p>
          {doctor.availability === "Available"
            ? <span className="badge bg-success mb-2">Available Now</span>
            : <span className="badge bg-danger mb-2">Next: {new Date(doctor.nextAvailable).toLocaleString()}</span>
          }
          <button
            className="btn btn-primary w-100 mt-4"
            onClick={() => navigate(`/doctor/${doctor.id}/book`)}
          >
            Book Appointment
          </button>
        </div>
      </div>
    </div>
  );
};

export default DoctorProfilePage;
