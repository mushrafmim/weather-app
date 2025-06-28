export async function fetchData(location: string = "Colombo") {
    try {
        const response = await fetch(`/api/weather?location=${location}`);
        if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching data:', error);
        return null;
    }
}

export async function searchLocations(query: string) {
    try {
        const response = await fetch(`/api/location?query=${query}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Error searching locations:', error);
        return [];
    }
}

export async function fetchForecast(location: string, days: number = 10) {
    try {
        const response = await fetch(`/api/forecast?location=${location}&days=${days}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching forecast:', error);
        return null;
    }
}