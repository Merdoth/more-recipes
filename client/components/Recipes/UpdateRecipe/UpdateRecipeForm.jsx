import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import swal from 'sweetalert';
import Button from '../../common/Button.jsx';
import InputField from '../../common/InputField.jsx';
import TextArea from '../../common/TextArea.jsx';
import { updateRecipe, getOneRecipe } from '../../../actions/recipeActions/';

/**
 * @description this class returns a UpdateRecipeForm component
 *
 * @returns { undefined }
 *
 */
export class UpdateRecipeForm extends Component {
  /**
   * Creates an instance of UpdateRecipeForm.
   *
   * @param { Object } props
   *
   * @memberof UpdateRecipeForm
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
      image: '',
      error: {}
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onImageChange = this.onImageChange.bind(this);
  }
  /**
   *
   * @memberof UpdateRecipeForm
   *
   * @returns { Object } json - payload
   */
  componentDidMount() {
    const { recipeId } = this.props.match.params;
    const { id } = this.props.user.id;
    this.props.getOneRecipe(id, recipeId);
  }
  /**
   * @param { Object } nextProps
   *
   * @memberof UpdateRecipeForm
   *
   * @returns { Object } json - payload
   */
  componentWillReceiveProps(nextProps) {
    const { recipe, error } = nextProps;
    if (error === 'Not Found') {
      swal('Too Bad', 'No Such Recipe', 'error');
      this.props.history.push('/recipes');
    }
    if (recipe) {
      this.setState({
        recipeName: recipe.recipeName,
        description: recipe.description,
        ingredients: recipe.ingredients,
        preparation: recipe.preparation,
        image: recipe.image,
        error: nextProps.error
      });
    }
  }
  /**
   * @param { Object } event
   *
   * @memberof UpdateRecipeForm
   *
   * @returns { Object } json - payload
   */
  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }
  /**
   * @param { Object } event
   *
   * @memberof UpdateRecipeForm
   *
   * @returns { Object } json - payload
   */
  onImageChange(event) {
    this.setState({ [event.target.name]: event.target.files[0] });
  }
  /**
   * @param { Object } event
   *
   * @memberof UpdateRecipeForm
   *
   * @returns { Object } json - payload
   */
  onSubmit(event) {
    event.preventDefault();
    const { recipeId } = this.props.match.params;
    if (this.state.image === '') {
      swal('Oops!', 'no image found', 'error');
    } else {
      this.props.updateRecipe(recipeId, this.state).then(() => {
        const { error } = this.state;
        if (error.message) {
          return swal('Too Bad!', error.message, 'error');
        }
        swal('Great!!!', 'your recipe has been updated successfully', 'success');
        this.props.goToRecipes(`/recipe-details/${recipeId}`);
      });
    }
  }
  /**
   * @returns { undefined }
   *
   * @memberof UpdateRecipeForm
   */
  render() {
    return (
      <form className="form-signin" onSubmit={this.onSubmit}>
        <h2 className="form-signin-heading">Edit Recipe</h2>
        <hr />
        <InputField
          type="text"
          name="recipeName"
          placeholder="Name"
          value={this.state.recipeName || ''}
          label="Name"
          onChange={this.onChange}
          required
        />
        <TextArea
          type="text"
          name="description"
          placeholder="Description"
          value={this.state.description || ''}
          label="Description"
          onChange={this.onChange}
        />
        <TextArea
          type="text"
          name="ingredients"
          placeholder="Ingredients"
          value={this.state.ingredients || ''}
          label="Ingredients"
          onChange={this.onChange}
        />
        <TextArea
          type="text"
          name="preparation"
          placeholder="Preparation"
          value={this.state.preparation || ''}
          label="Preparation"
          onChange={this.onChange}
        />
        <div className="form-group">
          <label htmlFor="foodImage">Select Image</label>
          <input type="file" name="image" 
          className="form-control-file" id="foodImage" 
          onChange={this.onImageChange} />
        </div>
        <Button
          id="update"
          type="submit"
          onClick={this.onSubmit}
          disabled={this.state.isLoading}
          name="Update Recipe"
          iconClass="fa-cutlery"
          className="btn btn-lg btn-primary btn-block"
        />
      </form>
    );
  }
}
UpdateRecipeForm.propTypes = {
  updateRecipe: PropTypes.func,
  message: PropTypes.string,
  error: PropTypes.object
};

UpdateRecipeForm.defaultValue = {
  updateRecipe: {},
  message: '',
  error: {}
};

const mapStateToProps = state => ({
  recipe: state.recipeReducer.recipes,
  message: state.recipeReducer.message,
  error: state.recipeReducer.error,
  user: state.setCurrentUser.user,
});

export default connect(mapStateToProps, { updateRecipe, getOneRecipe })(UpdateRecipeForm);
