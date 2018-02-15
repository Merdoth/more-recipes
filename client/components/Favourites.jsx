import React, { Component } from 'react';
import { connect } from 'react-redux';
import RecipeCard from './Recipes/RecipeCard/RecipeCard.jsx';
import { getFavourite } from '../actions/recipeActions/';

/**
 * @param {  Favourites }  Favourites
 *
 * @returns {  Object }  Favourites
 *
 * @desc this class returns a  Favourites component
 */
class Favourites extends Component {
  /**
   * @param { Number } id
   *
   * @memberof  Favourites
   *
   * @returns { undefined }
   */
  componentDidMount() {
    const { id } = this.props.user;
    if (id) {
      this.props.getFavourite(id);
    }
  }

  /**
   *
   * @returns { undefined }
   *
   * @memberof  Favourites
   */
  render() {
    const recipes = this.props.favourites.map(favourite => (
      <RecipeCard key={`recipes-${favourite.recipe.id}`} recipeList={favourite.recipe} />
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
  recipes: (state.recipesReducer.recipesFound || {}).rows || [],
  favourites: state.favourite.favourite || [],
  user: state.setCurrentUser.user,

});

export default connect(mapStateToProps, { getFavourite })(Favourites);
