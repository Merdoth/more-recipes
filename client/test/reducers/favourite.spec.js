import favourite, { initialState } from '../../reducers/favourite';


describe('Favourite Reducer', () => {
  it('should handle GET_FAVOURITE_SUCCESS action', () => {
    expect(favourite(undefined, {
      type: 'GET_FAVOURITE_SUCCESS',
      favourite
    })).toEqual({
      favourite,
      message: '',
      error: {}
    });
  });

  it('should handle ADD_FAVOURITE_SUCCESS action', () => {
    expect(favourite(undefined, {
      type: 'ADD_FAVOURITE_SUCCESS',
      favourite
    })).toEqual({
      favourite: [favourite],
      message: '',
      error: {}
    });
  });

  it('should handle REMOVE_FAVOURITE_SUCCESS action', () => {
    expect(favourite(undefined, {
      type: 'REMOVE_FAVOURITE_SUCCESS',
      favourite
    })).toEqual({
      favourite,
      message: '',
      error: {}
    });
  });

  it('should handle GET_FAVOURITE_FAILURE action', () => {
    const error = {
      status: 'Not Found',
      message: 'No favourites Found.'
    };

    expect(favourite(undefined, {
      type: 'GET_FAVOURITE_FAILURE',
      error
    })).toEqual({
      favourite: [],
      message: '',
      error
    });
  });

  it('should handle ADD_FAVOURITE_FAILURE action', () => {
    const error = {
      status: 'Not Found',
      message: 'No favourites Found.'
    };

    expect(favourite(undefined, {
      type: 'ADD_FAVOURITE_FAILURE',
      error
    })).toEqual({
      favourite: [],
      message: '',
      error
    });
  });

  it('should handle REMOVE_FAVOURITE_FAILURE action', () => {
    const error = {
      status: 'Not Found',
      message: 'No favourites Found.'
    };

    expect(favourite(undefined, {
      type: 'REMOVE_FAVOURITE_FAILURE',
      error
    })).toEqual({
      favourite: [],
      message: '',
      error
    });
  });

  it('should return original state if action type is not matched', () => {
    expect(favourite()).toEqual(initialState);
  });
});
