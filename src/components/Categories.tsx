import React, { Component } from "react";
import "./Categories.css";
import { Col, Row, Button, Dropdown } from "react-bootstrap";
interface CategoriesProps {
  onSelectCategory: (categoryId: number | null) => void;
}

interface Category {
  category_id: number;
  categoryName: string;
}

interface CategoriesState {
  categories: Category[];
}

class Categories extends Component<CategoriesProps, CategoriesState> {
  constructor(props: CategoriesProps) {
    super(props);
    this.state = {
      categories: [],
    };
  }

  componentDidMount() {
    fetch("https://localhost:7259/api/Category")
      .then((response) => response.json())
      .then((data) => {
        this.setState({ categories: data });
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  }

  render() {
    return (
      <div>
        {this.state.categories.map((category) => (
          <Button
            className="btn btn-light btn-outline-dark "
            style={{
              width: "85px",
              height: "40px",
              outline: "1px",
              marginRight: "15px",
              marginBottom: "25px",
              padding: "10px",
              border: "solid 1px",
              borderRadius: "50px",
              cursor: "pointer",
              transition: "all",
            }}
            key={category.category_id}
            onClick={() => this.props.onSelectCategory(category.category_id)}
          >
            {category.categoryName}
          </Button>
        ))}
      </div>
    );
  }
}

export default Categories;
