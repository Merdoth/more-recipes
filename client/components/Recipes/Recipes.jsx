import React, { Component } from 'react';
import RecipeCard from './RecipeCard/RecipeCard.jsx';

class Recipes extends Component {
  render() {
    return (
      <div>
        <div class="container manage">
          <h2>Recipes</h2>
          <p>Feel free to manipulate your own account</p>
        </div>
        <hr />
        <RecipeCard />
      </div>
    );
  }
}

export default Recipes;
