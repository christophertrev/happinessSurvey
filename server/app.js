var express = require('express');
var path = require('path');
var passport = require('./passport');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var morgan = require('morgan');
var addRoutes = require('./routes')


var app = express();

app.use(session({
  secret: 'keyboardCat',
  // cookie: { secure: true },
  // resave: true,
  // saveUninitialized: true
}));
app.use(cookieParser())

app.use(passport.initialize());
app.use(passport.session());
app.use(morgan('dev'));

addRoutes(app);

app.set('views', __dirname + '/view');
app.set('view engine', 'ejs');
// // create a write stream (in append mode)
// var accessLogStream = fs.createWriteStream(__dirname + '/access.log', {flags: 'a'})

// setup the logger
// app.use(morgan('combined', {stream: accessLogStream}))


app.use(express.static(path.join(__dirname + '/../client')));


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

