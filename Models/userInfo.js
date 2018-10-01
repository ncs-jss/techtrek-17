var mongoose = require('mongoose');
var autoIncrement = require('mongoose-auto-increment');
var Schema = mongoose.Schema
var ObjectID =  Schema.Types.ObjectId;
autoIncrement.initialize(mongoose.connection);

var userInfoSchema = new Schema({
	'email_ID' : { type : String, unique : true,  required : true },
	'password' : { type : String,  required : true },
	'name' : String,
	'year' : Number,
	'mobileNumber' : { type : String, unique : true,  required : true },
	'avatar' : { type : Number, default : 1 }, //out of 1 to 5.
	'score' : {type : Number, default : 0 },
	'level' : { type : Number, default : 1 },	//level of question he is going to attempt ; min = 1;
	//'questionAssigned' : [{ type : ObjectID , ref: questionAssigned }],
	'date' :  { type : Date, default : Date.now },
	'lastAttemptTime' : { type :Date },
	'badges' : [],
	'paidStatus':{type:Boolean,default:false}

});

userInfoSchema.plugin(autoIncrement.plugin, {
    model: 'User',
    field: 'userId',
    startAt: 1,
    incrementBy: 1
});

var userInfo = mongoose.model('User', userInfoSchema);
module.exports = userInfo;
