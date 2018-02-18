import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import mockLocalStorage from '../../__mocks__/mockLocalStorage';
import * as types from '../../../actions/actionTypes';
import * as reviewsActions from '../../../actions/recipeActions/reviews';


/* global expect jest */
const mockStore = configureMockStore([thunk]);
window.localStorage = mockLocalStorage;


describe('Authentication action creators', () => {
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());


  it('should dispatch POST_REVIEW_SUCCESS', () => {
    const review = {
      reviewReturned: {
        createdAt: '2018-02-20T20:30:33.169Z',
        id: 1,
        recipeId: 1,
        review: 'hello',
        updatedAt: '2018-02-20T20:30:33.169Z',
        userId: 1
      }
    };
    const reviewer = 'i love this food';
    moxios.stubRequest('/api/v1/recipes/1/reviews', {
      status: 201,
      response: review
    });

    const expectedActions = [{
      type: types.POST_REVIEW_SUCCESS,
      review: review.reviewReturned
    }];
    const store = mockStore({});

    store.dispatch(reviewsActions.addReview(1, reviewer)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('should dispatch POST_REVIEW_FAILURE', (done) => {
    const reviewer = '';
    const error = new Error('Request failed with status code 404');
    moxios.stubRequest('/api/v1/recipes/1/reviews', {
      status: 404,
      response: error
    });
    const expectedActions = [{
      type: types.POST_REVIEW_FAILURE,
      error,
    }];
    const store = mockStore({});

    store.dispatch(reviewsActions.addReview(1, reviewer)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
      done();
    });
  });
});
