'use client';

import React from 'react';
import { useGame } from '@/context/GameContext';
import Button from './Button';

const THEMES = ['Culture G', 'Sexe', 'WTF'];

interface GameConfigProps {
  onBackToPlayers?: () => void;
}

export default function GameConfig({ onBackToPlayers }: GameConfigProps) {
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
      {/* Effet de scanline gaming */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-orange-neon/5 to-transparent animate-scanline"></div>
      </div>

      <div className="relative z-10 w-full max-w-4xl px-4 sm:px-6">
        {/* Titre avec style gaming orange */}
        <div className="text-center mb-6 sm:mb-8 md:mb-10">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-gaming font-black text-orange-neon mb-4 sm:mb-6 text-center animate-pulse-orange leading-tight">
            CONFIGURATION
          </h1>
          <div className="inline-block px-4 sm:px-6 py-2 sm:py-3 gaming-card border-orange-neon">
            <span className="text-orange-bright font-gaming font-bold text-xs sm:text-sm uppercase tracking-widest">
              ⚙️ PERSONNALISE TON JEU
            </span>
          </div>
        </div>

        <div className="gaming-card gaming-card-hover border-orange-neon p-5 sm:p-6 md:p-8 rounded-2xl space-y-6 sm:space-y-8">
          {/* Durée du Timer */}
          <div>
            <div className="flex items-center gap-2 mb-3 sm:mb-4">
              <div className="w-2 h-2 bg-orange-neon rounded-full animate-pulse-orange"></div>
              <h2 className="text-lg sm:text-xl md:text-2xl font-gaming text-orange-neon">⏱️ Durée du Timer</h2>
            </div>
            <div className="grid grid-cols-2 sm:flex gap-3 sm:gap-4">
              {[3, 5, 7].map((duration) => (
                <button
                  key={duration}
                  onClick={() => updateConfig({ timerDuration: duration })}
                  className={`px-4 sm:px-6 py-3 sm:py-4 border-2 font-gaming font-bold transition-all text-sm sm:text-base rounded-lg ${
                    state.config.timerDuration === duration
                      ? 'border-orange-neon text-orange-neon glow-orange bg-orange-neon/10'
                      : 'border-gray-600 text-gray-400 hover:border-orange-neon hover:text-orange-neon gaming-card-hover'
                  }`}
                >
                  {duration}s
                </button>
              ))}
              <button
                onClick={() => updateConfig({ timerDuration: null })}
                className={`px-4 sm:px-6 py-3 sm:py-4 border-2 font-gaming font-bold transition-all text-xs sm:text-sm md:text-base col-span-2 sm:col-span-1 rounded-lg ${
                  state.config.timerDuration === null
                    ? 'border-orange-neon text-orange-neon glow-orange bg-orange-neon/10'
                    : 'border-gray-600 text-gray-400 hover:border-orange-neon hover:text-orange-neon gaming-card-hover'
                }`}
              >
                <span className="block sm:inline">⏸️ On s'en branle du temps</span>
              </button>
            </div>
          </div>

          {/* Quantité de Mots */}
          <div>
            <div className="flex items-center gap-2 mb-3 sm:mb-4">
              <div className="w-2 h-2 bg-orange-bright rounded-full animate-pulse-orange"></div>
              <h2 className="text-lg sm:text-xl md:text-2xl font-gaming text-orange-neon">🔢 Quantité de Mots (N)</h2>
            </div>
            <div className="flex gap-3 sm:gap-4">
              {[3, 4, 5].map((count) => (
                <button
                  key={count}
                  onClick={() => updateConfig({ wordsNeeded: count })}
                  className={`flex-1 sm:flex-none px-6 sm:px-8 py-3 sm:py-4 border-2 font-gaming font-bold transition-all text-lg sm:text-xl rounded-lg ${
                    state.config.wordsNeeded === count
                      ? 'border-orange-bright text-orange-bright glow-orange-intense bg-orange-bright/10'
                      : 'border-gray-600 text-gray-400 hover:border-orange-bright hover:text-orange-bright gaming-card-hover'
                  }`}
                >
                  {count}
                </button>
              ))}
            </div>
          </div>

          {/* Filtrage des Thèmes */}
          <div>
            <div className="flex items-center gap-2 mb-3 sm:mb-4">
              <div className="w-2 h-2 bg-orange-glow rounded-full animate-pulse-orange"></div>
              <h2 className="text-lg sm:text-xl md:text-2xl font-gaming text-orange-neon">🎯 Thèmes</h2>
            </div>
            <div className="grid grid-cols-1 sm:flex gap-3 sm:gap-4">
              {THEMES.map((theme) => (
                <button
                  key={theme}
                  onClick={() => handleThemeToggle(theme)}
                  className={`px-4 sm:px-6 py-3 sm:py-4 border-2 font-gaming font-bold transition-all text-sm sm:text-base rounded-lg ${
                    state.config.selectedThemes.includes(theme)
                      ? 'border-orange-neon text-orange-neon glow-orange bg-orange-neon/10'
                      : 'border-gray-600 text-gray-400 hover:border-orange-neon hover:text-orange-neon gaming-card-hover'
                  }`}
                >
                  {theme}
                </button>
              ))}
            </div>
            {state.config.selectedThemes.length === 0 && (
              <p className="text-gray-400 mt-3 font-mono text-xs sm:text-sm">
                💡 Aucun thème sélectionné = tous les thèmes
              </p>
            )}
          </div>

          {/* Mode de Jeu */}
          <div>
            <div className="flex items-center gap-2 mb-3 sm:mb-4">
              <div className="w-2 h-2 bg-orange-neon rounded-full animate-pulse-orange"></div>
              <h2 className="text-lg sm:text-xl md:text-2xl font-gaming text-orange-neon">🎮 Mode de Jeu</h2>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <button
                onClick={() => updateConfig({ competitiveMode: false })}
                className={`px-4 sm:px-6 py-3 sm:py-4 border-2 font-gaming font-bold transition-all flex-1 text-sm sm:text-base rounded-lg ${
                  !state.config.competitiveMode
                    ? 'border-orange-bright text-orange-bright glow-orange-intense bg-orange-bright/10'
                    : 'border-gray-600 text-gray-400 hover:border-orange-bright hover:text-orange-bright gaming-card-hover'
                }`}
              >
                <span className="block sm:inline">😎 Mode Ambiance</span>
                <span className="block sm:inline text-xs sm:text-sm opacity-75">(Pas de Points)</span>
              </button>
              <button
                onClick={() => updateConfig({ competitiveMode: true })}
                className={`px-4 sm:px-6 py-3 sm:py-4 border-2 font-gaming font-bold transition-all flex-1 text-sm sm:text-base rounded-lg ${
                  state.config.competitiveMode
                    ? 'border-orange-neon text-orange-neon glow-orange bg-orange-neon/10'
                    : 'border-gray-600 text-gray-400 hover:border-orange-neon hover:text-orange-neon gaming-card-hover'
                }`}
              >
                <span className="block sm:inline">🏆 Mode Compétition</span>
                <span className="block sm:inline text-xs sm:text-sm opacity-75">(On Compte les Points)</span>
              </button>
            </div>
          </div>
        </div>

        <div className="text-center mt-6 sm:mt-8 px-4 space-y-4">
          {/* Bouton pour revenir ajouter des joueurs */}
          {onBackToPlayers && (
            <Button 
              onClick={onBackToPlayers} 
              variant="orange-dark" 
              className="text-base sm:text-lg md:text-xl px-6 sm:px-8 md:px-10 py-3 sm:py-3.5 md:py-4 w-full sm:w-auto"
            >
              <span className="block sm:inline">👥 Revenir aux joueurs</span>
            </Button>
          )}
          
          {/* Bouton pour lancer la partie */}
          <div>
            <Button 
              onClick={handleStart} 
              variant="orange" 
              className="text-base sm:text-lg md:text-xl lg:text-2xl px-6 sm:px-8 md:px-10 lg:px-12 py-3 sm:py-3.5 md:py-4 w-full sm:w-auto"
              disabled={state.players.length < 2}
            >
              🚀 Lancer la partie
            </Button>
            {state.players.length < 2 && (
              <p className="text-orange-bright mt-3 sm:mt-4 font-mono text-xs sm:text-sm">
              ⚠️ Il faut au moins 2 joueurs pour commencer
            </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
