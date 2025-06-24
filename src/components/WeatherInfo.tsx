import {Skeleton} from "@/components/ui/skeleton";
import {Droplets, RefreshCcwIcon, SunIcon, WindIcon} from "lucide-react";
import Image from "next/image";
import {useCurrentWeather} from "@/context/CurrentWeatherContext";

export default function WeatherInfo() {
    const {weatherData, status, fetchWeatherData} = useCurrentWeather();

    return (

        <>
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
                            {(new Date().getTime() - new Date(weatherData.location.localtime).getTime()) / 1000 > 120 ?
                                <RefreshCcwIcon size={16} onClick={() => fetchWeatherData()}/> : null}
                        </div>
                    </div>
                    <div className="flex items-center justify-between">
                        <div>
                            {weatherData &&
                                <Image width={192} height={192}
                                       src={"https:" + weatherData.current.condition.icon}
                                       alt="Weather Icon"/>}
                        </div>
                        <div className="text-center">
                            <div className="flex items-start text-2xl font-semibold">
                                <div className="text-8xl font-bold pt-2">{weatherData.current.temp_c}
                                </div>
                                <div>
                                    °&nbsp;C
                                </div>
                            </div>
                            <div className="font-semibold">{weatherData.current.condition.text}</div>
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
                            <div className="text-2xl font-bold">{weatherData.current.humidity}%</div>
                        </div>
                        <div>
                            <div className="flex items-start text-xl">
                                <div className="flex gap-2">
                                    <SunIcon/>
                                    <div>UV Index</div>
                                </div>
                            </div>
                            <div className="text-2xl font-bold">{weatherData.current.uv}</div>
                        </div>
                        <div>
                            <div className="flex items-start text-xl">
                                <div className="flex gap-2">
                                    <WindIcon/>
                                    <div>Wind Speed</div>
                                </div>
                            </div>
                            <div className="text-2xl font-bold">{weatherData.current.wind_kph} Km/h</div>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}
