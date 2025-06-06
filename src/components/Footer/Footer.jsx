import "./Footer.css";
import React from "react";
import footerImage from "../../assets/Images/homeImage/footerImage.png";

const Footer = () => {
  return (
    <footer className="footer">
      <div>
        <img src={footerImage} alt={"СКАН"} />{" "}
      </div>
      <div className="footer_text">
        <span>г. Москва, Цветной б-р, 40</span>
        <span>+7 495 771 21 11</span>
        <span>info@skan.ru</span>
        <span className="last-span-footer">Copyright. 2022</span>
      </div>
    </footer>
  );
};

export default Footer;
