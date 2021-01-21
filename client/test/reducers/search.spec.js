import expect from 'expect';
import search, { initialState } from '../../reducers/search';


describe('Search Reducer', () => {
  it('should return original state if action type is not matched', () => {
    expect(search()).toEqual(initialState);
  });


  it('should handle SEARCH_RECIPE_SUCCESS action', () => {
    const paginationData = {
      page: 1,
      pageCount: 1,
      pageSize: 1,
      count: 1,
    };
    const recipe = {
      count: 1,
      rows: [
        { recipeName: 'Tiwo Shinkapa' }
      ],
    };

    expect(search(undefined, {
      type: 'SEARCH_RECIPE_SUCCESS',
      payload: { paginationData, recipe }
    })).toEqual({
      paginationData,
      recipe,
      error: {}
    });
  });


  it('should handle SEARCH_RECIPE_FAILURE action', () => {
    const error = {
      status: 'Not Found',
      message: 'No Recipe Found.'
    };

    expect(search(undefined, {
      type: 'SEARCH_RECIPE_FAILURE',
      error
    })).toEqual({
      recipe: {
      },
      error
    });
  });
});
