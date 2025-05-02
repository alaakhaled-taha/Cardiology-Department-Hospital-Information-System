import React, { useEffect, useState } from "react";
import "./CardiologyPage.css";
import Header from "../HomePage/Header";
import Footer from "../HomePage/Footer";
import { useNavigate } from "react-router-dom";

function CardiologyPage() {
  const [doctors, setDoctors] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:5000/api/auth/doctors/cardiology")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch doctors");
        }
        return res.json();
      })
      .then((data) => {
        setDoctors(data);
      })
      .catch((error) => {
        console.error("Failed to fetch doctors:", error);
      });
  }, []);

  const handleBookAppointment = (doctorId) => {
    const token = localStorage.getItem("token");
    alert("Please sign in to book an appointment.");
    navigate("/Signin");
  };

  return (
    <div>
      <Header />
      <div className="cardiology-page-container">
        <h2 className="cardiology-title">Meet Our Cardiology Doctors</h2>
        <div className="doctor-card-list">
  {doctors.map((doctor) => (
    <div key={doctor.doctor_id} className="doctor-card">
      <img
        src={`http://localhost:5000${doctor.profile_photo}`}
        alt={`${doctor.name}'s profile`}
        className="doctor-photo"
      />
      <h4>{doctor.name}</h4>
      <p><strong>Specialty:</strong> {doctor.specialty}</p>
      <p><strong>Email:</strong> {doctor.email}</p>
      <p><strong>Contact:</strong> {doctor.contact_info}</p>
      <button
        className="book-btn"
        onClick={() => handleBookAppointment(doctor.doctor_id)}
      >
        Book Appointment
      </button>
    </div>
  ))}
</div>

      </div>
      <Footer />
    </div>
  );
}

export default CardiologyPage;
