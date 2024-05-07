import React, { useState, useEffect } from "react";
import { Col, Row, Button, Dropdown } from "react-bootstrap";
import { Items } from "../components/Items";
import Categories from "../components/Categories";
interface Item {
  id: number;
  name: string;
  description: string;
  price: number;
  category: number;
  imgurl: string;
}

export default function Store() {
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);

  const [items, setItems] = useState<Item[]>([]);
  const [originalItems, setOriginalItems] = useState<Item[]>([]);
  const [checkdata, setCheckData] = useState<boolean>(true);
  const [names, setNames] = useState<string>("");
  const [sortByPriceAsc, setSortByPriceAsc] = useState<boolean>(true);
  const [sortstr, setsortstr] = useState<string>("");

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    
    if (token) {
      fetch("https://localhost:7259/api/Item", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Ошибка получения данных");
          }
          return response.json();
        })
        .then((response) => {
          setItems(response);
          setOriginalItems(response);
        })
        .catch((error) => {
          console.error("Проблема с получением данных", error);
          setCheckData(false);
        });
    } else {
      console.error("Токен не найден");
      setCheckData(false);
    }
  }, []);

  const handlsearch = (searchTerm: string) => {
    if (searchTerm) {
      const newdata = items.filter((x) =>
        x.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setItems(newdata);
    } else {
      setItems(originalItems);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = e.target.value;
    setNames(searchTerm);
    handlsearch(searchTerm);
  };

  const handleResetFilters = () => {
    setItems(originalItems);
    setNames("");
  };

  const handleSortByPrice = () => {
    const sortedItems = [...items].sort((a, b) => {
      if (sortByPriceAsc) {
        return a.price - b.price;
      } else {
        return b.price - a.price;
      }
    });

    setItems(sortedItems);
    setSortByPriceAsc(!sortByPriceAsc);
    setsortstr("Price");
  };

  const handleSortByAlphabet = () => {
    const sortedItems = [...items].sort((a, b) => a.name.localeCompare(b.name));
    setItems(sortedItems);
    setsortstr("Alphabet");
  };
  const handleCategorySelect = (categoryId: number | null) => {
    setSelectedCategory(categoryId);
    if (categoryId !== null) {
      const filteredItems = originalItems.filter(
        (item) => item.category === categoryId
      );
      setItems(filteredItems);
    } else {
      setItems(originalItems);
    }
  };

  return (
    <>
      <div style={{ fontFamily: "Montserrat", fontStyle: "normal" }}>
        <h1 style={{ fontSize: "62px" }}>Товары </h1>
        <div
          style={{
            display: "flex",
            paddingTop: "15px",
          }}
        >
          <Button
            style={{
              width: "85px",
              height: "40px",

              marginRight: "15px",
              marginBottom: "25px",
              padding: "10px",
              border: "solid 1px",
              borderRadius: "50px",
              cursor: "pointer",
              transition: "all",
            }}
            className="btn btn-light btn-outline-dark "
            onClick={handleResetFilters}
          >
            All
          </Button>
          <Categories onSelectCategory={handleCategorySelect} />
        </div>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            paddingTop: "20px",
            justifyContent: "space-between",
          }}
        >
          {" "}
          <input
            style={{ fontSize: "20px" }}
            type="text"
            placeholder="Введите название..."
            value={names}
            onChange={handleInputChange}
          />{" "}
          <div style={{ display: "flex" }}>
            <Button
              style={{ fontSize: "20px" }}
              className="btn-light"
              onClick={handleResetFilters}
            >
              Reset
            </Button>

            <Dropdown.Menu></Dropdown.Menu>
            <Dropdown>
              <Dropdown.Toggle
                style={{ fontSize: "20px" }}
                variant="light"
                id="dropdown-basic"
              >
                Sort by {sortstr}
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item onClick={handleSortByPrice}>
                  Price (Low to High)
                </Dropdown.Item>
                <Dropdown.Item onClick={handleSortByPrice}>
                  Price (High to Low)
                </Dropdown.Item>
                <Dropdown.Item onClick={handleSortByAlphabet}>
                  Ascending
                </Dropdown.Item>
                <Dropdown.Item onClick={() => setItems([...items].reverse())}>
                  Descending
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </div>

        <div style={{ paddingTop: "20px" }}>
          {checkdata ? (
            <Row md={2} xs={1} lg={3} className="g-3">
              {items.map((item) => (
                <Col key={item.id}>
                  <Items {...item} />
                </Col>
              ))}
            </Row>
          ) : (
            <p>Нет доступных товаров</p>
          )}{" "}
        </div>
      </div>
    </>
  );
}
