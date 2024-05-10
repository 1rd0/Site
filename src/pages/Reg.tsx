import React, { useState } from "react";
import { Button, Form, FormControl, InputGroup, Alert } from "react-bootstrap";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useHref } from "react-router-dom";
import "./Reg.css";
export default function Reg() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailDirty, setEmailDirty] = useState(false);
  const [passwordDirty, setPasswordDirty] = useState(false);
  const [emailError, setEmailError] = useState("Email cannot be empty");
  const [passwordError, setPasswordError] = useState(
    "Password cannot be empty"
  );
  const [showPassword, setShowPassword] = useState(false);

  const emailHandler = (e: { target: { value: string } }) => {
    const trimmedEmail = e.target.value.trim();
    setEmail(trimmedEmail);
    const expression = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    const result = expression.test(trimmedEmail);
    if (!result) {
      setEmailError("Неправильный формат почты");
    } else {
      setEmailError("");
    }
  };

  const passwordHandler = (e: { target: { value: any } }) => {
    const newPassword = e.target.value;
    setPassword(newPassword);

    const errors = [];

    const uppercaseRegex = /[A-Z]/;
    if (!uppercaseRegex.test(newPassword.toString())) {
      errors.push("Пароль должен содержать хотя бы одну заглавную букву");
    }

    const numberRegex = /[0-9]/;
    if (!numberRegex.test(newPassword.toString())) {
      errors.push("Пароль должен содержать хотя бы одну цифру");
    }

    if (newPassword.length < 8) {
      errors.push("Длина пароля должна составлять не менее 8 символов");
    }

    setPasswordError(errors.join("\n"));
  };

  const blurHandler = (e: { target: { name: any } }) => {
    switch (e.target.name) {
      case "email":
        setEmailDirty(true);
        break;
      case "password":
        setPasswordDirty(true);
        break;
      default:
        break;
    }
  };

  const passwordColor = () => {
    if (passwordError === "") return "success";
    else if (passwordError.split("\n").length === 1) return "danger";
    else return "warning";
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const randomId = Math.floor(Math.random() * 1000000);
    const userData = {
      id: randomId,
      userName: email,
      passwordHashe: password,
      profession: "string",
    };
    console.log(userData);
    try {
      const response = await fetch("https://localhost:7259/api/User/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData), // Передача данных пользователя в теле запроса
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      console.log("User registered successfully!");

      // Второй запрос после успешной регистрации
      const cartResponse = await fetch(
        `https://localhost:7259/api/Shopingcarts/${email}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!cartResponse.ok) {
        throw new Error("Could not create user cart");
      }

      console.log("User cart created successfully!");

      // Перенаправление на другую страницу или выполнение других действий после успешного завершения обоих запросов
      window.location.href = "/";
    } catch (error) {
      // Обработка ошибок при отправке запроса или получении ответа
      console.error("There was a problem registering the user:", error);
      // Дополнительные действия при возникновении ошибки, например, отображение сообщения об ошибке пользователю
    }
  };

  return (
    <div
      className="label-container"
      style={{
        fontFamily: "Montserrat",
        fontStyle: "normal",
        fontSize: "35px",
      }}
    >
      <form onSubmit={handleSubmit} style={{ textAlign: "center" }}>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Электронная почта</Form.Label>
          <Form.Control
            style={{ fontSize: "25px", width: "500px", height: "50px" }}
            name="email"
            type="email"
            placeholder="Введите свою почту"
            value={email}
            onChange={emailHandler}
            onBlur={blurHandler}
            isInvalid={emailDirty && !!emailError}
          />
          <Form.Control.Feedback style={{ color: "maroon" }} type="invalid">
            {emailError}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Label>Пароль</Form.Label>
        <InputGroup className="mb-3" style={{ width: "500px" }}>
          <FormControl
            style={{ fontSize: "25px", width: "400px", height: "50px" }}
            name="password"
            placeholder="Введите свой пароль"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={passwordHandler}
            onBlur={blurHandler}
            isInvalid={passwordDirty && !!passwordError}
          />
          <InputGroup.Text className={`bg-${passwordColor()}`}>
            <Button
              variant="outline-secondary"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </Button>
          </InputGroup.Text>
          <Form.Control.Feedback style={{ color: "maroon" }} type="invalid">
            {passwordError}
          </Form.Control.Feedback>
        </InputGroup>
        <Button
          className="w-20 btn-light btn-outline-dark"
          style={{ fontSize: "32px", width: "220px", marginTop: "20px" }}
          type="submit"
        >
          Создать
        </Button>{" "}
      </form>
    </div>
  );
}
