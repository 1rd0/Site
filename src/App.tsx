import React from "react";
import "./App.css";

import { Routes, Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import Home from "./pages/Home";
import Products from "./pages/Products";

 
import OffcanvasExample from "./components/ex";
import { ShoppingCartProvider } from "./context/ShoppingCartContext";
 
function App() {
  return (
    <ShoppingCartProvider>      
      <OffcanvasExample />     
      <Container className="mb-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Products" element={<Products />} />
        </Routes>
      </Container> 
    </ShoppingCartProvider>
  );
}

export default App;
