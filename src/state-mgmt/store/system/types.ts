export interface ISystemState {
  gameState: gameState;
  countdownTimer: boolean;
  userName: string;
  score: number;
  status: string;
  alphabet: string[];
  selectedLetters: string[];
  loading: boolean;
  correct: number;
  errors: number;
  guesses: number;
  api: Api;
  timer: Timer;
  highScores: any[];
  buttonId: number;
  showModal: boolean;
}

export interface IPlayerCredentials {
  userName: string;
}

export interface Api {
  author: string;
  quote: string;
  uniqueCharacters: string;
  uniqueCharactersLength: number;
  length: number;
  tags: string[];
  _id: string;
}

export interface Timer {
  startTime: number;
  elapsedTime: number;
  endTime: number;
  running: boolean;
  duration: number;
}

export type Letter = string;

export type gameState = "INITIAL" | "PLAYING" | "PAUSED" | "FINISHED";
