import React from "react";
import Slider from "react-slick";
import { useState, useEffect } from "react";
import { sliderData } from "../../data";
import "./Slider.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function CustomSlider() {
  const [slidesToShow, setSlidesToShow] = useState(getSlidesToShow());
  function getSlidesToShow() {
    if (window.innerWidth <= 600) return 1;
    if (window.innerWidth <= 1240) return 2;
    return 3;
  }
  useEffect(() => {
    const updateSlides = () => {
      setSlidesToShow(getSlidesToShow());
    };
    window.addEventListener("resize", updateSlides);

    return () => window.removeEventListener("resize", updateSlides);
  }, []);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow,
    slidesToScroll: 1,
    arrows: true,
    adaptiveHeight: true,
  };

  return (
    <Slider className="slider-box" {...settings}>
      {sliderData.map((item, index) => (
        <div key={index} className="card-slider">
          <img className="logo-card-slider" src={item.logo} alt={item.alt} />
          <p className="text-slider">{item.text}</p>
        </div>
      ))}
    </Slider>
  );
}
