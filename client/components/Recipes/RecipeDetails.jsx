import React, { Component } from 'react';
import PropTypes from 'prop-types';
import swal from 'sweetalert';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Button from '../common/Button.jsx';
import { getOneRecipe } from '../../actions/recipeActions/';
import { addReview } from '../../actions/recipeActions/reviews';
import { Icons } from '../common/Icons.jsx';
import RecipeCardImage from './RecipeCard/RecipeCardImage.jsx';
import history from '../../utils/history';
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
      reviews: this.props.reviews || []
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
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
    this.props.addReview(recipeId, this.state.review).then(() => {
      this.props.getOneRecipe(recipeId);
    });
  }
  /**
   *
   * @param {object} nextProps
   *
   * @returns { undefined }
   */
  componentWillReceiveProps(nextProps) {
    const {
      recipe, error, currentReview, reviews
    } = nextProps;
    if (error.status === 'Not Found') {
      swal('Too Bad', 'No Such Recipe', 'error');
      history.push('/recipes');
    }
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
    const recipeDetails = this.state.recipe;
    const fetchedReviews = this.state.reviews.map(review => (
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
                <RecipeDetailsFooter id={recipeDetails.id} />
              </div>
            </div>
          </div>
          <div className="col-md-8 col-sm-8 recipeI">
            <Icons likes={150} upvotes={150} downvotes={150} views={150} />
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
                      {fetchedReviews}
                      <div className="stats">
                        <a href="#" className="btn btn-default stat-item">
                          <i className="fa fa-thumbs-up icon" />2
                        </a>
                        <a href="#" className="btn btn-default stat-item">
                          <i className="fa fa-thumbs-down icon" />12
                        </a>
                      </div>
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
// RecipeDetails.propTypes = {
//   message: PropTypes.string,
//   recipe: PropTypes.object,
//   error: PropTypes.object
// };

RecipeDetails.defaultValue = {
  recipe: {},
  message: '',
  error: {}
};
const mapStateToProps = state => ({
  recipe: state.recipeReducer.recipes,
  reviews: state.recipeReducer.recipes.reviews,
  message: state.recipeReducer.message,
  error: state.recipeReducer.error
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getOneRecipe,
      addReview
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(RecipeDetails);
