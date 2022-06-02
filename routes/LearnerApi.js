const { Router } = require('express');
const express = require('express');
const res = require('express/lib/response');
const router = express.Router();
const mongoose = require('mongoose');
const Learner = require('../models/learner');
require('../config/dbconfig');


router.route("/add").post(async(req,resp)=>{

    try {
        console.log("api targetted")
        console.table(req.body)

        Learner.init()
        const setid = new mongoose.Types.ObjectId();
       
        const learnerdata = new Learner({
         _id: setid,
         name:  req.body.name
        });
        //console.table(appointmentdata);

        let result = await learnerdata.save(); 
        
        resp.status(200).json(result)
        //console.table(result);

    } catch(err){
        console.warn(err);
        resp.status(404).json("Err") // Sending res to client some err occured.
    }
})


module.exports = router;