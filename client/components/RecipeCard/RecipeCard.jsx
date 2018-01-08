import React from 'react';
import RecipeCardImage from './RecipeCardImage.jsx';
import RecipeCardDes from './RecipeCardDes.jsx';
import RecipeCardFooter from './RecipeCardFooter.jsx';
import image from '../../image/Edika-Ikong.jpg';

const title = 'Edika Ikong';
const text = `Cook the spaghetti in salted water about half of the way
                    cooked. Drain, reserving some of the water. Taste the sauce
                    and adjust the seasoning if necessary. Add the pasta to the
                    sauce and cook over medium-high heat until all the liquid is
                    absorbed and the pasta is al dente...`;
/**
 *
 */
class RecipeCard extends React.Component {
  /**
   *
   * @returns {jsx} JSX
   * @memberof RecipeCard
   */
  render() {
    return (
      <div className="container top">
        <h6 id="title4">Top Recipes</h6>
        <div className="row">
          <div className="col-md-4 col-sm-4">
            <div className="top-items">
              <div className="rated">
                <RecipeCardImage src={image} />
                <RecipeCardDes title={title} text={text} />
                <RecipeCardFooter />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}


export default RecipeCard;