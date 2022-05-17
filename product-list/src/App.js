import React from "react";
import "./App.css";
import { ProductList } from "./features/product/index";
import { Routes, Route } from "react-router-dom";
import { ProductDetailPage, Autocomplete } from "./features/product/index";

function App() {
  return (
    <div className="App">
      <h1>Hello</h1>
      <Autocomplete />
      <Routes>
        <Route path="/products" element={<ProductList />} />
        <Route path="/products/:id" element={<ProductDetailPage />} />
      </Routes>
    </div>
  );
}

export default App;
