var express = require('express');
var router = express.Router();
var User = require('../Models/userInfo.js');
var Reference = require('../Models/reference.js')
var ObjectID = require('mongoose').Types.ObjectId;


router.post('/register', function(req, res) {
  if(req.session.email && req.session.level)
    return res.send({valid :0,redirect :'/'});

      var email = req.body.email;
      var mobileNumber = req.body.mobileNumber;
      var password = req.body.password;
      var avatar =  req.body.avatar;
      var name = req.body.name;
      var year = req.body.year;
      var newUser = new User({
        'email_ID'  : email,
        'password'  : password,
        'name'  : name,
        'year' : year,
        'mobileNumber' : mobileNumber,
        'avatar' : avatar
      });
      newUser.save(function(err){
        if (err) {
          console.log(err)
          return res.send({valid : 0 , comment :"*try  another mobile Number", type:"mob"});
        }

        //session going to be saved
        // req.session.email = email;
        // req.session.level = 1;
        res.send({valid: 1, redirect :'/'});
      });
  });

module.exports = router;
