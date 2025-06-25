import {Skeleton} from "@/components/ui/skeleton";
import {Droplets, RefreshCcwIcon, SunIcon, WindIcon} from "lucide-react";
import Image from "next/image";
import {useCurrentWeather} from "@/context/CurrentWeatherContext";
import {useEffect, useState} from "react";
import {useCurrentSettings} from "@/context/SettingsContext";

export default function WeatherInfo() {
    const {weatherData, status, fetchWeatherData} = useCurrentWeather();
    const [refreshEnabled, setRefreshEnabled] = useState(false);

    const {settings} = useCurrentSettings();

    useEffect(() => {
        const checkTime = () => {
            if (weatherData) {
                const localtime = new Date(weatherData.location.localtime).getTime();
                const now = new Date().getTime();
                const diffInSeconds = (now - localtime) / 1000;

                setRefreshEnabled(diffInSeconds > 120); // enable if more than 2 minutes
            }
        };

        // Check immediately and then every 10 seconds
        checkTime();
        const interval = setInterval(checkTime, 10000);

        return () => clearInterval(interval);
    }, [weatherData]);

    return (
        <div>
            {status === "loading" ? <div className="flex flex-col space-y-3">
                <Skeleton className="h-12 w-2/3"/>
                <Skeleton className="h-4 w-1/2"/>
                <Skeleton className="h-[125px] w-full rounded-xl"/>
                <div className="space-y-2">
                    <Skeleton className="h-4 w-full"/>
                    <Skeleton className="h-4 w-full"/>
                </div>
            </div> : (weatherData && <div>
                    <div className="mb-4 font-bold">
                            <span
                                className="text-4xl">{weatherData.location.name}, </span>{weatherData.location.country}
                        <div className="flex items-center gap-2">
                            <div className="font-semibold text-sm">Last
                                Updated {new Date(weatherData.location.localtime).toLocaleTimeString()}</div>
                            {refreshEnabled && <RefreshCcwIcon size={16} onClick={() => fetchWeatherData()}/>}
                        </div>
                    </div>
                    <div className="flex items-center justify-between mb-4">
                        <div>
                            {weatherData &&
                                <Image width={150} height={150}
                                       src={"https:" + weatherData.current.condition.icon}
                                       alt="Weather Icon"/>}
                            <div className="font-semibold text-center">{weatherData.current.condition.text}</div>
                        </div>
                        <div className="text-center">
                            <div className="flex items-start text-2xl font-semibold">
                                <div className="text-5xl md:text-8xl font-bold pt-2">{settings.temperatureUnit === "°C" ? weatherData.current.temp_c: weatherData.current.temp_f}
                                </div>
                                <div>
                                    {settings.temperatureUnit}
                                </div>
                            </div>
                            <div className="font-semibold">Feels Like {settings.temperatureUnit === "°C" ? weatherData.current.feelslike_c: weatherData.current.feelslike_f}°</div>
                        </div>
                    </div>
                    {/*{weatherData?.location.lat}° N, {weatherData?.location.lon}° E*/}
                    <div className="flex items-center justify-between">
                        <div>
                            <div className="flex items-start text-sm md:text-xl pt-8 md:pt-2">
                                <div className="flex gap-2">
                                    <Droplets/>
                                    <div>Humidity</div>
                                </div>
                            </div>
                            <div className="text-lg md:text-2xl font-bold">{weatherData.current.humidity}%</div>
                        </div>
                        <div>
                            <div className="flex items-start  text-sm md:text-xl pt-8 md:pt-2">
                                <div className="flex gap-2">
                                    <SunIcon/>
                                    <div>UV Index</div>
                                </div>
                            </div>
                            <div className="text-lg md:text-2xl font-bold">{weatherData.current.uv}</div>
                        </div>
                        <div>
                            <div className="flex items-start  text-sm md:text-xl pt-8 md:pt-2">
                                <div className="flex gap-2">
                                    <WindIcon/>
                                    <div>Wind Speed</div>
                                </div>
                            </div>
                            <div className="text-lg md:text-2xl font-bold">{weatherData.current.wind_kph} Km/h</div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
