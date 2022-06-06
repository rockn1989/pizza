import React, { useEffect, useState, useContext, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";

import axios from "axios";
import qs from "qs";

import {
  setCategoryId,
  setPageCount,
  setFilters,
} from "../redux/slices/filterSlice";

import Categories from "../components/categories";
import Sort from "../components/sort";
import PizzaBlock from "../components/pizza-block";
import Skeleton from "../components/pizza-block/skeleton";
import Pagination from "../components/pagination";
import { SearchContext } from "../App";

import { sortList } from "../components/sort";

function Home() {
  //https://628ca39e3df57e983ed2f993.mockapi.io/items
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isMounted = useRef(false);
  const isSearch = useRef(false);

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

  const fetchPizzas = () => {
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
        console.log(response.data);
        setIsLoading(false);
      });

    window.scrollTo(0, 0);
  };

  useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        categoryId,
        sortProperty: sort.sortProperty,
        currentPage,
      });

      navigate(`/?${queryString}`);
    }

    isMounted.current = true;
  }, [categoryId, sortType, currentPage]);

  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));
      const sort = sortList.find(
        (obj) => obj.sortProperty === params.sortProperty
      );

      dispatch(setFilters({ ...params, sort }));
      isSearch.current = true;
    }
  }, []);

  useEffect(() => {
    if (!isSearch.current) {
      fetchPizzas();
    }

    isSearch.current = false;
  }, [categoryId, sortType, currentPage]);

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
