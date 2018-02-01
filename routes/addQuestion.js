var express = require ('express');
var router = express.Router();
var Question = require('../Models/question.js');
var crypto = require('crypto');

router.post('/addQuestion', function(req, res) {
	// Check Session.
	// parsing value from req.body object
	var question = req.body.question;
	var level =  req.body.level;
	var techAnswer = "";
	var nonTechAnswer = "";
	if(process.env.HASH === 'YES') {
		techAnswer = crypto.createHash('md5').update(req.body.techAnswer).digest('hex');
		nonTechAnswer = crypto.createHash('md5').update(req.body.nonTechAnswer).digest('hex');
	} else {
		techAnswer = req.body.techAnswer;
		nonTechAnswer = req.body.nonTechAnswer;
	}
	console.log(techAnswer);
	var hint = req.body.hint;
	//validate data here

	// Creating model named Question.
	var newQuestion = new Question({
		'question' : question,
		'level' : level,
		'technicalAnswer' : techAnswer,
		'nonTechnicalAnswer' : nonTechAnswer,
		'hint' : hint
	});

	newQuestion.save(function(err){
		if(err)
			return console.log(err);
		return res.send('data saved');
	});
});

module.exports = router;
