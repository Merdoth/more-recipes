import React, { Component } from 'react';
import { connect } from 'react-redux';
import swal from 'sweetalert';
import Button from '../../common/Button.jsx';
import history from '../../../utils/history';
import { deleteRecipe } from '../../../actions/recipeActions';

/**
 * @param { RecipeDetailsFooter } RecipeDetailsFooter
 *
 * @returns { RecipeDetailsFooter } RecipeDetailsFooter
 *
 * @desc this class returns a RecipeDetailsFooter component
 */
class RecipeDetailsFooter extends Component {
  /**
   * Creates an instance of RecipeDetailsFooter
   * @param { object } props
   *
   * @memberof RecipeDetailsFooter
   *
   * @returns { undefined }
   */
  constructor(props) {
    super(props);
    this.state = {};
    this.handleDelete = this.handleDelete.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  /**
   * @param { object } event
   *
   * @memberof RecipeDetailsFooter
   *
   * @returns { undefined }
   */
  onSubmit(event) {
    event.preventDefault();
    const { id } = this.props;
    return history.push(`/updaterecipe/${id}`);
  }
  /**
   * @param { object } event
   *
   * @memberof RecipeDetailsFooter
   *
   * @returns { undefined }
   */
  handleDelete(event) {
    event.preventDefault();
    const { id } = this.props;
    swal({
      title: 'Are you sure?',
      text: 'Once deleted, you will not be able to recover this recipe!',
      icon: 'warning',
      buttons: true,
      dangerMode: true
    }).then((willDelete) => {
      if (willDelete) {
        this.props.deleteRecipe(id).then(() => {
          swal('Poof! Your recipe has been deleted!', {
            icon: 'success'
          });
          return history.push('/recipes');
        });
      }
      swal('Your recipe is safe!');
    });
  }
  /**
   * @returns { undefined }
   *
   * @memberof RecipeDetailsFooter
   */
  render() {
    return (
      <div className="itemReview row">
        <div className="col-md-6 deledit">
          <Button
            type="edit"
            onClick={this.onSubmit}
            name="Edit"
            iconClass="fa-pencil-square-o icon1"
            className="btn btn-lg btn-primary btn-block "
          />
        </div>
        <div className="col-md-6 deledit">
          <Button
            type="delete"
            onClick={this.handleDelete}
            name="Delete"
            iconClass="fa-pencil-square-o icon1"
            className="btn btn-lg btn-primary btn-block "
          />
        </div>
      </div>
    );
  }
}

export default connect(null, { deleteRecipe })(RecipeDetailsFooter);
