var express = require('express');
var path = require('path');
var controllers = require('./controllers');
var passport = require('passport');
var session = require('express-session')
var config = require('./config')

passport.use(new GitHubStrategy({
    clientID: GITHUB_CLIENT_ID,
    clientSecret: GITHUB_CLIENT_SECRET,
    callbackURL: "http://127.0.0.1:3000/auth/github/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    console.log('accessToken', accessToken);
    console.log('refreshToken', refreshToken);
    console.log('profile', profile);
    // User.findOrCreate({ githubId: profile.id }, function (err, user) {
      return done(err, profile);
    // });
  }
));

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});


var app = express();


app.use(express.static(path.join(__dirname + '/../client')));

app.get('/auth/github',passport.authenticate('github'));

app.post('/test',ensureAuthenticated,  function (req, res){
  
})


app.get('/', function (req, res) {

  // controllers.addUser('John', 'Hancock')
  // .then(function(){
  //   controllers.addRating(1100, 'John', 'Hancock')
  //   .then(function(){
  //     console.log('added bro user')
  //   })

  // })



  res.send('Hello World!')
})


app.set('port', (process.env.PORT || 3000))

var server = app.listen(app.get('port'), function () {

  var host = server.address().address
  var port = server.address().port
  console.log('Example app listening at http://%s:%s', host, port)

})


function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/login')
}

