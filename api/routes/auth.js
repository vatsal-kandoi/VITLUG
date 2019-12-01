var router = express.Router()

var logger = require('../../utils/logger')
var user = require('../controllers/auth');

router.use(function timeLog (req, res, next) {
    logger.log({
        level: 'info',
        message: `ACCESS: ${req.req.originalUrl}`
    });
    next()
})

router.post('/login', user.login(req, res));
router.signup('/signup', user.signup(req, res));

module.exports = router
