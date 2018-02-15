import { combineReducers } from 'redux';

import recipeReducer from './recipeReducer';
import recipesReducer from './recipesReducer';
import setCurrentUser from './setCurrentUser';
import favourite from './favourite';
import search from './search';
import getOneUser from './getOneUser';

const rootReducer = combineReducers({
  recipesReducer,
  recipeReducer,
  setCurrentUser,
  favourite,
  search,
  getOneUser
});


export default rootReducer;
