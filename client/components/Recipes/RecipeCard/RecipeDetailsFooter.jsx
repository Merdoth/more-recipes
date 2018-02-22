import React, { Component } from 'react';
import { connect } from 'react-redux';
import swal from 'sweetalert';
import Button from '../../common/Button.jsx';
import { deleteRecipe } from '../../../actions/recipeActions';

/**
 * @param { Object } RecipeDetailsFooter
 *
 * @returns { undefined }
 *
 * @desc this class returns a RecipeDetailsFooter component
 */
export class RecipeDetailsFooter extends Component {
  /**
   * Creates an instance of RecipeDetailsFooter
   *
   * @param { Object } props
   *
   * @memberof RecipeDetailsFooter
   *
   * @returns { undefined }
   */
  constructor(props) {
    super(props);
    this.handleDelete = this.handleDelete.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  /**
   * @param { Object } event
   *
   * @memberof RecipeDetailsFooter
   *
   * @returns { undefined }
   */
  onSubmit(event) {
    event.preventDefault();
    const { id } = this.props;
    return this.props.goToRecipes(`/updaterecipe/${id}`);
  }
  /**
   * @param { Object } event
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
          return this.props.goToRecipes(`/recipes/${id}`);
        });
      }
      swal('Your recipe is safe!');
    });
  }

  /**
   *
   *
   * @returns { undefined }
   *
   * @memberof RecipeDetailsFooter
   */
  authUser() {
    return (
      <div className="userButton row">
        <Button
          id="edit"
          type="edit"
          onClick={this.onSubmit}
          name="Edit"
          className="btn btn-lg btn-primary btn-block cta-btn"
        />
        <Button
          id="delete"
          type="delete"
          onClick={this.handleDelete}
          name="Delete"
          className="btn btn-lg btn-primary btn-block cta-btn"
        />
      </div>
    );
  }
  /**
   *
   * @returns { undefined }
   *
   * @memberof RecipeDetailsFooter
   */
  unAuthUser() {
    return <div className="itemReview row" />;
  }
  /**
   * @returns { undefined }
   *
   * @memberof RecipeDetailsFooter
   */
  render() {
    return (this.props.loggedInUser === this.props.userId
      ? this.authUser()
      : this.unAuthUser()
    );
  }
}

export default connect(null, { deleteRecipe })(RecipeDetailsFooter);
