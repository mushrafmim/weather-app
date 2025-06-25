import {SearchIcon, X} from "lucide-react";
import {useState} from "react";
import {SearchLocationType} from "@/types/SearchLocationType";
import {searchLocations} from "@/requests";
import {useCurrentWeather} from "@/context/CurrentWeatherContext";
import {IconLocation} from "@tabler/icons-react";

export default function LocationSearch() {
    const [searchKey, setSearchKey] = useState("Colombo, Sri Lanka")
    const [searchLocationResults, setSearchLocationResults] = useState<SearchLocationType[]>([]);

    const { setCurrentLocation } = useCurrentWeather();

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

    return (
        <>
            <div className="flex gap-2 items-center bg-white/40 rounded-lg shadow-sm p-2 relative">
                <SearchIcon size={20}/>
                <input
                    className="outline-none border-none active:none focus-visible:outline-none focus-visible:ring-0 flex-1"
                    value={searchKey}
                    onChange={(e) => handleSearch(e.target.value)}
                />
                {searchKey && <X className="cursor-pointer" size={20} onClick={() => setSearchKey("")}/>}
                <IconLocation onClick={getLocation} />
            </div>
            <div className="relative bg-green w-full h-16">
                {searchLocationResults.length > 0 && (
                    <div className="absolute bg-white shadow-lg rounded-lg mt-2 z-10 left-0 right-0">
                        <ul>
                            {searchLocationResults.map((location) => (
                                <li
                                    key={location.id}
                                    className="cursor-pointer hover:bg-gray-100 p-2"
                                    onClick={() => {
                                        setCurrentLocation(location);
                                        setSearchKey(`${location.name}, ${location.country}`);
                                        setSearchLocationResults([]);
                                    }}
                                >
                                    <strong>{location.name}</strong>, {location.country}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </>
    )
}