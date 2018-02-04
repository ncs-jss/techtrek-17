var express = require('express');
var router = express.Router();
var User = require('../Models/userInfo.js');



router.get('/levelStats', function(req, res) {
  if (req.session.admin && req.session.admin == 'admin')
    User.aggregate([{ $group: { _id: '$level', total: { $sum: 1 } } }, { $sort: { total: -1 } }]).exec(function(err, result) {
      if (err)
        return res.send(err);
      return res.send(result);
    });
  else
    res.redirect('/adminLogin');
});

module.exports = router;
