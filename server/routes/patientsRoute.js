const express = require('express');
const router = express.Router();
const { registerPatient , loginPatient ,getCustomerProfile } = require('../controllers/patientsControllers');
const {getAppointment ,saveAppointment} = require('../controllers/appointmentControllers')

router.post('/register', registerPatient);
router.post('/login' , loginPatient );
router.get('/history', getAppointment);
router.get('/patients/profile', getCustomerProfile);
router.post('/create' , saveAppointment);

module.exports = router;