export default (state = {}, action={}) => {
  switch(action.type) {
  case 'GET_TOP_RECIPES': {
    return action.recipes;
  }
  default: {
    return state;
  }
  }
};