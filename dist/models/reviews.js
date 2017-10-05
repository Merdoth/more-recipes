'use strict';

module.exports = function (sequelize, DataTypes) {
  var reviews = sequelize.define('reviews', {
    userid: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    recipeid: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    userscomment: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });

  reviews.associate = function (models) {
    reviews.belongsTo(models.users, {
      foreignKey: 'userid'
    });

    reviews.belongsTo(models.recipes, {
      foreignKey: 'recipeid'
    });
  };
  return reviews;
};