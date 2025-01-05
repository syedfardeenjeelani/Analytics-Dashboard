import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
 
const API_KEY = process.env.NEXT_PUBLIC_FINANCE_API_KEY; // use your own api key also if the api says limit exceeded then use a vpn 
const BASE_URL = "https://www.alphavantage.co";
 
interface StockQuote {
  symbol: string;
  open: string;
  high: string;
  low: string;
  price: string;
  volume: string;
  latest_trading_day: string;
  previous_close: string;
  change: string;
  change_percent: string;
}

interface TimeSeriesData {
  date: string;
  open: string;
  high: string;
  low: string;
  close: string;
  volume: string;
}

interface SearchResult {
  symbol: string;
  name: string;
  type: string;
  region: string;
  marketOpen: string;
  marketClose: string;
  timezone: string;
  currency: string;
  matchScore: string;
}

interface TimeSeriesParams {
  symbol: string;
  interval: "daily" | "weekly" | "monthly";
  outputsize?: "compact" | "full";
}

interface IntradayParams {
  symbol: string;
  interval: "1min" | "5min" | "15min" | "30min" | "60min";
  adjusted?: boolean;
}
 
export const stockApi = createApi({
  reducerPath: "stockApi",
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({ 
    getStockQuote: builder.query<StockQuote, string>({
      query: (symbol) => ({
        url: "/query",
        params: {
          function: "GLOBAL_QUOTE",
          symbol,
          apikey: API_KEY,
        },
      }),
      transformResponse: (response: any) => {
        if (!response["Global Quote"]) {
        //   throw new Error("Invalid response format");
        console.log(response["Global Quote"]);
        }
        return response["Global Quote"];
      },
    }),
 
    searchStocks: builder.query<SearchResult[], string>({
      query: (keywords) => ({
        url: "/query",
        params: {
          function: "SYMBOL_SEARCH",
          keywords,
          apikey: API_KEY,
        },
      }),
      transformResponse: (response: any) => {
        if (!response.bestMatches) {
          return [];
        }
        return response.bestMatches;
      },
    }),
 
    getTimeSeriesData: builder.query<TimeSeriesData[], TimeSeriesParams>({
      query: ({ symbol, interval, outputsize = "compact" }) => ({
        url: "/query",
        params: {
          function: `TIME_SERIES_${interval.toUpperCase()}`,
          symbol,
          outputsize,
          apikey: API_KEY,
        },
      }),
      transformResponse: (response: any, meta, arg) => {
        const intervalStr = arg.interval;
        const timeSeriesKey = `Time Series (${
          intervalStr.charAt(0).toUpperCase() + intervalStr.slice(1)
        })`;

        const timeSeries = response[timeSeriesKey];
        if (!timeSeries) {
console.warn(
    `No intraday data available for symbol: ${arg.symbol}, interval: ${arg.interval}`
  ); 
          return [];
        }

        try {
          return Object.entries(timeSeries).map(
            ([date, data]: [string, any]) => ({
              date,
              open: data["1. open"],
              high: data["2. high"],
              low: data["3. low"],
              close: data["4. close"],
              volume: data["5. volume"],
            })
          );
        } catch (error) {
          console.log("Error transforming time series data:", error);
          return [];
        }
      },
    }),


    getIntradayData: builder.query<TimeSeriesData[], IntradayParams>({
      query: ({ symbol, interval, adjusted = true }) => ({
        url: "/query",
        params: {
          function: "TIME_SERIES_INTRADAY",
          symbol,
          interval,
          adjusted: adjusted.toString(),
          apikey: API_KEY,
        },
      }),
      transformResponse: (response: any, meta, arg) => {
        const timeSeriesKey = `Time Series (${arg.interval})`;
        const timeSeries = response[timeSeriesKey];

        if (!timeSeries) {
        //   console.log("Invalid intraday response format:", response);
          return [];
        }

        try {
          return Object.entries(timeSeries).map(
            ([date, data]: [string, any]) => ({
              date,
              open: data["1. open"],
              high: data["2. high"],
              low: data["3. low"],
              close: data["4. close"],
              volume: data["5. volume"],
            })
          );
        } catch (error) {
        //   console.log("Error transforming intraday data:", error);
          return [];
        }
      },
    }),
  }),
}); 
export const {
  useGetStockQuoteQuery,
  useSearchStocksQuery,
  useGetTimeSeriesDataQuery,
  useGetIntradayDataQuery,
} = stockApi;
