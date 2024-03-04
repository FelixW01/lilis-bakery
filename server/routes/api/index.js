const router = require('express').Router();
const userRoutes = require('./userRoutes');
const foodRoutes = require('./foodRoutes');
const cartRoutes = require('./cartRoutes')
const checkoutRoutes = require('./checkoutRoutes');


router.use('/checkout', checkoutRoutes);
router.use('/user', userRoutes);
router.use('/food', foodRoutes);
router.use('/cart', cartRoutes);

module.exports = router;