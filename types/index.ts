export interface Question {
  id: number;
  theme: string;
  categorie: string;
  prompt: string;
  answers_needed: number;
  tags: string[];
}

export interface Player {
  id: string;
  name: string;
  score: number;
}

export type GameSelection = 'hub' | '5seconds'; // Ajoute d'autres jeux ici plus tard

export interface GameConfig {
  timerDuration: number | null; // null = pas de timer
  wordsNeeded: number; // 3, 4 ou 5
  selectedThemes: string[];
  competitiveMode: boolean; // true = on compte les points, false = mode ambiance
}

export interface GameState {
  currentGame: GameSelection;
  players: Player[];
  currentPlayerIndex: number;
  currentQuestion: Question | null;
  config: GameConfig;
  gameStarted: boolean;
  timerActive: boolean;
  timeRemaining: number;
}
