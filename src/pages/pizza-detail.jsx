import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

function PizzaDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [pizza, setPizza] = useState({});

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

  if (Object.keys(pizza).length === 0) {
    return `Загрузка...`;
  }

  return (
    <div className="container">
      <img src={pizza.imageUrl} alt="" />
      <h2>{pizza.title}</h2>
      <p>{pizza.price}</p>
    </div>
  );
}

export default PizzaDetail;
