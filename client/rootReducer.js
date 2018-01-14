import { combineReducers } from 'redux';

import recipes from './reducers/recipeReducer';
import flashMessages from './reducers/flashMessages';
import setCurrentUser from './reducers/setCurrentUser';

const reducers = combineReducers({
  flashMessages,
  recipes,
  setCurrentUser
});

const rootReducer = (state, action) => reducers(state, action);

export default rootReducer;
