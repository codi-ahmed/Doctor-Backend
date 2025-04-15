const Doctors = require('../models/doctorsmodel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Secret key for JWT (store this securely in environment variables)
const JWT_SECRET = 'your_secret_key';

// Register Doctor function
const registerDoctor = async (req, res) => {
  const { name, specialization, experience, email, password, phone, availableDays } = req.body;

  // Check if doctor with the same email already exists
  const doctorExists = await Doctors.findOne({ email });
  if (doctorExists) {
    return res.status(400).json({ message: 'Doctor with this email already exists' });
  }

  try {
    // Create a new doctor document
    const newDoctor = new Doctors({
      name,
      specialization,
      experience,
      email,
      password,
      phone,
      availableDays
    });

    // Save the doctor (password will be hashed automatically by middleware)
    await newDoctor.save();

    // Generate a JWT token for the doctor after registration
    const token = jwt.sign({ userId: newDoctor._id, email: newDoctor.email }, JWT_SECRET, { expiresIn: '1h' });

    // Send response with token
    res.status(201).json({ message: 'Doctor registered successfully', token });
  } catch (error) {
    res.status(500).json({ message: 'Error registering doctor', error: error.message });
  }
};
// Login Doctor function
const loginDoctor = async (req, res) => {
    const { email, password } = req.body;
  
    try {
      // Check if the doctor exists
      const doctor = await Doctors.findOne({ email });
      if (!doctor) {
        return res.status(400).json({ message: 'Invalid email or password' });
      }
  
      // Compare the entered password with the stored hashed password
      const isPasswordValid = await doctor.matchPassword(password);
      if (!isPasswordValid) {
        return res.status(400).json({ message: 'Invalid email or password' });
      }
  
      // Generate a JWT token after successful login
      const token = jwt.sign({ userId: doctor._id, email: doctor.email }, JWT_SECRET, { expiresIn: '1h' });
  
      // Send response with token
      res.status(200).json({ message: 'Doctor logged in successfully', token });
    } catch (error) {
      res.status(500).json({ message: 'Error logging in doctor', error: error.message });
    }
  };
//get all doctor
  const getAllDoctors = async (req, res) => {
    try {
      const doctors = await Doctors.find();
      res.status(200).json(doctors);
    } catch (error) {
      res.status(500).json({error: "Server Error"});
    }
  };
  
  
  module.exports = { registerDoctor, loginDoctor , getAllDoctors };
  