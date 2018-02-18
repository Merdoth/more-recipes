import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import * as types from '../../../actions/actionTypes';
import * as authActions from '../../../actions/auth/authActions';

const mockStore = configureMockStore([thunk]);
const testToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NywiZW1haWwiOiJ1Y2hleWFAZ21haWwuY29tIiwiaWF0IjoxNTE4OTU0NTAyLCJleHAiOjE1MTkwNDA5MDJ9.EtAUcAkQJju3v_mZHMML-AMdqEAAJtICVLyslsfsSfM';
const testUser = {
  email: 'ucheya@gmail.com',
  exp: 1519040902,
  iat: 1518954502,
  id: 7,
};

const signUpUser = {
  fullName: 'ucheya Okereke',
  userName: 'ucheya',
  email: 'ucheya@gmail.com',
  exp: 1519040893,
  iat: 1518954493,
  id: 7
};

describe('Authentication action creators', () => {
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());

  it('should dispatch SET_CURRENT_USER on login success', () => {
    moxios.stubRequest('/api/v1/users/signin', {
      status: 200,
      response: {
        token: testToken
      },
    });

    const store = mockStore({});
    const expectedActions = [{
      type: types.SET_CURRENT_USER,
      user: testUser,
    }];

    return store.dispatch(authActions.login({
      email: 'ucheya@gmail.com',
      password: '1235456789'
    })).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('should dispatch SET_CURRENT_USER on signup success', () => {
    const signUpToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NywiZnVsbE5hbWUiOiJ1Y2hleWEgT2tlcmVrZSIsInVzZXJOYW1lIjoidWNoZXlhIiwiZW1haWwiOiJ1Y2hleWFAZ21haWwuY29tIiwiaWF0IjoxNTE4OTU0NDkzLCJleHAiOjE1MTkwNDA4OTN9.2X4NoiYaMHP3TLTsRUrV2LF_UbVH-0J1WFltqy1MJNY';
    moxios.stubRequest('/api/v1/users/signup', {
      status: 201,
      response: {
        user: {
          token: signUpToken
        }
      },
    });

    const store = mockStore({});
    const expectedActions = [{
      type: types.SET_CURRENT_USER,
      user: signUpUser,
    }];

    return store.dispatch(authActions.userSignupRequest({
      fullName: 'ucheya Okereke',
      userName: 'ucheya',
      email: 'ucheya@gmail.com',
      password: 123456789
    })).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('should logout a user', () => {
    const store = mockStore({});
    const expectedActions = [{
      type: types.SET_CURRENT_USER,
      user: {},
    }];

    store.dispatch(authActions.logout());
    expect(store.getActions()).toEqual(expectedActions);
  });
});
