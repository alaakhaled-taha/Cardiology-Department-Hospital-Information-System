import React from "react";
import { useForm } from "react-hook-form";
import { bloodTypes } from "../../enums/bloodTypes";

const PatientForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data); // Handle form submission (e.g., send to backend)
  };

  return (
    <div className="container my-5">
      <h2 className="text-center mb-4">Patient Medical History</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Blood Type */}
        <div className="mb-3">
          <label htmlFor="blood_type" className="form-label">
            Blood Type (فصيلة الدم)
          </label>
          <select
            id="blood_type"
            className={`form-control ${errors.blood_type ? "is-invalid" : ""}`}
            {...register("blood_type", { required: "This field is required" })}
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
          {errors.blood_type && (
            <div className="invalid-feedback text-danger">
              {errors.blood_type.message}
            </div>
          )}
        </div>

        {/* Pre-existing Conditions */}
        <div className="mb-3">
          <label htmlFor="pre_existing_conditions" className="form-label">
            Pre-existing Conditions
          </label>
          <textarea
            id="pre_existing_conditions"
            className={`form-control ${
              errors.pre_existing_conditions ? "is-invalid" : ""
            }`}
            {...register("pre_existing_conditions", {
              required: "This field is required",
              minLength: {
                value: 10,
                message:
                  "Pre-existing conditions must be at least 10 characters",
              },
            })}
            placeholder="Enter any pre-existing medical conditions (e.g., Diabetes, Hypertension)"
          />
          {errors.pre_existing_conditions && (
            <div className="invalid-feedback text-danger">
              {errors.pre_existing_conditions.message}
            </div>
          )}
        </div>

        {/* Past Surgeries */}
        <div className="mb-3">
          <label htmlFor="past_surgeries" className="form-label">
            Past Surgeries
          </label>
          <textarea
            id="past_surgeries"
            className={`form-control ${
              errors.past_surgeries ? "is-invalid" : ""
            }`}
            {...register("past_surgeries", {
              required: "This field is required",
              minLength: {
                value: 10,
                message:
                  "Past surgeries details must be at least 10 characters",
              },
            })}
            placeholder="List any surgeries you have had in the past (e.g., Appendectomy, Knee Surgery)"
          />
          {errors.past_surgeries && (
            <div className="invalid-feedback text-danger">
              {errors.past_surgeries.message}
            </div>
          )}
        </div>

        {/* Medications */}
        <div className="mb-3">
          <label htmlFor="medications" className="form-label">
            Current Medications
          </label>
          <textarea
            id="medications"
            className={`form-control ${errors.medications ? "is-invalid" : ""}`}
            {...register("medications", {
              required: "This field is required",
              minLength: {
                value: 10,
                message: "Medications details must be at least 10 characters",
              },
            })}
            placeholder="List any medications you are currently taking"
          />
          {errors.medications && (
            <div className="invalid-feedback text-danger">
              {errors.medications.message}
            </div>
          )}
        </div>

        {/* Family History */}
        <div className="mb-3">
          <label htmlFor="family_history" className="form-label">
            Family History
          </label>
          <textarea
            id="family_history"
            className={`form-control ${
              errors.family_history ? "is-invalid" : ""
            }`}
            {...register("family_history", {
              required: "This field is required",
              minLength: {
                value: 10,
                message:
                  "Family history details must be at least 10 characters",
              },
            })}
            placeholder="Any family medical history (e.g., Heart disease, Cancer)"
          />
          {errors.family_history && (
            <div className=" text-danger">{errors.family_history.message}</div>
          )}
        </div>
      </form>
    </div>
  );
};

export default PatientForm;
