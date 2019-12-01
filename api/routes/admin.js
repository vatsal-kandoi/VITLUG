var router = express.Router()

var logger = require('../../utils/logger')
var token = require('../../utils/createToken');

let admin = require('../controllers/admin');
let question = require('../controllers/questions');

router.use(function timeLog (req, res, next) {
    logger.log({
        level: 'info',
        message: `ACCESS: ${req.req.originalUrl}`
    });
    next()
})

router.post('/', (req, res) => {
    if (req.body.username == 'admin' && req.body.password == process.env.PASSWORD) {
        token.generate('admin').then((result) => {
            res.header('X-Auth-Token', result);
            res.cookie('VITLUG',result,{ expires: new Date(Date.now() + 60*60*1000), httpOnly: true });
            return res.json({
                code: 200,
                regno: 'admin'
            });  
        })
        .catch((err) => {
            return res.json({
                code: 500,
                message: 'Error creating token'
            });
        });
    } else {
        return res.json({
            message: 'Enter correct combination',
            code: 500
        }); 
    }
});
router.use('/quiz' ,(req, res, next) => {
    let jwttoken = req.cookies['VITLUG'];
    if (jwttoken == undefined) {
        return res.json({
            code: 500,
            message: 'Please signin'
        });
    }
    token.verify(jwttoken).then((result) => {
        if (result.code !== 200 || result.expired == true || result.regno !== 'admin') {
            return res.json({
                code: 500,
                message: 'Please login to your account'
            });
        }
        req.body.access = 'admin';
        next();
    }).catch((err) => {
        return res.json({
            code: 500,
            message: 'Please login to your account'
        });
    });
})

router.get('/quiz', admin.getQuiz(req, res));
router.post('/quiz', admin.gradeQuiz(req, res));
router.post('/quiz/selection', admin.selectUser(req, res));
router.post('/quiz/question', question.add(req, res));

module.exports = router
