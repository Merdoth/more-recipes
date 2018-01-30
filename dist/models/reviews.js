'use strict';

module.exports = function (sequelize, DataTypes) {
  var reviews = sequelize.define('reviews', {
    userId: {
      type: DataTypes.INTEGER,
      onDelete: 'CASCADE',
      references: {
        model: 'users',
        key: 'id',
        as: 'userId'
      }
    },
    recipeId: {
      type: DataTypes.INTEGER,
      onDelete: 'CASCADE',
      references: {
        model: 'recipes',
        key: 'id',
        as: 'recipeId'
      }
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