import React from 'react';
import { Link } from 'react-router-dom'


const RecipeCardDes = ({
  title, text, id
}) => (
  <div className="des">
   <Link to={`recipe-details/${id}`}> <h2>{title}</h2> </Link>
    <h4>{text}</h4>
  </div>

);

export default RecipeCardDes;

