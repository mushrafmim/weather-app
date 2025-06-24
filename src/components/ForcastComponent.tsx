"use client";

import {useEffect, useState} from "react";
import {getForcast} from "@/requests";
import Image from "next/image";
import {ForcastWeatherType} from "@/types/ForcastWeatherType";

export type ForcastComponentProps = {
    location: string;
}
export default function ForcastComponent(props: ForcastComponentProps) {
    const [forecastData, setForecastData] = useState<ForcastWeatherType | null>(null);
    const {location} = props;


    useEffect(() => {
        getForcast(location)
            .then(data => {
                if (data) {
                    setForecastData(data);
                } else {
                    console.error("Failed to fetch forecast data");
                }
            })
            .catch(error => {
                console.error("Error fetching forecast data:", error);
            });
    }, [location]);

    return (
        <div className="p-4 bg-white/20 rounded-lg shadow-md">
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
                            <p className="flex-1">Max: {day.day.maxtemp_c.toFixed(1)}°C</p>
                            <p className="flex-1">Min: {day.day.mintemp_c.toFixed(1)}°C</p>
                            {/*<p>Humidity: {day.day.avghumidity}%</p>*/}
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