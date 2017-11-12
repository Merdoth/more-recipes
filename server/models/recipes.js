'use strict';
module.exports = (sequelize, DataTypes) => {
  const recipes = sequelize.define('recipes', {
    userId:{
      type: DataTypes.INTEGER,
      allowNull: false
    },
    recipeName:{ 
      type: DataTypes.STRING,
      allowNull: false
    },
    ingredients:{
      type: DataTypes.STRING,
      allowNull: false
    },
    preparation:{ 
      type: DataTypes.STRING,
      allowNull: false
    },
    upvotes: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue:0
    },
    downvotes: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue:0
    },
  });

  recipes.associate = (models) => {
    recipes.belongsTo(models.users, {
      foreignKey:'userId'
    });
    recipes.hasMany(models.reviews, {
      foreignKey:'recipeId'
    });
    recipes.hasMany(models.votes, {
      foreignKey:'recipeId'
    });
  };
  return recipes;
};