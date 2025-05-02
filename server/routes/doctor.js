const express = require('express');
const { Doctor } = require('../models');
const router = express.Router();
router.get("/doctors/cardiology", async (req, res) => {
    try {
        const doctors = await Doctor.findAll({
            where: { specialty: "Cardiology" },
            attributes: ["doctor_id", "name", "email", "profile_photo", "specialty", "contact_info", "gender", "university_name", "graduation_year"]
        });
        res.json(doctors);
    } catch (error) {
        console.error("Error fetching Cardiology doctors:", error);
        res.status(500).json({ error: "Failed to load doctors" });
    }
});
module.exports = router;