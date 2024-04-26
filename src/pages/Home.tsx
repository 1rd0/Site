import React, { useState, useEffect } from "react";
import { Col, Row, Button, Dropdown } from "react-bootstrap";
export default function Home() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    // Здесь можно добавить логику для проверки имени пользователя и пароля
    // В данном примере просто устанавливаем isLoggedIn в true
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <div style={{ fontSize: "35px" }}>
      {isLoggedIn ? (
        <div>
          <h1>Welcome, {username}!</h1>
          <Button onClick={handleLogout}>Logout</Button>
        </div>
      ) : (
        <form>
          <label>
            Username:
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </label>
          <br />
          <label>
            Password:
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <br />
          <Button type="button" onClick={handleLogin}>
            Login
          </Button>
        </form>
      )}
    </div>
  );
}
