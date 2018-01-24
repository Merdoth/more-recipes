'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = validateInput;

var _validator = require('validator');

var _validator2 = _interopRequireDefault(_validator);

var _isEmpty = require('lodash/isEmpty');

var _isEmpty2 = _interopRequireDefault(_isEmpty);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 *
 * @param { userDetails } data
 * @return { message } message
 */
function validateInput(data) {
  var errors = {};

  if (!_validator2.default.isAlphanumeric(data.username)) {
    errors.username = 'Username can only contain letters and numbers';
  }

  if (!_validator2.default.isEmail('AB@sdf.df')) {
    errors.email = 'Invalid email';
  }

  if (!_validator2.default.isLength('data.password', { min: 8, max: undefined })) {
    errors.password = 'The password must be at least 8 characters long';
  }

  if (!_validator2.default.equals(data.password, data.confirmPassword)) {
    errors.confirmPassword = 'Passwords do not match';
  }

  return {
    errors: errors,
    isValid: (0, _isEmpty2.default)(errors)
  };
}