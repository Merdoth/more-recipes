import recipeReducer, { initialState } from '../../reducers/recipeReducer';


describe('Recipe Reducer', () => {
  it('should handle GET_ONE_RECIPE action', () => {
    const payload = {
      recipeName: 'Fish stew',
      reviews: [],
      votes: []
    };

    expect(recipeReducer(undefined, {
      type: 'GET_ONE_RECIPE',
      payload
    })).toEqual({
      recipes: payload,
      message: '',
      error: {}
    });
  });

  it('should handle ADD_RECIPE_SUCCESS action', () => {
    const recipe = {
      recipeName: 'Fish stew'
    };

    expect(recipeReducer(undefined, {
      type: 'ADD_RECIPE_SUCCESS',
      recipe
    })).toEqual({
      message: '',
      recipes: recipe,
      error: {}
    });
  });


  it('should handle UPDATE_RECIPE_SUCCESS action', () => {
    const recipes = {
      recipeName: 'Fish stew'
    };

    const message = 'Updated!';

    expect(recipeReducer(undefined, {
      type: 'UPDATE_RECIPE_SUCCESS',
      recipe: {
        recipes,
        message
      }
    })).toEqual({
      message,
      recipes,
      error: {}
    });
  });


  it('should handle DELETE_RECIPE_SUCCESS action', () => {
    const message = 'Deleted!';

    expect(recipeReducer(undefined, {
      type: 'DELETE_RECIPE_SUCCESS',
      message
    })).toEqual({
      message,
      recipes: {
        reviews: []
      },
      error: {}
    });
  });


  it('should handle UPVOTE_RECIPE_SUCCESS action', () => {
    const recipes = {
      recipeName: 'Fish stew'
    };

    expect(recipeReducer(undefined, {
      type: 'UPVOTE_RECIPE_SUCCESS',
      recipes
    })).toEqual({
      message: '',
      recipes: {},
      error: {}
    });
  });

  it('should handle DOWNVOTE_RECIPE_SUCCESS action', () => {
    const recipes = {
      recipeName: 'Fish stew'
    };

    expect(recipeReducer(undefined, {
      type: 'DOWNVOTE_RECIPE_SUCCESS',
      recipes
    })).toEqual({
      message: '',
      recipes: {},
      error: {}
    });
  });


  it('should handle POST_REVIEW_SUCCESS action', () => {
    const state = {
      recipes: {
        recipeName: 'Fish stew',
        reviews: []
      },
      message: '',
      error: {}
    };

    const review = {
      review: 'Tastes good!'
    };

    expect(recipeReducer(state, {
      type: 'POST_REVIEW_SUCCESS',
      review
    })).toEqual({
      message: '',
      recipes: {
        recipeName: 'Fish stew',
        reviews: [
          review
        ]
      },
      error: {}
    });
  });


  it('should handle GET_REVIEW_SUCCESS action', () => {
    const recipe = {
      recipeName: 'Fish stew'
    };

    expect(recipeReducer(undefined, {
      type: 'GET_REVIEW_SUCCESS',
      recipe
    })).toEqual({
      message: '',
      recipes: [recipe],
      error: {}
    });
  });


  it('should handle GET_ONE_RECIPE_FAILURE action', () => {
    const error = {
      status: 'Not Found',
      message: 'No recipes found. Please try to create some.'
    };

    expect(recipeReducer(undefined, {
      type: 'GET_ONE_RECIPE_FAILURE',
      error
    })).toEqual({
      recipes: {
        reviews: []
      },
      message: '',
      error
    });
  });

  it('should handle DELETE_RECIPE_FAILURE action', () => {
    const error = {
      status: 'Not Found',
      message: 'No recipes found. Please try to create some.'
    };

    expect(recipeReducer(undefined, {
      type: 'DELETE_RECIPE_FAILURE',
      error
    })).toEqual({
      recipes: {
        reviews: []
      },
      message: '',
      error
    });
  });

  it('should handle ADD_RECIPE_FAILURE action', () => {
    const error = {
      status: 'Not Found',
      message: 'No recipes found. Please try to create some.'
    };

    expect(recipeReducer(undefined, {
      type: 'ADD_RECIPE_FAILURE',
      error
    })).toEqual({
      recipes: {
        reviews: []
      },
      message: '',
      error
    });
  });

  it('should handle UPDATE_RECIPE_FAILURE action', () => {
    const error = {
      status: 'Not Found',
      message: 'No recipes found. Please try to create some.'
    };

    expect(recipeReducer(undefined, {
      type: 'UPDATE_RECIPE_FAILURE',
      error
    })).toEqual({
      recipes: {
        reviews: []
      },
      message: '',
      error
    });
  });

  it('should handle UPVOTE_RECIPE_FAILURE action', () => {
    const error = {
      status: 'Not Found',
      message: 'No recipes found. Please try to create some.'
    };

    expect(recipeReducer(undefined, {
      type: 'UPVOTE_RECIPE_FAILURE',
      error
    })).toEqual({
      recipes: {
        reviews: []
      },
      message: '',
      error
    });
  });

  it('should handle DOWNVOTE_RECIPE_FAILURE action', () => {
    const error = {
      status: 'Not Found',
      message: 'No recipes found. Please try to create some.'
    };

    expect(recipeReducer(undefined, {
      type: 'DOWNVOTE_RECIPE_FAILURE',
      error
    })).toEqual({
      recipes: {
        reviews: []
      },
      message: '',
      error
    });
  });

  it('should handle POST_REVIEW_FAILURE action', () => {
    const error = {
      status: 'Not Found',
      message: 'No recipes found. Please try to create some.'
    };

    expect(recipeReducer(undefined, {
      type: 'POST_REVIEW_FAILURE',
      error
    })).toEqual({
      recipes: {
        reviews: []
      },
      message: '',
      error
    });
  });

  it('should handle GET_REVIEW_FAILURE action', () => {
    const error = {
      status: 'Not Found',
      message: 'No recipes found. Please try to create some.'
    };

    expect(recipeReducer(undefined, {
      type: 'GET_REVIEW_FAILURE',
      error
    })).toEqual({
      recipes: {
        reviews: []
      },
      message: '',
      error
    });
  });


  it('should return original state if action type is not matched', () => {
    expect(recipeReducer()).toEqual(initialState);
  });
});
