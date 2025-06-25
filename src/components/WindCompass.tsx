import React from "react";

type WindCompassProps = {
    directionDeg: number; // wind direction in degrees (meteorological)
    speed: number; // wind speed
};

const WindCompass: React.FC<WindCompassProps> = ({directionDeg, speed}) => {
    return (
        <div
            className="relative w-32 h-32 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 text-white flex items-center justify-center">
            {/* Compass Labels */}
            {["N", "E", "S", "W"].map((dir, index) => {
                const positions = [
                    {top: 0, left: "50%", transform: "translateX(-50%)"},
                    {top: "50%", right: 0, transform: "translateY(-50%)"},
                    {bottom: 0, left: "50%", transform: "translateX(-50%)"},
                    {top: "50%", left: 0, transform: "translateY(-50%)"},
                ];
                const style = positions[index];
                return (
                    <div
                        key={dir}
                        className="absolute text-sm font-bold"
                        style={{position: "absolute", ...style}}
                    >
                        {dir}
                    </div>
                );
            })}

            {/* Arrow */}
            <div
                className="absolute w-4 h-4"
                style={{
                    transform: `rotate(${directionDeg}deg) translate(56px)`,
                    transformOrigin: "center",
                }}
            >
                <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="white"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path d="M2 12l20-6-6 20-4-8-8-4z"/>
                </svg>
            </div>

            {/* Speed */}
            <div className="text-center">
                <div className="text-2xl font-bold">{speed}</div>
                <div className="text-sm">km/h</div>
            </div>
        </div>
    );
};

export default WindCompass;
