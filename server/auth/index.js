var express = require('express')
var router = express.Router();
var passport = require('../passport');




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

router.get('/logout', function (req,res){
  req.logout();
  res.redirect('/');
})


router.get('/github',passport.authenticate('github'));
router.get('/facebook',passport.authenticate('facebook', { scope: 'email'}));


module.exports = router
