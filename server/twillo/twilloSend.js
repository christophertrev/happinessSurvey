var config = require('./../config');
console.log(config)


var accountSid = 'AC23b592788c658ea7594f3a551e05f731'; 
var authToken = '[AuthToken]'; 
 
//require the Twilio module and create a REST client 
// var client = require('twilio')(accountSid, authToken); 
 
// client.messages.create({ 
//   to: "3615482815", 
//   from: "+13617923482", 
//   body: "Yo!",   
// }, function(err, message) { 
//   console.log(message.sid); 
// });