import React, { Component } from 'react';
import { connect } from 'react-redux';
import RecipeCard from './RecipeCard/RecipeCard.jsx';
import { getAllRecipes } from '../../actions/recipeActions/';

/**
 * @param {  Recipes }  Recipes
 *
 * @returns {  Recipes }  Recipes
 *
 * @desc this class returns a  Recipes component
 */
class Recipes extends Component {
  /**
   *
   * @memberof  Recipes
   *
   * @returns { undefined }
   */
  componentDidMount() {
    this.props.getAllRecipes();
  }
  /**
   * @returns { undefined }
   *
   * @memberof  Recipes
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
            <p>Try, contribute to others recipe value by adding how your feel about the recipes</p>
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
  recipes: state.recipesReducer.rows || []
});

export default connect(mapStateToProps, { getAllRecipes })(Recipes);
