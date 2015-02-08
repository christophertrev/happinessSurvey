var express = require('express');
var path = require('path');
var db = require('./models');


var app = express();


app.use(express.static(path.join(__dirname + '/../client')))

app.get('/', function (req, res) {
  res.send('Hello World!')
})


app.set('port', (process.env.PORT || 3000))

var server = app.listen(app.get('port'), function () {

  var host = server.address().address
  var port = server.address().port
  console.log('Example app listening at http://%s:%s', host, port)

})