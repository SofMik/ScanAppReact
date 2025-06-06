import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import NavLoginSection from "../NavLogin/NavLoginSection";
import LoginButton from "../Button/LoginButton";
import {
  FacebookButton,
  YandexButton,
  GoogleButton,
} from "../Button/ButtonLinks";
import "./LoginForm.css";
import loginImageSmall from "../../assets/Images/loginImage/loginImageSmall.png";
import { Link } from "react-router-dom";

export default function LoginForm() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [credentials, setCredentials] = useState({ login: "", password: "" });

  const [loginError, setLoginError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const isFormValid = credentials.login.trim() && credentials.password.trim();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = await login(credentials.login, credentials.password);
    if (result.success) {
      navigate("/user");
    } else {
      setLoginError("");
      setPasswordError("");

      if (result.message?.login) {
        setLoginError(result.message.login);
      }

      if (result.message?.password) {
        setPasswordError(result.message.password);
      }
      setCredentials({ login: "", password: "" });
    }
  };

  return (
    <>
      <img className="loginImageSmall" src={loginImageSmall} alt={"foto"} />
      <form className="login-form" onSubmit={handleSubmit}>
        <NavLoginSection />
        <label htmlFor="name" className="label">
          Логин или номер телефона:
        </label>
        <input
          type="text"
          id="name"
          placeholder=""
          value={credentials.login}
          onChange={(e) => {
            setCredentials({ ...credentials, login: e.target.value });
            setLoginError("");
          }}
          className={loginError ? "error-input-login" : ""}
        />
        {loginError && (
          <div id="login-error" className="error-text">
            {loginError}
          </div>
        )}
        <label htmlFor="password" className="label">
          Пароль:
        </label>
        <input
          type="password"
          id="password"
          placeholder=""
          value={credentials.password}
          onChange={(e) => {
            setCredentials({ ...credentials, password: e.target.value });
            setPasswordError("");
          }}
          className={passwordError ? "error-input-login" : ""}
        />

        {passwordError && (
          <div id="password-error" className="error-text">
            {passwordError}
          </div>
        )}

        <LoginButton isFormValid={isFormValid} handleSubmit={handleSubmit} />

        <div>
          <Link
            className="update-password-link"
            to="#"
            onClick={(e) => e.preventDefault()}
          >
            Восстановить пароль
          </Link>
        </div>

        <label htmlFor="" className="label">
          Войти через:
        </label>
        <div className="links">
          <FacebookButton />
          <YandexButton />
          <GoogleButton />
        </div>
      </form>
    </>
  );
}
