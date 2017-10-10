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
  
  // favorites.associate = (models) => {
  //   favorites.belongsTo(models.recipes, {
  //     foreignKey: 'recipeid'
  //   });

  //   favorites.belongsTo(models.users, {
  //     foreignKey: 'userid'
  //   });
  // };
  return favorites;
};