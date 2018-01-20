import React, { Component } from 'react';
import { connect } from 'react-redux';
import AddRecipeForm from './AddRecipeForm.jsx';

class AddRecipePage extends Component {
  render() {
    return (
      <div className="row" style={{ marginBottom: '100px' }}>
        <div className="col-md-4 offset-md-4 cover1">
          <div className="form-deco">
            <AddRecipeForm />
          </div>
        </div>
      </div>
    );
  }
}

export default connect(null)(AddRecipePage);
