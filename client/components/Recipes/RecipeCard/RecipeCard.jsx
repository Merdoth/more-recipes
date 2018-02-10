import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import RecipeCardImage from './RecipeCardImage.jsx';
import RecipeCardDes from './RecipeCardDes.jsx';
import RecipeCardFooter from './RecipeCardFooter.jsx';

/**
 * @description this holders alkl the appreciation buttons and recipe image
 *
 * @param { RecipeCard } RecipeCard
 *
 * @returns { RecipeCard } RecipeCard
 */
class RecipeCard extends Component {
  /**
   *
   * @returns { undefined }
   *
   * @memberof ReciprecipeeCard
   */
  render() {
    return (
      <div className="col-md-4 col-sm-4 main-card">
        <div className="top-items">
          <Link className="rated" to={`recipe-details/${this.props.recipeList.id}`}>
            <RecipeCardImage src={this.props.recipeList.image} />
            <RecipeCardDes
              title={this.props.recipeList.recipeName}
              text={this.props.recipeList.description}
            />
            <RecipeCardFooter {...this.props.recipeList.id} />
          </Link>
        </div>
      </div>
    );
  }
}

export default RecipeCard;
