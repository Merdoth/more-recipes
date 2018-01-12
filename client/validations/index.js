import Validator from 'validator';
import isEmpty from 'lodash/isEmpty';

/**
 *
 * @desc this functtion handles validation for signin form
 *
 * @param {any} inputData
 * @returns {void}
 */
export const validateSigninFormInput = (inputData) => {
  const errors = {};
  if (Validator.isEmpty(inputData.email)) {
    errors.email = 'Email field is required';
  }
  if (Validator.isEmpty(inputData.password)) {
    errors.password = 'Password field is required';
  }
  return {
    errors,
    isValid: isEmpty(errors)
  };
};
/**
 *
 * @desc this function handle validation for signup form
 *
 * @param {any} inputData
 * @returns {void}
 */
export const validateSignupFormInput = (inputData) => {
  const errors = {};
  if (Validator.isEmpty(inputData.userName)) {
    errors.username = 'Username field is required';
  }
  if (Validator.isEmpty(inputData.email)) {
    errors.email = 'Email field is required';
  }
  if (!Validator.isEmail(inputData.email)) {
    errors.email = 'Email is invalid';
  }
  if (Validator.isEmpty(inputData.password)) {
    errors.password = 'Password field is required';
  }
  if (Validator.isEmpty(inputData.confirmPassword)) {
    errors.confirmPassword = 'confirm password field can not be  empty';
  }
  if (!Validator.equals(inputData.password, inputData.confirmPassword)) {
    errors.confirmPassword = 'Password do not match';
  }
  return {
    errors,
    isValid: isEmpty(errors)
  };
};
/**
 *
 * @desc this function handle validation for forgot password form
 *
 * @param {any} inputData
 * @returns {void}
 */
export const validateForgotPasswordInput = (inputData) => {
  const errors = {};
  if (Validator.isEmpty(inputData.email)) {
    errors.email = 'Email field is required';
  }
  return {
    errors,
    isValid: isEmpty(errors)
  };
};

/**
 *
 * @desc this function handle validation for change password form
 *
 * @param {any} inputData
 * @returns {void}
 */
export default function validateChangePasswordInput(inputData) {
  const errors = {};
  if (Validator.isEmpty(inputData.newPassword)) {
    errors.email = 'Email field is required';
  }
  if (Validator.isEmpty(inputData.confirmPassword)) {
    errors.password = 'Password field is required';
  }
  return {
    errors,
    isValid: isEmpty(errors)
  };
}
