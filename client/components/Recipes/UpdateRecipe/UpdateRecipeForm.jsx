import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import swal from 'sweetalert';
import Button from '../../common/Button.jsx';
import InputField from '../../common/InputField.jsx';
import TextArea from '../../common/TextArea.jsx';
import InputLine from '../../common/InputLine.jsx';
import history from '../../../utils/history';
import { updateRecipe, getOneRecipe } from '../../../actions/recipeActions/';
/**
 * @param { UpdateRecipeForm } UpdateRecipeForm
 * @returns { UpdateRecipeForm } UpdateRecipeForm
 * @desc this class returns a UpdateRecipeForm component
 */
class UpdateRecipeForm extends Component {
  /**
   * Creates an instance of UpdateRecipeForm.
   * @param {any} props
   * @memberof UpdateRecipeForm
   * @returns { void }
   */
  constructor(props) {
    super(props);
    this.state = {
      recipeName: '',
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
   * @param {any} event
   * @memberof UpdateRecipeForm
   * @returns { void }
   */
  componentDidMount() {
    const { recipeId } = this.props.match.params;
    this.props.getOneRecipe(recipeId);
  }
  /**
   * @param {any} nextProps
   * @memberof UpdateRecipeForm
   * @returns { void }
   */
  componentWillReceiveProps(nextProps) {
    const { recipe, error } = nextProps;
    if (error.status === 'Not Found') {
      swal('Too Bad', 'No Such Recipe', 'error');
      history.push('/recipes');
    }
    this.setState({
      recipeName: recipe.recipeName,
      ingredients: recipe.ingredients,
      preparation: recipe.preparation,
      message: nextProps.message,
      image: recipe.image,
      error: nextProps.error
    });
  }
  /**
   * @param {any} event
   * @memberof UpdateRecipeForm
   * @returns { void }
   */
  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }
  /**
   * @param {any} event
   * @memberof UpdateRecipeForm
   * @returns { void }
   */
  onImageChange(event) {
    event.preventDefault();
    this.setState({ [event.target.name]: event.target.files[0] });
  }
  /**
   * @param {any} event
   * @memberof UpdateRecipeForm
   * @returns { void }
   */
  onSubmit(event) {
    event.preventDefault();
    const { recipeId } = this.props.match.params;
    this.props.updateRecipe(recipeId, this.state).then(() => {
      const { error, message } = this.state;
      if (error.message) {
        return swal('Too Bad!', error.message, 'error');
      }
      swal('Great!!!', message, 'success');
      history.push(`/recipe-details/${recipeId}`);
    });
  }
  /**
   * @returns {void }
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
          value={this.state.recipeName}
          label="Name"
          onChange={this.onChange}
          required
        />
        <TextArea
          type="text"
          name="ingredients"
          placeholder="Ingredients"
          value={this.state.ingredients}
          label="Ingredients"
          onChange={this.onChange}
        />
        <TextArea
          type="text"
          name="preparation"
          placeholder="Preparation"
          value={this.state.preparation}
          label="Preparation"
          onChange={this.onChange}
        />
        <InputLine
          id=""
          type="file"
          name="image"
          placeholder="image"
          value=""
          label="Select Image"
          onChange={this.onImageChange}
        />
        <Button
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
  error: state.recipeReducer.error
});

export default connect(mapStateToProps, { updateRecipe, getOneRecipe })(UpdateRecipeForm);
