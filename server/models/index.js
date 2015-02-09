var Sequelize = require("sequelize");

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




var Rating = sequelize.define('rating', {
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

var User = sequelize.define('user', {
  firstName: {
    type: Sequelize.STRING,
    field: 'first_name' // Will result in an attribute that is firstName when user facing but first_name in the database
  },
  lastName: {
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

Rating.hasMany(User)
sequelize.sync({force: true}).then(function (){


  User.create({
    firstName: 'John',
    lastName: 'Hancock'
  });

  User.create({
    firstName: 'John',
    lastName: 'Doe'
  });

  User.create({
    firstName: 'Walter',
    lastName: 'FrankFurters'
  });

  Rating.create({
    rating: 10,
    user_id:1
  });

  Rating.create({
    rating: 17,
    user_id:3
  });

  Rating.create({
    rating: 10,
    user_id:10
  });

  console.log('Database Synced!')
  
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








module.exports = sequelize;