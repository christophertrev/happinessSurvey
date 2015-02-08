var rating = sequelize.define('rating', {
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




rating.sync({force: true}).then(function () {
  // Table created
  return rating.create({
    rating: 9,
    user_id: 1
  });
});