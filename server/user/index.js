var express = require('express')
var router = express.Router();
var db = require('../controllers')



router.get('/profile', function (req, res){
  console.log(req.user._json);
  db.getRatings(req.user.id)
  .then(function (ratings){
    console.log('ratings', ratings)
    res.render('profile', {user: req.user, ratings: ratings});

  })
  // res.render('profile', { user: req.user });
})

router.get('/rating', function (req, res){
  //array of getRatings

  // console.log(req.user)
  db.getRatings(req.user.id)
  .then(function (ratings){
    // console.log(arguments)
    res.json(ratings)
  })
  // res.json()
})


module.exports = router