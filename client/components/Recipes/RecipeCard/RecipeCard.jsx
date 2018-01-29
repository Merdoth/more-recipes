import React, { Component } from 'react';
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
      <div className="col-md-4 col-sm-4">
        <div className="top-items">
          <div className="rated">
            <RecipeCardImage src={this.props.recipeList.image} />
            <RecipeCardDes
              title={this.props.recipeList.recipeName}
              text={this.props.recipeList.procedure}
              id={this.props.recipeList.id}
            />
            <RecipeCardFooter {...this.props.recipeList.id} />
          </div>
        </div>
      </div>
    );
  }
}

export default RecipeCard;
