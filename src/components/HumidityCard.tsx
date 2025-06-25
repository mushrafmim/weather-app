import MetricCard from "@/components/ui/MetricCard";
import {useCurrentWeather} from "@/context/CurrentWeatherContext";
import {Droplet} from "lucide-react";
import {useCurrentSettings} from "@/context/SettingsContext";

export default function HumidityCard() {

    const {settings} = useCurrentSettings();

    const {status, weatherData} = useCurrentWeather();

    return (
        <MetricCard loading={status == "loading"}>
            <div className="flex gap-2 text-zinc-500 mb-2 font-semibold">
                <Droplet/>
                <div>Humidity</div>
            </div>
            <div className="flex flex-col items-center mb-4">
                <div className="text-7xl font-bold text-white text-center">{weatherData?.current.humidity}%</div>
            </div>
            <div className="text-center text-white font-semibold">Dew
                Point {settings.temperatureUnit === "°C" ? weatherData?.current.dewpoint_c: weatherData?.current.dewpoint_f}°
            </div>
        </MetricCard>
    );
}