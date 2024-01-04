const router = require('express').Router();
const userRoutes = require('./userRoutes');

const isAuthenticated = require('../../middleware/isAuthenticated');

// router.post('/register', UserController.register);
// router.post('/login', UserController.login);
// router.post('/logout', isAuthenticated, UserController.logout);
router.use('/user', userRoutes);

module.exports = router;