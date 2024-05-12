import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Offcanvas from "react-bootstrap/Offcanvas";
import { NavLink } from "react-router-dom";

import { useShoppingCart } from "../context/ShoppingCartContext";
import "./custom.css";
function OffcanvasExample() {
  const [showOffcanvas, setShowOffcanvas] = useState(false);

  const handleOffcanvasToggle = () => {
    setShowOffcanvas(!showOffcanvas);
  };

  const handleNavLinkClick = () => {
    setShowOffcanvas(false); // Скрываем Offcanvas при нажатии на ссылку
  };
  const { openCart, cartQuantity } = useShoppingCart();

  return (
    <>
      <Navbar expand={false} className="  bg-white  p-3">
        <Container fluid>
          <Navbar.Toggle
            aria-controls={`offcanvasNavbar-expand-${false}`}
            className="border-0 shadow-none "
            onClick={handleOffcanvasToggle}
            style={{ fontSize: "30px" }}
          ></Navbar.Toggle>
          <Navbar.Offcanvas
            style={{ fontFamily: "Montserrat", fontStyle: "normal" }}
            id={`offcanvasNavbar-expand-${false}`}
            show={showOffcanvas}
            onHide={() => setShowOffcanvas(false)}
            placement="start"
          >
            <Offcanvas.Header style={{ fontSize: "30px" }} closeButton>
              Khanami Market
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="justify-content-start flex-grow-1">
                <Nav.Link
                  className="NavLink"
                  style={{ fontSize: "25px" }}
                  to={"/"}
                  as={NavLink}
                  onClick={handleNavLinkClick} // Добавляем обработчик на клик
                >
                  Главаня
                </Nav.Link>
                <Nav.Link
                  className="NavLink"
                  style={{ fontSize: "25px" }}
                  to={"/Products"}
                  as={NavLink}
                  onClick={handleNavLinkClick} // Добавляем обработчик на клик
                >
                  Товары
                </Nav.Link>
              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
          {/* Логотип */}
          <a href="/">
            <img
              src="./imgs/Untitled.png"
              alt="Logo"
              className="me-3"
              style={{ height: "16rem" }}
            />{" "}
          </a>
          <Button
            onClick={openCart}
            type="button"
            className="rounded-circle btn btn-light bg-white border-0 btn-hover-light btn-scale"
            style={{
              width: "3.5rem",
              height: "3.5rem",
              position: "relative",
              transition: "transform 0.3s ease",
            }}
            onMouseEnter={(
              e: React.MouseEvent<HTMLButtonElement, MouseEvent>
            ) => (e.currentTarget.style.transform = "scale(1.1)")}
            onMouseLeave={(
              e: React.MouseEvent<HTMLButtonElement, MouseEvent>
            ) => (e.currentTarget.style.transform = "scale(1)")}
          >
            <svg
              aria-hidden="true"
              focusable="false"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 40 40"
              fill="none"
              width="60" // увеличиваем ширину до 60 единиц
              height="60" // увеличиваем высоту до 60 единиц
              style={{ marginLeft: "-15px" }}
            >
              <path
                fill="currentColor"
                fill-rule="evenodd"
                d="M20.5 6.5a4.75 4.75 0 00-4.75 4.75v.56h-3.16l-.77 11.6a5 5 0 004.99 5.34h7.38a5 5 0 004.99-5.33l-.77-11.6h-3.16v-.57A4.75 4.75 0 0020.5 6.5zm3.75 5.31v-.56a3.75 3.75 0 10-7.5 0v.56h7.5zm-7.5 1h7.5v.56a3.75 3.75 0 11-7.5 0v-.56zm-1 0v.56a4.75 4.75 0 109.5 0v-.56h2.22l.71 10.67a4 4 0 01-3.99 4.27h-7.38a4 4 0 01-4-4.27l.72-10.67h2.22z"
              ></path>
            </svg>

            <div
              className="rounded-circle bg-black d-flex justify-content-center align-items-center"
              style={{
                color: "white",
                position: "absolute",
                width: "1.2rem",
                height: "1.2rem",
                bottom: 0,
                transition: "transform 0.3s ease", // добавляем анимацию при изменении размера
              }}
              onMouseEnter={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) =>
                (e.currentTarget.style.transform = "scale(1.2)")
              } // при наведении увеличиваем размер
              onMouseLeave={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) =>
                (e.currentTarget.style.transform = "scale(1)")
              } // при уходе уменьшаем размер до обычного
            >
              {cartQuantity}
            </div>
          </Button>
        </Container>
      </Navbar>
    </>
  );
}

export default OffcanvasExample;
