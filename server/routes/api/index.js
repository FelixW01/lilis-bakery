const router = require('express').Router();
const userRoutes = require('./userRoutes');
const foodRoutes = require('./foodRoutes');

// const isAuth = require('../../middleware/auth');

// router.post('/register', UserController.register);
// router.post('/login', UserController.login);
// router.post('/logout', isAuthenticated, UserController.logout);

router.use('/user', userRoutes);
router.use('/food', foodRoutes);

module.exports = router;