import React from "react";

const CommonForm = ({ register, errors, getValues }) => {
  return (
    <div className="container mt-4 mb-3 ">
      {/* <h2 className="text-center mb-4"></h2> */}
      <div className="mb-3">
        <label htmlFor="first_name" className="form-label">
          First Name
        </label>
        <input
          {...register("first_name", {
            required: "First name is required",
            minLength: {
              value: 2,
              message: "First name must be at least 2 characters long.",
            },
          })}
          type="text"
          className="form-control"
          id="first_name"
        />
        {errors.first_name && (
          <p className="text-danger">{errors.first_name.message}</p>
        )}
      </div>

      <div className="mb-3">
        <label htmlFor="last_name" className="form-label">
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
          Email
        </label>
        <input
          {...register("email", {
            required: "Email is required",
            pattern: /^[a-zA-Z0-9._-]+@gmail\.com$/,
            message: "Please enter a valid Gmail address.",
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
          Password
        </label>
        <input
          {...register("password", {
            required: "Password is required",
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
        <label htmlFor="phone_number" className="form-label">
          Phone Number
        </label>
        <input
          {...register("primary_mobile", {
            required: "Phone number is required",
          })}
          type="tel"
          className="form-control"
          id="phone_number"
        />
        {errors.phone_number && (
          <p className="text-danger">{errors.phone_number.message}</p>
        )}
      </div>

      <div className="mb-3">
        <label htmlFor="secondary_phone_number" className="form-label">
          Secondary Phone Number
        </label>
        <input
          {...register("secondary_mobile")}
          type="tel"
          className="form-control"
          id="secondary_phone_number"
        />
      </div>

      <div className="mb-3">
        <label htmlFor="landline" className="form-label">
          Landline
        </label>
        <input
          {...register("landline")}
          type="tel"
          className="form-control"
          id="landline"
        />
      </div>

      <div className="mb-3">
        <label htmlFor="date_of_birth" className="form-label">
          Date of Birth
        </label>
        <input
          {...register("date_of_birth", {
            required: "Date of birth is required",
          })}
          type="date"
          className="form-control"
          id="date_of_birth"
        />
        {errors.date_of_birth && (
          <p className="text-danger">{errors.date_of_birth.message}</p>
        )}
      </div>

      <div className="mb-3">
        <label htmlFor="gender" className="form-label">
          Gender
        </label>
        <select
          {...register("gender", { required: "Gender is required" })}
          className="form-select"
          id="gender"
        >
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
        {errors.gender && (
          <p className="text-danger">{errors.gender.message}</p>
        )}
      </div>

      {/* Image Upload */}
      <div className="mb-3">
        <label htmlFor="profile_photo" className="form-label">
          Upload Image
        </label>
        <input
          {...register("profile_photo", {
            required: "Image upload is required",
          })}
          type="file"
          className="form-control"
          id="profile_photo"
          accept="image/*"
        />
        {errors.image && <p className="text-danger">{errors.image.message}</p>}
      </div>
    </div>
  );
};

export default CommonForm;
