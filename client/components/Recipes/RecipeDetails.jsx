import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Button from '../common/Button.jsx';
import { getOneRecipe } from '../../actions/recipeActions/recipeActions';

class RecipeDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recipes: []
    };
  }
  componentDidMount() {
    const { recipeId } = this.props.match.params;
    this.props.getOneRecipe(recipeId).then(() => {
      this.setState({
        recipes: this.props.recipes
      });
    });
  }
  render() {
    const recipeDetails = this.state.recipes;

    return (
      <div className="container wrap">
        <div className="row">
          <div className="col-md-12 col-sm-6 recipeD">
            <img src={recipeDetails.image} />
          </div>
        </div>
        <div className="row main">
          <div className="col-xs-12 col-sm-4 main-aside">
            <h2 id="Popular">Ingredients</h2>
            <hr />
            <h4>{recipeDetails.ingredients}</h4>
          </div>

          <div className="col-xs-12 col-sm-8 main-section">
            <h2 id="title">Preparation</h2>
            <hr />
            <h4>{recipeDetails.preparation}</h4>
          </div>
        </div>
        <hr />
        <div className="textArea">
          <div className="form-group">
            <h4 id="reView">
              Review {'  '}
              <i className="fa fa-pencil-square-o icon1" aria-hidden="true" />
            </h4>
            <div className="col-sm-12">
              <textarea className="form-control inputstl" rows="5" />
            </div>
            <div className="textAreaButton">
              <Button
                type="submit"
                onClick={this.onSubmit}
                name="Post Review"
                iconClass="fa-pencil-square-o icon1"
                className="btn btn-lg btn-primary btn-block "
              />
            </div>
          </div>
          <hr />
          <div className="reviewedView">
            <div className="reviewed">
              <h5>This seems to be the best food i've ever taken</h5>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  recipes: state.recipes
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getOneRecipe
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(RecipeDetails);
