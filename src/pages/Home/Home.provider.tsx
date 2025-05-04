import ErrorPage from "@/components/ErrorPage";
import PageLoader from "@/components/PageLoader";
import { CoordinatesType, PlaceSuggestionType, WeatherInfoType } from "@/types";
import React, { createContext, useEffect, useState } from "react";

interface StateTypes {
  userLocation: PlaceSuggestionType | null;
  currentUserLocation: PlaceSuggestionType | null;
  currentCoordinateWeatherInfo: WeatherInfoType | null;
  searchedWeatherInfo: WeatherInfoType | null;
  currentCoordinate: CoordinatesType | null;
  isLoading: boolean;
  isError: string | null;
  handleSetCurrentCoordinateWeatherInfo: (
    currentCoordinateWeatherInfo: WeatherInfoType
  ) => void;
  handleSetSearchedWeatherInfo: (
    searchedWeatherInfo: WeatherInfoType | null
  ) => void;
  handleSetUserLocation: (userLocation: PlaceSuggestionType | null) => void;
  handleSetCurrentUserLocation: (
    userLocation: PlaceSuggestionType | null
  ) => void;
}

export const HomeContext = createContext<StateTypes>({
  userLocation: null,
  currentUserLocation: null,
  currentCoordinate: null,
  searchedWeatherInfo: null,
  currentCoordinateWeatherInfo: null,
  isError: null,
  isLoading: true,
  handleSetCurrentCoordinateWeatherInfo: () => {},
  handleSetSearchedWeatherInfo: () => {},
  handleSetUserLocation: () => {},
  handleSetCurrentUserLocation: () => {},
});

export default function HomeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [state, setState] = useState<StateTypes>({
    userLocation: null,
    currentUserLocation: null,
    currentCoordinate: null,
    searchedWeatherInfo: null,
    currentCoordinateWeatherInfo: null,
    isError: null,
    isLoading: true,
    handleSetCurrentCoordinateWeatherInfo: () => {},
    handleSetSearchedWeatherInfo: () => {},
    handleSetUserLocation: () => {},
    handleSetCurrentUserLocation: () => {},
  });

  //   Handlers
  const handleGetUserCoordinates = async () => {
    navigator.geolocation.getCurrentPosition(
      (success) => {
        const { latitude, longitude } = success.coords;
        setState((prev) => ({
          ...prev,
          currentCoordinate: { lat: latitude, lon: longitude },
          isLoading: false,
        }));
      },
      (error) => {
        switch (error.code) {
          case error.PERMISSION_DENIED:
            setState((prev) => ({
              ...prev,
              isError: "Please allow location to get exact weather info",
            }));
            return;
          case error.POSITION_UNAVAILABLE:
            setState((prev) => ({
              ...prev,
              isError: "Unable to locate your position",
            }));
            return;
          case error.TIMEOUT:
            setState((prev) => ({
              ...prev,
              isError: "Allow location timeout",
            }));
            return;
          default:
            setState((prev) => ({
              ...prev,
              isError: "Unable to process location at this moment",
            }));
        }
        setState((prev) => ({ ...prev, isLoading: false }));
      }
    );
  };
  const handleSetCurrentCoordinateWeatherInfo = (
    currentCoordinateWeatherInfo: WeatherInfoType
  ) => {
    setState((prev) => ({ ...prev, currentCoordinateWeatherInfo }));
  };
  const handleSetSearchedWeatherInfo = (
    searchedWeatherInfo: WeatherInfoType | null
  ) => {
    setState((prev) => ({ ...prev, searchedWeatherInfo }));
  };
  const handleSetUserLocation = (userLocation: PlaceSuggestionType | null) => {
    setState((prev) => ({ ...prev, userLocation }));
  };
  const handleSetCurrentUserLocation = (
    userLocation: PlaceSuggestionType | null
  ) => {
    setState((prev) => ({ ...prev, currentUserLocation: userLocation }));
  };

  useEffect(() => {
    handleGetUserCoordinates();
  }, []);

  if (state.isLoading) return <PageLoader />;

  if (state.isError) return <ErrorPage message={state.isError} />;

  return (
    <HomeContext.Provider
      value={{
        ...state,
        handleSetCurrentCoordinateWeatherInfo,
        handleSetSearchedWeatherInfo,
        handleSetUserLocation,
        handleSetCurrentUserLocation,
      }}
    >
      {children}
    </HomeContext.Provider>
  );
}
