let { createLogger, format, transports } = require('winston');
let { combine, timestamp, label, printf } = format;
 
let logger = createLogger({
    format: combine(
        timestamp(),
        prettyPrint()
    ),
    transports: [
      new winston.transports.Console(),
      new winston.transports.File({ filename: 'combined.log' }),
      new winston.transports.File({
        filename: 'error.log',
        level: 'error'
      })
    ]
});

module.exports = logger;

/** Logging command

logger.log({
    level: 'info',
    message: 'What time is the testing at?'
});

**/