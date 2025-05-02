const express = require('express');
const { Doctor, sequelize } = require('../models');
const { Sequelize } = require("sequelize");
const { QueryTypes } = require('sequelize');
const router = express.Router();
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config({ path: 'server/.env' });
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

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
        console.log(error);
        res.status(401).json({ error: 'Invalid token' });
    }
});
module.exports = router;