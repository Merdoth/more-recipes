import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Slider from './Slider.js';
import SearchBar from './SearchBar.js';
import RecipeCard from './RecipeCard.js';
import Footer from './Footer';
import { getTopRecipes } from '../actions/recipeActions';

class Home extends React.Component {
    componentDidMount() {
        this.props.getTopRecipes();
    }

    render() {
        const { getTopRecipes } = this.props;
        console.log(this.props.topRecipes, 'taiwo')
        return(
            <div>
                <Slider />
                <SearchBar />
                <RecipeCard topRecipes={this.props.topRecipes} />
                <Footer />
            </div>
        );
    }
}

Home.propTypes = {
    getTopRecipes: PropTypes.func.isRequired
}

function mapStateToProps(state) {
    return {
        topRecipes: state.recipeReducer
    }
};

export default connect(mapStateToProps, { getTopRecipes })(Home);
