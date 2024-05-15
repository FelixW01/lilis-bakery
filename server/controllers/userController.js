const User = require("../models/User.js");
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')


// Function to generate a token for a user
const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

// Register a new user
const registerUser = asyncHandler(async (req, res) => {
        const { name, email, password } = req.body;
        const userExists = await User.findOne({email})
        // Validate user input
        if(!name || !email || !password) {
            return res.status(400).json({
                error: 'Please enter all fields'
            })
        }
        // Check if user exists
        if(userExists) {
            return res.status(400).json({
                error: 'Email is taken already.'
            })
        } 
        // Create User
        const newUser = await User.create({
            name,
            email,
            password
        });
        if(newUser) {
        res.status(201).json({
            id: newUser._id,
            name: newUser.name,
            email: newUser.email,
            token: generateToken(newUser._id)
        })
        } else {
            res.status(400).json({error: 'Invalid user data'})
        }; 
})

// Logs user in
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  // Check for user email
  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    const token = jwt.sign(
      { email: user.email, id: user._id, name: user.name },
      process.env.JWT_SECRET,
      { expiresIn: '30d' }
    );

    // Set HttpOnly cookie
    res.cookie('token', token, { httpOnly: true, sameSite: 'none', secure: true }).json({
      id: user._id,
      name: user.name,
      email: user.email,
      token,
    });
  } else {
    res.json({ error: 'Invalid email or password' });
  }
});

// Guest Login
const guestLogin = asyncHandler(async (req, res) => {
  const { name, email } = req.body;

  try {
    // Check if a guest with the same email already exists
    let guest = await User.findOne({ email });

    // If guest does not exist, create a new guest account
    if (!guest) {
      guest = await User.create({ name, email, isGuest: true });
    }

    // Retrieve the _id of the newly created or existing guest account
    const guestId = guest._id;

    // Generate JWT token for the guest using the guest's email, name and _id
    const token = jwt.sign(
      { email: guest.email, id: guest._id, name: guest.name },
      process.env.JWT_SECRET,
      { expiresIn: '30d' }
    );
    // Set HttpOnly cookie with the token
    res.cookie('token', token, { httpOnly: true, sameSite: 'none', secure: true }).json({
      id: guest._id,
      name: guest.name,
      email: guest.email,
      token,
    });

    // Return the generated token and guest information
    res.status(200).json({ token, name, email, guestId });
  } catch (error) {
    console.error('Error during guest login:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


// Logout
 const logoutUser = (req, res) => {
    res.clearCookie('token', { httpOnly: true, sameSite: 'none', secure: true });
    res.json({ message: 'Logged out' });
  };


// Get User Data
const getMe = (req, res) => {
    const {token} = req.cookies;
    if(token) {
        jwt.verify(token, process.env.JWT_SECRET, {}, (err, user) => {
            if(err) {
                res.status(401).json({error: 'Not authorized, invalid token'})
            }
            res.status(200).json(user)
        })
    } else {
        res.json(null)
    }
}

module.exports = {registerUser, loginUser, getMe, logoutUser, guestLogin};
