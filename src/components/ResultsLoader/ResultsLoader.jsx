import React from "react";
import "./ResultsLoader.css"; 

export default function ResultsLoader() {
  
  return (
    <div className="results-loader-container">
      <div className="results-loader-box">
        <div className="results-loader">
          <div className="results-loader-element"></div>
          <p className="results-loader-p">Загружаем данные</p>
        </div>
      </div>
    </div>
  );
}
