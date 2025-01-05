import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// import { NewsResponse } from "./types";

const API_KEY = process.env.NEXT_PUBLIC_NEWS_API_KEY;

export const newsApi = createApi({
  reducerPath: "newsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://newsapi.org/v2" }),
  endpoints: (builder) => ({
    getNewsSources: builder.query<any, void>({
      query: () => ({
        url: "/top-headlines/sources",
        params: {
          apiKey: API_KEY,
        },
      }),
    }),

    getNewsByCategory: builder.query<any, string>({
      query: (category) => ({
        url: "/top-headlines/sources",
        params: {
          category,
          apiKey: API_KEY,
        },
      }),
    }),
  }),
});

export const { useGetNewsSourcesQuery, useGetNewsByCategoryQuery } = newsApi;
