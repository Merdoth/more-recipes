import React from 'react';
import { connect } from 'react-redux';

import Slider from './Slider.jsx';
import SearchBar from './SearchBar.jsx';
import RecipeCard from '../components/Recipes/RecipeCard/RecipeCard.jsx';
import { getTopRecipes } from '../actions/recipeActions/';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      topRecipes: []
    };
  }
  componentDidMount() {
    this.props.getTopRecipes().then(() => {
      this.setState({
        topRecipes: this.props.topRecipes
      });
    });
  }

  render() {
    const { topRecipes } = this.state;

    const recipes = topRecipes.map(recipe => (
      <RecipeCard key={recipe.id} recipeList={recipe} />
    ));
    return (
      <div>
        <Slider />
        <SearchBar />
        <h6 id="title4">Top Recipes</h6>
        <div className="container top">
          <div className="row">
            {recipes}
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    topRecipes: state.recipes
  };
}

export default connect(mapStateToProps, { getTopRecipes })(Home);
