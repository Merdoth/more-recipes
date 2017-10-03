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
  
  favorites.associate = (models) => {
    favorites.belongsto(models.recipes, {
      foreignKey: 'recipeid'
    });

    favorites.belongsto(models.users, {
      foreignKey: 'userid'
    });
  };
  return favorites;
};