import expect from 'expect';
import getOneUser, { initialState } from '../../reducers/getOneUser';


describe('Get One User Reducer', () => {
  it('should return original state if action type is not matched', () => {
    expect(getOneUser()).toEqual(initialState);
  });


  it('should handle GET_ONE_USER_SUCCESS action', () => {
    const user = {
      fullName: 'Meya Samuel'
    };
    expect(getOneUser(undefined, {
      type: 'GET_ONE_USER_SUCCESS',
      user
    })).toEqual({
      users: user,
    });
  });

  it('should handle UPDATE_USER_PROFILE_SUCCESS action', () => {
    const user = {
      fullName: 'Meya Samuel'
    };
    expect(getOneUser(undefined, {
      type: 'UPDATE_USER_PROFILE_SUCCESS',
      user
    })).toEqual({
      users: user,
    });
  });

  it('should handle GET_ONE_USER_FAILURE action', () => {
    const error = {
      status: 'Not Found',
      message: 'No User Found.'
    };

    expect(getOneUser(undefined, {
      type: 'GET_ONE_USER_FAILURE',
      error
    })).toEqual({
      error
    });
  });

  it('should handle UPDATE_USER_PROFILE_FAILURE action', () => {
    const error = {
      status: 'Not Found',
      message: 'Update Failure.'
    };

    expect(getOneUser(undefined, {
      type: 'UPDATE_USER_PROFILE_FAILURE',
      error
    })).toEqual({
      error
    });
  });
});
