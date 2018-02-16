import lodash from 'lodash';

/**
 * @description validateSignUp function
 *
 * @param {Object} value - object
 *
 * @returns {Object} return - return object
 *
 */
export const validateSignUp = (value) => {
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
 * @description validateSignIn function
 *
 * @param {Object} value - object
 *
 * @returns {Object} return - return object
 *
 */
export const validateSignIn = (value) => {
  const { email, password } = value;
  const errors = {};

  if (email.length === 0) {
    errors.emailError = 'email is required';
  }

  if (password.length === 0) {
    errors.passwordError = 'password is required';
  }

  return { isValid: lodash.isEmpty(errors), errors };
};

/**
 * @description validateAddRecipe function
 *
 * @param {Object} value - object
 *
 * @returns {Object} result - result object
 *
 */
export const validateAddRecipe = (value) => {
  const {
    recipeName, description, ingredients, preparation, image
  } = value;
  const errors = {};

  if (recipeName.trim().length === 0) {
    errors.recipeNameError = 'recipename is required';
  } else if (recipeName.length < 5) {
    errors.recipeNameError = 'recipename must be at least 5 characters long';
  }

  if (description.trim().length === 0) {
    errors.descriptionError = 'description is required';
  } else if (description.length < 5) {
    errors.descriptionError = 'description must be at least 5 characters long';
  }

  if (ingredients.trim().length === 0) {
    errors.ingredientsError = 'ingredients is required';
  } else if (ingredients.length < 5) {
    errors.ingredientsError = 'ingredients must be at least 5 characters long';
  }

  if (preparation.trim().length === 0) {
    errors.preparationError = 'preparation is required';
  } else if (preparation.length < 5) {
    errors.preparationError = 'preparation must be at least 5 characters long';
  }

  switch (image.type) {
    case 'image/png':
    case 'image/jpeg':
    case 'image/gif':
    case 'image/bmp':
      break;
    default:
      errors.imageError = 'select a valid file type';
  }

  return { isError: !lodash.isEmpty(errors), errors };
};

/**
 * @description validateReview function
 *
 * @param {Object} value - object
 *
 * @returns {Object} return - return object
 *
 */
export const validateReview = (value) => {
  const { review } = value;
  const errors = {};

  if (review.trim().length === 0) {
    errors.reviewError = 'review is required';
  } else if (review.length < 5) {
    errors.reviewError = 'review must be at least 5 character';
  }

  return { isError: !lodash.isEmpty(errors), errors };
};
