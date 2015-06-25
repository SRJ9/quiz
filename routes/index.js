var express = require('express');
var router = express.Router();

var quizController = require('../controllers/quiz_controller');

router.param('quizId', quizController.load); // autoload: quizId
/* GET home page. */
router.get('/', quizController.index);
//router.get('/question', quizController.question);
router.get('/quizes', quizController.index);
router.get('/quizes/:quizId(\\d+)', quizController.show);
router.get('/quizes/:quizId(\\d+)/answer', quizController.answer);
//router.get('/answer', quizController.answer);
router.get('/author', quizController.author);

module.exports = router;
