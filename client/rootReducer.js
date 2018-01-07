import { combineReducers } from 'redux';

import topRecipes from './reducers/recipeReducer';
import flashMessages from './reducers/flashMessages';

const reducers = combineReducers({
  flashMessages,
  topRecipes
});

const rootReducer = (state, action) => reducers(state, action);

export default rootReducer;
