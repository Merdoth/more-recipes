'use strict';
module.exports = (sequelize, DataTypes) => {
  const users = sequelize.define('users', {
    username: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    }
  
  });

  
  users.associate = (models) => {
    users.hasMany(models.recipes, {
      foreignKey:'userid'
    });
    users.hasMany(models.reviews, {
      foreignKey:'userid'
    });
    users.hasMany(models.favorites, {
      foreignKey:'userid'
    });
    users.hasMany(models.votes, {
      foreignKey:'userid'
    });


  };
  return users;
};