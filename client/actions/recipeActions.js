import axios from 'axios';

export function getTopRecipes() {
  return dispatch => {
    axios.get('/api/v1/recipes?sort=upvotes&order=des').then((res) => {
      console.log(res.data, 'ucheya');
      dispatch({
        type: 'GET_TOP_RECIPES',
        recipes: res.data
      });
    }); 
  };
}
