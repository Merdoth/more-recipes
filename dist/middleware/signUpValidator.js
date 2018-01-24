'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 *
 * @param {req} req
 * @param {res} res
 * @param {next} next
 * @return { message } message
 */
var signUpValidator = function signUpValidator(req, res, next) {
  var _req$body = req.body,
      userName = _req$body.userName,
      email = _req$body.email,
      password = _req$body.password;


  if (userName.trim() === '') {
    return res.status(400).send({ message: 'Please enter a valid userName!' });
  }
  if (!email || email.trim() === '') {
    return res.status(400).send({ message: 'Please enter a valid email!' });
  }
  if (!password || password.trim() === '') {
    return res.status(400).send({ message: 'Please enter a valid password!' });
  }
  if (password.length < 8) {
    return res.status(400).send({
      message: 'Password must be up to 8 characters!'
    });
  }
  next();
};

exports.default = signUpValidator;