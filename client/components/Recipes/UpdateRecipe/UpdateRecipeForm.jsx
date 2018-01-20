import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import swal from 'sweetalert';
import Button from '../common/Button.jsx';
import InputField from '../common/InputField.jsx';
import TextArea from '../common/TextArea.jsx';
import InputLine from '../common/InputLine.jsx';
// import history from '../../utils/history';
import {
  updateRecipe,
  getOneRecipe
} from '../../actions/recipeActions/recipeActions';

class UpdateRecipeForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recipeName: '',
      ingredients: '',
      preparation: '',
      image: ''
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onImageChange = this.onImageChange.bind(this);
  }

  componentDidMount() {
    const { recipeId } = this.props.match.params;
    this.props.getOneRecipe(recipeId);
  }

  componentWillReceiveProps(nextProps) {
    const { recipe } = nextProps;
    this.setState({
      recipeName: recipe.recipeName,
      ingredients: recipe.ingredients,
      preparation: recipe.preparation,
      image: recipe.image
    });
  }

  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  onImageChange(event) {
    event.preventDefault();
    this.setState({ [event.target.name]: event.target.files[0] });
  }

  onSubmit(event) {
    event.preventDefault();
    const { recipeId } = this.props.match.params;
    this.props.updateRecipe(recipeId, this.state);
  }

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
        {/* <InputLine
          id=""
          type="file"
          name="image"
          placeholder="Ingredients"
          value="image"
          label="Select Image"
          onChange={this.onImageChange}
        /> */}
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

const mapStateToProps = state => ({
  recipe: state.recipes,
  error: state.recipes.error
});

export default connect(mapStateToProps, { updateRecipe, getOneRecipe })(UpdateRecipeForm);
