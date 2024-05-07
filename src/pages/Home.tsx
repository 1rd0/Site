import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import axios from "axios";

export default function Home() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [token, setoken] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [error, setError] = useState("");
   

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (token) {
      // Если токен существует в sessionStorage, устанавливаем isLoggedIn в true
      setIsLoggedIn(true);
      // Получаем имя пользователя из sessionStorage
      const savedUsername = sessionStorage.getItem("username");
      if (savedUsername) {
        setUsername(savedUsername);
      }
    }
  }, []);
  
  const handleLogin = async () => {
    try {
      const response = await axios.post(
        "https://localhost:7259/api/User/login",
        { userName: username, passwordHashe: password }
      );
  
      sessionStorage.setItem("token", response.data); // Сохраняем токен под ключом "token"
      sessionStorage.setItem("username", username); // Сохраняем имя пользователя
      setIsLoggedIn(true);
      console.log(response);
    } catch (error) {
      setError("Неверное имя пользователя или пароль");
    }
  };
  
  const handleLogout = () => {
    sessionStorage.removeItem("token"); // Удаляем токен
    sessionStorage.removeItem("username"); // Удаляем имя пользователя
    setIsLoggedIn(false);
  };
  
  return (
    <div style={{ fontSize: "35px" }}>
      {isLoggedIn ? (
        <div>
          <p>Добро пожаловать, {username}!</p>
          <Button onClick={handleLogout}>Выйти</Button>
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
          </form>
        </div>
      )}
    </div>
  );
}
