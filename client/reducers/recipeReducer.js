import * as types from '../actions/actionTypes';

const initialState = {
  recipes: {
    reviews: []
  },
  message: '',
  error: {}
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case types.GET_ONE_RECIPE:
      return {
        ...state,
        recipes: action.payload,
        message: '',
        error: {}
      };
    case types.ADD_RECIPE_SUCCESS:
      return {
        ...state,
        recipes: action.recipe
      };
    case types.UPDATE_RECIPE_SUCCESS:
      return {
        ...state,
        recipes: action.recipe.recipes,
        error: {},
        message: action.recipe.message
      };
    case types.DELETE_RECIPE_SUCCESS:
      return {
        ...state,
        message: action.message
      };
    case types.UPVOTE_RECIPE_SUCCESS:
      return {
        ...state,
        recipes: { ...action.recipe }
      };
    case types.DOWNVOTE_RECIPE_SUCCESS:
      return {
        ...state,
        recipes: { ...action.payload }
      };
    case types.POST_REVIEW_SUCCESS:
      return {
        ...state,
        recipes: {
          ...state.recipes,
          reviews: [...state.recipes.reviews, action.review]
        }
      };
    case types.GET_REVIEW_SUCCESS:
      return {
        ...state,
        recipes: [...state.recipes, action.recipe]
      };

    case types.DELETE_RECIPE_FAILURE:
    case types.GET_ONE_RECIPE_FAILURE:
    case types.ADD_RECIPE_FAILURE:
    case types.UPDATE_RECIPE_FAILURE:
    case types.UPVOTE_RECIPE_FAILURE:
      return {
        ...state,
        error: action.error
      };
    case types.DOWNVOTE_RECIPE_FAILURE:
      return {
        ...state,
        error: action.error
      };
    case types.POST_REVIEW_FAILURE:
    case types.GET_REVIEW_FAILURE:
      return {
        ...state,
        error: action.error
      };

    default:
      return state;
  }
};
