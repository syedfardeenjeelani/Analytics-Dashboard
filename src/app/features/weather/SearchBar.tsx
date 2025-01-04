"use client";
import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setCity } from "./weatherSlice";

const GEO_API_KEY = "your_geodb_api_key";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const dispatch = useDispatch();

  const fetchSuggestions = async (input: string) => {
    const response = await axios.get(
      `https://wft-geo-db.p.rapidapi.com/v1/geo/cities?namePrefix=${input}`,
      {
        headers: {
          "X-RapidAPI-Key": GEO_API_KEY,
        },
      }
    );
    setSuggestions(response.data.data);
  };

  const handleSelect = (city: string) => {
    dispatch(setCity(city));
    setQuery("");
    setSuggestions([]);
  };

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          fetchSuggestions(e.target.value);
        }}
        placeholder="Search for a city..."
      />
      {suggestions.length > 0 && (
        <ul>
          {suggestions.map((city: any) => (
            <li key={city.id} onClick={() => handleSelect(city.name)}>
              {city.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
