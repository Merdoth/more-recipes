import React, { Component } from 'react';
import { connect } from 'react-redux';
import RecipeCard from './RecipeCard/RecipeCard.jsx';
import { getUserRecipes } from '../../actions/recipeActions/';

/**
 * @param {  UserRecipes }  UserRecipes
 *
 * @returns {  Object }  UserRecipes
 *
 * @desc this class returns a  Recipes component
 */
class UserRecipes extends Component {
  /**
   * @param { object } userId
   *
   * @memberof  Recipes
   *
   * @returns { undefined }
   */
  componentDidMount() {
    const userId = this.props.match.params;
    this.props.getUserRecipes(userId);
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
            <p>Feel free to manage your own account</p>
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

const mapStateToProps = state => ({
  recipes: state.recipesReducer.recipes || []
});

export default connect(mapStateToProps, { getUserRecipes })(UserRecipes);
