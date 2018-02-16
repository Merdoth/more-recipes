import React from 'react';
import { Icons } from '../../common/Icons.jsx';

/**
 *
 * @description This holds recipe icons
 *
 * @method  RecipeCardFooter
 *
 * @param { Object } props
 *
 * @returns { undefined }
 * .
 */
const RecipeCardFooter = props => (
  <div className="itemReview row">
    <Icons upvotes={props.upVotes} downvotes={props.downVotes} views={props.views} />
  </div>
);
export default RecipeCardFooter;
