

import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import DoctorForm from "./DoctorForm";
import PatientForm from "./PatientForm";
import CommonForm from "./CommonForm";
import { userTypes } from "../../enums/useType";
import { Link } from "react-router-dom";

import "./Signup.css";

const SignupForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
    reset,
    setError,
    watch,
  } = useForm({
    mode: "onBlur", // Validate on blur for better UX
  });

  const [userType, setUserType] = React.useState("");
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const navigate = useNavigate(); // Initialize the navigate function

  const handleRoleChange = (userType) => {
    setUserType(userType);
    // Reset specialty if switching roles
    setValue("specialty", "");
    reset();
  };

  const onSubmit = async (data) => {
    const formData = { ...data, userType };
    setIsSubmitting(true);

    let apiUrl;
    if (userType === userTypes.doctor) {
      apiUrl = "http://localhost:5000/api/auth/register/doctor"; // URL for Doctor
    } else if (userType === userTypes.patient) {
      apiUrl = "http://localhost:5000/api/auth/register/patient"; // URL for Patient
    }

    try {
      const res = await axios.post(apiUrl, formData);
      console.log(res);
      alert("Account created successfully!");
      navigate("/profile");
    } catch (err) {
      console.error(err);
      setError("root.server", {
        type: "manual",
        message: err.response?.data?.message || "Something went wrong",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container-fluid mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-9 col-xl-7">
          <div className="card shadow-lg p-5 rounded">
            {/* Updated color for Create Account */}
            <h2 className="text-center mb-4">Create Account</h2>

            <div
              className="card-body"
              style={{ width: "100%", maxWidth: "100%" }}
            >
              <div className="form-section first-section d-flex justify-content-between align-items-center mb-1">
                <div>
                  <h6>Let's start with</h6>
                  <h1 className="p-1">{userType && ` The ${userType}`}</h1>
                </div>

                {/* Role buttons */}
                <div>
                  <div className="d-flex align-items-center">
                    <div className="vr mx-1"></div>
                    <div className="role-buttons d-flex">
                      <button
                        className={`btn ${
                          userType === userTypes.doctor
                            ? "btn-info"
                            : "btn-secondary"
                        } mx-2`}
                        onClick={() => handleRoleChange(userTypes.doctor)}
                      >
                        Sign up as Doctor
                      </button>
                      <button
                        className={`btn ${
                          userType === userTypes.patient
                            ? "btn-info"
                            : "btn-secondary"
                        } mx-2`}
                        onClick={() => handleRoleChange(userTypes.patient)}
                      >
                        Sign up as Patient
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <form onSubmit={handleSubmit(onSubmit)}>
                <CommonForm
                  register={register}
                  errors={errors}
                  getValues={getValues}
                  watch={watch}
                />
                {userType === userTypes.doctor && (
                  <DoctorForm register={register} errors={errors} />
                )}
                {userType === userTypes.patient && (
                  <PatientForm register={register} errors={errors} />
                )}

                {/* Display validation errors */}
                {errors.root && (
                  <div className="alert alert-danger mb-3">
                    {errors.root.message}
                  </div>
                )}

                {/* Display server errors */}
                {errors.root?.server && (
                  <div className="alert alert-danger mb-3">
                    {errors.root.server.message}
                  </div>
                )}

                <div className="text-center">
                  <button
                    type="submit"
                    className="btn btn-primary w-100"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Creating Account..." : "Sign Up"}
                  </button>
                </div>
                <div className="text-center mt-3">
                 <p>
                   Already have an account? <Link to="/signin">Sign in here</Link>
                </p>
               </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupForm;
