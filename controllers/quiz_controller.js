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
		res.render('quizes/index', {quizes: quizes, search: search_org, errors: []});
	}).catch(function(error){
		next(error);
	})
	
}

// GET /quizes/question
exports.show = function(req, res){
	res.render('quizes/show', {quiz: req.quiz, errors: []});
}

// GET /quizes/answer
exports.answer = function(req, res){
	var resultado = 'Incorrecto';
	if(req.query.respuesta === req.quiz.respuesta){
		resultado = 'Correcto';
	}
	res.render('quizes/answer', {quiz: req.quiz, respuesta: resultado, errors: []});
	
}

exports.new = function(req, res){
	var quiz = models.Quiz.build(
		{pregunta: "Pregunta", respuesta: "Respuesta"}
	);

	res.render('quizes/new', {quiz: quiz, errors: []});
}

exports.create = function(req, res){
	var quiz = models.Quiz.build(req.body.quiz);

	quiz.validate().then(function(err){
		if(err){
			res.render('quizes/new', {
				quiz: quiz, errors: err.errors
			})
		} else {
			quiz.save({fields: ["pregunta", "respuesta"]})
			.then(function(){
				res.redirect('/quizes');		
			})
		}
	})
}

exports.update = function(req, res){
	req.quiz.pregunta = req.body.quiz.pregunta;
	req.quiz.respuesta = req.body.quiz.respuesta;

	req.quiz.validate().then(function(err){
		if(err){
			res.render('/quizes/edit', {
				quiz: req.quiz, errors: err.errors
			})
		} else {
			req.quiz.save({fields: ["pregunta", "respuesta"]})
			.then(function(){
				res.redirect('/quizes');		
			})
		}
	})
}

exports.edit = function(req, res){
	var quiz = req.quiz;

	res.render('quizes/edit', {quiz: quiz, errors: []});
}

exports.delete = function(req, res){
	req.quiz.destroy().then(function(){
		res.redirect('/quizes');
	}).catch(function(error){
		next(error);
	})
}

exports.author = function(req, res){
	res.render('quizes/author', {nombre: 'José', apellidos: 'Escobar Ramírez', foto: '/images/profile.png'})
}