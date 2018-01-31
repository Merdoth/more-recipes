'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.reviewsValidator = exports.validateParams = exports.signUpValidator = exports.recipeValidator = exports.signInValidator = undefined;

var _validatePassword = require('validate-password');

var _validatePassword2 = _interopRequireDefault(_validatePassword);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// add rules that will be validated
var options = {
  enforce: {
    lowercase: true,
    uppercase: true,
    specialCharacters: true,
    numbers: true
  }
};

// instantiate ValidatePassword
var validator = new _validatePassword2.default(options);

/**
 * @description validate User Sign In Fields
 *
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @param {Object} next - callback
 *
 * @returns {object} json - payload
 */
var signInValidator = exports.signInValidator = function signInValidator(req, res, next) {
  req.checkBody('email', 'email is required').notEmpty();
  req.checkBody('password', 'password is required').notEmpty();

  var errors = req.validationErrors();
  if (errors) {
    var errorObject = errors.map(function (error) {
      return error.msg;
    });
    return res.status(400).send({
      message: errorObject
    });
  }
  next();
};

/**
 * @description validate add recipe fileds middleware
 *
 * @method
 * @param {Object} req - Request object
 *
 * @param {Object} res - Response object
 *
 * @param {Object} next - callback
 *
 * @returns {object} json - payload
 */

var recipeValidator = exports.recipeValidator = function recipeValidator(req, res, next) {
  req.checkBody('recipeName', 'recipename is required').notEmpty();
  req.checkBody('recipeName', 'recipename must at least contain a word without leading space').matches(/^\w[\w\d ,]*\w$/);
  req.checkBody('ingredients', 'ingredients is required').notEmpty();
  req.checkBody('ingredients', 'ingredients must at least contain a word without leading space').matches(/^\w[a-zA-Z0-9 !:;.?+=&%@!\-/,()]*\w$/);
  req.checkBody('preparation', 'preparation is required').notEmpty();
  req.checkBody('preparation', 'preparation must at least contain a word without leading space').matches(/^\w[a-zA-Z0-9 !:;.?+=&%@!\-/,()]*\w$/);
  req.checkBody('imageUrl', 'image url is required').notEmpty();
  req.checkBody('imageUrl', 'image url is not valid').matches(/https:\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-/]))?/);

  var errors = req.validationErrors();
  if (errors) {
    var errorObject = errors.map(function (error) {
      return error.msg;
    });
    return res.status(400).send({ message: errorObject });
  }
  next();
};

/**
 * @description validate user sign up fields middleware
 *
 * @method
 *
 * @param {Object} req - Request object
 *
 * @param {Object} res - Response object
 *
 * @param {Object} next - callback
 *
 * @returns {object} json - payload
 */

var signUpValidator = exports.signUpValidator = function signUpValidator(req, res, next) {
  req.checkBody('userName', 'username is required').notEmpty();
  req.checkBody('userName', 'username must be at least 3 and not start with an empty space').matches(/^[a-zA-Z]{3,}$/);
  req.checkBody('email', 'email is required').notEmpty();
  req.checkBody('email', 'email is not valid').isEmail();
  req.checkBody('password', 'password is required').notEmpty();
  req.checkBody('password', 'Password must be at least 8 characters without space').matches(/[a-zA-Z0-9!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]{8,32}$/);

  var errors = req.validationErrors();
  if (errors) {
    var errorObject = errors.map(function (error) {
      return error.msg;
    });
    return res.status(400).send({ message: errorObject });
  }

  var _validator$checkPassw = validator.checkPassword(req.body.password),
      isValid = _validator$checkPassw.isValid;

  if (!isValid) {
    return res.status(400).send({
      message: 'password must contain `uppercase, lowercase, number, and spacial character`'
    });
  }
  next();
};

/**
 * @description validate Params
 *
 * @param {Object} req - Request object
 *
 * @param {Object} res - Response object
 *
 * @param {Object} next - callback
 *
 * @returns {object} json - payload
 */

var validateParams = exports.validateParams = function validateParams(req, res, next) {
  // check if param is of type integer
  req.sanitizeParams('id', 'Please input a valid id.').toInt();
  req.checkParams('id', 'Please input a valid id.').isInt();

  var errors = req.validationErrors();
  if (errors) {
    var errorObject = errors.map(function (error) {
      return error.msg;
    });
    return res.status(400).send({ message: errorObject[0] });
  }
  next();
};

/**
 * @description validate Review Field
 *
 * @param {Object} req - Request object
 *
 * @param {Object} res - Response object
 *
 * @param {Object} next - callback
 *
 * @returns {object} json - payload
 */
var reviewsValidator = exports.reviewsValidator = function reviewsValidator(req, res, next) {
  req.checkBody('review', 'review is required').notEmpty();
  req.checkBody('review', 'review should be at least 5 character long without leading space').matches(/^\w[a-zA-Z0-9 !:.?+=&%@!]{5,}$/);

  var errors = req.validationErrors();
  if (errors) {
    var errorObject = errors.map(function (error) {
      return error.msg;
    });
    return res.status(400).send({
      message: errorObject
    });
  }
  next();
};