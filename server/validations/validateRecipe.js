import lodash from 'lodash';
/**
 * @description validateRecipe function
 *
 * @param {Object} value - object
 *
 * @returns {Object} result - result object
 *
 */
const validateRecipe = (value) => {
  const {
    recipeName, description, ingredients, preparation
  } = value;
  const errors = {};
  if (recipeName.trim().length === 0) {
    errors.recipeNameError = 'recipename is required';
  } else if (recipeName.length < 3) {
    errors.recipeNameError = 'recipename must be at least 3 characters long';
  }

  if (description.trim().length === 0) {
    errors.descriptionError = 'description is required';
  } else if (description.length < 4) {
    errors.descriptionError = 'description must be at least 4 characters long';
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

  return { isValid: lodash.isEmpty(errors), errors };
};

export default validateRecipe;
