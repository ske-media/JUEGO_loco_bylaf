'use client';

import React, { useEffect, useState } from 'react';
import { useGame } from '@/context/GameContext';
import Button from './Button';
import Timer from './Timer';

export default function GameScreen() {
  const { state, loadQuestion, answerQuestion } = useGame();
  const [showGlitch, setShowGlitch] = useState(false);
  const [showTimeUp, setShowTimeUp] = useState(false);
  const currentPlayer = state.players[state.currentPlayerIndex];

  // Charger une question au démarrage ou quand il n'y en a pas
  useEffect(() => {
    if (!state.currentQuestion && state.gameStarted && state.players.length > 0) {
      loadQuestion();
    }
  }, [state.currentQuestion, state.gameStarted, state.players.length, loadQuestion]);

  // Le timer est maintenant géré automatiquement par loadQuestion dans le Context
  // Plus besoin de ce useEffect

  useEffect(() => {
    // Effet glitch au changement de joueur
    setShowGlitch(true);
    const timer = setTimeout(() => setShowGlitch(false), 300);
    return () => clearTimeout(timer);
  }, [state.currentPlayerIndex]);

  // Gérer l'affichage du message "TEMPS ÉCOULÉ"
  useEffect(() => {
    if (state.timeRemaining === 0 && !state.timerActive && state.currentQuestion) {
      setShowTimeUp(true);
      const timer = setTimeout(() => {
        setShowTimeUp(false);
      }, 2000); // Afficher pendant 2 secondes
      return () => clearTimeout(timer);
    } else {
      setShowTimeUp(false);
    }
  }, [state.timeRemaining, state.timerActive, state.currentQuestion]);

  const handleAnswer = (result: 'success' | 'failed' | 'skip') => {
    answerQuestion(result);
  };

  const handleNextQuestion = () => {
    if (!state.gameStarted || state.players.length === 0) {
      return;
    }
    loadQuestion();
    // Le timer sera démarré automatiquement par l'effet
  };

  if (!currentPlayer || !state.gameStarted || state.players.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-neon-cyan text-2xl font-tech">Aucun joueur disponible</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col p-4 sm:p-6 md:p-8 relative overflow-hidden">
      {/* Effet de scanline */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-neon-cyan/5 to-transparent animate-scanline"></div>
      </div>

      {/* Bandeau du joueur actuel */}
      <div className="relative z-10 mb-4 sm:mb-6 md:mb-8">
        <div className="bg-dark-card border-2 border-neon-cyan p-3 sm:p-4 md:p-6 glow-cyan rounded">
          <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-tech font-bold text-center leading-tight">
            <span className="text-white">C'est à </span>
            <span className="text-neon-cyan animate-pulse-neon break-words">{currentPlayer.name}</span>
            <span className="text-white"> de se bouger le cul !</span>
          </h2>
        </div>
      </div>

      {/* Score Board (si mode compétition) */}
      {state.config.competitiveMode && (
        <div className="absolute top-2 right-2 sm:top-4 sm:right-4 md:top-8 md:right-8 z-10">
          <div className="bg-dark-card border-2 border-neon-magenta p-2 sm:p-3 md:p-4 glow-magenta rounded max-w-[120px] sm:max-w-[150px] md:max-w-none">
            <h3 className="text-sm sm:text-base md:text-lg lg:text-xl font-tech text-neon-magenta mb-2 sm:mb-3">SCORES</h3>
            <div className="space-y-1 sm:space-y-2">
              {state.players
                .sort((a, b) => b.score - a.score)
                .map((player) => (
                  <div
                    key={player.id}
                    className={`flex justify-between font-mono text-xs sm:text-sm md:text-base ${
                      player.id === currentPlayer.id
                        ? 'text-neon-cyan'
                        : 'text-gray-300'
                    }`}
                  >
                    <span className="truncate mr-2">{player.name}</span>
                    <span className="flex-shrink-0">{player.score}</span>
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}

      {/* Contenu principal */}
      <div className="flex-1 flex flex-col items-center justify-center relative z-10 px-2 sm:px-4">
        {/* Timer */}
        {state.config.timerDuration !== null && (
          <div className="mb-6 sm:mb-8 md:mb-12">
            <Timer
              duration={state.config.timerDuration}
              timeRemaining={state.timeRemaining}
              active={state.timerActive}
            />
          </div>
        )}

        {/* Message temps écoulé */}
        {showTimeUp && (
          <div className="text-center mb-4 sm:mb-6 animate-pulse">
            <p className="text-red-500 text-xl sm:text-2xl md:text-3xl font-tech font-bold">
              TEMPS ÉCOULÉ, ESPÈCE DE LENT !
            </p>
          </div>
        )}

        {/* Question */}
        {state.currentQuestion ? (
          <div
            className={`text-center mb-6 sm:mb-8 md:mb-12 max-w-4xl px-2 ${
              showGlitch ? 'animate-glitch' : ''
            }`}
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-tech font-bold text-neon-cyan leading-tight text-center">
              {state.currentQuestion.prompt}
            </h1>
          </div>
        ) : (
          <div className="text-center mb-6 sm:mb-8 md:mb-12 max-w-4xl px-2">
            <p className="text-red-500 text-lg sm:text-xl md:text-2xl font-tech">
              Aucune question disponible avec les filtres sélectionnés.
            </p>
            <p className="text-gray-400 text-sm sm:text-base md:text-lg font-mono mt-3 sm:mt-4">
              Change les thèmes dans la configuration.
            </p>
          </div>
        )}

        {/* Boutons d'action */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 md:gap-6 w-full max-w-3xl">
          <Button
            onClick={() => handleAnswer('success')}
            variant="cyan"
            className="flex-1 text-sm sm:text-base md:text-lg lg:text-xl py-4 sm:py-5 md:py-6 min-h-[48px] sm:min-h-[56px]"
          >
            <span className="block sm:inline">RÉUSSI</span>
            <span className="block sm:inline text-xs sm:text-sm opacity-75">(Bien joué, connard)</span>
          </Button>
          <Button
            onClick={() => handleAnswer('failed')}
            variant="danger"
            className="flex-1 text-sm sm:text-base md:text-lg lg:text-xl py-4 sm:py-5 md:py-6 min-h-[48px] sm:min-h-[56px]"
          >
            <span className="block sm:inline">RATÉ</span>
            <span className="block sm:inline text-xs sm:text-sm opacity-75">(T'es une merde)</span>
          </Button>
          <Button
            onClick={() => handleAnswer('skip')}
            variant="magenta"
            className="flex-1 text-sm sm:text-base md:text-lg lg:text-xl py-4 sm:py-5 md:py-6 min-h-[48px] sm:min-h-[56px]"
          >
            <span className="block sm:inline">PASSER</span>
            <span className="block sm:inline text-xs sm:text-sm opacity-75">(Question de merde)</span>
          </Button>
        </div>

        {/* Bouton pour nouvelle question (optionnel) */}
        <div className="mt-4 sm:mt-6 md:mt-8">
          <Button 
            onClick={handleNextQuestion} 
            variant="magenta" 
            className="text-sm sm:text-base md:text-lg px-4 sm:px-6 py-2.5 sm:py-3"
          >
            Nouvelle Question
          </Button>
        </div>
      </div>
    </div>
  );
}
