import Validator from 'validator';
import isEmpty from 'lodash/isEmpty';


/**
 *
 * @param { userDetails } data
 * @return { message } message
 */
export default function validateInput(data) {
  const errors = {};

  if (Validator.isNull(data.userName)) {
    errors.username = 'This field is required';
  }

  if (!Validator.isUsername(data.userName)) {
    errors.username = 'Username is invalid';
  }

  if (Validator.isNull(data.email)) {
    errors.email = 'This field is required';
  }

  if (!Validator.isEmail(data.email)) {
    errors.email = 'Email is invalid';
  }

  if (Validator.isNull(data.password)) {
    errors.password = 'This field is required';
  }

  if (Validator.isNull(data.confirmPassword)) {
    errors.confirmPassword = 'This field is required';
  }
  if (!Validator.equals(data.password, data.confirmPassword)) {
    errors.confirmPassword = 'Passwords must match';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
}

