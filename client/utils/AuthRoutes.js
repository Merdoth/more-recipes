import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Redirect, Switch } from 'react-router-dom';
import Profile from './../components/Profile.jsx';
import Recipes from './../components/Recipes/Recipes.jsx';
import UserRecipes from './../components/Recipes/UserRecipes.jsx';
import AddRecipePage from './../components/Recipes/AddRecipe/AddRecipePage.jsx';
import UpdateRecipePage from
  './../components/Recipes/UpdateRecipe/UpdateRecipePage.jsx';
import RecipeDetails from './../components/Recipes/RecipeDetails.jsx';
import SearchResult from './../components/Search/SearchResult.jsx';
import NotFound from './../components/NotFound.jsx';
import Favourites from './../components/Favourites.jsx';


/**
 * @class AuthRoutes
 *
 * @extends Component
 */
class AuthRoutes extends Component {
  /**
   * @return { Component-DOM } DOM
   */
  render() {
    return (
      <div id="wrapper">
        {this.props.isAuthenticated ? (
          <Switch>
            <Route path="/profile" component={Profile} />
            <Route path="/recipes" component={Recipes} />
            <Route path="/addrecipe" component={AddRecipePage} />
            <Route path="/myrecipes" component={UserRecipes} />
            <Route path="/favourites" component={Favourites} />
            <Route
              path="/updaterecipe/:recipeId"
              component={UpdateRecipePage}
            />
            <Route
              path="/searchresults"
              component={SearchResult}
            />
            <Route path="/recipe-details/:recipeId"
             component={RecipeDetails} />
            <Route path="*" component={NotFound} />
          </Switch>
        ) : (
          <Redirect to="/Signin" />
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.setCurrentUser.isAuthenticated
});

export default connect(mapStateToProps)(AuthRoutes);
