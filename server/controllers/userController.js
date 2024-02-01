const User = require("../models/User.js");
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')

const test = (req, res) => {
    res.send('connected!')
}


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
            _id: newUser._id,
            name: newUser.name,
            email: newUser.email,
            token: generateToken(newUser._id)
        })
        } else {
            res.status(400).json({error: 'Invalid user data'})
        }; 
})
// }

// Logs user in
const loginUser = asyncHandler(async (req, res) => {
        const { email, password } = req.body;
        // Check for user email
        const user = await User.findOne({email})
        if(user && (await bcrypt.compare(password, user.password))) {
            res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        })
    } else {
        res.status(400).json({error: 'Invalid Credentials'})
    }
})

// Get User Data
const getMe = asyncHandler(async (req, res) => {
        const {_id, name, email} = await User.findById(req.user.id)
        res.status(200).json({
            id: _id,
            name,
            email,
        })
})

// Generate JWT
const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: '30d'})
}

module.exports = {registerUser, loginUser, getMe, test};