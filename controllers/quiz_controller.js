var models = require('../models/models.js');

exports.load = function(req, res, next, quizId){
	models.Quiz.findById(quizId).then(
		function(quiz){
			if(quiz){
				req.quiz = quiz;
				next();
			} else {
				next(new Error('No existe quizId=' + quizId));
			}
		}).catch(function(error){
			next(error);
		})
}

exports.index = function(req, res){
	models.Quiz.findAll().then(function(quizes){
		res.render('quizes/index', {quizes: quizes});
	}).catch(function(error){
		next(error);
	})
	
}

// GET /quizes/question
exports.show = function(req, res){
	res.render('quizes/show', {quiz: req.quiz});
}

// GET /quizes/answer
exports.answer = function(req, res){
	var resultado = 'Incorrecto';
	if(req.query.respuesta === req.quiz.respuesta){
		resultado = 'Correcto';
	}
	res.render('quizes/answer', {quiz: req.quiz, respuesta: resultado});
	
}

exports.author = function(req, res){
	res.render('quizes/author', {nombre: 'José', apellidos: 'Escobar Ramírez', foto: '/images/profile.png'})
}