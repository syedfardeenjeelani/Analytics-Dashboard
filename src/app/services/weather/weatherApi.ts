import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const API_KEY = process.env.NEXT_PUBLIC_WEATHER_API_KEY;

interface LocationParams {
  lat?: number;
  lon?: number;
  city?: string;
}

export const weatherApi = createApi({
  reducerPath: "weatherApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://api.openweathermap.org" }),
  endpoints: (builder) => ({
    getCurrentWeather: builder.query({
      query: (params: LocationParams) => {
        if (params.lat && params.lon) {
          return {
            url: `/data/2.5/weather`,
            params: {
              lat: params.lat,
              lon: params.lon,
              appid: API_KEY,
              units: "metric",
            },
          };
        }
        return {
          url: `/data/2.5/weather`,
          params: {
            q: params.city,
            appid: API_KEY,
            units: "metric",
          },
        };
      },
    }),

    getForecast: builder.query({
      query: (params: LocationParams) => {
        if (params.lat && params.lon) {
          return {
            url: `/data/2.5/forecast`,
            params: {
              lat: params.lat,
              lon: params.lon,
              appid: API_KEY,
              units: "metric",
            },
          };
        }
        return {
          url: `/data/2.5/forecast`,
          params: {
            q: params.city,
            appid: API_KEY,
            units: "metric",
          },
        };
      },
    }),
  }),
});

export const { useGetCurrentWeatherQuery, useGetForecastQuery } = weatherApi;
