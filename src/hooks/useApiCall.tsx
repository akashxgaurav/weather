import axios, { AxiosRequestConfig } from "axios";
import { useEffect, useRef, useState } from "react";

interface StateType {
  isLoading: boolean;
  isError: string | null;
  data: null | any;
}

interface Props {
  expectedStatusCode?: number;
  params?: any;
  method?: string;
  baseURL?: string;
  endpoint?: string;
  body?: any;
  isDebounceEnabled?: boolean;
}

export default function useApiCall({
  expectedStatusCode = 200,
  params: parameters,
  method = "GET",
  baseURL = "https://www.meteosource.com",
  body,
  endpoint,
  isDebounceEnabled = false,
}: Props) {
  const debouceRef = useRef<any>(null);
  const [state, setState] = useState<StateType>({
    isLoading: true,
    isError: null,
    data: null,
  });

  const fetchData = async () => {
    try {
      setState((prev) => ({ ...prev, isLoading: true }));
      const axiosObject: AxiosRequestConfig = {
        baseURL,
        url: endpoint,
        method,
        data: body,
        params: { ...parameters, key: import.meta.env.VITE_WEATHER_API_KEY },
      };

      const response = await axios(axiosObject);
      if (response.status === expectedStatusCode) {
        setState((prev) => ({ ...prev, data: response.data }));
        return;
      }
      throw new Error("Internal Server Error");
    } catch (error) {
      if (error instanceof Error) {
        setState((prev) => ({ ...prev, isError: error.message }));
      } else {
        setState((prev) => ({
          ...prev,
          isError: "Unable to fetch data at this moment!",
        }));
      }
    } finally {
      setState((prev) => ({ ...prev, isLoading: false }));
    }
  };

  useEffect(() => {
    if (isDebounceEnabled) {
      clearTimeout(debouceRef.current);
      debouceRef.current = setTimeout(() => {
        fetchData();
      }, 1000);
    } else {
      fetchData();
    }
  }, [JSON.stringify(parameters)]);

  return state;
}
