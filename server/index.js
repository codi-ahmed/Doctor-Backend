const express = require('express')
const cors = require('cors');
require('dotenv').config();
//import 
const doctorsRoute =  require('./routes/doctorsRoute');
const patientsRoute = require('./routes/patientsRoute')


//initialize
const app = express();
const port = process.env.PORT || 3000;
app.use(cors());
app.use(express.json());


//initialize mongodb
const connectDB = require('./config/db');
connectDB();

//routes 
app.use('/api/doctors' , doctorsRoute);
app.use('/api/customer', patientsRoute);


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})