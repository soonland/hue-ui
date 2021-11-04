module.exports = {
  basePath: '/',
  cors: {
    allowedHeaders: 'Origin, X-Requested-With, Content-Type, Accept, Correlation-Id, T-Session-Token',
    credentials: true,
  },
  api: {
    baseUrl: 'http://35.203.39.55',
    endpoint: '/api',
  },
  be: {
    baseUrl: 'http://35.203.88.208',
    endpoint: '/api',
  },
  logging: {
    prettyPrint: false,
    level: 'debug',
    stringify: false,
    humanReadableUnhandledException: false,
    json: true,
    colorize: false,
    timestamp: true,
  },
  debug: true,
};
