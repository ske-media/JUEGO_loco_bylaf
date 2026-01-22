'use client';

import React from 'react';
import { useGame } from '@/context/GameContext';
import GameHub from '@/components/GameHub';
import PlayerSetup from '@/components/PlayerSetup';
import GameConfig from '@/components/GameConfig';
import GameScreen from '@/components/GameScreen';
import Button from '@/components/Button';

export default function Home() {
  const { state, goToHub } = useGame();

  // Hub central : point d'entrée arcade
  if (state.currentGame === 'hub') {
    return <GameHub />;
  }

  // Jeu des 5 Secondes
  if (state.currentGame === '5seconds') {
    // Étape 1 : Saisie des joueurs (si pas de joueurs)
    if (!state.gameStarted && state.players.length === 0) {
      return (
        <div>
          <PlayerSetup />
          <div className="fixed bottom-4 left-4 sm:bottom-6 sm:left-6 md:bottom-8 md:left-8 z-20">
            <Button onClick={goToHub} variant="danger" className="text-xs sm:text-sm px-3 sm:px-4 py-2 sm:py-2.5">
              ← Retour au Hub
            </Button>
          </div>
        </div>
      );
    }

    // Étape 2 : Configuration (si joueurs ajoutés)
    if (!state.gameStarted && state.players.length > 0) {
      return (
        <div>
          <GameConfig />
          <div className="fixed bottom-4 left-4 sm:bottom-6 sm:left-6 md:bottom-8 md:left-8 z-20">
            <Button onClick={goToHub} variant="danger" className="text-xs sm:text-sm px-3 sm:px-4 py-2 sm:py-2.5">
              ← Retour au Hub
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
            <Button onClick={goToHub} variant="danger" className="text-xs sm:text-sm px-3 sm:px-4 py-2 sm:py-2.5">
              Reset
            </Button>
          </div>
        </div>
      );
    }
  }

  return null;
}
