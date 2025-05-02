import React from "react";
import {specialties } from "../../enums/specialties"
import { FaUniversity, FaCalendarAlt, FaDollarSign ,FaStethoscope} from "react-icons/fa";

const DoctorForm = ({ register, errors }) => {
  return (
    <>
      <div className="container my-5">
        <h2 className="text-center mb-4">Qualification</h2>
        <div className="mb-3">
          <label htmlFor="specialty" className="form-label">
            <FaStethoscope className="me-2" />
            Specialty
          </label>
          <select
            id="specialty"
            className={`form-control ${errors.specialty ? "is-invalid" : ""}`}
            {...register("specialty", { required: "This field is required" })}
          >
            <option value="" disabled selected>
              Select Specialty
            </option>
            {specialties.map((spec) => (
              <option key={spec} value={spec}>
                {spec}
              </option>
            ))}
          </select>
          {errors.specialty && (
            <div className="invalid-feedback text-danger">
              {errors.specialty.message}
            </div>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="university_name" className="form-label">
            <FaUniversity className="me-2" /> Medical University Name
          </label>
          <input
            {...register("university_name", {
              required: "Medical University Name is required",
            })}
            type="text"
            className="form-control"
            id="university_name"
          />
          {errors.university_name && (
            <p className="text-danger">{errors.university_name.message}</p>
          )}
        </div>

        <div className="mb-3">
          <label htmlFor="graduation_year" className="form-label">
            <FaCalendarAlt className="me-2" /> Year of Graduation
          </label>
          <input
            {...register("graduation_year", {
              required: "Year of graduation is required",
            })}
            type="number"
            className="form-control"
            id="graduation_year"
            min="1900"
            max={new Date().getFullYear()}
            placeholder="Enter your year of graduation"
          />
          {errors.graduation_year && (
            <p className="text-danger">{errors.graduation_year.message}</p>
          )}
        </div>

        <div className="mb-3">
          <label htmlFor="salary_per_session" className="form-label">
            <FaDollarSign className="me-2" /> Salary per Session
          </label>
          <input
            {...register("salary_per_session", {
              required: "Salary per session is required",
              pattern: /^\d+(\.\d{1,2})?$/, // Matches decimal numbers (e.g. 100.50)
              validate: (value) =>
                parseFloat(value) >= 0 || "Value must be non-negative",
            })}
            min="0"
            step="200"
            type="number"
            className="form-control"
            id="salary_per_session"
          />
          {errors.salary_per_session && (
            <p className="text-danger">{errors.salary_per_session.message}</p>
          )}
        </div>
      </div>
    </>
  );
};

export default DoctorForm;
