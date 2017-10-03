'use strict';
module.exports = (sequelize, DataTypes) => {
  const reviews = sequelize.define('reviews', {
    userid:{
      type: DataTypes.INTEGER,
      allowNull: false
    },
    recipeid: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    userscomment:{
      type: DataTypes.STRING,
      allowNull: false
    },
  });

  reviews.associate = (models) => {
    reviews.belongsto(models.users, {
      foreignKey:'userid'
    });

    reviews.belongsto(models.recipes, {
      foreignKey:'recipeid'
    });
  };
  return reviews;
};