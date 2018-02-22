import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import mockLocalStorage from '../../__mocks__/mockLocalStorage';
import * as types from '../../../actions/actionTypes';
import * as votesActions from '../../../actions/recipeActions/votes';
import mockData from '../../__mocks__/mockData';


/* global expect jest */
const mockStore = configureMockStore([thunk]);
window.localStorage = mockLocalStorage;


describe('Votes action creators', () => {
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());


  it('should dispatch UPVOTE_RECIPE_SUCCESS', () => {
    const { votes } = mockData;
    moxios.stubRequest('/api/v1/votes/1/upvotes', {
      status: 201,
      response: votes
    });

    const expectedActions = [{
      type: types.UPVOTE_RECIPE_SUCCESS,
      recipe: votes.recipe
    }];
    const store = mockStore({});

    store.dispatch(votesActions.upvoteRecipe(1)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('should dispatch UPVOTE_RECIPE_FAILURE', (done) => {
    const error = new Error('Request failed with status code 404');
    moxios.stubRequest('/api/v1/votes/1/upvotes', {
      status: 404,
      response: error
    });
    const expectedActions = [{
      type: types.UPVOTE_RECIPE_FAILURE,
      error,
    }];
    const store = mockStore({});

    store.dispatch(votesActions.upvoteRecipe(1)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
      done();
    });
  });

  it('should dispatch DOWNVOTE_RECIPE_SUCCESS', () => {
    const { votes } = mockData;
    moxios.stubRequest('/api/v1/votes/1/downvotes', {
      status: 201,
      response: votes
    });

    const expectedActions = [{
      type: types.DOWNVOTE_RECIPE_SUCCESS,
      payload: votes.recipe
    }];
    const store = mockStore({});

    store.dispatch(votesActions.downVoteRecipe(1)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('should dispatch  DOWNVOTE_RECIPE_FAILURE', (done) => {
    const error = new Error('Request failed with status code 404');
    moxios.stubRequest('/api/v1/votes/1/downvotes', {
      status: 404,
      response: error
    });
    const expectedActions = [{
      type: types.DOWNVOTE_RECIPE_FAILURE,
      error,
    }];
    const store = mockStore({});

    store.dispatch(votesActions.downVoteRecipe(1)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
      done();
    });
  });
});
