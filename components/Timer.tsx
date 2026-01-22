'use client';

import React from 'react';

interface TimerProps {
  duration: number;
  timeRemaining: number;
  active: boolean;
}

export default function Timer({ duration, timeRemaining, active }: TimerProps) {
  // Protection contre division par zéro
  const safeDuration = duration > 0 ? duration : 1;
  const percentage = Math.min(100, Math.max(0, (timeRemaining / safeDuration) * 100));
  const isLowTime = timeRemaining <= 2 && timeRemaining > 0;

  // Taille responsive
  const size = 200; // Taille de base pour mobile
  const radius = size / 2 - 20;
  const circumference = 2 * Math.PI * radius;

  return (
    <div className="relative w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 lg:w-72 lg:h-72 mx-auto">
      {/* Cercle de fond avec style gaming */}
      <svg className="transform -rotate-90 w-full h-full" viewBox={`0 0 ${size} ${size}`}>
        {/* Cercle de fond externe */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius + 5}
          stroke="rgba(255, 107, 53, 0.1)"
          strokeWidth="2"
          fill="none"
        />
        {/* Cercle de fond principal */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="rgba(255, 255, 255, 0.05)"
          strokeWidth="8"
          fill="none"
        />
        {/* Cercle de progression avec style orange gaming */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={isLowTime ? '#FF0000' : '#FF6B35'}
          strokeWidth="8"
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={circumference * (1 - percentage / 100)}
          strokeLinecap="round"
          className={`transition-all duration-100 ${isLowTime ? 'animate-pulse' : 'animate-energy-pulse'}`}
          style={{
            filter: isLowTime
              ? 'drop-shadow(0 0 20px #FF0000) drop-shadow(0 0 40px #FF0000) drop-shadow(0 0 60px #FF0000)'
              : 'drop-shadow(0 0 20px rgba(255, 107, 53, 0.8)) drop-shadow(0 0 40px rgba(255, 107, 53, 0.6)) drop-shadow(0 0 60px rgba(255, 107, 53, 0.4))',
          }}
        />
        {/* Effet de brillance sur le cercle */}
        {!isLowTime && (
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="rgba(255, 140, 66, 0.3)"
            strokeWidth="4"
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={circumference * (1 - percentage / 100)}
            strokeLinecap="round"
            className="transition-all duration-100"
          />
        )}
      </svg>
      {/* Texte au centre avec style gaming orange */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center">
          <span
            className={`text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-gaming font-black ${
              isLowTime ? 'text-red-500 animate-pulse' : 'text-orange-neon'
            }`}
            style={{
              textShadow: isLowTime
                ? '0 0 20px #FF0000, 0 0 40px #FF0000, 0 0 60px #FF0000'
                : '0 0 20px rgba(255, 107, 53, 0.9), 0 0 40px rgba(255, 107, 53, 0.7), 0 0 60px rgba(255, 107, 53, 0.5)',
            }}
          >
            {active ? Math.ceil(timeRemaining) : (timeRemaining > 0 ? 'PRÊT ?' : '—')}
          </span>
          {active && !isLowTime && (
            <div className="mt-2 text-orange-bright font-gaming text-xs sm:text-sm md:text-base uppercase tracking-widest animate-pulse-orange">
              ⚡ GO ⚡
            </div>
          )}
        </div>
      </div>
      {/* Effet de particules autour du timer */}
      {active && (
        <>
          <div className="absolute top-0 left-1/2 w-2 h-2 bg-orange-neon rounded-full animate-float opacity-60 glow-orange-soft" style={{ transform: 'translateX(-50%)' }}></div>
          <div className="absolute bottom-0 left-1/2 w-2 h-2 bg-orange-bright rounded-full animate-float opacity-60 glow-orange-soft" style={{ transform: 'translateX(-50%)', animationDelay: '1s' }}></div>
          <div className="absolute top-1/2 left-0 w-2 h-2 bg-orange-glow rounded-full animate-float opacity-60 glow-orange-soft" style={{ animationDelay: '0.5s' }}></div>
          <div className="absolute top-1/2 right-0 w-2 h-2 bg-orange-neon rounded-full animate-float opacity-60 glow-orange-soft" style={{ animationDelay: '1.5s' }}></div>
        </>
      )}
    </div>
  );
}
