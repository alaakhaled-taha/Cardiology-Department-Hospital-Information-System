import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Profile.css"; // your existing CSS

const Profile = () => {
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
          headers: { Authorization: `Bearer ${token}` },
        });
        setProfile(response.data);
      } catch (err) {
        setError(err.response?.data?.error || "Failed to load profile.");
        if (err.response?.status === 401) {
          localStorage.removeItem("token");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!profile) return <div>No profile data found.</div>;

  return (
    <div className="profile-wrapper">
      {/* Sidebar */}
      <div className="sidebar">
        <ul>
          <li className="active">Profile</li>
          <li>Dashboard</li>
          <li>Settings</li>
        </ul>
      </div>
  
      {/* Profile Main */}
      <div className="profile-main">
        <div className="profile-top">
          <div className="photo-section">
            <img
              src={profile.profile_picture_url || "/default-profile.png"}
              alt="Profile"
              className="profile-pic"
            />
            <h3>{profile.name}</h3>
            <button className="update-btn">Upload New Photo</button>
          </div>
        </div>
  
        <h1 className="profile-title">{profile.role === "patient" ? "Patient Profile" : "Doctor Profile"}</h1>
  
        {/* Profile Form */}
        <form className="profile-form">
          <h2> User Information</h2>
          <div className="profile-card">
  
            {/* Common Fields */}
            <div className="profile-field">
              <label>Full Name</label>
              <input type="text" value={profile.name} disabled />
            </div>
  
            <div className="profile-field">
              <label>Contact Info</label>
              <input type="text" value={profile.contact_info || ""} disabled />
            </div>
  
            <div className="profile-field">
              <label>Email</label>
              <input type="text" value={profile.email || ""} disabled />
            </div>
  
            <div className="profile-field">
              <label>Gender</label>
              <input type="text" value={profile.gender || "Not specified"} disabled />
            </div>
  
            {/* Patient or Doctor Extra Fields */}
            {profile.role === "patient" ? (
              <>
                <div className="profile-field">
                  <label>Date of Birth</label>
                  <input type="text" value={profile.date_of_birth || ""} disabled />
                </div>
                <div className="profile-field">
                  <label>Blood Group</label>
                  <input type="text" value={profile.blood_group || ""} disabled />
                </div>
                <div className="profile-field">
                  <label>Address</label>
                  <input type="text" value={profile.address || ""} disabled />
                </div>
                <div className="profile-field">
                  <label>Parent Name</label>
                  <input type="text" value={profile.parent_name || ""} disabled />
                </div>
                <div className="profile-field">
                  <label>Spouse Name</label>
                  <input type="text" value={profile.spouse_name || ""} disabled />
                </div>
                <div className="profile-field">
                  <label>Corporate Patient</label>
                  <input type="text" value={profile.is_corporate ? "Yes" : "No"} disabled />
                </div>
                <div className="profile-field">
                  <label>Has Insurance</label>
                  <input type="text" value={profile.has_insurance ? "Yes" : "No"} disabled />
                </div>
                <div className="profile-field">
                  <label>Smoker</label>
                  <input type="text" value={profile.is_smoker ? "Yes" : "No"} disabled />
                </div>
              </>
            ) : (
              <>
                <div className="profile-field">
                  <label>Specialty</label>
                  <input type="text" value={profile.specialty || ""} disabled />
                </div>
                <div className="profile-field">
                  <label>Salary per Session</label>
                  <input type="text" value={profile.salary_per_session || ""} disabled />
                </div>
                <div className="profile-field">
                  <label>Number of Appointments</label>
                  <input type="text" value={profile.no_of_appointments || ""} disabled />
                </div>
              </>
            )}
          </div>
        </form>
      </div>
    </div>
  );
  
};

export default Profile;
