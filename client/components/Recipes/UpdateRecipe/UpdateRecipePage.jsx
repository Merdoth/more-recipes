import React from 'react';
import UpdateRecipeForm from './UpdateRecipeForm.jsx';

/**
 *
 * @description The page the user gets when he/she wants to update a recipe
 *
 * @method UpdateRecipePage
 *
 *  @param { Object } props
 *
 * @returns { undefined }
 * .
 */
export const UpdateRecipePage = (props) => {
  const goToRecipes = route => props.history.push(route);
  return (
    <div className="row deco">
      <div className="col-md-4 offset-md-4 cover1">
        <div className="form-deco">
          <UpdateRecipeForm {...props} goToRecipes={goToRecipes} />
        </div>
      </div>
    </div>
  );
};

export default UpdateRecipePage;
