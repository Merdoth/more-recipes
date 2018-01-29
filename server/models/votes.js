module.exports = (sequelize, DataTypes) => {
  const votes = sequelize.define('votes', {
    userId: {
      type: DataTypes.INTEGER,
      onDelete: 'CASCADE',
      references: {
        model: 'users',
        key: 'id',
        as: 'userId'
      }
    },
    recipeId: {
      type: DataTypes.INTEGER,
      onDelete: 'CASCADE',
      references: {
        model: 'recipes',
        key: 'id',
        as: 'recipeId'
      }
    },
    upVotes: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    downVotes: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  });
  votes.associate = (models) => {
    votes.belongsTo(models.recipes, {
      foreignKey: 'recipeId',
      onDelete: 'CASCADE'
    });
    votes.belongsTo(models.users, {
      foreignKey: 'userId'
    });
  };
  return votes;
};
