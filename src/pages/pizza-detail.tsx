import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate, Link } from "react-router-dom";

const PizzaDetail: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [pizza, setPizza] = useState<{
    imageUrl: string;
    title: string;
    price: number;
  }>();

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(
          `https://628ca39e3df57e983ed2f993.mockapi.io/items/${id}`
        );
        setPizza(data);
      } catch (error) {
        navigate(`/`);
      }
    })();
  }, []);

  if (!pizza) {
    return <>Загрузка...</>;
  }

  return (
    <div className="container">
      <img src={pizza.imageUrl} alt="" />
      <h2>{pizza.title}</h2>
      <p>{pizza.price}</p>
      <Link
        to="/"
        className="button button--outline button--add go-back-btn"
      >
        <span>Вернуться назад</span>
      </Link>
    </div>
  );
}

export default PizzaDetail;
