var express = require('express')
var router = express.Router();
var passport = require('./passport');



router.get('/facebook/callback', 
  passport.authenticate('facebook', { failureRedirect: 'http://www.google.com' }),
  function(req, res) {
    res.redirect('/');
  });

router.get('/github/callback', 
  passport.authenticate('facebook', { failureRedirect: 'http://www.google.com' }),
  function(req, res) {
    res.redirect('/');
  });



router.get('/github',passport.authenticate('github'));
router.get('/facebook',passport.authenticate('facebook', { scope: 'email'}));


function ensureAuthenticated(req, res, next) {
  console.log('is authenticated ?',req.isAuthenticated())
  if (req.isAuthenticated()) { 
    return next(); 
  }
  console.log('failed authentication')
  res.redirect('/')
}



module.exports = function (app) {
  app.use('/auth', router);
  // app.use('/u', ensureAuthenticated ,router);
}




