'use client';

import React, { createContext, useContext, useReducer, useEffect, useCallback } from 'react';
import { GameState, GameSelection, Player, Question, GameConfig } from '@/types';
import questionsData from '@/data/questions-5s.json';

interface GameContextType {
  state: GameState;
  addPlayer: (name: string) => void;
  removePlayer: (id: string) => void;
  updateConfig: (config: Partial<GameConfig>) => void;
  startGame: () => void;
  getNextQuestion: () => Question | null;
  loadQuestion: () => void;
  startTimer: () => void;
  answerQuestion: (result: 'success' | 'failed' | 'skip') => void;
  resetToSetup: () => void;
  goToHub: () => void;
  selectGame: (game: GameSelection) => void;
}

const initialState: GameState = {
  currentGame: 'hub',
  players: [],
  currentPlayerIndex: 0,
  currentQuestion: null,
  config: {
    timerDuration: 5,
    wordsNeeded: 3,
    selectedThemes: [],
    competitiveMode: false,
  },
  gameStarted: false,
  timerActive: false,
  timeRemaining: 5,
};

type GameAction =
  | { type: 'ADD_PLAYER'; payload: Player }
  | { type: 'REMOVE_PLAYER'; payload: string }
  | { type: 'UPDATE_CONFIG'; payload: Partial<GameConfig> }
  | { type: 'START_GAME' }
  | { type: 'SET_QUESTION'; payload: Question | null }
  | { type: 'NEXT_PLAYER' }
  | { type: 'UPDATE_SCORE'; payload: { playerId: string; points: number } }
  | { type: 'START_TIMER' }
  | { type: 'STOP_TIMER' }
  | { type: 'TICK_TIMER' }
  | { type: 'RESET_GAME' }
  | { type: 'RESET_TO_SETUP' }
  | { type: 'TIME_UP' }
  | { type: 'SELECT_GAME'; payload: GameSelection }
  | { type: 'GO_TO_HUB' };

function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case 'ADD_PLAYER':
      return {
        ...state,
        players: [...state.players, action.payload],
      };
    case 'REMOVE_PLAYER':
      const remainingPlayers = state.players.filter((p) => p.id !== action.payload);
      // Ajuster l'index du joueur actuel si nécessaire
      let newPlayerIndex = state.currentPlayerIndex;
      if (remainingPlayers.length > 0) {
        // Si on supprime un joueur avant l'index actuel, on décrémente
        const removedIndex = state.players.findIndex((p) => p.id === action.payload);
        if (removedIndex < state.currentPlayerIndex) {
          newPlayerIndex = Math.max(0, state.currentPlayerIndex - 1);
        } else if (removedIndex === state.currentPlayerIndex && state.currentPlayerIndex >= remainingPlayers.length) {
          // Si on supprime le joueur actuel, on revient au début
          newPlayerIndex = 0;
        }
        newPlayerIndex = Math.min(newPlayerIndex, remainingPlayers.length - 1);
      } else {
        newPlayerIndex = 0;
      }
      return {
        ...state,
        players: remainingPlayers,
        currentPlayerIndex: newPlayerIndex,
      };
    case 'UPDATE_CONFIG':
      return {
        ...state,
        config: { ...state.config, ...action.payload },
      };
    case 'START_GAME':
      // Vérifier qu'il y a au moins 2 joueurs
      if (state.players.length < 2) {
        return state;
      }
      // Randomiser l'ordre des joueurs (algorithme Fisher-Yates amélioré)
      const shuffledPlayers = [...state.players];
      for (let i = shuffledPlayers.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledPlayers[i], shuffledPlayers[j]] = [shuffledPlayers[j], shuffledPlayers[i]];
      }
      return {
        ...state,
        players: shuffledPlayers,
        gameStarted: true,
        currentPlayerIndex: 0,
        currentQuestion: null,
        timerActive: false,
        timeRemaining: state.config.timerDuration || 0,
      };
    case 'SET_QUESTION':
      return {
        ...state,
        currentQuestion: action.payload,
        timeRemaining: action.payload && state.config.timerDuration !== null 
          ? state.config.timerDuration 
          : state.timeRemaining,
        timerActive: false, // Réinitialiser le timer quand on change de question
      };
    case 'NEXT_PLAYER':
      if (state.players.length === 0) {
        return state;
      }
      return {
        ...state,
        currentPlayerIndex: (state.currentPlayerIndex + 1) % state.players.length,
      };
    case 'UPDATE_SCORE':
      return {
        ...state,
        players: state.players.map((p) =>
          p.id === action.payload.playerId
            ? { ...p, score: p.score + action.payload.points }
            : p
        ),
      };
    case 'START_TIMER':
      return {
        ...state,
        timerActive: true,
        timeRemaining: state.config.timerDuration || 0,
      };
    case 'STOP_TIMER':
      return {
        ...state,
        timerActive: false,
      };
    case 'TICK_TIMER':
      return {
        ...state,
        timeRemaining: Math.max(0, state.timeRemaining - 0.1),
      };
    case 'RESET_GAME':
      return {
        ...initialState,
        currentGame: state.currentGame,
        players: state.players.map((p) => ({ ...p, score: 0 })),
        config: state.config,
        timerActive: false,
        timeRemaining: state.config.timerDuration || 0,
      };
    case 'RESET_TO_SETUP':
      return {
        ...initialState,
        currentGame: state.currentGame,
      };
    case 'SELECT_GAME':
      return {
        ...state,
        currentGame: action.payload,
      };
    case 'GO_TO_HUB':
      return {
        ...initialState,
        currentGame: 'hub',
      };
    case 'TIME_UP':
      // Quand le temps est écoulé, on considère la réponse comme "failed"
      if (state.players.length === 0) {
        return state;
      }
      return {
        ...state,
        currentPlayerIndex: (state.currentPlayerIndex + 1) % state.players.length,
        currentQuestion: null, // Force le chargement de la prochaine question
        timerActive: false,
      };
    default:
      return state;
  }
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export function GameProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(gameReducer, initialState);

  // Timer effect avec nettoyage propre
  useEffect(() => {
    if (!state.timerActive) {
      return;
    }

    if (state.timeRemaining <= 0) {
      dispatch({ type: 'STOP_TIMER' });
      // Déclencher la logique de réponse "failed" automatiquement
      dispatch({ type: 'TIME_UP' });
      return;
    }

    const interval = setInterval(() => {
      dispatch({ type: 'TICK_TIMER' });
    }, 100);

    return () => {
      clearInterval(interval);
    };
  }, [state.timerActive, state.timeRemaining]);

  const addPlayer = useCallback((name: string) => {
    const trimmedName = name.trim();
    // Validation : nom non vide, max 30 caractères, pas de doublons
    if (!trimmedName || trimmedName.length === 0) {
      return;
    }
    if (trimmedName.length > 30) {
      return;
    }
    if (state.players.some((p) => p.name.toLowerCase() === trimmedName.toLowerCase())) {
      return;
    }
    if (state.players.length >= 20) {
      return;
    }
    
    const newPlayer: Player = {
      id: Date.now().toString() + Math.random().toString(36).substring(2, 11),
      name: trimmedName,
      score: 0,
    };
    dispatch({ type: 'ADD_PLAYER', payload: newPlayer });
  }, [state.players]);

  const removePlayer = useCallback((id: string) => {
    dispatch({ type: 'REMOVE_PLAYER', payload: id });
  }, []);

  const updateConfig = useCallback((config: Partial<GameConfig>) => {
    dispatch({ type: 'UPDATE_CONFIG', payload: config });
  }, []);

  const startGame = useCallback(() => {
    if (state.players.length < 2) {
      return;
    }
    dispatch({ type: 'START_GAME' });
  }, [state.players.length]);

  const getNextQuestion = useCallback((): Question | null => {
    // Protection : vérifier que questionsData est bien chargé
    if (!questionsData || !Array.isArray(questionsData) || questionsData.length === 0) {
      console.error('Aucune question disponible dans le fichier JSON');
      return null;
    }

    const availableQuestions = questionsData.filter((q) => {
      // Filtrer par thèmes si sélectionnés
      if (state.config.selectedThemes.length > 0) {
        return state.config.selectedThemes.includes(q.theme);
      }
      return true;
    });

    if (availableQuestions.length === 0) {
      return null;
    }

    const randomQuestion = availableQuestions[Math.floor(Math.random() * availableQuestions.length)];
    
    // Remplacer {N} par le nombre de mots requis
    const formattedPrompt = randomQuestion.prompt.replace(
      '{N}',
      state.config.wordsNeeded.toString()
    );

    return {
      ...randomQuestion,
      prompt: formattedPrompt,
    };
  }, [state.config]);

  const loadQuestion = useCallback(() => {
    if (!state.gameStarted || state.players.length === 0) {
      return;
    }
    const question = getNextQuestion();
    if (question) {
      dispatch({ type: 'SET_QUESTION', payload: question });
      // Démarrer le timer automatiquement si configuré
      if (state.config.timerDuration !== null) {
        // Petit délai pour l'effet visuel, puis démarrage du timer
        setTimeout(() => {
          dispatch({ type: 'START_TIMER' });
        }, 500);
      }
    }
  }, [getNextQuestion, state.gameStarted, state.players.length, state.config.timerDuration]);

  const startTimer = useCallback(() => {
    if (state.config.timerDuration !== null) {
      dispatch({ type: 'START_TIMER' });
    }
  }, [state.config.timerDuration]);

  const answerQuestion = useCallback(
    (result: 'success' | 'failed' | 'skip') => {
      if (state.players.length === 0) {
        return;
      }
      
      const currentPlayer = state.players[state.currentPlayerIndex];
      if (!currentPlayer) {
        return;
      }

      // Arrêter le timer d'abord
      dispatch({ type: 'STOP_TIMER' });

      if (result === 'success' && state.config.competitiveMode) {
        dispatch({
          type: 'UPDATE_SCORE',
          payload: { playerId: currentPlayer.id, points: 1 },
        });
      } else if (result === 'skip' && state.config.competitiveMode) {
        // Pénalité pour skip (optionnel, on peut juste passer le tour)
        dispatch({
          type: 'UPDATE_SCORE',
          payload: { playerId: currentPlayer.id, points: -1 },
        });
      }

      // Passer au joueur suivant et réinitialiser la question
      dispatch({ type: 'NEXT_PLAYER' });
      dispatch({ type: 'SET_QUESTION', payload: null });
    },
    [state.players, state.currentPlayerIndex, state.config.competitiveMode]
  );

  const resetToSetup = useCallback(() => {
    dispatch({ type: 'RESET_TO_SETUP' });
  }, []);

  const goToHub = useCallback(() => {
    dispatch({ type: 'GO_TO_HUB' });
  }, []);

  const selectGame = useCallback((game: GameSelection) => {
    dispatch({ type: 'SELECT_GAME', payload: game });
  }, []);

  return (
    <GameContext.Provider
      value={{
        state,
        addPlayer,
        removePlayer,
        updateConfig,
        startGame,
        getNextQuestion,
        loadQuestion,
        startTimer,
        answerQuestion,
        resetToSetup,
        goToHub,
        selectGame,
      }}
    >
      {children}
    </GameContext.Provider>
  );
}

export function useGame() {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
}
