var express = require('express')
var router = express.Router();



router.get('/profile', function (req, res){
  console.log(req.user._json);
  res.render('profile', { user: req.user._json });
})


module.exports = router