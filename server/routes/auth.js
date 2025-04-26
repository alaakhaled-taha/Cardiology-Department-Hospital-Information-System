const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { Patient, Doctor } = require('../models');

// Register Patient
router.post('/register/patient', async (req, res) => {
  const { name, email, password, date_of_birth, gender } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newPatient = await Patient.create({ 
      name, 
      email, 
      password: hashedPassword, 
      date_of_birth,
      gender     
    });
    res.status(201).json({ message: 'Patient created successfully!' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Register Doctor
router.post('/register/doctor', async (req, res) => {
  const { name, email, password, specialty, contact_info } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newDoctor = await Doctor.create({ name, email, password: hashedPassword, specialty, contact_info });
    res.status(201).json({ message: 'Doctor created successfully!' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Login (common for both)
router.post('/login', async (req, res) => {
  const { email, password, role } = req.body; // role = "patient" or "doctor"
  
  try {
    let user;
    if (role === 'patient') {
      user = await Patient.findOne({ where: { email } });
    } else if (role === 'doctor') {
      user = await Doctor.findOne({ where: { email } });
    } else {
      return res.status(400).json({ error: 'Invalid role' });
    }

    if (!user) return res.status(400).json({ error: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: 'Invalid password' });

    const token = jwt.sign({ id: user.id, role }, 'your_secret_key', { expiresIn: '1h' });

    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get Profile (for both)
router.get('/me', async (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'No token provided' });

  try {
    const decoded = jwt.verify(token, 'your_secret_key');
    let user;
    if (decoded.role === 'patient') {
      user = await Patient.findByPk(decoded.id);
    } else if (decoded.role === 'doctor') {
      user = await Doctor.findByPk(decoded.id);
    } else {
      return res.status(400).json({ error: 'Invalid role' });
    }
    res.json(user);
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
});

module.exports = router;
