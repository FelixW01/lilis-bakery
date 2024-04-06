const express = require('express');
const router = express.Router();
const {createOrder, getOrder, getLatestOrder} = require('../../controllers/orderController');
const auth = require("../../middleware/auth.js");

router.use(auth)

router.get('/', getOrder)
router.get('/latest', getLatestOrder)
router.post('/', createOrder)





module.exports = router;