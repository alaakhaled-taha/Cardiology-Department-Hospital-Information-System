// DoctorForm.js
import React from 'react';

const DoctorForm = ({ register, errors }) => {
  return (
    <>
      {/* Education Section */}
      <div className="container my-5">
      <h2 className="text-center mb-4">Qualification</h2>
      <div className="mb-3">

        {/* Medical University Name */}
        <div className="mb-3">
          <label htmlFor="university_name" className="form-label">
            Medical University Name
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

        {/* Year of Graduation */}
        <div className="mb-3">
          <label htmlFor="graduation_year" className="form-label">
            Year of Graduation
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

        {/* Salary per Session */}
        <div className="mb-3">
          <label htmlFor="salary_per_session" className="form-label">
            Salary per Session
          </label>
          <input
            {...register("salary_per_session", {
              required: "Salary per session is required",
              pattern: /^\d+(\.\d{1,2})?$/, // Matches decimal numbers (e.g. 100.50)
            })}
            type="number"
            className="form-control"
            id="salary_per_session"
          />
          {errors.salary_per_session && (
            <p className="text-danger">{errors.salary_per_session.message}</p>
          )}
        </div>
        </div>
        </div>
    </>
  );
};

export default DoctorForm;
