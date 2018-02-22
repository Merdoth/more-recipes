import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import mockLocalStorage from '../../__mocks__/mockLocalStorage';
import * as types from '../../../actions/actionTypes';
import * as userActions from '../../../actions/userActions/index';


/* global expect jest */
const mockStore = configureMockStore([thunk]);
window.localStorage = mockLocalStorage;


describe('User action creators', () => {
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());


  it('should dispatch GET_ONE_USER_SUCCESS', () => {
    const user = {
      user: {
        email: 'ucheya@gmail.com',
        fullName: 'ucheya',
        userName: 'meya',
        favourite: []
      }
    };
    moxios.stubRequest('/api/v1/user', {
      status: 200,
      response: user
    });
    const store = mockStore({});

    return store.dispatch(userActions.getOneUser());
  });

  it('should dispatch GET_ONE_USER_FAILURE', () => {
    const error = new Error('Request failed with status code 404');
    moxios.stubRequest('/api/v1/user', {
      status: 404,
      response: error
    });
    const store = mockStore({});

    return store.dispatch(userActions.getOneUser());
  });

  it('should dispatch UPDATE_USER_PROFILE_SUCCESS', () => {
    const user = {
      user: {
        email: 'ucheya@gmail.com',
        fullName: 'ucheya',
        userName: 'meya',
        favourite: []
      }
    };
    const userData = {
      firstname: 'chick'
    };
    moxios.stubRequest('/api/v1/update', {
      status: 200,
      response: user
    });
    const store = mockStore({});

    return store.dispatch(userActions.updateUserProfile(userData));
  });

  it('should dispatch UPDATE_USER_PROFILE_FAILURE', () => {
    const error = new Error('Request failed with status code 404');
    moxios.stubRequest('/api/v1/update', {
      status: 404,
      response: error
    });
    const store = mockStore({});

    return store.dispatch(userActions.updateUserProfile());
  });
});
