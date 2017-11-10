import React from 'react';
import PropTypes from 'prop-types';

class RecipeCard extends React.Component {
    /**
     * 
     * 
     * @returns 
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
                                {/* <div className="imgholder"><img src={require("../image/Edika-Ikong.jpg")}/></div> */}
                                <div className="des">
                                    <h2>Edika Ikong</h2>
                                    <div>
                                    Cook the spaghetti in salted water about half of the way cooked. Drain, reserving some of the water. Taste the sauce and adjust the seasoning if necessary. Add the pasta to the sauce and cook over medium-high heat until all the liquid is absorbed and the pasta is al dente...
                                    </div>
                                </div>
                                <div className="itemReview row">
                                    <div className="col-md-3 picicon">
                                        <img src="https://cdn2.iconfinder.com/data/icons/ios-7-icons/50/user_male2-512.png" style={{'weight':70+'px','height':70+'px'}}/>
                                    </div>
                                    <div className="col-md-9 recipe-by">
                                        <div>Recipe by <strong>Meya Samuel</strong></div>
                                        <span className="icons"><i className="fa fa-heart" aria-hidden="true"></i>&nbsp;120&nbsp;&nbsp;
                                        <i className="fa fa-thumbs-up" aria-hidden="true"></i>&nbsp;120&nbsp;&nbsp;
                                        <i className="fa fa-thumbs-down" aria-hidden="true"></i>&nbsp;120&nbsp;&nbsp;
                                        <i className="fa fa-eye" aria-hidden="true"></i>&nbsp;120
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}


RecipeCard.propTypes = {
    topRecipes: PropTypes.object.isRequired
}

export default RecipeCard