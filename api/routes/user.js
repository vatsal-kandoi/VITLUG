var router = express.Router()

var logger = require('../../utils/logger')

var user = require('../controllers/auth');
var functions = require('../controllers/userFunctions');

router.use(function timeLog (req, res, next) {
    logger.log({
        level: 'info',
        message: `ACCESS: ${req.req.originalUrl}`
    });
    next()
})

router.get('/status', user.auth(req, res, next), functions.selected(req, res));

module.exports = router
