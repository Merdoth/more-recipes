import React, { Component } from 'react';
import { connect } from 'react-redux';
import Slider from './Slider.jsx';
import { RecipeCard } from '../components/Recipes/RecipeCard/RecipeCard.jsx';
import { getMostVoted } from '../actions/recipeActions/';

/**
 * @description this class returns a Home component
 *
 * @returns { undefined }
 *
 */
export class Home extends Component {
  /**
   * @memberof Home
   *
   * @returns { undefined }
   */
  componentDidMount() {
    this.props.getMostVoted();
  }

  /**
   * @returns { undefined }
   *
   * @memberof Home
   */
  render() {
    const recipes = this.props.recipes.map(recipe => (
      <RecipeCard key={`recipes-${recipe.id}`} recipeList={recipe} />
    ));
    return (
      <div >
        <Slider />
        <div className="recipe-wrapper">
        <div className="container top">
          <h6 id="title4">Top Recipes</h6>
          <div className="row">{recipes}</div>
        </div>
      </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  recipes:
   (state.recipesReducer.recipesFound || {}).rows || []
});

export default connect(mapStateToProps, { getMostVoted })(Home);
