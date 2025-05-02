const { patient_register, doctor_register, login } = require('../user/user_controller');
const express = require('express');
const router = express.Router();
const multer = require('multer');

const diskStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads');
  },
  filename: function (req, file, cb) {
    const ext = file.mimetype.split('/')[1];
    const fileName = `user-${Date.now}.${ext}`;
    cb(null, fileName)
  }
})
const upload = multer({ storage: diskStorage });


router.route('/register/patient')
  .post(patient_register);

router.route('/register/doctor')
  .post(doctor_register);

router.route('/login')
  .post(login)

module.exports = router;
