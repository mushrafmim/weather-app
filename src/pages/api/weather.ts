import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { location } = req.query;
    const key = process.env.WEATHER_API_KEY;

    if (!location || typeof location !== 'string') {
        return res.status(400).json({ error: 'Location is required' });
    }

    try {
        const response = await fetch(
            `https://api.weatherapi.com/v1/current.json?key=${key}&q=${encodeURIComponent(location)}`
        );
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
