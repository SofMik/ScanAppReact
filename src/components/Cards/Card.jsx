import React from "react";
import { useAuth } from "../../context/AuthContext";
import BeginnerButton from "../../components/Button/BeginnerButton";
import "./Cards.css";

export default function Card({
  title,
  title_text,
  special_price,
  price,
  price_text,
  description,
  image,
  list,
}) {
  const { auth } = useAuth();
  const isBeginner = auth.loggedIn && title === "Beginner";

  return (
    <div
      className="card"
      style={{
        border: isBeginner
          ? "2px solid rgba(255, 182, 79, 1)"
          : "2px solid rgba(0, 0, 0, 0.2)",
      }}
    >
      <div className={`card-header ${title.toLowerCase()}`}>
        <div className="card-title">
          <div className="card-title"> {title}</div>
          <p className="title-text">{title_text}</p>
        </div>
        <img className="card-image" src={image} alt="foto" />
      </div>
      <div
        className="card-user"
        style={{
          visibility: isBeginner ? "visible" : "hidden",
        }}
      >
        Текущий тариф
      </div>
      <div className="card-content">
        <div className="card-price-wrapper">
          <div className="card-special_price"> {special_price} </div>
          <div className="card-price"> {price} </div>
        </div>
        <div className="price-text">{price_text}</div>

        <p className="card-description">{description}</p>
        <ul className="card-list">
          {list.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
        <div className="card-footer">
          <BeginnerButton title={title} loggedIn={auth.loggedIn} />
        </div>
      </div>
    </div>
  );
}
