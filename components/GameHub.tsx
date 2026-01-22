'use client';

import React, { useState, useEffect } from 'react';
import { useGame } from '@/context/GameContext';

export default function GameHub() {
  const { selectGame } = useGame();
  const [isHovered, setIsHovered] = useState(false);

  // Effet de particules animées
  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    delay: Math.random() * 3,
    duration: 3 + Math.random() * 2,
  }));

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-6 md:p-8 lg:p-12 relative overflow-hidden">
      {/* Effet de scanline arcade */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-orange-neon/8 to-transparent animate-scanline"></div>
      </div>

      {/* Grille de fond arcade */}
      <div className="absolute inset-0 pointer-events-none z-0 opacity-20">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255, 107, 53, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255, 107, 53, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
          }}
        ></div>
      </div>

      {/* Particules d'énergie arcade */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="absolute w-1 h-1 bg-orange-neon rounded-full animate-float opacity-60 glow-orange-soft"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${particle.delay}s`,
              animationDuration: `${particle.duration}s`,
            }}
          ></div>
        ))}
      </div>

      {/* Structure principale arcade */}
      <div className="relative z-10 w-full max-w-6xl">
        {/* En-tête arcade avec effet machine */}
        <div className="text-center mb-8 sm:mb-12 md:mb-16">
          {/* Barre supérieure de la machine */}
          <div className="arcade-machine rounded-t-2xl p-4 sm:p-6 md:p-8 mb-4 sm:mb-6">
            <div className="flex items-center justify-center gap-4 sm:gap-6 mb-4">
              {/* LED clignotantes */}
              <div className="flex gap-2">
                <div className="w-3 h-3 bg-orange-neon rounded-full animate-blink glow-orange-soft"></div>
                <div className="w-3 h-3 bg-orange-bright rounded-full animate-blink glow-orange-soft" style={{ animationDelay: '0.3s' }}></div>
                <div className="w-3 h-3 bg-orange-glow rounded-full animate-blink glow-orange-soft" style={{ animationDelay: '0.6s' }}></div>
              </div>
              
              {/* Titre principal arcade */}
              <h1 className="arcade-title text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-gaming font-black text-orange-neon leading-tight">
                <span className="block">LA BOÎTE</span>
                <span className="block text-orange-bright text-3xl sm:text-4xl md:text-5xl lg:text-6xl mt-2">À JEUX</span>
              </h1>
              
              {/* LED clignotantes */}
              <div className="flex gap-2">
                <div className="w-3 h-3 bg-orange-glow rounded-full animate-blink glow-orange-soft" style={{ animationDelay: '0.9s' }}></div>
                <div className="w-3 h-3 bg-orange-bright rounded-full animate-blink glow-orange-soft" style={{ animationDelay: '1.2s' }}></div>
                <div className="w-3 h-3 bg-orange-neon rounded-full animate-blink glow-orange-soft" style={{ animationDelay: '1.5s' }}></div>
              </div>
            </div>
            
            {/* Sous-titre avec style arcade */}
            <div className="inline-block px-6 sm:px-8 py-3 sm:py-4 gaming-card border-orange-neon rounded-xl">
              <span className="text-orange-glow font-gaming font-bold text-base sm:text-lg md:text-xl uppercase tracking-[0.2em] animate-energy-pulse">
                ⚡ BY LAFLÛTE ⚡ ARCADE MODE ⚡
              </span>
            </div>
          </div>
        </div>

        {/* Zone de jeux avec style machine arcade */}
        <div className="arcade-machine rounded-2xl p-6 sm:p-8 md:p-10 lg:p-12">
          {/* Titre de section */}
          <div className="text-center mb-8 sm:mb-10 md:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-gaming font-bold text-orange-bright mb-2">
              🎮 SÉLECTIONNE TON JEU 🎮
            </h2>
            <div className="h-1 bg-gradient-orange mx-auto max-w-md rounded-full"></div>
          </div>

          {/* Grille de jeux arcade */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 md:gap-10">
            {/* Carte jeu : Le Jeu des 5 Secondes - Style bouton arcade géant */}
            <button
              type="button"
              onClick={() => selectGame('5seconds')}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              className="group arcade-button rounded-2xl p-6 sm:p-8 md:p-10 lg:p-12 relative overflow-hidden focus:outline-none focus:ring-4 focus:ring-orange-neon focus:ring-offset-4 focus:ring-offset-dark-bg transform transition-all duration-300"
            >
              {/* Effet de brillance animée */}
              <div className="absolute inset-0 bg-gradient-orange opacity-0 group-hover:opacity-20 transition-opacity duration-500"></div>
              
              {/* Effet de scanline sur la carte */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-orange-neon/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              <div className="relative z-10">
                {/* Badge "POPULAR" */}
                <div className="absolute top-4 right-4 sm:top-6 sm:right-6">
                  <div className="bg-orange-neon text-dark-bg px-3 sm:px-4 py-1 sm:py-2 rounded-full font-gaming font-bold text-xs sm:text-sm uppercase tracking-wider animate-bounce-arcade glow-orange-intense">
                    🔥 POPULAR
                  </div>
                </div>

                {/* Numéro de jeu style arcade */}
                <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 bg-orange-neon rounded-full flex items-center justify-center glow-orange-intense animate-pulse-orange">
                    <span className="text-dark-bg font-gaming font-black text-xl sm:text-2xl">01</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-gaming font-black text-orange-neon group-hover:text-orange-bright transition-colors duration-300 uppercase">
                    LE JEU DES 5 SECONDES
                  </h2>
                </div>

                {/* Description */}
                <p className="text-gray-300 font-mono text-sm sm:text-base md:text-lg leading-relaxed mb-6 sm:mb-8">
                  Cite 3, 4 ou 5 trucs avant que le putain de timer explose. Convivialité garantie.
                </p>

                {/* Bouton d'action arcade */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 text-orange-bright font-gaming font-bold text-base sm:text-lg md:text-xl group-hover:text-orange-glow transition-colors">
                    <span className="text-2xl sm:text-3xl animate-pulse-orange">▶</span>
                    <span className="uppercase tracking-wider">JOUER</span>
                    <span className="text-2xl sm:text-3xl group-hover:translate-x-2 transition-transform duration-300">→</span>
                  </div>
                  
                  {/* Indicateur de difficulté style arcade */}
                  <div className="flex items-center gap-1">
                    <span className="text-orange-neon font-gaming text-xs sm:text-sm">DIFFICULTÉ:</span>
                    <div className="flex gap-1">
                      {[1, 2, 3].map((level) => (
                        <div
                          key={level}
                          className="w-2 h-2 sm:w-3 sm:h-3 bg-orange-neon rounded-full glow-orange-soft"
                        ></div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </button>

            {/* Carte jeu : À venir - Style machine en maintenance */}
            <div
              role="presentation"
              className="gaming-card p-6 sm:p-8 md:p-10 lg:p-12 rounded-2xl opacity-60 cursor-not-allowed border-gray-700 relative overflow-hidden"
            >
              {/* Effet de maintenance */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-700/10 to-transparent animate-scanline"></div>
              
              <div className="relative z-10">
                {/* Badge "COMING SOON" */}
                <div className="absolute top-4 right-4 sm:top-6 sm:right-6">
                  <div className="bg-gray-700 text-gray-400 px-3 sm:px-4 py-1 sm:py-2 rounded-full font-gaming font-bold text-xs sm:text-sm uppercase tracking-wider">
                    🔒 SOON
                  </div>
                </div>

                {/* Numéro de jeu */}
                <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gray-700 rounded-full flex items-center justify-center">
                    <span className="text-gray-500 font-gaming font-black text-xl sm:text-2xl">02</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-gaming font-black text-gray-500 uppercase">
                    LE POST-IT BORDEL
                  </h2>
                </div>

                {/* Description */}
                <p className="text-gray-500 font-mono text-sm sm:text-base md:text-lg leading-relaxed mb-6 sm:mb-8">
                  EN COURS DE DÉVELOPPEMENT, PATIENTE UN PEU, MERDE.
                </p>

                {/* Indicateur de maintenance */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-gray-600 font-gaming text-base sm:text-lg md:text-xl">
                    <span className="text-2xl sm:text-3xl">🔒</span>
                    <span className="uppercase tracking-wider">Bientôt disponible</span>
                  </div>
                  
                  {/* Barre de progression fictive */}
                  <div className="flex items-center gap-1">
                    <div className="w-16 sm:w-24 h-2 bg-gray-800 rounded-full overflow-hidden">
                      <div className="h-full bg-gray-700 rounded-full" style={{ width: '45%' }}></div>
                    </div>
                    <span className="text-gray-600 font-gaming text-xs sm:text-sm">45%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer arcade avec instructions */}
          <div className="mt-8 sm:mt-10 md:mt-12 pt-6 sm:pt-8 border-t-2 border-orange-neon/30">
            <div className="text-center">
              <p className="text-gray-400 font-mono text-xs sm:text-sm md:text-base">
                💡 <span className="text-orange-bright">Astuce:</span> Utilise les boutons pour naviguer dans les jeux
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
