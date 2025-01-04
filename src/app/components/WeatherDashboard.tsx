"use client";

import { useSelector } from "react-redux";
import { RootState } from "../lib/store/store";
import SearchBar from "../features/weather/SearchBar";
import WeatherChart from "../features/weather/WeatherChart";
import {
  useGetCurrentWeatherQuery,
  useGet7DayForecastQuery,
} from "../features/weather/weatherApi";
import { useGeolocation } from "../features/weather/Geolocation";

export default function WeatherDashboard() {
  useGeolocation(); // This will update the geolocation in Redux state

  const city = useSelector((state: RootState) => state.weather.city);
  const {
    data: currentWeather,
    error: currentWeatherError,
    isLoading: isCurrentWeatherLoading,
  } = useGetCurrentWeatherQuery(city);
  const geolocation = useSelector(
    (state: RootState) => state.weather.geolocation
  );
  const {
    data: forecast,
    error: forecastError,
    isLoading: isForecastLoading,
  } = useGet7DayForecastQuery(geolocation || { lat: 0, lon: 0 });

  if (isCurrentWeatherLoading || isForecastLoading) {
    return <div>Loading...</div>;
  }

  if (currentWeatherError || forecastError) {
    return (
      <div>Error: {(currentWeatherError || forecastError)?.toString()}</div>
    );
  }

  return (
    <div>
      <h1>Weather App</h1>
      <SearchBar />
      {currentWeather && (
        <div>
          <h2>{currentWeather.name}</h2>
          <p>Temperature: {currentWeather.main.temp}°C</p>
        </div>
      )}
      {forecast && (
        <WeatherChart
          data={forecast.daily.map((d: any, i: number) => ({
            day: `Day ${i + 1}`,
            temp: d.temp.day,
          }))}
        />
      )}
    </div>
  );
}
