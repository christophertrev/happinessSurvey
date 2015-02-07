var config = require('./../config');
console.log(config)


var accountSid = config.accountSid;
var authToken = config.authToken; 
 
// require the Twilio module and create a REST client 
var client = require('twilio')(accountSid, authToken); 
 
// client.messages.create({ 
//   to: "3615482815", 
//   from: "+13617923482", 
//   body: "Yo!",   
// }, function(err, message) { 
//   console.log(message.sid); 
// });




client.messages.list({    
}, function(err, data) { 
  data.messages.forEach(function(message) { 
    if(message.from !== '+13617923482')
    console.log(message.body); 
  }); 
});



/*

Example return object from messages.list
{ sid: 'SMaebeec8e609a40c8a03291991ee021dd',
  date_created: 'Fri, 09 Jan 2015 02:09:32 +0000',
  date_updated: 'Fri, 09 Jan 2015 02:09:33 +0000',
  date_sent: 'Fri, 09 Jan 2015 02:09:32 +0000',
  account_sid: 'AC23b592788c658ea7594f3a551e05f731',
  to: '+13615482815',
  from: '+13617923482',
  body: 'HI there Baby',
  status: 'delivered',
  num_segments: '1',
  num_media: '0',
  direction: 'outbound-api',
  api_version: '2010-04-01',
  price: '-0.00750',
  price_unit: 'USD',
  error_code: null,
  error_message: null,
  uri: '/2010-04-01/Accounts/AC23b592788c658ea7594f3a551e05f731/Messages/SMaebeec8e609a40c8a03291991ee021dd.json',
  subresource_uris: { media: '/2010-04-01/Accounts/AC23b592788c658ea7594f3a551e05f731/Messages/SMaebeec8e609a40c8a03291991ee021dd/Media.json' },
  */