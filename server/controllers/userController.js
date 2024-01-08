const User = require("../models/User.js");
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')



// Register a new user
const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const userExists = await User.findOne({email})
        // Validate user input
        if(!name || !email || !password) {
            res.status(400)
            throw new Error('Please add all fields')
        }
        // Check if user exists
        if(userExists) {
            res.status(400)
            throw new Error('User already exists!')
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
            email: newUser.email
        })
        } else {
            res.status(400)
            throw new Error('Invalid user data')
        }; 
    } catch (error) {
        console.error(error);
        res.status(500).send(error, "adsadasd");
    }
}

// Logs user in
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
}

// Get User Data
const getMe = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);

    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
}

module.exports = {registerUser, loginUser, getMe};