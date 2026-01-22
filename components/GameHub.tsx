'use client';

import React from 'react';
import { useGame } from '@/context/GameContext';

export default function GameHub() {
  const { selectGame } = useGame();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 sm:p-8 md:p-12 relative overflow-hidden">
      {/* Effet de scanline */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-neon-magenta/5 to-transparent animate-scanline" />
      </div>

      <div className="relative z-10 w-full max-w-4xl">
        {/* Titre principal */}
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-tech font-bold text-neon-magenta mb-8 sm:mb-12 md:mb-16 text-center animate-pulse-neon leading-tight">
          LA BOÎTE À JEUX BY LAFLÛTE — ARCADE MODE
        </h1>

        {/* Grille de jeux */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
          {/* Carte : Le Jeu des 5 Secondes */}
          <button
            type="button"
            onClick={() => selectGame('5seconds')}
            className="group text-left bg-dark-card border-2 border-neon-cyan p-6 sm:p-8 rounded-lg glow-cyan hover:border-neon-magenta hover:glow-magenta transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-neon-magenta focus:ring-offset-2 focus:ring-offset-dark-bg"
          >
            <h2 className="text-xl sm:text-2xl md:text-3xl font-tech font-bold text-neon-cyan group-hover:text-neon-magenta mb-3 sm:mb-4 transition-colors">
              LE JEU DES 5 SECONDES
            </h2>
            <p className="text-gray-300 font-mono text-sm sm:text-base md:text-lg leading-relaxed">
              Cite 3, 4 ou 5 trucs avant que le putain de timer explose. Convivialité garantie.
            </p>
            <span className="inline-block mt-4 sm:mt-6 text-neon-magenta font-tech font-bold text-sm sm:text-base group-hover:animate-pulse">
              JOUER →
            </span>
          </button>

          {/* Carte : À venir (désactivée) */}
          <div
            role="presentation"
            className="bg-dark-card border-2 border-gray-600 p-6 sm:p-8 rounded-lg opacity-60 cursor-not-allowed"
          >
            <h2 className="text-xl sm:text-2xl md:text-3xl font-tech font-bold text-gray-500 mb-3 sm:mb-4">
              JEU N°2 : LE POST-IT BORDEL
            </h2>
            <p className="text-gray-500 font-mono text-sm sm:text-base md:text-lg leading-relaxed mb-4">
              EN COURS DE DÉVELOPPEMENT, PATIENTE UN PEU, MERDE.
            </p>
            <span className="inline-block text-gray-600 font-tech text-sm sm:text-base">
              Bientôt…
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
