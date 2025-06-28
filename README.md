# Weather App
# Introduction
This is a simple weather application built with Next.js, TypeScript, and Tailwind CSS. It fetches weather data from an external API and displays it in a user-friendly interface. The app is designed to be responsive and works well on both desktop and mobile devices.

# Features
- Fetches current weather data based on user location or city input. (Defaults to Colombo, Sri Lanka)
- Displays temperature, humidity, wind speed, and weather conditions.
- Forecasts the weather for the next 10 days.
- Forecasts the weather for next 24 hours.
- Search any location or get the weather based on your current location.

## Setting Up the Project

Install the dependencies:

```bash
npm install
```

Then, Place the following API keys in a `.env.local` file at the root of your project:

```plaintext
WEATHER_API_KEY=
NEXT_PUBLIC_MAPS_API_KEY=
```

Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!
