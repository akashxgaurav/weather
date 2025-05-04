export interface WeatherInfoType {
  lat: string;
  lon: string;
  elevation: number;
  timezone: string;
  units: string;
  current: {
    icon: string;
    icon_num: number;
    summary: string;
    temperature: number;
    wind: {
      speed: number;
      angle: number;
      dir: string;
    };
    precipitation: {
      total: number;
      type: string;
    };
    cloud_cover: number;
  };
  hourly: {
    data: Array<{
      date: string;
      weather: string;
      icon: number;
      summary: string;
      temperature: number;
      wind: {
        speed: number;
        dir: string;
        angle: number;
      };
      cloud_cover: {
        total: number;
      };
      precipitation: {
        total: number;
        type: string;
      };
    }>;
  };
  daily: {
    data: Array<{
      day: string;
      weather: string;
      icon: number;
      summary: string;
      all_day: {
        weather: string;
        icon: number;
        temperature: number;
        temperature_min: number;
        temperature_max: number;
        wind: {
          speed: number;
          dir: string;
          angle: number;
        };
        cloud_cover: {
          total: number;
        };
        precipitation: {
          total: number;
          type: string;
        };
      };
      morning: any;
      afternoon: any;
      evening: any;
    }>;
  };
}

export interface CoordinatesType {
  lon: number;
  lat: number;
}

export interface PlaceSuggestionType {
  name: string;
  place_id: string;
  adm_area1: string;
  country: string;
}
