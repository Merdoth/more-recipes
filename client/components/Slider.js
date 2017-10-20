import React from 'react';

export default () => {
  return (
      <div className="hero-bg">
        <div className="container-fluid">
          <div id="carouselExampleSlidesOnly" className="carousel slide" data-ride="carousel" >
            <div className="carousel-inner" role="listbox" style={{"height":550+'px'}}>
              <div className="carousel-item active">
                <img className="d-block img-fluid " style={{"width":100+'%',"height":550+'px'}} src={require('../image/Salad.jpg')} alt="First slide"/>
                <div className="hello">
                <h1>More Recipes</h1>
                <h5><i>Your Favorite Recipe's At Your Pleasure.</i></h5>
                </div>
              </div>
              <div className="carousel-item " >
                <img className="d-block img-fluid" style={{"width":100+'%',"height":550+'px'}} src={require("../image/Food.jpg")} alt="Second slide"/>
                <div className="hello">
                <h1>Welcome</h1>
                <h5><i>Feel Free To Explore Your Ideas.</i></h5>
                </div>
              </div>
              <div className="carousel-item">
                <img className="d-block img-fluid" style={{"width":100+'%',"height":550+'px'}} src={require("../image/shrimp.jpg")} alt="Third slide"/>
                <div className="hello">
                <h1>Build Your Recipes</h1>
                <h5><i>Love Food, Love Life.</i></h5>
                </div>
            </div>
            </div>
          </div>
        </div>
      </div>
  )

}