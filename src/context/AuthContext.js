import React, { createContext, useState, useContext, useEffect, useCallback } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    accessToken: null,
    expire: null,
    loggedIn: false,
    username: null,
    userInfo: null,
  });

  const [isLoading, setIsLoading] = useState(true);

  //  Функция получения данных пользователя 
  const getUserInfo = useCallback(async () => {
    if (!auth.accessToken) return; //  Проверяем, есть ли accessToken

    try {
      setIsLoading(true);

      const response = await axios.get(
        "https://gateway.scan-interfax.ru/api/v1/account/info",
        { headers: { Authorization: `Bearer ${auth.accessToken}` } }
      );

     // console.log("API response:", response.data);

      if (!response.data?.eventFiltersInfo) {
        console.error("Ошибка: eventFiltersInfo отсутствует!");
        return;
      }

      setAuth((prevAuth) => ({
        ...prevAuth,
        userInfo: response.data,
      }));

    } catch (error) {
      console.error("Ошибка получения данных аккаунта:", error.response?.data || error.message);
    } finally {
      setIsLoading(false);
    }
  }, [auth.accessToken]); //  Добавляем зависимость accessToken

  //  Загружаем данные пользователя, если `auth.accessToken` изменился
  useEffect(() => {
    if (auth.accessToken) {
      getUserInfo();
    }
  }, [auth.accessToken, getUserInfo]); 

  // ✅ Функция логина
  const login = async (login, password) => {
    try {
      const response = await axios.post(
        "https://gateway.scan-interfax.ru/api/v1/account/login",
        { login, password }
      );

      const { accessToken, expire } = response.data;
     // console.log("Данные для входа:", { login, password });

      const authData = {
        accessToken,
        expire,
        loggedIn: true,
        username: login,
      };

      localStorage.setItem("auth", JSON.stringify(authData));
      setAuth(authData);

      return { success: true };
    } catch (error) {
      console.error("Ошибка авторизации:", error);
      const serverError = error.response?.data || {};

      return {
        success: false,
        message: {
          login: serverError.login || "Введите корректные данные",
          password: serverError.password || "Неправильный пароль",
        },
      };
    }
  };

  // ✅ Функция выхода
  const logout = () => {
    localStorage.removeItem("auth");
    setAuth({
      accessToken: null,
      expire: null,
      loggedIn: false,
      username: null,
      userInfo: null,
    });
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout, getUserInfo, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
