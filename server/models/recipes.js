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
      type: DataTypes.ARRAY(DataTypes.TEXT),
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
    }
  });

  // recipes.associate = (models) => {
  //   recipes.belongsTo(models.users, {
  //     foreignKey:'userid'
  //   });
  //   recipes.hasMany(models.reviews, {
  //     foreignKey:'recipeid'
  //   });
  // };
  return recipes;
};