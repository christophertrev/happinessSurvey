var express = require('express');
var path = require('path');
var controllers = require('./controllers');
var passport = require('passport');
var session = require('express-session');
var config = require('./config');
var GitHubStrategy = require('passport-github').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
var cookieParser = require('cookie-parser');
var morgan = require('morgan');



passport.use(new GitHubStrategy({
    clientID: config.GITHUB_CLIENT_ID,
    clientSecret: config.GITHUB_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/github/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    console.log('accessToken', accessToken);
    console.log('refreshToken', refreshToken);
    console.log('profile', profile);

    // User.findOrCreate({ githubId: profile.id }, function (err, user) {
      return done(null, profile);
    // });
  }
));


passport.use(new FacebookStrategy({
    clientID: config.FACEBOOK_APP_ID,
    clientSecret: config.FACEBOOK_APP_SECRET,
    callbackURL: "http://localhost:3000/auth/facebook/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    console.log('accessToken', accessToken);
    console.log('refreshToken', refreshToken);
    console.log('profile', profile);
    // User.findOrCreate({ githubId: profile.id }, function (err, user) {
      return done(null, profile);
    // });
  }
));


passport.serializeUser(function(user, done) {
  console.log('serializeUser');
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  console.log('deserializeUser')
  done(null, obj);
});

var app = express();
app.use(morgan('dev'));

app.use(session({
  secret: 'keyboardCat',
  // cookie: { secure: true },
  // resave: true,
  // saveUninitialized: true
}))
app.use(cookieParser())

app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(path.join(__dirname + '/../client')));

app.get('/auth/github',passport.authenticate('github'));
app.get('/auth/facebook',passport.authenticate('facebook'));

app.get('/test', ensureAuthenticated,  function (req, res){
  res.send('yes!')
})


app.get('/', function (req, res) {

  // controllers.addUser('John', 'Hancock')
  // .then(function(){
  //   controllers.addRating(1100, 'John', 'Hancock')
  //   .then(function(){
  //     console.log('added bro user')
  //   })

  // })

  console.log('is authenticated ?',req.isAuthenticated())
  

  res.send('Hello World!')
})

app.get('/auth/github/callback', 
  passport.authenticate('github', { failureRedirect: 'http://www.google.com' }),
  function(req, res) {
    res.redirect('/');
  });

app.get('/auth/facebook/callback', 
  passport.authenticate('facebook', { failureRedirect: 'http://www.google.com' }),
  function(req, res) {
    res.redirect('/');
  });



app.set('port', (process.env.PORT || 3000))

var server = app.listen(app.get('port'), function () {

  var host = server.address().address
  var port = server.address().port
  console.log('Example app listening at http://%s:%s', host, port)

})


function ensureAuthenticated(req, res, next) {
  console.log('is authenticated ?',req.isAuthenticated())
  if (req.isAuthenticated()) { 
    return next(); 
  }
  console.log('failed authentication')
  res.redirect('/login')
}

