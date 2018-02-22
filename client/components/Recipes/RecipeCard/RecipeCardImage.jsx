import React from 'react';

/**
 *
 * @description This holds recipe images
 *
 * @method RecipeCardImage
 *
 * @returns { undefined }
 * .
 */
export const RecipeCardImage = ({ src }) => (
  <div className="imgholder">
    <img src={src} />
  </div>
);

export default RecipeCardImage;
