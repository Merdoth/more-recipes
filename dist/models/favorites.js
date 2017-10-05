'use strict';

module.exports = function (sequelize, DataTypes) {
  var favorites = sequelize.define('favorites', {
    userid: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    recipeid: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  });

  favorites.associate = function (models) {
    favorites.belongsTo(models.recipes, {
      foreignKey: 'recipeid'
    });

    favorites.belongsTo(models.users, {
      foreignKey: 'userid'
    });
  };
  return favorites;
};