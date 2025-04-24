import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
// import "./Signup.css"; // Add any custom styles here
import { validation } from "./validation";
import DoctorForm from "./DoctorForm";
import PatientForm from "./PatientForm";
import { userTypes } from "../../enums/useType";

const SignupForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm();

  const [userType, setUserType] = React.useState("");

  const handleRoleChange = (userType) => {
    setUserType(userType);
    // Reset specialty if switching roles
    setValue("specialty", "");
    reset();
  };

  const onSubmit = async (data) => {
    const validationError = validation(data);
    if (validationError.length > 0) {
      alert(validationError.join("\n"));
      return;
    }
    try {
      const res = await axios.post(
        "http://localhost:5000/api/users/register",
        data
      );
      alert("Account created successfully!");
      // ممكن تضيفي redirect هنا أو reset
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6 col-xl-4">
          <div className="card shadow-lg p-4 rounded">
            <h2 className="text-center mb-4 text-primary">Create Account</h2>

            {/* Role buttons */}
            <div className="mb-4 text-center">
              <button
                className={`btn ${
                  userType === userTypes.doctor ? "btn-info" : "btn-secondary"
                } mx-2`}
                onClick={() => handleRoleChange(userTypes.doctor)}
              >
                Sign up as Doctor
              </button>
              <button
                className={`btn ${
                  userType === userTypes.patient ? "btn-info" : "btn-secondary"
                } mx-2`}
                onClick={() => handleRoleChange(userTypes.patient)}
              >
                Sign up as Patient
              </button>
            </div>

            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-3">
                <label htmlFor="first_name" className="form-label">
                  First Name
                </label>
                <input
                  {...register("first_name", {
                    required: "First name is required",
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
                <label htmlFor="middle_name" className="form-label">
                  Middle Name
                </label>
                <input
                  {...register("middle_name")}
                  type="text"
                  className="form-control"
                  id="middle_name"
                />
              </div>

              <div className="mb-3">
                <label htmlFor="last_name" className="form-label">
                  Last Name
                </label>
                <input
                  {...register("last_name", {
                    required: "Last name is required",
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
                    pattern: /^[^@]+@[^@]+\.[^@]+$/,
                  })}
                  type="email"
                  className="form-control"
                  id="email"
                  placeholder="your@email.com"
                />
                {errors.email && (
                  <p className="text-danger">{errors.email.message}</p>
                )}
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
                  })}
                  type="password"
                  className="form-control"
                  id="confirmPassword"
                  placeholder="•••••••••••••"
                />
                {errors.confirmPassword && (
                  <p className="text-danger">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>

              <div className="mb-3">
                <label htmlFor="phone_number" className="form-label">
                  Phone Number
                </label>
                <input
                  {...register("phone_number", {
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
                <label htmlFor="image" className="form-label">
                  Upload Image
                </label>
                <input
                  {...register("image", {
                    required: "Image upload is required",
                  })}
                  type="file"
                  className="form-control"
                  id="image"
                  accept="image/*"
                />
                {errors.image && (
                  <p className="text-danger">{errors.image.message}</p>
                )}
              </div>

              {userType === userTypes.doctor && (
                <DoctorForm register={register} errors={errors} />
              )}
              {userType === userTypes.patient && (
                <PatientForm register={register} errors={errors} />
              )}

              <div className="text-center">
                <button type="submit" className="btn btn-primary w-100">
                  Sign Up
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupForm;
