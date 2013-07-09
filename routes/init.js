/**
* Define the routes here
*/
module.exports = function (app, passport) {

  var authorization = require('../controllers/authorization'),
    users = require('../controllers/users'),
    auth = require('../lib/authorization');

  app.get('/signup', authorization.signup);
  app.post('/signup', authorization.newLocalUser);
  app.get('/login', authorization.login);
  app.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
  }));
  app.get('/logout', authorization.logout);
  app.get('/activate/:string', authorization.activate);

  app.get('/users', auth.requiresLogin, users.list);

  app.get('/auth/google', passport.authenticate('google'));
  app.get('/auth/google/return', passport.authenticate('google', {
    successRedirect: '/',
    failureRedirect: '/login'
  }));

  app.get('/auth/twitter', function (req, res) {
    res.send(200);
  });

  app.get('/auth/facebook', function (req, res) {
    res.send(200);
  });

  app.get('/auth/linked-in', function (req, res) {
    res.send(200);
  });

  app.get('/auth/meetup', function (req, res) {
    res.send(200);
  });

  app.get('/auth/github', function (req, res) {
    res.send(200);
  });

};
