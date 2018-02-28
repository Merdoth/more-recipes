import React from 'react';
import { Link } from 'react-router-dom';
import RecipeCardImage from './RecipeCardImage.jsx';
import RecipeCardDes from './RecipeCardDes.jsx';
import RecipeCardFooter from './RecipeCardFooter.jsx';

/**
 * @description Helper component for rendering a recipe
 *
 * @param { Object } props
 *
 * @returns {object} returns RecipeCard component
 */
export const RecipeCard = props => (
  <div className="col-md-4 col-sm-4 main-card">
    <div className="top-items">
      <Link className="rated" to={`recipe-details/${props.recipeList.id}`}>
        <RecipeCardImage src={props.recipeList.image} />
        <RecipeCardDes
          title={props.recipeList.recipeName}
          text={props.recipeList.description}
        />
        <RecipeCardFooter {...props.recipeList.id }
        upVotes={props.recipeList.upVotes}
          downVotes={props.recipeList.downVotes }
          views={props.recipeList.views} />
      </Link>
    </div>
  </div>
);

export default RecipeCard;
