import React from "react";
import ResultsPageSlider from "react-slick";
import { useState, useEffect } from "react";
import "./ResultsPageSlider.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function CustomSlider({ results }) {
  const [slidesToShow, setSlidesToShow] = useState(getSlidesToShow());

  function getSlidesToShow() {
    if (window.innerWidth <= 600) return 1;
    if (window.innerWidth <= 850) return 3;
    if (window.innerWidth <= 980) return 4;
    if (window.innerWidth <= 1200) return 6;
    return 8;
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
    <ResultsPageSlider className="results-page-slider-box" {...settings}>
      {results.map((result, index) =>
        result.data.map((item, idx) => (
          <div key={`${index}-${idx}`} className="results-card-slider">
            <p className="results-text-slider">
              {new Date(item.date).toLocaleDateString("ru-RU")}
            </p>
            <p className="results-text-slider">
              {result.histogramType === "totalDocuments" ? item.value : 0}
            </p>
            <p className="results-text-slider">
              {result.histogramType === "riskFactors" ? item.value : 0}
            </p>
          </div>
        ))
      )}
    </ResultsPageSlider>
  );
}
