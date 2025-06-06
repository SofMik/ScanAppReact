import React from "react";

import { useAuth } from ".././../context/AuthContext";
import "./Header.css";

import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const { auth, logout, isLoading } = useAuth();

  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="decktop-header">
      <img
        className="logo-header"
        src={require("../../assets/Images/homeImage/HomeImageLogo.png")}
        alt="Логотип"
      />
      <nav className="nav-header">
        <Link className="nav-header-link" to="/">
          Главная
        </Link>
        <Link className="nav-header-link" to="/">
          Тарифы
        </Link>
        <Link className="nav-header-link" to="">
          FAQ
        </Link>
      </nav>

      <div className={`request-info-header ${auth.loggedIn ? "" : "hidden"}`}>
        {isLoading ? (
          <>
            <div className="header-loader-container">
              <div className="header-loader"></div>
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

      {auth.loggedIn ? (
        <div className="account-panel-header">
          <div className="user-panel">
            <div className="user-name">{auth.username || "Пользователь"}</div>
            <button className="logout-button" onClick={handleLogout}>
              Выйти
            </button>
          </div>
          <img
            className="user-foto"
            src={require("../../assets/Images/homeImage/user_foto.png")}
            alt="моё фото"
          />
        </div>
      ) : (
        <div className="guest-panel-header">
          <Link className="user-auth-false" to="/">
            Зарегистрироваться
          </Link>
          <button className="button-header" onClick={() => navigate("/login")}>
            Войти
          </button>
        </div>
      )}
    </header>
  );
};

export default Header;
