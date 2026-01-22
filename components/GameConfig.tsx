'use client';

import React from 'react';
import { useGame } from '@/context/GameContext';
import Button from './Button';

const THEMES = ['Culture G', 'Sexe', 'WTF'];

export default function GameConfig() {
  const { state, updateConfig, startGame } = useGame();

  const handleThemeToggle = (theme: string) => {
    const currentThemes = state.config.selectedThemes;
    if (currentThemes.includes(theme)) {
      updateConfig({
        selectedThemes: currentThemes.filter((t) => t !== theme),
      });
    } else {
      updateConfig({
        selectedThemes: [...currentThemes, theme],
      });
    }
  };

  const handleStart = () => {
    if (state.players.length < 2) {
      return;
    }
    startGame();
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 relative overflow-hidden">
      {/* Effet de scanline */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-neon-magenta/5 to-transparent animate-scanline"></div>
      </div>

      <div className="relative z-10 w-full max-w-3xl px-4 sm:px-6">
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-tech font-bold text-neon-magenta mb-6 sm:mb-8 text-center animate-pulse-neon leading-tight">
          CONFIGURATION
        </h1>

        <div className="bg-dark-card border-2 border-neon-magenta p-4 sm:p-6 md:p-8 rounded-lg glow-magenta space-y-6 sm:space-y-8">
          {/* Durée du Timer */}
          <div>
            <h2 className="text-lg sm:text-xl md:text-2xl font-tech text-neon-cyan mb-3 sm:mb-4">Durée du Timer</h2>
            <div className="grid grid-cols-2 sm:flex gap-2 sm:gap-4">
              {[3, 5, 7].map((duration) => (
                <button
                  key={duration}
                  onClick={() => updateConfig({ timerDuration: duration })}
                  className={`px-4 sm:px-6 py-2.5 sm:py-3 border-2 font-bold transition-all text-sm sm:text-base ${
                    state.config.timerDuration === duration
                      ? 'border-neon-cyan text-neon-cyan glow-cyan bg-neon-cyan/10'
                      : 'border-gray-600 text-gray-400 hover:border-neon-cyan hover:text-neon-cyan'
                  }`}
                >
                  {duration}s
                </button>
              ))}
              <button
                onClick={() => updateConfig({ timerDuration: null })}
                className={`px-4 sm:px-6 py-2.5 sm:py-3 border-2 font-bold transition-all text-xs sm:text-sm md:text-base col-span-2 sm:col-span-1 ${
                  state.config.timerDuration === null
                    ? 'border-neon-cyan text-neon-cyan glow-cyan bg-neon-cyan/10'
                    : 'border-gray-600 text-gray-400 hover:border-neon-cyan hover:text-neon-cyan'
                }`}
              >
                <span className="block sm:inline">On s'en branle du temps</span>
              </button>
            </div>
          </div>

          {/* Quantité de Mots */}
          <div>
            <h2 className="text-lg sm:text-xl md:text-2xl font-tech text-neon-cyan mb-3 sm:mb-4">Quantité de Mots (N)</h2>
            <div className="flex gap-2 sm:gap-4">
              {[3, 4, 5].map((count) => (
                <button
                  key={count}
                  onClick={() => updateConfig({ wordsNeeded: count })}
                  className={`flex-1 sm:flex-none px-4 sm:px-6 py-2.5 sm:py-3 border-2 font-bold transition-all text-sm sm:text-base ${
                    state.config.wordsNeeded === count
                      ? 'border-neon-magenta text-neon-magenta glow-magenta bg-neon-magenta/10'
                      : 'border-gray-600 text-gray-400 hover:border-neon-magenta hover:text-neon-magenta'
                  }`}
                >
                  {count}
                </button>
              ))}
            </div>
          </div>

          {/* Filtrage des Thèmes */}
          <div>
            <h2 className="text-lg sm:text-xl md:text-2xl font-tech text-neon-cyan mb-3 sm:mb-4">Thèmes</h2>
            <div className="grid grid-cols-1 sm:flex gap-2 sm:gap-4">
              {THEMES.map((theme) => (
                <button
                  key={theme}
                  onClick={() => handleThemeToggle(theme)}
                  className={`px-4 sm:px-6 py-2.5 sm:py-3 border-2 font-bold transition-all text-sm sm:text-base ${
                    state.config.selectedThemes.includes(theme)
                      ? 'border-neon-cyan text-neon-cyan glow-cyan bg-neon-cyan/10'
                      : 'border-gray-600 text-gray-400 hover:border-neon-cyan hover:text-neon-cyan'
                  }`}
                >
                  {theme}
                </button>
              ))}
            </div>
            {state.config.selectedThemes.length === 0 && (
              <p className="text-gray-400 mt-2 font-mono text-xs sm:text-sm">
                Aucun thème sélectionné = tous les thèmes
              </p>
            )}
          </div>

          {/* Mode de Jeu */}
          <div>
            <h2 className="text-lg sm:text-xl md:text-2xl font-tech text-neon-cyan mb-3 sm:mb-4">Mode de Jeu</h2>
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
              <button
                onClick={() => updateConfig({ competitiveMode: false })}
                className={`px-4 sm:px-6 py-2.5 sm:py-3 border-2 font-bold transition-all flex-1 text-sm sm:text-base ${
                  !state.config.competitiveMode
                    ? 'border-neon-magenta text-neon-magenta glow-magenta bg-neon-magenta/10'
                    : 'border-gray-600 text-gray-400 hover:border-neon-magenta hover:text-neon-magenta'
                }`}
              >
                <span className="block sm:inline">Mode Ambiance</span>
                <span className="block sm:inline text-xs sm:text-sm opacity-75">(Pas de Points)</span>
              </button>
              <button
                onClick={() => updateConfig({ competitiveMode: true })}
                className={`px-4 sm:px-6 py-2.5 sm:py-3 border-2 font-bold transition-all flex-1 text-sm sm:text-base ${
                  state.config.competitiveMode
                    ? 'border-neon-cyan text-neon-cyan glow-cyan bg-neon-cyan/10'
                    : 'border-gray-600 text-gray-400 hover:border-neon-cyan hover:text-neon-cyan'
                }`}
              >
                <span className="block sm:inline">Mode Compétition</span>
                <span className="block sm:inline text-xs sm:text-sm opacity-75">(On Compte les Points)</span>
              </button>
            </div>
          </div>
        </div>

        <div className="text-center mt-6 sm:mt-8 px-4">
          <Button 
            onClick={handleStart} 
            variant="magenta" 
            className="text-base sm:text-lg md:text-xl lg:text-2xl px-6 sm:px-8 md:px-10 lg:px-12 py-3 sm:py-3.5 md:py-4 w-full sm:w-auto"
            disabled={state.players.length < 2}
          >
            Lancer la partie
          </Button>
          {state.players.length < 2 && (
            <p className="text-red-500 mt-3 sm:mt-4 font-mono text-xs sm:text-sm">
              Il faut au moins 2 joueurs pour commencer
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
