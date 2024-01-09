const express = require('express');
const router = express.Router();
const {registerUser, loginUser, getMe} = require("../../controllers/userController.js");
const {protect} = require("../../middleware/auth.js");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/me", protect, getMe);

// Export the router
module.exports = router;