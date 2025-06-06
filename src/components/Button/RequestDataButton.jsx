
import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Button from "./Button";
import styles from "./RequestDataButton.module.css";

const RequestDataButton = () => {
  const navigate = useNavigate();
  const { auth } = useAuth();
  if (!auth.loggedIn) return null; 

  return (
    <Button
    className={styles.requestDataButton}
    onClick={() => navigate("/user")}
    >
      Запросить данные
    </Button>
  );
};

export default RequestDataButton;
