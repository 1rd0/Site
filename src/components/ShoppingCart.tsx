import { Offcanvas, Stack } from "react-bootstrap";
import { useShoppingCart } from "../context/ShoppingCartContext";
import { Items } from "./Items";
import { CartItem } from "./CartItem";
import { formatCurrency } from "../Utilities/FormatCurrency";
import React, { useState, useEffect } from "react";

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

  useEffect(() => {
    fetch("https://localhost:7259/api/Item")
      .then((response) => response.json())
      .then((response) => setItems(response))
      .catch((error) => {
        console.error("Problem with get data", error);
        setcheck(false);
      });
  }, []);

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
          <div className="ms-auto fw-bold fs-5">
            Total{" "}
            {formatCurrency(
              cartitems.reduce((total, cartItem) => {
                const item = items.find((i) => i.id === cartItem.id);
                return total + (item?.price || 0) * cartItem.quantity;
              }, 0)
            )}
          </div>
        </Stack>
      </Offcanvas.Body>
    </Offcanvas>
  );
}
