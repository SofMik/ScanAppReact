import "./App.css";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import HomePage from "./pages/HomePage/HomePage";
import LoginPage from "./pages/LoginPage/LoginPage";
import UserPage from "./pages/UserPage/UserPage";
import ResultsPage from "./pages/ResultsPage/ResultsPage";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Routes>
            {/* Главная страница */}
            <Route path="/" element={<HomePage />} />

            {/* Страница авторизации */}
            <Route path="/login" element={<LoginPage />} />

            {/* Личная страница пользователя */}
            <Route path="/user" element={<UserPage />} />

            {/* Страница результатов */}
            <Route path="/results" element={<ResultsPage />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;
