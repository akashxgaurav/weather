import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { WeatherInfoType } from "@/types";
import { getWeatherIcon } from "@/utils";
import dayjs from "dayjs";
import {
  Compass,
  Droplet,
  Flower,
  Leaf,
  Sunrise,
  Sunset,
  Waypoints,
} from "lucide-react";

interface Props {
  currentReport: WeatherInfoType["current"];
  hourlyReport: WeatherInfoType["hourly"];
  dailyReport: WeatherInfoType["daily"];
}

export default function WeatherCards({
  currentReport,
  hourlyReport,
  dailyReport,
}: Props) {
  return (
    <section className="w-full overflow-auto bg-gray-100 min-h-screen block p-4">
      <Tabs defaultValue="daily">
        <TabsList className="mb-2">
          <TabsTrigger value="daily">Daily</TabsTrigger>
          <TabsTrigger value="hourly">Hourly</TabsTrigger>
        </TabsList>
        <TabsContent
          value="daily"
          className="flex justify-between overflow-auto gap-4"
        >
          {dailyReport.data.map((item, index) => (
            <MetricsCard
              date={dayjs(item.day).format("ddd")}
              maxTemp={item.all_day.temperature_max}
              minTemp={item.all_day.temperature_min}
              icon={item.icon}
              key={index}
            />
          ))}
        </TabsContent>
        <TabsContent
          value="hourly"
          className="flex justify-between overflow-auto gap-4"
        >
          {hourlyReport.data.map((item, index) => (
            <MetricsCard
              date={dayjs(item.date).format("HH:MM")}
              maxTemp={item.temperature}
              minTemp={item.temperature}
              icon={item.icon}
              key={index}
            />
          ))}
        </TabsContent>
      </Tabs>

      {/* Highlights */}
      <h3 className="font-semibold text-lg mb-4 mt-10">Today's Highlights</h3>
      <div className="grid grid-rows-2 lg:grid-cols-3 gap-6">
        <SunTimeCard />
        <WindStatusCard
          speed={currentReport.wind?.speed}
          dir={currentReport.wind?.dir}
        />
        <HumidityCard />
        <VisibilityCard visibility={currentReport.cloud_cover} />
        <AirQualityCard />
        <PM2Card />
      </div>
    </section>
  );
}

function MetricsCard({
  date,
  icon,
  maxTemp,
  minTemp,
}: {
  date: any;
  icon: number;
  maxTemp: number;
  minTemp: number;
}) {
  return (
    <div className="bg-white  flex flex-col justify-center items-center rounded-lg shadow-md gap-2 min-w-[140px] min-h-[140px]">
      <span className="font-semibold">{date}</span>
      <img src={getWeatherIcon(icon)} alt="weather-icon" />
      <section className="flex items-center gap-4">
        <span className="text-sm font-semibold">
          {maxTemp}
          <sup>&#176;</sup>C
        </span>
        <span className="text-sm font-semibold text-gray-500">
          {minTemp}
          <sup>&#176;</sup>C
        </span>
      </section>
    </div>
  );
}

function SunTimeCard() {
  return (
    <div className="bg-white flex flex-col justify-center items-center gap-10 rounded-lg shadow-md p-4">
      <span className="text-gray-400 font-semibold">Sunrise & Sunset</span>
      <div className="flex flex-col justify-center gap-5">
        {" "}
        <section className="flex items-center gap-3">
          <Sunrise color="#FC9601" className="w-12 h-12" />
          <span className="font-semibold text-lg">6:35 AM</span>
        </section>
        <section className="flex items-center gap-3">
          <Sunset color="#FC9601" className="w-12 h-12" />
          <span className="font-semibold text-lg">6:35 AM</span>
        </section>
      </div>
    </div>
  );
}

function WindStatusCard({ speed, dir }: { speed: number; dir: string }) {
  return (
    <div className="bg-white h-[300px] flex flex-col gap-4 rounded-lg shadow-md p-4">
      <span className="text-gray-400 font-semibold">Wind Status</span>
      <section className="flex-1 flex flex-col justify-center items-center gap-10">
        {" "}
        <h2 className="font-semibold text-6xl mx-auto">
          {speed} <span className="text-3xl">km/h</span>
        </h2>
        <span className="flex items-center gap-1">
          {" "}
          <Compass color="blue" />
          {dir}
        </span>
      </section>
    </div>
  );
}

function AirQualityCard() {
  return (
    <div className="bg-white h-[300px] flex flex-col gap-4 rounded-lg shadow-md p-4">
      <span className="text-gray-400 font-semibold">Air Quality</span>
      <section className="flex-1 flex flex-col justify-center items-center gap-10">
        {" "}
        <h2 className="font-semibold text-6xl mx-auto">108</h2>
        <span className="flex items-center gap-1">
          <Leaf color="lime" />
          Good
        </span>
      </section>
    </div>
  );
}

function VisibilityCard({ visibility }: { visibility: number }) {
  return (
    <div className="bg-white h-[300px] flex flex-col gap-4 rounded-lg shadow-md p-4">
      <span className="text-gray-400 font-semibold">Visibility</span>
      <section className="flex-1 flex flex-col justify-center items-center gap-10">
        {" "}
        <h2 className="font-semibold text-6xl mx-auto">{visibility}%</h2>
        <span className="flex items-center gap-1">
          <Waypoints color="orange" />
          Foggy
        </span>
      </section>
    </div>
  );
}

function HumidityCard() {
  return (
    <div className="bg-white h-[300px] flex flex-col gap-4 rounded-lg shadow-md p-4">
      <span className="text-gray-400 font-semibold">Humidity</span>
      <section className="flex-1 flex flex-col justify-center items-center gap-10">
        {" "}
        <h2 className="font-semibold text-6xl mx-auto">10%</h2>
        <span className="flex items-center gap-1">
          <Droplet color="#AEF9FC" fill="#AEF9FC" />
          Average
        </span>
      </section>
    </div>
  );
}

function PM2Card() {
  return (
    <div className="bg-white h-[300px] flex flex-col gap-4 rounded-lg shadow-md p-4">
      <span className="text-gray-400 font-semibold">PM2</span>
      <section className="flex-1 flex flex-col justify-center items-center gap-10">
        {" "}
        <h2 className="font-semibold text-6xl mx-auto">2.5</h2>
        <span className="flex items-center gap-1">
          <Flower color="teal" fill="teal" />
          Good
        </span>
      </section>
    </div>
  );
}
