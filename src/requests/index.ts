const baseUrl = "https://api.weatherapi.com/v1";
const apiKey = process.env.NEXT_PUBLIC_WEATHER_API_KEY;

export async function fetchData(location: string = "Colombo") {
    try {
        const response = await fetch(`https://api.weatherapi.com/v1/current.json?q=${location}&key=${apiKey}`);
        if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
        return null;
    }
}

export async function searchLocations(query: string) {
    try {
        const response = await fetch(`${baseUrl}/search.json?key=${apiKey}&q=${query}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error searching locations:', error);
        return [];
    }
}

export async function getForcast(location: string, days: number = 10) {
    try {
        const response = await fetch(`${baseUrl}/forecast.json?key=${apiKey}&q=${location}&days=${days}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching forecast:', error);
        return null;
    }
}