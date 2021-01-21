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
    voted: {
      type: DataTypes.STRING
    },
  });
  votes.associate = (models) => {
    votes.belongsTo(models.recipes, {
      foreignKey: 'recipeId',
    });
    votes.belongsTo(models.users, {
      foreignKey: 'userId'
    });
  };
  return votes;
};
