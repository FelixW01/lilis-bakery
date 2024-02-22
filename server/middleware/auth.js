const jwt = require('jsonwebtoken');
const User = require('../models/User.js');

const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findOne({ _id: decoded._id, 'tokens.token': token });

    if (!user || !isValidToken(decoded, user.tokens)) {
      return res.status(401).send({ error: 'Authentication failed' });
    }

    req.token = token;
    req.user = user;
    next();
  } catch (error) {
    res.status(401).send({ error: 'Authentication required' });
  }
};

const isValidToken = (decodedToken, userTokens) => {
  // Check if the decoded token is not expired or revoked
  return userTokens.some((userToken) => userToken.token === decodedToken);
};

module.exports = auth;