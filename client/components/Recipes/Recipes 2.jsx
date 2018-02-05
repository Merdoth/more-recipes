import React, { Component } from 'react';
import { connect } from 'react-redux';
import RecipeCard from './RecipeCard/RecipeCard.jsx';
import { getUserRecipes, getAllRecipes } from '../../actions/recipeActions/';

const routeMap = {
  '/recipes': {
    reducerKey: 'rows',
    fn: getAllRecipes,
    title:
      'Try, contribute to others recipe value by adding how your feel about the recipes'
  },
  '/myrecipes': {
    reducerKey: 'recipes',
    fn: getUserRecipes,
    title: 'Feel free to manage your own account'
  }
};

/**
 * @param {  UserRecipes }  UserRecipes
 *
 * @returns {  Object }  UserRecipes
 *
 * @desc this class returns a  Recipes component
 */
class Recipes extends Component {
  /**
   * @param { object } userId
   *
   * @memberof  Recipes
   *
   * @returns { undefined }
   */
  componentDidMount() {
    this.props.action();
  }
  /**
   *,k
   * @returns { undefined }
   *
   * @memberof  UserRecipes
   */
  render() {
    const recipes = this.props.recipes.map(recipe => (
      <RecipeCard key={`recipes-${recipe.id}`} recipeList={recipe} />
    ));
    return (
      <div>
        <div className="container manage">
          <div className="recipe-header">
            <h2>Recipes</h2>
          </div>
          <div className="recipe-header-picture">
            <p>{this.props.title}</p>
          </div>
        </div>
        <hr />
        <div className="container top">
          <div className="row">{recipes}</div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const { title, reducerKey } = routeMap[ownProps.match.url];
  return { recipes: state.recipesReducer[reducerKey] || [], title };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  const { fn } = routeMap[ownProps.match.path];
  return { action: () => dispatch(fn()) };
};

export default connect(mapStateToProps, mapDispatchToProps)(Recipes);
