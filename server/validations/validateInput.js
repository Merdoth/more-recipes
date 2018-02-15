import lodash from 'lodash';
import validator from 'validator';

const validateInput = (value) => {
  const {
    fullName, userName, email, password
  } = value;
  const errors = {};
  const filter = /^([a-zA-Z0-9_.-])+@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;

  if (fullName.trim().length === 0) {
    errors.fullNameError = 'fullname is required';
  } else if (fullName.length < 3) {
    errors.fullNameError = 'fullname must be at least 3 characters long';
  }

  if (userName.trim().length === 0) {
    errors.userNameError = 'username is required';
  } else if (userName.length < 3) {
    errors.userNameError = 'username must be at least 3 characters long';
  }

  if (email.trim().length === 0) {
    errors.emailError = 'email is required';
  } else if (!filter.test(email)) {
    errors.emailError = 'email is not valid';
  }

  if (password.trim().length === 0) {
    errors.passwordError = 'password is required';
  } else if (password.length < 8) {
    errors.passwordError = 'password must be at least 8 characters long';
  }

  return { isValid: lodash.isEmpty(errors), errors };
};


/**
 * @description validate User Sign In Fields
 *
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @param {Object} next - callback
 *
 * @returns {object} json - payload
 */
export const signInValidator = (req, res, next) => {
  req.checkBody('email', 'email is required').notEmpty();
  req.checkBody('password', 'password is required').notEmpty();

  const errors = req.validationErrors();
  if (errors) {
    const errorObject = errors.map(error => error.msg);
    return res.status(400).send({
      message: errorObject
    });
  }
  next();
};


export default validateInput;

