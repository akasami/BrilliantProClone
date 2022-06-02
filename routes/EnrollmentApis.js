const { Router } = require("express");
const express = require("express");
const res = require("express/lib/response");
const router = express.Router();
const mongoose = require("mongoose");
const Enrollment = require("../models/enrollment");
require("../config/dbconfig");

// Admin can add learners to courses.
router.route("/add").post(async (req, resp) => {
    try {
        console.log("Route~Enrollment/add");    
        console.table(req.body);

        Enrollment.init();
        const setid = new mongoose.Types.ObjectId();

        // create a date object of current date
        const date = new Date();
        const issueDate = date.toISOString();


        const enrollmentdata = new Enrollment({
            _id: setid,
            courseid: req.body.courseid,
            learnerid: req.body.learnerid,
            startdate: issueDate
        });

        let result = await enrollmentdata.save();

        if (result == null) {
            resp.status(201).send("Enrollment not added");
        } else {
            resp.status(200).json(result);
        }
    } catch (err) {
        console.warn(err);
        resp.status(404).json("Err"); // Sending res to client some err occured.
    }
}
);

// How many learners are enrolled in the course
router.route("/getenrolledlearnercount/:courseid").get(async (req, resp) => {
    try {
        console.log("Route~Enrollment/get");
        console.table(req.body);

        // regex to check if the id is valid
        const reg = /^[0-9a-fA-F]{24}$/;
        if (!reg.test(req.params.courseid)) {
            resp.status(400).send("Invalid id");
        }

        let result = await Enrollment.find({ courseid: req.params.courseid }).count();

        if (result == null) {
            resp.status(201).send("Enrollment not found");
        } else {
            resp.status(200).json(result);
        }
    } catch (err) {
        console.warn(err);

        resp.status(404).json("Err"); // Sending res to client some err occured.
    }
}
);


// How many learners started the course
router.route("/getcourseprogress/:courseid").get(async (req, resp) => {
    try {
        console.log("Route~Enrollment/get");
        console.table(req.body);

        // regex to check if the id is valid
        const reg = /^[0-9a-fA-F]{24}$/;
        if (!reg.test(req.params.courseid)) {
            resp.status(400).send("Invalid id");
        }

        // create a find query to get all the enrollments for the course and where progress is greater than zero
        let result = await Enrollment.find({ courseid: req.params.courseid, progress: { $gt: 0 } }).count();
        //let result = await Enrollment.find({ courseid: req.params.courseid }).count();

        if (result == null) {
            resp.status(201).send("Enrollment not found");
        } else {
            resp.status(200).json(result);
        }
    } catch (err) {
        console.warn(err);

        resp.status(404).json("Err"); // Sending res to client some err occured.
    }
}
);

// How many learners are in the middle of course (achieved 50% progress)
router.route("/getcourseprogress50/:courseid").get(async (req, resp) => {
    try {
        console.log("Route~Enrollment/get");
        console.table(req.body);

        // regex to check if the id is valid
        const reg = /^[0-9a-fA-F]{24}$/;
        if (!reg.test(req.params.courseid)) {
            resp.status(400).send("Invalid id");
        }

        // create a find query to get all the enrollments for the course and where progress is greater than zero
        let result = await Enrollment.find({ courseid: req.params.courseid, progress: { $gt: 50 } }).count();
        //let result = await Enrollment.find({ courseid: req.params.courseid }).count();

        if (result == null) {
            resp.status(201).send("Enrollment not found");
        } else {
            resp.status(200).json(result);
        }
    } catch (err) {
        console.warn(err);

        resp.status(404).json("Err"); // Sending res to client some err occured.
    }
}
);

// How many learned are passed and failed.
router.route("/getpassedlearner/:courseid").get(async (req, resp) => {
    try {
        console.log("Route~Enrollment/getlearnerevaluation");
        console.table(req.body);

        // regex to check if the id is valid
        const reg = /^[0-9a-fA-F]{24}$/;
        if (!reg.test(req.params.courseid)) {
            resp.status(400).send("Invalid id");
        }

        // create a find query to get all the enrollments for the course and where progress is greater than zero
        let result = await Enrollment.find({ courseid: req.params.courseid, status: "pass" }).count();
        
        //let result = await Enrollment.find({ courseid: req.params.courseid }).count();

        if (result == null) {
            resp.status(201).send("Enrollment not found");
        } else {
            resp.status(200).json(result);
        }
    } catch (err) {
        console.warn(err);

        resp.status(404).json("Err"); // Sending res to client some err occured.
    }
}
);


module.exports = router;
