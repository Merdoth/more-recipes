module.exports = (sequelize, DataTypes) => {
  const recipes = sequelize.define('recipes', {
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'users',
        key: 'id',
        as: 'userId'
      }
    },
    recipeName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false
    },
    ingredients: {
      type: DataTypes.STRING,
      allowNull: false
    },
    preparation: {
      type: DataTypes.STRING,
      allowNull: false
    },
    views: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    upVotes: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: false
    },
    downVotes: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: false
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });

  recipes.associate = (models) => {
    recipes.belongsTo(models.users, {
      foreignKey: 'userId'
    });
    recipes.hasMany(models.reviews, {
      foreignKey: 'recipeId'
    });
    recipes.hasMany(models.votes, {
      foreignKey: 'recipeId'
    });
  };
  return recipes;
};
