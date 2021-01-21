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
    recipeName, description, ingredients, preparation, image
  } = value;
  const errors = {};
  if (!recipeName) {
    errors.recipeNameError = 'Recipename can\'t be empty';
  } else if (recipeName.trim().length === 0) {
    errors.recipeNameError = 'Recipename is required';
  }

  if (!description) {
    errors.descriptionError = 'Description can\'t be empty';
  } else if (description.trim().length === 0) {
    errors.descriptionError = 'Description is required';
  }

  if (!ingredients) {
    errors.ingredientsError = 'Ingredients can\'t be empty';
  } else if (ingredients.trim().length === 0) {
    errors.ingredientsError = 'Ingredients is required';
  }

  if (!preparation) {
    errors.preparationError = 'Preparation can\'t be empty';
  } else if (preparation.trim().length === 0) {
    errors.preparationError = 'Preparation is required';
  }
  if (!image) {
    errors.imageError = 'Image can\'t be an empty file';
  } else if (image.trim().length === 0) {
    errors.imageError = 'image is required';
  }

  return { isValid: lodash.isEmpty(errors), errors };
};

export default validateRecipe;
