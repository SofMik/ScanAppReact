import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "./Button";
import styles from "./BeginnerButton.module.css";

const BeginnerButton = ({ title, loggedIn }) => {
  const navigate = useNavigate();
  const isBeginner = loggedIn && title === "Beginner";
  return (
    <Button
    className={isBeginner ? styles.button_beginner : styles.button_default}
    onClick={isBeginner ? () => navigate("/user") : undefined} 
  >
    {isBeginner ? "Перейти в личный кабинет" : "Подробнее"}
  </Button>
  );
};

export default BeginnerButton;