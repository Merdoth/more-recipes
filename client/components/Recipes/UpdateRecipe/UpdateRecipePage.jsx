import React from 'react';
import { connect } from 'react-redux';
import UpdateRecipeForm from './UpdateRecipeForm.jsx';

const UpdateRecipePage = () => (
      <div className="row deco">
        <div className="col-md-4 offset-md-4 cover1">
          <div className="form-deco">
            <UpdateRecipeForm {...this.props} />
          </div>
        </div>
      </div>
);

export default connect(null)(UpdateRecipePage);
