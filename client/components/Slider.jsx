import React from 'react';
/**
 * @description this returns a slider component
 * @param { Slider } Slider
 * @returns { Slider } Slider
 */

const Slider = () => (
      <div className="hero-bg">
        <div className="container-fluid">
          <div
            id="carouselExampleSlidesOnly"
            className="carousel slide"
            data-ride="carousel"
          >
            <div className="carousel-inner" role="listbox">
              <div className="carousel-item active">
                <img
                  className="d-block img-fluid slider-image"
                  src={require('../image/Salad.jpg')}
                  alt="First slide"
                />
                <div className="hello">
                  <h1>More Recipes</h1>
                  <h5>
                    <i>Your Favorite Recipe's At Your Pleasure.</i>
                  </h5>
                </div>
              </div>
              <div className="carousel-item ">
                <img
                  className="d-block img-fluid slider-image"
                  src={require('../image/Food.jpg')}
                  alt="Second slide"
                />
                <div className="hello">
                  <h1>Welcome</h1>
                  <h5>
                    <i>Feel Free To Explore Your Ideas.</i>
                  </h5>
                </div>
              </div>
              <div className="carousel-item">
                <img
                  className="d-block img-fluid slider-image"
                  src={require('../image/shrimp.jpg')}
                  alt="Third slide"
                />
                <div className="hello">
                  <h1>Build Your Recipes</h1>
                  <h5>
                    <i>Love Food, Love Life.</i>
                  </h5>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
);

export default Slider;
