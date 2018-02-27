import React, { Component } from 'react';
import { connect } from 'react-redux';
import swal from 'sweetalert';
import Button from '../../common/Button.jsx';
import { deleteRecipe } from '../../../actions/recipeActions';

/**
 * @description this class returns a RecipeDetailsFooter component
 *
 *
 * @returns { undefined }
 *
 */
export class RecipeDetailsFooter extends Component {
  /**
   * Creates an instance of RecipeDetailsFooter
   *
   * @param { Object } props
   *
   * @memberof RecipeDetailsFooter
   *
   * @returns { Object } json - payload
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
   * @returns { Object } json - payload
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
    * @returns { Object } json - payload
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
          return this.props.goToRecipes('/recipes');
        });
      }
      swal('Your recipe is safe!');
    });
  }

  /**
   *
   * @memberof RecipeDetailsFooter
   *
   * @returns { Object } json - payload
   *
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
   * @memberof RecipeDetailsFooter
   *
   * @returns { Object } json - payload
   *
   */
  unAuthUser() {
    return <div className="itemReview row" />;
  }

  /**
   * @memberof RecipeDetailsFooter
   *
   * @returns { Object } json - payload
   */
  render() {
    return (this.props.loggedInUser === this.props.userId
      ? this.authUser()
      : this.unAuthUser()
    );
  }
}

export default connect(null, { deleteRecipe })(RecipeDetailsFooter);
