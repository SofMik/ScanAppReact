import React from "react";
import "./NavLogin.css";

export default function NavLogin({ children, isActive, ...props }) {
  return (
    <nav
      className={`nav ${isActive ? "active" : ""}`} //  базовый класс "nav" и активный класс "active" при необходимости
      {...props}
    >
      {children}
    </nav>
  );
}
