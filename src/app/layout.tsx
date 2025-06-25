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
    return (
        <html lang="en">
        <CurrentWeatherProvider>
            <WeatherForecastProvider>
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased bg-no-repeat bg-cover min-h-screen`}
            >
            {children}
            </body>
            </WeatherForecastProvider>
        </CurrentWeatherProvider>
        </html>
    );
}
