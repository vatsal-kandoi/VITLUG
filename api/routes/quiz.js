var router = require('express').Router()
var logger = require('../../utils/logger')
var quiz = require('../controllers/userFunctions');
var user = require('../controllers/auth');

router.use(function timeLog (req, res, next) {
    logger.log({
        level: 'info',
        message: `ACCESS: ${req.req.originalUrl}`
    });
    next()
})

router.get('/', user.auth, quiz.getDashboard);
router.post('/create', user.auth, quiz.createQuiz);
router.get('/question', user.auth, quiz.getQuestion);
router.post('/question', user.auth, quiz.saveQuestion);
router.post('/addDomain', user.auth, quiz.addDomainQuestions);
router.post('/submit', user.auth, quiz.submitQuiz);

module.exports = router
