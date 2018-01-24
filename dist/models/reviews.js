'use strict';

module.exports = function (sequelize, DataTypes) {
  var reviews = sequelize.define('reviews', {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    recipeId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    review: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });

  reviews.associate = function (models) {
    reviews.belongsTo(models.users, {
      foreignKey: 'userId'
    });

    reviews.belongsTo(models.recipes, {
      foreignKey: 'recipeId',
      onDelete: 'CASCADE'
    });
  };

  return reviews;
};