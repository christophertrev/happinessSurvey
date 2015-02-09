var express = require('express');
var path = require('path');
var controllers = require('./controllers')


var app = express();


app.use(express.static(path.join(__dirname + '/../client')));

// app.get('/login',function (req, res){

// });

// app.post('/login',function (req, res){
  
// })


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