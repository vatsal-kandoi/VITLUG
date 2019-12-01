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

let app = express();

app.use(bodyParser());
app.use(cookieParser());
app.use(helmet());
app.use(compression());


/** Render views */

/** Routing */
app.use('/api/auth', authRouter);
app.use('/api/quiz', quizRouter);
app.use('/api/user', userRouter)
app.use('/api/admin', adminRouter);

app.get('*', (req, res) => {
    res.json({
        error: 404
    });
})

module.exports = app;