export default (state = {}, action = {}) => {
  switch (action.type) {
    case 'GET_TOP_RECIPES': {
      return action.recipes;
    }
    case 'ADD_RECIPE_SUCCESS': {
      return action.recipes;
    }
    case 'ADD_RECIPE_FAILURE': {
      return action.error;
    }
    case 'GET_ALL_RECIPES': {
      return action.recipes;
    }
    default: {
      return state;
    }
  }
};
