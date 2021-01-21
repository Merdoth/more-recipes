import React from 'react';


/**
 *
 * @description Helper component for rendering recipe description
 *
 * @method RecipeCardDes
 *
 * @returns {object} returns RecipeCardDes component
 * .
 */
export const RecipeCardDes = ({ title, text }) => (
  <div className="des text-truncate">
      <h2>{title}</h2>
    <h4>{text}</h4>
  </div>
);

export default RecipeCardDes;
