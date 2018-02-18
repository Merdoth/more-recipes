import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactPaginate from 'react-paginate';
import { searchRecipe } from '../../actions/recipeActions';
import RecipeCard from '../Recipes/RecipeCard/RecipeCard.jsx';

/**
 * @param {  Object }  Recipes
 *
 * @returns {  undefined }
 *
 * @desc this class returns a  Recipes component
 */
class SearchResult extends Component {
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
   * @returns { undefined }
   */
  componentDidMount() {
    const { name, limit, offset } = this.props.location.state;
    this.props.searchRecipe(name, limit, offset);
  }

  /**
   * @description this method provides data for paginations of the recipe search
   *
   * @param { Object } searchData
   *
   * @return { undefined }
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
    return (
      <div>
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
            <div className="row">
              {foundRecipes}
            </div>
            <div className="row pagination">
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
