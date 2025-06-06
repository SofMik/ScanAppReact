import React from "react";
import { cards } from "../../data";
import Card from "./Card";
import "./Cards.css";

export default function Cards({ title, children }) {
  const card = cards.find((card) => card.title === title);

  if (!card) {
    return <p>Not found</p>;
  }
  return (
    <div>
      <Card {...card} /> {/*  Передаем `card` как props одним объектом */}
      {children}
    </div>
  );
}
