import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import mockLocalStorage from '../../__mocks__/mockLocalStorage';
import * as types from '../../../actions/actionTypes';
import * as recipesActions from '../../../actions/recipeActions/index';
import mockData from '../../__mocks__/mockData';

/* global expect jest */
const mockStore = configureMockStore([thunk]);
window.localStorage = mockLocalStorage;


describe('Recipes action creators', () => {
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());


  it('should dispatch GET_ONE_RECIPE', (done) => {
    const { recipe } = mockData;
    moxios.stubRequest('/api/v1/user/1/recipes/1', {
      status: 200,
      response: recipe
    });
    const expectedActions = [{
      type: types.GET_ONE_RECIPE,
      payload: recipe.recipesFound,
    }];
    const store = mockStore({});

    return store.dispatch(recipesActions.getOneRecipe(1, 1)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
      done();
    });
  });

  it('should dispatch GET_ONE_RECIPE_FAILURE', (done) => {
    const error = new Error('Request failed with status code 404');
    moxios.stubRequest('/api/v1/user/1/recipes/200', {
      status: 404,
      response: error
    });
    const expectedActions = [{
      type: types.GET_ONE_RECIPE_FAILURE,
      error,
    }];
    const store = mockStore({});

    store.dispatch(recipesActions.getOneRecipe(1, 200)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
      done();
    });
  });

  it('should dispatch DELETE_RECIPE_SUCCESS', (done) => {
    const message = 'Recipe Deleted';
    moxios.stubRequest('/api/v1/recipes/3', {
      status: 200,
      response: message
    });
    const expectedActions = [{
      type: types.DELETE_RECIPE_SUCCESS,
      message,
    }];
    const store = mockStore({});

    return store.dispatch(recipesActions.deleteRecipe(3)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
      done();
    });
  });

  it('should dispatch DELETE_RECIPE_FAILURE', (done) => {
    const error = new Error('Request failed with status code 404');
    moxios.stubRequest('/api/v1/recipes/200', {
      status: 404,
      response: { error }
    });
    const expectedActions = [{
      error: {
        error
      },
      type: types.DELETE_RECIPE_FAILURE,
    }];
    const store = mockStore({});

    store.dispatch(recipesActions.deleteRecipe(200)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
      done();
    });
  });

  it('should dispatch GET_ALL_RECIPES', () => {
    const { recipes } = mockData;
    moxios.stubRequest('/api/v1/recipes?page=1&offset=0&limit=1', {
      status: 200,
      response: recipes
    });
    const expectedActions = [{
      type: types.GET_ALL_RECIPES,
      recipes,
    }];
    const store = mockStore({});

    return store.dispatch(recipesActions.getAllRecipes(1, 0, 1)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('should dispatch GET_USER_RECIPES_SUCCESS', async (done) => {
    const { recipes } = mockData;
    moxios.stubRequest('/api/v1/myrecipes?page=1&offset=0&limit=1', {
      status: 200,
      response: recipes
    });
    const expectedActions = [{
      type: types.GET_USER_RECIPES_SUCCESS,
      recipes,
    }];
    const store = mockStore({});

    await store.dispatch(recipesActions.getUserRecipes(1, 0, 1)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
      done();
    });
  });

  it('should dispatch GET_USER_RECIPES_FAILURE', (done) => {
    const error = new Error('Request failed with status code 404');
    moxios.stubRequest('/api/v1/myrecipes?page=0&offset=0&limit=0', {
      status: 404,
      response: error
    });
    const expectedActions = [{
      type: types.GET_USER_RECIPES_FAILURE,
      error,
    }];
    const store = mockStore({});

    store.dispatch(recipesActions.getUserRecipes(0, 0, 0)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
      done();
    });
  });

  it('should dispatch UPDATE_RECIPE_SUCCESS', () => {
    const { recipes } = mockData;
    const message = 'Recipe Successfully Updated';
    const id = 6;

    moxios.stubRequest('https://api.cloudinary.com/v1_1/ucheya/image/upload', {
      status: 200,
      response: { data_url: '/img/toast_qaxxcy.jpg' }
    });

    moxios.stubRequest(`/api/v1/recipes/${id}`, {
      status: 200,
      response: { updatedRecipe: recipes.updatedRecipe, message }
    });
    const expectedActions = [{
      type: types.UPDATE_RECIPE_SUCCESS,
      recipe: recipes.updatedRecipe,
    }];
    const store = mockStore({});

    return store.dispatch(recipesActions.updateRecipe(id, recipes)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });


  it('should dispatch UPDATE_RECIPE_FAILURE', () => {
    const { recipeState } = mockData;

    const error = new Error('Request failed with status code 400');
    moxios.stubRequest('/api/v1/recipes/10', {
      status: 400,
      response: error
    });

    moxios.stubRequest('https://api.cloudinary.com/v1_1/ucheya/image/upload', {
      status: 400,
      response: error
    });
    const expectedActions = [{
      error,
      type: types.UPDATE_RECIPE_FAILURE
    }];

    const store = mockStore({});

    return store.dispatch(recipesActions.updateRecipe(10, recipeState)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('should dispatch ADD_RECIPE_SUCCESS', (done) => {
    const { recipeStateSuccess, recipes } = mockData;

    moxios.stubRequest('/api/v1/recipes', {
      status: 201,
      response: { recipes }
    });

    moxios.stubRequest('https://api.cloudinary.com/v1_1/ucheya/image/upload', {
      status: 200,
      response: { data_url: '/img/toast_qaxxcy.jpg' }
    });


    const expectedActions = [{
      type: types.ADD_RECIPE_SUCCESS,
      recipe: { recipes }
    }];
    const store = mockStore({});

    store.dispatch(recipesActions.addRecipes(recipeStateSuccess)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
    done();
  });

  it('should dispatch ADD_RECIPE_FAILURE', () => {
    const { recipeState } = mockData;

    const error = new Error('Request failed with status code 400');

    moxios.stubRequest('https://api.cloudinary.com/v1_1/ucheya/image/upload', {
      status: 400,
      response: error
    });

    moxios.stubRequest('/api/v1/recipes', {
      status: 400,
      response: error
    });

    const expectedActions = [{
      error,
      type: types.ADD_RECIPE_FAILURE
    }];

    const store = mockStore({});

    return store.dispatch(recipesActions.addRecipes(recipeState)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('should dispatch SEARCH_RECIPE_SUCCESS', () => {
    const { recipe } = mockData;
    moxios.stubRequest('/api/v1/search?name=sweet&limit=1&offset=0', {
      status: 200,
      response: recipe
    });


    const expectedActions = [{
      type: types.SEARCH_RECIPE_SUCCESS,
      payload: recipe,
    }];
    const store = mockStore({});

    store.dispatch(recipesActions.searchRecipe('sweet', 0, 1)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('should dispatch SEARCH_RECIPE_FAILURE', () => {
    const error = new Error('Request failed with status code 404');

    moxios.stubRequest('/api/v1/search?&limit=6&offset=0', {
      status: 404,
      response: error
    });

    const expectedActions = [{
      type: types.SEARCH_RECIPE_FAILURE,
      error,
    }];
    const store = mockStore({});

    store.dispatch(recipesActions.searchRecipe(6, 0)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('should dispatch GET_MOST_VOTED_SUCCESS', (done) => {
    const { recipes } = mockData;
    moxios.stubRequest('/api/v1/recipes?sort=upvotes&order=des', {
      status: 200,
      response: recipes
    });


    const expectedActions = [{
      type: types.GET_MOST_VOTED_SUCCESS,
      recipes,
    }];
    const store = mockStore({});

    store.dispatch(recipesActions.getMostVoted()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
      done();
    });
  });

  it('should dispatch GET_MOST_VOTED_FAILURE', () => {
    const error = new Error('Request failed with status code 404');
    moxios.stubRequest('/api/v1/recipes?sort=upvotes&order=des', {
      status: 404,
      response: error
    });
    const expectedActions = [{
      type: types.GET_MOST_VOTED_FAILURE,
      error
    }];
    const store = mockStore({});

    store.dispatch(recipesActions.getMostVoted()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('should dispatch ADD_FAVOURITE_SUCCESS', (done) => {
    const { favourite } = mockData;
    moxios.stubRequest('/api/v1/favourites', {
      status: 200,
      response: favourite
    });


    const expectedActions = [{
      type: types.ADD_FAVOURITE_SUCCESS,
      favourite: favourite.favourite
    }];
    const store = mockStore({});

    store.dispatch(recipesActions.addFavourite(1)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
      done();
    });
  });

  it('should dispatch ADD_FAVOURITE_FAILURE', (done) => {
    const error = new Error('Request failed with status code 400');
    moxios.stubRequest('/api/v1/favourites', {
      status: 400,
      response: error
    });


    const expectedActions = [{
      type: types.ADD_FAVOURITE_FAILURE,
      error
    }];
    const store = mockStore({});

    store.dispatch(recipesActions.addFavourite(1)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
      done();
    });
  });

  it('should dispatch REMOVE_FAVOURITE_FAILURE', () => {
    const error = new Error('Request failed with status code 409');
    moxios.stubRequest('/api/v1/favourites/200', {
      status: 409,
      response: error
    });


    const expectedActions = [{
      type: types.REMOVE_FAVOURITE_FAILURE,
      error
    }];
    const store = mockStore({});

    store.dispatch(recipesActions.removeFavourite(200)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('should dispatch GET_FAVOURITE_FAILURE', (done) => {
    const error = new Error('Request failed with status code 404');
    moxios.stubRequest('/api/v1/favourites/200', {
      status: 404,
      response: error
    });


    const expectedActions = [{
      type: types.GET_FAVOURITE_FAILURE,
      error
    }];
    const store = mockStore({});

    store.dispatch(recipesActions.getFavourite(200)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
      done();
    });
  });
});
