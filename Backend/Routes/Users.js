const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { Users } = require('../models');
const JWT_SECRET = 'your-secret-key';  // Replace with a secure secret, ideally from an environment variable
router.post("/", async (req, res) => {
    const { name, email, password } = req.body;  // Destructure user data from request body

    try {
        // Check if user already exists
        const existingUser = await Users.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ success: false, message: 'User already exists' });
        }

        // Hash the password before saving to the database
        const hashedPassword = await bcrypt.hash(password, 10);  // Hash with salt rounds

        // Create new user with hashed password
        const newUser = await Users.create({ name, email, password: hashedPassword });

        // Send the created user response
        res.status(201).json({ success: true, message: 'User created successfully', user: newUser });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error', error: error.message });
    }
});

// POST route: Login user and generate JWT token
router.post("/login", async (req, res) => {
    const { email, password } = req.body; // Get email and password from the request body

    try {
        // Find user in the database
        const user = await Users.findOne({ where: { email } });

        // Check if user exists
        if (!user) {
            return res.status(401).json({ success: false, message: "Invalid email or password" });
        }

        // Compare the entered password with the stored hashed password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ success: false, message: "Invalid email or password" });
        }

        // Generate JWT token if login is successful
        const payload = {
            id: user.id,
            email: user.email,
            name: user.name
        };

        const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1d' });  // Token expires in 1 hour
        res.json({ success: true, message: "Login successful", token, name: user.name,email:user.email });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: 'Server error', error: error.message });
    }
});

module.exports = router;
