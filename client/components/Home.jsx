import React, { Component } from 'react';
import { connect } from 'react-redux';

import Slider from './Slider.jsx';
import RecipeCard from '../components/Recipes/RecipeCard/RecipeCard.jsx';
import { getTopRecipes } from '../actions/recipeActions/';

/**
 * @param { Home } Home
 * @returns { Home } Home
 * @desc this class returns a Home component
 */
class Home extends Component {
  /**
   * Creates an instance of Home.
   * @param {any} props
   * @memberof Home
   * @returns { void }
   */
  constructor(props) {
    super(props);
    this.state = {
      topRecipes: []
    };
  }
  /**
   * @param {any} props
   * @memberof Home
   * @returns { void }
   */
  componentDidMount() {
    this.props.getTopRecipes()
      .then(() => {
        this.setState({ topRecipes: this.props.topRecipes });
      });
  }

  /**
   * @returns {void }
   * @memberof Home
   */
  render() {
    const { topRecipes } = this.state;

    const recipes = topRecipes.map(recipe => (
      <RecipeCard key={recipe.id} recipeList={recipe} />
    ));
    return (
      <div>
        <Slider />
        <h6 id="title4">Top Recipes</h6>
        <div className="container top">
          <div className="row">{recipes}</div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  topRecipes: state.recipesReducer.recipes
});


export default connect(mapStateToProps, { getTopRecipes })(Home);
