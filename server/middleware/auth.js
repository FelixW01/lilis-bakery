const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  // Get the token from the request cookies
  const token = req.cookies.token;

  // Check if the token exists
  if (!token) {
    return res.status(401).json({ error: 'Unauthorized: No token provided' });
  }

  try {
    // Verify the token using your secret or public key
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Replace 'your-secret-key' with your actual secret or public key

    // Attach the decoded user information to the request for use in subsequent middleware/routes
    req.user = decoded;

    // Continue to the next middleware or route handler
    next();
  } catch (error) {
    // Token verification failed
    console.error('Token verification failed:', error);
    return res.status(401).json({ error: 'Unauthorized: Invalid token' });
  }
};

module.exports = authMiddleware;