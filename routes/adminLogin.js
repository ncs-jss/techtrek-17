require('dotenv').config();
var express = require('express');
var router = express.Router();
//var User = require('../Models/userInfo.js');


/* GET users listing. */
router.post('/adminLogin', function(req, res, next) {

  if(req.session.admin == "admin")
    return res.send({'valid' : 1, 'redirect' : '/admin'});
  var id =  req.body.id;
  var password = req.body.password;
//  console.log(password);
var user = process.env.ADMIN_USER;
var pass = process.env.ADMIN_PASS;
user="ncs2018@gmail.com"
pass="ncs2018";
  if (id == user && password == pass){
   req.session.admin = "admin";
	 return res.send({'valid' : 1, 'redirect' : '/admin'});
  }
  
	res.send({ valid : 0});	
});


module.exports = router;
