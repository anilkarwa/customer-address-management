require('dotenv').config();

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
var fs = require('fs-extra');
var path = require('path');

const app = express();

//allow cors
app.use(cors());
app.options('*', cors());
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  next();
});


// parse requests of content-type - application/json
app.use(bodyParser.json({ limit: '20mb' }));
app.use(bodyParser.urlencoded({ extended: false }));

const db = require("./models");

db.mongoose
  .connect(process.env.MONGODB_URI, {
    useFindAndModify: false,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("Successfully connect to MongoDB.");
  })
  .catch(err => {
    console.error("Connection error", err);
    process.exit();
  });


var moduleFiles = fs.readdirSync(path.join(__dirname, '/controllers'));
for (var i = 0; i < moduleFiles.length; i++) {
  var controller_loc = path.join(__dirname, '/controllers/');
  var controller_files = fs.readdirSync(controller_loc);
  controller_files.forEach(function (file) {
    var fileName = file.split('.');
    var modelData = fileName[1];
    if (modelData == 'controller') {
      return (require(controller_loc + '/' + file))(app);
    }
  });
}

var moduleFiles = fs.readdirSync(path.join(__dirname, '/routes'));
for (var i = 0; i < moduleFiles.length; i++) {
  var route_loc = path.join(__dirname, '/routes/');
  var route_files = fs.readdirSync(route_loc);
  route_files.forEach(function (file) {
    var fileName = file.split('.');
    var modelData = fileName[1];
    if (modelData == 'route') {
      return (require(route_loc + '/' + file))(app);
    }
  });
}



// set port, listen for requests
const PORT = process.env.PORT || 80;
// Start the Server
app.listen(PORT, function () {
  console.log('start server on', PORT)
});
