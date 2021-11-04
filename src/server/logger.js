const winston = require('winston');
// const config = require('./config');

const logger = winston.createLogger({
  transports: [
    new winston.transports.Console({
      prettyPrint: true,
      level: 'debug',
      stringify: false,
      humanReadableUnhandledException: true,
      json: true,
      colorize: true,
      timestamp: true,
    }),
  ],
});

module.exports = logger;
