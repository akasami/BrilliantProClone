// Including the Express Server
const express = require('express');
const app = express();
// Including cors
const cors = require("cors"); 
// Server Usage
app.use(express.json());
app.use(cors());



// Connecting to the MongoDb Atlas database
require('./config/dbconfig');

// Importing All Router Api's
var LearnerApis = require('./routes/LearnerApi');


// Routed Api
app.use('/learners',LearnerApis);


// listening @ 5000 port
app.listen(5000);