import React from 'react';
import styles from "./ButtonLink.module.css";
import Button from "./Button";

const ButtonLink = ({ url, className, children }) => {
  const handleClick = () => {
    window.open(url, "_blank");
  };

  return (
    <Button className={`${styles.buttonLink} ${className}`} onClick={handleClick}>
      {children}
    </Button>
  );
};

export default ButtonLink;

