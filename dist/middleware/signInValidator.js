'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (req, res, next) {
  var _req$body = req.body,
      email = _req$body.email,
      password = _req$body.password;


  if (!email || email.trim() === '') {
    return res.status(400).send({ message: 'Please enter a valid email!' });
  }
  if (!password || password.trim() === '') {
    return res.status(400).send({ message: 'Please enter a valid password!' });
  }
  if (password.length < 8) {
    return res.status(400).send({
      message: 'Invalid password!'
    });
  }
  next();
};