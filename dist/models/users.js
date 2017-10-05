'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _bcrypt = require('bcrypt');

var _bcrypt2 = _interopRequireDefault(_bcrypt);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (sequelize, DataTypes) {
  var users = sequelize.define('users', {
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
          args: [8],
          msg: 'Password cannot be less than 8 characters'
        }
      }
    }
  });

  users.associate = function (models) {
    users.hasMany(models.recipes, {
      foreignKey: 'userid'
    });
    users.hasMany(models.reviews, {
      foreignKey: 'userid'
    });
    users.hasMany(models.favorites, {
      foreignKey: 'userid'
    });
    users.hasMany(models.votes, {
      foreignKey: 'userid'
    });
  };

  users.beforeCreate(function (user) {
    //console.log('user object', user);
    user.dataValues.password = _bcrypt2.default.hashSync(user.dataValues.password, _bcrypt2.default.genSaltSync(10));
  });

  users.beforeUpdate(function (user) {
    if (user._changed.password) {
      user.dataValues.password = _bcrypt2.default.hashSync(user.dataValues.password, _bcrypt2.default.genSaltSync(10));
    }
  });

  return users;
};