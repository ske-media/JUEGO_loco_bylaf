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
    <div className="relative w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 mx-auto">
      {/* Cercle de fond */}
      <svg className="transform -rotate-90 w-full h-full" viewBox={`0 0 ${size} ${size}`}>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="rgba(255, 255, 255, 0.1)"
          strokeWidth="6"
          fill="none"
        />
        {/* Cercle de progression */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={isLowTime ? '#FF0000' : '#00FFFF'}
          strokeWidth="6"
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={circumference * (1 - percentage / 100)}
          strokeLinecap="round"
          className={`transition-all duration-100 ${isLowTime ? 'animate-pulse' : ''}`}
          style={{
            filter: isLowTime
              ? 'drop-shadow(0 0 15px #FF0000) drop-shadow(0 0 30px #FF0000)'
              : 'drop-shadow(0 0 15px #00FFFF) drop-shadow(0 0 30px #00FFFF)',
          }}
        />
      </svg>
      {/* Texte au centre */}
      <div className="absolute inset-0 flex items-center justify-center">
        <span
          className={`text-4xl sm:text-5xl md:text-6xl font-tech font-bold ${
            isLowTime ? 'text-red-500 animate-pulse' : 'text-neon-cyan'
          }`}
          style={{
            textShadow: isLowTime
              ? '0 0 15px #FF0000, 0 0 30px #FF0000'
              : '0 0 15px #00FFFF, 0 0 30px #00FFFF',
          }}
        >
          {active ? Math.ceil(timeRemaining) : (timeRemaining > 0 ? 'PRÊT ?' : '—')}
        </span>
      </div>
    </div>
  );
}
