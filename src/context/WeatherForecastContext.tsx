"use client"
import React, {createContext, useCallback, useContext, useEffect, useState} from 'react';
import {fetchForecast} from "@/requests";
import {ForcastWeatherType} from "@/types/ForcastWeatherType";
import {useCurrentWeather} from "@/context/CurrentWeatherContext";

type RequestStatus = 'idle' | 'loading' | 'success' | 'error';

interface WeatherForecastContextType {
    status: RequestStatus;
    error: string | null;
    forecastData: ForcastWeatherType | null;
    fetchForecastData: () => Promise<void>;
}

const WeatherForecastContext = createContext<WeatherForecastContextType | undefined>(undefined);

export const WeatherForecastProvider: React.FC<{ children: React.ReactNode }> = ({children}) => {

    const {currentLocation} = useCurrentWeather()
    const [forecastData, setForecastData] = useState<ForcastWeatherType | null>(null);
    const [status, setStatus] = useState<RequestStatus>('loading');
    const [error, setError] = useState<string | null>(null);

    const fetchForecastData = useCallback(async () => {
        setStatus('loading')
        setError(null);
        setForecastData(null);
        try {
            const location = `${currentLocation.lat},${currentLocation.lon}`
            const data = await fetchForecast(location);
            if (data) {
                setForecastData(data);
                setStatus('success')
            } else {
                console.error("Failed to fetch weather data");
            }
        } catch (error) {
            setStatus('error')
            setError(error instanceof Error ? error.message : 'An unknown error occurred');
            console.error("Error fetching weather data:", error);
        }
    }, [currentLocation]);

    useEffect(() => {
        if (currentLocation) {
            fetchForecastData()
        }
    }, [currentLocation, fetchForecastData]);

    return (
        <WeatherForecastContext.Provider value={{status, forecastData, error, fetchForecastData}}>
            {children}
        </WeatherForecastContext.Provider>
    );
};

export const useWeatherForecast = () => {
    const context = useContext(WeatherForecastContext);
    if (!context) throw new Error('useRequest must be used within a RequestProvider');
    return context;
};
