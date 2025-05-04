import { PlaceSuggestionType, WeatherInfoType } from "@/types";
import { getWeatherIcon } from "@/utils";
import dayjs from "dayjs";
import { ArrowUpToLine, Earth, GlassWaterIcon } from "lucide-react";
import { useContext, useEffect, useMemo, useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Search from "./Search";
import useApiCall from "@/hooks/useApiCall";
import { HomeContext } from "@/pages/Home/Home.provider";

interface SearchStateType {
  query: string;
  place_id: string;
  userLocation: PlaceSuggestionType | null;
}

export default function WeatherReport({ report }: { report: WeatherInfoType }) {
  const {
    handleSetSearchedWeatherInfo,
    handleSetUserLocation,
    userLocation,
    currentUserLocation,
  } = useContext(HomeContext);
  const currentDateTime = dayjs();
  const [isVisible, setIsVisible] = useState<boolean>(true);
  const [searchState, setSearchState] = useState<SearchStateType>({
    query: "",
    place_id: "",
    userLocation: null,
  });
  const location = useMemo(() => {
    if (userLocation) {
      return `${userLocation?.name || ""}, ${userLocation?.adm_area1 || ""}, ${
        userLocation?.country || ""
      }`;
    }
    return `${currentUserLocation?.name || ""}, ${
      currentUserLocation?.adm_area1 || ""
    }, ${currentUserLocation?.country || ""}`;
  }, [currentUserLocation, userLocation]);

  // Api Calls
  const { data: suggestions } = useApiCall({
    isDebounceEnabled: true,
    endpoint: "api/v1/free/find_places",
    params: {
      text: searchState.query,
    },
  });
  const { data: searchResult } = useApiCall({
    endpoint: "api/v1/free/point",
    params: {
      place_id: searchState.place_id,
      sections: "all",
    },
  });

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY < 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  useEffect(() => {
    handleSetSearchedWeatherInfo(searchResult);
  }, [searchResult]);
  useEffect(() => {
    if (searchState.query === "") {
      handleSetSearchedWeatherInfo(null);
    }
  }, [searchState.query]);
  useEffect(() => {
    if (searchState.query === "") {
      setSearchState((prev) => ({ ...prev, userLocation: null }));
      handleSetUserLocation(null);
      return;
    }
    handleSetUserLocation(searchState.userLocation);
  }, [searchState.userLocation, searchState.query]);

  return (
    <>
      {" "}
      <section className="relative flex-1 flex items-center justify-center min-w-full lg:min-w-1/4 min-h-[100dvh]">
        <div className="absolute top-10">
          <Search
            value={searchState.query}
            onChange={(query: string) =>
              setSearchState((prev) => ({ ...prev, query }))
            }
            onSuggestionClick={(
              place_id: string,
              userLocation: PlaceSuggestionType
            ) =>
              setSearchState((prev) => ({ ...prev, place_id, userLocation }))
            }
            suggestions={suggestions}
          />
        </div>
        {/* Current weather info */}
        <div className="flex flex-col items-center gap-12 lg:gap-24">
          <img
            src={getWeatherIcon(report.current.icon_num)}
            alt="weather-icon"
            className="w-[170px] h-[170px]"
          />
          {/* Temp, Date & Time */}
          <div className="flex flex-col items-center gap-4">
            <h2 className="text-6xl font-semibold">
              {report.current.temperature}
              <sup className="-z-10">&#176;C</sup>
            </h2>
            <span className="text-md">
              <span className="font-semibold">
                {currentDateTime.format("dddd")}
              </span>
              , {currentDateTime.format("hh:ss")}
            </span>
          </div>
          {/* Extra info */}
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5">
              <GlassWaterIcon className="w-4 h-4" />
              <span>
                {report.elevation}ft <span>from Sea level</span>
              </span>
            </span>
            <span className="flex items-center gap-1.5">
              <Earth className="w-4 h-4" />
              <span className="capitalize">{report.current.summary}</span>
            </span>
          </div>
          {/* Place image */}
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <div className="mt-3 bg-[url('https://plus.unsplash.com/premium_photo-1663956111757-534bcb550932?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fG5ldyUyMHlvcmslMjBjaXR5fGVufDB8fDB8fHww')] w-[200px] h-[75px] bg-cover rounded-xl text-white font-bold flex justify-center items-center">
                  <span className="truncate text-sm px-4">{location}</span>
                </div>
              </TooltipTrigger>
              <TooltipContent>{location}</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        {isVisible && (
          <ArrowUpToLine
            className="lg:hidden absolute bottom-0 transform -translate-y-1/2 text-gray-400"
            onClick={() =>
              window.scrollBy({ top: window.innerHeight, behavior: "smooth" })
            }
          />
        )}
      </section>
    </>
  );
}
