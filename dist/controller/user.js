'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.User = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _models = require('../models/');

var _models2 = _interopRequireDefault(_models);

var _token = require('../utils/token');

var _token2 = _interopRequireDefault(_token);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Users = _models2.default.users;

var User = exports.User = function () {
  function User() {
    _classCallCheck(this, User);
  }

  _createClass(User, null, [{
    key: 'signup',
    value: function signup(req, res) {
      Users.create(req.body).then(function (user) {
        var newUser = user.dataValues;
        newUser.token = (0, _token2.default)(newUser);
        res.status(201).send({ message: 'User successfully created', data: newUser });
      }).catch(function (err) {
        // if (/unique violation/.test(err.errors[0].type)) {
        // return res.status(409).send({ error: 'User with the same email or surname already exists' });
        // }
        res.status(400).send({ error: err.errors[0].message });
      });
    }
  }, {
    key: 'signin',
    value: function signin(req, res) {
      return { req: req, res: res };
    }

    // static signIn(req, res) {
    //   // check db user is in db
    //   const email = req.body.email;
    //   // const password = req.body.password;
    //   Users.findOne({
    //     where:{
    //       email: email
    //     }
    //   }).then(found => {
    //     //console.log(found.password)
    //     if (!found) {
    //       // return 404 if not
    //       return res.status(404).send({message: 'error'});

    //     } else if(bcrypt.compareSync(req.body.password, found.password)) {
    //       // check if password matches
    //       // else create token and send succes message
    //       const token = jwt.sign({id: found.id}, process.env.SECRET_KEY, {
    //         expiresIn: 60 * 60 * 24 // Token expires in 24 hours
    //       });
    //       return res.status(200).send({message: 'Welcome', token});

    //     } else {
    //       // return 404 if not
    //       return res.status(404).send({
    //         message: 'wrong password'
    //       });
    //     }
    //   });

  }]);

  return User;
}();

exports.default = User;