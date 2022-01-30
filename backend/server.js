
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser')
const app = express();
const port = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

const Insurance = require('./api/insurance');
const doctorList = require('./api/doctors_list');

app.use('/api/doctor',doctorList);
app.use('/api/insurance',Insurance)
// app.use('/insurance')
app.listen(port, ()=>{
    console.log("Server is running on port : "+ port);
})