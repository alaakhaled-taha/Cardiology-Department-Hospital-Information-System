const express = require("express");
const router = express.Router();
const { me, update, logout } = require("../user/profile");
router.get("/me", me);

router.put("/update", update);

router.post("/logout", logout);

module.exports = router;
