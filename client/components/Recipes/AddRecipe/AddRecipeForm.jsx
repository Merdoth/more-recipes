import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Button from '../../common/Button.jsx';
import InputField from '../../common/InputField.jsx';
import TextArea from '../../common/TextArea.jsx';
import InputLine from '../../common/InputLine.jsx';
import history from '../../../utils/history';
import { addRecipes } from '../../../actions/recipeActions/';

/**
 * @param { Object } AddRecipeForm
 *
 * @returns { undefined }
 *
 * @desc this class returns a AddRecipeForm component
 */
export class AddRecipeForm extends Component {
  /**
   * Creates an instance of AddRecipeForm
   * @param { Object } props
   *
   * @memberof AddRecipeForm
   *
   * @returns { undefined }
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
   * @returns { undefined }
   */
  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  /**
   * @param { Object } event
   *
   * @memberof AddRecipeForm
   *
   * @returns { undefined }
   */
  onImageChange(event) {
    event.preventDefault();
    this.setState({ [event.target.name]: event.target.files[0] });
  }

  /**
   * @param { Object } event
   *
   * @memberof AddRecipeForm
   *
   * @returns { undefined }
   */
  onSubmit(event) {
    event.preventDefault();
    this.props.addRecipes(this.state);
  }
  /**
   * @returns { undefined }
   *
   * @memberof AddRecipeForm
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
        <InputLine
          id="image"
          type="file"
          name="image"
          placeholder="Upload Image"
          value=""
          label="Select Image"
          onChange={this.onImageChange}
        />

        <Button
          type="submit"
          onClick={this.onSubmit}
          disabled={this.state.isLoading}
          name="Add Recipe"
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
