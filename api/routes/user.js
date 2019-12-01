var router = require('express').Router()

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

router.get('/status', user.auth, functions.selected);

module.exports = router
