const bcrypt = require('bcryptjs'); // Fixed import
const jwt = require('jsonwebtoken');
const User = require('../../models/user');

// Register User
const registerUser = async (req, res) => {
    const { userName, email, password } = req.body;
    try {
        const hashPassword = await bcrypt.hash(password, 12);
        const newUser = new User({ userName, email, password: hashPassword });

        await newUser.save();

        res.status(200).json({
            success: true,
            message: "Registration is successful.",
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "An error has occurred.",
        });
    }
};

// Login (currently empty, but structure is fine)
const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        // Logic for login will go here
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "An error has occurred.",
        });
    }
};

module.exports = { registerUser };
