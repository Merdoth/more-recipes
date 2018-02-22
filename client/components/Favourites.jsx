import React, { Component } from 'react';
import { connect } from 'react-redux';
import { RecipeCard } from './Recipes/RecipeCard/RecipeCard.jsx';
import { getFavourite } from '../actions/recipeActions/';

/**
 * @param { Object }  Favourites
 *
 * @returns { undefined }
 *
 * @description this class returns a  Favourites component
 */
export class Favourites extends Component {
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
            <p>Feel free to manage your own account</p>
          </div>
        </div>
        <div className="recipe-wrapper">
          <div className="container top">
            <div className="row">{recipes}</div>
          </div>
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
