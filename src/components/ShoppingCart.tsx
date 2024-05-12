import { Offcanvas, Stack } from "react-bootstrap";
import { useShoppingCart } from "../context/ShoppingCartContext";
import { Items } from "./Items";
import { CartItem } from "./CartItem";
import { formatCurrency } from "../Utilities/FormatCurrency";
import React, { useState, useEffect } from "react";
import { Button, Modal } from "react-bootstrap";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type ShoppingCartProviderProps = {
  isOpen: boolean;
};
interface Item {
  id: number;
  name: string;
  description: string;
  price: number;
  category: number;
  imgurl: string;
}

export function ShoppingCart({ isOpen }: ShoppingCartProviderProps) {
  const { closeCart, cartitems } = useShoppingCart();
  const [items, setItems] = useState<Item[]>([]);
  const [checkdata, setcheck] = useState<boolean>(true);
  const [showModal, setShowModal] = useState<boolean>(false);
  useEffect(() => {
    fetch("https://localhost:7259/api/Item")
      .then((response) => response.json())
      .then((response) => setItems(response))
      .catch((error) => {
        console.error("Problem with get data", error);
        setcheck(false);
      });
  }, []);

  const placeOrder = () => {
    const OrderData = {
      username: localStorage.getItem("username"),
      shopcarts: cartitems,
    };

    fetch("https://localhost:7259/api/Order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(OrderData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to place order");
        } else {
          console.log("good orders");
          localStorage.setItem("shoping-cart", "[]");

          setShowModal(true);
        }
      })
      .catch((error) => {
        console.error("Problem with placing order", error);
      });
  };
  return (
    <Offcanvas
      style={{ fontFamily: "Montserrat", fontStyle: "normal" }}
      show={isOpen}
      onHide={closeCart}
      placement="end"
    >
      <Offcanvas.Header closeButton>
        <Offcanvas.Title style={{ fontSize: "54px" }}>Cart</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <Stack style={{ fontSize: "34px" }} gap={3}>
          {cartitems.map((item) => (
            <CartItem key={item.id} {...item} />
          ))}
          <div className="ms-auto   fs-5">
            {cartitems.length > 0 ? (
              <>
                <Button
                  style={{ marginRight: "100px" }}
                  className="ms-auto fs-5 w-10 btn-light btn-outline-success"
                  onClick={placeOrder}
                >
                  Оформить заказ
                </Button>
                All:{" "}
                {formatCurrency(
                  cartitems.reduce((total, cartItem) => {
                    const item = items.find((i) => i.id === cartItem.id);
                    return total + (item?.price || 0) * cartItem.quantity;
                  }, 0)
                )}
              </>
            ) : (
              <>
                <div
                  style={{
                    fontSize: "32px",
                    display: "flex",
                    flexWrap: "wrap",

                    justifyContent: "center",
                  }}
                >
                  Корзина пуста{" "}
                  <Button
                    style={{ marginRight: "90px" }}
                    className="ms-auto fs-5 w-10 btn-light btn-outline-dark"
                    href="/Products"
                  >
                    Вернуться к товарам
                  </Button>{" "}
                </div>
              </>
            )}
          </div>
        </Stack>
      </Offcanvas.Body>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title style={{ fontWeight: "bold", color: "green" }}>
            Заказ успешно оформлен!
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ fontSize: "23px" }}>
          Ваш заказ успешно оформлен. Спасибо за покупку!
        </Modal.Body>
        <Modal.Footer>
          <Button
            className=" ms-auto fw-bold fs-5 w-20 btn-light btn-outline-dark"
            variant="secondary"
            onClick={() => setShowModal(false)}
            href="/Products"
          >
            Закрыть
          </Button>
        </Modal.Footer>
      </Modal>
    </Offcanvas>
  );
}
