'use strict';
module.exports = (sequelize, DataTypes) => {
  const votes = sequelize.define('votes', {
    userid: {
      type:DataTypes.INTEGER,
      allowNull: false
    },
    recipeid: {
      type: DataTypes.INTEGER,
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
  
  votes.associate = (models) => {
    votes.belongsTo(models.recipes, {
      foreignKey:'recipeid'
    });
    votes.belongsTo(models.users, {
      foreignKey:'userid'
    });
  };
  return votes;
};