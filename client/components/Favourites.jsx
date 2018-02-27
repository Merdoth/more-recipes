import React, { Component } from 'react';
import { connect } from 'react-redux';
import { RecipeCard } from './Recipes/RecipeCard/RecipeCard.jsx';
import { getFavourite } from '../actions/recipeActions/';

/**
 * @description this class returns a  Favourites component
 *
 * @returns { undefined }
 *
 */
export class Favourites extends Component {
  /**
  * Creates an instance of RecipeDetails.
  * @param { Object } props
  *
  * @memberof Favourites
  *
  * @returns { Object } json - payload
  */
  constructor(props) {
    super(props);
    this.state = {
      favourites: [],
    };
  }
  /**
   *
   * @memberof  Favourites
   *
   * @returns { Object } json - payload
   */
  componentDidMount() {
    const { id } = this.props.user;
    if (id) {
      this.props.getFavourite(id);
    }
  }
  /**
   *
   * @param { Object } nextProps
   *
   * @returns { Object } json - payload
   */
  componentWillReceiveProps(nextProps) {
    if (nextProps) {
      const { favourites } = nextProps;
      this.setState(() => ({
        favourites,
      }));
    }
  }
  /**
   *
   * @returns { undefined }
   *
   * @memberof  Favourites
   */
  render() {
    const recipes = this.state.favourites.length !== 0 ? this.state.favourites.map(favourite => (
      <RecipeCard
      key={`recipes-${favourite.recipe.id}`}
      recipeList={favourite.recipe} />
    )) : [];
    const userFavourites = recipes.length === 0 ? 'You have no Favorites yet. Try creating one' : recipes;
    const pageCountStyle = recipes.length === 0 ? 'no-recipe' : '';
    return (
      <div className="main-wrapper">
        <div className="container manage">
          <div className="recipe-header">
            <h2>Recipes</h2>
            <p>Feel free to manage your own account</p>
          </div>
        </div>
        <div className="recipe-wrapper">
          <div className="container top">
            <div className={`row ${pageCountStyle}`}>{userFavourites}</div>
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
