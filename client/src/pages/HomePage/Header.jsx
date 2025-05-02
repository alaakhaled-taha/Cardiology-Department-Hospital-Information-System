import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import logo from "../../assets/logo3.png";

function Header() {
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  return (
    <header>
      <img src={logo} alt="Cleopatra Hospitals Logo" className="logo" />
      <h1></h1>
      <nav>
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="#">About Us</a></li>
          <li
            className="dropdown"
            onMouseEnter={toggleDropdown}
            onMouseLeave={toggleDropdown}
          >
            <a href="#">Departments</a>
            {dropdownVisible && (
              <ul className="dropdown-menu">
                <li><Link to="/departments/cardiology">Cardiology</Link></li>
                <li><a href="#">Radiology</a></li>
                <li><a href="#">Surgery</a></li>
                <li><a href="#">Emergency</a></li>
                <li><a href="#">Hemodialysis</a></li>
                <li><a href="#">Obstetrics and Gynecology</a></li>
                <li><a href="#">Internal Medicine</a></li>
                <li><a href="#">Ophthalmology</a></li>
              </ul>
            )}
          </li>
          <li><a href="#">Contact Us</a></li>
          <li><a href="/Signin">Sign in</a></li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
