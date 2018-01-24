import React from 'react';
import RecipeCardImage from './RecipeCardImage.jsx';
import RecipeCardDes from './RecipeCardDes.jsx';
import RecipeCardFooter from './RecipeCardFooter.jsx';


/**
 *
 */
class RecipeCard extends React.Component {
  /**
   *
   * @returns {jsx} JSX
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
