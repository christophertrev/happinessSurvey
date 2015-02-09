var express = require('express');
var path = require('path');
var controllers = require('./controllers');
var passport = require('./passport');
var session = require('express-session');
var config = require('./config');
var GitHubStrategy = require('passport-github').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
var cookieParser = require('cookie-parser');
var morgan = require('morgan');
var addRoutes = require('./routes')



// passport.use(new GitHubStrategy({
//     clientID: config.GITHUB_CLIENT_ID,
//     clientSecret: config.GITHUB_CLIENT_SECRET,
//     callbackURL: "http://localhost:3000/auth/github/callback"
//   },
//   function(accessToken, refreshToken, profile, done) {
//     console.log('accessToken', accessToken);
//     console.log('refreshToken', refreshToken);
//     console.log('profile', profile);
//     // Add user to database

//     // User.findOrCreate({ githubId: profile.id }, function (err, user) {
//       return done(null, profile);
//     // });
//   }
// ));


// passport.use(new FacebookStrategy({
//     clientID: config.FACEBOOK_APP_ID,
//     clientSecret: config.FACEBOOK_APP_SECRET,
//     callbackURL: "http://localhost:3000/auth/facebook/callback",
//     profileFields: ['id', 'name','picture.type(large)', 'emails','displayName']
//     // profileFields: ['id', 'name','picture.type(large)', 'emails', 'username', 'displayName', 'about', 'gender']
//   },
//   function(accessToken, refreshToken, profile, done) {
//     console.log('accessToken', accessToken);
//     console.log('refreshToken', refreshToken);
//     console.log('profile', profile);
//     // console.log('profiel picture', profile._json.picture)
//     // User.findOrCreate({ githubId: profile.id }, function (err, user) {
//       //Add user to Database
//     var json = profile._json;
//     controllers.addUser(json.first_name, json.last_name,json.id, profile.photos[0].value,json.email)
//     .then(function(user){
//       // console.log(user[0].dataValues)
//       return done(null, profile);
//     })
//     // });
//   }
// ));


// passport.serializeUser(function(user, done) {
//   console.log('serializeUser', user);
//   done(null, user);
// });

// passport.deserializeUser(function(obj, done) {
//   console.log('deserializeUser',obj)
//   done(null, obj);
// });

var app = express();
app.use(morgan('dev'));
app.set('views', __dirname + '/view');
app.set('view engine', 'ejs');
// // create a write stream (in append mode)
// var accessLogStream = fs.createWriteStream(__dirname + '/access.log', {flags: 'a'})

// setup the logger
// app.use(morgan('combined', {stream: accessLogStream}))

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
app.get('/auth/facebook',passport.authenticate('facebook', { scope: 'email'}));

app.get('/test', ensureAuthenticated,  function (req, res){
  res.send('yes!')
})

app.get('/profile', function (req, res){
  console.log(req.user._json);
  res.render('profile', { user: req.user._json });
})

app.get('/logout', function (req,res){
  req.logout();
  res.redirect('/');
})



app.get('/', function (req, res) {
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

