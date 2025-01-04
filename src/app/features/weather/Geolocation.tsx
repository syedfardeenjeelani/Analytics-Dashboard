"use client";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setGeolocation } from "./weatherSlice";

export const useGeolocation = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        dispatch(
          setGeolocation({
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          })
        );
      });
    }
  }, [dispatch]);
};
