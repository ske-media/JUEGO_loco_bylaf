'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useGame } from '@/context/GameContext';
import Button from './Button';

export default function PlayerSetup() {
  const { state, addPlayer, removePlayer, startGame } = useGame();
  const [playerName, setPlayerName] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const handleAddPlayer = () => {
    const trimmed = playerName.trim();
    if (trimmed && trimmed.length > 0 && trimmed.length <= 30) {
      addPlayer(trimmed);
      setPlayerName('');
      // Remettre le focus sur l'input après avoir ajouté un joueur
      setTimeout(() => {
        inputRef.current?.focus();
      }, 0);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // Cmd+Enter (Mac) ou Ctrl+Enter (Windows/Linux) pour lancer la partie
    if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
      e.preventDefault();
      if (state.players.length >= 2) {
        startGame();
      }
      return;
    }
    
    // Enter simple pour ajouter le joueur
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddPlayer();
    }
  };

  // Focus automatique sur l'input au montage du composant
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 relative overflow-hidden">
      {/* Effet de scanline gaming */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-orange-neon/5 to-transparent animate-scanline"></div>
      </div>

      <div className="relative z-10 w-full max-w-3xl px-4 sm:px-6">
        {/* Titre avec style gaming orange */}
        <div className="text-center mb-6 sm:mb-8 md:mb-10">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-gaming font-black text-orange-neon mb-4 sm:mb-6 text-center animate-pulse-orange leading-tight">
            QUI EST DANS LA PUTAIN DE PARTIE ?
          </h1>
          <div className="inline-block px-4 sm:px-6 py-2 sm:py-3 gaming-card border-orange-neon">
            <span className="text-orange-bright font-gaming font-bold text-xs sm:text-sm uppercase tracking-widest">
              👥 AJOUTE TES JOUEURS
            </span>
          </div>
        </div>

        <div className="gaming-card gaming-card-hover border-orange-neon p-5 sm:p-6 md:p-8 rounded-2xl mb-6 sm:mb-8">
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-5 sm:mb-6">
            <input
              ref={inputRef}
              type="text"
              value={playerName}
              onChange={(e) => {
                const value = e.target.value;
                if (value.length <= 30) {
                  setPlayerName(value);
                }
              }}
              onKeyDown={handleKeyPress}
              placeholder="Nom du joueur... (Enter pour ajouter, Cmd+Enter pour lancer)"
              maxLength={30}
              className="flex-1 bg-dark-surface border-2 border-orange-neon/50 text-white px-4 sm:px-5 py-3 sm:py-3.5 text-sm sm:text-base focus:outline-none focus:border-orange-neon focus:glow-orange-soft font-mono rounded-lg transition-all"
            />
            <Button 
              onClick={handleAddPlayer} 
              disabled={!playerName.trim() || state.players.length >= 20}
              variant="orange"
              className="w-full sm:w-auto text-sm sm:text-base px-6 sm:px-8 py-3 sm:py-3.5"
            >
              ➕ Ajouter
            </Button>
          </div>

          {state.players.length > 0 && (
            <div className="space-y-3 sm:space-y-4">
              <div className="flex items-center gap-2 mb-3 sm:mb-4">
                <div className="w-2 h-2 bg-orange-neon rounded-full animate-pulse-orange"></div>
                <h2 className="text-lg sm:text-xl md:text-2xl font-gaming text-orange-neon">
                  Joueurs ({state.players.length})
                </h2>
              </div>
              <div className="space-y-2 sm:space-y-3">
                {state.players.map((player, index) => (
                  <div
                    key={player.id}
                    className="flex items-center justify-between gaming-card border-orange-bright/50 p-3 sm:p-4 hover:border-orange-neon hover:glow-orange-soft transition-all rounded-lg"
                  >
                    <span className="text-white font-mono text-sm sm:text-base md:text-lg truncate flex-1 mr-3">
                      <span className="text-orange-neon font-bold mr-2">{index + 1}.</span>
                      {player.name}
                    </span>
                    <button
                      onClick={() => removePlayer(player.id)}
                      className="text-red-500 hover:text-red-400 hover:bg-red-500/10 font-bold text-xl sm:text-2xl flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded transition-all"
                      aria-label="Supprimer joueur"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {state.players.length === 0 && (
            <div className="text-center py-8 sm:py-10">
              <p className="text-gray-400 font-mono text-sm sm:text-base md:text-lg">
                Ajoute au moins 2 joueurs pour commencer
              </p>
            </div>
          )}
        </div>

        <div className="text-center px-4">
          <Button
            onClick={startGame}
            variant="orange"
            disabled={state.players.length < 2}
            className="text-base sm:text-lg md:text-xl lg:text-2xl px-6 sm:px-8 md:px-10 lg:px-12 py-3 sm:py-3.5 md:py-4 w-full sm:w-auto"
          >
            <span className="block sm:inline">🚀 C'est parti, on lance les couilles !</span>
          </Button>
          {state.players.length < 2 && (
            <p className="text-orange-bright mt-4 font-mono text-sm sm:text-base">
              Minimum 2 joueurs requis
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
