"use client";
import {Droplets, SearchIcon, SunIcon, WindIcon, X} from "lucide-react";
import {useEffect, useState} from "react";
import {fetchData, searchLocations} from "@/requests";
import {CurrentWeatherType} from "@/types/CurrentWeatherType";
import {SearchLocationType} from "@/types/SearchLocationType";
import ForcastComponent from "@/components/ForcastComponent";
import Image from "next/image";
import {APIProvider, Map, MapCameraChangedEvent} from "@vis.gl/react-google-maps";

export default function Home() {
    const [searchKey, setSearchKey] = useState("Colombo, Sri Lanka")
    const [currentLocation, setCurrentLocation] = useState<SearchLocationType>({
        id: 2842281,
        name: "Colombo",
        region: "Western",
        country: "Sri Lanka",
        tz_id: "Asia/Colombo",
        lat: 6.9319,
        lon: 79.8478,
    });
    const [searchLocationResults, setSearchLocationResults] = useState<SearchLocationType[]>([]);
    const [weatherData, setWeatherData] = useState<CurrentWeatherType | null>(null);


    const fetchWeatherData = async () => {
        try {
            const location = `${currentLocation.lat},${currentLocation.lon}`
            const data = await fetchData(location);
            if (data) {
                setWeatherData(data);
            } else {
                console.error("Failed to fetch weather data");
            }
        } catch (error) {
            console.error(error);
            console.error("Error fetching weather data:", error);
        }
    }

    const handleSearch = async (query: string) => {
        setSearchKey(query);
        if (query.length > 2) {
            const locations = await searchLocations(query);
            setSearchLocationResults(locations);
        } else {
            setSearchLocationResults([]);
        }
    };

    useEffect(() => {
        fetchWeatherData();
    }, [currentLocation]);

    return (
        <div className="container mx-auto p-4">
            <div className="flex flex-wrap">
                <div className="h-16 w-full md:w-1/3 mb-4 md:mb-0">
                    <div className="flex gap-2 items-center bg-white/40 rounded-lg shadow-sm p-2 relative">
                        <SearchIcon size={20}/>
                        <input
                            className="outline-none border-none active:none focus-visible:outline-none focus-visible:ring-0 flex-1"
                            value={searchKey}
                            onChange={(e) => handleSearch(e.target.value)}
                        />
                        {searchKey && <X className="cursor-pointer" size={20} onClick={() => setSearchKey("")}/>}
                    </div>
                    <div className="relative bg-green w-full h-16">
                        {searchLocationResults.length > 0 && (
                            <div className="absolute bg-white shadow-lg rounded-lg mt-2 z-10 left-0 right-0">
                                <ul>
                                    {searchLocationResults.map((location) => (
                                        <li
                                            key={location.id}
                                            className="cursor-pointer hover:bg-gray-100 p-2"
                                            onClick={() => {
                                                setCurrentLocation(location);
                                                setSearchKey(`${location.name}, ${location.country}`);
                                                setSearchLocationResults([]);
                                            }}
                                        >
                                            <strong>{location.name}</strong>, {location.country}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-4 gap-4">
                <div
                    className="bg-sky-600/20 shadow-sm col-span-4 md:col-span-2 backdrop-blur-md border border-white/40 rounded-2xl p-8 text-white">
                    <div>
                        <div className="mb-4">
                            <span
                                className="text-4xl font-bold">{weatherData?.location.name}, </span>{weatherData?.location.country}
                        </div>
                        <div className="flex items-center justify-between">
                            <div>
                                {weatherData &&
                                    <Image width={192} height={192} src={"https:" + weatherData.current.condition.icon}
                                           alt="Weather Icon"/>}
                            </div>
                            <div className="text-center">
                                <div className="flex items-start text-2xl font-semibold">
                                    <div className="text-8xl font-bold pt-2">{weatherData?.current.temp_c}
                                    </div>
                                    <div>
                                        °&nbsp;C
                                    </div>
                                </div>
                                <div className="font-semibold">{weatherData?.current.condition.text}</div>
                            </div>
                        </div>
                        {/*{weatherData?.location.lat}° N, {weatherData?.location.lon}° E*/}
                        <div className="flex items-center justify-between">
                            <div>
                                <div className="flex items-start text-xl">
                                    <div className="flex gap-2">
                                        <Droplets/>
                                        <div>Humidity</div>
                                    </div>
                                </div>
                                <div className="text-2xl font-bold">{weatherData?.current.humidity}%</div>
                            </div>
                            <div>
                                <div className="flex items-start text-xl">
                                    <div className="flex gap-2">
                                        <SunIcon/>
                                        <div>UV Index</div>
                                    </div>
                                </div>
                                <div className="text-2xl font-bold">{weatherData?.current.uv}</div>
                            </div>
                            <div>
                                <div className="flex items-start text-xl">
                                    <div className="flex gap-2">
                                        <WindIcon/>
                                        <div>Wind Speed</div>
                                    </div>
                                </div>
                                <div className="text-2xl font-bold">{weatherData?.current.wind_kph} Km/h</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="md:col-span-2 rounded-2xl overflow-hidden shadow-sm col-span-4">
                    <APIProvider apiKey={process.env.NEXT_PUBLIC_MAPS_API_KEY || ''}>
                        <Map
                            defaultZoom={10}
                            center={{lat: currentLocation.lat, lng: currentLocation.lon}}
                            onCameraChanged={(ev: MapCameraChangedEvent) =>
                                console.log('camera changed:', ev.detail.center, 'zoom:', ev.detail.zoom)
                            }>
                        </Map>
                    </APIProvider>
                </div>
                {/*<div className="bg-white col-span-2 p-4 rounded-lg shadow-sm">*/}
                {/*    <div className="flex gap-2 text-zinc-500 mb-2 font-semibold">*/}
                {/*        <Droplets/>*/}
                {/*        <div>Humidity</div>*/}
                {/*    </div>*/}
                {/*    <div className="text-2xl font-bold">{weatherData?.current.humidity}%</div>*/}
                {/*</div>*/}
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
                <div className="col-span-5 md:col-span-2">
                    <ForcastComponent location={currentLocation.name} />
                </div>
                <div className="col-span-5 md:col-span-2">
                </div>
            </div>
        </div>
    );

}
