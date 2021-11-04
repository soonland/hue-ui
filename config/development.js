module.exports = {
  basePath: '/',
  cors: {
    allowedHeaders: 'Origin, X-Requested-With, Content-Type, Accept, Correlation-Id, T-Session-Token',
    credentials: true,
  },
  api: {
    baseUrl: 'http://localhost:5000',
    endpoint: '/api',
  },
  be: {
    baseUrl: 'http://localhost:3000',
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
