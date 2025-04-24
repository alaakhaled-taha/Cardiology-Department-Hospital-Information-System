import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom"; // Add this import
import "./Signin.css"
import axios from "axios"; // Import Axios for making HTTP requests

const SigninForm = () => {
  const [errorMessage, setErrorMessage] = useState(""); // State to hold error messages
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // Handle form submission
  const onSubmit = async (data) => {
    try {
      // Make a POST request to your backend API to check email and password
      const response = await axios.post(
        "http://localhost:5000/api/signin",
        data
      );

      if (response.data.success) {
        // Handle successful sign-in (e.g., redirect to dashboard, store user info in state)
        console.log("Sign-In Successful!", response.data);
      } else {
        // If the API returns an error message, show it
        setErrorMessage(response.data.message);
      }
    } catch (error) {
      // Handle any errors from the API call
      setErrorMessage("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-s12 col-md-6 col-lg-4">
          <h2 className="text-center">Sign In</h2>

          {/* Show Error Message */}
          {errorMessage && (
            <p className="text-danger text-center">{errorMessage}</p>
          )}

          {/* Sign In Form */}
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Email Input */}
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email address
              </label>
              <input
                type="email"
                id="email"
                className={`form-control ${errors.email ? "is-invalid" : ""}`}
                placeholder="Enter your email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
                    message: "Invalid email address",
                  },
                })}
              />
              {errors.email && (
                <div className="invalid-feedback">{errors.email.message}</div>
              )}
            </div>

            {/* Password Input */}
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                id="password"
                className={`form-control ${
                  errors.password ? "is-invalid" : ""
                }`}
                placeholder="Enter your password"
                {...register("password", {
                  required: "Password is required",
                  
                })}
              />
              {errors.password && (
                <div className="invalid-feedback">
                  {errors.password.message}
                </div>
              )}
            </div>

            {/* Sign In Button */}
            <button type="submit" className="btn btn-primary w-100">
              Sign In
            </button>
          </form>

          <p className="text-center mt-3">
            Don't have an account? <Link to="/signup">Sign up here</Link>
            {/* <a href="../Signup/Signup.js">Sign up</a> */}
          </p>
        </div>
      </div>
    </div>
  );
};

export default SigninForm;
