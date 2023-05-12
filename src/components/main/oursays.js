import React, { Component } from "react";
import Slider from "react-slick";

import "./main.css";

function Oursays() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    cssEase: "linear",
  };
  return (
    <div>
      <br />
      <Slider {...settings}>
        <div className="saycard">
          <div className="incard"></div>
        </div>
        <div className="saycard">
          <div className="incard"></div>
        </div>
        <div className="saycard">
          <div className="incard"></div>
        </div>
        <div className="saycard">
          <div className="incard"></div>
        </div>
        <div className="saycard">
          <div className="incard"></div>
        </div>
      </Slider>
    </div>
  );
}
export default Oursays;
