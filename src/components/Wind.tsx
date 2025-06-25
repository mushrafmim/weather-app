import {WindIcon} from "lucide-react";
import MetricCard from "@/components/ui/MetricCard";
import {useCurrentWeather} from "@/context/CurrentWeatherContext";

export default function Wind() {
    const {status, weatherData} = useCurrentWeather();

    return (
        <MetricCard loading={status == "loading"}>
            <div className="flex gap-2 text-zinc-500 mb-2 font-semibold">
                <WindIcon/>
                <div>
                    Wind Speed
                </div>
            </div>
            <div className="flex flex-col items-center">
                <div className="text-center text-6xl md:text-7xl mb-4 font-bold text-white">{weatherData?.current.wind_kph}<span
                    className="text-sm">Km/h</span></div>
                <div className="flex gap-2">
                <div className="flex gap-2 text-white font-semibold">{weatherData?.current.wind_degree}°</div>
                <div className="flex gap-2 text-white font-semibold">{weatherData?.current.wind_dir}</div>
                </div>
                <div className="flex gap-2 text-white font-semibold text-left">Gusts: {weatherData?.current.gust_kph} Km/h</div>
            </div>
        </MetricCard>
    )
}