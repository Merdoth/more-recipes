import React, { Component } from 'react';
import { connect } from 'react-redux';
import swal from 'sweetalert';
import PropTypes from 'prop-types';
import Button from '../../common/Button.jsx';
import InputField from '../../common/InputField.jsx';
import TextArea from '../../common/TextArea.jsx';
import { validateAddRecipe } from '../../../validations/index';
import { addRecipes } from '../../../actions/recipeActions/';

/**
 * @description this class returns a AddRecipeForm component
 *
 * @returns { undefined }
 *
 */
export class AddRecipeForm extends Component {
  /**
   * @param { Object } props
   *
   * @memberof AddRecipeForm
   *
   * @returns { Object } json - payload
   */
  constructor(props) {
    super(props);
    this.state = {
      recipeName: '',
      description: '',
      ingredients: '',
      preparation: '',
      image: ''
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onImageChange = this.onImageChange.bind(this);
  }

  /**
   * @param { Object } event
   *
   * @memberof AddRecipeForm
   *
   * @returns { Object } json - payload
   */
  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  /**
   * @param { Object } event
   *
   * @memberof AddRecipeForm
   *
   * @returns { Object } json - payload
   */
  onImageChange(event) {
    this.setState({ [event.target.name]: event.target.files[0] });
  }

  /**
   * @param { Object } event
   *
   * @memberof AddRecipeForm
   *
   * @returns { Object } json - payload
   */
  onSubmit(event) {
    event.preventDefault();
    const { errors } = validateAddRecipe(this.state);
    if (Object.keys(errors).length === 0) {
      this.props.addRecipes(this.state);
    } else {
      const err = errors[Object.keys(errors)[0]];
      return swal({
        title: 'Oops!',
        text: err,
        icon: 'error'
      });
    }
  }
  /**
  * @memberof AddRecipeForm
  *
   * @returns { undefined }
   */
  render() {
    return (
      <form className="form-signin" onSubmit={this.onSubmit}>
        <h2 className="form-signin-heading">Add Recipe</h2>
        <hr />
        <InputField
          id="recipeName"
          type="text"
          name="recipeName"
          placeholder="Name"
          value={this.state.recipeName}
          label="Name"
          onChange={this.onChange}
          required
        />
        <TextArea
          id="description"
          type="text"
          name="description"
          placeholder="Description"
          value={this.state.description}
          label="Description"
          onChange={this.onChange}
        />
        <TextArea
          id="ingredients"
          type="text"
          name="ingredients"
          placeholder="Ingredients"
          value={this.state.ingredients}
          label="Ingredients"
          onChange={this.onChange}
        />
        <TextArea
          id="preparation"
          type="text"
          name="preparation"
          placeholder="Preparation"
          value={this.state.preparation}
          label="Preparation"
          onChange={this.onChange}
        />
        <div className="form-group">
          <label htmlFor="foodImage">Select Image</label>
          <input type="file" name="image"
          className="form-control-file" id="foodImage"
          onChange={this.onImageChange}/>
        </div>
        <Button
          id="submitBtn"
          type="submit"
          onClick={this.onSubmit}
          disabled={this.state.isLoading}
          name="Add"
          iconClass="fa-cutlery"
          className="btn btn-lg btn-primary btn-block submitBtn"
        />
      </form>
    );
  }
}

AddRecipeForm.propTypes = {
  addRecipe: PropTypes.func,
  error: PropTypes.object
};

AddRecipeForm.defaultValue = {
  addRecipe: {},
  error: {}
};

const mapStateToProps = state => ({
  recipes: state.recipeReducer.recipes,
  error: state.recipeReducer.error
});

export default connect(mapStateToProps, { addRecipes })(AddRecipeForm);
