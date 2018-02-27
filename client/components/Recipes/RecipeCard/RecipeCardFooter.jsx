import React from 'react';
import { Icons } from '../../common/Icons.jsx';

/**
 *
 * @description Helper component for showing informative icons on the app
 *
 * @method  RecipeCardFooter
 *
 * @param { Object } props
 *
 * @returns { undefined }
 * .
 */
export const RecipeCardFooter = props => (
  <div className="itemReview row">
    <Icons upvotes={props.upVotes}
    downvotes={props.downVotes} views={props.views} />
  </div>
);
export default RecipeCardFooter;
