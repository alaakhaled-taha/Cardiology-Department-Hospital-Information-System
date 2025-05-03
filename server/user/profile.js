const express = require('express');
const { Doctor, sequelize } = require('../models');
const { Sequelize } = require("sequelize");
const { QueryTypes } = require('sequelize');
const router = express.Router();
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config({ path: 'server/.env' });
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

const me = async (req, res) => {
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
}



//added
const update = async (req, res) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'No token provided' });

    try {
        const decoded = jwt.verify(token, JWT_SECRET_KEY);
        const updates = req.body;

        let table, idColumn, userId;
        if (decoded.role === 'patient') {
            table = 'patients';
            idColumn = 'patient_id';
            userId = decoded.id;
        } else if (decoded.role === 'doctor') {
            table = 'doctors';
            idColumn = 'doctor_id';
            userId = decoded.id;
        } else {
            return res.status(400).json({ error: 'Invalid role' });
        }
        delete updates.role;

        // Validate fields
        if (Object.keys(updates).length === 0) {
            return res.status(400).json({ error: 'No fields to update' });
        }

        const fields = Object.keys(updates);
        const values = Object.values(updates);
        const setClause = fields.map((field, index) => `${field} = ?`).join(', ');

        const query = `UPDATE ${table} SET ${setClause} WHERE ${idColumn} = ?`;

        await sequelize.query(query, {
            replacements: [...values, userId],
            type: QueryTypes.UPDATE,
        });

        res.json({ message: 'Profile updated successfully' });
    } catch (error) {
        console.error("Update error:", error);
        res.status(500).json({ error: 'Failed to update profile' });
    }
}

module.exports = {
    me,
    update
};
