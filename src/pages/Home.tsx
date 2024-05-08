import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import axios from "axios";
import { useShoppingCart } from "../context/ShoppingCartContext";

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
    <div style={{ fontSize: "35px" }}>
      {isLoggedIn ? (
        <div>
          <p>Добро пожаловать, {username}!</p>
          <Button
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
            <label>
              Имя пользователя:
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </label>
            <br />
            <label>
              Пароль:
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>
            <br />
            {error && <p>{error}</p>}
            <Button type="button" onClick={handleLogin}>
              Войти
            </Button>

            <Button type="button" href="/reg">
              Регистрация
            </Button>
          </form>
        </div>
      )}
    </div>
  );
}
