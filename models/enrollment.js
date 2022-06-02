// create Enrollment Schema
const mongoose = require('mongoose');   
const { required } = require('nodemon/lib/config');

const EnrollmentSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    courseid: { type: String, required: true },
    learnerid: { type: String, required: true },
    status: { type: String, default: 'inactive' }, // status if started or not
    startdate: { type: String, required: true },
    enddate: { type: String, required: true },
    progress: { type: Number, default: 0 }, // progress of the course
    certificate: { type: String, required: true }, // certificate of the course
    certificateurl: { type: String, required: true }, // certificate url of the course
    certificateid: { type: String, required: true }, // certificate id of the course
    
});




module.exports = mongoose.model('enrollments',EnrollmentSchema);