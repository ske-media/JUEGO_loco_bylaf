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
      {/* Effet de scanline */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-neon-cyan/5 to-transparent animate-scanline"></div>
      </div>

      <div className="relative z-10 w-full max-w-2xl px-4 sm:px-6">
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-tech font-bold text-neon-cyan mb-4 sm:mb-6 text-center animate-pulse-neon leading-tight">
          QUI EST DANS LA PUTAIN DE PARTIE ?
        </h1>

        <div className="bg-dark-card border-2 border-neon-cyan p-4 sm:p-6 md:p-8 rounded-lg glow-cyan mb-6 sm:mb-8">
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-4 sm:mb-6">
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
              className="flex-1 bg-dark-bg border-2 border-neon-cyan text-white px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base focus:outline-none focus:glow-cyan font-mono"
            />
            <Button 
              onClick={handleAddPlayer} 
              disabled={!playerName.trim() || state.players.length >= 20}
              className="w-full sm:w-auto text-sm sm:text-base px-4 sm:px-6 py-2.5 sm:py-3"
            >
              Ajouter
            </Button>
          </div>

          {state.players.length > 0 && (
            <div className="space-y-2 sm:space-y-3">
              <h2 className="text-lg sm:text-xl md:text-2xl font-tech text-neon-magenta mb-3 sm:mb-4">
                Joueurs ({state.players.length})
              </h2>
              <div className="space-y-2">
                {state.players.map((player, index) => (
                  <div
                    key={player.id}
                    className="flex items-center justify-between bg-dark-bg border-2 border-neon-magenta p-3 sm:p-4 hover:glow-magenta transition-all rounded"
                  >
                    <span className="text-white font-mono text-sm sm:text-base md:text-lg truncate flex-1 mr-2">
                      {index + 1}. {player.name}
                    </span>
                    <button
                      onClick={() => removePlayer(player.id)}
                      className="text-red-500 hover:text-red-400 font-bold text-xl sm:text-2xl flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center"
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
            <p className="text-gray-400 text-center py-6 sm:py-8 font-mono text-sm sm:text-base">
              Ajoute au moins 2 joueurs pour commencer
            </p>
          )}
        </div>

        <div className="text-center px-4">
          <Button
            onClick={startGame}
            variant="magenta"
            disabled={state.players.length < 2}
            className="text-base sm:text-lg md:text-xl lg:text-2xl px-6 sm:px-8 md:px-10 lg:px-12 py-3 sm:py-3.5 md:py-4 w-full sm:w-auto"
          >
            <span className="block sm:inline">C'est parti, on lance les couilles !</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
