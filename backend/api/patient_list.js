const router = require('express').Router();
const  Mongoose = require('mongoose');
let Doctor = require('../models/doctors');
const appointment = require('../models/appointment')
const patient = require('../models/patient');
const authenticateToken = require('../authenticateToken');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const user = require('../models/Usermodel')
const JWT_SECRET = "c7b6279efb87ef30afcc4e403e2ab580eb02f2f15e51ee0259b5114c9b6c35d0f93222085d0f32df0c6c498867b02c137ecd4921f2434b87a9d3c7f36077e0d1";


router.route('/patient').post((req, res) => {
    const patientApp = new patient({
        id: req.body.id,
        Fname: req.body.Fname,
        Lname: req.body.Lname,
        Address: req.body.Address,
        Phone: req.body.Phone,
        Postcode: req.body.Postcode,
        City: req.body.City,
        Insurance: {
            insuranceProvider: req.body.insuranceProvider,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            address: req.body.address,
            birthDate: req.body.birthDate,
            startDate: req.body.startDate,
            expiryDate: req.body.expiryDate,
            insuranceNumber: req.body.insuranceNumber,
            cardNumber: req.body.cardNumber,
            identificationNumberOfCarrier: req.body.identificationNumberOfCarrier
        },
        Country: req.body.Country,
    });
    patientApp.save()
    .then((response) => {
        res.status(200).json(response)
        console.log("Patient Added")
        })
        .catch((e) => {
            console.log(e)
        })

})

router.post("/patient/login", async (req, res) => {
    const { username, password } = req.body;
    const User = await user.findOne({ username }).lean();
  
    if (!User) {
      return res.json({ status: "error", error: "Invalid username/password" });
    }
  
    if (await bcrypt.compare(password, User.password)) {
      const token = jwt.sign(
        {
          id: User.id,
          username: User.username,
        },
        JWT_SECRET
      );
  
      return res.json({ status: "ok", acesstoken: token });
    }
  
    res.json({ status: "error", data: "Invalid username/password" });
  });

  router.post("/user", async (req, res) => {
    const { username, email, password,iid,account_type } = req.body;
  
    // if (!username || typeof username !== "string") {
    //   return res.json({
    //     status: "error",
    //     error: "Invalid username",
    //   });
    // }
  
    // if (!email || typeof email !== "string") {
    //   return res.json({
    //     status: "error",
    //     error: "Invalid email",
    //   });
    // }
  
    // if (email.includes("@") !== true) {
    //   return res.json({
    //     status: "error",
    //     error: "Invalid email. Should contain @",
    //   });
    // }
  
    // if (email.includes(".com") !== true) {
    //   return res.json({
    //     status: "error",
    //     error: "Invalid email. Should contain .com",
    //   });
    // }
  
    // if (!plaintextpassword || typeof plaintextpassword !== "string") {
    //   return res.json({
    //     status: "error",
    //     error: "Invalid password",
    //   });
    // }
  
    // if (plaintextpassword.length < 7) {
    //   return res.json({
    //     status: "error",
    //     error: "Password too small. Min length should be 7",
    //   });
    // }
    // const password = await bcrypt.hash(plaintextpassword, 12);
  
    try {
      const response = await user.create({
        username,
        email,
        password,
        iid,
        account_type
      });
      console.log("User created successfully", response);
    } catch (error) {
      if (error.code == 11000) {
        return res.json({ status: "error", error: "Username already in use" });
      }
      throw error;
    }
  
    res.json({ status: "ok" });
  });

module.exports = router;