import { combineReducers } from 'redux';

import recipeReducer from './reducers/recipeReducer';

const reducers = combineReducers({
  recipeReducer
});

const rootReducer = (state, action) => {
  return reducers(state, action);
};

export default rootReducer;