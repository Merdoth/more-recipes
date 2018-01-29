import { combineReducers } from 'redux';

import recipeReducer from './recipeReducer';
import recipesReducer from './recipesReducer';
import setCurrentUser from './setCurrentUser';

const rootReducer = combineReducers({
  recipesReducer,
  recipeReducer,
  setCurrentUser,
});


export default rootReducer;
