import {SunIcon} from "lucide-react";
import {useCurrentWeather} from "@/context/CurrentWeatherContext";
import MetricCard from "@/components/ui/MetricCard";

export default function UVIndex() {

    const {status, weatherData} = useCurrentWeather();

    const uvIndex = weatherData?.current.uv ?? 0;

    const percentage = Math.min(uvIndex * 10, 100); // clamp to 100%

    let uvIndexText = "Extreme";

    if (uvIndex < 3) {
        uvIndexText = "Low";
    } else if (uvIndex < 6) {
        uvIndexText = "Moderate";
    } else if (uvIndex < 8) {
        uvIndexText = "High";
    } else if (uvIndex < 11) {
        uvIndexText = "Very High";
    }

    return (
        <MetricCard loading={status=="loading"}>
            <div className="flex gap-2 text-zinc-500 mb-2 font-semibold">
                <SunIcon/>
                <div>UV Index</div>
            </div>
            <div className="flex flex-col items-center">
                <div className="text-6xl md:text-7xl font-bold text-white text-center">{weatherData?.current.uv}</div>
            </div>
            <div className="text-center text-white font-semibold mb-4">{uvIndexText}</div>
            <div
                style={{backgroundImage: "linear-gradient(to right, #4ade80, #facc15, #f97316, #ef4444, #a855f7)"}}
                className="w-full max-w-lg h-4 rounded-full relative">
                <div
                    className="absolute top-0 w-1 h-4 bg-white rounded-full"
                    style={{left: `${percentage}%`}}
                />
            </div>
        </MetricCard>
    )
}