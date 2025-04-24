// const { Router } = require('express');
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
// const User = require('../model/User');
// const Admin = require('../model/Admin');
// const router = Router();


// router.post('/register', async (req, res) => {
//   const { name, email, password, isSynced } = req.body;
//   try {
//     const hash = await bcrypt.hash(password, 10);
//     const user = new User({ Fullname, email, password: hash, isSynced });
//     await user.save();
//     res.status(201).json({ message: 'User registered', user });
//   } catch (err) {
//     res.status(400).json({ error: err.message });
//   }
// });


// router.post('/login', async (req, res) => {
//   const { email, password } = req.body;
//   try {
//     const user = await User.findOne({ email });
//     if (!user) return res.status(401).json({ error: 'Invalid email or password' });

//     const match = await bcrypt.compare(password, user.password);
//     if (!match) return res.status(401).json({ error: 'Invalid email or password' });

//     const token = jwt.sign({ userId: user._id },
//       process.env.JWT_SECRET || 'poiuytrewqasdfghjklmnbvcxz',
//       { expiresIn: '24h' }
//     );
//     res.json({ token, user });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });



// router.post('/admin/login', async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     if (!email || !password) {
//       return res.status(400).json({ error: 'Email and password are required.' });
//     }

//     const admin = await Admin.findOne({ email });
//     if (!admin) {
//       return res.status(401).json({ error: 'Invalid email or password.' });
//     }

//     const isMatch = await admin.comparePassword(password);
//     if (!isMatch) {
//       return res.status(401).json({ error: 'Invalid email or password.' });
//     }

//     const token = jwt.sign(
//       { data: { id: admin._id, email: admin.email } },
//       process.env.JWT_SECRET || 'poiuytrewqasdfghjklmnbvcxz',
//       { expiresIn: '24h' }
//     );

//     res.status(200).json({ message: 'Login successful', token });
//   } catch (err) {
//     console.error('Login error:', err);
//     res.status(500).json({ error: 'Server error. Please try again later.' });
//   }
// });



// module.exports = router;


const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');

// Register
router.post('/register', authController.register);

// Login
router.post('/login', authController.login);

module.exports = router;
