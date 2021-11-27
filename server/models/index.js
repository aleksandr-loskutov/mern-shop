const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.users = require("./user");
db.categories = require("./category");
db.products = require("./product");

module.exports = db;
