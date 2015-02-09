var db = require('./../models');
var controller = {};


controller.addUser = function (firstName, lastName){
  
  db.model.User.create({
    firstName: firstName,
    lastName: lastName
  })
}





controller.addRating = function (rating, firstName, lastName){

};




module.exports = controller; 