import React from 'react';
import { connect } from 'react-redux';

import Slider from './Slider.jsx';
import SearchBar from './SearchBar.jsx';
import RecipeCard from '../components/RecipeCard/RecipeCard.jsx';
import getTopRecipes from '../actions/recipeActions/recipeActions';

class Home extends React.Component {
  render() {
    return (
            <div>
                <Slider />
                <SearchBar />
                <RecipeCard topRecipes={this.props.topRecipes} />
            </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    topRecipes: state.recipeReducer
  };
}

export default connect(mapStateToProps, { getTopRecipes })(Home);
