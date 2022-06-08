import React from "react";

import { Routes, Route } from "react-router-dom";
import Header from "./components/header";
import Home from "./pages/home";
import Cart from "./pages/cart";
import NotFound from "./pages/not-found";
import "./App.css";
import "./scss/app.scss";

function App() {
  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
