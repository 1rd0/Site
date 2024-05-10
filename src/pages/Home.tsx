import React, { useState, useEffect } from "react";
import axios from "axios";
import { useShoppingCart } from "../context/ShoppingCartContext";
import "./Home.css";
import { Button, Form, FormControl, InputGroup, Alert } from "react-bootstrap";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function Home() {
  const [username, setUsername] = useState(
    localStorage.getItem("username") || ""
  );
  const [password, setPassword] = useState("");
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isLoggedIn") === "true"
  );
  const [error, setError] = useState("");
  const { setCartItems } = useShoppingCart();
  const [showPassword, setShowPassword] = useState(false);
  useEffect(() => {
    if (isLoggedIn) {
      fetchCartItemsFromDatabase(); // Если пользователь авторизован, загружаем данные корзины
    }
  }, [isLoggedIn]); // Вызываем useEffect при изменении статуса авторизации

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        "https://localhost:7259/api/User/login",
        { userName: username, passwordHashe: password }
      );

      localStorage.setItem("token", response.data); // Сохраняем токен в localStorage
      localStorage.setItem("username", username); // Сохраняем имя пользователя в localStorage
      localStorage.setItem("isLoggedIn", "true"); // Устанавливаем статус авторизации в "true" (как строку)
      setToken(response.data);
      setIsLoggedIn(true);
      setError("");
      fetchCartItemsFromDatabase(); // Загружаем данные корзины после успешной аутентификации
    } catch (error) {
      setError("Неверное имя пользователя или пароль");
    }
  };

  const fetchCartItemsFromDatabase = async () => {
    try {
      const response = await axios.get(
        `https://localhost:7259/api/Shopingcarts/${username}`
      );
      setCartItems(response.data);
    } catch (error) {
      console.error(
        "Проблема с получением данных корзины из базы данных:",
        error
      );
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("isLoggedIn");
    setToken("");
    setUsername("");
    setIsLoggedIn(false);
  };

  return (
    <div
      style={{
        fontFamily: "Montserrat",
        fontStyle: "normal",
        fontSize: "35px",
      }}
    >
      {isLoggedIn ? (
        <div style={{}}>
          <p>Добро пожаловать, {username}!</p>
          <Button
            style={{ fontSize: "32px", width: "220px" }}
            className="w-20 btn-light btn-outline-dark"
            onClick={() => {
              handleLogout(); // функция для выхода из учетной записи
              // функция для обновления корзины
              window.location.reload(); // перезагрузка страницы
            }}
          >
            Выйти
          </Button>
        </div>
      ) : (
        <div>
          <form>
            {" "}
            <div className="label-container">
              <label>Имя пользователя </label>{" "}
              <InputGroup style={{ width: "500px", height: "50px" }}>
                <FormControl
                  style={{ fontSize: "25px" }}
                  onChange={(e) => setUsername(e.target.value)}
                  name="password"
                  placeholder="Введите свою почту"
                  value={username}
                />
              </InputGroup>
              <label>Пароль </label>
              <InputGroup style={{ width: "500px" }}>
                <FormControl
                  style={{ fontSize: "25px" }}
                  onChange={(e) => setPassword(e.target.value)}
                  name="password"
                  placeholder="Введите свой пароль"
                  type={showPassword ? "text" : "password"}
                  value={password}
                />
                <InputGroup.Text>
                  <Button
                    variant="outline-secondary"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </Button>
                </InputGroup.Text>
              </InputGroup>
              <br />
              {error && <p style={{ color: "maroon" }}>{error}</p>}
              <div className="button-container"></div>
              <Button
                className="w-20 btn-light btn-outline-dark"
                style={{ fontSize: "32px", width: "220px" }}
                type="button"
                onClick={handleLogin}
              >
                Войти
              </Button>
              <Button
                style={{ fontSize: "32px", width: "220px", marginTop: "20px" }}
                className="w-20 btn-light btn-outline-dark"
                type="button"
                href="/reg"
              >
                Регистрация
              </Button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
