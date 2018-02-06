import React, { Component } from 'react';
import PropTypes from 'prop-types';
import swal from 'sweetalert';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Button from '../common/Button.jsx';
import {
  getOneRecipe,
  addFavourite,
  getFavourite,
  removeFavourite
} from '../../actions/recipeActions/';
import { addReview } from '../../actions/recipeActions/reviews';
import {
  upvoteRecipe,
  downVoteRecipe
} from '../../actions/recipeActions/votes';
import RecipeCardImage from './RecipeCard/RecipeCardImage.jsx';
import RecipeDetailsFooter from './RecipeCard/RecipeDetailsFooter.jsx';

/**
 * @desc this class returns a  RecipeDetails component
 *
 * @param { RecipeDetails } RecipeDetails
 *
 * @returns { RecipeDetails } RecipeDetails
 */
class RecipeDetails extends Component {
  /**
   * Creates an instance of RecipeDetails.
   * @param {object} props
   *
   * @memberof RecipeDetails
   *
   * @returns { undefined }
   */
  constructor(props) {
    super(props);
    this.state = {
      recipe: {},
      review: '',
      favourites: {}
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.handleUpVote = this.handleUpVote.bind(this);
    this.handleDownVote = this.handleDownVote.bind(this);
    this.handleFavourite = this.handleFavourite.bind(this);
  }
  /**
   * @param {object} event
   *
   * @memberof RecipeDetails
   *
   * @returns { undefined }
   */
  componentDidMount() {
    const { recipeId } = this.props.match.params;
    this.props.getOneRecipe(recipeId);
    this.props.getFavourite(recipeId);
  }
  /**
   * @param {object} event
   *
   * @memberof RecipeDetails
   *
   * @returns { undefined }
   */
  onChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  /**
   * @param {Object} event
   *
   * @returns { undefined }
   *
   * @memberof RecipeDetails
   */
  onSubmit(event) {
    const { recipeId } = this.props.match.params;
    event.preventDefault();
    this.props.addReview(recipeId, this.state.review);
  }

  /**
   * @param {Object} event
   *
   * @returns { undefined }
   *
   * @memberof RecipeDetails
   */
  handleUpVote(event) {
    event.preventDefault();
    const { id } = this.props.recipe;
    this.props.upvoteRecipe(id);
  }
  /**
   * @param {Object} event
   *
   * @returns { undefined }
   *
   * @memberof RecipeDetails
   */
  handleDownVote(event) {
    event.preventDefault();
    const { id } = this.props.recipe;
    this.props.downVoteRecipe(id);
  }

  /**
   * @param {Object} event
   *
   * @returns { undefined }
   *
   * @memberof RecipeDetails
   */
  handleFavourite(event) {
    event.preventDefault();
    const { id } = this.props.recipe;
    if (this.state.recipe.favourite) {
      this.props.removeFavourite(id);
      this.props.getOneRecipe(id);
    } else {
      this.props.addFavourite(id);
    }
  }
  /**
   *
   * @param {object} nextProps
   *
   * @returns { undefined }
   */
  componentWillReceiveProps(nextProps) {
    const { recipe, currentReview, reviews } = nextProps;
    this.setState(() => ({
      recipe,
      review: currentReview,
      reviews
    }));
  }

  /**
   * @returns {undefined }
   *
   * @memberof RecipeDetails
   */
  render() {
    const selected = this.state.recipe.favourite ? 'selected' : '';
    const goToRecipes = route => this.props.history.push(route);
    const recipeDetails = this.state.recipe;
    const fetchedReviews = this.props.reviews.map(review => (
      <div key={review.id} className="review">
        {review.review}
      </div>
    ));

    return (
      <div className="container wrap">
        <div className="row Card">
          <div className="col-md-4 col-sm-4 recipeD">
            <div className="top-items">
              <div className="rated">
                <RecipeCardImage
                  src={recipeDetails ? recipeDetails.image : ''}
                />
                <RecipeDetailsFooter
                  id={recipeDetails.id}
                  goToRecipes={goToRecipes}
                />
              </div>
            </div>
          </div>
          <div className="col-md-8 col-sm-8 recipeI">
            <div className="stats">
              <span
                onClick={this.handleUpVote}
                className="btn btn-default stats-item"
              >
                <i className="fa fa-thumbs-up iconStat" />
                {recipeDetails.upVotes}
              </span>
              <span
                onClick={this.handleDownVote}
                className="btn btn-default stats-item"
              >
                <i className="fa fa-thumbs-down iconStat" />
                {recipeDetails.downVotes}
              </span>
              <span
                onClick={this.handleFavourite}
                className={`btn btn-default stats-item ${selected}`}
              >
                <i className="fa fa-heart iconStat" />
              </span>
            </div>
          </div>
        </div>
        <div className="row main">
          <div className="col-xs-12 col-sm-4 main-aside">
            <h2 id="Popular">Ingredients</h2>
            <hr />
            <p>{recipeDetails.ingredients}</p>
          </div>

          <div className="col-xs-12 col-sm-8 main-section">
            <h2 id="title">Preparation</h2>
            <hr />
            <p>{recipeDetails.preparation}</p>
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
              <textarea
                name="review"
                className="form-control inputstl"
                rows="5"
                type="text"
                value={this.state.review}
                onChange={this.onChange}
              />
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
            <div className="container">
              <div className="row">
                <div className="col-sm-8">
                  <div className="panel panel-white post panel-shadow">
                    <div className="post-description">
                      {this.props.match.params.recipeId ? fetchedReviews : []}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
RecipeDetails.propTypes = {
  message: PropTypes.string.isRequired,
  recipe: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  recipe: state.recipeReducer.recipes,
  reviews: state.recipeReducer.recipes.reviews || [],
  message: state.recipeReducer.message,
  favourites: state.recipeReducer.recipes.favourite || {},
  error: state.recipeReducer.error
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getOneRecipe,
      addReview,
      upvoteRecipe,
      downVoteRecipe,
      addFavourite,
      getFavourite,
      removeFavourite
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(RecipeDetails);
