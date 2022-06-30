import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Pizza, SearchPizzaParams } from "./types";

export const fetchPizzas = createAsyncThunk<Pizza[], SearchPizzaParams>(
  "pizza/fetchPizzasStatus",
  async (params) => {
    const { sortBy, orderType, category, search, currentPage } = params;
    const { data } = await axios.get<Pizza[]>(
      `https://628ca39e3df57e983ed2f993.mockapi.io/items?p=${currentPage}&l=4&${category}&sortBy=${sortBy}&order=${orderType}${search}`
    );

    return data;
  }
);