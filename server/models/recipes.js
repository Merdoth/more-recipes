'use strict';
module.exports = (sequelize, DataTypes) => {
  const recipes = sequelize.define('recipes', {
    userid:{
      type: DataTypes.INTEGER,
      allowNull: false
    },
    recipename:{ 
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
      allowNull: false
    },
    downvotes: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  });
  return recipes;
};