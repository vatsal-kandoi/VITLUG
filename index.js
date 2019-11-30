let express = require('express');
let helmet = require('helmet');
let compression = require('compression');
let bodyParser = require('body-parser');
let cookieParser = require('cookie-parser');

let app = express();

app.use(bodyParser());
app.use(cookieParser());
app.use(helmet());
app.use(compression());


/** Render views */

/** Routing */

module.exports = app;