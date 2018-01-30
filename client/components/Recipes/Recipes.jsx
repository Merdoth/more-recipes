import React, { Component } from 'react';
import { connect } from 'react-redux';
import RecipeCard from './RecipeCard/RecipeCard.jsx';
import { getAllRecipes } from '../../actions/recipeActions/';

/**
 * @param {  Recipes }  Recipes
 *
 * @returns {  Recipes }  Recipes
 *
 * @desc this class returns a  Recipes component
 */
class Recipes extends Component {
  /**
   * Creates an instance of  Recipes.
   * @param { object } props
   *
   * @memberof  Recipes
   *
   * @returns { undefined }
   */
  constructor(props) {
    super(props);
    this.state = {
      recipes: []
    };
  }
  /**
   * @param { object } event
   *
   * @memberof  Recipes
   *
   * @returns { undefined }
   */
  componentDidMount() {
    this.props.getAllRecipes().then(() => {
      this.setState({
        recipes: this.props.recipes
      });
    });
  }

  /**
   * @param {object} nextProps
   *
   * @memberof  Recipes
   *
   * @returns { undefined }
   */
  componentWillReceiveProps(nextProps) {
    this.setState({
      recipes: nextProps.recipes
    });
  }

  /**
   * @returns { undefined }
   *
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
  recipes: state.recipesReducer.rows
});

export default connect(mapStateToProps, { getAllRecipes })(Recipes);
