import { combineReducers } from 'redux';

import recipeReducer from './recipeReducer';
import setCurrentUser from './setCurrentUser';

const reducers = combineReducers({
  recipeReducer,
  setCurrentUser
});

const rootReducer = (state, action) => reducers(state, action);

export default rootReducer;
