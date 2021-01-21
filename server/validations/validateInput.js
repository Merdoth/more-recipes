import lodash from 'lodash';

/**
 * @description validate User Sign Up Field
 *
 * @param {Object} value
 *
 * @returns {object} json - payload
 */
const validateInput = (value) => {
  const {
    fullName, userName, email, password
  } = value;
  const errors = {};
  const filter = /^([a-zA-Z0-9_.-])+@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;

  if (!fullName) {
    errors.fullNameError = 'Fullname can\'t be empty';
  } else if (fullName.trim().length === 0) {
    errors.fullNameError = 'Fullname is required';
  } else if (fullName.length < 3) {
    errors.fullNameError = 'Fullname must be at least 3 characters long';
  }
  if (!userName) {
    errors.userNameError = 'Username can\'t be empty';
  } else if (userName.trim().length === 0) {
    errors.userNameError = 'Username is required';
  } else if (userName.length < 3) {
    errors.userNameError = 'Username must be at least 3 characters long';
  }
  if (!email) {
    errors.emailError = 'Email can\'t be empty';
  } else if (email.trim().length === 0) {
    errors.emailError = 'Email is required';
  } else if (!filter.test(email)) {
    errors.emailError = 'Email is not valid';
  }
  if (!password) {
    errors.passwordError = 'Password can\'t be empty';
  } else if (password.trim().length === 0) {
    errors.passwordError = 'Password is required';
  } else if (password.length < 8) {
    errors.passwordError = 'Password must be at least 8 characters long';
  }

  return { isValid: lodash.isEmpty(errors), errors };
};


/**
 * @description validate User Sign Up Field
 *
 * @param {Object} value
 *
 * @returns {object} json - payload
 */
export const validateUpdateUserInput = (value) => {
  const {
    fullName, userName, email
  } = value;
  const errors = {};
  const filter = /^([a-zA-Z0-9_.-])+@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;

  if (!fullName) {
    errors.fullNameError = 'Fullname can\'t be empty';
  } else if (fullName.trim().length === 0) {
    errors.fullNameError = 'Fullname is required';
  } else if (fullName.length < 3) {
    errors.fullNameError = 'Fullname must be at least 3 characters long';
  }
  if (!userName) {
    errors.userNameError = 'Username can\'t be empty';
  } else if (userName.trim().length === 0) {
    errors.userNameError = 'Username is required';
  } else if (userName.length < 3) {
    errors.userNameError = 'Username must be at least 3 characters long';
  }
  if (!email) {
    errors.emailError = 'Email can\'t be empty';
  } else if (email.trim().length === 0) {
    errors.emailError = 'Email is required';
  } else if (!filter.test(email)) {
    errors.emailError = 'Email is not valid';
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

