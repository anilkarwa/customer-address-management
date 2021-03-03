const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.customer = require("./customer.model");
db.addresses = require("./addresses.model");


module.exports = db;