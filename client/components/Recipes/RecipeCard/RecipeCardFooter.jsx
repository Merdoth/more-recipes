import React from 'react';
import { Icons } from '../../common/Icons.jsx';


const RecipeCardFooter = () => (
  <div className="itemReview row">
    <div className="col-md-3 picicon">
      <img src="https://cdn2.iconfinder.com/data/icons/ios-7-icons/50/user_male2-512.png" />
    </div>
    <div className="col-md-9 recipe-by">
      <div>
        Recipe by <strong>Meya Samuel</strong>
      </div>
      <Icons likes={150} upvotes={150} downvotes={150} views={150} />
    </div>
  </div>
);
export default RecipeCardFooter;
