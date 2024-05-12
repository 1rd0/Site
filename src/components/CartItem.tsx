import { useShoppingCart } from "../context/ShoppingCartContext";
import React, { useState, useEffect } from "react";
import { Items } from "../components/Items";
import { Button, Stack } from "react-bootstrap";
import { formatCurrency } from "../Utilities/FormatCurrency";

interface Item {
  id: number;
  name: string;
  description: string;
  price: number;
  category: number;
  imgurl: string;
}

type CartItemProps = {
  id: number;
  quantity: number;
};

export function CartItem({ id, quantity }: CartItemProps) {
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

  const { removefromcart } = useShoppingCart();
  const item = items.find((i) => i.id === id);
  if (item == null) return null;

  return (
    <Stack direction="horizontal" gap={2} className="d-flex align-items-center">
      <img
        src={item.imgurl}
        style={{ width: "125px", height: "75px", objectFit: "cover" }}
      />
      <div className="me-auto">
        <div>
          {item.name}{" "}
          {quantity > 1 && (
            <span className="text-muted" style={{ fontSize: ".85rem" }}>
              x{quantity}
            </span>
          )}
        </div>
        <div className="text-muted" style={{ fontSize: ".75rem" }}>
          {" "}
          {formatCurrency(item.price)}
        </div>
        <div style={{ fontSize: "15px" }}>
          {" "}
          {formatCurrency(item.price * quantity)}
        </div>
      </div>

      <Button
        variant="outline-danger"
        size="lg"
        onClick={() => removefromcart(item.id)}
      >
        &times;
      </Button>
    </Stack>
  );
}
