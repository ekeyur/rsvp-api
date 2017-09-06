const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const bluebird = require('bluebird');
const fileUpload = bluebird.promisifyAll(require("express-fileupload"));
const lineReader = require('line-reader');

// set up express app
const app = express();

//Connect to mongodb
mongoose.connect('mongodb://localhost/GuestRsvp');
mongoose.Promise = bluebird;

//FrontEnd Static middleware for public folder
app.use(express.static('public'));

//File Upload via express
app.use(fileUpload());

// Attach bodyParser middleware
app.use(bodyParser.json());


// Initialize Routes
app.use('/rsvp',require('./routes/api'));

//Error Handling middleware
app.use(function(err,req,res,next){
  res.status(422).send(err.message);
})


// Listen for request
app.listen(process.env.port || 4000,function(){
  console.log("Running on port 4000");
})
