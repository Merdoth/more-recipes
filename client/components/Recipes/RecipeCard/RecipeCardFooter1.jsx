import React from 'react';
import Button from '../../common/Button.jsx';

class RecipeCardFooter1 extends React.Component {
  render() {
    return (
      <div className="itemReview row">
        <div className="col-md-6 deledit">
          <Button
            type="submit"
            onClick={this.onSubmit}
            name="Edit"
            iconClass="fa-pencil-square-o icon1"
            className="btn btn-lg btn-primary btn-block "
          />
        </div>
        <div className="col-md-6 deledit">
          <Button
            type="submit"
            onClick={this.onSubmit}
            name="Delete"
            iconClass="fa fa-trash  icon1"
            className="btn btn-lg btn-primary btn-block "
          />
        </div>
      </div>
    );
  }
}

export default RecipeCardFooter1;
