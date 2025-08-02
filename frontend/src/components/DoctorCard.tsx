import React from "react";
import { Link } from "react-router-dom";

interface Doctor {
  id: string;
  name: string;
  specialization: string;
  profileImage: string;
  availability: "Available" | "Busy";
  nextAvailable: string;
}

const DoctorCard: React.FC<{ doctor: Doctor }> = ({ doctor }) => (
  <div className="col mb-4">
    <div className="card h-100 text-center shadow">
      <img
        src={doctor.profileImage}
        alt={doctor.name}
        className="card-img-top mx-auto rounded-circle"
        style={{ width: 100, height: 100, objectFit: "cover", marginTop: 20 }}
      />
      <div className="card-body">
        <h5 className="card-title">{doctor.name}</h5>
        <p className="card-text">{doctor.specialization}</p>
        <span className={`badge ${doctor.availability === "Available" ? "bg-success" : "bg-danger"}`}>
          {doctor.availability === "Available" ? "Available Now" : `Next: ${new Date(doctor.nextAvailable).toLocaleString()}`}
        </span>
      </div>
      <div className="card-footer bg-transparent">
        <Link to={`/doctor/${doctor.id}`} className="btn btn-primary w-100">View Profile</Link>
      </div>
    </div>
  </div>
);

export default DoctorCard;
