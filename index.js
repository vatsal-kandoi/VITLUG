let express = require('express');
let helmet = require('helmet');
let compression = require('compression');
let bodyParser = require('body-parser');
let cookieParser = require('cookie-parser');

/** Importing routers */
let authRouter = require('./api/routes/auth');
let quizRouter = require('./api/routes/quiz');
let userRouter = require('./api/routes/user');
let adminRouter = require('./api/routes/admin');

let user = require('./api/controllers/auth');

let adminAuth = require('./api/controllers/adminAuth.js');

let app = express();

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());
app.set('view engine', 'ejs');
app.use('/assets',express.static('assets'));

app.use(cookieParser());
app.use(helmet());
app.use(compression());

app.get('/', user.authHome);

/** Render views */
app.get('/admin', adminAuth.home);
app.get('/admin/dashboard', adminAuth.general, (req, res) => {
    res.render('admin/admindashboard');
})
app.get('/admin/dashboard/quiz', adminAuth.general, (req, res) => {
    res.render('admin/checking');
})

/** Routing */
app.use('/api/auth', authRouter);
app.use('/api/quiz', quizRouter);
app.use('/api/user', userRouter)
app.use('/api/admin', adminRouter);

app.get('*', (req, res) => {
    res.render('404');
})

module.exports = app;