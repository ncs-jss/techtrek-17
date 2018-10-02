var express = require('express');
var router = express.Router();
var Reference = require('../Models/reference.js')


router.post('/generateMultipleReference', function(req, res) {
    if (req.session.admin && req.session.admin == "admin") {
        var i = 0;
        var resArray = [];
        var count = parseInt(req.body.count); //users in an array of mixed types  {email : string, trekreg_ID: number}
        console.log(count);
        for (i = 0; i < count; i++) {
            console.log(count);
            var newReference = new Reference({
                state: true,

            });
            // console.log("the new user registered is : " + newReference);
            resArray.push(newReference);
            newReference.save(function(err) {
                if (!err) {
                    console.log(newReference);
                } else {
                    console.log("Duplicate email_ID or trekreg_ID at generate multiple "+ err);
                    //return res.send("try new email_ID")
                }

            });
        }
        res.send({ valid: 1, data: resArray });
    }
    else res.send({valid : 0, redirect : '/admin'});
});



module.exports = router;
