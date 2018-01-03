import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Slider from './Slider';
import SearchBar from './SearchBar';
import RecipeCard from './RecipeCard';
import getTopRecipes from '../actions/recipeActions';

class Home extends React.Component {
  componentDidMount() {
    this.props.getTopRecipes();
  }

  render() {
    // const { getTopRecipes } = this.props;
    return (
            <div>
                <Slider />
                <SearchBar />
                <RecipeCard topRecipes={this.props.topRecipes} />
            </div>
    );
  }
}

// Home.propTypes = {
//   getTopRecipes: PropTypes.func.isRequired
// };

function mapStateToProps(state) {
  return {
    topRecipes: state.recipeReducer
  };
}

export default connect(mapStateToProps, { getTopRecipes })(Home);
