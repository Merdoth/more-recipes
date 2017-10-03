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
  return reviews;
};