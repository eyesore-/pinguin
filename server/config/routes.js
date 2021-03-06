const helper = require('./../helpers/helpers');
const passport = require('passport');

module.exports = function(app, express) {
  app.get('/api/feed', loggedIn, helper.getFeed);
  app.post('/api/feed', loggedIn, helper.postFeed);
  app.post('/api/signup', passport.authenticate('local-signup'), helper.signUp);
  app.post('/api/signin', passport.authenticate('local-signin'), helper.signIn);
  app.get('/api/google', passport.authenticate('google', { scope: [
    'https://www.googleapis.com/auth/plus.login',
    'https://www.googleapis.com/auth/userinfo.email'
  ] }), helper.signIn);

  app.get('/api/google/return', passport.authenticate('google', { failureRedirect: '/signin' }), function(req, res) {
    res.redirect('/');
  });

  app.get('/api/signout', loggedIn, helper.signOut);
};

function loggedIn(req, res, next) {
  if (req.user) {
    next();
  } else {
    res.sendStatus(401);
  }
}
