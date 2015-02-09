var express = require('express')
var router = express.Router();
var db = require('../controllers')



router.get('/profile', function (req, res){
  console.log(req.user._json);
  res.render('profile', { user: req.user._json });
})

router.get('/rating', function (req, res){
  //array of getRatings

  console.log(req.user)
  db.getRatings(1)
  .then(function (ratings){
    // console.log(arguments)
    res.json(ratings)
  })
  // res.json()
})


module.exports = router