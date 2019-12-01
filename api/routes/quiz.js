var router = express.Router()

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

router.get('/', user.auth(req, res, next), quiz.getDashboard(req, res));
router.post('/create', user.auth(req, res, next), quiz.createQuiz(req, res));
router.get('/question', user.auth(req, res, next), quiz.getQuestion(req,res));
router.post('/question', user.auth(req, res, next), quiz.saveQuestion(req, res));
router.post('/addDomain', user.auth(req, res, next), quiz.addDomainQuestions(req, res));
router.post('/submit', user.auth(req, res, next), quiz.submitQuiz(req, res));

module.exports = router
