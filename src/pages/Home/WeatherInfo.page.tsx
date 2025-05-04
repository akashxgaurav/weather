import useApiCall from "@/hooks/useApiCall";
import { useContext, useEffect } from "react";
import { HomeContext } from "./Home.provider";
import { WeatherInfoType } from "@/types";
import PageLoader from "@/components/PageLoader";
import ErrorPage from "@/components/ErrorPage";
import WeatherReport from "@/components/WeatherReport";
import WeatherCards from "@/components/WeatherCards";

interface APIResponseType {
  data: WeatherInfoType;
  isError: null | string;
  isLoading: boolean;
}

export default function WeatherInfoPage() {
  const {
    currentCoordinate,
    handleSetCurrentCoordinateWeatherInfo,
    handleSetCurrentUserLocation,
    searchedWeatherInfo,
  } = useContext(HomeContext);

  const { data, isError, isLoading }: APIResponseType = useApiCall({
    endpoint: "api/v1/free/point",
    params: {
      lon: currentCoordinate?.lon || 0,
      lat: currentCoordinate?.lat || 0,
      sections: "all",
    },
  });
  const { data: userLocation } = useApiCall({
    isDebounceEnabled: true,
    endpoint: "api/v1/free/nearest_place",
    params: {
      lon: currentCoordinate?.lon || 0,
      lat: currentCoordinate?.lat || 0,
    },
  });

  //   Setting current weather info to global context for future use
  useEffect(() => {
    handleSetCurrentCoordinateWeatherInfo(data);
  }, [data]);
  useEffect(() => {
    handleSetCurrentUserLocation(userLocation);
  }, [userLocation]);

  if (isLoading) return <PageLoader />;

  if (isError) return <ErrorPage message={isError} />;

  return (
    <div className="min-h-[100dvh] flex flex-col lg:flex-row items-center lg:items-start">
      <WeatherReport report={searchedWeatherInfo ?? data} />
      <WeatherCards
        currentReport={searchedWeatherInfo?.current ?? data.current}
        dailyReport={searchedWeatherInfo?.daily ?? data.daily}
        hourlyReport={searchedWeatherInfo?.hourly ?? data.hourly}
      />
    </div>
  );
}
