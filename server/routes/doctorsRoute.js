const express = require('express');
const router = express.Router();
const {registerDoctor , loginDoctor ,getAllDoctors} = require('../controllers/doctorsControllers');


router.post('/register' , registerDoctor);
router.post('/login' , loginDoctor );
router.get('/' , getAllDoctors);
module.exports = router;