import React from 'react';
import { Icons } from '../../common/Icons.jsx';

/**
 *
 * @description This holds recipe icons
 *
 * @method  RecipeCardFooter
 *
 * @returns { undefined }
 * .
 */
const RecipeCardFooter = () => (
  <div className="itemReview row">
    <Icons upvotes={150} downvotes={150} views={150} />
  </div>
);
export default RecipeCardFooter;
