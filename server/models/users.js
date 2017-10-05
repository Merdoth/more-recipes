import bcrypt from 'bcrypt';

export default (sequelize, DataTypes) => {
  const users = sequelize.define('users', {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: {
          msg: 'Username cannot be Empty!'
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: {
          msg: 'Invalid email format. Try using a format like hello@gmail.com'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [8,],
          msg: 'Password cannot be less than 8 characters'
        }
      }
    }
  });

  users.associate = (models) => {
    users.hasMany(models.recipes, {
      foreignKey:'userid'
    });
    users.hasMany(models.reviews, {
      foreignKey:'userid'
    });
    users.hasMany(models.favorites, {
      foreignKey:'userid'
    });
    users.hasMany(models.votes, {
      foreignKey:'userid'
    });
  };

  users.beforeCreate((user) => {
    //console.log('user object', user);
    user.dataValues.password = bcrypt.hashSync(user.dataValues.password, bcrypt.genSaltSync(10));
  });

  users.beforeUpdate((user) => {
    if (user._changed.password) {
      user.dataValues.password = bcrypt.hashSync(user.dataValues.password, bcrypt.genSaltSync(10));
    }
  });

  return users;
};