import React, { useEffect, useState, useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { setCategoryId, setPageCount } from "../redux/slices/filterSlice";
import Categories from "../components/categories";
import Sort from "../components/sort";
import PizzaBlock from "../components/pizza-block";
import Skeleton from "../components/pizza-block/skeleton";
import Pagination from "../components/pagination";
import { SearchContext } from "../App";

function Home() {
  //https://628ca39e3df57e983ed2f993.mockapi.io/items
  const dispatch = useDispatch();
  const { categoryId, sort, currentPage } = useSelector(
    (state) => state.filter
  );

  const sortType = sort.sortProperty;

  const [pizzas, setPizzas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const { searchValue } = useContext(SearchContext);

  const onChangeCategory = (id) => {
    dispatch(setCategoryId(id));
  };

  const onChangePage = (number) => {
    dispatch(setPageCount(number));
  };

  useEffect(() => {
    setIsLoading(true);
    const sortBy = sortType.replace("-", "");
    const orderType = sortType.includes("-") ? "asc" : "desc";
    const category = categoryId > 0 ? `category=${categoryId}` : "";
    const search = searchValue.length > 0 ? `&search=${searchValue}` : "";

    axios
      .get(
        `https://628ca39e3df57e983ed2f993.mockapi.io/items?p=${currentPage}&l=4&${category}&sortBy=${sortBy}&order=${orderType}${search}`
      )
      .then((response) => {
        setPizzas(response.data);
        setIsLoading(false);
      });

    window.scrollTo(0, 0);
  }, [categoryId, sortType, searchValue, currentPage]);

  const skeletons = new Array(6)
    .fill("")
    .map((_, idx) => <Skeleton key={`${idx}_skeleton`} />);

  const pizzasArr = pizzas.map((pizza, idx) => (
    <PizzaBlock key={`${idx}_${pizza.title}`} {...pizza} />
  ));

  return (
    <div className="container">
      <div className="content__top">
        <Categories
          value={categoryId}
          onClickCategory={(id) => onChangeCategory(id)}
        />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">{isLoading ? skeletons : pizzasArr}</div>
      <Pagination value={currentPage} onChangePage={onChangePage} />
    </div>
  );
}

export default Home;
