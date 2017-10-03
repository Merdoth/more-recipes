'use strict';
module.exports = (sequelize, DataTypes) => {
  const favorites = sequelize.define('favorites', {
    userid: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    recipeid: { 
      type: DataTypes.INTEGER,
      allowNull: false
    }
  });
  
  return favorites;
};