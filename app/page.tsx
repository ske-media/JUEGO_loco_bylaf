'use client';

import React from 'react';
import { useGame } from '@/context/GameContext';
import PlayerSetup from '@/components/PlayerSetup';
import GameConfig from '@/components/GameConfig';
import GameScreen from '@/components/GameScreen';
import Button from '@/components/Button';

export default function Home() {
  const { state, resetGame } = useGame();

  // Étape 1 : Saisie des joueurs
  if (!state.gameStarted && state.players.length === 0) {
    return <PlayerSetup />;
  }

  // Étape 2 : Configuration (après avoir ajouté les joueurs mais avant de démarrer)
  if (!state.gameStarted && state.players.length > 0) {
    return (
      <div>
        <GameConfig />
        <div className="fixed bottom-4 left-4 sm:bottom-6 sm:left-6 md:bottom-8 md:left-8 z-20">
          <Button onClick={resetGame} variant="danger" className="text-xs sm:text-sm px-3 sm:px-4 py-2 sm:py-2.5">
            Retour aux joueurs
          </Button>
        </div>
      </div>
    );
  }

  // Étape 3 : Le jeu
  if (state.gameStarted) {
    return (
      <div>
        <GameScreen />
        <div className="fixed bottom-4 left-4 sm:bottom-6 sm:left-6 md:bottom-8 md:left-8 z-20">
          <Button onClick={resetGame} variant="danger" className="text-xs sm:text-sm px-3 sm:px-4 py-2 sm:py-2.5">
            Reset
          </Button>
        </div>
      </div>
    );
  }

  return null;
}
