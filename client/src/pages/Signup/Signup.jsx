import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import DoctorForm from "./DoctorForm";
import PatientForm from "./PatientForm";
import CommonForm from "./CommonForm";
import { userTypes } from "../../enums/useType";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import { FaUserMd, FaUserAlt, FaHeartbeat } from "react-icons/fa";

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
    mode: "onBlur",
  });

  const [userType, setUserType] = React.useState("");
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const navigate = useNavigate();

  const handleRoleChange = (userType) => {
    setUserType(userType);
    setValue("specialty", "");
    reset();
  };

  const onSubmit = async (data) => {
    const formData = new FormData();

    Object.entries(data).forEach(([key, value]) => {
      if (key === "profile_photo") {
        formData.append(key, value[0]);
      } else {
        formData.append(key, value);
      }
    });
    formData.append("userType", userType);
  
    setIsSubmitting(true);
  
    const apiUrl =
      userType === userTypes.doctor
        ? "http://localhost:5000/api/auth/register/doctor"
        : "http://localhost:5000/api/auth/register/patient";
  
    try {
      // ➡️ Tell Axios this is multipart
      const res = await axios.post(apiUrl, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
  
      console.log(res);
      toast.success("Account created successfully!");
      navigate("/profile");
    } catch (err) {
      console.error("Signup error:", err);
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
          <div className="card  card-shadow-primary-xl shadow-xl shadow-intensity-lg p-5 rounded">
            <h2 className="text-center mb-4 ">
              <FaHeartbeat className="me-2" />
              CardioCare Registration
            </h2>

            <div
              className="card-body"
              style={{ width: "100%", maxWidth: "100%" }}
            >
              <div className="form-section first-section d-flex justify-content-between align-items-center mb-1">
                <div>
                  <h6 className="word">Welcome to CardioCare</h6>
                  <h2 className="p-1">
                    {userType
                      ? `${
                          userType.charAt(0).toUpperCase() + userType.slice(1)
                        } Registration`
                      : "Select Your Role"}
                  </h2>
                </div>

                <div>
                  <div className="d-flex align-items-center">
                    <div className="vr mx-1"></div>
                    <div className="role-buttons d-flex">
                      <button
                        className={`role-btn ${
                          userType === userTypes.doctor ? "" : "selected"
                        } mx-2`}
                        onClick={() => handleRoleChange(userTypes.doctor)}
                      >
                        <FaUserMd className="me-2" />
                        I'm a Doctor
                      </button>
                      <button
                        className={`role-btn ${
                          userType === userTypes.patient ? "" : "selected"
                        } mx-2`}
                        onClick={() => handleRoleChange(userTypes.patient)}
                      >
                        <FaUserAlt className="me-2" />
                        I'm a Patient
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

                {errors.root?.server && (
                  <div className="alert alert-danger mb-3">
                    {errors.root.server.message}
                  </div>
                )}

                <div className="text-center">
                  <button
                    type="submit"
                    className="selected role-btn w-100"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Creating Account..." : "Sign Up"}
                  </button>
                </div>
                <div className="text-center mt-3">
                  <p>
                    Already have an account?{" "}
                    <Link to="/signin">Sign in here</Link>
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