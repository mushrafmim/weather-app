import {SearchIcon, X} from "lucide-react";
import React, {useEffect, useRef, useState} from "react";
import {SearchLocationType} from "@/types/SearchLocationType";
import {searchLocations} from "@/requests";
import {useCurrentWeather} from "@/context/CurrentWeatherContext";
import {IconLocation} from "@tabler/icons-react";

export default function LocationSearch() {
    const [searchKey, setSearchKey] = useState("Colombo, Sri Lanka")
    const [searchLocationResults, setSearchLocationResults] = useState<SearchLocationType[]>([]);
    const [activeIndex, setActiveIndex] = useState(0);

    const { currentLocation, setCurrentLocation } = useCurrentWeather();

    const handleSearch = async (query: string) => {
        setSearchKey(query);
        if (query.length > 2) {
            const locations = await searchLocations(query);
            setSearchLocationResults(locations);
        } else {
            setSearchLocationResults([]);
        }
    };


    const getLocation = () => {
        if (!navigator.geolocation) {
            return;
        }

        navigator.geolocation.getCurrentPosition(
            (position) => {
                console.log(position);
                searchLocations(`${position.coords.latitude}, ${position.coords.longitude}`)
                    .then(result => {
                        if (result.length > 0) {
                            const location = result[0];

                            console.log(location);
                            setCurrentLocation(location);
                            setSearchKey(`${location.name}, ${location.country}`);
                            setSearchLocationResults([]);
                        } else {
                            console.error("No locations found for current coordinates.");
                        }
                    })
            },
            (err) => {
                console.log(err);
            }
        );
    };

    const locationSearchRef = useRef<HTMLInputElement>(null);

    const onLocationClear = () => {
        setSearchKey("");
        locationSearchRef.current?.focus();
    }

    // on enter key press, select the active location
    const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Enter' && searchLocationResults.length > 0) {
            const selectedLocation = searchLocationResults[activeIndex];
            setCurrentLocation(selectedLocation);
            setSearchKey(`${selectedLocation.name}, ${selectedLocation.country}`);
            setSearchLocationResults([]);
        } else if (e.key === 'ArrowDown') {
            setActiveIndex((prevIndex) => Math.min(prevIndex + 1, searchLocationResults.length - 1));
        } else if (e.key === 'ArrowUp') {
            setActiveIndex((prevIndex) => Math.max(prevIndex - 1, 0));
        }
    };

    useEffect(() => {
        const inputElement = locationSearchRef.current;
        if (inputElement) {
            inputElement.addEventListener('keydown', handleKeyDown);
        }
        return () => {
            if (inputElement) {
                inputElement.removeEventListener('keydown', handleKeyDown);
            }
        };
    }, [searchLocationResults, activeIndex]);

    return (
        <div>
            <div className="flex gap-2 items-center bg-white/40 rounded-lg shadow-sm p-2 relative">
                <SearchIcon size={20}/>
                <input
                    className="outline-none border-none active:none focus-visible:outline-none focus-visible:ring-0 flex-1"
                    ref={locationSearchRef}
                    value={searchKey}
                    onChange={(e) => handleSearch(e.target.value)}
                    onBlur={() => {
                        if (searchKey.trim() === "") {
                            console.log("Hello.")
                            setSearchKey(`${currentLocation.name}, ${currentLocation.country}`);
                        }
                    }}
                />
                {searchKey && <X className="cursor-pointer" size={20} onClick={onLocationClear}/>}
                <IconLocation onClick={getLocation} />
            </div>
            <div className="relative">
                {searchLocationResults.length > 0 && (
                    <div className="absolute bg-white shadow-lg rounded-lg mt-2 z-10 left-0 right-0">
                        <ul>
                            {searchLocationResults.map((location, i) => (
                                <li
                                    onMouseEnter={() => setActiveIndex(i)}
                                    key={location.id}
                                    className={`cursor-pointer overflow-hidden hover:bg-gray-100 p-2 ${activeIndex === i ? 'bg-gray-200' : ''}`}
                                    onClick={() => {
                                        setCurrentLocation(location);
                                        setSearchKey(`${location.name}, ${location.country}`);
                                        setSearchLocationResults([]);
                                        setActiveIndex(0);
                                    }}
                                >
                                    <strong>{location.name}</strong>, {location.country}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    )
}