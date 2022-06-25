import React, { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import qs from "qs";

import {
  setCategoryId,
  setPageCount,
  setFilters,
} from "../redux/slices/filterSlice";

import { fetchPizzas, SearchPizzaParams, selectPizzaData } from "../redux/slices/pizzaSlice";
import { selectFilter } from "../redux/slices/filterSlice";

import Categories from "../components/categories";
import Sort from "../components/sort";
import PizzaBlock from "../components/pizza-block";
import Skeleton from "../components/pizza-block/skeleton";
import Pagination from "../components/pagination";

import { sortList } from "../components/sort";
import { useAppDispatch } from "../redux/store";

const Home: React.FC = () => {
  //https://628ca39e3df57e983ed2f993.mockapi.io/items

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isMounted = useRef(false);
  const isSearch = useRef(false);

  const { categoryId, sort, currentPage, searchValue } =
    useSelector(selectFilter);

  const { items, status } = useSelector(selectPizzaData);

  const sortType = sort.sortProperty;

  const onChangeCategory = (id: number) => {
    dispatch(setCategoryId(id));
  };

  const onChangePage = (page: number) => {
    dispatch(setPageCount(page));
  };

  const getPizzas = async () => {
    const sortBy = sortType.replace("-", "");
    const orderType = sortType.includes("-") ? "asc" : "desc";
    const category = categoryId > 0 ? `category=${categoryId}` : "";
    const search = searchValue.length > 0 ? `&search=${searchValue}` : "";
    dispatch(
      fetchPizzas({
        sortBy,
        orderType,
        category,
        search,
        currentPage: String(currentPage),
      })
    );

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
  }, [categoryId, sortType, currentPage, searchValue]);

  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1)) as unknown as SearchPizzaParams;
      const sort = sortList.find(
        (obj) => obj.sortProperty === params.sortBy
      );

      // if (params) {
      //   params.sortBy = sort;
      // }

      dispatch(setFilters({
        searchValue: params.search,
        categoryId: Number(params.category),
        currentPage: Number(params.currentPage),
        sort: sort || sortList[0],
      }));
      isSearch.current = true;
    }
  }, []);

  useEffect(() => {
    if (!isSearch.current) {
      getPizzas();
    }

    isSearch.current = false;
  }, [categoryId, sortType, currentPage, searchValue]);

  const skeletons = new Array(6)
    .fill("")
    .map((_, idx) => <Skeleton key={`${idx}_skeleton`} />);

  const pizzasArr = items.map((pizza: any, idx: number) => (
    <PizzaBlock {...pizza} />
  ));

  return (
    <div className="container">
      <div className="content__top">
        <Categories
          value={categoryId}
          onClickCategory={(id: number) => onChangeCategory(id)}
        />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      {status === "error" ? (
        <div className="content__error-info">
          <h2>Произошла ошибка</h2>
          <p>
            К сожалению, не удалось получить пиццы. Попробуйте повторить попытку
            позже
          </p>
        </div>
      ) : (
        <>
          <div className="content__items">
            {status === "loading" ? skeletons : pizzasArr}
          </div>
          <Pagination value={currentPage} onChangePage={onChangePage} />
        </>
      )}
    </div>
  );
}

export default Home;
