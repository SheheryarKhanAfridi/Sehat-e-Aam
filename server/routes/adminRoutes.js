const express = require("express");
const { adminOnly } = require("../utils/features");
const { getAllUsers, getUserDetails, activateAccout, userStats } = require("../controllers/adminController");
const router = express.Router();

router.get("/getAllUsers", adminOnly, getAllUsers);
router.post("/getUserDetails", adminOnly, getUserDetails);
router.post("/activateAccout", adminOnly, activateAccout);
router.get("/userStats", adminOnly, userStats);

module.exports = router;
