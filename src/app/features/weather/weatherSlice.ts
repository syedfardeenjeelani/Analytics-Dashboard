import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface WeatherState {
  city: string;
  geolocation: { lat: number; lon: number } | null;
}

const initialState: WeatherState = {
  city: "New York",
  geolocation: null,
};

const weatherSlice = createSlice({
  name: "weather",
  initialState,
  reducers: {
    setCity: (state, action: PayloadAction<string>) => {
      state.city = action.payload;
    },
    setGeolocation: (
      state,
      action: PayloadAction<{ lat: number; lon: number }>
    ) => {
      state.geolocation = action.payload;
    },
  },
});

export const { setCity, setGeolocation } = weatherSlice.actions;
export default weatherSlice.reducer;
