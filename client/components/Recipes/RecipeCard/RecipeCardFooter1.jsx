import React from 'react';
// import Button from '../../common/Button.jsx';
import history from '../../../utils/history';

class RecipeCardFooter1 extends React.Component {
  onSubmit(event) {
    event.preventDefault();
    return history.push('/myrecipes');
  }

  render() {
    return (
      <div className="itemReview row">
        <div className="col-md-6 deledit">
          <a href={`/updaterecipe/${this.props.id}`}>Update</a>
        </div>
        <div className="col-md-6 deledit">
          <a href={`/deleterecipe/${this.props.id}`}>Delete</a>
        </div>
      </div>
    );
  }
}

export default RecipeCardFooter1;
