const Patient = require('../models/patientsmodel');
const jwt = require('jsonwebtoken');

// Secret key for JWT (store this securely in environment variables)
const JWT_SECRET = process.env.JWT_SECRET || 'your_secret_key';

// ✅ Register customer
const registerPatient = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if the patient already exists
    const existingPatient = await Patient.findOne({ email });
    if (existingPatient) {
      return res.status(400).json({ message: "Patient already exists" });
    }

    // Create a new patient (no need to manually hash the password, schema does that for you)
    const newPatient = new Patient({ name, email, password });  // Simply passing the raw password

    await newPatient.save();

    // Generate JWT token
    const token = jwt.sign({ id: newPatient._id }, JWT_SECRET, { expiresIn: '1d' });

    // Respond with the patient data and token
    res.status(201).json({
      message: 'Patient registered successfully',
      token,
      customer: {
        id: newPatient._id,
        name: newPatient.name,
        email: newPatient.email
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Something went wrong' });
  }
};

// ✅ Login customer
const loginPatient = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if the patient exists in the database
    const patient = await Patient.findOne({ email });
    if (!patient) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Use the matchPassword method defined in the schema to check the password
    const isMatch = await patient.matchPassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign({ id: patient._id }, JWT_SECRET, { expiresIn: '1d' });

    // Send response with the token and patient data
    res.status(200).json({
      message: 'Login successful',
      token,
      customer: {
        id: patient._id,
        name: patient.name,
        email: patient.email
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Something went wrong' });
  }
};






const getCustomerProfile = async (req, res) => {
  try {
   
    const customerId = req.customer.id;  

   
    const patient = await Patient.findById(customerId);
    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }

   
    res.status(200).json({
      id: patient._id,
      name: patient.name,
      email: patient.email
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Something went wrong' });
  }
};

module.exports = { registerPatient, loginPatient, getCustomerProfile };

