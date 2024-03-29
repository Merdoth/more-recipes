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
 * @description this class returns a  RecipeDetails component
 *
 * @param { Object } RecipeDetails
 *
 * @returns { undefined }
 */
export class RecipeDetails extends Component {
  /**
   * Creates an instance of RecipeDetails.
   * @param { Object } props
   *
   * @memberof RecipeDetails
   *
   * @returns { Object } json - payload
   */
  constructor(props) {
    super(props);
    this.state = {
      recipe: {},
      review: '',
      favourites: []
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.handleUpVote = this.handleUpVote.bind(this);
    this.handleDownVote = this.handleDownVote.bind(this);
    this.handleFavourite = this.handleFavourite.bind(this);
  }
  /**
   * @param { Object } event
   *
   * @memberof RecipeDetails
   *
   * @returns { Object } json - payload
   */
  componentDidMount() {
    const { recipeId } = this.props.match.params;
    const { id } = this.props.user;
    if (id && recipeId) {
      this.props.getOneRecipe(id, recipeId);
      this.props.getFavourite(recipeId);
    }
  }


  /**
   * @param { Object } event
   *
   * @memberof RecipeDetails
   *
   * @returns { Object } json - payload
   */
  onChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  /**
   * @param { Object } event
   *
   * @returns { Object } json - payload
   *
   * @memberof RecipeDetails
   */
  onSubmit(event) {
    const { recipeId } = this.props.match.params;
    event.preventDefault();
    this.props.addReview(recipeId, this.state.review);
  }

  /**
   * @param { Object } event
   *
   * @returns { Object } json - payload
   *
   * @memberof RecipeDetails
   */
  handleUpVote(event) {
    event.preventDefault();
    const { id } = this.props.recipe;
    this.props.upvoteRecipe(id);
  }
  /**
   * @param { Object } event
   *
   * @returns { Object } json - payload
   *
   * @memberof RecipeDetails
   */
  handleDownVote(event) {
    event.preventDefault();
    const { id } = this.props.recipe;
    this.props.downVoteRecipe(id);
  }

  /**
   * @param { Object } event
   *
   * @returns { Object } json - payload
   *
   * @memberof RecipeDetails
   */
  handleFavourite(event) {
    event.preventDefault();
    const { id } = this.props.recipe;
    const returnedFavorite = this.state.favourites.map(recipe => ({
      recipeid: recipe.recipeId
    }));
    const ids = returnedFavorite.map(favId => favId.recipeid);
    if (!ids.includes(id) && id) {
      this.props.addFavourite(id);
    } else {
      this.props.removeFavourite(id);
    }
  }

  /**
   *
   * @param { Object } nextProps
   *
   * @returns { Object } json - payload
   */
  componentWillReceiveProps(nextProps) {
    const {
      recipe, currentReview, reviews, favourites
    } = nextProps;
    this.setState(() => ({
      recipe,
      review: currentReview,
      reviews,
      favourites,
    }));
  }

  /**
   * @returns { undefined }
   *
   * @memberof RecipeDetails
   */
  render() {
    const recipesId = this.state.favourites.map(recipe => ({
      recipeId: recipe.recipeId
    }));
    const recipeIds = recipesId.map(id => id.recipeId);
    const loggedInUser = this.props.user.id;

    const selected = (recipeIds.includes(this.props.recipe.id))
      ? 'selected' : '';
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
                  userId={recipeDetails.userId}
                  goToRecipes={goToRecipes}
                  loggedInUser={loggedInUser}
                />
              </div>
            </div>
          </div>
          <div className="col-md-8 col-sm-8">
            <div className="recipe-detail-header-content">
              <div className="stats">
                <span
                  onClick={this.handleUpVote}
                  id="upvote"
                  className="btn btn-default stats-item upvote"
                >
                  <i className="fa fa-thumbs-up iconStat" />
                  {recipeDetails.upVotes}
                </span>
                <span
                  onClick={this.handleDownVote}
                  id="downvote"
                  className="btn btn-default stats-item downvote"
                >
                  <i className="fa fa-thumbs-down iconStat" />
                  {recipeDetails.downVotes}
                </span>
                <span
                  id="favourite"
                  onClick={this.handleFavourite}
                  className={`btn btn-default stats-item ${selected} favourite`}
                >
                  <i className="fa fa-heart iconStat" />
                </span>
                <span className="btn btn-default stats-item">
                  <i className="fa fa-eye iconStat align-view-count" />
                  {recipeDetails.views}
                </span>
              </div>
                <div className="recipe-description">
                  <h3>{recipeDetails.recipeName}</h3>
                  <p>{recipeDetails.description}</p>
                </div>
           </div>
          </div>
        </div>
        <div className="row main">
          <div className="col-xs-12 col-sm-4 main-aside">
            <h4 id="Popular">INGREDIENTS</h4>
            <hr />
            <p>{recipeDetails.ingredients}</p>
          </div>

          <div className="col-xs-12 col-sm-8 main-section">
            <h4 id="title">PREPARATION</h4>
            <hr />
            <p>{recipeDetails.preparation}</p>
          </div>
        </div>
        <div className="textArea">
          <div className="form-group">
            <h4 id="reView">
              Review {'  '}
              <i className="fa fa-pencil-square-o icon1" aria-hidden="true" />
            </h4>
            <div className="col-sm-12">
              <textarea
                id="comment"
                name="review"
                className="form-control inputstl review"
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
                className="btn btn-lg btn-primary btn-block reviewBtn"
              />
            </div>
          </div>
        </div>
          <div className="reviewedView">
            <div className="post-description">
                {this.props.match.params.recipeId ? fetchedReviews : []}
            </div>
          </div>
      </div>
    );
  }
}
RecipeDetails.propTypes = {
  recipe: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  user: state.setCurrentUser.user,
  recipe: state.recipeReducer.recipes,
  reviews: state.recipeReducer.recipes.reviews || [],
  favourites: state.favourite.favourite || [],
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
