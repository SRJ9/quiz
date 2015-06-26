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
	var where_obj = {};
	var search_org = '';
	if(req.query.search){
		var search_org = req.query.search;
		var search = '%' + search_org.replace(/ /g, '%') + '%';
		var where_obj = {where: ["pregunta like ?", search]};

	}
	models.Quiz.findAll(where_obj).then(function(quizes){
		res.render('quizes/index', {quizes: quizes, search: search_org});
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