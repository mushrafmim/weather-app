"use client";

import Image from "next/image";
import {useWeatherForecast} from "@/context/WeatherForecastContext";
import {useCurrentSettings} from "@/context/SettingsContext";

export type ForecastComponentProps = {
    location: string;
}
export default function ForecastComponent(props: ForecastComponentProps) {
    const {location} = props;

    const {settings} = useCurrentSettings();
    const { forecastData } = useWeatherForecast()

    return (
        <div className="p-4 bg-sky-600/20 shadow-sm backdrop-blur-md border border-white/40 rounded-2xl overflow-x-auto scrollbar-hide h-full text-white">
            <h2 className="text-2xl font-bold mb-4">Weather Forecast for {location}</h2>
            {forecastData ? (
                <div className="">
                    {forecastData.forecast.forecastday.map((day) => (
                        <div key={day.date} className="flex items-center justify-between">
                            <h3 className="text-lg font-semibold flex-1">{getDayName(day.date)}</h3>
                            <div className="flex items-center gap-2 flex-1">
                                <Image width={48} height={48} src={"https:" + day.day.condition.icon} alt={day.day.condition.text}
                                />
                            </div>
                            {settings.temperatureUnit == "°C" && <p className="flex-1">{day.day.maxtemp_c.toFixed(1)}° / {day.day.mintemp_c.toFixed(1)}°</p>}
                            {settings.temperatureUnit == "°F" && <p className="flex-1">{day.day.maxtemp_f.toFixed(1)}° / {day.day.mintemp_f.toFixed(1)}°</p>}
                        </div>
                    ))}
                </div>
            ) : (
                <p>Loading forecast data...</p>
            )}
        </div>
    );
}

function getDayName(dateString: string): string {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {weekday: 'short'};
    return date.toLocaleDateString(undefined, options);
}