import React, { useEffect, useState, useRef } from "react";
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
  FaMoneyBillWave,
  FaBars,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [editedProfile, setEditedProfile] = useState({});
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const drawerRef = useRef(null);

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
        setEditedProfile(response.data);
        setEditedProfile(response.data);
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

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (drawerRef.current && !drawerRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };

    if (menuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [menuOpen]);

  const handleChange = (field, value) => {
    setEditedProfile((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.put("http://localhost:5000/api/auth/update", editedProfile, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const response = await axios.get("http://localhost:5000/api/auth/me", {
        headers: { Authorization: `Bearer ${token}` },
      });

      setProfile(response.data);
      setEditedProfile(response.data);
      setEditMode(false);
      setError("");
    } catch (err) {
      console.error("Update failed:", err.response?.data || err.message);
      setError(err.response?.data?.error || "Failed to update profile.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/signin");
  };

  const renderField = (label, icon, field, isBoolean = false) => (
    <div className="profile-field">
      <label>
        {icon} {label}
      </label>
      {editMode ? (
        <input
          type="text"
          value={editedProfile[field] ?? ""}
          onChange={(e) => handleChange(field, e.target.value)}
        />
      ) : (
        <span>
          {isBoolean ? (profile[field] ? "Yes" : "No") : profile[field] ?? "N/A"}
        </span>
      )}
    </div>
  );

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!profile) return <div>No profile data found.</div>;

  return (
    <div className="profile-wrapper">
      <div className="header">
        <h2>Profile</h2>
        <FaBars className="menu-icon" onClick={() => setMenuOpen(!menuOpen)} />
      </div>

      <div className="drawer" ref={drawerRef} style={{ right: menuOpen ? "0" : "-240px" }}>
  <ul>
    <li className="active">
      <FaUser style={{ marginRight: "8px" }} /> Profile
    </li>
    <li>
      <FaBriefcaseMedical style={{ marginRight: "8px" }} /> Dashboard
    </li>
    <li>
      <FaHeartbeat style={{ marginRight: "8px" }} /> Settings
    </li>
  </ul>
  <div style={{ textAlign: "center", marginTop: "2rem" }}>
    <button onClick={handleLogout} className="logout-button">
      Log Out
    </button>
  </div>
</div>


      <div className="profile-main">
        <div className="photo-section">
          <img
            src={
              profile.profile_photo
                ? `http://localhost:5000${profile.profile_photo}`
                : "/default-profile.png"
            }
            alt="Profile"
            className="profile-pic"
          />
          <h3 className="profile-name">{profile.name}</h3>
        </div>

        <h1 className="profile-title">
          {profile.role === "patient" ? "Patient Profile" : "Doctor Profile"}
        </h1>

        <form className="profile-form">
          <div className="profile-card">
            <h2>General Information</h2>
            {renderField("Full Name", <FaUser />, "name")}
            {renderField("Email", <FaEnvelope />, "email")}

            {profile.role === "patient" ? (
              <>
                <h2>Personal Details</h2>
                {renderField("Date of Birth", <FaBirthdayCake />, "date_of_birth")}
                {renderField("Gender", <FaVenusMars />, "gender")}
                {renderField("Blood Group", <FaSyringe />, "blood_group")}
                {renderField("Address", <FaMapMarkerAlt />, "address")}
                {renderField("Primary Mobile", <FaPhoneAlt />, "primary_mobile")}
                {renderField("Secondary Mobile", <FaPhoneAlt />, "secondary_mobile")}
                {renderField("Landline", <FaPhoneAlt />, "landline")}

                <h2>Family Details</h2>
                {renderField("Parent Name", <FaUserFriends />, "parent_name")}
                {renderField("Spouse Name", <FaUserFriends />, "spouse_name")}

                <h2>Other Details</h2>
                {renderField("Corporate Patient", <FaBriefcaseMedical />, "is_corporate_patient", true)}
                {renderField("Has Insurance", <FaHeartbeat />, "has_insurance", true)}
                {renderField("Smoker", <FaSmoking />, "is_smoker", true)}
              </>
            ) : (
              <>
                <h2>Professional Details</h2>
                {renderField("Specialty", <FaUserFriends />, "specialty")}
                {renderField("Gender", <FaVenusMars />, "gender")}
                {renderField("University Name", <FaBriefcaseMedical />, "university_name")}
                {renderField("Graduation Year", <FaBirthdayCake />, "graduation_year")}
                {renderField("Salary per Session", <FaMoneyBillWave />, "salary_per_session")}
              </>
            )}
          </div>
        </form>
      </div>

      <div className="edit-button-fixed">
        <button type="button" onClick={() => (editMode ? handleSave() : setEditMode(true))}>
          {editMode ? "Save Changes" : "Edit Profile"}
        </button>
      </div>

    </div>
  );
};

export default Profile;
