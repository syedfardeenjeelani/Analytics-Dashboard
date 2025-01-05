"use client";

import React, { useState, useCallback, useEffect } from "react";
import { XCircle, Loader2, CloudRain, Calendar } from "lucide-react";
import debounce from "lodash/debounce";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Cell,
  ResponsiveContainer,
  Legend,
} from "recharts";
import {
  useGetCurrentWeatherQuery,
  useGetForecastQuery,
} from "../../services/weather/weatherApi";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface ChartColors {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
}

interface WeatherWidgetProps {
  id: string;
  children: React.ReactNode;
}

interface WeatherData {
  main: {
    temp: number;
    feels_like: number;
    humidity: number;
  };
  wind: {
    speed: number;
  };
}

interface ForecastData {
  list: Array<{
    dt_txt: string;
    main: {
      temp: number;
      humidity: number;
    };
    wind: {
      speed: number;
    };
  }>;
}

interface RenderWidgetProps {
  widgetId: string;
  weather: WeatherData | null;
  forecast: ForecastData | null;
  isLoading: boolean;
}

const CHART_COLORS: ChartColors = {
  primary: "#6366f1",
  secondary: "#22c55e",
  accent: "#f59e0b",
  background: "#f3f4f6",
};

const LoadingChart: React.FC = () => (
  <div className="w-full h-[300px] flex items-center justify-center bg-gray-50 rounded-lg">
    <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
  </div>
);

const WeatherWidget: React.FC<WeatherWidgetProps> = ({ id, children }) => (
  <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-lg font-medium">{id}</CardTitle>
    </CardHeader>
    <CardContent className="pt-4">{children}</CardContent>
  </Card>
);

const processForecastData = (forecast: ForecastData) => {
  return forecast.list.map((item) => ({
    time: new Date(item.dt_txt).toLocaleDateString(),
    temp: item.main.temp,
    humidity: item.main.humidity,
    windSpeed: item.wind.speed,
  }));
};

// console.log(processForecastData)
const renderWidget = ({
  widgetId,
  weather,
  forecast,
  isLoading,
}: RenderWidgetProps) => {
  if (isLoading) return <LoadingChart />;
  if (!weather && !forecast) return null;

  switch (widgetId) {
    case "Current Temperature":
      return (
        <ResponsiveContainer width="100%" height={300}>
          <LineChart
            data={[{ time: "Now", value: weather?.main.temp }]}
            margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke={CHART_COLORS.background}
            />
            <XAxis dataKey="time" stroke="#6b7280" tick={{ fontSize: 12 }} />
            <YAxis
              stroke="#6b7280"
              tick={{ fontSize: 12 }}
              label={{
                value: "°C",
                angle: -90,
                position: "insideLeft",
                offset: 10,
              }}
            />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="value"
              name="Temperature"
              stroke={CHART_COLORS.primary}
              strokeWidth={3}
              dot={{ fill: CHART_COLORS.primary, strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      );

    case "Temperature Forecast":
      if (!forecast) return null;
      const forecastData = processForecastData(forecast);
      // console.log(forecast)
      return (
        <ResponsiveContainer width="100%" height={300}>
          <LineChart
            data={forecastData}
            margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke={CHART_COLORS.background}
            />
            <XAxis
              dataKey="time"
              stroke="#6b7280"
              tick={{ fontSize: 12 }}
              angle={-45}
              textAnchor="end"
              height={60}
            />
            <YAxis
              stroke="#6b7280"
              tick={{ fontSize: 12 }}
              label={{
                value: "°C",
                angle: -90,
                position: "insideLeft",
                offset: 10,
              }}
            />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="temp"
              name="Temperature"
              stroke={CHART_COLORS.primary}
              strokeWidth={2}
              dot={{ fill: CHART_COLORS.primary, strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      );

    case "Humidity":
      return (
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={[{ value: weather?.main.humidity }]}
            margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke={CHART_COLORS.background}
            />
            <XAxis stroke="#6b7280" tick={{ fontSize: 12 }} />
            <YAxis
              domain={[0, 100]}
              stroke="#6b7280"
              tick={{ fontSize: 12 }}
              label={{
                value: "Humidity %",
                angle: -90,
                position: "insideLeft",
                offset: 10,
              }}
            />
            <Tooltip />
            <Bar
              dataKey="value"
              name="Humidity"
              fill={CHART_COLORS.secondary}
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      );

    case "Wind Speed":
      const windSpeed = weather?.wind.speed || 0;
      const maxWindSpeed = 20;
      return (
        <ResponsiveContainer width="100%" height={300}>
          <PieChart margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
            <Pie
              data={[
                { name: "Wind Speed", value: windSpeed },
                { name: "Max Scale", value: maxWindSpeed - windSpeed },
              ]}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              startAngle={180}
              endAngle={0}
              paddingAngle={5}
            >
              <Cell fill={CHART_COLORS.accent} />
              <Cell fill={CHART_COLORS.background} />
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      );

    default:
      return null;
  }
};

const WeatherDashboard: React.FC = () => {
  
  const [city, setCity] = useState<string>("");
  const [searchedCity, setSearchedCity] = useState<string>("");
  const [userLocation, setUserLocation] = useState<{
    lat: number;
    lon: number;
  } | null>(null);
  const [locationError, setLocationError] = useState<string>("");

    useEffect(() => {
      if (!navigator.geolocation) {
        setLocationError("Geolocation is not supported by your browser.");
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          });
        },
        (error) => {
          setLocationError(error.message);
        }
      );
    }, []);

    const locationParams : any = searchedCity
      ? { city: searchedCity }
      : userLocation
      ? { lat: userLocation.lat, lon: userLocation.lon }
      : null;

    const {
      data: currentWeather,
      error: weatherError,
      isLoading: weatherLoading,
    } = useGetCurrentWeatherQuery(locationParams, {
      skip: !locationParams,
    });

    const {
      data: forecast,
      error: forecastError,
      isLoading: forecastLoading,
    } = useGetForecastQuery(locationParams, {
      skip: !locationParams,
    });

    const debouncedSearch = useCallback(
      debounce((searchTerm: string) => {
        setSearchedCity(searchTerm);
      }, 1000),
      []
    );

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setCity(value);
      debouncedSearch(value);
    };

    const isLoading = weatherLoading || forecastLoading;


  const currentWidgets = ["Current Temperature", "Humidity", "Wind Speed"];
  const forecastWidgets = ["Temperature Forecast"];

  return (
    <div className="bg-gray-50 p-8">
      <div className="min-w-[75vw] mx-auto">
        <Card className="mb-8">
          <CardContent>
            <div className="flex gap-4 pt-6">
              <Input
                type="text"
                value={city}
                onChange={handleInputChange}
                placeholder="Enter city name"
                className="flex-1 text-lg h-12"
                disabled={isLoading}
              />
              {isLoading && (
                <div className="flex items-center">
                  <Loader2 className="w-6 h-6 animate-spin text-gray-400" />
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {(weatherError || forecastError) && (
          <div className="bg-red-100 text-red-700 p-4 rounded-lg mb-4">
            Unable to fetch weather data. Please try again later.
          </div>
        )}

        {currentWeather && (
          <div className="mb-8">
            <div className="flex items-center gap-4">
              <CloudRain className="w-12 h-12 text-blue-500" />
              <div>
                {searchedCity ? (
                  <h1 className="text-4xl font-bold mb-2">Weather in {city}</h1>
                ) : (
                  <h1 className="text-4xl font-bold mb-2">Weather in your city</h1>
                )}
                <div className="flex gap-6 text-gray-600">
                  <p className="text-xl">
                    Temperature: {currentWeather.main.temp}°C
                  </p>
                  <p className="text-xl">
                    Feels like: {currentWeather.main.feels_like}°C
                  </p>
                  <p className="text-xl">
                    Humidity: {currentWeather.main.humidity}%
                  </p>
                  <p className="text-xl">
                    Wind: {currentWeather.wind.speed} m/s
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        <Tabs defaultValue="current" className="space-y-4">
          <TabsList>
            <TabsTrigger value="current" className="flex items-center gap-2">
              <CloudRain className="w-4 h-4" />
              Current Weather
            </TabsTrigger>
            <TabsTrigger value="forecast" className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              7-Day Forecast
            </TabsTrigger>
          </TabsList>

          <TabsContent value="current">
            <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-8">
              {currentWidgets.map((widgetId) => (
                <WeatherWidget key={widgetId} id={widgetId}>
                  {renderWidget({
                    widgetId,
                    weather: currentWeather || null,
                    forecast: null,
                    isLoading,
                  })}
                </WeatherWidget>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="forecast">
            <div className="grid grid-cols-1 gap-8">
              {forecastWidgets.map((widgetId) => (
                <WeatherWidget key={widgetId} id={widgetId}>
                  {renderWidget({
                    widgetId,
                    weather: null,
                    forecast: forecast || null,
                    isLoading,
                  })}
                </WeatherWidget>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default WeatherDashboard;
