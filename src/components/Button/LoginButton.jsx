import React from "react";
import styles from "./LoginButton.module.css";
import Button from "./Button";

const LoginButton = ({ isFormValid, handleSubmit }) => {
  return (
    <Button 
      className={isFormValid ? styles.buttonLoginFormValid : styles.buttonLoginFormNoValid} 
      onClick={isFormValid ? handleSubmit : (e) => e.preventDefault()} 
      disabled={!isFormValid}
    >
      Войти
    </Button>
  );
};

export default LoginButton;
