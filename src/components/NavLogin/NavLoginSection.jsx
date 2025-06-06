import React from "react";
import { Link } from "react-router-dom";
import "./NavLogin.css";

export default function NavLoginSection() {
  return (
    <div className="nav_section">
      <nav className="nav active">
        <Link to="/login">Войти</Link>
      </nav>
      <nav className="nav">
        <Link to="#">Зарегистрироваться</Link>
      </nav>
    </div>
  );
}
