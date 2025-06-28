import type {NextApiRequest, NextApiResponse} from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const {query} = req.query;
    const apiKey = process.env.WEATHER_API_KEY;
    const baseUrl = "https://api.weatherapi.com/v1";

    try {
        const response = await fetch(`${baseUrl}/search.json?key=${apiKey}&q=${query}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        res.status(200).json(data);
    } catch (error) {
        console.error('Error fetching weather data:', error);
        res.status(500).json({ error: 'Failed to fetch weather data' });
    }
}