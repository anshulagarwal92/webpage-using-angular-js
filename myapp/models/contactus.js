var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Contact = new Schema({
    "name":String,
    "email1":String,
    "comment":String,
});
var contact = mongoose.model('Contact', Contact);
module.exports = contact;