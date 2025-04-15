const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  patientname:{
    type:String,
    required: true,
  },
  patientnumber:{
    type:String,
    required:true,
  },
  patientemail:{
    type: String,
    required: true,
  },
  day:{
    type: String,
    required:true,
  },
  time:{
    type: String,
    required: true,
  },

});

const Appointment = mongoose.model("appointment", appointmentSchema);
module.exports = Appointment;
