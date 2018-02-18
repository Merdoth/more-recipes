import recipesReducer, { initialState } from '../../reducers/recipesReducer';

describe('Recipes Reducer', () => {
  it('should handle GET_MOST_VOTED_SUCCESS action', () => {
    const paginate = {
      currentPage: 1,
      pageCount: 1,
      pageSize: 6,
      totalCount: 0,
    };

    const recipesFound = {
      count: 0,
      rows: [],
    };

    expect(recipesReducer(undefined, {
      type: 'GET_MOST_VOTED_SUCCESS',
      recipes: { paginate, recipesFound },
    })).toEqual({
      error: {},
      paginate,
      recipesFound
    });
  });

  it('should return original state if action type is not matched', () => {
    expect(recipesReducer()).toEqual(initialState);
  });

  it('should handle GET_MOST_VOTED_FAILURE action', () => {
    const error = {
      message: 'Failed to fetch'
    };

    expect(recipesReducer(undefined, {
      type: 'GET_MOST_VOTED_FAILURE',
      error: {
        message: 'Failed to fetch'
      }
    })).toEqual({
      recipesFound: {
        rows: []
      },
      error
    });
  });

  it('should handle GET_ALL_RECIPES action', () => {
    const paginate = {
      currentPage: 1,
      pageCount: 0,
      pageSize: 0,
      totalCount: 0,
    };

    const recipesFound = {
      count: 0,
      rows: [],
    };

    expect(recipesReducer(undefined, {
      type: 'GET_ALL_RECIPES',
      recipes: { paginate, recipesFound },
    })).toEqual({
      error: {},
      paginate,
      recipesFound
    });
  });

  it('should handle ADD_RECIPE_SUCCESS action', () => {
    const recipe = {
      recipeName: 'Fish stew'
    };

    expect(recipesReducer(undefined, {
      type: 'ADD_RECIPE_SUCCESS',
      recipe
    })).toEqual({
      recipesFound: {
        rows: [
          recipe
        ]
      },
      error: {}
    });
  });


  it('should handle GET_USER_RECIPES_SUCCESS action', () => {
    const paginate = {
      currentPage: 1,
      pageCount: 0,
      pageSize: 0,
      totalCount: 0,
    };

    const recipesFound = {
      count: 0,
      rows: [],
    };

    expect(recipesReducer(undefined, {
      type: 'GET_USER_RECIPES_SUCCESS',
      recipes: { paginate, recipesFound },
    })).toEqual({
      error: {},
      paginate,
      recipesFound
    });
  });

  it('should handle GET_USER_RECIPES_FAILURE action', () => {
    const error = {
      message: 'Failed to fetch'
    };

    expect(recipesReducer(undefined, {
      type: 'GET_USER_RECIPES_FAILURE',
      error: {
        message: 'Failed to fetch'
      }
    })).toEqual({
      recipesFound: {
        rows: []
      },
      error
    });
  });
});
