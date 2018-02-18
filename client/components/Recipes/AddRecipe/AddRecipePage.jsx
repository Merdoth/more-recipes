import React from 'react';
import { connect } from 'react-redux';
import AddRecipeForm from './AddRecipeForm.jsx';

/**
 * @extends { Component }
 *
 * @param { Object } props
 *
 * @return { undefined }
 *
 * @desc this returns an AddRecipeForm component
 */
export const AddRecipePage = () =>
  (
  <div className="row deco">
    <div className="col-md-4 offset-md-4 cover1">
      <div className="form-deco">
        <AddRecipeForm />
      </div>
    </div>
  </div>
  );

export default connect(null)(AddRecipePage);
