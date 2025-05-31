// Loader.jsx
import React, { useEffect, useState } from "react";

const Loader = ({ onLoadComplete }) => {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [glowIntensity, setGlowIntensity] = useState(0);

  useEffect(() => {
    // Animate progress bar
    const interval = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + Math.random() * 3;
        return newProgress >= 100 ? 100 : newProgress;
      });
    }, 100);

    // Animate glow effect
    const glowInterval = setInterval(() => {
      setGlowIntensity((prev) => (prev + 0.1) % 1);
    }, 50);

    // Complete loading
    const timer = setTimeout(() => {
      setProgress(100);
      setTimeout(() => {
        setLoading(false);
        if (onLoadComplete) onLoadComplete();
      }, 500);
    }, 3500);

    return () => {
      clearInterval(interval);
      clearInterval(glowInterval);
      clearTimeout(timer);
    };
  }, [onLoadComplete]);

  if (!loading) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-gray-50 to-white overflow-hidden">
      {/* Background geometric elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-full h-full opacity-5">
          <div
            className="absolute top-1/4 left-1/4 w-1/2 h-1/2 border border-lime-400 rounded-full animate-ping"
            style={{ animationDuration: "4s" }}
          ></div>
          <div
            className="absolute top-1/3 left-1/3 w-1/3 h-1/3 border border-lime-500 rounded-full animate-ping"
            style={{ animationDuration: "5s" }}
          ></div>
          <div className="absolute top-0 left-0 w-full h-full bg-grid-pattern"></div>
        </div>

        {/* Abstract pattern lines */}
        <div className="absolute w-full h-full opacity-10">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute border-t border-lime-400"
              style={{
                top: `${Math.random() * 100}%`,
                left: 0,
                right: 0,
                transform: `rotate(${Math.random() * 5 - 2.5}deg)`,
                opacity: Math.random() * 0.5 + 0.5,
              }}
            ></div>
          ))}
        </div>
      </div>

      <div className="relative flex flex-col items-center justify-center max-w-md w-full px-8">
        {/* Logo and brand */}
        <div className="mb-16 text-center">
          <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-lime-600 to-lime-400 tracking-tight filter drop-shadow-sm">
            LOCAL RADAR
          </h1>
          <p className="mt-2 text-gray-500 font-light tracking-wider text-sm">
            LOCATION INTELLIGENCE SYSTEM
          </p>
        </div>

        {/* Main radar animation */}
        <div className="relative mb-16 w-48 h-48">
          {/* Radar sweep */}
          <div
            className="absolute top-0 left-0 w-full h-full rounded-full"
            style={{
              background:
                "conic-gradient(from 0deg, rgba(56, 189, 248, 0) 0%, rgba(56, 189, 248, 0.1) 50%, rgba(56, 189, 248, 0) 51%)",
              animation: "spin 3s linear infinite",
            }}
          ></div>

          {/* Concentric circles */}
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full border border-gray-200"
              style={{
                top: `${12.5 * i}%`,
                left: `${12.5 * i}%`,
                width: `${100 - 25 * i}%`,
                height: `${100 - 25 * i}%`,
                opacity: 0.7 - i * 0.1,
                boxShadow: `0 0 ${10 + glowIntensity * 15}px rgba(56, 189, 248, ${0.1 + glowIntensity * 0.1})`,
              }}
            ></div>
          ))}

          {/* Center point */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-gradient-to-br from-lime-500 to-lime-400 rounded-full shadow-lg shadow-lime-200"></div>

          {/* Location points */}
          {[...Array(5)].map((_, i) => {
            const angle = Math.random() * Math.PI * 2;
            const distance = 20 + Math.random() * 80;
            const x = Math.cos(angle) * distance;
            const y = Math.sin(angle) * distance;
            const size = 1 + Math.random() * 2;
            const delay = Math.random() * 2;

            return (
              <div
                key={i}
                className="absolute bg-lime-400 rounded-full animate-pulse"
                style={{
                  width: `${size}px`,
                  height: `${size}px`,
                  top: `calc(50% + ${y / 2}px)`,
                  left: `calc(50% + ${x / 2}px)`,
                  animationDuration: "2s",
                  animationDelay: `${delay}s`,
                  boxShadow: `0 0 ${5 + glowIntensity * 5}px rgba(56, 189, 248, ${0.4 + glowIntensity * 0.2})`,
                }}
              ></div>
            );
          })}

          {/* Orbiting satellite */}
          <div
            className="absolute w-2 h-2 bg-white rounded-full"
            style={{
              top: `calc(50% + ${Math.sin(glowIntensity * Math.PI * 2) * 70}px)`,
              left: `calc(50% + ${Math.cos(glowIntensity * Math.PI * 2) * 70}px)`,
              boxShadow: "0 0 10px rgba(255, 255, 255, 0.8)",
            }}
          ></div>
        </div>

        {/* Progress bar */}
        <div className="w-full mb-2 bg-gray-100 rounded-full h-1 overflow-hidden shadow-inner">
          <div
            className="bg-gradient-to-r from-lime-600 to-lime-400 h-full rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        {/* Status text */}
        <div className="text-center">
          <div className="text-xs text-gray-400 font-medium tracking-widest">
            {progress < 30
              ? "INITIALIZING SYSTEM"
              : progress < 60
                ? "LOCATING COORDINATES"
                : progress < 90
                  ? "CALIBRATING RADAR"
                  : "PREPARING INTERFACE"}
          </div>
          <div className="mt-1 text-xs text-gray-300">
            {Math.floor(progress)}% COMPLETE
          </div>
        </div>
      </div>

      {/* Add global keyframe animation for the radar sweep */}
      <style jsx>{`
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
};

export default Loader;
