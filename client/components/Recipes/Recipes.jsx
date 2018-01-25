import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import RecipeCard from './RecipeCard/RecipeCard.jsx';
import { getAllRecipes } from '../../actions/recipeActions/';

/**
 * @param {  Recipes }  Recipes
 * @returns {  Recipes }  Recipes
 * @desc this class returns a  Recipes component
 */
class Recipes extends Component {
  /**
   * Creates an instance of  Recipes.
   * @param {any} props
   * @memberof  Recipes
   * @returns { void }
   */
  constructor(props) {
    super(props);
    this.state = {
      recipes: []
    };
  }
  /**
   * @param {any} event
   * @memberof  Recipes
   * @returns { void }
   */
  componentDidMount() {
    this.props.getAllRecipes().then(() => {
      this.setState({
        recipes: this.props.recipes
      });
    });
  }
  /**
   * @returns {void }
   * @memberof  Recipes
   */
  render() {
    const allRecipes = this.state.recipes;
    const recipes = allRecipes.map(recipe => (
      <RecipeCard key={recipe.id} recipeList={recipe} />
    ));
    return (
      <div>
        <div className="container manage">
          <div className="recipe-header">
            <h2>Recipes</h2>
          </div>
          <div className="recipe-header-picture">
            <p>Feel free to manage your own account</p>
            <img src="" alt="" />
            <img src="" alt="" />
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
  recipes: state.recipes
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getAllRecipes
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Recipes);
