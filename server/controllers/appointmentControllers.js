
const Appointment = require('../models/appointmentmodel')

const saveAppointment = async (req,res) => {
    const {name,
        patientname,
        patientnumber,
        patientemail,
        day,
        time
    } = req.body;

    try {
        const newAppointment = new Appointment({
            name,
        patientname,
        patientnumber,
        patientemail,
        day,
        time
        })

        await newAppointment.save();

        res.status(201).json({ message: 'Appointment book successfully'});
    } catch (error) {
        res.status(500).json({ message: 'Error registering doctor', error: error.message });
    }

};

const getAppointment = async (req, res) => {
    const { email } = req.query; 
  
    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }
  
    try {
      
      const appointments = await Appointment.find({ patientemail: email });
  
      if (appointments.length === 0) {
        return res.status(404).json({ message: "No appointments found for this customer" });
      }
  
      res.status(200).json(appointments);
    } catch (error) {
      res.status(500).json({ error: "Server Error" });
    }
  };

module.exports = {saveAppointment , getAppointment};