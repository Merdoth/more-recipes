export default (state = {}, action = {}) => {
  switch (action.type) {
    case 'GET_TOP_RECIPES': {
      return action.recipes;
    }
    case 'GET_ONE_RECIPE': {
      return action.recipes;
    }
    case 'GET_ALL_RECIPES': {
      return action.recipes;
    }
    case 'ADD_RECIPE_SUCCESS': {
      return action.recipes;
    }
    case 'ADD_RECIPE_FAILURE': {
      return action.error;
    }
    case 'UPDATE_RECIPE_SUCCESS': {
      return action.recipes;
    }
    case 'UPDATE_RECIPE_FAILURE': {
      return action.error;
    }
    case 'DELETE_RECIPE_SUCCESS': {
      return action.recipeId;
    }
    case 'DELETE_RECIPE_FAILURE': {
      return action.error;
    }
    default: {
      return state;
    }
  }
};
