const { patient_register, doctor_register, login } = require('../user/user_controller');
const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

// Setup multer for file storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '..', 'uploads')); // Directory where files are saved
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });


router.post('/register/patient', upload.single('profile_photo'), patient_register);
router.post('/register/doctor', upload.single('profile_photo'), doctor_register);


router.post('/login', login);

module.exports = router;
