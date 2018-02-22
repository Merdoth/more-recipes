import React from 'react';
/**
 * @description this returns a slider component
 *
 * @param { Function } Slider
 *
 * @returns { undefined }
 */

export const Slider = () => (
  <div className="hero-bg">
    <div className="container-fluid">
      <div
        id="carouselSlides"
        className="carousel slide"
        data-ride="carousel"
      >
        <div className="carousel-inner" role="listbox">
          <div
            className="carousel-item active"
            style={{ backgroundImage: "url('/assets/image/Salad.jpg')" }}
          >
            <div className="slider-text">
              <h5 className="hero-header" id="slider-one">
                Your Favorite Recipe's At Your Pleasure.
              </h5>
            </div>
          </div>
          <div
            className="carousel-item"
            style={{ backgroundImage: "url('/assets/image/Food.jpg')" }}
          >
            <div className="slider-text">
              <h5 className="hero-header" id="slider-two">
              Feel Free To Explore Your Ideas.</h5>
            </div>
          </div>
          <div
            className="carousel-item"
            style={{ backgroundImage: "url('/assets/image/shrimp.jpg')" }}
          >
            <div className="slider-text">
              <h5 className="hero-header" id="slider-three">
              Love Food, Love Life.</h5>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default Slider;
