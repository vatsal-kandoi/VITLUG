var router = require('express').Router()

var logger = require('../../utils/logger')
var user = require('../controllers/auth');

router.use(function timeLog (req, res, next) {
    logger.log({
        level: 'info',
        message: `ACCESS: ${req.req.originalUrl}`
    });
    next()
})

router.post('/login', user.login);
router.post('/signup', user.signup);

module.exports = router
