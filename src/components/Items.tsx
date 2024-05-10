import { Button, Card } from "react-bootstrap";
import { formatCurrency } from "../Utilities/FormatCurrency";
import { useShoppingCart } from "../context/ShoppingCartContext";

type ItemProps = {
  id: number;
  name: string;
  description: string;
  price: number;
  category: number;
  imgurl: string;
};

export function Items({
  id,
  name,
  description,
  price,
  category,
  imgurl,
}: ItemProps) {
  const {
    getItemQuantitu,
    increaseCartQuantitu,
    decreaseCartQuantitu,
    removefromcart,
  } = useShoppingCart();

  const quantity = getItemQuantitu(id);
  return (
    <Card className="h-100">
      <Card.Img
        variant="top"
        src={imgurl}
        height="190px"
        style={{ objectFit: "cover" }}
      ></Card.Img>
      <Card.Body className="d-flex flex-column">
        <Card.Title className="d-flex justify-content-between align-items-baseline mb-4">
          <span className="fs-2">{name}</span>

          <span className="ms-2 text-muted ">{formatCurrency(price)}</span>
        </Card.Title>
        <Card.Footer>
          <span className="fs-2">{description}</span>
        </Card.Footer>
        <div className="mt-auto">
          {quantity === 0 ? (
            <Button
              className="w-100  btn-light btn-outline-dark"
              onClick={() => increaseCartQuantitu(id)}
            >
              {" "}
              Добавить
            </Button>
          ) : (
            <div
              className="d-felx align-items-center flex-row"
              style={{ gap: ".5rem" }}
            >
              <div
                className="d-flex align-items-center justify-content-center flex-row" // изменено на flex-row
                style={{ gap: ".5rem", fontSize: "32px" }}
              >
                <Button
                  style={{ fontSize: "19px" }}
                  className="btn btn-light btn-outline-dark "
                  onClick={() => increaseCartQuantitu(id)}
                >
                  +
                </Button>
                <div>
                  <span className="fs-1">{quantity}</span> в корзине
                </div>

                <Button
                  style={{ fontSize: "19px" }}
                  className="btn btn-light btn-outline-dark "
                  onClick={() => decreaseCartQuantitu(id)}
                >
                  -
                </Button>
              </div>
              <div className="d-flex align-items-center justify-content-center flex-row">
                <Button
                  style={{ fontSize: "15px" }}
                  variant="danger"
                  size="sm"
                  onClick={() => removefromcart(id)}
                >
                  Удалить
                </Button>
              </div>
            </div>
          )}
        </div>
      </Card.Body>
    </Card>
  );
}
