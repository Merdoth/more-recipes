import React, { Component } from 'react';
import { connect } from 'react-redux';

import Slider from './Slider.jsx';
import RecipeCard from '../components/Recipes/RecipeCard/RecipeCard.jsx';
import { getMostVoted } from '../actions/recipeActions/';

/**
 * @param { Object } Home
 *
 * @returns { undefined }
 *
 * @description this class returns a Home component
 */
class Home extends Component {
  /**
   * Creates an instance of Home.
   * @param {object} props
   *
   * @memberof Home
   *
   * @returns { undefined }
   */
  constructor(props) {
    super(props);
    this.state = {
      topRecipes: []
    };
  }
  /**
   * @param { Function } props
   *
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
      <div>
        <Slider />
        <div className="top">
          <h6 id="title4">Top Recipes</h6>
          <div className="row">{recipes}</div>
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
