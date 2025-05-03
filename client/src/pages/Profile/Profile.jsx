import React, { useEffect, useState, useRef } from "react";
import { useForm } from "react-hook-form";
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
import { bloodTypes } from "../../enums/bloodTypes";

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [editedProfile, setEditedProfile] = useState({});
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const {
    register,
    formState: { errors },
  } = useForm();
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
      const formData = new FormData();

      // Append all fields except profile_photo
      Object.entries(editedProfile).forEach(([key, value]) => {
        if (key !== "profile_photo") {
          formData.append(key, value);
        }
      });

      // Append profile_photo file if present and is a File object
      if (editedProfile.profile_photo instanceof File) {
        formData.append("profile_photo", editedProfile.profile_photo);
      }

      await axios.put("http://localhost:5000/api/auth/update", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      // Refresh profile data
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

  const handleLogout = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/logout",
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log(response.data.message);

      localStorage.removeItem("token");
      navigate("/signin");
    } catch (error) {
      console.error("Logout error:", error.response?.data || error.message);
      setError(error.response?.data?.error || "Failed to log out.");
    }
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

      <div
        className="drawer"
        ref={drawerRef}
        style={{ right: menuOpen ? "0" : "-240px" }}
      >
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
          {editMode && (
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleChange("profile_photo", e.target.files[0])}
            />
          )}
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
                <div className="mb-3">
                  <label htmlFor="date_of_birth" className="form-label">
                    <FaBirthdayCake className="me-2" />
                    Date of Birth
                  </label>
                  {editMode ? (
                    <input
                      {...register("date_of_birth")}
                      type="date"
                      className="form-control"
                      id="date_of_birth"
                      defaultValue={editedProfile.date_of_birth || ""}
                      onChange={(e) => handleChange("date_of_birth", e.target.value)}
                    />
                  ) : (
                    <span>{profile.date_of_birth || "N/A"}</span>
                  )}
                  {errors.date_of_birth && (
                    <p className="text-danger">{errors.date_of_birth.message}</p>
                  )}
                </div>

                {/* Gender */}
                <div className="profile-field">
                  <label>
                    <FaVenusMars /> Gender
                  </label>
                  {editMode ? (
                    <select
                      id="gender"
                      className="form-control"
                      value={editedProfile.gender || ""}
                      onChange={(e) => handleChange("gender", e.target.value)}
                    >
                      <option value="" disabled>
                        Select Gender
                      </option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                    </select>
                  ) : (
                    <span>{profile.gender || "N/A"}</span>
                  )}
                </div>

                {/* Blood Group Field */}
                <div className="profile-field">
                  <label>
                    <FaSyringe /> Blood Group
                  </label>
                  {editMode ? (
                    <select
                      id="blood_group"
                      className="form-control"
                      value={editedProfile.blood_group || ""}
                      onChange={(e) => handleChange("blood_group", e.target.value)}
                    >
                      <option value="" disabled>
                        Select Blood Type
                      </option>
                      {bloodTypes.map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <span>{profile.blood_group || "N/A"}</span>
                  )}
                </div>

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
                <div className="profile-field">
                  <label>
                    <FaVenusMars /> Gender
                  </label>
                  {editMode ? (
                    <select
                      id="gender"
                      className="form-control"
                      value={editedProfile.gender || ""}
                      onChange={(e) => handleChange("gender", e.target.value)}
                    >
                      <option value="" disabled>
                        Select Gender
                      </option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                    </select>
                  ) : (
                    <span>{profile.gender || "N/A"}</span>
                  )}
                </div>
                {renderField("University Name", <FaBriefcaseMedical />, "university_name")}
                {renderField("Graduation Year", <FaBirthdayCake />, "graduation_year")}
                {renderField("Salary per Session", <FaMoneyBillWave />, "salary_per_session")}
              </>
            )}
          </div>
        </form>
      </div>

      <div className="edit-button-fixed">
        <button
          type="button"
          onClick={() => (editMode ? handleSave() : setEditMode(true))}
        >
          {editMode ? "Save Changes" : "Edit Profile"}
        </button>
      </div>
    </div>
  );
};

export default Profile;
