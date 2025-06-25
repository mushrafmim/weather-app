import {APIProvider, ColorScheme, Map, MapCameraChangedEvent} from "@vis.gl/react-google-maps";
import {useCurrentWeather} from "@/context/CurrentWeatherContext";

export default function LocationMap() {
    const {currentLocation, weatherData} = useCurrentWeather();
    return (
        <APIProvider apiKey={process.env.NEXT_PUBLIC_MAPS_API_KEY || ''}>
            <Map
                cameraControlOptions={null}
                scrollwheel={false}
                defaultZoom={10}
                colorScheme={weatherData?.current.is_day ? ColorScheme.LIGHT : ColorScheme.DARK}
                center={{lat: currentLocation.lat, lng: currentLocation.lon}}
                onCameraChanged={(ev: MapCameraChangedEvent) =>
                    console.log('camera changed:', ev.detail.center, 'zoom:', ev.detail.zoom)
                }>
            </Map>
        </APIProvider>
    )
}