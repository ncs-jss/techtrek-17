var shortid = require('shortid');
var mongoose = require('mongoose');
var Schema = mongoose.Schema



var referenceSchema = new Schema({
state : { type : Boolean, default : true },	// true --means it can be used || false --means it is already used
referenceNumber : {type : String, unique :true , default:shortid.generate }
});


var reference =  mongoose.model('Reference' , referenceSchema);
module.exports = reference;