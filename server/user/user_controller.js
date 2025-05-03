const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { Sequelize } = require("sequelize");
const { QueryTypes } = require('sequelize');
const { Patient, Doctor, sequelize } = require('../models');
const patient = require('../models/patient');
const dotenv = require('dotenv');
dotenv.config({ path: 'server/.env' });
const path = require('path');
const fs = require('fs');
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
//APIs for registeration of patient and doctor
const patient_register = async (req, res) => {
    console.log('Body:', req.body);
    console.log('File:', req.file);  //to ensure multer is processing it

    const { name, date_of_birth, gender, blood_group, referred_by, primary_mobile, secondary_mobile, landline, email, address, parent_name, spouse_name, is_corporate_patient, has_insurance, is_smoker, password, last_name } = req.body;
    const profile_photo = req.file?.filename ? `/uploads/${req.file.filename}` : null;

    try {
        const old_patient = await sequelize.query('SELECT * FROM patients WHERE email = ?', {
            replacements: [email],
            type: QueryTypes.SELECT,
        });

        if (old_patient.length > 0) {
            return res.status(400).json({ message: "E-mail already exists" });
        }

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
            profile_photo,
            last_name
        });

        res.status(201).json({ message: 'Patient created successfully!' });
    } catch (error) {
        console.error('Error in patient registration:', error);  // Log the error
        res.status(500).json({ error: error.message });
    }
};


const doctor_register = async (req, res) => {
    console.log('Body:', req.body);
    console.log('File:', req.file);

    const { name, email, password, specialty, primary_mobile, last_name, gender, secondary_mobile, landline, university_name, graduation_year, salary_per_session } = req.body;
    const profile_photo = req.file?.filename ? `/uploads/${req.file.filename}` : null;

    try {
        // Check if doctor email already exists
        const old_doctor = await sequelize.query('SELECT * FROM doctors WHERE email = ?', {
            replacements: [email],
            type: QueryTypes.SELECT,
        });

        if (old_doctor.length > 0) {
            return res.status(400).json({ message: "E-mail already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newDoctor = await Doctor.create({
            name,
            email,
            password: hashedPassword,
            specialty,
            contact_info: primary_mobile,
            profile_photo,
            last_name,
            gender,
            secondary_mobile,
            landline,
            university_name,
            graduation_year,
            salary_per_session
        });

        res.status(201).json({ message: 'Doctor created successfully!' });
    } catch (error) {
        console.error('Error in doctor registration:', error);
        res.status(500).json({ error: error.message });
    }
};

//API for login as patient or doctor
const login = async (req, res) => {
    const { email, password } = req.body;

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
};

module.exports = {
    patient_register,
    doctor_register,
    login
}