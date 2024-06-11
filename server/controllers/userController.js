const User = require("../models/User.js");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler');
const nodemailer = require('nodemailer');

// Function to generate a token for a user
const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

// Register a new user
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  // Validate user input
  if (!name || !email || !password) {
    return res.status(400).json({
      error: 'Please enter all fields',
    });
  }

  // Check if a regular user with the same email already exists
  const userExists = await User.findOne({ email, isGuest: false });
  if (userExists) {
    return res.status(400).json({
      error: 'Email is taken already.',
    });
  }

  // Check if a guest with the same email exists
  let guest = await User.findOne({ email, isGuest: true });

  let newUser;
  if (guest) {
    // Convert the guest account to a regular user account
    guest.name = name;
    guest.password = password;
    guest.isGuest = false;
    newUser = await guest.save();
  } else {
    // Create a new user account if no guest account exists
    newUser = await User.create({
      name,
      email,
      password,
      isGuest: false,
    });
  }

  if (newUser) {
    res.status(201).json({
      id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      token: generateToken(newUser._id),
    });
  } else {
    res.status(400).json({ error: 'Invalid user data' });
  }
});

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
    let guest = await User.findOne({ email, isGuest: true });

    if (!guest) {
      // Create a new guest account if it doesn't exist
      guest = await User.create({ name, email, isGuest: true });
    }

    const token = jwt.sign(
      { email: guest.email, id: guest._id, name: guest.name },
      process.env.JWT_SECRET,
      { expiresIn: '30d' }
    );

    res.cookie('token', token, { httpOnly: true, sameSite: 'none', secure: true });
    res.status(200).json({
      id: guest._id,
      name: guest.name,
      email: guest.email,
      token,
    });

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

// Get User Data from DB
 const getUser = asyncHandler(async (req, res) => {
    const { email } = req.query;
   try {
      const user = await User.findOne({ email });
      if ( !user ) {
        return res.status(404).json({error: 'No user found with this email'})
      } else {
        res.status(200).json(user)
      }
    } catch {
      console.error('Error getting user data:', error);
      res.status(500).json({ error: 'Server error' });
    }
 })


 //Forgot Password
 const forgotPassword = asyncHandler(async (req, res) => {
    const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: 'No user found with this email' });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL,
      to: user.email,
      subject: 'Password Reset',
      text: `You requested a password reset. Click the link to reset your password: ${process.env.CLIENT_URL}/reset-password?token=${token}`,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: 'Password reset email sent!' });
  } catch (error) {
    console.error('Error sending password reset email:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

//Reset Password
const resetPassword = asyncHandler(async (req, res) => {
    const { token, password } = req.body;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    user.password = password;
    await user.save();

    res.status(200).json({ message: 'Password reset successful' });
  } catch (error) {
    console.error('Error resetting password:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

const resetPasswordFromProfile = asyncHandler(async (req, res) => {
    const { currentPassword, newPassword, confirmNewPassword, userId } = req.body;

    try {

        const user = await User.findById(userId);

        if (!user) {
            console.error('User not found');
            return res.status(404).json({ error: 'User not found' });
        }

        // Verify current password
        const isMatch = await bcrypt.compare(currentPassword, user.password);
        if (!isMatch) {
            console.error('Invalid current password');
            return res.status(401).json({ error: 'Invalid current password' });
        }

        // Check if new passwords match
        if (newPassword !== confirmNewPassword) {
            console.error('New passwords do not match');
            return res.status(400).json({ error: 'New passwords do not match' });
        }

        // Check if new password is the same as the current password
        if (currentPassword === newPassword) {
            console.error("New password can't be the same as the current password");
            return res.status(400).json({ error: "New password can't be the same as the current password" });
        }

        user.password = newPassword;

        // Save the user with the new password
        await user.save();

        console.log('Password updated successfully');
        res.status(200).json({ message: 'Password updated successfully' });
    } catch (error) {
        console.error('Server error:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = {registerUser, loginUser, getMe, logoutUser, guestLogin, forgotPassword, resetPassword, getUser, resetPasswordFromProfile};
