import type {Metadata} from "next";
import {Geist, Geist_Mono} from "next/font/google";
import "./globals.css";
import {CurrentWeatherProvider} from "@/context/CurrentWeatherContext";
import {WeatherForecastProvider} from "@/context/WeatherForecastContext";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Open Weather",
    description: "A simple weather app using Next.js and WeatherAPI",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    // Update the background based on time of day
    const currentHour = new Date().getHours();
    const isDayTime = currentHour >= 6 && currentHour < 18;

    const backgroundClass = isDayTime
        ? "bg-gradient-to-b from-sky-400 via-blue-300 to-blue-400"
        : "bg-gradient-to-b from-gray-800 via-gray-700 to-gray-600";

    return (
        <html lang="en">
        <CurrentWeatherProvider>
            <WeatherForecastProvider>
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased ${backgroundClass} bg-no-repeat bg-cover min-h-screen`}
            >
            {children}
            </body>
            </WeatherForecastProvider>
        </CurrentWeatherProvider>
        </html>
    );
}
