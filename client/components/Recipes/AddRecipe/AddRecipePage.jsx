import React from 'react';
import { connect } from 'react-redux';
import AddRecipeForm from './AddRecipeForm.jsx';

/**
 * @description this returns an AddRecipeForm component
 *
 * @extends { Component }
 *
 * @param { Object } props
 *
 * @return { Object } json - payload
 *
 */
export const AddRecipePage = () =>
  (
  <div className="row deco">
      <div className="col-md-6 profile">
      <div className="form-deco">
        <AddRecipeForm />
      </div>
    </div>
  </div>
  );

export default connect(null)(AddRecipePage);
