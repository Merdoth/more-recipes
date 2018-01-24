import { applyMiddleware, combineReducers } from 'redux';
import logger from 'redux-logger';

import recipes from './reducers/recipeReducer';
import setCurrentUser from './reducers/setCurrentUser';

const reducers = combineReducers({
  recipes,
  setCurrentUser
});

const rootReducer = (state, action) => reducers(state, action);

export default rootReducer;
