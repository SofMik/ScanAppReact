import React from "react";
import { useState } from "react";
import { useAuth } from ".././../context/AuthContext";
import "./Header.css";

import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const HeaderBurgerMenu = () => {
  const { auth, logout, isLoading } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="mobile-header">
      <div>
        <img
          className="logo-header"
          src={require("../../assets/Images/homeImage/HomeImageLogo.png")}
          alt="Логотип"
        />
      </div>

      <div className={`request-info-header ${auth.loggedIn ? "" : "hidden"}`}>
        {isLoading ? (
          <>
            <div className="loader-container">
              <div className="loader"></div>
            </div>
          </>
        ) : auth.userInfo?.eventFiltersInfo ? (
          <>
            <div className="request-info-header-text">
              Использовано компаний{" "}
              <span className="black-text">
                {auth.userInfo.eventFiltersInfo.usedCompanyCount}
              </span>
            </div>
            <div className="request-info-header-text">
              Лимит по компаниям{" "}
              <span className="green-text">
                {auth.userInfo.eventFiltersInfo.companyLimit}
              </span>
            </div>
          </>
        ) : (
          <p>Данные недоступны...</p>
        )}
      </div>

      {!menuOpen && (
        <button className="burger-btn" onClick={() => setMenuOpen(true)}>
          ☰
        </button>
      )}

      <div className={`burger-menu ${menuOpen ? "open" : ""}`}>
        <header className="header-burger-menu">
          <img
            className="nav-burger-menu-image"
            src={require("../../assets/Images/homeImage/footerImage.png")}
            alt={"СКАН"}
          />
          <button
            className="burger-menu-close-btn"
            onClick={() => setMenuOpen(false)}
          >
            ✖
          </button>
        </header>
          <nav className="nav-burger-menu">
          <Link className="link-nav-burger-menu" to="/">
            Главная
          </Link>
          <Link className="link-nav-burger-menu" to="/">
            Тарифы
          </Link>
          <Link className="link-nav-burger-menu" to="">
            FAQ
          </Link>
        </nav>
        
        {/* Панель регистрации/входа */}
        {!auth.loggedIn ? (
          <div className="guest-panel-header-burgermenu">
            <Link className="user-auth-false-burgermenu" to="/">
              Зарегистрироваться
            </Link>
            <button
              className="button-header-burgermenu"
              onClick={() => navigate("/login")}
            >
              Войти
            </button>
          </div>
        ) : (
          <div className="account-panel-header">
            <div className="user-panel">
              <div className="user-name">{auth.username || "Пользователь"}</div>
              <button
                className="logout-button-burgermenu"
                onClick={handleLogout}
              >
                Выйти
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default HeaderBurgerMenu;

