import React from "react";
import {
  FaUser,
  FaHeartbeat,
  FaStethoscope,
  FaMedkit,
  FaBirthdayCake,
} from "react-icons/fa"; // Importing from react-icons

import { bloodTypes } from "../../enums/bloodTypes";

const PatientForm = ({ register, errors }) => {
  return (
    <div className="container my-5">
      <h2 className="text-center mb-4">Patient Medical History</h2>

      <div className="section-header mb-4">
        <h4>
          <FaUser className="me-2" /> Personal Information
        </h4>
      </div>

      <div className="mb-3">
        <label htmlFor="parent_name" className="form-label">
          <FaUser className="me-2" />
          Parent Name
        </label>
        <input
          type="text"
          id="parent_name"
          className={`form-control ${errors.parent_name ? "is-invalid" : ""}`}
          {...register("parent_name", {
            required: "Parent name is required",
            maxLength: {
              value: 100,
              message: "Parent name cannot exceed 100 characters",
            },
          })}
          placeholder="Enter parent's name"
        />
        {errors.parent_name && (
          <div className="invalid-feedback text-danger">
            {errors.parent_name.message}
          </div>
        )}
      </div>

      <div className="mb-3">
        <label htmlFor="spouse_name" className="form-label">
          <FaUser className="me-2" />
          Spouse Name
        </label>
        <input
          type="text"
          id="spouse_name"
          className={`form-control ${errors.spouse_name ? "is-invalid" : ""}`}
          {...register("spouse_name", {
            maxLength: {
              value: 100,
              message: "Spouse name cannot exceed 100 characters",
            },
          })}
          placeholder="Enter spouse's name"
        />
        {errors.spouse_name && (
          <div className="invalid-feedback text-danger">
            {errors.spouse_name.message}
          </div>
        )}
      </div>
      <div className="mb-3">
        <label htmlFor="referred_by" className="form-label">
          Who referred you?
        </label>
        <input
          {...register("referred_by", {
            required: "Referred by is required",
          })}
          type="text"
          className="form-control"
          id="referred_by"
          placeholder="Enter who referred you"
        />
        {errors.referred_by && (
          <p className="text-danger">{errors.referred_by.message}</p>
        )}
      </div>

      <div className="mb-3">
        <label htmlFor="address" className="form-label">
          <FaUser className="me-2" />
          Address
        </label>
        <input
          type="text"
          id="address"
          className={`form-control ${errors.address ? "is-invalid" : ""}`}
          {...register("address", {
            required: "Address is required",
            maxLength: {
              value: 200,
              message: "Address cannot exceed 200 characters",
            },
          })}
          placeholder="Enter your address"
        />
        {errors.address && (
          <div className="invalid-feedback text-danger">
            {errors.address.message}
          </div>
        )}
      </div>

      <div className="mb-3">
        <label htmlFor="date_of_birth" className="form-label">
          <FaBirthdayCake className="me-2" />
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

      <div className="section-header mb-4">
        <h4>
          <FaHeartbeat className="me-2" /> Health Information
        </h4>
      </div>

      <div className="mb-3">
        <label htmlFor="blood_group" className="form-label">
          <FaHeartbeat className="me-2" />
          Blood Type
        </label>
        <select
          id="blood_group"
          className={`form-control ${errors.blood_group ? "is-invalid" : ""}`}
          {...register("blood_group", { required: "This field is required" })}
        >
          <option value="" disabled selected>
            Select Blood Type
          </option>
          {bloodTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
        {errors.blood_group && (
          <div className="invalid-feedback text-danger">
            {errors.blood_group.message}
          </div>
        )}
      </div>

      <div className="mb-3">
        <label htmlFor="is_smoker" className="form-label">
          <FaStethoscope className="me-2" />
          Is the Patient a Smoker?
        </label>
        <select
          id="is_smoker"
          className={`form-control ${errors.is_smoker ? "is-invalid" : ""}`}
          {...register("is_smoker", { required: "This field is required" })}
        >
          <option value="" disabled selected>
            Select Option
          </option>
          <option value="true">Yes</option>
          <option value="false">No</option>
        </select>
        {errors.is_smoker && (
          <div className="invalid-feedback text-danger">
            {errors.is_smoker.message}
          </div>
        )}
      </div>

      <div className="section-header mb-4">
        <h4>
          <FaMedkit className="me-2" /> Insurance & Corporate Details
        </h4>
      </div>

      <div className="mb-3">
        <label htmlFor="is_corporate_patient" className="form-label">
          <FaMedkit className="me-2" />
          Is Corporate Patient?
        </label>
        <select
          id="is_corporate_patient"
          className={`form-control ${
            errors.is_corporate_patient ? "is-invalid" : ""
          }`}
          {...register("is_corporate_patient", {
            required: "This field is required",
          })}
        >
          <option value="" disabled selected>
            Select Option
          </option>
          <option value="true">Yes</option>
          <option value="false">No</option>
        </select>
        {errors.is_corporate_patient && (
          <div className="invalid-feedback text-danger">
            {errors.is_corporate_patient.message}
          </div>
        )}
      </div>

      <div className="mb-3">
        <label htmlFor="has_insurance" className="form-label">
          <FaMedkit className="me-2" />
          Does the Patient have Insurance?
        </label>
        <select
          id="has_insurance"
          className={`form-control ${errors.has_insurance ? "is-invalid" : ""}`}
          {...register("has_insurance", { required: "This field is required" })}
        >
          <option value="" disabled selected>
            Select Option
          </option>
          <option value="true">Yes</option>
          <option value="false">No</option>
        </select>
        {errors.has_insurance && (
          <div className="invalid-feedback text-danger">
            {errors.has_insurance.message}
          </div>
        )}
      </div>
    </div>
  );
};

export default PatientForm;
