const express = require('express');
const router = express.Router();
const {registerUser, loginUser, getMe, logoutUser} = require("../../controllers/userController.js");
const {protect} = require("../../middleware/auth.js");


router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.get("/me", getMe);

// Export the router
module.exports = router;