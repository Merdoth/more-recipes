import React, { Component } from 'react';
import swal from 'sweetalert';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Button from '../../common/Button.jsx';
import InputField from '../../common/InputField.jsx';
import TextArea from '../../common/TextArea.jsx';
import InputLine from '../../common/InputLine.jsx';
import { addRecipes } from '../../../actions/recipeActions/';
import history from '../../../utils/history';

class AddRecipeForm extends Component {
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

  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  onImageChange(event) {
    event.preventDefault();
    this.setState({ [event.target.name]: event.target.files[0] });
  }

  onSubmit(event) {
    event.preventDefault();
    this.props.addRecipes(this.state).then(() => {
      const { message, error } = this.props.recipes;
      if (error) {
        return swal(error.message);
      }
      if (message === 'Recipe successfully added') {
        swal(message);
        return history.push('/myrecipes');
      }
      swal(message);
    });
  }

  render() {
    return (
      <form className="form-signin" onSubmit={this.onSubmit}>
        <h2 className="form-signin-heading">Add Recipe</h2>
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
          placeholder="Ingredients"
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
          className="btn btn-lg btn-primary btn-block"
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
  recipes: state.recipes,
  error: state.recipes.error
});

export default connect(mapStateToProps, { addRecipes })(AddRecipeForm);
