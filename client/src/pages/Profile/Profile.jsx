import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Profile.css";
import { FaUser, FaEnvelope, FaBirthdayCake, FaVenusMars } from "react-icons/fa";

const ProfilePage = () => {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setError("No token found. Please log in.");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get("http://localhost:5000/api/auth/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // Log the profile data for inspection (remove after debugging)
        console.log(response.data);
        setProfile(response.data);
      } catch (err) {
        console.error("Profile error:", err); // Enhanced error logging

        const errorMessage = err.response?.data?.error || err.message || "Failed to load profile. Please try again.";
        setError(errorMessage);

        // If token is invalid, clear it
        if (err.response?.status === 401) {
          localStorage.removeItem("token");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) {
    return (
      <div className="profile-container">
        <p>Loading profile...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="profile-container">
        <p className="error">{error}</p>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="profile-container">
        <p>No profile data found.</p>
      </div>
    );
  }

  return (
    <div className="profile-container">
      <h2>{profile.role === "doctor" ? "Doctor" : "Patient"} Profile</h2>
      <div className="profile-card">
        <div className="profile-field">
          <label><FaUser /> Name:</label>
          <span>{profile.name}</span>
        </div>
        <div className="profile-field">
          <label><FaEnvelope /> Email:</label>
          <span>{profile.email}</span>
        </div>

        {profile.role === "patient" ? (
          <>
            <div className="profile-field">
              <label><FaBirthdayCake /> Date of Birth:</label>
              <span>{profile.date_of_birth || "Not specified"}</span>
            </div>
            <div className="profile-field">
              <label><FaVenusMars /> Gender:</label>
              <span>{profile.gender || "Not specified"}</span>
            </div>
          </>
        ) : (
          <>
            <div className="profile-field">
              <label>Specialty:</label>
              <span>{profile.specialty || "Not specified"}</span>
            </div>
            <div className="profile-field">
              <label>Contact Info:</label>
              <span>{profile.contact_info || "Not specified"}</span>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
