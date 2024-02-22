const jwt = require('jsonwebtoken');
const User = require('../models/User.js');

const auth = async (req, res, next) => {
  
    // Retrieve the token from the 'token' cookie
    const { authorization } = req.headers;

    if (!authorization) { 
      return res.status(401).json({error: 'Authorization token required'});
    }

    const token = authorization.split(' ')[1];

    try {
    const {_id} = jwt.verify(token, process.env.JWT_SECRET)

    req.user = await User.findOne({_id}).select('_id'); 
    next();
  } catch (error) {
    console.error('Error in auth middleware:', error);
    res.status(401).json({ error: 'Request is not authorized' });
  }
};

module.exports = auth;
