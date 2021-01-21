import * as types from '../actions/actionTypes';

export const initialState = {
  recipesFound: {
    rows: []
  },
  userRecipes: {
    rows: []
  },
  message: '',
  error: {}
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case types.GET_MOST_VOTED_SUCCESS:
      return {
        ...state,
        ...action.recipes
      };

    case types.GET_MOST_VOTED_FAILURE:
      return {
        ...state,
        error: action.error
      };

    case types.GET_ALL_RECIPES:
      return {
        ...state,
        ...action.recipes
      };
    case types.DELETE_RECIPE_SUCCESS: {
      const oldRecipes = state.userRecipes.rows;
      const newRecipes = oldRecipes.filter(num => num.id !== action.id);
      return {
        ...state,
        message: action.message,
        userRecipes: {
          rows: newRecipes
        }
      };
    }
    case types.ADD_RECIPE_SUCCESS:
      return {
        ...state,
        recipesFound: {
          ...state.recipesFound,
          rows: [...state.recipesFound.rows, action.recipe]
        }
      };

    case types.GET_USER_RECIPES_SUCCESS:
      return {
        ...state,
        ...action.recipes
      };
    case types.DELETE_RECIPE_FAILURE:
    case types.GET_USER_RECIPES_FAILURE:
      return {
        ...state,
        error: action.error
      };
    default:
      return state;
  }
};
