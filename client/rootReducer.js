import { combineReducers } from 'redux';

import topRecipes from './reducers/recipeReducer';
import flashMessages from './reducers/flashMessages';
import setCurrentUser from './reducers/setCurrentUser';

const reducers = combineReducers({
  flashMessages,
  topRecipes,
  setCurrentUser
});

const rootReducer = (state, action) => reducers(state, action);

export default rootReducer;
