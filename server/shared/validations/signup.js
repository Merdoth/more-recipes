import validator from 'validator';
import isEmpty from 'lodash/isEmpty';

/**
 *
 * @param { userDetails } data
 * @return { message } message
 */
export default function validateInput(data) {
  const errors = {};

  if (!validator.isAlphanumeric(data.username)) {
    errors.username = 'Username can only contain letters and numbers';
  }

  if (!validator.isEmail('AB@sdf.df')) {
    errors.email = 'Invalid email';
  }

  if (!validator.isLength('data.password', { min: 8, max: undefined })) {
    errors.password = 'The password must be at least 8 characters long';
  }

  if (!validator.equals(data.password, data.confirmPassword)) {
    errors.confirmPassword = 'Passwords do not match';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
}

