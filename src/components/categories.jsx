import React, { useState } from "react";

function Categories({ value, onClickCategory }) {
  const [activeCategory, setActiveCategory] = useState(0);
  const categories = [
    "Все",
    "Мясные",
    "Вегетарианская",
    "Гриль",
    "Острые",
    "Закрытые",
  ];

  // const onClickCategory = (index) => {
  //   setActiveCategory(index);
  // };

  return (
    <div className="categories">
      <ul>
        {categories.map((categoryName, idx) => {
          return (
            <li
              key={`${idx}_${categoryName}`}
              onClick={() => onClickCategory(idx)}
              className={value === idx ? "active" : ""}
            >
              {categoryName}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Categories;
