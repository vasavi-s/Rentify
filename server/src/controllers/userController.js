
// src/controllers/userController.js

const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.registerUser = async (req, res) => {
  try {
    const { firstName, lastName, email, phoneNumber, password, isSeller } = req.body;
    const user = new User({ firstName, lastName, email, phoneNumber, password, isSeller });
    await user.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// exports.loginUser = async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     const user = await User.findOne({ email });
//     if (!user || !(await bcrypt.compare(password, user.password))) {
//       return res.status(401).json({ message: 'Invalid email or password' });
//     }
//     const token = jwt.sign({ userId: user._id }, 'your_jwt_secret', { expiresIn: '1h' });
//     res.json({ token });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    const token = jwt.sign({ userId: user._id }, 'your_jwt_secret', { expiresIn: '1h' });
    // Return the token along with other user information
    res.json({ token, user: { _id: user._id, email: user.email, firstName: user.firstName, lastName: user.lastName } });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
