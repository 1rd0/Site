import React from "react";
import "./App.css";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Routes, Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import Home from "./pages/Home";
import Products from "./pages/Products";
import Reg from "./pages/Reg";

import OffcanvasExample from "./components/ex";
import { ShoppingCartProvider } from "./context/ShoppingCartContext";
import Footer from "./components/Footer";
 

function App() {
  return (
    <ShoppingCartProvider>
      <ToastContainer />
      <OffcanvasExample />
      <Container className="mb-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Products" element={<Products />} />

          <Route path="/Reg" element={<Reg />} />
        </Routes>
      </Container>
      <Footer />
    </ShoppingCartProvider>
  );
}

export default App;
