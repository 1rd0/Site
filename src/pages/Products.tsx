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

  const [isSearchVisible, setIsSearchVisible] = useState(false);

  const [showSearch, setShowSearch] = useState<boolean>(false); // Состояние для отображения поля ввода поиска

  const toggleSearch = () => {
    setIsSearchVisible(!isSearchVisible);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      fetch("https://localhost:7259/api/Item", {
        // fetch("https://2f9c-79-98-8-21.ngrok-free.app/api/Item", {
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
      // переадресацию сделай да
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
    setsortstr("");
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
    setsortstr("по Цене");
  };

  const handleSortByAlphabet = () => {
    const sortedItems = [...items].sort((a, b) => a.name.localeCompare(b.name));
    setItems(sortedItems);
    setsortstr("по Названию");
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
      <div
        style={{
          backgroundColor: "white",
          fontFamily: "Montserrat",
          fontStyle: "normal",
        }}
      >
        <h1 style={{ fontSize: "62px" }}>Товары </h1>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              paddingTop: "20px",
              justifyContent: "space-between",
            }}
          >
            <div
              style={{
                display: "flex",

                paddingTop: "15px",
              }}
            >
              <Button
                style={{
                  fontFamily: "Montserrat",
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
                className=" btn btn-light btn-outline-dark "
                onClick={handleResetFilters}
              >
                Всё
              </Button>
              <Categories onSelectCategory={handleCategorySelect} />
            </div>
          </div>
          <div style={{ display: "flex", paddingTop: "36px" }}>
            <div>
              {!isSearchVisible && ( // Показываем иконку только если поле ввода не отображается
                <img
                  src="\imgs\search_7156420.png"
                  alt=""
                  style={{ width: "40px", height: "40px", marginRight: "10px" }}
                  onClick={toggleSearch}
                />
              )}
              {isSearchVisible && (
                <input
                  className="form-control"
                  style={{
                    fontFamily: "Montserrat",
                    fontSize: "25px",
                    height: "30px",
                    marginTop: "8px",
                    marginRight: "30px",
                    width: "250px",
                    borderRadius: "6px",
                    border: "1px solid black",
                    outline: "none", // Убираем стандартный контур при фокусе
                    boxShadow: "0px 0px 2px 2px rgba(0, 0, 0, 0.5)", // Черная тень при фокусе
                  }}
                  type="text"
                  placeholder="Введите название..."
                  value={names}
                  onChange={handleInputChange}
                  onBlur={() => setIsSearchVisible(false)} // Скрываем поле ввода при потере фокуса
                />
              )}
            </div>

            <button
              style={{
                fontSize: "20px",
                height: "40px",
                outline: "none",
                border: "none",
                backgroundColor: "white",
              }}
              className="btn-light"
              onClick={handleResetFilters}
            >
              Сбросить
            </button>

            <Dropdown.Menu></Dropdown.Menu>
            <Dropdown>
              <Dropdown.Toggle
                style={{
                  fontSize: "20px",
                  height: "40px",
                  outline: "none",
                  border: "none",
                  backgroundColor: "white",
                }}
                variant="light"
                id="dropdown-basic"
              >
                Фильтр {sortstr}
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item onClick={handleSortByPrice}>
                  Цене (Low to High)
                </Dropdown.Item>
                <Dropdown.Item onClick={handleSortByPrice}>
                  Цене (High to Low)
                </Dropdown.Item>
                <Dropdown.Item onClick={handleSortByAlphabet}>
                  A-Я
                </Dropdown.Item>
                <Dropdown.Item onClick={() => setItems([...items].reverse())}>
                  Я-А
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
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
          <h1></h1>{" "}
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
