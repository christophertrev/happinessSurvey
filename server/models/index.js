var Sequelize = require("sequelize");
var model = {}

var sequelize = new Sequelize('database', 'root', null, {
  host: 'localhost',
  dialect: 'sqlite',

  pool: {
    max: 5,
    min: 0,
    idle: 10000
  },

  // SQLite only
  storage: __dirname + '/../db_sqlite/database.sqlite'
});




model.Rating = sequelize.define('rating', {
  rating: {
    type: Sequelize.INTEGER
    // field: 'first_name' // Will result in an attribute that is firstName when rating facing but first_name in the database
  },
  user_id: {
    type: Sequelize.INTEGER
  }
}, {
  freezeTableName: true // Model tableName will be the same as the model name
});

model.User = sequelize.define('user', {
  firstName: {
    type: Sequelize.STRING,
    field: 'first_name' // Will result in an attribute that is firstName when user facing but first_name in the database
  },
  lastName: {
    type: Sequelize.STRING
  },
  providerID : {
    type: Sequelize.STRING
  },
  pictureURL : {
    type: Sequelize.STRING
  },
  provider : {
    type: Sequelize.STRING
  },
  email: {
    type: Sequelize.STRING
  }

}, {
  freezeTableName: true // Model tableName will be the same as the model name
});




// User.sync().then(function () {
//   // Table created
//   return User.create({
//     firstName: 'John',
//     lastName: 'Hancock'
//   });
// });




// Rating.sync().then(function () {
//   // Table created
//   return Rating.create({
//     rating: 9,
//     user_id: 10
//   });
// });

model.Rating.hasMany(model.User)
sequelize.sync().then(function (){


  // model.User.create({
  //   firstName: 'John',
  //   lastName: 'Hancock'
  // });

//   // model.User.create({
//   //   firstName: 'John',
//   //   lastName: 'Doe'
//   // });

//   // model.User.create({
//   //   firstName: 'Walter',
//   //   lastName: 'FrankFurters'
//   // });

  // model.Rating.create({
  //   rating: 10,
  //   user_id:1
  // });

  // model.Rating.create({
  //   rating: 17,
  //   user_id:1
  // });

  // model.Rating.create({
  //   rating: 122,
  //   user_id:1
  // });

//   console.log('Database Synced!')
  
});


// console.log(User)
// console.log(Rating)
// User.create({
//   firstName: 'John',
//   lastName: 'Hancock'
// });

// Rating.create({
//   rating: 10,
//   user_id:1
// }).success(function (argument) {
//   console.log(argument)
// })







module.exports.model = model;
module.exports.db = sequelize;