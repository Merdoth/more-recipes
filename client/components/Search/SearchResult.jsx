import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactPaginate from 'react-paginate';
import { searchRecipe } from '../../actions/recipeActions';
import { RecipeCard } from '../Recipes/RecipeCard/RecipeCard.jsx';

/**
 * @param {  Object }  Recipes
 *
 * @returns {  undefined }
 *
 * @desc this class returns a  Recipes component
 */
export class SearchResult extends Component {
  /**
   * Creates an instance of SearchResult.
   *
   * @param { Object } props
   *
   * @memberof SearchResult
   */
  constructor(props) {
    super(props);
    this.pageClick = this.pageClick.bind(this);
  }
  /**
   *
   * @memberof  Recipes
   *
   * @returns { Object } json - payload
   */
  componentDidMount() {
    const { name, limit, offset } = this.props.location.state;
    this.props.searchRecipe(name, limit, offset);
  }

  /**
   * @description returns data for paginations of recipe search
   *
   * @param { Object } searchData
   *
   * @return { Object } json - payload
   */
  pageClick(searchData) {
    const { selected } = searchData;
    let { name, limit } = this.props.location.state;
    const queryName = name;
    limit = 6;
    this.props.searchRecipe(queryName, limit, selected);
  }
  /**
   * @returns { undefined }
   *
   * @memberof  Recipes
   */
  render() {
    const foundRecipes = this.props.recipes.map(recipe => (
      <RecipeCard key={`recipes-${recipe.id}`} recipeList={recipe} />
    ));
    const recipeResult = foundRecipes.length === 0 ?
      'No recipes found with that name' : foundRecipes;
    const noResultStyle = foundRecipes.length === 0 ? 'no-recipe' : '';
    const pageCountStyle = foundRecipes.length === 0 ? 'page-count' : '';
    return (
      <div className="main-wrapper">
        <div className="container manage">
          <div className="recipe-header">
            <h2>Recipes</h2>
            <p>
              Below are your search result
            </p>
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
  recipes: state.search.recipe.rows || [],
  pagination: state.search.paginationData || {}
});

export default connect(mapStateToProps, { searchRecipe })(SearchResult);
