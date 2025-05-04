import HomeProvider from "./Home.provider";
import WeatherInfoPage from "./WeatherInfo.page";

export default function HomePage() {
  return (
    <HomeProvider>
      <WeatherInfoPage />
    </HomeProvider>
  );
}
