var passport = require('passport');
var config = require('../config');
var db = require('../controllers');


var GitHubStrategy = require('passport-github').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;



passport.serializeUser(function(user, done) {
  console.log('serializeUser', user);
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  console.log('deserializeUser',obj)
  done(null, obj);
});


passport.use(new FacebookStrategy({
    clientID: config.FACEBOOK_APP_ID,
    clientSecret: config.FACEBOOK_APP_SECRET,
    callbackURL: "http://localhost:3000/auth/facebook/callback",
    profileFields: ['id', 'name','picture.type(large)', 'emails','displayName']
    // profileFields: ['id', 'name','picture.type(large)', 'emails', 'username', 'displayName', 'about', 'gender']
  },
  function(accessToken, refreshToken, profile, done) {
    console.log('accessToken', accessToken);
    console.log('refreshToken', refreshToken);
    console.log('profile', profile);
    // console.log('profiel picture', profile._json.picture)
    // User.findOrCreate({ githubId: profile.id }, function (err, user) {
      //Add user to Database
    var json = profile._json;
    db.addUser(json.first_name, json.last_name,json.id, profile.photos[0].value,json.email)
    .then(function(user){
      // console.log(user[0].dataValues)
      return done(null, profile);
    })
    // });
  }
));

passport.use(new GitHubStrategy({
    clientID: config.GITHUB_CLIENT_ID,
    clientSecret: config.GITHUB_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/github/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    console.log('accessToken', accessToken);
    console.log('refreshToken', refreshToken);
    console.log('profile', profile);
    // Add user to database

    // User.findOrCreate({ githubId: profile.id }, function (err, user) {
      return done(null, profile);
    // });
  }
));




module.exports = passport; 