// components/ButtonLink/SocialButtons.jsx
import React from "react";
import styles from "./ButtonLink.module.css";
import ButtonLink from "./ButtonLink"; 

const GoogleButton = () => (
  <ButtonLink url="https://www.google.com" className={styles.googleButton}></ButtonLink>
);

const FacebookButton = () => (
  <ButtonLink url="https://www.facebook.com" className={styles.facebookButton}>Facebook</ButtonLink>
);

const YandexButton = () => (
  <ButtonLink url="https://www.yandex.ru" className={styles.yandexButton}>Яндекс</ButtonLink>
);

export { FacebookButton, YandexButton, GoogleButton };
