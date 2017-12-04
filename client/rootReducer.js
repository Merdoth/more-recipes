import { combineReducers } from 'redux';

import recipeReducer from './reducers/recipeReducer';
import flashMessages from './reducers/flashMessages';

const reducers = combineReducers({
  flashMessages,
  recipeReducer
});

const rootReducer = (state, action) => reducers(state, action);

export default rootReducer;
