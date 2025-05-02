import React from "react";
import {
  FaUser,
  FaUserAlt,
  FaEnvelope,
  FaLock,
  FaPhone,
  FaPhoneAlt,
  FaLandmark,
  FaBirthdayCake,
  FaVenusMars,
  FaUpload,
} from "react-icons/fa";

const CommonForm = ({ register, errors, getValues }) => {
  return (
    <div className="container mt-4 mb-3">
      <div className="mb-3">
        <label htmlFor="name" className="form-label">
          <FaUser className="me-2" />
          First Name
        </label>
        <input
          {...register("name", {
            required: "First name is required",
            minLength: {
              value: 2,
              message: "First name must be at least 2 characters long.",
            },
          })}
          type="text"
          className="form-control"
          id="name"
        />
        {errors.name && <p className="text-danger">{errors.name.message}</p>}
      </div>

      <div className="mb-3">
        <label htmlFor="last_name" className="form-label">
          <FaUserAlt className="me-2" />
          Last Name
        </label>
        <input
          {...register("last_name", {
            required: "Last name is required",
            minLength: {
              value: 2,
              message: "Last name must be at least 2 characters long.",
            },
          })}
          type="text"
          className="form-control"
          id="last_name"
        />
        {errors.last_name && (
          <p className="text-danger">{errors.last_name.message}</p>
        )}
      </div>

      <div className="mb-3">
        <label htmlFor="email" className="form-label">
          <FaEnvelope className="me-2" />
          Email
        </label>
        <input
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[a-zA-Z0-9._-]+@gmail\.com$/,
              message: "Please enter a valid Gmail address.",
            },
          })}
          type="email"
          className="form-control"
          id="email"
          placeholder="your@email.com"
        />
        {errors.email && <p className="text-danger">{errors.email.message}</p>}
      </div>

      <div className="mb-3">
        <label htmlFor="password" className="form-label">
          <FaLock className="me-2" />
          Password
        </label>
        <input
          {...register("password", {
            required: "Password is required",
            //   minLength: {
            //     value: 8,
            //     message: "Password must be at least 8 characters",
            //   },
            //   pattern: {
            //     value:
            //       /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
            //     message:
            //       "Password must contain at least one uppercase, one lowercase, one number and one special character",
            //   },
          })}
          type="password"
          className="form-control"
          id="password"
          placeholder="•••••••••••"
        />
        {errors.password && (
          <p className="text-danger">{errors.password.message}</p>
        )}
      </div>

      <div className="mb-3">
        <label htmlFor="confirmPassword" className="form-label">
          <FaLock className="me-2" />
          Confirm Password
        </label>
        <input
          {...register("confirmPassword", {
            required: "Please confirm your password",
            validate: (value) =>
              value === getValues().password || "Passwords do not match",
          })}
          type="password"
          className="form-control"
          id="confirmPassword"
          placeholder="•••••••••••••"
        />
        {errors.confirmPassword && (
          <p className="text-danger">{errors.confirmPassword.message}</p>
        )}
      </div>

      <div className="mb-3">
        <label htmlFor="primary_mobile" className="form-label">
          <FaPhone className="me-2" />
          Phone Number
        </label>
        <input
          {...register("primary_mobile", {
            required: "Phone number is required",
            pattern: {
              value: /^[0-9]{10,15}$/,
              message: "Please enter a valid phone number",
            },
          })}
          type="tel"
          className="form-control"
          id="primary_mobile"
        />
        {errors.primary_mobile && (
          <p className="text-danger">{errors.primary_mobile.message}</p>
        )}
      </div>

      <div className="mb-3">
        <label htmlFor="secondary_mobile" className="form-label">
          <FaPhoneAlt className="me-2" />
          Secondary Phone Number
        </label>
        <input
          {...register("secondary_mobile", {
            pattern: {
              value: /^[0-9]{10,15}$/,
              message: "Please enter a valid phone number",
            },
          })}
          type="tel"
          className="form-control"
          id="secondary_mobile"
        />
      </div>

      <div className="mb-3">
        <label htmlFor="landline" className="form-label">
          <FaLandmark className="me-2" />
          Landline
        </label>
        <input
          {...register("landline", {
            pattern: {
              value: /^[0-9]{10,15}$/,
              message: "Please enter a valid phone number",
            },
          })}
          type="tel"
          className="form-control"
          id="landline"
        />
      </div>

      <div className="mb-3">
        <label htmlFor="gender" className="form-label">
          <FaVenusMars className="me-2" />
          Gender
        </label>
        <select
          {...register("gender", { required: "Gender is required" })}
          className="form-select"
          id="gender"
          defaultValue=""
        >
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
        {errors.gender && (
          <p className="text-danger">{errors.gender.message}</p>
        )}
      </div>

      <div className="mb-3">
        <label htmlFor="profile_photo" className="form-label">
          <FaUpload className="me-2" />
          Upload Image
        </label>
        <input
          {...register("profile_photo", {
            required: "Image upload is required",
            // validate: {
            //   lessThan5MB: (files) =>
            //     files[0]?.size < 5000000 || "Maximum file size is 5MB",
            //   acceptedFormats: (files) =>
            //     ["image/jpeg", "image/png", "image/gif"].includes(
            //       files[0]?.type
            //     ) || "Only JPEG, PNG, and GIF images are allowed",
            // },
          })}
          type="file"
          className="form-control"
          id="profile_photo"
          accept="image/*"
        />
        {errors.profile_photo && (
          <p className="text-danger">{errors.profile_photo.message}</p>
        )}
      </div>
    </div>
  );
};

export default CommonForm;