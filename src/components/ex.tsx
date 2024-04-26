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
                  Home
                </Nav.Link>
                <Nav.Link
                  className="NavLink"
                  style={{ fontSize: "25px" }}
                  to={"/Products"}
                  as={NavLink}
                  onClick={handleNavLinkClick} // Добавляем обработчик на клик
                >
                  Products
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
            style={{ width: "3.5rem", height: "3.5rem", position: "relative" }}
          >
            <svg
              className="w-6 h-6 text-gray-800 dark:text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="34"
              height="34"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 12c.263 0 .524-.06.767-.175a2 2 0 0 0 .65-.491c.186-.21.333-.46.433-.734.1-.274.15-.568.15-.864a2.4 2.4 0 0 0 .586 1.591c.375.422.884.659 1.414.659.53 0 1.04-.237 1.414-.659A2.4 2.4 0 0 0 12 9.736a2.4 2.4 0 0 0 .586 1.591c.375.422.884.659 1.414.659.53 0 1.04-.237 1.414-.659A2.4 2.4 0 0 0 16 9.736c0 .295.052.588.152.861s.248.521.434.73a2 2 0 0 0 .649.488 1.809 1.809 0 0 0 1.53 0 2.03 2.03 0 0 0 .65-.488c.185-.209.332-.457.433-.73.1-.273.152-.566.152-.861 0-.974-1.108-3.85-1.618-5.121A.983.983 0 0 0 17.466 4H6.456a.986.986 0 0 0-.93.645C5.045 5.962 4 8.905 4 9.736c.023.59.241 1.148.611 1.567.37.418.865.667 1.389.697Zm0 0c.328 0 .651-.091.94-.266A2.1 2.1 0 0 0 7.66 11h.681a2.1 2.1 0 0 0 .718.734c.29.175.613.266.942.266.328 0 .651-.091.94-.266.29-.174.537-.427.719-.734h.681a2.1 2.1 0 0 0 .719.734c.289.175.612.266.94.266.329 0 .652-.091.942-.266.29-.174.536-.427.718-.734h.681c.183.307.43.56.719.734.29.174.613.266.941.266a1.819 1.819 0 0 0 1.06-.351M6 12a1.766 1.766 0 0 1-1.163-.476M5 12v7a1 1 0 0 0 1 1h2v-5h3v5h7a1 1 0 0 0 1-1v-7m-5 3v2h2v-2h-2Z"
              />
            </svg>

            <div
              className="rounded-circle bg-black d-flex justify-content-center
            align-items-center"
              style={{
                color: "white",
                position: "absolute",
                width: "1.2rem",
                height: "1.2rem",
                bottom: 0,
              }}
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
