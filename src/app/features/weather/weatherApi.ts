import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { url } from "inspector";

const OPEN_WEATHER_API_KEY = "ad060d22e260ceeae3c75f492ca3ab97";

export const weatherApi = createApi({
  reducerPath: "weatherApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.openweathermap.org/data/2.5/",
  }),
  endpoints: (builder) => ({
    getCurrentWeather: builder.query({
      query: (city) => {
         const url = `weather?q=${city}&appid=${OPEN_WEATHER_API_KEY}&units=metric`
         console.log(url)
         debugger
         return url
    }
    }),
    get7DayForecast: builder.query({
      query: (latLon) =>
        `onecall?lat=${latLon.lat}&lon=${latLon.lon}&exclude=minutely,hourly&appid=${OPEN_WEATHER_API_KEY}&units=metric`,
    }),
  }),
});



export const { useGetCurrentWeatherQuery, useGet7DayForecastQuery } = weatherApi;
