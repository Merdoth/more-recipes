'use strict';
module.exports = (sequelize, DataTypes) => {
  const reviews = sequelize.define('reviews', {
    userid:{
      type: DataTypes.INTEGER,
      allowNull: false
    },
    recipename: {
      type: DataTypes.STRING,
      allowNull: false
    },
    userscomment:{
      type: DataTypes.STRING,
      allowNull: false
    },
  });

  reviews.associate = (models) => {
    reviews.belongsTo(models.users, {
      foreignKey:'userid'
    });

    reviews.belongsTo(models.recipes, {
      foreignKey:'recipename'
    });
  };
  return reviews;
};