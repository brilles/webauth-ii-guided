const session = require('express-session');
const KnexSessionStore = require('connect-session-knex')(session);
// returns a function that returns a constructor function when session passed

module.exports = {
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
