import React, { useCallback, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import qs from "qs";

import {
  Categories, 
  SortPopup as Sort,
  PizzaBlock,
  Skeleton,
  Pagination
} from "../components";

import { sortList } from "../components/sort";
import { useAppDispatch } from "../redux/store";
import { setCategoryId, setFilters, setPageCount } from "../redux/filter/slice";
import { fetchPizzas } from "../redux/pizza/asyncActions";
import { SearchPizzaParams } from "../redux/pizza/types";
import { selectPizzaData } from "../redux/pizza/selectors";
import { selectFilter } from "../redux/filter/selectors";

const Home: React.FC = () => {
  //https://628ca39e3df57e983ed2f993.mockapi.io/items

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const {categoryId} = useParams();
  const isMounted = useRef(false);
  const isSearch = useRef(false);

  const { category, sort, currentPage, searchValue } = useSelector(selectFilter);

  const { items, status } = useSelector(selectPizzaData);
  
  const sortType = sort.sortProperty;

  const onChangeCategory = useCallback((id: number) => {
    dispatch(setCategoryId(id));
  }, []);

  const onChangePage = (page: number) => {
    dispatch(setPageCount(page));
  };

  const getPizzas = async () => {

    const sortBy = sortType.replace("-", "");
    const orderType = sortType.includes("-") ? "asc" : "desc";
    const categoryId = category > 0 ? `&category=${String(category)}` : "";
    const search = searchValue;
    
    dispatch(
      fetchPizzas({
        sortBy,
        orderType,
        categoryId,
        search,
        currentPage: String(currentPage),
      })
    );

    window.scrollTo(0, 0);
  };

  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1)) as unknown as SearchPizzaParams;
      const sort = sortList.find(
        (obj) => obj.sortProperty === params.sortBy
      );


      dispatch(setFilters({
        searchValue: params.search,
        category: Number(params.categoryId),
        currentPage: Number(params.currentPage),
        sort: sort || sortList[0],
      }));

      isSearch.current = true;
    }
  }, []);

  useEffect(() => {

    if (isMounted.current) {
      const queryString = qs.stringify({
        categoryId: category > 0 ? category : null,
        sortProperty: sort.sortProperty,
        currentPage,
      }, {skipNulls: true});

      navigate(`/?${queryString}`);
    }

    isMounted.current = true;
  }, [category, sortType, currentPage, searchValue]);



  useEffect(() => {
    if (!isSearch.current) {
      getPizzas();
    }

    isSearch.current = false;
  }, [category, sortType, currentPage, searchValue]);



  const skeletons = new Array(6)
    .fill("")
    .map((_, idx) => <Skeleton key={`${idx}_skeleton`} />);

  const pizzasArr = items.map((pizza: any, idx: number) => (
    <PizzaBlock {...pizza} key={pizza.id} />
  ));

  return (
    <div className="container">
      <div className="content__top">
        <Categories
          value={category}
          onClickCategory={onChangeCategory}
        />
        <Sort value={sort} />
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
