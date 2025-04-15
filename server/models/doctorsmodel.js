// import mongoose and bcrypt
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

// create schema
const doctorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  specialization: {
    type: String,
    required: true,
  },
  experience: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
  },
  availableDays: {
    type: String,
  },
});

// 🔐 Middleware: Hash password before saving
doctorSchema.pre("save", async function (next) {
  // only hash if password is modified or new
  if (!this.isModified("password")) return next();

  try {
    const salt = await bcrypt.genSalt(10); // 10 rounds is good default
    this.password = await bcrypt.hash(this.password, salt); // hashed password replaces original
    next();
  } catch (err) {
    next(err);
  }
});

// 🔐 Method to compare password during login
doctorSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// export model
const Doctor = mongoose.model("Doctor", doctorSchema);
module.exports = Doctor;
