"use client";
import {Droplets, RefreshCcwIcon, SearchIcon, SunIcon, WindIcon, X} from "lucide-react";
import {useEffect, useState} from "react";
import {fetchData, searchLocations} from "@/requests";
import {CurrentWeatherType} from "@/types/CurrentWeatherType";
import {SearchLocationType} from "@/types/SearchLocationType";
import ForcastComponent from "@/components/ForcastComponent";
import Image from "next/image";
import {APIProvider, Map, MapCameraChangedEvent} from "@vis.gl/react-google-maps";
import {Skeleton} from "@/components/ui/skeleton";
import {useCurrentWeather} from "@/context/CurrentWeatherContext";
import LocationSearch from "@/components/LocationSearch";
import LocationMap from "@/components/LocationMap";
import WeatherInfo from "@/components/WeatherInfo";

export default function Home() {
    const [searchKey, setSearchKey] = useState("Colombo, Sri Lanka")
    const [searchLocationResults, setSearchLocationResults] = useState<SearchLocationType[]>([]);
    // const [weatherData, setWeatherData] = useState<CurrentWeatherType | null>(null);

    const {status, currentLocation, setCurrentLocation, weatherData, fetchWeatherData} = useCurrentWeather()

    const handleSearch = async (query: string) => {
        setSearchKey(query);
        if (query.length > 2) {
            const locations = await searchLocations(query);
            setSearchLocationResults(locations);
        } else {
            setSearchLocationResults([]);
        }
    };

    return (
        <div className="container mx-auto p-4">
            <div className="flex flex-wrap">
                <div className="h-16 w-full md:w-1/3 mb-4 md:mb-0">
                    <LocationSearch />
                </div>
            </div>
            <div className="grid grid-cols-4 gap-4">
                <div
                    className="bg-sky-600/20 shadow-sm col-span-4 md:col-span-2 backdrop-blur-md border border-white/40 rounded-2xl p-8 text-white">
                    <WeatherInfo />
                </div>
                <div className="md:col-span-2 rounded-2xl overflow-hidden shadow-sm col-span-4">
                    <LocationMap />
                </div>
                {/*<div className="bg-white col-span-2 p-4 rounded-lg shadow-sm">*/}
                {/*    <div className="flex gap-2 text-zinc-500 mb-2 font-semibold">*/}
                {/*        <Droplets/>*/}
                {/*        <div>Humidity</div>*/}
                {/*    </div>*/}
                {/*    <div className="text-2xl font-bold">{weatherData?.current.humidity}%</div>*/}
                {/*</div>*/}
                <div className="col-span-5 md:col-span-2">
                    <ForcastComponent location={currentLocation.name}/>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm">
                    <div className="flex gap-2 text-zinc-500 mb-2 font-semibold">
                        <SunIcon/>
                        <div>UV Index</div>
                    </div>
                    <div className="text-3xl">{weatherData?.current.uv}</div>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm">
                    <div className="flex gap-2 text-zinc-500 mb-2 font-semibold">
                        <WindIcon/>
                        <div>
                            Wind Speed
                        </div>
                    </div>
                    <div className="text-3xl font-bold">{weatherData?.current.wind_kph} Km/h</div>
                </div>
            </div>
        </div>
    );
}
