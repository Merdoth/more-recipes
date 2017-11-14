'use strict';

module.exports = function (sequelize, DataTypes) {
  var recipes = sequelize.define('recipes', {
    userid: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    recipename: {
      type: DataTypes.STRING,
      allowNull: false
    },
    ingredients: {
      type: DataTypes.STRING,
      allowNull: false
    },
    preparation: {
      type: DataTypes.STRING,
      allowNull: false
    },
    upvotes: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    }
  });

  recipes.associate = function (models) {
    recipes.belongsTo(models.users, {
      foreignKey: 'userid'
    });
    recipes.hasMany(models.reviews, {
      foreignKey: 'recipeid'
    });
    recipes.hasMany(models.votes, {
      foreignKey: 'recipeid'
    });
  };
  return recipes;
};