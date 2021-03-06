import React from "react";

type CategoriesProps = {
  value: number;
  onClickCategory: (i: number) => void;
};

const categories: string[] = [
  "Все",
  "Мясные",
  "Вегетарианская",
  "Гриль",
  "Острые",
  "Закрытые",
];

export const Categories: React.FC<CategoriesProps> = React.memo(({ value, onClickCategory }) => {

  const activeItem: number = value | 0;

  return (
    <div className="categories">
      <ul>
        {categories.map((categoryName, idx) => {
          return (
            <li
              key={`${idx}_${categoryName}`}
              onClick={() => onClickCategory(idx)}
              className={activeItem === idx ? "active" : ""}
            >
              {categoryName}
            </li>
          );
        })}
      </ul>
    </div>
  );
});
