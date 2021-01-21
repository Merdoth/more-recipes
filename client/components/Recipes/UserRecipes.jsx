import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactPaginate from 'react-paginate';
import RecipeCard from './RecipeCard/RecipeCard.jsx';
import { getUserRecipes } from '../../actions/recipeActions/';

/**
 * @description this component returns a User Recipes
 *
 * @returns { undefined }  UserRecipes
 *
 */
export class UserRecipes extends Component {
  /**
 *
 * @param { Object } props
 *
 * @memberof Recipes
 * 
 * @returns { Object } json - payload
 */
  constructor(props) {
    super(props);
    this.state = {
      page: 1,
      limit: 6,
      offset: 0,
    };
    this.pageClick = this.pageClick.bind(this);
  }

  /**
   *
   * @memberof  Recipes
   *
   * @returns { Object } json - payload
   */
  componentDidMount() {
    const { page, offset, limit } = this.state;
    this.props.getUserRecipes(page, offset, limit);
  }

  /**
   * @description this method provides data for paginations of the recipe search
   *
   * @param { Object } searchData
   *
   * @return { Object } json - payload
   */
  pageClick(searchData) {
    const { selected } = searchData;
    const { limit, offset } = this.state;
    const page = Number(selected) + 1;
    this.props.getUserRecipes(page, offset, limit);
  }

  /**
   * @memberof  UserRecipes
   *
   * @returns { undefined }
   *
   */
  render() {
    const recipes = this.props.recipes.map(recipe => (
      <RecipeCard key={`recipes-${recipe.id}`} recipeList={recipe} />
    ));
    const recipeResult = recipes.length === 0 ? 'You don\'t have any recipes yet. try creating some' : recipes;
    const noResultStyle = recipes.length === 0 ? 'no-recipe' : '';
    const pageCountStyle = recipes.length === 0 ? 'page-count' : '';
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
            <div className={`row ${noResultStyle}`}>{recipeResult}</div>
            <div className={`row pagination ${pageCountStyle}`}>
              <ReactPaginate
                previousLabel="previous"
                nextLabel="next"
                breakClassName="break-me"
                pageCount={this.props.pagination.pageCount}
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                onPageChange={this.pageClick}
                containerClassName='pagination'
                subContainerClassName="pages pagination"
                activeClassName="active"
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  recipes: (state.recipesReducer.userRecipes || {}).rows || [],
  pagination: state.recipesReducer.paginate || {}
});

export default connect(mapStateToProps, { getUserRecipes })(UserRecipes);
