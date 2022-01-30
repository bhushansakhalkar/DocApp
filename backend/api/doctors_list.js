const router = require('express').Router();
let Doctor = require('../models/doctors');

router.route('/').get((req,res)=>{
    Doctor.find()
    .then(doc=> res.json(doc))
    .catch(err=> res.status(400).json('Error: ' + err) )
});

router.route('/doctordetails/:id').get((req,res)=>{
    Doctor.findById(req.params.id)
    .then(doc=> res.json(doc))
})

router.route('/doctordetails/slots/').post((req,res)=>{
    console.log(req.body.id)
    console.log(req.body.day)
    console.log(req.body.week)

    Doctor.find({"_id":req.body.id},{"weeks.timeslots":1})
    .then((doc) => {
        let d = req.body.day
        let w = req.body.week
        console.log(doc[0].weeks[w][d].timeslots)
        sdata = doc[0].weeks[w][d].timeslots
        res.json(sdata)
        // console.log(res)

        // console.log(doc.weeks.week1[0].timeslots)
    })
})


router.route('/update/:id').put((req,res)=>{
    const id = req.params.id;
    const Fname = req.body.Fname;
    const Lname = req.body.Lname;
    const Address = req.body.Address;
    const License = req.body.License;
    const Specialization = req.body.Specialization;
    const Phone = req.body.Phone;
    const Postcode = req.body.Postcode;
    const City = req.body.City;
    const Qualification = req.body.Qualification;
    const weeks = req.body.weeks;

    const NewDoc = {
        Fname,
        Lname,
        Address,
        License,
        Specialization,
        Phone,
        Postcode,
        City,
        Qualification,
        weeks
    };

    Doctor.findByIdAndUpdate(id,NewDoc)
    .then(()=>{
        res.json("Updated Successfully")
        
    })
    .catch(e=>console.log(e))
})


router.route('/add/').post((req,res)=>{
    const Fname = req.body.Fname;
    const Lname = req.body.Lname;
    const Address = req.body.Address;
    const License = req.body.License;
    const Specialization = req.body.Specialization;
    const Phone = req.body.Phone;
    const Postcode = req.body.Postcode;
    const City = req.body.City;
    const Qualification = req.body.Qualification;
    const weeks = req.body.weeks;
    
    const Doc = new Doctor({
        Fname,
        Lname,
        Address,
        License,
        Specialization,
        Phone,
        Postcode,
        City,
        Qualification,
        weeks
    });
    Doc.save()
    .then(()=>{
        res.json('Doctor Added')
        console.log(res.data)
    })
    .catch(e=>{
        console.log(e)
    })

})

module.exports = router;

// days:[{
//     day:{type:Number},
//     available:{type:String},
//     starttime:{type:String},
//     endtime:{type:String},
//     timeslots:[{
//         timeslotflag:{type:String}
        
//     }]
