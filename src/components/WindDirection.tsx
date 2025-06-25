import React from 'react';

type WindGaugeProps = {
    direction: string; // e.g. "WSW"
    speed: number; // e.g. 25
};

const directionToDegrees = (dir: string): number => {
    const directions = [
        'N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE',
        'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW',
    ];
    const index = directions.indexOf(dir.toUpperCase());
    return index >= 0 ? index * 22.5 : 0; // 360 / 16 = 22.5
};

export const WindGauge: React.FC<WindGaugeProps> = ({ direction, speed }) => {
    const rotation = directionToDegrees(direction);

    return (
        <div className="relative w-48 h-48 rounded-full flex items-center justify-center bg-blue-50/30 shadow-inner">
            {/* Needle */}
            <div
                className="absolute w-1 h-20 bg-red-500 origin-bottom transition-transform duration-500"
                style={{ transform: `rotate(${rotation}deg)` }}
            />

            {/* Center Display */}
            <div className="absolute text-center">
                <div className="text-lg font-semibold text-gray-700">{speed} km/h</div>
                <div className="text-sm text-gray-500">{direction}</div>
            </div>

            {/* Compass Labels (Optional) */}
            <div className="absolute top-1 left-1/2 transform -translate-x-1/2 text-xs text-gray-600">N</div>
            <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 text-xs text-gray-600">S</div>
            <div className="absolute left-1 top-1/2 transform -translate-y-1/2 text-xs text-gray-600">W</div>
            <div className="absolute right-1 top-1/2 transform -translate-y-1/2 text-xs text-gray-600">E</div>
        </div>
    );
};
