const { patient_register, doctor_register, login } = require('../user/user_controller');
const express = require('express');
const router = express.Router();
const multer = require('multer');
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

router.route('/register/patient', upload.single('profile_photo'))
  .post(patient_register);

router.route('/register/doctor', upload.single('profile_photo'))
  .post(doctor_register);

router.route('/login')
  .post(login)

module.exports = router;
