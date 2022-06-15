import { Routes, Route } from "react-router-dom";

import MainLayout from "./layouts/main-layout";
import Home from "./pages/home";
import Cart from "./pages/cart";
import PizzaDetail from "./pages/pizza-detail";
import NotFound from "./pages/not-found";
import "./App.css";
import "./scss/app.scss";

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="" element={<Home />} />
        <Route path="cart" element={<Cart />} />
        <Route path="pizza/:id" element={<PizzaDetail />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
