const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const session = require('express-session');
const KnexSessionStore = require('connect-session-knex')(session);
// returns a function that returns a constructor function when session passed

const authRouter = require('../auth/auth-router.js');
const usersRouter = require('../users/users-router.js');
const configuredKnex = require('../database/dbConfig.js');
const server = express();

const sessionConfig = {
  name: 'monster',
  secret: 'keep it secret, keep it safe!',
  cookie: {
    maxAge: 1000 * 60 * 10, // ms
    secure: false, // use cookie over https
    httpOnly: true // can JS access the cookie on the client
  },
  resave: false, // avoid recreating existing sessions
  saveUninitialized: false, // GDPR compliance
  store: new KnexSessionStore({
    knex: configuredKnex,
    tablename: 'sessions',
    sidfieldname: 'sid',
    createtable: true,
    clearInterval: 1000 * 60 * 30 // delete expired sessions
  })
};

server.use(helmet());
server.use(express.json());
server.use(cors());
server.use(session(sessionConfig));

server.use('/api/auth', authRouter);
server.use('/api/users', usersRouter);

server.get('/', (req, res) => {
  res.send("It's alive!");
});

module.exports = server;
