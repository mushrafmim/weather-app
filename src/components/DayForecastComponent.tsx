import {useWeatherForecast} from "@/context/WeatherForecastContext";
import Image from "next/image";

export default function DayForecastComponent() {

    const {forecastData} = useWeatherForecast()

    let displayData = forecastData?.forecast.forecastday[0].hour.filter(hour => (new Date(hour.time).getHours() >= new Date().getHours())) || [];
    const nextDayData = forecastData?.forecast.forecastday[1].hour.filter(hour => (new Date(hour.time).getHours() < new Date().getHours())) || [];

    displayData = displayData.concat(nextDayData);

    return (
        <div className="bg-sky-600/20 shadow-sm backdrop-blur-md border border-white/40 rounded-2xl p-4 overflow-x-auto scrollbar-hide">
            <div className="flex gap-2 text-zinc-500 mb-2 font-semibold">
                <div>Hourly Weather</div>
            </div>
            <div className="flex gap-2 text-zinc-500 mb-2 font-semibold overflow-x-auto scrollbar-hide">
                {displayData.map((hour, i) => (
                    <div
                        key={i}
                        className="w-[100px] flex-shrink-0"
                    >
                        <div className="text-center">{new Date(hour.time).getHours()}:00</div>
                        <Image draggable={"false"} src={"https:" + hour.condition.icon} alt={"Weather icon"} width={80} height={80}/>
                        <div className="text-center">{hour.temp_c}°&nbsp;C</div>
                    </div>
                ))}
            </div>
        </div>
    );
}