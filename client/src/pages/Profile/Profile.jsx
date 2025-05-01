import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Profile.css";
import {
  FaUser,
  FaEnvelope,
  FaBirthdayCake,
  FaVenusMars,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaUserFriends,
  FaSmoking,
  FaBriefcaseMedical,
  FaHeartbeat,
  FaSyringe,
  FaMoneyBillWave
} from "react-icons/fa";

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
          <li className="active"><FaUser style={{ marginRight: "8px" }} /> Profile</li>
          <li><FaBriefcaseMedical style={{ marginRight: "8px" }} /> Dashboard</li>
          <li><FaHeartbeat style={{ marginRight: "8px" }} /> Settings</li>
        </ul>
      </div>

      {/* Profile Main */}
      <div className="profile-main">
        <div className="profile-top">
          <div className="photo-section">
            <img
              src={profile.profile_photo ? `http://localhost:5000${profile.profile_photo}` : "/default-profile.png"}
              alt="Profile"
              className="profile-pic"
            />
            <h3 className="profile-name">{profile.name}</h3>
          </div>
        </div>
        <h1 className="profile-title">{profile.role === "patient" ? "Patient Profile" : "Doctor Profile"}</h1>

        {/* Profile Form */}
        <form className="profile-form">
          <div className="profile-card">

            {/* Common Fields */}
            <h2>General Information</h2>

            <div className="profile-field">
              <label><FaUser style={{ marginRight: "8px" }} /> Full Name</label>
              <input type="text" value={profile.name || ""} disabled />
            </div>

            <div className="profile-field">
              <label><FaEnvelope style={{ marginRight: "8px" }} /> Email</label>
              <input type="text" value={profile.email || ""} disabled />
            </div>

            {/* Role Specific Fields */}
            {profile.role === "patient" ? (
              <>
                <h2>Personal Details</h2>

                <div className="profile-field">
                  <label><FaBirthdayCake style={{ marginRight: "8px" }} /> Date of Birth</label>
                  <input type="text" value={profile.date_of_birth || ""} disabled />
                </div>

                <div className="profile-field">
                  <label><FaVenusMars style={{ marginRight: "8px" }} /> Gender</label>
                  <input type="text" value={profile.gender || "Not specified"} disabled />
                </div>

                <div className="profile-field">
                  <label><FaSyringe style={{ marginRight: "8px" }} /> Blood Group</label>
                  <input type="text" value={profile.blood_type || ""} disabled />
                </div>

                <div className="profile-field">
                  <label><FaMapMarkerAlt style={{ marginRight: "8px" }} /> Address</label>
                  <input type="text" value={profile.address || ""} disabled />
                </div>

                <div className="profile-field">
                  <label><FaPhoneAlt style={{ marginRight: "8px" }} /> Primary Mobile</label>
                  <input type="text" value={profile.primary_mobile || ""} disabled />
                </div>

                <div className="profile-field">
                  <label><FaPhoneAlt style={{ marginRight: "8px" }} /> Secondary Mobile</label>
                  <input type="text" value={profile.secondary_mobile || ""} disabled />
                </div>

                <div className="profile-field">
                  <label><FaPhoneAlt style={{ marginRight: "8px" }} /> Landline</label>
                  <input type="text" value={profile.landline || ""} disabled />
                </div>

                <h2>Family Details</h2>

                <div className="profile-field">
                  <label><FaUserFriends style={{ marginRight: "8px" }} /> Parent Name</label>
                  <input type="text" value={profile.parent_name || ""} disabled />
                </div>

                <div className="profile-field">
                  <label><FaUserFriends style={{ marginRight: "8px" }} /> Spouse Name</label>
                  <input type="text" value={profile.spouse_name || ""} disabled />
                </div>

                <h2>Other Details</h2>

                <div className="profile-field">
                  <label><FaBriefcaseMedical style={{ marginRight: "8px" }} /> Corporate Patient</label>
                  <input type="text" value={profile.is_corporate_patient ? "Yes" : "No"} disabled />
                </div>

                <div className="profile-field">
                  <label><FaHeartbeat style={{ marginRight: "8px" }} /> Has Insurance</label>
                  <input type="text" value={profile.has_insurance ? "Yes" : "No"} disabled />
                </div>

                <div className="profile-field">
                  <label><FaSmoking style={{ marginRight: "8px" }} /> Smoker</label>
                  <input type="text" value={profile.is_smoker ? "Yes" : "No"} disabled />
                </div>
              </>
            ) : (
              <>
                <h2>Professional Details</h2>

                <div className="profile-field">
                  <label><FaUserFriends style={{ marginRight: "8px" }} /> Specialty</label>
                  <input type="text" value={profile.specialty || "Cardiology"} disabled />
                </div>

                <div className="profile-field">
                  <label><FaMoneyBillWave style={{ marginRight: "8px" }} /> Salary per Session</label>
                  <input type="text" value={profile.salary_per_session || localStorage.getItem("salary_per_session") || ""} disabled />
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
