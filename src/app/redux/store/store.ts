import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { weatherApi } from "@/app/services/weather/weatherApi";
import {  stockApi } from "@/app/services/finance/financeApi";
import { newsApi } from "@/app/services/news/newsApi";

// if the finance api key does not work use a vpn
export const store = configureStore({
  reducer: {
    [weatherApi.reducerPath]: weatherApi.reducer,
    [newsApi.reducerPath]: newsApi.reducer,
    [stockApi.reducerPath]: stockApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(weatherApi.middleware)
      .concat(stockApi.middleware)
      .concat(newsApi.middleware),
});

setupListeners(store.dispatch);
