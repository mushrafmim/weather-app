"use client"
import React, {createContext, useContext, useEffect, useState} from 'react';
import {SearchLocationType} from "@/types/SearchLocationType";
import {CurrentWeatherType} from "@/types/CurrentWeatherType";
import {fetchData} from "@/requests";

type RequestStatus = 'idle' | 'loading' | 'success' | 'error';

interface CurrentWeatherContextType {
    status: RequestStatus;
    error: string | null;
    weatherData: CurrentWeatherType | null;
    currentLocation: SearchLocationType;
    setCurrentLocation: React.Dispatch<React.SetStateAction<SearchLocationType>>;
    fetchWeatherData: () => Promise<void>;
}

const CurrentWeatherContext = createContext<CurrentWeatherContextType | undefined>(undefined);

export const CurrentWeatherProvider: React.FC<{ children: React.ReactNode }> = ({children}) => {
    const [currentLocation, setCurrentLocation] = useState<SearchLocationType>({
        id: 2842281,
        name: "Colombo",
        region: "Western",
        country: "Sri Lanka",
        tz_id: "Asia/Colombo",
        lat: 6.9319,
        lon: 79.8478,
    });
    const [weatherData, setWeatherData] = useState<CurrentWeatherType | null>(null);
    const [status, setStatus] = useState<RequestStatus>('loading');
    const [error, setError] = useState<string | null>(null);

    const fetchWeatherData = async () => {
        setStatus('loading')
        setError(null);
        setWeatherData(null);
        try {
            const location = `${currentLocation.lat},${currentLocation.lon}`
            const data = await fetchData(location);
            if (data) {
                setWeatherData(data);
                setStatus('success')
            } else {
                console.error("Failed to fetch weather data");
            }
        } catch (error) {
            setStatus('error')
            setError(error instanceof Error ? error.message : 'An unknown error occurred');
            console.error("Error fetching weather data:", error);
        }
    }

    useEffect(() => {
        fetchWeatherData()
    }, [currentLocation]);

    return (
        <CurrentWeatherContext.Provider value={{status, weatherData, error, currentLocation, setCurrentLocation, fetchWeatherData}}>
            {children}
        </CurrentWeatherContext.Provider>
    );
};

export const useCurrentWeather = () => {
    const context = useContext(CurrentWeatherContext);
    if (!context) throw new Error('useRequest must be used within a RequestProvider');
    return context;
};
