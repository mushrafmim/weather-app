import {NextApiRequest, NextApiResponse} from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { location, days } = req.query
    const apiKey = process.env.WEATHER_API_KEY;
    const baseUrl = "https://api.weatherapi.com/v1";

    if (!location || typeof location !== 'string') {
        return res.status(400).json({ error: 'Location is required' });
    }

    if (!days || typeof days !== 'string') {
        return res.status(400).json({ error: 'Days parameter is required' });
    }

    try {
        const response = await fetch(`${baseUrl}/forecast.json?key=${apiKey}&q=${location}&days=${days}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        res.status(200).json(data);
    } catch (error) {
        console.error('Error fetching forecast:', error);
        res.status(500).json({ error: 'Failed to fetch weather data' });
    }
}