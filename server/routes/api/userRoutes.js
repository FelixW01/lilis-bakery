const express = require('express');
const router = express.Router();
const {registerUser, loginUser, getMe, logoutUser, guestLogin, forgotPassword, resetPassword, getUser, resetPasswordFromProfile, sendEmail} = require("../../controllers/userController.js");
const auth = require("../../middleware/auth.js");


router.post("/register", registerUser);
router.post("/login/guest", guestLogin)
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.post("/reset-password", resetPassword);
router.post("/reset-password-from-profile", resetPasswordFromProfile);
router.post("/forgot-password", forgotPassword);
router.get("/me", auth, getMe);
router.get("/getUser", auth, getUser);
router.post("/send-email", sendEmail);

// Export the router
module.exports = router;