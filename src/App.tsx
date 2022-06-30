import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom";

import MainLayout from "./layouts/main-layout";
import Home from "./pages/home";

import "./App.css";
import "./scss/app.scss";

const Cart = React.lazy(() => import(/* webpackChunkName: "Cart" */ './pages/cart'));
const PizzaDetail = React.lazy(() => import(/* webpackChunkName: "PizzaDetail" */ './pages/pizza-detail'));
const NotFound = React.lazy(() => import(/* webpackChunkName: "NotFound" */ './pages/not-found'));

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="" element={<Home />} />
        <Route path="cart" element={<Suspense fallback={<div>Идет загрузка корзины...</div>}><Cart /></Suspense>} />
        <Route path="pizza/:id" element={<Suspense><PizzaDetail /></Suspense>} />
        <Route path="*" element={<Suspense><NotFound /></Suspense>} />
      </Route>
    </Routes>
  );
}

export default App;
