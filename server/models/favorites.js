module.exports = (sequelize, DataTypes) => {
  const favorites = sequelize.define('favorites', {
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
    }
  });

  favorites.associate = (models) => {
    favorites.belongsTo(models.recipes, {
      foreignKey: 'recipeId'
    });

    favorites.belongsTo(models.users, {
      foreignKey: 'userId'
    });
  };
  return favorites;
};
