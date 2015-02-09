var express = require('express')
var router = express.Router();
var passport = require('./passport');





router.get('/github/callback', function (req, res){ 

})
router.get('/facebook/callback', function (req, res){

})


router.get('/auth/github',passport.authenticate('github'));
router.get('/auth/facebook',passport.authenticate('facebook', { scope: 'email'}));


function ensureAuthenticated(req, res, next) {
  console.log('is authenticated ?',req.isAuthenticated())
  if (req.isAuthenticated()) { 
    return next(); 
  }
  console.log('failed authentication')
  res.redirect('/')



module.exports = function (app) {
  app.use('/auth', router);
  // app.use('/u', ensureAuthenticated ,router);
}




}
