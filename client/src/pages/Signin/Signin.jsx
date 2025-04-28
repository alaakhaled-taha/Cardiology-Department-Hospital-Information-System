

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Signin.css"; // We'll create this CSS file
import { FaHeartbeat, FaUser, FaLock, FaSignInAlt } from "react-icons/fa"; // Import icons


const SigninForm = () => {
  const [error, setError] = useState("");
  const [isLoading,setIsLoading]=useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    console.log('Data being sent to login:', data); 
    console.log(data);  
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",

        data ,{
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
      console.log(response); 
      if (response.data.token) {
        console.log("Sign-In Successful!", response.data);
        alert("Login successful");
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));
        navigate("/profile");
      } else {
        setError(response.data.message);
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || 
                         err.response?.data?.details || 
                         "Login failed. Please try again.";
      setError(errorMessage);
    } finally {
      setIsLoading(false)
    }
  };

  return (
    <div className="signin-container">
      <div className="cardiology-card">
        <div className="cardiology-design-side">
          <div className="cardiology-header">
            <FaHeartbeat className="heartbeat-icon" />
            <h2>Cardiology Department</h2>
            <p>Advanced Cardiac Care System</p>
          </div>
          <div className="ecg-animation">
            {/* ECG line animation will be added via CSS */}
          </div>
        </div>

        <div className="signin-form-side">
          <h2 className="form-title">
            <FaSignInAlt /> Sign In
          </h2>

          {error && <p className="error-message">{error}</p>}

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group">
              <label htmlFor="email">
                <FaUser /> Email address
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

            <div className="form-group">
              <label htmlFor="password">
                <FaLock /> Password
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

            <button type="submit" className="cardiology-btn" disabled={isLoading}>
            {isLoading ? "Logging in..." : "Signin"}
            </button>
          </form>

          <p className="signup-link">
            Don't have an account? <Link to="/signup">Sign up here</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SigninForm;
