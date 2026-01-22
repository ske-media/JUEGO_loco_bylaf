'use client';

import React, { useState, useEffect } from 'react';
import { useGame } from '@/context/GameContext';
import GameHub from '@/components/GameHub';
import PlayerSetup from '@/components/PlayerSetup';
import GameConfig from '@/components/GameConfig';
import GameScreen from '@/components/GameScreen';
import Button from '@/components/Button';

export default function Home() {
  const { state, goToHub } = useGame();
  const [showConfig, setShowConfig] = useState(false);

  // Réinitialiser showConfig quand on change de jeu ou quand le jeu démarre
  useEffect(() => {
    if (state.currentGame !== '5seconds' || state.gameStarted) {
      setShowConfig(false);
    }
  }, [state.currentGame, state.gameStarted]);

  // Hub central : point d'entrée arcade
  if (state.currentGame === 'hub') {
    return <GameHub />;
  }

  // Jeu des 5 Secondes
  if (state.currentGame === '5seconds') {
    // Étape 1 : Saisie des joueurs ou Configuration
    if (!state.gameStarted) {
      // Si on a moins de 2 joueurs, on reste forcément sur PlayerSetup
      if (state.players.length < 2) {
        return (
          <div>
            <PlayerSetup onGoToConfig={() => setShowConfig(true)} />
            <div className="fixed bottom-4 left-4 sm:bottom-6 sm:left-6 md:bottom-8 md:left-8 z-20">
              <Button onClick={goToHub} variant="danger" className="text-xs sm:text-sm px-3 sm:px-4 py-2 sm:py-2.5">
                ← Retour au Hub
              </Button>
            </div>
          </div>
        );
      }
      
      // Si on a au moins 2 joueurs, on peut naviguer entre PlayerSetup et GameConfig
      if (showConfig) {
        return (
          <div>
            <GameConfig onBackToPlayers={() => setShowConfig(false)} />
            <div className="fixed bottom-4 left-4 sm:bottom-6 sm:left-6 md:bottom-8 md:left-8 z-20">
              <Button onClick={goToHub} variant="danger" className="text-xs sm:text-sm px-3 sm:px-4 py-2 sm:py-2.5">
                ← Retour au Hub
              </Button>
            </div>
          </div>
        );
      }
      
      // Par défaut, on affiche PlayerSetup avec possibilité d'aller aux réglages
      return (
        <div>
          <PlayerSetup onGoToConfig={() => setShowConfig(true)} />
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
