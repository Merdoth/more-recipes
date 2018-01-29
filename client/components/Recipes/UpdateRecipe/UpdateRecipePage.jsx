import React from 'react';
import UpdateRecipeForm from './UpdateRecipeForm.jsx';

const UpdateRecipePage = props => (
      <div className="row deco">
        <div className="col-md-4 offset-md-4 cover1">
          <div className="form-deco">
            <UpdateRecipeForm {...props}/>
          </div>
        </div>
      </div>
);

export default UpdateRecipePage;
