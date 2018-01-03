module.exports = (sequelize, DataTypes) => {
  const votes = sequelize.define('votes', {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    recipeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    upVotes: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    downVotes: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });
  votes.associate = (models) => {
    votes.belongsTo(models.recipes, {
      foreignKey: 'recipeId',
      onDelete: 'CASCADE',
    });
    votes.belongsTo(models.users, {
      foreignKey: 'userId',
    });
  };
  return votes;
};
