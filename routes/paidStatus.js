var express = require('express');
var router = express.Router();
var User = require('../Models/userInfo.js');
var Reference = require('../Models/reference.js')
var ObjectID = require('mongoose').Types.ObjectId;


router.post('/paidStatus', function(req, res) {
  if(req.session.admin && req.session.admin == 'admin'){
    var id=req.body.id;
    User.updateOne({_id:id},{$set:{'paidStatus':true}}).then(function(user){
      return res.send({status:"success"});
    }).catch(function(e){
      return res.send({status:"failed"});
    });
  }
  else
    res.redirect('/adminLogin');
  });

module.exports = router;