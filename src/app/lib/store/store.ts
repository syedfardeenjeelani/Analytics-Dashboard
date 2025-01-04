import { configureStore, createSlice } from "@reduxjs/toolkit";
import weatherSlice from '../../features/weather/weatherSlice'
 
const dummySlice = createSlice({
  name: "dummy",
  initialState: {
    message: "Hello, Redux!",
    count: 0,
  },
  reducers: {
    increment: (state) => {
      state.count += 1;
    },
    decrement: (state) => {
      state.count -= 1;
    },
    setMessage: (state, action) => {
      state.message = action.payload;
    },
  },
});
 
export const { increment, decrement, setMessage } = dummySlice.actions;
 
export const makeStore = () => {
  return configureStore({
    reducer: {
      dummy: dummySlice.reducer,
      weather: weatherSlice,
    },
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
