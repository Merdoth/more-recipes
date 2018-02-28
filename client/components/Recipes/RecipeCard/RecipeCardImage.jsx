import React from 'react';

/**
 *
 * @description Helper function that renders recipe image
 *
 * @method RecipeCardImage
 *
 * @returns {object} returns RecipeCardImage component
 * .
 */
export const RecipeCardImage = ({ src }) => (
  <div className="imgholder">
    <img src={src} />
  </div>
);

export default RecipeCardImage;
