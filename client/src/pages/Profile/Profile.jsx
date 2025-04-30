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
      console.log("Token from localStorage:", token); // ✅ Log token
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
        console.log("Profile response:", response.data);
        setProfile(response.data);
      } catch (err) {
        console.error( err);
        setError("Failed to load profile. Please log in again.");
      } finally {
        setLoading(false);
      }
    };

   /* useEffect(() => {
      console.log("Fetching profile...");
      const token = localStorage.getItem("token");
      console.log("Token:", token); // Log token to verify it's stored
    
      const fetchProfile = async () => {
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
          console.log("Profile response:", response.data); // <--- Add this
          setProfile(response.data);
        } catch (err) {
          console.error("Error fetching profile:", err); // <--- Add this
          setError("Failed to load profile. Please log in again.");
        } finally {
          setLoading(false);
        }
      };*/

    fetchProfile();
  }, []);

  if (loading) return <p>Loading profile...</p>;
  if (error) return <p className="error">{error}</p>;
  if (!profile) return  <p>No profile data found.</p>;


  return (
    <div className="profile-container">
      <h2>Patient Profile</h2>
      <div className="profile-card">
        <div className="profile-field">
          <label><FaUser /> Name:</label>
          <span>{profile.name}</span>
        </div>
        <div className="profile-field">
          <label><FaEnvelope /> Email:</label>
          <span>{profile.email}</span>
        </div>
        <div className="profile-field">
          <label><FaBirthdayCake /> Date of Birth:</label>
          <span>{profile.date_of_birth}</span>
        </div>
        <div className="profile-field">
          <label><FaVenusMars /> Gender:</label>
          <span>{profile.gender}</span>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
