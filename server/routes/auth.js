const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { Sequelize } = require("sequelize");
const { QueryTypes } = require('sequelize');
const { Patient, Doctor, sequelize } = require('../models');
const patient = require('../models/patient');
const multer = require('multer');
const dotenv = require('dotenv');
dotenv.config({ path: 'server/.env' });
const path = require('path');
const fs = require('fs');
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;


const uploadPath = path.join(__dirname, '../../uploads');

if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath);
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    const ext = file.mimetype.split('/')[1];
    const fileName = `user-${Date.now()}.${ext}`;
    cb(null, fileName)
  }
});
const upload = multer({ storage: storage })
// Register Patient
router.post('/register/patient', upload.single('profile_photo'), async (req, res) => {
  const { name,
    date_of_birth,
    gender,
    blood_group,
    referred_by,
    primary_mobile,
    secondary_mobile,
    landline,
    email,
    address,
    parent_name,
    spouse_name,
    is_corporate_patient,
    has_insurance,
    is_smoker,
    password } = req.body;
  const profile_photo = req.file?.filename
    ? `/uploads/${req.file.filename}`
    : null;

  const old_patient = await sequelize.query('SELECT * FROM patients WHERE email = ?', {
    replacements: [email],
    type: QueryTypes.SELECT,
  });
  if (old_patient.length > 0) {
    return res.status(400).json({ massage: "E-mail is already exist" })
  }
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newPatient = await Patient.create({
      name,
      date_of_birth,
      gender,
      blood_group,
      referred_by,
      primary_mobile,
      secondary_mobile,
      landline,
      email,
      address,
      parent_name,
      spouse_name,
      is_corporate_patient,
      has_insurance,
      is_smoker,
      password: hashedPassword,
      profile_photo: profile_photo
    });
    const token = jwt.sign(
      {
        email: newPatient.email,
        id: newPatient.id,
        role: "patient"
      },
      JWT_SECRET_KEY,
      { expiresIn: '1h' }
    );
    res.status(201).json({ message: 'Patient created successfully!', token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Register Doctor
router.post('/register/doctor', upload.single('profile_photo'), async (req, res) => {
  const { name, email, password, specialty, contact_info } = req.body;
  // const profile_photo = req.file?.filename || null;
  const profile_photo = req.file?.filename
    ? `/uploads/${req.file.filename}`
    : null;
  const old_doctor = await sequelize.query('SELECT * FROM doctors WHERE email = ?', {
    replacements: [email],
    type: QueryTypes.SELECT,
  });
  if (old_doctor.length > 0) {
    return res.status(400).json({ massage: "E-mail is already exist" });
  }
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newDoctor = await Doctor.create({ name, email, password: hashedPassword, specialty, contact_info, profile_photo: profile_photo });
    const token = jwt.sign(
      {
        email: newDoctor.email,
        id: newDoctor.id,
        role: "doctor"
      },
      JWT_SECRET_KEY,
      { expiresIn: '1h' }
    );
    res.status(201).json({ message: 'doctor created successfully!', token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Login (common for both)
// router.post("/login", async (req, res) => {
//   const { email, password } = req.body;
//   console.log("Login attempt with:", email);

//   try {
//     const [patient, doctor] = await Promise.all([
//       Patient.findOne({ where: { email } }),
//       Doctor.findOne({ where: { email } }),
//     ]);

//     const user = patient || doctor;
//     if (!user) {
//       console.error("Can't find user");
//       return res.status(401).json({ error: "User not found" });
//     }

//     const role = patient ? "patient" : "doctor";

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       console.error("Password mismatch");
//       return res.status(401).json({ error: "Incorrect password" });
//     }
//     const id = patient ? user.patient_id : user.doctor_id;
//     const token = jwt.sign(
//       {
//         id,
//         role: patient ? "patient" : "doctor",
//         email: user.email
//       },
//       "your_secret_key",
//       { expiresIn: "1h" }
//     );

//     const userData = {
//       id: user.id,
//       email: user.email,
//       name: user.name,
//       role,
//       createdAt: user.createdAt,
//       updatedAt: user.updatedAt,
//     };

//     if (role === "doctor") {
//       userData.specialty = user.specialty;
//       userData.contactInfo = user.contact_info;
//       userData.gender = user.gender;
//     } else {
//       userData.dateOfBirth = user.date_of_birth;
//       userData.gender = user.gender;
//     }

//     res.json({ token, user: userData });
//   } catch (error) {
//     console.error("Login error:", error.message);
//     res.status(500).json({ error: error.message });
//   }
// });

router.post('/login', async (req, res) => {
  const { email, password } = req.body; // role = "patient" or "doctor"

  try {
    let user;
    let role;
    const patient = await sequelize.query('SELECT * FROM patients WHERE email = ?', {
      replacements: [email],
      type: QueryTypes.SELECT,
    });
    if (patient.length > 0) {
      user = patient[0];
      role = "patient";
    }
    const doctor = await sequelize.query('SELECT * FROM doctors WHERE email = ?', {
      replacements: [email],
      type: QueryTypes.SELECT,
    });
    if (doctor.length > 0) {
      user = doctor[0];
      role = "doctor";
    }

    if (!user) return res.status(404).json({ error: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: 'Invalid password' });

    const token = jwt.sign(
      {
        email: user.email,
        id: role === 'patient' ? user.patient_id : user.doctor_id,
        role: role
      },
      JWT_SECRET_KEY,
      { expiresIn: '1h' }
    );

    return res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
// Get Profile (for both)
/*router.get("/me", async (req, res) => {
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

router.get("/patients", async (req, res) => {
  try {
    const patients = await Patient.findAll();
    res.json(patients);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});*/

router.get("/doctors/cardiology", async (req, res) => {
  try {
    const doctors = await Doctor.findAll({
      where: { specialty: "Cardiology" },
      attributes: ["doctor_id", "name", "email", "profile_photo", "specialty", "contact_info"]
    }); 
    res.json(doctors);
  } catch (error) {
    console.error("Error fetching Cardiology doctors:", error);
    res.status(500).json({ error: "Failed to load doctors" });
  }
});

router.get('/me', async (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'No token provided' });

  try {
    const decoded = jwt.verify(token, JWT_SECRET_KEY);

    let user;
    if (decoded.role === 'patient') {
      user = await sequelize.query('SELECT * FROM patients WHERE patient_id = ?', {
        replacements: [decoded.id],
        type: QueryTypes.SELECT,
      });
    } else if (decoded.role === 'doctor') {
      user = await sequelize.query('SELECT * FROM doctors WHERE doctor_id = ?', {
        replacements: [decoded.id],
        type: QueryTypes.SELECT,
      });
    } else {
      return res.status(400).json({ error: 'Invalid role' });
    }
    res.json({ ...user[0], role: decoded.role });
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
});

// router.get("/me", async (req, res) => {
//   const token = req.headers.authorization?.split(" ")[1];
//   if (!token) return res.status(401).json({ error: "No token provided" });

//   try {
//     const decoded = jwt.verify(token, "your_secret_key");
//     let user;

//     if (decoded.role === "patient") {
//       user = await Patient.findByPk(decoded.id);
//     } else if (decoded.role === "doctor") {
//       user = await Doctor.findByPk(decoded.id);
//     } else {
//       return res.status(400).json({ error: "Invalid role" });
//     }

//     if (!user) return res.status(404).json({ error: "User not found" });

//     const userProfile = {
//       id: user.id,
//       name: user.name, // NOT user.fullName
//       email: user.email,
//       gender: user.gender,
//       contact_info: user.contact_info, // NOT user.phoneNumber
//       profile_picture_url: user.profile_picture_url, // NOT user.profilePicture
//       role: decoded.role,
//       ...(decoded.role === "patient" ? {
//           date_of_birth: user.date_of_birth,
//           blood_group: user.blood_group,
//           address: user.address,
//           parent_name: user.parent_name,
//           spouse_name: user.spouse_name,
//           is_corporate: user.is_corporate,
//           has_insurance: user.has_insurance,
//           is_smoker: user.is_smoker
//       } : {
//           specialty: user.specialty,
//           salary_per_session: user.salary_per_session,
//           no_of_appointments: user.no_of_appointments
//       })
//     };

//     res.json(userProfile);
//   } catch (error) {
//     console.error("JWT error:", error.message);
//     res.status(401).json({ error: "Invalid token" });
//   }
// });



module.exports = router;
