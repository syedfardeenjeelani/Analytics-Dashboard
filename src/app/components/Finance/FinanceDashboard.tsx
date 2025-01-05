import React, { useState, useMemo } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Search, Calendar, TrendingUp, BarChart2, Volume2 } from "lucide-react";
import {
  useGetStockQuoteQuery,
  useSearchStocksQuery,
  useGetTimeSeriesDataQuery,
  useGetIntradayDataQuery,
} from "../../services/finance/financeApi";

const FinanceDashboard = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSymbol, setSelectedSymbol] = useState("AAPL");
  const [timeRange, setTimeRange] = useState("1D");

  const { data: searchResults } = useSearchStocksQuery(searchTerm, {
    skip: searchTerm.length < 2,
  });

  const { data: quote, isLoading: isQuoteLoading } : any =
    useGetStockQuoteQuery(selectedSymbol);

  const { data: timeSeriesData } = useGetTimeSeriesDataQuery({
    symbol: selectedSymbol,
    interval: "daily",
    outputsize: timeRange === "1Y" ? "full" : "compact",
  });

  const { data: intradayData } = useGetIntradayDataQuery(
    {
      symbol: selectedSymbol,
      interval: "5min",
    },
    {
      skip: timeRange !== "1D",
    }
  );

  const chartData = useMemo(() => {
    if (timeRange === "1D" && intradayData) {
      return intradayData.slice(-78); 
    }
    if (timeSeriesData) {
      const data = [...timeSeriesData].reverse();
      switch (timeRange) {
        case "1W":
          return data.slice(0, 5);
        case "1M":
          return data.slice(0, 21);
        case "1Y":
          return data;
        default:
          return data;
      }
    }
    return [];
  }, [timeRange, intradayData, timeSeriesData]);

  const timeRangeButtons = ["1D", "1W", "1M", "1Y"];

  console.log(quote);

  return (
    <div className="p-6 max-w-6xl mx-auto">
     
      <div className="relative mb-6">
        <div className="flex items-center border rounded-lg p-2 bg-white shadow-sm">
          <Search className="w-5 h-5 text-gray-400 mr-2" />
          <input
            type="text"
            className="w-full outline-none"
            placeholder="Search stocks..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {searchResults &&
          searchResults.length > 0 &&
          searchTerm.length >= 2 && (
            <div className="absolute w-full mt-1 bg-white border rounded-lg shadow-lg z-10">
              {searchResults.map((result: any, i) => (
                <div
                  key={i}
                  className="p-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => {
                    setSelectedSymbol(result["1. symbol"]);
                    setSearchTerm("");
                  }}
                >
                  <div className="font-medium">{result["1. symbol"]}</div>
                  <div className="text-sm text-gray-600">
                    {result["2. name"]}
                  </div>
                </div>
              ))}
            </div>
          )}
      </div> 
      {quote && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="flex items-center text-gray-600 mb-2">
              <TrendingUp className="w-4 h-4 mr-2" />
              Current Price
            </div>
            <div className="text-2xl font-bold">
              ${parseFloat(quote["05. price"]).toFixed(2)}
            </div>
            <div
              className={`text-sm ${
                parseFloat(quote["09. change"]) >= 0
                  ? "text-green-600"
                  : "text-red-600"
              }`}
            >
              {quote["10. change percent"]}
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="flex items-center text-gray-600 mb-2">
              <BarChart2 className="w-4 h-4 mr-2" />
              High/Low
            </div>
            <div className="text-lg">
              <span className="text-green-600">
                ${parseFloat(quote["03. high"]).toFixed(2)}
              </span>
              {" / "}
              <span className="text-red-600">
                ${parseFloat(quote["04. low"]).toFixed(2)}
              </span>
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="flex items-center text-gray-600 mb-2">
              <Volume2 className="w-4 h-4 mr-2" />
              Volume
            </div>
            <div className="text-lg">
              {parseInt(quote["06. volume"]).toLocaleString()}
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="flex items-center text-gray-600 mb-2">
              <Calendar className="w-4 h-4 mr-2" />
              Trading Day
            </div>
            <div className="text-lg">
              {new Date(quote["07. latest trading day"]).toLocaleDateString()}
            </div>
          </div>
        </div>
      )}

      <div className="flex space-x-2 mb-4">
        {timeRangeButtons.map((range) => (
          <button
            key={range}
            className={`px-4 py-2 rounded ${
              timeRange === range
                ? "bg-blue-600 text-white"
                : "bg-gray-100 hover:bg-gray-200"
            }`}
            onClick={() => setTimeRange(range)}
          >
            {range}
          </button>
        ))}
      </div>

      {/* Chart */}
      {/* <div className="bg-white p-4 rounded-lg shadow-sm h-96">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="date"
              tickFormatter={(date) => {
                if (timeRange === "1D") {
                  return new Date(date).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  });
                }
                return new Date(date).toLocaleDateString();
              }}
            />
            <YAxis domain={["auto", "auto"]} />
            <Tooltip
              formatter={(value: any) => [
                `$${parseFloat(value).toFixed(2)}`,
                "Price",
              ]}
              labelFormatter={(label) => {
                if (timeRange === "1D") {
                  return new Date(label).toLocaleTimeString();
                }
                return new Date(label).toLocaleDateString();
              }}
            />
            <Line
              type="monotone"
              dataKey="close"
              stroke="#2563eb"
              dot={false}
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </div> */}
      <div className="bg-white p-4 rounded-lg shadow-sm h-96">
        {chartData && chartData.length > 0 ? (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="date"
                tickFormatter={(date) => {
                  if (timeRange === "1D") {
                    return new Date(date).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    });
                  }
                  return new Date(date).toLocaleDateString();
                }}
              />
              <YAxis domain={["auto", "auto"]} />
              <Tooltip
                formatter={(value: any) => [
                  `$${parseFloat(value).toFixed(2)}`,
                  "Price",
                ]}
                labelFormatter={(label) => {
                  if (timeRange === "1D") {
                    return new Date(label).toLocaleTimeString();
                  }
                  return new Date(label).toLocaleDateString();
                }}
              />
              <Line
                type="monotone"
                dataKey="close"
                stroke="#2563eb"
                dot={false}
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <div className="flex items-center justify-center h-full text-gray-500">
            No data available for the selected time range
          </div>
        )}
      </div>
    </div>
  );
};

export default FinanceDashboard;
