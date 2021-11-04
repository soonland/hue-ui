const express = require('express');
// const bodyParser = require('body-parser');
// const morgan = require('morgan');
const path = require('path');
// const cors = require('cors');
const logger = require('./logger');
// const { auth, failureRedirect } = require('./auth');
// const permit = require('./routes/permit');

const DIST = path.resolve(__dirname, '../');
const server = express();

server.get('/version', (req, res) => {
  res.status(200).send('Version: 1');
});

// server.use(cors());
// server.use(bodyParser.json());
// server.use(bodyParser.urlencoded({ extended: true }));
// server.use(morgan(':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] :response-time ms'));

server.use(express.static(DIST));
server.get('*', (req, res) => res.sendFile(path.join(DIST, '/index.html')));

server.use((err, req, res, next) => {
  // logger.info(`[FATAL] ${JSON.stringify(err)}`);
  next(err);
});

const PORT = 8080;
server.listen(PORT, () => {
  logger.info(`App listening on port ${PORT}!`);
});
