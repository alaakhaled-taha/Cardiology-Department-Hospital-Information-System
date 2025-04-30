const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { Patient, Doctor } = require("../models");

// Register Patient
router.post("/register/patient", async (req, res) => {
  const { name, email, password, date_of_birth, gender } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newPatient = await Patient.create({
      name,
      email,
      password: hashedPassword,
      date_of_birth,
      gender,
    });
    res.status(201).json({ message: "Patient created successfully!" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Register Doctor
router.post("/register/doctor", async (req, res) => {
  const { name, email, password, specialty, contact_info } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newDoctor = await Doctor.create({
      name,
      email,
      password: hashedPassword,
      specialty,
      contact_info,
    });
    res.status(201).json({ message: "Doctor created successfully!" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Login (common for both)
router.post("/login", async (req, res) => {
  const { email, password } = req.body; // role = "patient" or "doctor"
  console.log("Login attempt with:", email); // Log the request
  try {
    const results = await Promise.all([
      Patient.findOne({ where: { email } }),
      Doctor.findOne({ where: { email } }),
    ]);
    const [patient, doctor] = results;
    const user = patient || doctor;
    if (!user) {
      console.error("can't find user");
      //added
      console.log("No user found with ID:", decoded.id);
      return res.status(401).json({ error: "User not found"
       /* success: false,
        message: " failed",
        details: "No user found with this email",*/
      });
    }

    const role = patient ? "patient" : "doctor";
    const userData = {
      id: user.id,
      email: user.email,
      name: user.name,
      role,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };

    // Add role-specific fields
    if (role === "doctor") {
      userData.specialty = user.specialty;
      userData.contactInfo = user.contact_info;
    } else {
      userData.dateOfBirth = user.date_of_birth;
      userData.gender = user.gender;
    }
    // let role="patient";
    // let user = await Patient.findOne({ where: { email } });
    // if (!user) {
    //   // Check if the email exists in Doctor model
    //   user = await Doctor.findOne({ where: { email } });
    //   role = "doctor"; // If found in Doctor, set role as 'doctor'
    //   }else {
    //       return res.status(400).json({ error: 'Invalid role' });
    //     }

    if (!user) return res.status(401).json({ error: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.error("password mismatch");
      return res.status(401).json({
        success: false,
        message: "password failed",
        details: "Incorrect password",
      });
    }

    const token = jwt.sign(
      { 
         id: user.id,        
         role: user.role,
         email: user.email 
        },
      "your_secret_key",
      {
        expiresIn: "1h",
      }
    );

    res.json({ token, user:userData });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get Profile (for both)
router.get("/me", async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ error: "No token provided" });

  try {
    const decoded = jwt.verify(token, "your_secret_key");
    console.log("Decoded JWT:", decoded);
    let user;
    if (decoded.role === "patient") {
      user = await Patient.findByPk(decoded.id);
      //console.log("Fetched patient:", user);
    } else if (decoded.role === "doctor") {
      user = await Doctor.findByPk(decoded.id);
     // console.log("Fetched doctor:", user);
    } 
    else {
      return res.status(400).json({ error: "Invalid role" });
    }
//added
if (!user) return res.status(404).json({ error: "User not found" });


    console.log("found user", user);

    res.json(user);
  } catch (error) {
    console.error("JWT error:", error.message);
    res.status(401).json({ error: "Invalid token" });
  }
});
//added
// Temporary route for debugging
router.get("/patients", async (req, res) => {
  try {
    const patients = await Patient.findAll();
    res.json(patients);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});




module.exports = router;
