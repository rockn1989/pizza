import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Pizza, SearchPizzaParams } from "./types";

export const fetchPizzas = createAsyncThunk<Pizza[], SearchPizzaParams>(
  "pizza/fetchPizzasStatus",
  async (params) => {
    const { sortBy, orderType, categoryId, search, currentPage } = params;
    let query = `https://628ca39e3df57e983ed2f993.mockapi.io/items?p=${currentPage}&l=4${categoryId}&sortBy=${sortBy}&order=${orderType}&search=${search}`;

    if (search.length > 0) {
      query = `https://628ca39e3df57e983ed2f993.mockapi.io/items?p=${currentPage}&l=4&sortBy=${sortBy}&order=${orderType}&search=${search}`;
    };

    const { data } = await axios.get<Pizza[]>(query);

    return data;
  }
);