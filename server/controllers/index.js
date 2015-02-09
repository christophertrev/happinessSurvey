var db = require('./../models');
var controller = {};


// db.db.sync();



controller.addUser = function (firstName, lastName, providerID, pictureURL){
  // returns a promise 
  console.log('adduser argumetns', arguments)
  return db.model.User.findOrCreate({ 
    where: {
      firstName: firstName,
      lastName: lastName,
      providerID: providerID,
      pictureURL: pictureURL,
      provider: 'facebook'
    
    }
  })

}





controller.addRating = function (rating, firstName, lastName){
  return db.model.User.find({
    where: {
      firstName: firstName,
      lastName: lastName
    } 
  }).then(function(user) {
  // console.log('assdasdfasdfasdfasdfasdfasdfas')
  // project will be the first entry of the Projects table with the title 'aProject' || null
    // console.log(user.dataValues);
    if ( user ){
      return db.model.Rating.create({
        rating: rating,
        user_id: user.dataValues.id
      })
    } else {
      // throw new Error()
    }

  })

};



module.exports = controller; 