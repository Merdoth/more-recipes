import React from 'react';


/**
 *
 * @description This gives the recipe descriptions
 *
 * @method RecipeCardDes
 *
 * @returns { undefined }
 * .
 */
const RecipeCardDes = ({ title, text }) => (
  <div className="des text-truncate">
      <h2>{title}</h2>
    <h4>{text}</h4>
  </div>
);

export default RecipeCardDes;
