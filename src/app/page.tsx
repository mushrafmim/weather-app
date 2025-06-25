"use client";
import ForecastComponent from "@/components/ForecastComponent";
import {useCurrentWeather} from "@/context/CurrentWeatherContext";
import LocationSearch from "@/components/LocationSearch";
import LocationMap from "@/components/LocationMap";
import WeatherInfo from "@/components/WeatherInfo";
import UVIndex from "@/components/UVIndex";
import Wind from "@/components/Wind";
import DayForecastComponent from "@/components/DayForecastComponent";
import HumidityCard from "@/components/HumidityCard";
import SettingsComponent from "@/components/SettingsComponent";

export default function Home() {

    const {currentLocation, weatherData} = useCurrentWeather()

    const backgroundClass = weatherData?.current.is_day
        ? "bg-gradient-to-b from-sky-400 via-blue-300 to-blue-400"
        : "bg-gradient-to-b from-gray-800 via-gray-700 to-gray-600";

    return (
        <div className={`w-full min-h-dvh ${backgroundClass}`}>
            <div className="container mx-auto p-4">
                <div className="flex flex-wrap items-center justify-between h-16 gap-4">
                    <div className="flex-1 md:max-w-1/3 md:mb-0 items-center">
                        <LocationSearch/>
                    </div>
                    <SettingsComponent />
                </div>
                <div className="grid grid-cols-2 auto-cols-fr md:grid-cols-4 gap-4 auto-rows-[190px] m-auto">
                    <div
                        className="bg-sky-600/20 shadow-sm col-span-2 row-span-2 backdrop-blur-md border border-white/40 rounded-2xl p-4 text-white">
                        <WeatherInfo/>
                    </div>
                    <div className="md:col-span-2 rounded-2xl overflow-hidden shadow-sm col-span-2 row-span-2">
                        <LocationMap/>
                    </div>
                    <div className="col-span-2 md:col-span-2 row-span-3">
                        <ForecastComponent location={currentLocation.name}/>
                    </div>
                    <div className="col-span-2 md:col-span-2 md:col-start-3 md:row-start-3">
                        <DayForecastComponent/>
                    </div>
                    <div className="md:col-start-3 md:row-start-4">
                        <UVIndex/>
                    </div>
                    <div className="md:col-start-4 md:row-start-4">
                        <Wind/>
                    </div>
                    <div className="md:col-start-3 md:row-start-5">
                        <HumidityCard/>
                    </div>
                </div>
            </div>
        </div>
    );
}
