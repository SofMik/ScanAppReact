import React from "react";
import styles from "./SearchFormButton.module.css";
import Button from "./Button";

const SearchFormButton = ({ isSearchFormValid, handleSubmit }) => {
  return (
    <Button 
      className={isSearchFormValid ? styles.buttonSearchFormValid : styles.buttonSearchFormNoValid} 
      onClick={isSearchFormValid ? handleSubmit : (e) => e.preventDefault()} 
      disabled={!isSearchFormValid}
    >
      Поиск
    </Button>
  );
};

export default SearchFormButton;

