import React from "react";
import styles from "./LoadMoreButton.module.css";
import Button from "./Button";

const LoadMoreButton = ({ onClick }) => {
  return (
    <Button 
      className={styles.loadMoreButton} 
      onClick={onClick} 
    >
      Показать больше
    </Button>
  );
};

export default LoadMoreButton;
