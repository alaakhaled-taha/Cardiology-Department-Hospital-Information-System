const express = require('express');
const router = express.Router();
const { me, update } = require('../user/profile');
router.get('/me', me);

router.put('/update', update);

module.exports = router;