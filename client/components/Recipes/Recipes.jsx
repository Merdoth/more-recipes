import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactPaginate from 'react-paginate';
import RecipeCard from './RecipeCard/RecipeCard.jsx';
import { getAllRecipes } from '../../actions/recipeActions/';

/**
 * @param { Object }  Recipes
 *
 * @returns { undefined }
 *
 * @description this class returns a  Recipes component
 */
export class Recipes extends Component {
  /**
  * Creates an instance of SearchResult.
  *
  * @param { Object } props
  *
  * @memberof Recipes
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
   * @returns { undefined }
   */
  componentDidMount() {
    const { page, offset, limit } = this.state;
    this.props.getAllRecipes(page, offset, limit);
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
    const { limit, offset } = this.state;
    const page = Number(selected) + 1;
    this.props.getAllRecipes(page, offset, limit);
  }

  /**
   * @returns { undefined }
   *
   * @memberof  Recipes
   */
  render() {
    const recipes = this.props.recipes.map(recipe => (
      <RecipeCard key={`recipes-${recipe.id}`} recipeList={recipe} />
    ));
    return (
      <div>
        <div className="container manage">
          <div className="recipe-header">
            <h2>Recipes</h2>
            <p>
              Try, contribute to others recipe value by adding how your feel
              about the recipes
            </p>
          </div>
        </div>
        <div className="recipe-wrapper">
          <div className="container top">
            <div className="row">{recipes}</div>
            <div className="row pagination">
              <ReactPaginate
                id="page"
                previousLabel="previous"
                nextLabel="next"
                breakClassName="break-me"
                pageCount={this.props.pagination.pageCount}
                marginPagesDisplayed={2}
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
  recipes: (state.recipesReducer.recipesFound || {}).rows || [],
  pagination: state.recipesReducer.paginate || {}

});

export default connect(mapStateToProps, { getAllRecipes })(Recipes);
