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

export default function Home() {

    const {currentLocation} = useCurrentWeather()


    return (
        <div className="container mx-auto p-4">
            <div className="flex flex-wrap">
                <div className="h-16 w-full md:w-1/3 mb-4 md:mb-0">
                    <LocationSearch/>
                </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[190px] m-auto">
                <div
                    className="bg-sky-600/20 shadow-sm col-span-2 row-span-2 backdrop-blur-md border border-white/40 rounded-2xl p-8 text-white">
                    <WeatherInfo/>
                </div>
                <div className="md:col-span-2 rounded-2xl overflow-hidden shadow-sm col-span-4 row-span-2">
                    <LocationMap/>
                </div>
                <div className="col-span-5 md:col-span-2 row-span-3">
                    <ForecastComponent location={currentLocation.name}/>
                </div>
                <div className="col-span-5 md:col-span-2 row-span-3">
                    <DayForecastComponent/>
                </div>
                <UVIndex/>
                <Wind/>
                <HumidityCard />
            </div>
        </div>
    );
}
