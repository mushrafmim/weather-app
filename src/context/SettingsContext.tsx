"use client"
import React, {createContext, useContext, useState} from 'react';

type SettingsType = {
    temperatureUnit: '°C' | '°F';
}

interface SettingsContextType {
    settings: SettingsType;
    setSettings: React.Dispatch<React.SetStateAction<SettingsType>>;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export const SettingsProvider: React.FC<{ children: React.ReactNode }> = ({children}) => {
    const [settings, setSettings] = useState<SettingsType>({
        temperatureUnit: '°C',
    })

    return (
        <SettingsContext.Provider value={{settings, setSettings}}>
            {children}
        </SettingsContext.Provider>
    );
};

export const useCurrentSettings = () => {
    const context = useContext(SettingsContext);
    if (!context) throw new Error('useRequest must be used within a RequestProvider');
    return context;
};
